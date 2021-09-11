const {Schema, model}=require("mongoose")

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
    const {password, __v, _id,...empleado}=this.toObject();
    empleado.uid= _id
    return empleado;
};

module.exports=model("Empleado", EmpleadoSchema)
