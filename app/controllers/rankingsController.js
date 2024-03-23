const Registro = require("../models/registroPuntuacion");
const Usuarios = require("../models/usuarioModel");


exports.obtenerRankingsByCategory = async (req, res) => {
    try {
        const registros = await Registro.find({ idCategoria: req.params.idCategoria });

        const rankings = await Promise.all(registros.map(async (registro) => {
            // buscar usuario por id
            const usuario = await Usuarios.findById(registro.idUsuario); // espera a que la promesa se resuelva
            return {
                idUsuario: usuario.id,
                nombre: usuario.nombre,
                puntuacion: registro.puntuacion,
                fecha: registro.fecha,
                idCategoria: registro.idCategoria
            };
            // agregar nombre
        }));
        res.status(200).json(rankings);
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