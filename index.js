//metodos htttp, viene de la aprte de lo que es la navegacion, es un protocolo que se usa de tranferencia de datos.
//pero utilizar ese protocolo de transferencia, nosotros podemos hacer a travez de ese protocolo diferentes tipos de metodos de peticiones
//la peticion mas comun es la peticion GET
//=> LA PETICION GET: es vasicamente, solicitarle al servidor informacion
//=> METODO PUT : Lo que hace es actualizar datos, cuando usamos este metodo necesitamos decirle cuales es el producto que quiero actualizar. Esa informacion  que estoy mandando es para actualizar que producto(/products/1), en esa ruta que estoy mandando, ademas tengo que agregar los datos que quiero modificar y de que producto. actualiza todo el producto(No actualzia solamente la informacion que le mando), tengo que mandarle todos los datos que necesito actualizar(Incluido el que se modifico)
//=> METODO POST: Crea datos en el servidor
//=> METODO PATCH : tambien es para actualizar, pero es solamente para actualizar una parte de ese producto, por ejemplo un solo dato, puedo utilizar el metodo PATCH. solo hay que mandar el dato que hay que actualizar
//=> MEDODO DELETE : Tengo que mandarle el mandarle el ID del producto que quiero borrar. Es para eliminar datos de la base de datos
//Si hacemos una peticion el servidor si o si nos tiene que devolver una respuesta(Sea positiva o negativa). Donde esos mensajes que el servidor devuelve son una serie de codigos(Son los codigos HTTP)

// const express = require('express')
import express from 'express';

// const app = express()
// const port = 3000 //No es recomendable utilizar el puerto 80, ya que se lo utiliza para otra cosa

//req= request => peticion del cliente
//res = response => Respuesta del servidor
// app.get('/', (req, res)=>{ 
// res.send("Peticion GET")
// } ) //es la ruta raiz de mi servidor, y como segundo parametro, que son funciones que manejan la peticion del cliente y devuelve la respuesta del servidor

// app.post('/', (req, res)=>{
//     res.send("Peticion POST")
// })


// app.listen(port, ()=>{
//     console.log(`Servidor escuchando en el puerto http://localhost:${port}`);
    
// }) //Primero recibe el puerto que estara escuchando el servidor las peticiones, y como segundo parametro una funcion

// app.delete('/', (req, res) => {
//     res.send("Peticion DELETE")
// })

// app.use(express.static("public")) //es un Middlegare, lo que decimos es que cuando un usuario vaya a la raiz del servidor, la carpeta estatica a la que va a aceder sera Public. Si va a ser un servidor de api, no hace falta tener una carpeta publlica

//Para poder utilizar la clase Server, primero tengo que importarla

import Server from './models/server.js'; //cuando estemos importando archivos de js, tenemos que agregarle la extencion
 
//Como ya tengo la clase, lo que hare sera crearme la instancia
const server = new Server(); 
server.listen();