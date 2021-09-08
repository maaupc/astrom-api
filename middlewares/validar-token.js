const {request, response} = require('express')
const jwt = require('jsonwebtoken')
const Empleado = require('../models/empleado')

const validarJWT = async (req=request, res=response, next)=>{
    const token = req.header("x-token")

    if(!token){
        return res.status(401).json({
            msg: "No se ingreso token en la peticion"
        })
    }

    try {
        //Si se ingresa un token desestructuro el ID
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        //Busco un empleado al cual le corresponda el ID
        const empleado = await Empleado.findById(uid)

        if(!empleado){
            return res.status(401).json({
                msg: "Token no valido "
            })
        }

        if(!empleado.estado){
            return res.status(401).json({
                msg: "Token no valido "
            })
        }

        req.empleado = empleado

        next()

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            msg: "Error encontrado - Token no valido"
        })        
    }

}

module.exports = {validarJWT}