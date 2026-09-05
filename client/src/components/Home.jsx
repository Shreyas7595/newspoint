import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CricketScore from './CricketScore';
import WeatherWidget from './WeatherWidget';
import '../App.css';

const Home = () => {
  const [news, setNews] = useState([]);
  const [isMounted, setIsMounted] = useState(false); // Entry animation ke liye
  const [loadedImages, setLoadedImages] = useState({}); // Shimmer ke liye

  const getImage = (cat, w = 600, h = 400) => {
    return `https://picsum.photos/seed/${cat}${Math.random()}/${w}/${h}`;
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/news');
        setNews(res.data);
        
        // Data aane ke 100ms baad animation trigger karo (Stagger effect ke liye)
        setTimeout(() => setIsMounted(true), 100);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNews();
  }, []);

  return (
      <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <Helmet>
          <title>Newspoint - India's No.1 News Portal</title>
        </Helmet>
             {/* Modern Floating Animation Background (Blobs + Bubbles) */}
        {/* POORE PAGE KO EK CONTAINER MEIN WRAP KIYA */}
        
        {/* ANIMATION BACKGROUND (Ab ye poore container ko cover karega) */}
        <div className="animated-bg">
          <div className="blob"></div>
          <div className="blob"></div>
          <div className="blob"></div>

          <div className="bubble" style={{ '--size': '80px', '--delay': '0s', '--duration': '15s', '--left': '10%' }}></div>
          <div className="bubble" style={{ '--size': '40px', '--delay': '2s', '--duration': '20s', '--left': '30%' }}></div>
          <div className="bubble" style={{ '--size': '120px', '--delay': '5s', '--duration': '25s', '--left': '60%' }}></div>
          <div className="bubble" style={{ '--size': '20px', '--delay': '8s', '--duration': '18s', '--left': '80%' }}></div>
          <div className="bubble" style={{ '--size': '60px', '--delay': '1s', '--duration': '22s', '--left': '50%' }}></div>
          <div className="bubble" style={{ '--size': '90px', '--delay': '11s', '--duration': '28s', '--left': '20%' }}></div>
          <div className="bubble" style={{ '--size': '35px', '--delay': '4s', '--duration': '19s', '--left': '70%' }}></div>
          <div className="bubble" style={{ '--size': '110px', '--delay': '7s', '--duration': '24s', '--left': '45%' }}></div>
        </div>
 {/* ACTUAL CONTENT (News Cards wala part) */}
        <div style={{ position: 'relative', zIndex: 2 }}> {/* z-index 2 se content bubbles ke upar rahega */}
          
      <div className="top-bar">

        <div>{new Date().toTimeString().slice(0,5)}</div>
      </div>

        

      <div className="home-grid-layout">
        
      
        {news.map((item, index) => (
          <Link to={`/news/${item._id}`} key={item._id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div 
              className={`large-news-card ${isMounted ? 'card-visible' : ''}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="large-card-img">
                {!loadedImages[item._id] && <div className="shimmer-bg"></div>}
                <img 
                  src={item.image || getImage(item.category)} 
                  alt="news" 
                  onLoad={() => setLoadedImages(prev => ({ ...prev, [item._id]: true }))}
                  className={loadedImages[item._id] ? 'image-loaded' : ''}
                />
              </div>
              <div className="large-card-content">
                <span className="hero-cat">{item.category}</span>
                <h3>{item.title}</h3>
                <p>{item.content.substring(0, 100)}...</p>
              </div>
            </div>
          </Link>
        ))}

        {/* RIGHT: 3D Widgets */}
        <aside className="sidebar-3d-widgets">
          <CricketScore />
          <WeatherWidget />
        </aside>

      </div>
    </div>
    </div>
  );
};

export default Home;