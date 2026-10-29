import net from 'net';
import { createRouter } from './router.js';
import { createLogger } from './logger.js';
import { createFileServer } from './file_server.js';
import { createEncoderDecoder } from './encode_decode.js';

const HOST = '0.0.0.0';   // Listen on all network interfaces
const PORT = 5008;        // Choose a port for your server

const app = createEncoderDecoder(createLogger(createFileServer(createRouter())));

const server = net.createServer((socket) => {
  console.log(`Connected by ${socket.remoteAddress}:${socket.remotePort}`);

  // Receive data from the client
  socket.on('data', (data) => {
    let response = app(data);
    socket.write(response.toString(), 'utf-8');
  });

  // Handle client disconnect
  socket.on('end', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Server listening on ${HOST}:${PORT}...`);
});
