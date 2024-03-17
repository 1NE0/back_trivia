const mongoose = require('mongoose');

// Definir el esquema de la pregunta
const preguntaSchema = new mongoose.Schema({
  label: String,  // Texto de la pregunta
  respuestas: [
    { 
        texto: String,
        correcta: Boolean
    }
    ],
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria'
  }
});

// Definir el modelo de pregunta
const Preguntas = mongoose.model('Preguntas', preguntaSchema, 'Preguntas');

module.exports = Preguntas;