const {request, response} = require('express')
const Empleado = require('../models/empleado')
const bcrypt = require('bcryptjs')


const obtenerEmpleados = async (req= request, res= response)=>{
    let {limite=10, desde=0} = req.query

    limite = Number(limite)
    desde = Number(desde)

    const empleados = await Empleado.find({estado:true}).limit(limite).skip(desde)

    const total = await Empleado.countDocuments({estado:true})

    res.json({
        Total: total,
        empleados
    })

}

const obtenerEmpleado = async (req= request, res= response)=>{
    const {id} = req.params

    const empleado = Empleado.findById(id)

    res.json({
        empleado
    })
}

const crearEmpleado = async (req= request, res= response)=>{
    const {dni , nombre, apellido, email, password, puesto, rol} = req.body
    const empleado = new Empleado({dni , nombre, apellido, email, password, puesto, rol})

    //Metodo para encriptar contraseña con BcryptJS
    const salt = bcrypt.genSaltSync(10)
    empleado.password = bcrypt.hashSync(password, salt)

    await empleado.save()

    res.json({
        msg: "Empleado creado",
        empleado
    })
    
}

const editarEmpleado = async (req= request, res= response)=>{
    const { id } = req.params
    const {_id, rol, password, ...rest} = req.body

    if(password){
        const salt = bcrypt.genSaltSync(10)
        rest.password = bcrypt.hashSync(password, salt)
    }

    const usuario = await Empleado.findByIdAndUpdate(id, rest, {new: true})

    res.json({
        msg: "Actualizacion realizada",
        usuario
    })

}

const inactivarEmpleado = async (req= request, res= response)=>{
    const { id } = req.params

    const usuario = await Empleado.findByIdAndUpdate(id, { estado:false }, { new: true })

    res.json({
        msg: "Usuario eliminado",
        usuario
    })
    
}

module.exports = {
    obtenerEmpleados,
    obtenerEmpleado,
    crearEmpleado,
    editarEmpleado,
    inactivarEmpleado,
}