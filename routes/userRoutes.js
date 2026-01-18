const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const { loginLimiter } = require('../middlewares/limiters');

// router.post('/login', loginLimiter, userController.login);


router.post('/register', userController.cadastrarUsuario);
router.post('/login', loginLimiter, userController.login);
router.get('/', userController.listarUsuarios);
router.get('/:id', userController.buscarUsuarioPorId);
router.put('/:id', userController.atualizarUsuario);
router.delete('/:id', userController.removerUsuario);

module.exports = router;
