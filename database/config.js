import mongoose from "mongoose";

const dbConnection = async () => { //async para ser una funcion asincronica
  try{
    await mongoose.connect(
      process.env.DATABASE_CNN
    ) //Despues de la ultima barrita pondria el nombre que yo quiera que tenga la base de datos
    console.log("Base de datos conectada");
    
  } catch(error){
      throw new Error("Error de conexion a la base de datos")
  }
}

export {dbConnection};

