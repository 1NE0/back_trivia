const mongoose = require('mongoose');

// Definir el esquema de la pregunta
const preguntaSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  },  // Texto de la pregunta
  respuestas: [
    { 
        key: String,
        texto: String
    }
    ],
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria',
    required: true
  },
  respuesta_correcta: {
    type: String,
    required: true
  }
});

// Definir el modelo de pregunta
const Preguntas = mongoose.model('Preguntas', preguntaSchema, 'Preguntas');

module.exports = Preguntas;