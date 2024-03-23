// routes/archivoRoutes.js

const express = require('express');
const usuariosController = require('../controllers/userController');
const { crearPreguntas, obtenerPreguntas, obtenerPreguntaEspecifica, obtenerPreguntasByCategory, verificarRespuesta } = require('../controllers/preguntaController');
const { crearCategoria, obtenerCategorias } = require('../controllers/categoriaController');
const { obtenerRankingsByCategory, addRegistroPuntuacion } = require('../controllers/rankingsController');

// Crear un nuevo enrutador de Express
const router = express.Router();

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     description: Retorna una lista de todos los usuarios.
 *     responses:
 *       200:
 *         description: Operación exitosa
 */
router.get('/usuarios', usuariosController.obtenerUsuarios);

/**
 * @swagger
 * /api/crearUsuario:
 *   post:
 *     summary: Crea un nuevo usuario
 *     description: Crea un nuevo usuario con la información proporcionada en el cuerpo de la solicitud.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del usuario.
 *               edad:
 *                 type: integer
 *                 description: Edad del usuario.
 *               correo:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *     responses:
 *       200:
 *         description: Usuario creado exitosamente
 */
router.post('/crearUsuario', usuariosController.crearUsuario);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtiene un usuario en especifico
 *     description: Retorna una lista de todos los usuarios.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a encontrar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Operación exitosa
 *       404:
 *         description: Pregunta no encontrada
 */
router.get('/usuarios/:id', usuariosController.obtenerUsuarioId);

/**
 * @swagger
 * /api/crearPregunta:
 *   post:
 *     summary: Crea una nueva pregunta
 *     description: Crea una nueva pregunta con la información proporcionada en el cuerpo de la solicitud.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               label:
 *                 type: string
 *                 description: Texto de la pregunta.
 *               respuestas:
 *                 type: array
 *                 description: Lista de respuestas posibles.
 *               categoria:
 *                 type: string
 *                 description: ID de la categoría a la que pertenece la pregunta.
 *               respuesta_correcta:
 *                 type: string
 *                 description: Respuesta correcta de la pregunta.
 *     responses:
 *       200:
 *         description: Pregunta creada exitosamente
 */
router.post('/crearPregunta', crearPreguntas);

/**
 * @swagger
 * /api/preguntas:
 *   get:
 *     summary: Obtiene todas las preguntas
 *     description: Retorna una lista de todas las preguntas.
 *     responses:
 *       200:
 *         description: Operación exitosa
 */
router.get('/preguntas', obtenerPreguntas);

/**
 * @swagger
 * /api/preguntas/{id}:
 *   get:
 *     summary: Obtiene una pregunta específica por ID
 *     description: Retorna una pregunta específica según su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la pregunta a obtener.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Operación exitosa
 *       404:
 *         description: Pregunta no encontrada
 */
router.get('/preguntas/:id', obtenerPreguntaEspecifica);

/**
 * @swagger
 * /api/preguntas/categorias/{idCategoria}:
 *   get:
 *     summary: Obtiene todas las preguntas por categoría
 *     description: Retorna una lista de todas las preguntas que pertenecen a una categoría específica.
 *     parameters:
 *       - in: path
 *         name: idCategoria
 *         required: true
 *         description: ID de la categoría de las preguntas a obtener.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Operación exitosa
 *       404:
 *         description: Categoría no encontrada
 */
router.get('/preguntas/categorias/:idCategoria', obtenerPreguntasByCategory);

/**
 * @swagger
 * /api/categorias:
 *   get:
 *     summary: Obtiene todas las categorías
 *     description: Retorna una lista de todas las categorías.
 *     responses:
 *       200:
 *         description: Operación exitosa
 */
router.get('/categorias', obtenerCategorias);

/**
 * @swagger
 * /api/crearCategoria:
 *   post:
 *     summary: Crea una nueva categoría
 *     description: Crea una nueva categoría con la información proporcionada en el cuerpo de la solicitud.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre de la categoría.
 *               descripcion:
 *                 type: string
 *                 description: Descripción de la categoría.
 *     responses:
 *       200:
 *         description: Categoría creada exitosamente
 */
router.post('/crearCategoria', crearCategoria);

/**
 * @swagger
 * /api/verificarRespuesta:
 *   post:
 *     summary: Verifica la respuesta a una pregunta
 *     description: Verifica la respuesta proporcionada por el usuario a una pregunta específica.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               preguntaId:
 *                 type: string
 *                 description: ID de la pregunta a verificar.
 *               respuesta:
 *                 type: string
 *                 description: Respuesta proporcionada por el usuario.
 *     responses:
 *       200:
 *         description: Respuesta verificada exitosamente
 */
router.post('/verificarRespuesta', verificarRespuesta);


/**
 * @swagger
 * /api/ranking/{idCategoria}:
 *   get:
 *     summary: Obtiene todos los rankings por categoría
 *     description: Retorna una lista de todos los rankings de una categoría.
 *     parameters:
 *       - in: path
 *         name: idCategoria
 *         required: true
 *         description: ID de la categoría de los registros a obtener.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Operación exitosa
 */
router.get('/ranking/:idCategoria', obtenerRankingsByCategory);

/**
 * @swagger
 * /api/ranking/:
 *  post:
 *     summary: Agrega un nuevo registro de puntuación
 *     description: Crea un nuevo registro de puntuación con la información proporcionada en el cuerpo de la solicitud.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idCategoria:
 *                 type: string
 *                 description: ID de la categoria a la que pertenece el registro
 *               idUsuario:
 *                 type: string
 *                 description: ID del usuario
 *               fecha:
 *                 type: string
 *                 description: Fecha del registro
 *               puntuacion:
 *                 type: integer
 *                 description: Fecha del registro
 * 
 *     responses:
 *       200:
 *         description: Operación exitosa
 */
router.post('/ranking/', addRegistroPuntuacion);
module.exports = router;