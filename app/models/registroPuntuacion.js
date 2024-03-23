

const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  idUsuario: {
    type: mongoose.Schema.Types.ObjectId,
    String
  },
  puntuacion: Number,
  fecha: String,
  idCategoria: {
    type: mongoose.Schema.Types.ObjectId,
    String
  }
});

const Registro = mongoose.model('RegistroPuntuaciones', usuarioSchema, 'RegistroPuntuaciones');

module.exports = Registro;