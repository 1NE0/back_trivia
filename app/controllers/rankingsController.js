const { default: mongoose } = require("mongoose");
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
        const { idCategoria, idUsuario, puntuacion } = req.body;

        // Verificar si ya existe un registro con los identificadores proporcionados
        const registroExistente = await Registro.findOne({ idUsuario, idCategoria });

        if (registroExistente) {
            // Si ya existe, actualizar el registro si la nueva puntuación es mayor
            if (registroExistente.puntuacion < puntuacion) {
                await Registro.updateOne({ idUsuario, idCategoria }, { puntuacion });
                res.status(200).json({ message: 'Registro actualizado correctamente' });
            } else {
                res.status(200).json({ message: 'La puntuación actual no es mayor que la existente' });
            }
        } else {
            // Si no existe, crear un nuevo registro
            const nuevoRegistro = await Registro.create(req.body);
            res.status(200).json(nuevoRegistro);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}