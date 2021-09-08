const Empleado = require('../models/empleado')

const existeDni = async (dni) =>{
    const dniExiste = await Empleado.findOne({dni})

    if(dniExiste){
        throw new Error(`El DNI ${dni} ya se encuentra registrado`)
    }

}

const existeID = async (id) =>{
    const idExiste = await Empleado.findById(id)

    if(!idExiste){
        throw new Error(`El ID ${id} no se encuentra registrado`)
    }
}

module.exports = {
    existeDni,
    existeID
}