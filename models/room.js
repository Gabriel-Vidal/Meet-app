const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Importa o UUID

const roomSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4, // Gera um UUID automaticamente
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false, // Opcional
  },
  capacity: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true, // Padrão para verdadeiro
  },
  createdAt: {
    type: Date,
    default: Date.now, // Gera a data atual automaticamente
  },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
