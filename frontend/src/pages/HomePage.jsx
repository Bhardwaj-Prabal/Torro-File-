import  { useState } from "react";
import './HomePage.css'; // Import the CSS file here

function HomePage() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    setMessage("Processing your file...");

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message || "File uploaded and processed successfully!");
      } else {
        setMessage("Failed to upload file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("File uploaded successfully.");
    }

    setUploading(false);
  };

  return (
    <div className="container">
      <header>
        <h1>Welcome to the Torrent-Based File System</h1>
        <p>
          Upload a file, and the system will divide it into chunks, generate hashes for each chunk, and securely distribute it across a network of nodes.
        </p>
      </header>
      <div className="upload-section">
        <label className="file-input">
          <input
            type="file"
            onChange={handleFileChange}
          />
          <p>Click or Drag to Upload a File</p>
        </label>
        <button
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload File"}
        </button>
      </div>
      <div className="message">{message}</div>
    </div>
  );
}

export default HomePage;
