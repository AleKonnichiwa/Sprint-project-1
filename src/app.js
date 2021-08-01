const express = require('express');
const morgan = require('morgan');

//Swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'Delilah Resto',
        version: '1.0.0'
      }
    },
    apis: ['./src/app.js'],
  };
  const swaggerDocs = swaggerJsDoc(swaggerOptions);

  //Importacion de archivos particulares

  const {arrayInfo} = require('./info');
  const {isLoginUser} = require('./middleware');

  //Inicializacion del server
    const app = express();
    
    app.use(express.json());
    app.use(morgan('dev'));

    app.listen(5000, function() {
        console.log('Escuchando el puerto 5000!');
    });