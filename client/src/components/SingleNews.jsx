import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const SingleNews = () => {
  const { id } = useParams(); // URL se news ki ID lega
  const [news, setNews] = useState(null);
  
  // --- 1. TTS State & Function ---
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel(); // Rukao
      setIsSpeaking(false);
      return;
    }

    const text = `${news.title}. ${news.content}`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN'; // Hindi mein bolne ke liye
    utterance.onend = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  // --- 2. AI Summary State & Function ---
  const [summary, setSummary] = useState("");

  const getAISummary = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/ai/summarize', { text: news.content });
      setSummary(res.data.summary);
        } catch (err) {
      // alert("AI Summary failed..."); // Ye hata do
      console.error("AI Error:", err);
      // User ko silently bata do ki feature available hai par key lagani padegi
      alert("AI Feature requires API key configuration.");
    }
  };
  // ---------------------------------------

  // --- 3. Data Fetching ---
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/news/${id}`);
        setNews(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNews();
  }, [id]);

  if (!news) return <div className="main-content" style={{padding:'40px', textAlign:'center'}}><h2>Loading Article...</h2></div>;

  const getImage = (cat) => `https://picsum.photos/seed/${cat}${Math.random()}/1000/500`;
  
  return (
    <div className="main-content">
      <div className="top-bar">
        <div className="breadcrumb"><Link to="/" style={{color:'#D32F2F'}}>HOME</Link> &gt; {news.category.toUpperCase()}</div>
      </div>

      <article style={{maxWidth:'800px', margin:'0 auto', padding:'40px 20px'}}>
        <div className="hero-cat" style={{fontSize:'16px', marginBottom:'10px'}}>{news.category}</div>
        
        <h1 style={{fontFamily:'Oswald', fontSize:'42px', lineHeight:'1.1', margin:'0 0 20px 0', color:'var(--text-dark)'}}>
          {news.title}
        </h1>
        
        <p style={{color:'#888', marginBottom:'30px', fontSize:'14px'}}>
          Published on {new Date(news.date).toLocaleDateString()} at {new Date(news.date).toLocaleTimeString()} | By NewsPoint Desk
        </p>

        {/* Buttons Section (Listen & AI) */}
        <div style={{display:'flex', gap:'15px', marginBottom:'30px', flexWrap:'wrap'}}>
          <button 
            onClick={handleSpeak} 
            style={{
              background: isSpeaking ? '#ff4444' : '#212121', 
              color: 'white', border: 'none', padding: '12px 25px', 
              borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
            }}
          >
            {isSpeaking ? '⏹️ Stop Speaking' : '🎧 Listen'}
          </button>

          {/* AI Summary Button ya Text */}
          {!summary ? (
            <button 
              onClick={getAISummary} 
              style={{
                background: '#2196f3', color: 'white', border: 'none', 
                padding: '12px 25px', borderRadius: '25px', cursor: 'pointer', 
                fontWeight: 'bold', boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
              }}
            >
              ✨ Get AI Summary
            </button>
          ) : null}
        </div>

        {/* AI Summary Dikhane ka Box (Agar summary aa gaya toh) */}
        {summary && (
          <div style={{background:'#e3f2fd', padding:'20px', borderRadius:'8px', marginBottom:'30px', borderLeft:'5px solid #2196f3', lineHeight:'1.6'}}>
            <strong style={{fontSize:'16px', color:'#0d47a1'}}>🤖 AI Summary:</strong><br/><br/>
            {summary}
          </div>
        )}

        <div style={{width:'100%', height:'450px', borderRadius:'10px', overflow:'hidden', marginBottom:'30px'}}>
         <img src={news.image || getImage(news.category)} alt={news.title} style={{width:'100%', height:'100%', objectFit:'cover'}} />
        </div>

        <div style={{fontSize:'18px', lineHeight:'1.8', color:'var(--text-dark)', textAlign:'justify'}}>
          {news.content}
        </div>

        <div style={{marginTop:'40px', padding:'20px', background:'var(--bg-light)', borderRadius:'8px', textAlign:'center'}}>
          <Link to="/" style={{color:'#D32F2F', fontWeight:'bold', fontSize:'18px'}}>⬅ BACK TO HOME</Link>
        </div>
      </article>
    </div>
  );
};

export default SingleNews;