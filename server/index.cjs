
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json({ limit: "20kb" }));

const JARVIS_INSTRUCTIONS = `
You are JARVIS, the friendly AI assistant for Nihas FX,
a video editor's portfolio.
Speak in friendly Tanglish when visitors use Tamil or Tanglish.
Use English when they prefer English.
Help visitors understand video editing services, portfolio projects,
pricing enquiries, and contact details.
Never invent prices or project details.
For unknown details, direct visitors to the portfolio contact section.
Be concise, professional, warm, and helpful.
`;

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", assistant: "JARVIS" });
});

app.post("/api/chat", async (req, res) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is missing in the .env file."
      });
    }

    const messages = req.body?.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Please send a message." });
    }

    const contents = messages.slice(-12).map(message => {
      if (
        !["user", "assistant"].includes(message.role) ||
        typeof message.content !== "string"
      ) {
        throw new Error("Invalid message format.");
      }

      return {
        role: message.role === "assistant" ? "model" : "user",
        parts: [{ text: message.content.slice(0, 2000) }]
      };
    });

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY
    });

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-3.8-flash",
      contents,
      config: { systemInstruction: JARVIS_INSTRUCTIONS }
    });

    res.json({
      assistant: "JARVIS",
      reply: response.text || "Sorry, please ask me again."
    });
  } catch (error) {
    console.error("JARVIS Gemini error:", error.message);
    res.status(500).json({
      error: "JARVIS could not respond. Check the server terminal and API setup."
    });
  }
});

app.listen(PORT, () => {
  console.log(`JARVIS (Gemini) running at http://localhost:${PORT}`);
});
