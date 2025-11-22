# gpti
Ollama client that runs in the Nintendo DSi Browser. Why not?

![Screenshot](https://github.com/PlusInsta/gpti/blob/main/screenshot.png?raw=true)

## Disclaimer
This was primarily created with AI, because I hate the thought of learning JavaScript. I used WebStorm IDE paired with GPT-OSS 20B running locally with Ollama. Parts were touched up, but this is still primarily AI-generated, including the two background images made with deliberate-v2.

## How it works
1. Spin up a web server with index.html. (This is the frontend.)
2. Run `npm install && npm start` in the folder. (This is the Ollama communication part.)
3. Obviously, you need to have Ollama running on port 11434.
4. On the Nintendo DSi, open the browser, and navigate to the web server.
5. Enter a prompt on the Touch Screen.
6. Tap "Submit".
7. The response from the LLM will appear on the Top Screen.

It is not currently possible to scroll the Top Screen view, so the response may overflow past the bounding box. It works reasonably well with gemma3:12b, but it ultimately depends on the system prompt and the model being used.

I might want to add functionality to this, like testing it with the original Nintendo DS Browser software to make sure it works, and supporting the Nintendo 3DS version of the browser with a bigger resolution and potentially image uploads for vision-enabled models. (Would it be able to recognize my favorite Animal Crossing villager from an Animal Crossing: New Leaf screenshot?)
