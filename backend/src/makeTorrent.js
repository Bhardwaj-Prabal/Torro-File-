const crypto = require('crypto');
const dgram = require('dgram');
const fs = require('fs');

// Example function to split the file, check node status, generate hashes, and create torrent file
function makeTorrentFile(fileBuffer) {
  return new Promise((resolve, reject) => {
    const chunkSize = 1024 * 1024; // 1MB per chunk
    const ipAddresses = ["192.168.1.1", "192.168.1.2", "192.168.1.3"]; // Example IPs to check for active nodes

    const chunks = [];
    const activeNodes = [];

    // Split file into chunks
    for (let i = 0; i < fileBuffer.length; i += chunkSize) {
      chunks.push(fileBuffer.slice(i, i + chunkSize));
    }

    // UDP setup to check node status (ping)
    const udpClient = dgram.createSocket('udp4');
    let activeNodeCount = 0;
    let responses = 0;

    // Function to check node status via UDP
    function checkNodeStatus(ip) {
      return new Promise((resolve, reject) => {
        const message = Buffer.from('ping'); // Simple ping message
        udpClient.send(message, 0, message.length, 12345, ip, (err) => {
          if (err) {
            reject(err);
          }
        });

        udpClient.on('message', (msg, rinfo) => {
          if (rinfo.address === ip) {
            activeNodes.push(ip); // Node is active
            responses++;
            resolve();
          }
        });

        udpClient.on('error', (err) => {
          reject(err);
        });
      });
    }

    // Check the status of each node
    Promise.all(ipAddresses.map(ip => checkNodeStatus(ip)))
      .then(() => {
        // After checking nodes, proceed with chunking and hashing
        const chunkHashes = chunks.map(chunk => {
          const hash = crypto.createHash('sha256');
          hash.update(chunk);
          return hash.digest('hex');
        });

        // Now, we distribute the chunks to the active nodes
        const nodeChunks = distributeChunksToNodes(chunks, activeNodes);

        // Create .torrent file with metadata (for simplicity, only including chunk hashes and node IPs)
        const torrentData = {
          chunkHashes,
          activeNodes,
          timestamp: Date.now(),
        };

        const torrentFile = JSON.stringify(torrentData, null, 2);
        fs.writeFileSync('file.torrent', torrentFile);

        console.log('Torrent file created successfully!');
        resolve({ chunkHashes, activeNodes, torrentFile });
      })
      .catch((err) => {
        console.error("Error checking nodes:", err);
        reject(err);
      });
  });
}

// Function to distribute chunks to the active nodes
function distributeChunksToNodes(chunks, activeNodes) {
  let nodeIndex = 0;
  let chunkIndex = 0;

  const nodeChunks = activeNodes.map(() => []);

  // Distribute chunks to at most 3 nodes
  while (chunkIndex < chunks.length) {
    nodeChunks[nodeIndex].push(chunks[chunkIndex]);
    chunkIndex++;
    nodeIndex = (nodeIndex + 1) % 3; // At most 3 nodes
  }

  // Send chunks to each active node using TCP (for simplicity, we're assuming a fixed port)
  activeNodes.forEach((node, index) => {
    const client = new net.Socket();
    client.connect(5001, node, () => {
      console.log(`Connected to ${node}, sending chunks...`);
      nodeChunks[index].forEach(chunk => {
        client.write(chunk, 'binary');
      });
    });

    client.on('close', () => {
      console.log(`Chunks sent to ${node}`);
    });

    client.on('error', (err) => {
      console.error(`Error with ${node}:`, err);
    });
  });
}

module.exports = { makeTorrentFile };
