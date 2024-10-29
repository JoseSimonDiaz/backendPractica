import { Schema, model } from "mongoose";
const ProductoSchema = Schema({  //Usamos el UpperCamelCase para crear el schema de producto
  nombre: {
    type: String,
    unique: true,  //El nombre del producto tiene que ser unico ya que no debemos tener un mismo nombre para dos productos(en teoria)
    required: [true, "El nombre es obligatorio"], 
  },
  estado: {  
    type: Boolean,
    default: true, 
  },
  usuario: { 
    type: Schema.Types.ObjectId, //guardamos el id del usuario que esta dando de alta el producto
    ref: "Usuario", //referenciamos a la collecion usuario(Modelo de Usuario)
    required: true, 
  },
  categoria: {  //guardaria el nombre de la categoria
    type: Schema.Types.ObjectId, //cuando el usuario elija una categoria, tengo que guardar el ID de la categoria(la idea seria, que aunque visualmente al usuario le va a aparecer la lista con los nombre de la categoria(que obviamente vamosa traer de la base de datos). Pero cuando el usuario elija la categoria lo que vamos a estar mandando al back no es el nombre de la categoria si no el ID, porque nos vamos a traer toda la informacion de las categorias, para armar la lista(Por lo que va a estar el id el nombre), simplemente vamosa definir que cuando hagamos "click" lo que envie sea el ID y no el nombre y eso seria lo que guardariamos aqui) 
    ref: "Categoria",
    required: true,
  },
  precio: {
    type: Number,
    default: 0,
  },
  descripcion: {
    type: String, 
  },
  disponible: {
    type: Boolean,
    default: true,
  },
  img: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNK7-n-r_w_qCEIjsnu8VXMBamUkSmLUr9Eg&s",
  },
  stock: {
    type: Number,
    default: 0,
  },
});

export default model("Producto", ProductoSchema);