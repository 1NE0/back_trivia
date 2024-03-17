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
