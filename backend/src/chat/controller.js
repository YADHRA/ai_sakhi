const { getLegalAssessment } = require('./gemini.service');
const { mapAssessmentToResponse } = require('./transform');

async function handleChat(req, res, next) {
  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required.' });
    }
    if (message.length > 2000) {
      return res.status(400).json({ error: 'Message too long (max 2000 characters).' });
    }

    const assessment = await getLegalAssessment(history, message.trim());
    return res.status(200).json({ success: true, data: mapAssessmentToResponse(assessment) });
  } catch (err) {
    next(err);
  }
}

module.exports = { handleChat };