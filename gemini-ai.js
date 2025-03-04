import fetch from 'node-fetch';

const GOOGLE_API_KEY = "AIzaSyBtmeJKqIhisy7gaX3ypkd8xHspOm8SNx0";

async function getGeminiResponse(question, prompt) {
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${GOOGLE_API_KEY}`;

    const requestBody = {
        contents: [
            { parts: [{ text: prompt[0] }] },
            { parts: [{ text: question }] }
        ]
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        const modelResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received";
        console.log("This is the response from the model:", modelResponse);
        return modelResponse;
    } catch (error) {
        console.error("Error fetching Gemini response:", error);
        return "Error";
    }
}

// Example usage
getGeminiResponse("What is AI?", ["Explain AI in simple terms"]);
