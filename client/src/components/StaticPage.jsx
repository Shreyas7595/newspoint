import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const StaticPage = ({ title, content }) => {
  return (
    <div className="main-content">
      <div className="top-bar">
        <div className="breadcrumb"><Link to="/" style={{color:'#D32F2F'}}>HOME</Link> &gt; {title.toUpperCase()}</div>
      </div>

      <div style={{maxWidth:'900px', margin:'40px auto', padding:'0 20px'}}>
        <div className="admin-card" style={{padding:'40px'}}>
          <h1 style={{fontFamily:'Oswald', color:'var(--text-dark)', borderBottom:'2px solid var(--brand-red)', paddingBottom:'10px'}}>{title}</h1>
          <div style={{lineHeight:'1.8', color:'var(--text-dark)', marginTop:'20px', fontSize:'16px'}} dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  );
};

export default StaticPage;