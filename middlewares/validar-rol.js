const { request, response} = require('express')

const esAdmin = (req=request, res=response, next) =>{
    if(!req.empleado){
        return res.status(500).json({
            msg: "Se quiere validar rol sin ingresar token"
        })
    }

    const {rol, nombre} = req.empleado


    if(rol !== "ADMIN_ROLE"){
        return res.status(401).json({
            msg: `${nombre} no es administrador`
        })
    }

    next()


}

module.exports = {esAdmin}