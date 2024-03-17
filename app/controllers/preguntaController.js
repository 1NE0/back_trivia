const Preguntas = require("../models/preguntaModel");


exports.obtenerPreguntas = async (req, res) => {
    try {
      const preguntas = await Preguntas.find();
      res.json(preguntas);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).send('Error interno del servidor');
    }
};

exports.obtenerPreguntaEspecifica = async (req, res) => {
  try {
    console.log(req.params);
    const pregunta = await Preguntas.findById(req.params.id);
    
    if (!pregunta) {
      return res.status(404).json({ mensaje: 'Pregunta no encontrada' });
    }
    
    res.status(200).json(pregunta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerPreguntasByCategory = async (req, res) => {
  try {
    const preguntas = await Preguntas.find({ categoria: req.params.idCategoria });
    if (!preguntas || preguntas.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron preguntas para esta categoría' });
    }
    
    res.status(200).json(preguntas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.crearPreguntas = async (req, res) => {
    try{
        const { label, respuestas, categoria } = req.body;
        const pregunta = await Preguntas.create({
          label,
          respuestas,
          categoria
        });

        res.json(pregunta);
    }catch(error){
        console.error('Error al obtener usuarios:', error);
        res.status(500).send('Error interno del servidor');
    }
};