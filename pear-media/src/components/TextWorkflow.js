
import React, { useState } from "react";
import axios from "axios";

const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY";

function TextWorkflow() {
    const [prompt, setPrompt] = useState("");
    const [enhancedPrompt, setEnhancedPrompt] = useState("");
    const [generatedImage, setGeneratedImage] = useState("");

    const enhanceText = async () => {
        const res = await axios.post("https://api.openai.com/v1/chat/completions", {
            model: "gpt-4",
            messages: [
                { role: "system", content: "You are a creative prompt enhancer." },
                { role: "user", content: prompt }
            ],
            max_tokens: 100
        }, {
            headers: { Authorization: `Bearer ${OPENAI_API_KEY}` }
        });
        setEnhancedPrompt(res.data.choices[0].message.content);
    };
  {loading && <p>Loading... ⏳</p>}
    const generateImage = async () => {
        const res = await axios.post("https://api.openai.com/v1/images/generations", {
            prompt: enhancedPrompt,
            n: 1,
            size: "512x512"
        }, {
            headers: { Authorization: `Bearer ${OPENAI_API_KEY}` }
        });
        setGeneratedImage(res.data.data[0].url);
    };

    return (
        <div>
            <h2>Text Workflow</h2>
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Enter prompt..." />
            <br/>
            <button onClick={enhanceText}>Enhance Prompt</button>

            {enhancedPrompt && (
                <div>
                    <h3>Enhanced Prompt</h3>
                    <p>{enhancedPrompt}</p>
                    <button onClick={generateImage}>Generate Image</button>
                </div>
            )}

            {generatedImage && (
                <div>
                    <h3>Generated Image</h3>
                    <img src={generatedImage} alt="Generated" style={{maxWidth:"400px"}} />
                </div>
            )}
        </div>
    );
}

export default TextWorkflow;