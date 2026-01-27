const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { loginLimiter } = require('../middlewares/limiters');
const { verificarToken } = require('../middlewares/auth')
// router.post('/login', loginLimiter, userController.login);

//Rotas publicas
router.post('/register', userController.cadastrarUsuario);
router.post('/login', loginLimiter, userController.login);

//Rotas privadas
router.get('/', verificarToken, userController.listarUsuarios);
router.get('/:id', verificarToken, userController.buscarUsuarioPorId);
router.put('/:id', verificarToken, userController.atualizarUsuario);
router.delete('/:id', verificarToken, userController.removerUsuario);

module.exports = router;
