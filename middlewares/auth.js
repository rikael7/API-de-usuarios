const jwt = require('jsonwebtoken'); // Importa a biblioteca jsonwebtoken para lidar com tokens JWT
require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env

const SECRET_KEY = process.env.SECRET_KEY;

// verifica token
exports.verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // pega o token: "Bearer token"
   const token = authHeader && authHeader.split(' ')[1];


    if(!token) {
        return res.status(401).json({ erro: 'Token não fornecido!' });
    }// não tem token retorna isso

    jwt.verify(token, SECRET_KEY, (err, usuario) => {
        if(err) {
            console.error(err);
            return res.status(403).json({ erro: 'Token inválido ou expirado!' });
        }
        // Adiciona os dados do usuário no request
        req.usuario = usuario;
        next();
    });
};