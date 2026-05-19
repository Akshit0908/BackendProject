import { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">
          <span className="logo-icon">📚</span>
          <span className="logo-text">OpenLearn</span>
        </div>
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search courses, assignments..." />
        </div>
      </div>
      <div className="navbar-right">
        <button className="icon-button">
          <span className="notification-icon">🔔</span>
          <span className="notification-badge">3</span>
        </button>
        <div className="profile-dropdown">
          <button
            className="profile-button"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1" alt="Profile" />
            <span>Sarah Johnson</span>
            <span className="dropdown-arrow">▼</span>
          </button>
          {showDropdown && (
            <div className="dropdown-menu">
              <a href="#profile">Profile</a>
              <a href="#settings">Settings</a>
              <a href="#logout">Logout</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
