import Categoria from "../models/categorias.js";


const traerCategorias = async( req, res ) => {
    const {limite=5, desde=0} =req.query
    const categorias = await Categoria.find({estado: true}).limite(limite).skip(desde).poplate("usuario", "nombre email") //Primero definimos en pulate, cual es el campo donde tenemos el ID del usuario, luego definimos que datos del usuario quiero mostrar(separados por un espacio)
     const total = await Categoria.coutDocuments({estado: true})
    res.json({
        total,
        categorias,
    })
    
}

const agregarCategoria = async (req, res) => {

    const nombre = req.body.nombre.toUpperCase();
  
    // Si existe esa categoría
    const categoriaEncontrada = await Categoria.findOne({ nombre });
    if (categoriaEncontrada) {
      return res.status(400).json({
        msg: `La categoría ${nombre} ya existe`,
      });
    }
  
    const usuario = req.usuario._id;
  
    const categoria = new Categoria({ nombre, usuario });
  
    categoria.save();
  
    res.status(200).json({
      msg: "Categoría guardada",
      categoria,
    });
  };

const actualizarCategoria = (req, res)=>{

}

const borrarCategoria = (req, res)=>{

}


export {traerCategorias, 
    agregarCategoria,
     actualizarCategoria,
      borrarCategoria}