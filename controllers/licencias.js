const {request, response}=require('express');
const { findByIdAndUpdate } = require('../models/licencia');
const Licencia=require('../models/licencia')
const {validationResult} = require('express-validator')

const licenciasGet = (req=request,  res=response)=> {

    
         res.json({
         msg: 'GET licencias'
            });
      

}

const licenciasPost = async (req=request,  res=response)=> {

    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.json({errors: errores.array()});
    }



    const { fecha, motivo } = req.body;
    const licencia = new Licencia({fecha, motivo})
    await licencia.save()

    res.json({

        msg:"Licencia generada",
        licencia
    
       });
 

}

const licenciasPut = async (req=request,  res=response)=> {
const id = req.params.id
const estado = req.estado
const licencia = await Licencia.findByIdAndUpdate(id, {estado: false})
    
    res.json({
    msg: 'PUT licencias',
    id, estado
       });
 

}

module.exports={

    licenciasGet,
    licenciasPost,
    licenciasPut,
}