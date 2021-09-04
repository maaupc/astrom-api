const express = require('express')
const cors = require('cors')

//Importo la configuracion para conectarme a la base de datos
const {dbConection} = require('../database/config')

class Server {
    constructor(){
//******************Variables que se ejecutaran al levantar el servidor*****************

        this.app = express()

        //Path de rutas para realizar peticiones
        //Completar con "paths" a medida que creamos rutas

        //Realizo la conexion a la Base Datos
        this.conectarDB()

        //Ejecuto los Middlewares
        this.middlewares()

        //Se crea las rutas para las peticiones
        this.routes()
    }

    async conectarDB(){
        await dbConection()
    }

    middlewares(){
        //Defino la pagina estatica de "public"
        this.app.use(express.static('public'))

        //Uso de CORS
        this.app.use(cors())

        //Acceso al body de req para leer y parsear
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:true}))

    }

    routes(){
        //Completar con las rutas a medida que las creamos
    }

    //Levanto el servidor en el puerto asignado a la variable global PORT
    listen(){
        this.app.listen(process.env.PORT, ()=>{
            console.log("Servidor online en puerto:", process.env.PORT)
        })
    }

}

module.exports = Server