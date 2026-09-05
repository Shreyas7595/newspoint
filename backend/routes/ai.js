const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: "PASTE_YOUR_OPENAI_API_KEY_HERE", // Apni key daalo
});

router.post('/summarize', async (req, res) => {
  try {
    const { text } = req.body;
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `Summarize this news article in exactly 3 bullet points in Hindi-English mix:\n\n${text}` }],
    });
    res.json({ summary: response.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ message: "AI Error" });
  }
});

module.exports = router;