const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded( { extended: true } ));
app.use(cors())
app.use(morgan('dev'));

//Importando Rotas
const itemRoute = require('./routes/item');
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');

//Nomeando as rotas
app.use('/api/item', itemRoute);
app.use('/api/login', loginRoute);
app.use('/api/register', registerRoute);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

const port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
