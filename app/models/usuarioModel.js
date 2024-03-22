// usuarioModel.js

const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  edad: Number,
  correo: String,
  ip: String
});

const Usuarios = mongoose.model('Usuarios', usuarioSchema, 'Usuarios');

module.exports = Usuarios;