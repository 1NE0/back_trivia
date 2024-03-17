// routes/archivoRoutes.js

const express = require('express');
const usuariosController = require('../controllers/userController');
const { crearPreguntas, obtenerPreguntas, obtenerPreguntaEspecifica, obtenerPreguntasByCategory } = require('../controllers/preguntaController');
const { crearCategoria } = require('../controllers/categoriaController');

// Crear un nuevo enrutador de Express
const router = express.Router();

// Definir una ruta para obtener datos
router.get('/usuarios', usuariosController.obtenerUsuarios);
router.post('/crearUsuario', usuariosController.crearUsuario);
router.post('/crearPregunta', crearPreguntas);
router.get('/preguntas' , obtenerPreguntas);
router.get('/preguntas/:id' , obtenerPreguntaEspecifica);
router.get('/preguntas/categorias/:idCategoria' , obtenerPreguntasByCategory);
router.post('/crearCategoria', crearCategoria);
// Exportar el enrutador para que esté disponible en otros archivos
module.exports = router;