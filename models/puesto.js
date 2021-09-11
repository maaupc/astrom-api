const{Schema, model}=require("mongoose")
const PuestoSchema=new Schema({
  nombre:{
      type:String,
      required:[true,"El nombre es obligatorio" ],
      unique:true
  },
  horarios:{
        type:String,
        required:[true,"El horario es obligatorio"]

  } ,
  salario:{
        type:String,
        required:[true,"El salario es obligatorio"]
 },
 estado: {
      type: Boolean,
      default: true,
      required: true,
    }

  
})

//lo llamamos el nombre como lo vamos a llmar por convencion en appercamel el segundo parametro el nombre del esquema 
module.exports=model("Puesto",PuestoSchema)
