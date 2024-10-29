import { response, request } from "express";
import Producto from "../models/productos.js";

//Get para traer todos los productos paginados--------------------
const obtenerProductos = async (req = request, res = response) => {   //Aqui le estamos generando la lista de todos los productos que el usuario va a poder ver(No queremos que vea productos que estan inactivos)
  
  const { limite = 5, desde = 0 } = req.query; 
  const query = { estado: true }; //para que solamente nos busque los productos que tenga esa query(que el estado sea true). 

  const productos = await Producto.find(query)
    .skip(Number(desde))
    .limit(Number(limite))
    .populate("categoria", "nombre") //podemos usar al populate si en el modelo en el modelo de esta colecion(En este caso productos), guardamos el ID del usuario y el ID de la categoria. Si quiero traerme en esta consulta el usuario que dio de alta cada producto y no tuviera el ID de la categoria aqui
    .populate("usuario", "email"); //para vincular campos de distintas direcciones. Primer parametro => COLECION, segundo => El campo de lo que quiero traerme de la coleccion

  const total = await Producto.countDocuments(query);

  res.json({
    total,
    productos,
  });
};

//--------------------------------------------------------------
//obtener un producto por su ID
const obtenerProducto = async (req = request, res = response) => {  //Este metodo es el que nos permitira traer todos los detalles del producto(para la pagina de detalle de producto)
  const { id } = req.params; 

  const producto = await Producto.findById(id) 
    .populate("categoria", "nombre")
    .populate("usuario", "email");

  res.json({
    producto, //esto en el caso que consultemos por un producto 
  });
};

const productoPost = async (req, res) => {
  const { precio, categoria, descripcion, img, stock } = req.body;

  const nombre = req.body.nombre.toUpperCase();

  const productoDB = await Producto.findOne({ nombre });

  if (productoDB) {
    return res.status(400).json({
      msg: `El producto ${productoDB.nombre} ya existe`,
    });
  }
  //Generar la data a guardar
  const data = {
    nombre,
    categoria,
    precio,
    descripcion,
    img,
    stock,
    usuario: req.usuario._id, //cuando validemos el token nos va a devolver en la req los datos del usuario(de aqui obtenemos el ID del usuario)
  };

  const producto = new Producto(data);

  //grabar en la base de datos
  await producto.save();  

  res.status(201).json({
    msg: "Se agregó producto",
  });
};

//actualizarProducto (validar nombre)-----------------------------------------

const actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { precio, categoria, descripcion, disponible, estado } = req.body;
  const usuario = req.usuario._id;

  let data = {
    precio,
    descripcion,
    categoria,
    disponible,
    usuario,
    estado,
  };

  if (req.body.nombre) {  //si al momento de actualizar el producto el front nos mando el nombre(como parte de los datos que van a venir en la req) voy a agregar la propiedad nombre y le voy a asignar el valor del nombre que me esta mandando el usuario pero en mayuscula
    data.nombre = req.body.nombre.toUpperCase();
  }

  if (req.body.stock) {
    data.stock = req.body.stock; //verifico si en el body venga la propiedad stock, por lo que voy a agregar a la data, le digo que va a ser igual al stock que viene en el body
  }
  if (req.body.img) {
    data.img = req.body.img;
  }

  const producto = await Producto.findByIdAndUpdate(id, data, { new: true }) //la opcion new: true. Para cuando me devuelva el servidor la informacion del producto me lo devuelva ya actualizado, aparte voy a mostrar la categoria y el usuario en este caso el email del usuario que actualizo el 
    .populate("categoria", "nombre")
    .populate("usuario", "email");

  res.status(200).json({
    producto,
    msg: "Producto actualizado!",
  });
};

//Borrar producto-----------------------------------------------------
const borrarProducto = async (req, res) => {
  const { id } = req.params;

  const productoBorrado = await Producto.findByIdAndUpdate(
    id,
    { estado: false }, //la actualizacion es que el estado va a estar en false
    { new: true } //para cuando nos muestre el productoborrado(Cuando el sevidor nos devuelva la respuesta) nos devuelva el dato del producto pero ya con su estado en false
  );

  const { nombre } = productoBorrado;

  res.status(200).json({
    msg: "El producto fue borrado",
    nombre,
  });
};

// const borrarProductos = async (req, res) => {

//   const query={estado:false}

//   await Producto.findAndRemove(query)

//    res.status(200).json({
//     msg: "Se borraron todos los productos inactivos",

//   });
// };

export {
  productoPost,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto,
};