const express = require('express');
const { register, login } = require('../controllers/userControllers');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login); 

router.get('/protected', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Acesso à rota protegida!', user: req.user });
  });

module.exports = router;
