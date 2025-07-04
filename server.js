const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

const fallEvents = [];

// POST route to receive fall data
app.post('/api/fall', (req, res) => {
  const data = req.body;
  if (!data || !data.event || !data.timestamp) {
    return res.status(400).send('Invalid data format');
  }
  fallEvents.push(data);
  console.log('✅ Received fall data:', data);
  res.status(200).send('Fall event recorded');
});

// GET route to provide all fall events as JSON
app.get('/api/fall-events', (req, res) => {
  res.json(fallEvents);
});

// Serve fall.html for /fall route
app.get('/fall', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'fall.html'));
});

// Home debug view (optional, can be removed if you want)
app.get('/debug', (req, res) => {
  let html = `<h1>Fall Events Log</h1><ul>`;
  fallEvents.forEach(event => {
    html += `<li><strong>Time:</strong> ${event.timestamp} | <strong>Event:</strong> ${event.event}</li>`;
  });
  html += `</ul>`;
  res.send(html);
});
app.get('/location', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'location.html'));
});

app.get('/speed', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'speed.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
