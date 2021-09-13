const {Schema,model}=require("mongoose")
//Schema escrito con minisculas

const DocumentacionSchema = new Schema ({
    antiguedad:{
        type:Number,
        require:[true, "seleccione el inicio de la fecha de la antiguedad"],
    },
    recibo_sueldo:{
        type:String,
    },
    licencia:{
        type: Array
    },
    empleado:{
        type: Schema.Types.ObjectId,
        ref: "Empleado",
    },
    estado:{
        type: Boolean,
        default: true
    }
})

module.exports = model("Documentacion", DocumentacionSchema)