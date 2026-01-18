const rateLimit = require('express-rate-limit');

// Limite global (proteção contra DoS)
exports.globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,                // 100 requisições por IP
  standardHeaders: true,
  legacyHeaders: false,
});

// Limite específico para login (Brute Force)
exports.loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5,                  // 5 tentativas
  message: {
    erro: "Muitas tentativas. Tente novamente em 15 minutos."
  },
  standardHeaders: true,
  legacyHeaders: false,
});
