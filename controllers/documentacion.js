const {request, response}=require("express")
const Documentacion=require("../models/documentacion")
const Licencia = require('../models/licencia')

const documentacionGet = async ( req=request, res=response) => {
    let { limite=10, desde=0 } = req.query

    limite = Number(limite)
    desde = Number(desde)

    const documentos = await Documentacion.find({estado:true}).limit(limite).skip(desde)
    const total = await Documentacion.countDocuments({estado:true})

    res.json({
        Total: total,
        documentos,
    })

}

const obtenerDocumentacion = async (req=request, res=response)=>{
    let { limite=10, desde=0 } = req.query
    const {id} = req.params

    limite = Number(limite)
    desde = Number(desde)

    const documentos = await Documentacion.findById(id).limit(limite).skip(desde)

    res.json({
        documentos,
    })


}

const documentacionPost = async( req=request, res=response)=>{
    const { antiguedad, recibo_sueldo} = req.body;
    const { id } = req.params
    const licencias = await Licencia.find({empleado: id ,estado:true})

    const data = {
        antiguedad,
        recibo_sueldo,
        licencia: licencias,
        empleado : req.params.id
    }

    const documentacion = new Documentacion(data)
    await documentacion.save()

    res.json({

        msg:"Documentacion generada",
        documentacion
       });
 

}

const documentacionPut = async (req=request,  res=response)=> {
const {id} = req.params
const {_id ,...documentos} = req.body

const documentacion = await Documentacion.findByIdAndUpdate(id, documentos)
    
    res.json({
    msg: 'PUT documentacion',
    documentacion, 
       });
 
}

const eliminarDocumentacion =async(req=request,res=response)=>{
        const id =req.params.id

        const documento = await Documentacion.findByIdAndUpdate(id,{estado:false},{new:true})
        res.json({
             msg:"La documentacion ha sido eliminada",
             documento
        }) 
    }

module.exports={

    documentacionGet,
    obtenerDocumentacion,
    documentacionPost,
    documentacionPut,
    eliminarDocumentacion
}

