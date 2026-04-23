const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const router = require('./router');

const app = express();
const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 5000;

app.use(router);

io.on('connection', (socket) => {
  console.log('enter');
  socket.emit('enter', 'Welcome!');

  socket.on('sendMessage', (message) => {
    io.emit('receiveMessage', message);
  })

  socket.on('disconnect', () => {
    console.log('exit');
  })
});

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

