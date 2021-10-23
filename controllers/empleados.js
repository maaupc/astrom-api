const {request, response} = require('express')
const Empleado = require('../models/empleado')
const bcrypt = require('bcryptjs')
const fs = require('fs');
const obtenerEmpleados = async (req= request, res= response)=>{
    let {limite=5, desde=0} = req.query

    limite = Number(limite)
    desde = Number(desde)

    if (isNaN(limite)) {
    limite = 5;
    }
    if (isNaN(desde)) {
    desde = 0;
    }


    const [total, empleados] = await Promise.all([
        Empleado.countDocuments({ estado: true }),
        Empleado.find({ estado: true })
          .skip(desde)
        //   .limit(limite)
          .populate("puesto","nombre salario horarios"),
      ]);


    res.json({
        Total: total,
        empleados
    })

}

const obtenerEmpleado = async (req= request, res= response)=>{
    const {id} = req.params
    
    const empleado = await Empleado.findById(id)
    empleado.img=process.env.URL_BACK + "images/" + empleado.img ;
    console.log(empleado.img)


    res.json({
        empleado
    })
}

const crearEmpleado = async (req= request, res= response)=>{
    const {dni , nombre, apellido, email, password, puesto, rol,telefono,emergencia,domicilio,localidad,provincia,nacimiento} = req.body
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

      const {_id, rol, password,...rest} = req.body
      if(password){
          const salt = bcrypt.genSaltSync(10)
          rest.password = bcrypt.hashSync(password, salt)
      }

      if(req.body.imagen){
          try {           
            console.log("req",req.body.imagen)
            let data = req.body.imagen.replace(/^data:image\/\w+;base64,/, '');
            let nombreImagen= 'img_'+ id + ".png";
            fs.writeFile(process.env.DIR_IMAGE_FILES + nombreImagen, data, {encoding: 'base64'}, async function(err){
                if(err){
                }
                else{
                      console.log("imagen guardada correctamente")
                      const empleado = await Empleado.findById(id).exec();
                      if (empleado) {
                            empleado.img = nombreImagen;
                            await empleado.save();
                            const response = {
                            msg:"Actualizacion realizada"
                            };
                            res.status(200).json(response);
                      } else {
                        throw "Error al actualizar";
                      }
                }
              });
                
          } catch (error) {
            console.log(error)
               res.status(400).json({
                     msg:"Error al actualizar los datos del empleados"
               })
          }          
      }

       const empleado = await Empleado.findByIdAndUpdate(id,rest, {new: true})  
  
       res.json({
        msg: "Empleado actualizado",
        empleado
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