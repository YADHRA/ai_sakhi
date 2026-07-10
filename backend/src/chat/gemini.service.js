const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('../config/env');
const { SYSTEM_PROMPT } = require('./prompt');

const genAI = new GoogleGenerativeAI(config.geminiApiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash',
  systemInstruction: SYSTEM_PROMPT,
  generationConfig: {
    responseMimeType: 'application/json',
    temperature: 0.3,
  },
});

async function getLegalAssessment(history, userMessage) {
  // Gemini requires: (1) roles of 'user'/'model' only, and (2) the history
  // must start with a 'user' turn. Our frontend seeds the chat with an
  // assistant greeting and uses 'content' (not 'text'), so we normalize
  // and trim both here.
  const normalized = history.map((h) => ({
    role: h.role === 'user' ? 'user' : 'model',
    parts: [{ text: h.content ?? h.text ?? '' }],
  }));

  const firstUserIndex = normalized.findIndex((h) => h.role === 'user');
  const sanitizedHistory = firstUserIndex === -1 ? [] : normalized.slice(firstUserIndex);

  const chat = model.startChat({ history: sanitizedHistory });

  const result = await chat.sendMessage(userMessage);
  const rawText = result.response.text();

  try {
    return JSON.parse(rawText);
  } catch (err) {
    throw new Error('Gemini returned malformed JSON: ' + rawText.slice(0, 200));
  }
}

module.exports = { getLegalAssessment };