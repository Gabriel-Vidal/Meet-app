const { v4: uuidv4 } = require('uuid'); 
const Room = require('../models/room');


exports.createRoom = async (req, res) => {
  const { name, description, capacity } = req.body;

  if (typeof capacity !== 'number') {
    return res.status(400).json({ message: 'A capacidade deve ser um número.' });
  }

  try {
    const newRoom = new Room({
      name,
      description,
      capacity,
      createdBy: req.user.id, 
    });

    await newRoom.save();
    res.status(201).json({ message: 'Sala criada com sucesso!', room: newRoom });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar sala', error });
  }
};

exports.getRooms = async (req, res) => {
    try {
        const rooms = await Room.find(); // Recupera todas as salas
        res.status(200).json(rooms); // Retorna a lista de salas
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao listar salas', error });
    }
};
  exports.joinRoom = async (req, res) => {
  const { roomId } = req.body; 

  try {
    const room = await Room.findById(roomId); 

    if (!room) {
      return res.status(404).json({ message: 'Sala não encontrada' }); 
    }

    return res.status(200).json({ message: `Usuário entrou na sala ${room.name}`, room });

    
    io.emit('userJoined', { roomId, message: `Usuário entrou na sala ${room.name}` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao entrar na sala', error });
  }
};
