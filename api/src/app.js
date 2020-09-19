const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

/*****************
 * Configurações *
 *****************/
// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Arquivos estáticos
if (process.env.USE_BUILD_FILES === 'true') {
  app.use(express.static(path.join(__dirname, '../../web/build')));
  app.get('/', (req, res) =>
    res.sendFile('index.html', { root: `../api-pagarme/web/build/` }),
  );
}

// Morgan
app.use(morgan('tiny'));

// Cors
app.use(cors());

/******************
 * Importar Rotas *
 ******************/
const resendBoleto = require('./routes/resend-boleto');
app.use('/api', resendBoleto);

module.exports = app;
