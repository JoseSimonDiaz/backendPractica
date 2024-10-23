import jwt from "jsonwebtoken"; //aqui tenemos todos los metodos necesarios para poder generar el token
//Para generar el token, no tenemos una manera directa de hacerlo con la libreria, ya que la libreria se encarga de generar el token con los datos que le voy a mandar

//tenemos que crearnos una funcion que se encargara de todo ese proceso
 const generarJWT = (uid) =>{
   //para poder utilizar y generar con esta libreria el token. Tenemos que crearnos una promesa    
     return new Promise((resolve,reject) => {  //resolve => para cuando la promesa se cumple. REject => Para cuando la promesa no se cumple
        //primero generamos la data que guardaremos o payload
         const payload = {uid}
            
         //generemos el token
        jwt.sign(payload, process.env.PRIVATESECRETEKEY , {expiresIn:"10h"}, (err, token)=>{
          if(err){
            console.log(err);
            reject("No se pudo generar el token")
          }else{
            resolve(token)
          }                 
        }) //el metodo sing es el que nos va a permitir crear el token, como primer valor le tengo que mandar el payload(osea la data, la data que quiero mandar a ese token). Como segundo valor la clave secreta( es un string que se le va a sumar a la generacion del token), donde si alguien quiere optener los datos de payload, necesitara la llave secreta
               

     })
             
 }

 export{generarJWT};