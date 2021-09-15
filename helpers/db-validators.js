//Validar los roles segun lo que tenga en la colección roles
const Puesto = require("../models/puesto");

//valido si el puesto existe
const existePuesto = async (id) => {
  const existePuesto = await Puesto.findById(id);

  if (!existePuesto) {
    throw new Error(`El puesto con el siguiendo id: ${id} no existe`);
  }
};
//valido si ingreso un numero
const validarSalario=(salario)=>{

      const valor= salario;
      if(isNaN(valor)){
         throw  new Error("No ingreso numeros")
      }
      return true;

}


module.exports = {
  existePuesto,
  validarSalario
};