import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext'; // Import Theme

// ... styles ...

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { theme, toggleTheme } = useTheme(); // Use Theme
  const [searchQuery, setSearchQuery] = useState('');

  // ... useEffect for login check ...

  const handleSearch = (e) => {
    e.preventDefault();
    if(searchQuery) {
        window.location.href = `/search?q=${searchQuery}`;
    }
  };

  return (
    <div>
      {/* Top Bar */}
      <div style={styles.topBar}>
         <span>{new Date().toDateString()}</span>
         <button onClick={toggleTheme} style={styles.themeBtn}>
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
         </button>
      </div>

      {/* Main Nav with Search */}
      <nav style={styles.mainNav}>
        <Link to="/" style={styles.logo}>NEWSPOINT</Link>
        <div style={styles.links}>
          <Link to="/" style={styles.link}>Home</Link>
          {isLoggedIn ? <Link to="/admin" style={styles.link}>Admin</Link> : <Link to="/login" style={styles.link}>Login</Link>}
          {isLoggedIn && <button onClick={() => {localStorage.removeItem('token'); window.location.href='/';}} style={styles.logoutBtn}>Logout</button>}
        </div>
      </nav>
      
      {/* Search Bar in Ticker area */}
      <div style={{padding: '10px', background: '#eee', display: 'flex', justifyContent: 'center'}}>
        <form onSubmit={handleSearch}>
            <input 
                type="text" 
                placeholder="Search news..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{padding: '8px', width: '300px', borderRadius: '4px', border: '1px solid #ccc'}}
            />
            <button type="submit" style={{padding: '8px', marginLeft: '5px', background: '#333', color: '#fff', border: 'none', borderRadius: '4px'}}>Search</button>
        </form>
      </div>
      {/* ... Ticker ... */}
    </div>
  );
};

const styles = {
    // ... previous styles ...
    themeBtn: { cursor: 'pointer', background: 'transparent', color: 'white', border: '1px solid white', borderRadius: '4px', padding: '2px 8px' }
};

export default Navbar;