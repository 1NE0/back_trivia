const Usuarios = require('../models/usuarioModel');

exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuarios.find();
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).send('Error interno del servidor');
  }
};

exports.obtenerUsuarioId = async (req, res) => {
  try {
    const usuario = await Usuarios.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).send('Error interno del servidor');
  }
};

exports.crearUsuario = async (req, res) => {
  try {
    console.log(req.body);
    // Obtener los datos del usuario desde el cuerpo de la solicitud
    const { nombre, edad, correo } = req.body;

    // Obtener la IP del usuario
    const ip = req.connection.remoteAddress;

    console.log(ip);

    // Crear un nuevo usuario utilizando el modelo Usuario
    const nuevoUsuario = await Usuarios.create({ nombre, edad, correo, ip });

    // Enviar una respuesta con el nuevo usuario creado
    res.json(nuevoUsuario);
    
  } catch (error) {
    // Manejar errores
    console.error('Error al crear usuario:', error);
    res.status(500).send('Error interno del servidor');
  }
};