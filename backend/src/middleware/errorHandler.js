function errorHandler(err, req, res, next) {
  console.error('[ERROR]', err.message);

  if (err.message?.includes('malformed JSON')) {
    return res.status(502).json({
      error: 'The assistant had trouble structuring a response. Please try rephrasing.',
    });
  }
  if (err.message?.includes('API key') || err.message?.includes('API_KEY')) {
    return res.status(500).json({ error: 'Server configuration error. Contact support.' });
  }

  return res.status(500).json({ error: 'Something went wrong. Please try again.' });
}

module.exports = errorHandler;