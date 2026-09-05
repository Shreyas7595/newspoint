const express = require('express');
const router = express.Router();
const axios = require('axios');
const News = require('../models/News');

router.post('/fetch-external', async (req, res) => {
    let { category } = req.body; 
    
    // APNI GNEWS API KEY YAHAN PASTE KAREIN
    const API_KEY = "6d776ed6d25135bae07ee4a3ae7ad1f0"; 

    // GNews ke hisaab se category fix karna (GNews mein 'politics' nahi hota)
    if (category === 'politics') category = 'nation';
    if (category === 'india') category = 'nation';
    if (category === 'jobs') category = 'business'; // Jobs ke liye business le lenge
    if (category === 'auto') category = 'business';
    if (category === 'lifestyle') category = 'entertainment';

    const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=in&max=10&apikey=${API_KEY}`;

    try {
        const response = await axios.get(url);
        const articles = response.data.articles;

        if (!articles || articles.length === 0) {
            return res.json({ message: "No articles found for this category." });
        }

        let savedCount = 0;

        for (const article of articles) {
            // Duplicate check
            const existingNews = await News.findOne({ title: article.title });
            
            if (!existingNews && article.title) {
                const newNews = new News({
                    title: article.title,
                    content: article.description || "Click to read more on the source website.",
                    image: article.image || `https://picsum.photos/seed/${category}/600/400`,
                    category: req.body.category // Original category save karein (jaise 'politics')
                });
                await newNews.save();
                savedCount++;
            }
        }

        res.json({ 
            message: `Success! ${savedCount} new articles saved.`,
            totalFetched: articles.length
        });

    } catch (error) {
        // Agar API key galat hai, toh ye error aayega
        console.error("🚨 FETCH ERROR:", error.response?.data || error.message);
        res.status(500).json({ 
            message: "Error fetching news. Check API Key or Backend Console." 
        });
    }
});

module.exports = router;