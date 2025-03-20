require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

require('dotenv').config();

// Now you can access your API key like so:
//const apiKey = process.env.OPENAI_API_KEY;
//console.log('My OpenAI API Key:', apiKey);

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages: [{ role: "system", content: "You are a helpful AI assistant for a social service agency." }, { role: "user", content: message }],
        });

        res.json({ reply: response.choices[0].message.content });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Something went wrong!" });
    }
});

app.listen(3001, () => console.log('Server running on port 3001'));

export default App;