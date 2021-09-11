const {request, response}=require("express")
const {finByIdAndUpdate} = require("../models/documentacion")
const documentacion=require("../models/documentacion")
const {validationResult} =require("express-validator")

const documentacionGet = ( req=request, resp=response) => {
    res.json({
        msg: "Get Documentacion"
    });
}

const documentacionPost = async( req=request, resp=response)=>{
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.json({errors:errores.array()})
    }

    const { antiguedad } = req.body;
    const documentacion = new Documentacion({antiguedad})
    await documentacion.save()

    res.json({

        msg:"Documentacion generada",
        documentacion
    
       });
 

}

const documentacionPut = async (req=request,  res=response)=> {
const id = req.params.id
const documentacion = await Documentacion.findByIdAndUpdate(id)
    
    res.json({
    msg: 'PUT documentacion',
    id, 
       });
 

}

module.exports={

    documentacionGet,
    documentacionPost,
    documentacionPut,
}

