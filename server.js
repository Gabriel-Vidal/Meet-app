const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const roomRoutes = require('./routes/roomRoutes');

const app = express();
const server = http.createServer(app);
const io = socketio(server);


app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/rooms', roomRoutes);

io.on('connection', (socket) => {
  console.log('Um usuário conectado:', socket.id);

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`Usuário ${socket.id} entrou na sala ${roomId}`);
    socket.to(roomId).emit('userJoined', { userId: socket.id, message: `Usuário ${socket.id} entrou na sala ${roomId}` });
  });

  socket.on('signal', (data) => {
    const { roomId, signalData } = data;
    socket.to(roomId).emit('signal', { userId: socket.id, signalData }); 
  });

  socket.on('sendMessage', ({ roomId, message }) => {
    io.to(roomId).emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('Usuário desconectado:', socket.id);
    socket.broadcast.emit('userDisconnected', { userId: socket.id, message: `Usuário ${socket.id} desconectou` });
  });
});


mongoose.connect('mongodb://localhost/meet-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB conectado'))
  .catch(err => console.log(err));


io.on('connection', (socket) => {
  console.log('Novo usuário conectado');
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
