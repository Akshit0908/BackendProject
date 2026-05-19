import { useState } from 'react';
import './Sidebar.css';

function Sidebar() {
  const [activeItem, setActiveItem] = useState('Dashboard');

  const menuItems = [
    { name: 'Dashboard', icon: '📊' },
    { name: 'My Courses', icon: '📖' },
    { name: 'Certificates', icon: '🎓' },
    { name: 'Assignments', icon: '📝' },
    { name: 'Progress Analytics', icon: '📈' },
    { name: 'Discussion Forum', icon: '💬' },
    { name: 'Settings', icon: '⚙️' }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <button
            key={item.name}
            className={`menu-item ${activeItem === item.name ? 'active' : ''}`}
            onClick={() => setActiveItem(item.name)}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-text">{item.name}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;

