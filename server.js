const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const fallEvents = []; // Stores all fall event data

// Route to receive fall data (POST)
app.post('/api/fall', (req, res) => {
  const data = req.body;
  if (!data || !('x' in data) || !('y' in data) || !('z' in data)) {
    return res.status(400).send('Invalid data');
  }

  const timestamp = new Date();
  fallEvents.push({ ...data, timestamp });
  console.log('Received fall data:', data);
  res.status(200).send('Fall event recorded');
});

// Homepage to display fall events (GET)
app.get('/', (req, res) => {
  let html = `<h1>Fall Events Log</h1>`;
  html += `<ul>`;
  fallEvents.forEach(event => {
    html += `<li><strong>Time:</strong> ${event.timestamp.toISOString()} | <strong>Data:</strong> x=${event.x}, y=${event.y}, z=${event.z}</li>`;
  });
  html += `</ul>`;
  res.send(html);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
