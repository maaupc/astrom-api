const Empleado = require('../models/empleado')
const Puesto = require('../models/puesto')
const Licencia = require('../models/licencia')

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

module.exports = {
    existeDni,
    existeID,
    existeLicencia,
    existePuesto,
    validarSalario
}