const app = require('../src/app');
const http = require('http');

// Definindo a porta do servidor
const port = normalizePort(process.env.PORT || 3030);
app.set('port', port);

function normalizePort(portValue) {
  const port = parseInt(portValue, 10);

  if (isNaN(port)) return portValue;
  if (port >= 0) return port;

  return false;
}

// error handler
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);

    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);

    default:
      throw error;
  }
}

// server
const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
console.log(`API is alive on ${port}!`);
