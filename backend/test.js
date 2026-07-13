const fetch = global.fetch;

fetch("https://ai-sakhi-4xs9.onrender.com/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    message: "A stranger is posting my photos online without permission and threatening me."
  })
})
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);