const express = require('express');
const router = require('./app/routes/routes');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

// URL de conexión a tu clúster de MongoDB Atlas
const uri = 'mongodb+srv://dbMongo:2323434twerdwasd@cluster0.lk1vbqd.mongodb.net/dbMongo';

// Configuración de la conexión a MongoDB
const options = {
  /* useUnifiedTopology: true, */
};

// Middleware para analizar el cuerpo de las solicitudes en formato de formulario
app.use(express.json());
let allowUrls = "*"

// Middleware para habilitar CORS
app.use(
  cors({
    origin: allowUrls,
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT"],
    credentials: true,
    // allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'device-remember-token', 'Access-Control-Allow-Origin', 'Origin', 'Accept']
  })
);


// Conexión a MongoDB
mongoose.connect(uri, options)
  .then(() => {
    
    app.use('/api', router);
    
    app.listen(3000, () => {
      console.log('El servidor está escuchando en el puerto 3000');
    });
  })
  .catch(error => {
    console.error('Error al conectar con MongoDB Atlas:', error);
  });


