import { Schema, model } from "mongoose";


const CategoriaSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true,
  },
   estado:{
    type: Boolean,
    default: true,
    required: true
   },
   usuario:{
    type: Schema.Types.ObjectId, //voy a guardar el ID del objeto, del schema del usuario. 
    ref: 'Usuario', //es la manera que yo exporte el modelo de usuario es la referencia que podre
   }
});

export default model("Categoria", CategoriaSchema);