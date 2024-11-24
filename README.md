
# 🧩 Torro Split

### Torrent-Based Secure File System

**Torro Split** is an organization-focused file system that leverages a torrent-like approach to securely manage and distribute files. This system divides secure files into encrypted chunks, ensuring that data is assembled only upon request by an authorized company employee.

---

## 🚀 Key Features

- **Decentralized Storage:** Files are split into encrypted chunks distributed across nodes.
- **Secure Access Control:** Files are reassembled only when requested by authorized users.
- **Redundancy:** Distributed storage ensures data availability and resilience.
- **Scalability:** Easily scales to handle large file sizes and increasing users.
- **Ledger System:** Tracks and logs all file access and retrieval activities for audit and verification purposes. This provides transparency and ensures compliance with internal policies.

---

## 📦 Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-repo/torro-split.git
   cd torro-split
   cd frontend
   ```

2. **Install Dependencies:**
   ```bash
   npm install  # For Node.js
   ```

3. **Configuration:**
   Edit the `config.json` file to set up:
   - Node addresses
   - Encryption keys
   - User authentication

4. **Start the System:**
   ```bash
   npm run dev
   ```

---

## ⚙️ How It Works

1. **File Upload:**

https://github.com/user-attachments/assets/4f452cd8-4d26-485b-8820-50520de8640f


   - Files are split into multiple chunks.
   - Each chunk is encrypted individually.

2. **File Distribution:**
   - Chunks are distributed to various nodes.
   - Redundancy ensures chunks are duplicated for reliability.

3. **File Retrieval:**
   - Authorized users request file reassembly.
   - The system gathers and decrypts chunks, verifying access rights.

---

## 🔒 Security

- **Chunk-level encryption** with advanced cryptographic standards.
- **User authentication** and authorization mechanisms.
- **Data integrity checks** ensure file consistency.

---

## 🤝 Contributing

Contributions are welcome! Open an issue or submit a pull request to improve Torro Split.

---

## 📧 Contact

**Maintainer:** [Prabal Bhardwaj](https://github.com/Bhardwaj-Prabal) , [Ranbeer Malhotra](https://github.com/rnbr04) , [Abhinav Parindiyal](https://github.com/MrParindiyal)




