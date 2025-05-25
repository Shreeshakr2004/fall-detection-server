const express = require('express');
const app = express();
const path = require('path');
const fallEvents = [];

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/fall', (req, res) => {
  const data = req.body;
  fallEvents.push({ ...data, time: new Date() });
  res.send('Fall event recorded.');
});

app.get('/api/fall-events', (req, res) => {
  res.json(fallEvents);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
