import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import CategoryPage from './components/CategoryPage';
import SingleNews from './components/SingleNews';
import Subscription from './components/Subscription'; // Subscribe import kiya
import CricketScore from './components/CricketScore';
import WeatherWidget from './components/WeatherWidget';
import StaticPage from './components/StaticPage'; // Import kiya
import SearchPage from './components/SearchPage'; // Import kiya
function AppContent() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`app-layout ${theme}`}>
      <Sidebar toggleTheme={toggleTheme} theme={theme} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/news/:id" element={<SingleNews />} />
          <Route path="/subscribe" element={<Subscription />} /> {/* Route add kiya */}
          <Route path="/cricketscore" element={<CricketScore/>}/>
          <Route path="/weatherwidget" element={<WeatherWidget/>}/>
          <Route path="/search" element={<SearchPage />} />
          
          {/* --- STATIC PAGES (Sab ek hi component se bane) --- */}
          <Route path="/about" element={<StaticPage title="About Us" content="<p>NewsPoint is India's leading digital news platform, delivering unbiased, real-time news. Founded in 2024, our mission is to keep the citizen informed. We have a team of 500+ journalists across the country.</p><p><strong>Our Mission:</strong> Truth, Transparency, and Speed.</p>" />} />
          
          <Route path="/contact" element={<StaticPage title="Contact Us" content="<p>Have a news tip or want to advertise? Reach out to us!</p><p><strong>Email:</strong> editor@newspoint.com</p><p><strong>Phone:</strong> +91 9876543210</p><p><strong>Address:</strong> Connaught Place, New Delhi, India</p>" />} />
          
          <Route path="/privacy" element={<StaticPage title="Privacy Policy" content="<p>Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal data when you visit Newspoint. We do not sell your data to third parties. By using our website, you agree to this policy.</p>" />} />
          
          <Route path="/terms" element={<StaticPage title="Terms & Conditions" content="<p>Welcome to Newspoint. By accessing this website, you agree to be bound by these terms. All content (text, images, videos) is the property of Newspoint. You cannot reproduce our content without written permission.</p>" />} />
          
          <Route path="/advertise" element={<StaticPage title="Advertise With Us" content="<p>Reach millions of Indians daily! Newspoint offers premium digital advertising space. For rate cards and custom campaigns, contact our ad team at <strong>ads@newspoint.com</strong>.</p>" />} />

          {/* Placeholders for Complex Pages (Baad mein banayenge) */}
          <Route path="/videos" element={<StaticPage title="Video News" content="<p>Video section coming soon! Stay tuned for exclusive video interviews and breaking news live streams.</p>" />} />
          <Route path="/photos" element={<StaticPage title="Photo Gallery" content="<p>Photo gallery feature is under development. Browse our articles for stunning images in the meantime.</p>" />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;