const express = require('express');
const router = express.Router();
const News = require('../models/News');
const multer = require('multer'); // <--- ADD KIYA
const path = require('path');     // <--- ADD KIYA

// File Save karne ka setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage: storage });
// SEARCH FUNCTIONALITY
router.get('/search', async (req, res) => {
    const { q } = req.query;
    try {
        const news = await News.find({ 
            $or: [
                { title: { $regex: q, $options: 'i' } },
                { content: { $regex: q, $options: 'i' } }
            ]
        });
        res.json(news);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET ALL NEWS (with category filter)
router.get('/', async (req, res) => {
    try {
        // Agar URL mein ?category=Sports hai, toh wahi news laao, nahi toh sab laao
        const filter = req.query.category ? { category: req.query.category } : {};
        const news = await News.find(filter).sort({ date: -1 });
        res.json(news);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET SINGLE NEWS (Edit karne ke liye)
router.get('/:id', async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        res.json(news);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST NEWS (With Image)
// Note: Multer middleware use karne ke liye server.js mein route lagna padega, 
// yahan hum simple image URL string maan rahe hain ki admin frontend se URL dega ya file upload karega.
router.post('/', upload.single('image'), async (req, res) => {
    try {
        // Check: Agar file upload hui hai toh uska path lo, nahi toh URL string lo
        const imageUrl = req.file 
            ? `http://localhost:5000/${req.file.path.replace(/\\/g, '/')}` 
            : req.body.image;

        const newsItem = new News({
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            image: imageUrl 
        });

        const newNews = await newsItem.save();
        res.status(201).json(newNews);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// UPDATE NEWS
router.put('/:id', async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (news) {
            news.title = req.body.title || news.title;
            news.content = req.body.content || news.content;
            news.category = req.body.category || news.category;
            news.image = req.body.image || news.image;
            
            const updatedNews = await news.save();
            res.json(updatedNews);
        } else {
            res.status(404).json({ message: 'News not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE NEWS
router.delete('/:id', async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (news) {
            await news.deleteOne();
            res.json({ message: 'News deleted' });
        } else {
            res.status(404).json({ message: 'News not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;