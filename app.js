const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const { globalLimiter } = require('./middlewares/limiters');

const app = express();
const PORT = 3000;
app.use(globalLimiter);

//
//
//
// Middleware
app.use(bodyParser.json());

// Rotas
app.use('/users', userRoutes);

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
