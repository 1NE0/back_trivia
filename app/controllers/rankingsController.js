const Registro = require("../models/registroPuntuacion");


exports.obtenerRankingsByCategory = async (req, res) => {
    try {
        console.log(req.params.idCategoria);
        const registros = await Registro.find({ idCategoria: req.params.idCategoria });
        res.status(200).json(registros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.addRegistroPuntuacion = async (req, res) => {
    try {
        const nuevoRegistro = await Registro.create(req.body);
        res.status(200).json(nuevoRegistro);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}