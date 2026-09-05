import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../App.css';

const Sidebar = ({ toggleTheme, theme }) => {
  const location = useLocation();

  // Main Categories
  const mainItems = [
    { name: 'Home', path: '/' },
    { name: 'Politics', path: '/category/politics' },
    { name: 'Business', path: '/category/business' },
    { name: 'Sports', path: '/category/sports' },
    { name: 'Technology', path: '/category/technology' },
    { name: 'Entertainment', path: '/category/entertainment' },
  ];

  // More Categories
  const moreItems = [
    { name: 'World News', path: '/category/world' },
    { name: 'Education', path: '/category/education' },
    { name: 'Health', path: '/category/health' },
    { name: 'Local News', path: '/category/india' },
    { name: 'Opinion', path: '/category/opinion' },
    { name: 'Videos', path: '/videos' },
    { name: 'Photo Gallery', path: '/photos' },
  ];

  return (
    <div className="sidebar">
            <div className="sidebar-header">
        <Link to="/" className="sidebar-logo">
          {/* Naya Image Logo */}
          <img 
            src="https://z-cdn-media.chatglm.cn/files/586b67df-c9ee-4c4d-b2b5-c2e97dc511bd.png?auth_key=1882238991-0a85f2eeb7364930ae36f868ec0723f7-0-984e807d2baf4f997e8d3bf553f4bf3c" 
            alt="NewsPoint Logo" 
            style={{ height: '100px', width: '50px', objectFit: 'contain' }}
          />
        </Link>
        <button onClick={toggleTheme} className="theme-toggle-sidebar">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>

      <div className="sidebar-date">{new Date().toDateString()}</div>

      <nav className="sidebar-nav">
        {mainItems.map((item) => (
          <Link key={item.name} to={item.path} className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}>
            {item.name}
          </Link>
        ))}
        
        <div style={{padding:'10px 20px', fontSize:'11px', color:'#666', fontWeight:'bold', letterSpacing:'1px'}}>MORE</div>
        
        {moreItems.map((item) => (
          <Link key={item.name} to={item.path} className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}>
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <Link to="/subscribe" className="subscribe-btn" style={{textDecoration:'none', textAlign:'center', display:'block'}}>
          SUBSCRIBE
        </Link>
        {localStorage.getItem('token') ? (
          <Link to="/admin" className="admin-link-sidebar">Admin Panel</Link>
        ) : (
          <Link to="/login" className="login-link-sidebar">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;