const {Schema, model}=require('mongoose')
const moment = require('moment')


const LicenciaSchema = new Schema({

inicio:{
    type: Date,
    require: [true, "Seleccione una fecha de inicio de licencia"],
},
fin:{
    type: Date,
    require: [true, "Seleccione una fecha de fin de licencia"],
},
motivo:{
    type: String,
    require:[true, "Ingrese un motivo"],
},
empleado:{
    type: Schema.Types.ObjectId,
    ref: "Empleado",
    require: true
},
activa:{
    type: Boolean,
    default: false
},
estado:{
    type: Boolean,
    default:true
}


})
//Para formatear la manera de mostrar la fecha
LicenciaSchema.methods.toJSON=function(){
    const {__v, inicio, fin, ...licencia}=this.toObject();
    licencia.inicio= moment(inicio).format('YYYY-MM-DD')
    licencia.fin= moment(fin).format('YYYY-MM-DD')
    return licencia;
};

module.exports=model("Licencia", LicenciaSchema)