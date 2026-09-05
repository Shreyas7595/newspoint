import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewsList = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/news');
        setNews(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNews();
  }, []);

  return (
    <div style={styles.container}>
      <h1>Latest News</h1>
      {news.map((item) => (
        <div key={item._id} style={styles.card}>
          <span style={styles.category}>{item.category}</span>
          <h3>{item.title}</h3>
          <p>{item.content}</p>
          <small>{new Date(item.date).toDateString()}</small>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: { padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' },
  card: { border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', backgroundColor: '#fff' },
  category: { backgroundColor: '#f0f0f0', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }
};

export default NewsList;