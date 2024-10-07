const express = require('express');
const { createRoom, getRooms, joinRoom } = require('../controllers/roomController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Rota para criar uma nova sala (protegida)
router.post('/', authMiddleware, createRoom);
router.get('/', authMiddleware, getRooms);
router.post('/join', authMiddleware, joinRoom); 

module.exports = router;
