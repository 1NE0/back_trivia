const Categorias  = require('../models/categoriaModel');

exports.crearCategoria = async (req, res) => {

    const {nombre, descripcion} = req.body;
    try{
        const categoriaCreada =  await Categorias.create({
            nombre,
            descripcion
        });

        res.json(categoriaCreada);
    }catch(error){
        console.error('Error al obtener usuarios:', error);
        res.status(500).send('Error interno del servidor');
    }
}

exports.obtenerCategorias = async (req, res) => {

    try{
        const categorias = await Categorias.find();
        res.json(categorias);
    }catch(error){
        console.error('Error al obtener usuarios:', error);
        res.status(500).send('Error interno del servidor');
    }
}
