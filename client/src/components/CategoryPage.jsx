import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const CategoryPage = () => {
  const { slug } = useParams(); // URL se category name lega (jaise 'sports')
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Backend ko category bhej rahe hain
        const res = await axios.get(`http://localhost:5000/api/news?category=${slug}`);
        setNews(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNews();
  }, [slug]);
// Purana function hata do aur ye naya bana do
const getImage = (cat, w = 800, h = 600) => {
  return `https://picsum.photos/seed/${cat}${Math.random()}/${w}/${h}`;
};

  return (
    <div className="main-content">
      <div className="top-bar">
        <div className="breadcrumb">HOME &gt; {slug.toUpperCase()}</div>
      </div>

      <section className="compact-list" style={{paddingTop: '30px'}}>
        <h3 style={{fontFamily:'Oswald', textTransform:'uppercase', borderBottom:'2px solid #D32F2F', paddingBottom:'10px'}}>
          {slug} News
        </h3>
        
        {news.length === 0 ? (
          <p>No news found in this category yet.</p>
        ) : (
          news.map((item) => (
            <div key={item._id} className="compact-item">
              <div className="compact-img"><img src={item.image || getImage(item.category)} alt="thumb" />
              </div>
              <div className="compact-details">
                <div className="hero-cat">{item.category}</div>
                <h4>{item.title}</h4>
                <p>{item.content.substring(0, 120)}...</p>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default CategoryPage;