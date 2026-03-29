
import React, { useState } from "react";
import axios from "axios";

const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY";

function ImageWorkflow() {
    const [file, setFile] = useState(null);
    const [analysis, setAnalysis] = useState("");
    const [variations, setVariations] = useState([]);

    const analyzeImage = async () => {
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64 = reader.result;
            const res = await axios.post("https://api.openai.com/v1/chat/completions", {
                model: "gpt-4",
                messages: [
                    { role: "system", content: "You are an image analyzer. Describe objects, style, and theme." },
                    { role: "user", content: `Analyze this image (base64): ${base64}` }
                ],
                max_tokens: 150
            }, { headers: { Authorization: `Bearer ${OPENAI_API_KEY}` } });
            setAnalysis(res.data.choices[0].message.content);
        };
        reader.readAsDataURL(file);
    };

    const generateVariations = async () => {
        if (!analysis) return;
        const urls = [];
        for (let i = 0; i < 3; i++) {
            const res = await axios.post("https://api.openai.com/v1/images/generations", {
                prompt: analysis + " variation " + (i+1),
                n: 1,
                size: "512x512"
            }, { headers: { Authorization: `Bearer ${OPENAI_API_KEY}` } });
            urls.push(res.data.data[0].url);
        }
        setVariations(urls);
    };

    return (
        <div>
            <h2>Image Workflow</h2>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={analyzeImage}>Analyze</button>

            {analysis && (
                <div>
                    <h3>Analysis</h3>
                    <p>{analysis}</p>
                    <button onClick={generateVariations}>Generate Variations</button>
                </div>
            )}

            {variations.length > 0 && (
                <div>
                    <h3>Variations</h3>
                    {variations.map((url, idx) => <img key={idx} src={url} alt="variation" style={{maxWidth:"200px", margin:"5px"}}/>)}
                </div>
            )}
        </div>
    );
}

export default ImageWorkflow;