const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

const fallEvents = []; // Stores all fall event data

// POST route to receive fall event data from Arduino
app.post('/api/fall', (req, res) => {
  const data = req.body;
  if (!data || !data.event || !data.timestamp) {
    return res.status(400).send('Invalid data format');
  }

  fallEvents.push(data);
  console.log('Received fall data:', data);
  res.status(200).send('Fall event recorded');
});

// GET route to fetch all fall events
app.get('/api/fall-events', (req, res) => {
  res.json(fallEvents);
});

// Optional: Display events in HTML if user opens root URL
app.get('/', (req, res) => {
  let html = `<h1>Fall Events Log</h1>`;
  html += `<ul>`;
  fallEvents.forEach(event => {
    html += `<li><strong>Time:</strong> ${event.timestamp} | <strong>Event:</strong> ${event.event}</li>`;
  });
  html += `</ul>`;
  res.send(html);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
