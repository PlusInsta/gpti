
const express = require('express');
const app = express();

// Parse URL‑encoded bodies (the form submits as x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// Handle POST /ollama
app.post('/ollama', async (req, res) => {
    const prompt = req.body.prompt || 'I just wanted to say hi.';
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
                        content: 'You are a helpful and quick chatbot. Be brief and concise. Use up to four paragraphs.\n' +
                          'Use \<br\> for new lines in text.\n' +
                          'Use <span> with style="font-size: 16px" for headers. Remember to end with </span>.\n' +
                          'Use <span> with style="font-size: 12px" for smaller headers.\n' +
                          'You can use style="color:blue" for special highlight of important words and phrases.'
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