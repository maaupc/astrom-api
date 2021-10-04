const {request, response}=require('express');
const Empleado = require('../models/empleado')
const Licencia=require('../models/licencia')

const licenciasGet = async (req=request,  res=response)=> {
    let {limite=10, desde=0} = req.query

    limite = Number(limite)
    desde = Number(desde)

    if (isNaN(limite)) {
    limite = 5;
    }
    if (isNaN(desde)) {
    desde = 0;
    }

    const licencias = await Licencia.find({estado:true}).limit(limite).skip(desde)
    .populate("empleado", "nombre apellido dni")

    const total = await Licencia.countDocuments({estado:true})

    res.json({
        Total: total,
        licencias,
    })
}

const obtenerLicencia = async(req=request,  res=response) =>{
    const {id} = req.params
    let { limite=10, desde=0 } = req.query

    limite = Number(limite)
    desde = Number(desde)

    const licencias = await Licencia.findById(id).populate("empleado", "nombre apellido dni")

    res.json({
        licencias,
    })
}

const licenciasPost = async (req=request,  res=response)=> {
    const { inicio, fin, motivo, empleado } = req.body;

    const licencia = new Licencia({inicio, fin, motivo, empleado})
    await licencia.save()

    res.json({

        msg:"Licencia generada",
        licencia
    
       });
 

}

const licenciasPut = async (req=request,  res=response)=> {
const id = req.params.id
const data= req.body
const licencia = await Licencia.findByIdAndUpdate(id, data, {new: true})
    
    res.json({
    msg: 'Licencia actualizada',
    licencia
       });
}


const eliminarLicencia = async (req=request,  res=response)=> {
const {id} = req.params
const licencia = await Licencia.findByIdAndUpdate(id, {estado: false})
    
    res.json({
    msg: 'Licencia eliminada',
    licencia
       });
}

module.exports={

    licenciasGet,
    licenciasPost,
    licenciasPut,
    obtenerLicencia,
    eliminarLicencia
}