//imports
const express = require('express');
const cors = require('cors')
const { dbConnection } = require('../database/config')


class Server{

    constructor(){

        //Iniciar cuando se levante el server
        this.app = express()
        this.licenciasPath="/api/licencias"

        //conexion
        this.conectarDB();
    
        //Middlewares
        this.middlewares()
        

        //rutas
        this.routes()
    }

    // conexion a base de datos

    async conectarDB(){
        await dbConnection()
    }

    middlewares(){

        //Carpeta estatica publica
        this.app.use(express.static('public'));
        // cors
        this.app.use(cors())

        // acceso al body
        this.app.use(express.json())



    }

    routes(){

        this.app.use(this.licenciasPath,  require("../routes/licencias"))


    }

    listen(){

        
        this.app.listen(process.env.PORT, ()=>{
            console.log('Servidor online en puesto', process.env.PORT)
        })
        

    }

}

module.exports=Server