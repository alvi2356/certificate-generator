const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

let certificateCount = 0;
let generatedCertificates = []; // 🆕 List of generated certificate names

const ADMIN_PASSWORD = "admin123";

// Simulate certificate generation
app.post('/generate-certificate', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ success: false, message: "Name is required." });
  }

  certificateCount++;
  generatedCertificates.push(name); // 🆕 Save the name

  res.json({ success: true, message: "Certificate generated." });
});

// Admin password check
app.post('/verify-password', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// Admin stats
app.get('/stats', (req, res) => {
  res.json({
    totalGenerated: certificateCount,
    names: generatedCertificates // 🆕 Send list of names
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
