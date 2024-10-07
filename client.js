const socket = io('http://localhost:5000');


function joinRoom(roomId) {
  socket.emit('join-room', roomId);
}

function sendMessage(roomId, message) {
    socket.emit('sendMessage', { roomId, message });
  }

socket.on('receiveMessage', (message) => {
   console.log('Mensagem recebida:', message);
  });

function sendSignal(roomId, signalData) {
  socket.emit('signal', { roomId, signalData });
}


socket.on('signal', (data) => {
  console.log('Sinal recebido de:', data.userId);
  console.log('Dados do sinal:', data.signalData);
});

socket.on('userJoined', (data) => {
  console.log(data.message);
});

socket.on('userDisconnected', (data) => {
  console.log(data.message);
});


io.on('connection', (socket) => {
    console.log('Usuário conectado:', socket.id);

    socket.on('join-room', (roomId) => {
        socket.join(roomId);
        console.log(`Usuário ${socket.id} entrou na sala: ${roomId}`);
        
        // Emitir um evento para notificar que um novo usuário entrou na sala
        socket.to(roomId).emit('user-connected', socket.id);
    });

    // Evento para receber mensagens
    socket.on('send-message', (roomId, message) => {
        // Emitir a mensagem para todos os usuários na sala
        socket.to(roomId).emit('receive-message', message);
    });

    socket.on('disconnect', () => {
        console.log('Usuário desconectado:', socket.id);
        // Emitir um evento para notificar que um usuário desconectou
        socket.to(roomId).emit('user-disconnected', socket.id);
    });

    
});

