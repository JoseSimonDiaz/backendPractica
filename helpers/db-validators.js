
import Role from "../models/rol.js" //aqui voy a tener acceso a la colecion de roles de la base de datos
import Usuarios from "../models/usuarios.js"
import Producto from "../models/productos.js"

const rolValido =  async(rol) => {

const esRolValido = await Role.findOne({rol})
if(!esRolValido){
    throw new Error(`El rol ${rol} no es valido`)
}

}

const emailExiste = async(email)=> {
    const existeEmail = await Usuarios.findOne({email})
    if(existeEmail){
        throw new Error(`El correo ${email} ya existe`)
    }
}

const existeUsuarioPorId = async (id) =>{
      const existeUsuario = await Usuarios.findById(id)
      
      if(!existeUsuario){
        throw new Error(`El id ${id} no existe`)
      }
     
    //Si el usuario existe, verifico su estado
    if(!existeUsuario.estado){
       throw new Error(`El usuario ${existeUsuario.nombre} ya esta inactivo`)
    }

}

const productoExiste = async (id) => {
     const existeProducto = await Producto.findById(id)
     if(!existeProducto){
        throw new Error(`El id:${id} no existe en la base de datos` );  //Nos puede servir cuando queremos actualizar un producto, le mandaremos el id. pero si elimine ese producto de la base de datos
        
     }

}

export { rolValido, emailExiste, existeUsuarioPorId, productoExiste }