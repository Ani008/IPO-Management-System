import React, { useState } from 'react';
import LiveIPO from './LiveIPO';
import "../style/IPODashboard.css"; // Correct path to CSS
import { FileText, TrendingUp, ChevronDown, User, LogOut, Menu, X, BarChart2 } from 'lucide-react';

// Initial IPO applications
const initialApplications = [
  { id: 1, company: 'Tech Innovators Inc.', symbol: 'TII', size: '$50M', price: '$25', submittedBy: 'Emily Carter', status: 'Pending', isAllotted: false },
  { id: 2, company: 'Global Solutions Ltd.', symbol: 'GSL', size: '$75M', price: '$30', submittedBy: 'David Lee', status: 'Pending', isAllotted: false },
  { id: 3, company: 'Green Energy Corp.', symbol: 'GEC', size: '$100M', price: '$40', submittedBy: 'Sophia Clark', status: 'Live', isAllotted: true },
  { id: 4, company: 'Financial Dynamics Group', symbol: 'FDG', size: '$60M', price: '$28', submittedBy: 'Ethan Walker', status: 'Pending', isAllotted: false },
  { id: 5, company: 'HealthTech Innovations', symbol: 'HTI', size: '$45M', price: '$22', submittedBy: 'Olivia Reed', status: 'Live', isAllotted: true },
];

const IPODashboardComponent = ({ onLogout }) => {
  const [applications, setApplications] = useState(initialApplications);
  const [activeItem, setActiveItem] = useState('Applications');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Mark IPO as allotted
  const handleAllot = (id) => {
    setApplications(prev =>
      prev.map(app => app.id === id ? { ...app, isAllotted: true } : app)
    );
  };

  // Sidebar navigation items
  const navItems = [
    { name: 'All IPO Applications', icon: FileText, stateKey: 'Applications' },
    { name: 'Live IPOs', icon: TrendingUp, stateKey: 'Live' },
  ];

  return (
    <div className="dashboard-layout">
      {/* Mobile Menu Backdrop */}
      {isSidebarOpen && <div className="mobile-backdrop" onClick={() => setIsSidebarOpen(false)} />}

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <BarChart2 style={{ color: 'var(--primary-blue)' }} />
          IPO Management
        </div>

        <ul className="nav-list">
          {navItems.map(item => (
            <li
              key={item.name}
              className={`nav-item ${activeItem === item.stateKey ? 'active' : ''}`}
              onClick={() => {
                setActiveItem(item.stateKey);
                setIsSidebarOpen(false);
              }}
            >
              <a href="#">
                <item.icon style={{ marginRight: '0.5rem', width: '1.25rem', height: '1.25rem' }} />
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Sign Out */}
        <div style={{ padding: '0 1.5rem' }}>
          <button
            onClick={onLogout}
            className="nav-item sign-out-button"
            style={{ backgroundColor: 'transparent', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
          >
            <a href="#" style={{ padding: '0.75rem 0', color: '#dc2626', display: 'flex', alignItems: 'center' }}>
              <LogOut style={{ marginRight: '0.75rem', width: '1.25rem', height: '1.25rem' }} />
              Sign Out
            </a>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <button className="menu-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="user-menu">
            Admin User <User /> <ChevronDown style={{ width: '1rem', height: '1rem' }} />
          </div>
        </div>

        <div className="page-content">
          {/* Conditional rendering based on sidebar selection */}
          {activeItem === 'Applications' && (
            <>
              <h2 className="page-title">All IPO Applications</h2>
              <div className="table-card">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Company Name</th>
                      <th>Symbol</th>
                      <th>Issue Size</th>
                      <th>Price</th>
                      <th>Submitted By</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map(app => (
                      <tr key={app.id}>
                        <td>{app.company}</td>
                        <td>{app.symbol}</td>
                        <td>{app.size}</td>
                        <td>{app.price}</td>
                        <td>{app.submittedBy}</td>
                        <td>
                          <span className={`status-badge ${app.status.toLowerCase()}`}>
                            {app.status}
                          </span>
                        </td>
                        <td>
                          {app.isAllotted ? (
                            <span className="allotted-text">Allotted</span>
                          ) : (
                            <button
                              className="allot-button"
                              onClick={() => handleAllot(app.id)}
                              disabled={app.status === 'Live'}
                            >
                              Mark as Allotted
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeItem === 'Live' && <LiveIPO />}
        </div>
      </div>
    </div>
  );
};

// Logout message component
const LogoutMessage = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '1.5rem',
    color: '#4b5563',
    backgroundColor: '#f3f4f6',
    fontFamily: 'Inter, sans-serif'
  }}>
    <LogOut size={48} style={{ marginBottom: '1rem', color: '#ef4444' }} />
    You have been successfully logged out.
    <p style={{ fontSize: '1rem', color: '#6b7280' }}>
      Refresh the page to view the dashboard again.
    </p>
  </div>
);

// Main App Component
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const handleLogout = () => setIsAuthenticated(false);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      {isAuthenticated ? (
        <IPODashboardComponent onLogout={handleLogout} />
      ) : (
        <LogoutMessage />
      )}
    </div>
  );
}

export default App;
