import net from 'net';

const HOST = '0.0.0.0';   // Listen on all network interfaces
const PORT = 5009;        // Choose a port for your server

const server = net.createServer((socket) => {
  console.log(`Connected by ${socket.remoteAddress}:${socket.remotePort}`);

  // Receive data from the client
  socket.on('data', (data) => {
    console.log(`Received: ${data.toString('utf-8')}`);

    // Send a response back to the client
    const response = 'Hello from the TCP server!';
    socket.write(response, 'utf-8');
  });

  // Handle client disconnect
  socket.on('end', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Server listening on ${HOST}:${PORT}...`);
});
