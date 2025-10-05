import React, { useState } from 'react';

import "../style/LiveIPO.css";

import { BarChart2, Home, TrendingUp, Clock, CheckCircle, Search, Bell, User, ChevronLeft, ChevronRight } from 'lucide-react';

// =================================================================
// MOCK DATA: Represents all IPOs, filtered later by tab
// =================================================================

const publicIPOs = [
  { id: 1, name: 'Tech Innovators Inc.', symbol: 'TII', issueSize: '5M shares', price: '22.50', status: 'Live' },
  { id: 2, name: 'Global Energy Solutions', symbol: 'GES', issueSize: '10M shares', price: '18.00', status: 'Live' },
  { id: 3, name: 'HealthFirst Corp.', symbol: 'HFC', issueSize: '7M shares', price: '35.20', status: 'Upcoming' },
  { id: 4, name: 'Financial Growth Partners', symbol: 'FGP', issueSize: '8M shares', price: '50.00', status: 'Completed' },
  { id: 5, name: 'Eco-Friendly Products Ltd.', symbol: 'EFP', issueSize: '6M shares', price: '15.75', status: 'Live' },
  { id: 6, name: 'Digital Media Ventures', symbol: 'DMV', issueSize: '9M shares', price: 'Live', status: 'Live' },
];

// =================================================================
// IPO CARD COMPONENT
// =================================================================

const IPOCard = ({ ipo }) => {
  const statusClass = ipo.status.toLowerCase().replace(' ', '-');
  return (
    <div className="ipo-card">
      {/* Status Badge */}
      <div className={`status-badge ${statusClass}-badge`}>
        <div className={`status-dot ${statusClass}-dot`}></div>
        {ipo.status}
      </div>

      <h3 className="card-title">{ipo.name}</h3>
      <p className="card-symbol">Symbol: {ipo.symbol}</p>

      <div className="card-details">
        <div className="detail-row">
          <TrendingUp className="detail-icon blue" />
          <span>Issue Size: <span className="detail-value">{ipo.issueSize}</span></span>
        </div>
        <div className="detail-row">
          <Clock className="detail-icon blue" />
          <span>Price: <span className="detail-value">${ipo.price}</span></span>
        </div>
      </div>
    </div>
  );
};

// =================================================================
// TOP NAVIGATION BAR COMPONENT
// =================================================================

const PublicTopNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { name: 'Home', icon: Home },
    { name: 'Live IPOs', icon: TrendingUp },
    { name: 'Upcoming IPOs', icon: Clock },
    { name: 'Completed IPOs', icon: CheckCircle },
  ];

  return (
    <nav className="top-nav">
      {/* Logo and Title */}
      <div className="nav-logo">
        <BarChart2 className="logo-icon" />
        <span className="logo-text">IPO Tracker</span>
      </div>

      {/* Navigation Links (Desktop) */}
      <div className="nav-links-desktop">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`nav-link ${activeTab === tab.name ? 'active' : ''}`}
          >
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Search, Notifications, and Profile */}
      <div className="nav-controls">
        {/* Search Bar */}
        <div className="search-bar-container">
          <Search className="search-icon" />
          <input type="text" placeholder="Search IPOs..." className="search-input" />
        </div>

        {/* Notifications Icon (Hidden on mobile) */}
        <Bell className="notification-icon desktop-only" />
        
        {/* User Profile Picture Placeholder */}
        <div className="user-avatar">
          <User className="user-icon" />
        </div>
      </div>
    </nav>
  );
};

// =================================================================
// PAGINATION COMPONENT
// =================================================================

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination-container">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="pagination-arrow-btn">
        <ChevronLeft className="pagination-arrow-icon" />
      </button>

      {pageNumbers.map(number => (
        <button 
          key={number} 
          onClick={() => onPageChange(number)}
          className={`pagination-btn ${number === currentPage ? 'active' : ''}`}
        >
          {number}
        </button>
      ))}

      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="pagination-arrow-btn">
        <ChevronRight className="pagination-arrow-icon" />
      </button>
    </div>
  );
};


// =================================================================
// MAIN LIVE IPO COMPONENT (Exported as default)
// =================================================================

function LiveIPO() {
  // Start on the 'Live IPOs' tab
  const [activeTab, setActiveTab] = useState('Live IPOs');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 
  
  // Filtering logic
  const filteredIPOs = publicIPOs.filter(ipo => {
    if (activeTab === 'Live IPOs') return ipo.status === 'Live';
    if (activeTab === 'Upcoming IPOs') return ipo.status === 'Upcoming';
    if (activeTab === 'Completed IPOs') return ipo.status === 'Completed';
    return true; // Show all for Home tab
  });

  const totalPages = Math.ceil(filteredIPOs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentIPOs = filteredIPOs.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="tracker-container">
      <PublicTopNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="tracker-main">
        
        <div className="page-header">
          {/* Display the active tab name */}
          <h1 className="page-title">{activeTab}</h1>
          <p className="page-subtitle">
            Explore initial public offerings currently available for investment.
          </p>
        </div>

        <div className="ipo-grid">
          {currentIPOs.length > 0 ? (
            currentIPOs.map((ipo) => (
              <IPOCard key={ipo.id} ipo={ipo} />
            ))
          ) : (
            <p className="no-ipos-message">No IPOs found for this category.</p>
          )}
        </div>

        {totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        )}
      </main>

      <footer className="tracker-footer">
          © {new Date().getFullYear()} IPO Tracker. All rights reserved.
      </footer>
    </div>
  );
}

export default LiveIPO;
