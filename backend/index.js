const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { makeTorrentFile } = require('./makeTorrentFile');  // Assuming this function exists

const app = express();

// In-memory storage for the uploaded file
let uploadedFile = null;

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload route
app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  uploadedFile = req.file.buffer; // File is stored in memory for processing

  // Call your function to process the file into chunks, create hashes, and send to nodes
  try {
    const result = await makeTorrentFile(uploadedFile);

    res.status(200).json({
      message: "File successfully processed and distributed to nodes.",
      result,
    });
  } catch (error) {
    console.error("Error during file processing:", error);
    res.status(500).send("Error during file processing.");
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
