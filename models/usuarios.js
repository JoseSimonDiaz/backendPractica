import { Schema, model } from "mongoose";

const UsuarioSchema = new Schema({
  nombre: { type: String, require: [true, "El nombre es obligatorio"] }, //De esta manera digo que este camo true sera requerido
  email: {
    type: String,
    require: [true, "El email es obligatorio"],
    unique: true,
  }, //No deberia haber un mismo email para dos usuarios diferentes, asi que tenemos que definir que este dato es unico
  password: {
    type: String,
    require: [true, "La contraseña es obligatoria"],
    // minlength: [6, "La contraseña debe ser de al menos 6 caracteres"]
  },
  img: {
    type: String,
    default: "https://w7.pngwing.com/pngs/589/83/png-transparent-account-avatar-contact-people-profile-user-basic-icon-thumbnail.png",
  },
  rol: {
    type: String,
    require: true,
    // enum: ["USER_ROLE", "ADMIN_ROLE"], //Son los unicos dos roles que puedo aceptar, el enum es cuando quiero enumerar las opciones que solamente va a aceptar este campo, si mando algo que no sea una de esas opciones deberia dar un error 
  },
  estado: {
    type: Boolean,
    default: true, //todos los usuarios que yo cree tendra un estado en true o activo
  },
}); //en este caso para escribir el nombre de un esquema usamos el UppercameCase


UsuarioSchema.methods.toJSON = function (){
    //modificamos los datos que queremos que nos muestre o no nos muestre del usuario el schema, cuando genere el JSON(no modificamos nada de la base de datos lo que estamos haciendo es decirle como queremos que muestre los datos cuando genere el formato JSOn que es el que nos devuelve en POSTMAN)
   const { password, ...usuario } = this.toObject() //lo que le estamos diciendo es que del objeto, que se genera cuando creamos el schema, cuando estamos devolviendo los datos en formato JSON( lo que le estamos diciendo que desestructure el password y todo lo que queda que seria el email, nombre, rol y todo lo demas guardalo en un objeto llamado usuario y retorname ese objeto ) 
     return usuario;

}

export default model("Usuario", UsuarioSchema) //tenemos que exportarlo como un modelo. Donde recibe dos valores, primero es como lo vamos a llamar al modelo y generalmente lo llamamos con la primera letra en mayuscula. Y luego tenemos que definir a que esquema representa este usuario(a que esquema pertenece este modelo)