const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String
});

const Categorias = mongoose.model('Categorias', categoriaSchema, 'Categorias');

module.exports = Categorias;