import jwt from "jsonwebtoken";// Aquí tenemos todos los métodos necesarios para poder generar el token
import Usuario from "../models/usuarios.js";
 // Como yo necesito saber si el token que llega tiene un id válido, voy a tener que importar también el modelo del usuario porque voy a hacer una consulta a la base de datos con los datos que vienen del token para saber si el usuario que tiene ese token existe o es válido.

const validarJWT = async (req, res, next) => { // Next indica que si está todo bien continúa con el controlador
  // Primero tenemos que recibir el token
  const token = req.header('x-token') // Si esta clave está en los headers, la almaceno en el token

  // Si no hay un token, devolver un mensaje y detener el proceso
  if (!token) {
    return res.status(401).json({ // 401 => No autorizado
      msg: 'No hay token en la petición'
    });
  }

  // Validar el token
  try {
    // Aquí hacemos el proceso para ver si el token es válido.
    // Primero tenemos que obtener el payload (los datos que vienen del token).
    const { uid } = jwt.verify(token, process.env.PRIVATESECRETEKEY); // El método verify pide el token recibido, y como segundo valor la clave secreta. Si sale bien, almacenamos el id del usuario mandado como payload.

    // Ya teniendo el id, podemos obtener los datos del usuario por su id
    const usuario = await Usuario.findById({ _id: uid }); // Buscamos que la propiedad _id tenga el valor uid.

    // Verificar si el usuario existe
    if (!usuario) {
      return res.status(401).json({
        msg: "El usuario no existe en la base de datos"
      });
    }

    // Verificar si el usuario está activo
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Token no es válido",
      });
    }

    // Genero dentro del servidor (en tiempo de ejecución) una req con los datos del usuario
    req.usuario = usuario;
     console.log(req.usuario);
     

    next(); // Si está todo bien, sigue con el controlador

  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no es válido"
    });
  }
}

export { validarJWT };
