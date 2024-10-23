const router = Router()
import {Router} from 'express'
import { check } from 'express-validator'
import { validarCampos } from '../middlewares/validar-campos.js'
import { validarJWT } from '../middlewares/validar-JWT.js'
import { esAdminRole } from '../middlewares/validar-roles.js'
import { emailExiste,rolValido, existeUsuarioPorId} from '../helpers/db-validators.js'
import {getUser, postUser, putUser, deleteUser} from '../controllers/usuario.js'

router.get('/',
     [
        validarJWT,
        esAdminRole,
     ]
    , getUser)

router.post('/',[
    check("nombre","El nombre es obligatorio").notEmpty(),
    // check("password","La contraseña debe tener minimo 6 caracteres").isLength({min:6, max:16})
    check("password", "la contraseña debe tener minimo 8 caracteres, mayusculas, minusculas, numeros y simmbolos especiales").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
    check("email", "El email no es valido").isEmail(), //verifica que el email no es valido
    check("email").custom(emailExiste),  //verifica si el email ya existe
    check("rol").custom(rolValido), //El metodo custom del check me permite mandarle una funcion que yo halla creado
    validarCampos 
], postUser) //el segundo valor que recibe POST sera las validaciones(Como pueden ser varias validaciones, iran dentro de un array)


router.put('/:id', 
    [
       validarJWT,
        check("id").custom(existeUsuarioPorId), //Validammos si por ese ID existe algun usuario en la base de datos. Ademas evitan que cuando mande datos no vaya directamente a la base de datos
        check("id",  "No es un ID valido").isMongoId(), //¿Cuando no sera un ID valido? Si no es un ID de mongus( Si no es un ID de Mongos no es un ID valido )
        check("rol").custom(rolValido),
        validarCampos 
    ]
    ,putUser )

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    // validarRol,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId), 
    validarCampos,
] ,deleteUser)

export default router