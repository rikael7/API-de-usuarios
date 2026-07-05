const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const { globalLimiter } = require('./middlewares/limiters');

const app = express();
const PORT = 3000;

app.use(globalLimiter);

app.use(bodyParser.json());


// infos sobre mim


app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


