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

estado:{
    type: Boolean,
    default:false
}


})

module.exports=model("Licencia", LicenciaSchema)