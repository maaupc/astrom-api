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
        this.empleadosPath = "/api/empleados"
        this.authPath = "/api/auth"
        this.puestosPath="/api/puestos"
        this.licenciasPath="/api/licencias"
        this.documentacionPath = "/api/documentacion"

        
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
        this.app.use(express.json({limit: '200mb'}));
        this.app.use(express.urlencoded({limit: '200mb', extended: true}));
      
    }

    routes(){
        //Completar con las rutas a medida que las creamos
        this.app.use(this.empleadosPath, require('../routes/empleados'))
        this.app.use(this.authPath, require('../routes/auth'))
        this.app.use(this.puestosPath, require("../routes/puestos"))
        this.app.use(this.licenciasPath,  require("../routes/licencias"))
        this.app.use(this.documentacionPath,  require("../routes/documentacion"))
    }

    //Levanto el servidor en el puerto asignado a la variable global PORT
    listen(){
        this.app.listen(process.env.PORT, ()=>{
            console.log("Servidor online en puerto:", process.env.PORT)
        })
    }

}

module.exports = Server
