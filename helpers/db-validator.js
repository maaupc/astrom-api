const Empleado = require('../models/empleado')
const Puesto = require('../models/puesto')
const Licencia = require('../models/licencia')
const moment = require('moment')

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

const existeLicencia = async (id) =>{
    const licenciaExiste = await Licencia.findById(id)

    if(!licenciaExiste){
        throw new Error(`El ID ${id} no se encuentra registrado`)
    }
}


const existePuesto = async (id) => {
    const existePuesto = await Puesto.findById(id);
  
    if (!existePuesto) {
      throw new Error(`El puesto ${id} no existe`);
    }
  };
  
  const validarSalario=(salario)=>{
  
        const valor= salario;
  
        console.log(`El salario es ${valor}`)
        if(isNaN(valor)){
           throw  new Error("No ingreso numeros")
        }
        return true;
  
  }

const licenciaActiva = async (id, req) => {
    const licencia = await Licencia.findById(id)
    const body = req.body
    const empleadoID = licencia.empleado
    const licenciasVigentes = await Licencia.countDocuments({activa:true, empleado: empleadoID })

    console.log(body.activa)
    console.log(licenciasVigentes)

    if(licenciasVigentes>0){
        if(body.activa){
            throw new Error(`El empleado ya posee una licencia activa`)
        }
    }

}

const fechaFin = async (fin, req) =>{
    const body = req.body
    const fechaError = moment(fin).isSameOrBefore(body.inicio)


    if(fechaError){
        throw new Error(`La fecha de fin debe ser distinta o mayor a la de inicio: ${body.inicio}`)
    }

}

module.exports = {
    existeDni,
    existeID,
    existeLicencia,
    existePuesto,
    validarSalario,
    licenciaActiva,
    fechaFin
}