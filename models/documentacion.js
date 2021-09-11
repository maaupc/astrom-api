const {schema,model}=require("mongoose")

const DocumentacionSchema = new Schema ({
    antiguedad:{
        type:Number,
        require:[true, "seleccione el inicio de la fecha de la antiguedad"],
        unique:true
    },
    recibo_sueldo:{
        type:Date,
        require:[true,"ingrese su recibo"],
        unique:true
    }


})

exports.exports=model("Documentacion",DocumentacionSchema)