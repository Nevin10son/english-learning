const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Dummy function to simulate grammar mistake detection
const detectGrammarMistakes = (text) => {
    const mistakes = [];

    // Example: Simulating mistake detection
    if (text.includes("she go to school")) {
        mistakes.push({ mistake: "she go to school", suggestion: "she goes to school" });
    }
    if (text.includes("he have a car")) {
        mistakes.push({ mistake: "he have a car", suggestion: "he has a car" });
    }

    return mistakes;
};

// API to process text
app.post("/process-text", (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: "No text provided" });
    }

    // Detect grammar mistakes
    const mistakes = detectGrammarMistakes(text);

    res.json({ mistakes });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
