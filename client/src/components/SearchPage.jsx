import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      axios.get(`http://localhost:5000/api/news/search?q=${query}`)
        .then(res => setResults(res.data))
        .catch(err => console.log(err));
    }
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ q: query });
  };

  return (
    <div className="main-content">
      <div className="top-bar">
        <div className="breadcrumb"><Link to="/" style={{color:'#D32F2F'}}>HOME</Link> &gt; SEARCH</div>
      </div>

      <div style={{padding:'40px'}}>
        <form onSubmit={handleSearch} style={{display:'flex', gap:'10px', maxWidth:'600px', margin:'0 auto 40px auto'}}>
          <input 
            type="text" 
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search news, topics, authors..." 
            style={{flex:1, padding:'12px', fontSize:'16px', border:'1px solid #ccc', borderRadius:'6px'}}
          />
          <button type="submit" className="btn-publish">Search</button>
        </form>

        <h2 style={{fontFamily:'Oswald'}}>Results for: "{query}"</h2>
        
        <div className="large-cards-grid" style={{marginTop:'30px'}}>
          {results.map(item => (
            <Link to={`/news/${item._id}`} key={item._id} style={{textDecoration:'none', color:'inherit'}}>
              <div className="large-news-card">
                <div className="large-card-img">
                  <img src={item.image || `https://picsum.photos/seed/${item.category}/600/400`} alt="news" />
                </div>
                <div className="large-card-content">
                  <span className="hero-cat">{item.category}</span>
                  <h3>{item.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {results.length === 0 && <p>No results found.</p>}
      </div>
    </div>
  );
};

export default SearchPage;