import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const CricketScore = () => {
  const [matches, setMatches] = useState([]);
  
  // APNI CRICAPI KEY YAHAN PASTE KAREIN
  const CRIC_API_KEY = "9d824fd8-da76-471d-8dfc-7644a534ab52"; 

  useEffect(() => {
    const fetchCricket = async () => {
      try {
        // Ye API currently running matches laakar degi
        const res = await axios.get(`https://api.cricapi.com/v1/currentMatches?apikey=${CRIC_API_KEY}&offset=0`);
        
        // Sirf wahi matches rakhein jinka data sahi aaya ho
        const validMatches = res.data.data.filter(match => match.name !== "Match not found");
        setMatches(validMatches);
      } catch (err) {
        console.error("Cricket API Error:", err);
      }
    };
    fetchCricket();
    
    // Cricket score 60 second mein auto-update hoga
    const interval = setInterval(fetchCricket, 60000);
    return () => clearInterval(interval);
  }, []);

  // Agar API nahi chali ya match nahi mila, toh default data
  const match = matches.length > 0 ? matches[0] : null;
  
  const team1 = match?.teams?.[0] || "IND";
  const team2 = match?.teams?.[1] || "AUS";
  const score1 = match?.score?.[0]?.r || "245/3";
  const score2 = match?.score?.[1]?.r || "180/5";
  const status = match?.status || "India needs 66 runs in 12 overs";
  const matchName = match?.name || "T20 World Cup";

  return (
    <div className="widget-3d-card">
      <h3 className="widget-3d-title">🏏 Live Cricket</h3>
      
      <div className="cube-container">
        <div className="cube">
          <div className="face front cricket-face" style={{color:'#fff'}}>
            <div style={{fontSize:'10px', color:'var(--brand-red)', fontWeight:'bold', overflow:'hidden', height:'15px'}}>{matchName}</div>
            <div style={{fontSize:'20px', fontWeight:'bold', margin:'5px 0'}}>{team1} vs {team2}</div>
            <div style={{fontSize:'12px', opacity:0.7}}>Live Match</div>
          </div>

          <div className="face back cricket-face" style={{color:'#fff'}}>
            <div style={{fontSize:'11px', opacity:0.9, fontWeight:'bold'}}>MATCH STATUS</div>
            <div style={{fontSize:'14px', fontWeight:'bold', margin:'10px 0', color:'#4CAF50', overflow:'hidden', height:'40px'}}>{status}</div>
          </div>

          <div className="face right cricket-face" style={{color:'#fff'}}>
            <div style={{fontSize:'11px', opacity:0.9, fontWeight:'bold'}}>{team1}</div>
            <div style={{fontSize:'28px', fontWeight:'bold', color:'var(--brand-red)', margin:'5px 0'}}>{score1}</div>
          </div>

          <div className="face left cricket-face" style={{color:'#fff'}}>
            <div style={{fontSize:'11px', opacity:0.9, fontWeight:'bold'}}>{team2}</div>
            <div style={{fontSize:'28px', fontWeight:'bold', color:'var(--brand-red)', margin:'5px 0'}}>{score2}</div>
          </div>

          <div className="face top cricket-face" style={{color:'#fff'}}>
            <div style={{fontSize:'11px', opacity:0.9, fontWeight:'bold'}}>UPDATES</div>
            <div style={{fontSize:'14px', fontWeight:'bold', margin:'10px 0'}}>Auto-Refreshing</div>
            <div style={{fontSize:'10px', color:'#4CAF50'}}>LIVE</div>
          </div>
          
          <div className="face bottom cricket-face" style={{color:'#fff'}}>
            <div style={{fontSize:'11px', opacity:0.9, fontWeight:'bold'}}>TOTAL MATCHES</div>
            <div style={{fontSize:'24px', fontWeight:'bold'}}>{matches.length}+</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CricketScore;