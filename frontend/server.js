const express = require('express');
const cors = require('cors');
const fs = require('fs'); // Added to read/write files
const app = express();

app.use(cors());
app.use(express.json());

const DATA_FILE = './count.json';

// Function to load the count from the file
function loadCount() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data).count;
  } catch (err) {
    return 0; // If file doesn't exist, start at 0
  }
}

// Function to save the count to the file
function saveCount(num) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ count: num }));
}

let smashCount = loadCount(); // Initialize with the saved number

app.post('/api/smash', (req, res) => {
  smashCount++; 
  saveCount(smashCount); // Save to file every time someone smashes
  res.json({ 
    message: "SMASH registered", 
    count: smashCount 
  });
});

// Other routes...
app.get('/api/fortune', (req, res) => res.json({ fortune: "Your persistence will pay off!" }));

app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));