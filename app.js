// Importa o framework Express, usado para criar servidores web em Node.js
const express = require('express');

// Importa o body-parser, middleware que ajuda a interpretar o corpo das requisições (JSON, etc.)
const bodyParser = require('body-parser');

// Importa as rotas definidas em outro arquivo (userRoutes.js), responsáveis por lidar com /users
const userRoutes = require('./routes/userRoutes');

// Importa um middleware de limitação global (provavelmente para limitar requisições e evitar abusos)
const { globalLimiter } = require('./middlewares/limiters');

// Cria a aplicação Express
const app = express();

// Define a porta em que o servidor vai rodar
const PORT = 3000;

// Aplica o middleware de limitação global a todas as requisições
app.use(globalLimiter);

// Middleware para interpretar requisições com corpo em formato JSON
app.use(bodyParser.json());

// Define as rotas da aplicação: qualquer requisição para /users será tratada por userRoutes
app.use('/users', userRoutes);

// Inicia o servidor na porta definida e exibe uma mensagem no console
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});




// const express = require('express');
// const bodyParser = require('body-parser');
// const userRoutes = require('./routes/userRoutes');
// const { globalLimiter } = require('./middlewares/limiters');

// const app = express();
// const PORT = 3000;
// app.use(globalLimiter);

// // Middleware
// app.use(bodyParser.json());

// // Rotas
// app.use('/users', userRoutes);

// // Inicia o servidor
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });

