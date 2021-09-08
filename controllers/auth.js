const {request, response} = require('express')
const Empleado = require('../models/empleado')
const bcrypt = require('bcryptjs')
const {generarJWT} = require('../helpers/generar-jwt')


const login = async (req=request, res=response)=>{
    const {dni, password} = req.body

    try {
        const empleado = await Empleado.findOne({dni})

        //Verifico si existe empleados con ese DNI
        if(!empleado){
            return res.status(400).json({
                msg: "Usuario o contraseña incorrecta"
            })
        }

        //Verifico que si el usuario existe sea un usuario activo
        if(!empleado.estado){
            return res.status(400).json({
                msg: "Usuario o contraseña incorrecta"
            })
        }

        //Comparo la contraseña ingresada con la contraseña del usuario
        const validPassword = bcrypt.compareSync(password, empleado.password)

        if(!validPassword){
            return res.status(400).json({
                msg: "Usuario o contraseña incorrecta"
            })
        }

        //Si el Login es correcto genero el Token
        const token = await generarJWT(empleado._id)

        res.json({
            msg: "Login OK",
            empleado,
            token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Comunicarse con el administrador"
        })
    }

}

module.exports = {login}