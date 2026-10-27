
const express = require('express');
const router = express.Router();
const News = require('../models/News');
const multer = require('multer');
const path = require('path');

// File upload setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// SEARCH NEWS
router.get('/search', async (req, res) => {
    const { q } = req.query;

    try {
        if (!q || !q.trim()) {
            return res.status(400).json({
                message: 'Search query is required'
            });
        }

        const searchRegex = q.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        const news = await News.find({
            $or: [
                { title: { $regex: searchRegex, $options: 'i' } },
                { content: { $regex: searchRegex, $options: 'i' } }
            ]
        });

        res.status(200).json(news);
    } catch (err) {
        console.error('Search error:', err);
        res.status(500).json({ message: err.message });
    }
});

// GET ALL NEWS WITH CATEGORY FILTER
router.get('/', async (req, res) => {
    try {
        const filter = {};

        if (req.query.category) {
            const category = req.query.category.trim();

            // Case-insensitive category matching
            const escapedCategory = category.replace(
                /[.*+?^${}()|[\]\\]/g,
                '\\$&'
            );

            filter.category = {
                $regex: `^${escapedCategory}$`,
                $options: 'i'
            };
        }

        const news = await News.find(filter).sort({ date: -1 });

        res.status(200).json(news);
    } catch (err) {
        console.error('Error fetching news:', err);

        res.status(500).json({
            message: 'Failed to fetch news',
            error: err.message
        });
    }
});

// GET SINGLE NEWS
router.get('/:id', async (req, res) => {
    try {
        const news = await News.findById(req.params.id);

        if (!news) {
            return res.status(404).json({
                message: 'News not found'
            });
        }

        res.status(200).json(news);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE NEWS WITH IMAGE UPLOAD
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const imageUrl = req.file
            ? `/uploads/${req.file.filename}`
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
        console.error('Create news error:', err);
        res.status(400).json({ message: err.message });
    }
});

// UPDATE NEWS
router.put('/:id', async (req, res) => {
    try {
        const news = await News.findById(req.params.id);

        if (!news) {
            return res.status(404).json({
                message: 'News not found'
            });
        }

        news.title = req.body.title || news.title;
        news.content = req.body.content || news.content;
        news.category = req.body.category || news.category;
        news.image = req.body.image || news.image;

        const updatedNews = await news.save();

        res.status(200).json(updatedNews);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE NEWS
router.delete('/:id', async (req, res) => {
    try {
        const news = await News.findById(req.params.id);

        if (!news) {
            return res.status(404).json({
                message: 'News not found'
            });
        }

        await news.deleteOne();

        res.status(200).json({
            message: 'News deleted'
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

