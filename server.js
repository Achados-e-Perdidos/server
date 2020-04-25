const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const path = require("path");

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

app.use(
  "/files",
  express.static(path.resolve(__dirname, "uploads"))
);

mongoose.connect(
  process.env.DB_CONNECT, 
  {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
  }, () => 
  console.log("Connect DB!!!")
);

//Nomeando as rotas
app.use('/api/item', itemRoute);
app.use('/api/login', loginRoute);
app.use('/api/register', registerRoute);

const port = process.env.PORT;

app.listen(port, function () {
  console.log(`Listening on port ${port}!`);
});
