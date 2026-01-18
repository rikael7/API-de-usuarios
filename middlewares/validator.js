const { body, validationResult } = require('express-validator');

exports.validarCadastro = [
  body('nome').trim().isLength({ min: 3 }).escape(),
  body('email').isEmail().normalizeEmail(),
  body('senha').isLength({ min: 6 }),

  (req, res, next) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() });
    }
    next();
  }
];
