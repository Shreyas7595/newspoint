import React, { useState, useEffect } from 'react';
import axios from 'axios'; // <--- YE LINE ZAROORI HAI
import '../App.css';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  
  // APNI OPENWEATHERMAP API KEY YAHAN PASTE KAREIN (Quotes ke andar)
  const API_KEY = "71e85cde5242eb03f291d92acb3ee935"; 
  const city = "Mumbai"; 

  useEffect(() => {
    const fetchWeather = async () => {
      // Check karein ki key paste ki hai ya nahi
      if(API_KEY === "71e85cde5242eb03f291d92acb3ee935") {
        console.warn("Weather API Key nahi mili, dummy data dikh raha hai.");
        return;
      }

      try {
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        console.log("Weather Data aaya:", res.data); // Check karne ke liye
        setWeather(res.data);
      } catch (err) {
        console.error("WEATHER API ERROR:", err.response?.data?.message || err.message);
      }
    };
    fetchWeather();
  }, [city, API_KEY]);

  // Agar API load nahi hua, toh fallback (default) data
  const temp = weather?.main?.temp || "32";
  const feelsLike = weather?.main?.feels_like || "34";
  const humidity = weather?.main?.humidity || "45";
  const wind = weather?.wind?.speed || "12";
  const condition = weather?.weather?.[0]?.description || "Clear Sky";
  const cityName = weather?.name || city;

  return (
    <div className="widget-3d-card">
      <h3 className="widget-3d-title">🌤️ Live Weather: {cityName}</h3>
      
      <div className="cube-container">
        <div className="cube">
          <div className="face front weather-face" style={{color: '#fff'}}>
            <div style={{fontSize:'32px', fontWeight:'bold', margin:'5px 0'}}>{temp}°C</div>
            <div style={{fontSize:'16px', marginTop:'5px'}}>{cityName}</div>
          </div>

          <div className="face back weather-face" style={{color: '#fff', textAlign: 'center'}}>
            <div style={{fontSize:'50px', lineHeight: '1'}}>☀️</div>
            <div style={{fontSize:'18px', fontWeight: 'bold', marginTop: '10px', textTransform:'capitalize'}}>{condition}</div>
          </div>

          <div className="face right weather-face" style={{color: '#fff'}}>
            <div style={{fontSize:'11px', opacity:0.9, fontWeight:'bold'}}>HUMIDITY</div>
            <div style={{fontSize:'32px', fontWeight:'bold', margin:'5px 0'}}>{humidity}%</div>
          </div>

          <div className="face left weather-face" style={{color: '#fff'}}>
            <div style={{fontSize:'11px', opacity:0.9, fontWeight:'bold'}}>WIND</div>
            <div style={{fontSize:'32px', fontWeight:'bold', margin:'5px 0'}}>{wind} km/h</div>
          </div>

          <div className="face top weather-face" style={{color: '#fff'}}>
            <div style={{fontSize:'11px', opacity:0.9, fontWeight:'bold'}}>FEELS LIKE</div>
            <div style={{fontSize:'24px', fontWeight:'bold'}}>{feelsLike}°C</div>
          </div>
          
          <div className="face bottom weather-face" style={{color: '#fff'}}>
            <div style={{fontSize:'11px', opacity:0.9, fontWeight:'bold'}}>{cityName}</div>
            <div style={{fontSize:'14px'}}>{weather ? "Live Data" : "Offline"}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;