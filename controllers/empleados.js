const {request, response} = require('express')
const Empleado = require('../models/empleado')
const bcrypt = require('bcryptjs')


const obtenerEmpleados = async (req= request, res= response)=>{
    let {limite=10, desde=0} = req.query

    limite = Number(limite)
    desde = Number(desde)

    if (isNaN(limite)) {
    limite = 5;
    }
    if (isNaN(desde)) {
    desde = 0;
    }

    // const empleados = await Empleado.find({estado:true}).limit(limite).skip(desde)
    // .populate("puesto", "nombre")

    const [total, empleados] = await Promise.all([
        Empleado.countDocuments({ estado: true }),
        Empleado.find({ estado: true })
          .skip(desde)
          .limit(limite)
          .populate("puesto","nombre salario horarios"),
      ]);

    // const total = await Empleado.countDocuments({estado:true})

    res.json({
        Total: total,
        empleados
    })

}

const obtenerEmpleado = async (req= request, res= response)=>{
    const {id} = req.params

    const empleado = await Empleado.findById(id)
    // .populate("puesto", "nombre")

    res.json({
        empleado
    })
}

const crearEmpleado = async (req= request, res= response)=>{
    const {dni , nombre, apellido, email, password, puesto, rol} = req.body
    const empleado = new Empleado({dni , nombre, apellido, email, telefono, emergencia,
        domicilio, localidad, provincia, nacimiento, password, puesto, rol})

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