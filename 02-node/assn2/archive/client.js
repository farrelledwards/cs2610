import net from 'net';

const HOST = '127.0.0.1';  // Server address (localhost). Change this to the IP address of the computer you want to connect to.
const PORT = 5008;         // Must match the server's port

const client = net.createConnection({ host: HOST, port: PORT }, () => {
  console.log('Connected to server');

  // Send a message to the server
  const message = 'Hello from the TCP client!';
  client.write(message, 'utf-8');
});

// Receive data from the server
client.on('data', (data) => {
  console.log(`Received from server: ${data.toString('utf-8')}`);
  client.end(); // Close the connection after receiving response
});

// Handle connection end
client.on('end', () => {
  console.log('Disconnected from server');
});
