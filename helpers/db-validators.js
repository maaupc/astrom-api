//Validar los roles segun lo que tenga en la colección roles
const Puesto = require("../models/puesto");


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
  existePuesto,
  validarSalario
};