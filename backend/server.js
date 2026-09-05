require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Routes Import
const newsRoute = require('./routes/newsRoute');
const authRoute = require('./routes/auth');
const fetchNewsRoute = require('./routes/fetchNews');

// 1. APP KO SABSE PEHLE BANAO
const app = express();

// 2. MIDDLEWARE LAGAO (CORS & JSON)
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type'] 
}));
app.use(express.json()); 

// 3. STATIC FILES (IMAGES KE LIYE)
app.use('/uploads', express.static('uploads'));

// 4. ROUTES LAGAO
app.use('/api/news', newsRoute);
app.use('/api/auth', authRoute);
app.use('/api/fetch', fetchNewsRoute);
app.use('/api/payment', require('./routes/payment'));
app.use('/api/ai', require('./routes/ai'));
// 5. DATABASE CONNECT KARO
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/newspoint')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// 6. SERVER START KARO
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));