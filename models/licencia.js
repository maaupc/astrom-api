const {Schema, model}=require('mongoose')


const LicenciaSchema = new Schema({

fecha:{
    type: Date,
    require: [true, "Seleccione una fecha de inicio de licencia"],
    unique: true

},
motivo:{
    type: String,
    require:[true, "Ingrese un motivo"],
    unique: false
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

module.exports=model("Licencia", LicenciaSchema)