const {request, response}=require('express');
const Empleado = require('../models/empleado')
const Licencia=require('../models/licencia')
const moment = require('moment')

const licenciasGet = async (req=request,  res=response)=> {
    let {limite=5, desde=0, vencimiento} = req.query
    let licencias, Total
    
    limite = Number(limite)
    desde = Number(desde)

    if (isNaN(limite)) {
    limite = 5;
    }
    if (isNaN(desde)) {
    desde = 0;
    }


    
    if(!vencimiento || vencimiento === "undefined"){
         licencias = await Licencia.find({estado:true}).limit(limite).skip(desde)
        .populate("empleado", "nombre apellido dni")
        
         total = await Licencia.countDocuments({estado:true})
        
    }else{
        // CAMBIAR ACTIVA:TRUE PARA MOSTRAR LAS LICENCIAS ACTIVAS VENCIDAS
        // POR AHORA ESTA EN FALSE PARA PROBAR
        vencimiento = moment(Number(vencimiento))
        const licenciasCompletas = await Licencia.find({estado:true, activa:true}).populate("empleado", "nombre apellido dni")

         licencias = licenciasCompletas.filter((licencia)=>{
            return moment(licencia.fin).isSameOrBefore(vencimiento)
        })

         total = licencias.length
    }


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