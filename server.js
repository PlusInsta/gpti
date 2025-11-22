
const express = require('express');
const app = express();

// Parse URL‑encoded bodies (the form submits as x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// Handle POST /ollama
app.post('/ollama', async (req, res) => {
    const prompt = req.body.prompt || '';
    try {
        // Call Ollama API
        const ollamaResponse = await fetch('http://localhost:11434/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'gemma3:12b',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a bot replying to a user. Be brief, descriptive, and most importantly, fun! :D' +
                          'To use a new line, you must insert <br>. ' +
                          'To make bold text, wrap text between <span class="bold"> and </span>. ' +
                          'To make italic text, wrap text between <span class="italic"> and </span>. ' +
                          'Emoji cannot render on the user\'s device, so never use them.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                stream: false
            })
        });

        if (!ollamaResponse.ok) {
            throw new Error(`Ollama API error: ${ollamaResponse.status}`);
        }

        const json = await ollamaResponse.json();
        // Ollama returns an array of choices; pick the first one's content
        const text = json.message?.content || 'No response';
        res.send(text);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error communicating with Ollama');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Ollama proxy listening on port ${PORT}`);
});