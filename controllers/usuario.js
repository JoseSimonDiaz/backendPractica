import {request,response} from 'express'
import Usuario from '../models/usuarios.js'
import bcrypt from 'bcryptjs'
// import {validationResult} from 'express-validator'


const getUser = async(req, res)=>{ //toda peticion que hagamos desde el navegador es una peticion GET
    //Al llamar a este metodo deberia devolverme todos los usuarios

    const {limite=5,desde=0 } = req.query
    const usuarios = await Usuario.find({estado: true}).limit(limite).skip(desde) //le digo quye me busque, que usuarios lo que en su propiedad "Estado" tenga en el valor TRUE
    const total = await Usuario.countDocuments({estado: true}) //le digo que me cuente la cantidad de documentos

    res.json({
        total,  
        usuarios,
    })
}

const postUser = async(req=request, res=response)=>{
    const datos = req.body //todo lo que mande en el cuerpo, todo eso lo voy a almacenar en una variable llamada datos
    const {nombre, email, password, rol} = datos
     //validar errores => este codigo tiene que suceder entre lo que manda el usuario y lo que responde el servidor(Esas funciones se llaman MIDDLEWARE)
    //  const errors = validationResult(req) //recibira la peticion del usuario
    //  if(!errors.isEmpty()){
    //     return res.status(400).json(errors)
    //  }
//---------------------------------------------------------

    const usuarioo = new Usuario({nombre, email, password, rol}) //Aqui cree la instancia del modelo de usuario
     //Verificar el email----------------------------
        // const existeEmail = await Usuario.findOne({email}) //Como hare un consulta a la coleccion usuario y nose cuanto tiempo demorar en responderme llamo a AWAIT. con findOne(porque quiero encontrar solamente uno), y entre llave cual es el campo que yo quiero modificar. Este metodo devuelve un valor booleano 
        // if(existeEmail){
        //     return res.status(400).json({ //400 => Bad req
        //         msg: "El correo ya existe"
        //     })
        // } //------------------------------------


         //encriptar la contraseña---------------------------------------------
   const salt = bcrypt.genSaltSync() //por defecto tiene 10 saltos
   //    const hash = bcrypt.hashSync(password,salt) //me pide dos valores, primero el password y el segundo valor es el salto
   //    usuarioo.password = hash //como usuarioo es un tipo de dato de objeto, yo puedo reenplazar el valor que ya tiene el objeto usuario, lo estoy reemplazando por el hash
      usuarioo.password = bcrypt.hashSync(password, salt) //el objeto usuarioo que tiene los datos que voy a guardar en las base de datos, en su propiedad password, sea igual ahora al password que mande pero, hasheado. Por lo que usuario en su propiedad password va a tener el password ya encriptado
     
  //Guardar en la base de datos--------------------------------
   await usuarioo.save() 
   res.status(201).json( //201=> cuando creo algo en la base de datos 
    {
        message: "Usuario creado con exito",
        usuarioo
    }
   )


    // const {nombre, rol} = req.body
    // if(nombre){
    //     res.json({
    //         message: "Peticion POST, desde controllers",
    //         nombre,
    //         rol,
    //     })
    // }else{
    //     res.status(400).json({
    //         message: "Falta el nombre",
    //     })
    // }
}

const putUser = async(req, res)=>{
    const {id } = req.params;
    // console.log(id);
    const {password, _id, email, ...resto}= req.body; //todo el resto de los elementos que tiene uso un spredOparator y decir que todo lo demas venga en una variable llamada resto(EJ: el rol, el nombre. Vendria dentro del objeto llmado "resto")
    console.log(resto);

    //encriptar la contraseña
    const salt = bcrypt.genSaltSync()
    resto.password = bcrypt.hashSync(password, salt)

    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true})  //uso el await para guardar esos datos en la base de datos. con el metodo findByIdAndUpdat, lo que hace es encontrar el id y actualiza el documento, donde recibe primer valor el id, como segundo valor los datos que vamos a actualizar( en este caso sera el resto ). Ademas de los datos que le estoy mandando como tercer paramtro al metofo findByIdAndUpdate, le mando entre llaves la propiedad true con el valor true. lo que ahara me mostrara el usuario ya actualizado 
    res.status(200).json({
        message: "Usuario actualizado",
        usuario,
    })
}

const deleteUser = async (req, res)=>{
  const { id } = req.params;

  //Borrado fisico(Osea lo elimino desde la base de datos)
//   const usuarioBorrado = await Usuario.findByIdAndDelete(id)


  //inactivar al usuario(No lo elimino de la base de datos, solo lo inactivo)
  const usuarioBorrado = await Usuario.findByIdAndUpdate(id, {estado: false}, {new:true}) //Como primer parametro mandamos el ID y luego abrimos llaves para decir cual es el campo o propiedad de la coleccion usuario que yo quiero modificar y pra que actualicemos el dato asi sea el usuario ya actualizado, le agregamos la opcion de {new:true}


    res.json({
        // message: "Usuario eliminado",
        message: `el usuario ${usuarioBorrado.nombre} ha sido eliminado`,
        usuarioBorrado,
    })
    
}

export{getUser, postUser, putUser, deleteUser}