import React, { useState } from 'react';
import '../Style/HomePageStyle.css';
import '../Style/AnimationStyle.css';

// =================================================================
// 1. SUCCESS ANIMATION COMPONENT
//    (Displays a tick mark upon successful submission)
// =================================================================

const SuccessAnimation = () => (
  <div className="success-overlay">
    <div className="success-checkmark">
      <div className="check-icon">
        <span className="icon-line line-tip"></span>
        <span className="icon-line line-long"></span>
        <div className="icon-circle"></div>
        <div className="icon-fix"></div>
      </div>
      <h3 className="success-message-text">Request Submitted!</h3>
    </div>
  </div>
);

// =================================================================
// 3. MAIN PAGE COMPONENT (Now includes success animation logic)
// =================================================================

const statusColors = {
  Pending: { background: '#fffbe0', color: '#8a6500', border: '#fbe98a' },
  Approved: { background: '#e0fff1', color: '#00654e', border: '#8afbe9' },
  Live: { background: '#e0f1ff', color: '#004a8a', border: '#8ae9fb' },
};

const IPOApplications = [
  { company: 'Acme Corp', status: 'Pending', date: '2023-08-15' },
  { company: 'Beta Industries', status: 'Approved', date: '2023-07-20' },
  { company: 'Gamma Solutions', status: 'Live', date: '2023-06-05' },
];

const MainPage = ({ onLogout }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    companySymbol: '',
    issueSize: '',
    pricePerShare: '',
    totalShares: '',
    document: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false); // NEW STATE FOR ANIMATION

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Simple calculated field logic (Total Shares)
    if (name === 'issueSize' || name === 'pricePerShare') {
        const size = parseFloat(name === 'issueSize' ? value : formData.issueSize) || 0;
        const price = parseFloat(name === 'pricePerShare' ? value : formData.pricePerShare) || 0;
        const calculatedShares = price > 0 ? (size / price).toFixed(0) : '0';
        setFormData(prev => ({ ...prev, totalShares: calculatedShares }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, document: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    
    // Placeholder for SQL Backend Submission
    try {
        console.log('Submitting IPO Application:', formData);
        
        // Simulating API call and database insertion delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // 1. Show the animated success checkmark
        setShowSuccessAnimation(true);
        
        // 2. Hide the animation and show the static message after 2 seconds
        setTimeout(() => {
            setShowSuccessAnimation(false);
            setMessage('Application submitted successfully!');
        }, 2000); 

        // Clear form
        setFormData({ companyName: '', companySymbol: '', issueSize: '', pricePerShare: '', totalShares: '', document: null });
        document.getElementById('file-upload-input').value = '';
        
    } catch (error) {
        console.error('Submission failed:', error);
        setMessage('Submission failed. Please try again.');
    } finally {
        // We set isSubmitting to false outside the setTimeout to re-enable the button immediately
        setIsSubmitting(false);
    }
  };

  return (
    <div className="main-app-container">
      {/* RENDER THE ANIMATION OVERLAY IF STATE IS TRUE */}
      {showSuccessAnimation && <SuccessAnimation />}
      
      <header className="header">
        <div className="logo-section">
          <svg className="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
            <polyline points="17 6 23 6 23 12"></polyline>
          </svg>
          <span className="app-title">IPO Tracker</span>
        </div>
        <button className="btn-logout" onClick={onLogout}>Logout</button>
      </header>

      <main className="main-content-area">
        
        {/* Left Panel: IPO Submission Form */}
        <section className="form-card">
          <h2 className="section-title">Apply for a New IPO</h2>
          
          <form onSubmit={handleSubmit} className="ipo-form">
            
            <label className="input-label">Company Name</label>
            <input 
              type="text" 
              name="companyName"
              placeholder="e.g., Innovate Inc." 
              className="input-field" 
              value={formData.companyName}
              onChange={handleInputChange}
              required
            />
            
            <label className="input-label">Company Symbol</label>
            <input 
              type="text" 
              name="companySymbol"
              placeholder="e.g., INVT" 
              className="input-field"
              value={formData.companySymbol}
              onChange={handleInputChange}
              required
            />

            <div className="input-group-row">
              <div className="input-group-col">
                <label className="input-label">Issue Size ($)</label>
                <input 
                  type="number" 
                  name="issueSize"
                  placeholder="1000000" 
                  className="input-field"
                  value={formData.issueSize}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div className="input-group-col">
                <label className="input-label">Price per Share ($)</label>
                <input 
                  type="number" 
                  name="pricePerShare"
                  placeholder="25.50" 
                  className="input-field"
                  value={formData.pricePerShare}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <label className="input-label">Total Shares</label>
            <input 
              type="text" 
              name="totalShares"
              placeholder="50000" 
              className="input-field"
              value={formData.totalShares}
              readOnly 
              style={{ backgroundColor: '#f9f9f9' }}
            />

            <label className="input-label">Upload Document</label>
            <div className="file-upload-box">
              <input 
                type="file" 
                id="file-upload-input"
                className="file-input-hidden"
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload-input" className="file-upload-label">
                <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <span className="file-upload-text">
                  {formData.document ? formData.document.name : 'Upload a file or drag and drop'}
                </span>
                <span className="file-upload-subtext">PDF, DOCX up to 10MB</span>
              </label>
            </div>
            
            {message && <p className={`message ${message.includes('success') ? 'main-success' : 'main-error'}`}>{message}</p>}

            <button 
              type="submit" 
              className="btn btn-submit"
              disabled={isSubmitting || showSuccessAnimation} // Disable button during submission and animation
            >
              {isSubmitting ? 'Processing...' : 'Submit IPO Application'}
            </button>
          </form>
        </section>

        {/* Right Panel: Application Status Table */}
        <section className="table-card">
          <h2 className="section-title">My IPO Applications</h2>
          
          <div className="applications-table">
            <div className="table-header">
              <div className="col col-company">Company Name</div>
              <div className="col col-status">Status</div>
              <div className="col col-date">Submitted Date</div>
            </div>
            
            {IPOApplications.map((app, index) => (
              <div key={index} className="table-row">
                <div className="col col-company">{app.company}</div>
                <div className="col col-status">
                  <span className="status-badge" style={{
                    backgroundColor: statusColors[app.status].background,
                    color: statusColors[app.status].color,
                    border: `1px solid ${statusColors[app.status].border}`
                  }}>
                    {app.status}
                  </span>
                </div>
                <div className="col col-date">{app.date}</div>
              </div>
            ))}
            
            {/* Placeholder for no data */}
            {IPOApplications.length === 0 && (
              <div className="no-data">No applications submitted yet.</div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};


// =================================================================
// 4. MAIN APPLICATION ROUTER COMPONENT
// =================================================================

const App = () => {
  // Use a state variable to simulate routing: true for main page, false for login page
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to set the user as logged in (navigates to Main Page)
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  // Function to handle logout (navigates back to Login Page)
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <style jsx="true">{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
        
        /* Apply global font and background for the entire application */
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f3f4f6;
            margin: 0;
            padding: 0;
        }
      `}</style>
      
    
        <MainPage onLogout={handleLogout} />
      
    </>
  );
};

export default App;
