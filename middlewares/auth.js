const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

exports.verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // Espera o formato: "Bearer token"
   const token = authHeader && authHeader.split(' ')[1];


    if(!token) {
        return res.status(401).json({ erro: 'Token não fornecido!' });
    }

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