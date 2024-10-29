// const express = require('express')
import express from 'express';
// import cors from 'cors'
import  router  from '../routes/usuarios.js';
import  routerAuth  from '../routes/auth.js';
import routerCat from '../routes/categorias.js'
import routerProd from "../routes/productos.js";
import routerSearch from '../routes/buscar.js';
import {dbConnection} from '../database/config.js'
class Server{
    constructor(){
        this.app = express()
        this.port = process.env.PORT;  
        this.usuarioPath = '/api/usuarios'
        this.authPath ="/api/auth";
        this.categoriaPath = "/api/categorias"
        this.productoPath = "/api/productos"
        this.buscarPath = "/api/buscar"
       
        this.conectarDB();
        this.middlewares() //¿Porque no llamamos primero a routes y despues a los middlewares? Y es que el orden para que funcione, es que primero ejecutamos los middlewares, para decirle al servidor cuales son los middlewares que estaran actuivos y recien despues llamamos a las rutas
        this.routes()
    }

    async conectarDB(){
        await dbConnection() 
    }
    routes(){
        this.app.use(this.usuarioPath, router)
        this.app.use(this.authPath, routerAuth)
        this.app.use(this.categoriaPath, routerCat)
        this.app.use(this.productoPath, routerProd)
        this.app.use(this.buscarPath, routerSearch)
        
        // this.app.get('/api', (req, res)=>{ //toda peticion que hagamos desde el navegador es una peticion GET
        //     res.send("Peticion GET")
        //     res.json({message: "Peticion GET"})
        // })
        // this.app.post('/api', (req, res)=>{
        //     res.send("Peticion POST")
        // })
        // this.app.put('/api/:id', (req, res)=>{
        //     res.send("Peticion PUT")
        // })
        // this.app.delete('/api/:id', (req, res)=>{
        //     res.send("Peticion DELETE")
        // })


    }

    middlewares() { //son funciones que estan entre la peticion que hace el usuario(o cliente) y la respuesta que hace el servidor. Son funciones que intereactuan de ambos lados, reciben datos del cliente o del servidor y en vase a lo que yo halla definido en esa funcion es el resultado que obtengo
        this.app.use(express.json()) //al usar este middleware le estamos diciendo a nuestro servidor que cuando el cliente mande un archivo en formato json lo reciva sin problemas(recurda que los middlewares son las funciones que estan entre lo que manda el cliente y lo que manda el servidor) aqui estamos capturando la informacion que manda el cliente y si esta en formato json decimos que la va a recibir el servidor 
        //Son funciones que se ejecutan en el medio, es decir, entre la información que viaja de el servidor al cliente y entre el cliente y el servidor. Esto nos sirve para poder manipular la data que se esta enviando antes de guardarla o mostrarla
        this.app.use(express.static("public"))
    }
    listen (){
        this.app.listen(this.port, () =>{
            console.log(`Servidor levantado en el puerto http://localhost:${this.port}`);
            
        })
    }
}



export default Server

// module.exports=Server