import express,{ Application } from "express";
import db from "../db/connection";


import  userRoutes from '../routes/usuario'

import cors from "cors"
class Server{
    //* private app:express.Application;


    private app:Application;
    private port:string;
    private apiPaths=({
        usuarios:"/api/usuarios"
    })

    constructor(){
        this.app=express()
        this.port=process.env.PORT || '8000'

        //*Metodos iniciales
        this.dbConnection()

        this.middlewares()

        //definir las rutas

        this.routes()

    }


    async dbConnection(){
        try{
            await db.authenticate()

            console.log("Database online");
            
        }catch(error){
            console.error("Error",error)
        }

    }

    middlewares(){

        //CORS
        this.app.use(cors())

        //lectura del bdy
        this.app.use(express.json())

        //carpeta public
        this.app.use(express.static("public"))


    }


    routes(){
        this.app.use(this.apiPaths.usuarios,userRoutes)
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log("servidor corriendo en el puerto "+ this.port)
        })
    }

}

export default Server