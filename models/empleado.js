const {Schema, model}=require("mongoose")
const moment = require('moment')

const EmpleadoSchema= new Schema({
    dni:{
        type: String,
        required: [true,"El dni es obligatorio"],

    },
    nombre:{
        type: String,
        required: [true,"El nombre es obligatorio"],

    },
    apellido:{
        type: String,
        required: [true,"El apellido es obligatorio"],

    },
    email:{
        type: String,
        required: [true, "El correo es obligatorio"],
        unique:true,
    },
    telefono:{
        type: String,
        required: [true, "El telefono es obligatorio"],
        unique:true,
    },
    emergencia:{
        type: String,
        unique:true,
    },
    domicilio:{
        type: String,
        required: [true, "El domicilio es obligatorio"],
    },
    localidad:{
        type: String,
        required: [true, "El localidad es obligatorio"],
    },
    provincia:{
        type: String,
        required: [true, "El provincia es obligatorio"],
    },
    nacimiento:{
        type: Date,
        required: [true, "La fecha de nacimiento es obligatorio"],
    },
    password:{
        type: String,
        required: [true, "La contraseña es obligatoria"],
    },
    puesto:{
        type: Schema.Types.ObjectId,
        ref: "Puesto",
        require: true
    },
    estado:{
        type: Boolean,
        default:true,
    },
    img:{
        type: String,
    },
    licencia:{
        type: Boolean,
        default: false,
    },
    rol:{
        type: String,
        required: true,
        enum:["USER_ROLE","ADMIN_ROLE"],
    },
    
})
//Para no mostrar password  ni __ v
EmpleadoSchema.methods.toJSON=function(){
    const {password, __v, _id, nacimiento, ...empleado}=this.toObject();
    empleado.uid= _id
    empleado.nacimiento = moment(nacimiento).format('YYYY-MM-DD')
    return empleado;
};

module.exports=model("Empleado", EmpleadoSchema)
