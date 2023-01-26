'use strict';

// Importation du package HTTP de Node; de l'application créée;

const http = require('http');
const app = require('./app');

// Initialisation serveur

const normalizePort = val => {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };

// Port valide

  const port = normalizePort(process.env.PORT || '3000');
  app.set('port', port);
  
// Gestion des différentes erreurs

  const errorHandler = error => {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
      default:
        throw error;
    }
  };
  
  const server = http.createServer(app);

  server.on('error', errorHandler);
  server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
  });
  
  server.listen(port);











/*




// On indique à l'application sur quel port elle doit fonctionner

app.set('port', process.env.PORT || 3000);

// Ici nous créeons un serveur à l'aide de la méthode createServer du package http de node.js . Ici, app est une fonction qui sera appelée à chaque requête reçue par le serveur.

const server = http.createServer(app);

// Ici, nous faisons en sorte que le serveur écoute les requêtes envoyées grâce à la méthode listen, sur le port que l'on souhaite "écouter"

server.listen(process.env.PORT || 3000);

*/