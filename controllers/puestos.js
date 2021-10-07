//importamos de express require y response para q visual code me sujiera los metodos
const{request,response}=require("express")
const Puesto=require("../models/puesto")
//asi me creo cada funcion oara mla peticion
const puestosGet=async(req=request,res=response)=>{
   //accediendo a buscar informacion y me traiga los puestod activos 
      let{ limite=8, desde=0 }=req.query;

      limite=Number(limite)
      desde=Number(desde) 

      const puestos= await  Puesto.find({estado:true}).limit(limite).skip(desde)
      const total= await Puesto.countDocuments({estado:true})

      res.jsonp({
            Total:total,
            puestos
      })
}

const puestoGet = async(req=request,res=response)=>{
      const {id} = req.params

      const puesto = await Puesto.findById(id)

      res.jsonp({
            puesto
      })
}



//Crea puestos
const  puestosPost = async (req, res = response) => {
      
      const{nombre, horarios, salario }=req.body
      try {

       const puestosDB = await Puesto.findOne({ nombre: nombre.toUpperCase() });
       if (puestosDB) {
         return res.status(400).json({
           msg: `El puesto ${puestosDB.nombre} ya existe`,
         });
       }

     //Generar la data
      const data = {nombre: nombre.toUpperCase() , horarios, salario};
      const puesto = new Puesto(data);
    
      //Guardar DB
      await puesto.save();
      res.json({
            msg: "Puesto creado",
            puesto
        })

      } catch (error) {
            console.log(error)
            res.status(400).json("Ocurrio un error al guardar Puesto")
      }
      
    };

const puestosPut=async(req=request,res=response)=>{
      //para capturar los parametros que pasamos x la url
      const id = req.params.id;

      //lo que no quiero q modifique el usuario pero el resto si lo puede hacer
      const {_id, nombre, ...resto}=req.body

      if(nombre){
            resto.nombre = nombre.toUpperCase()
      }

      try {
      //busca el archivo por id y modifica su estado
      const puesto=await Puesto.findByIdAndUpdate(id, resto,  {new:true})
       res.json({
             msg:"Se actualizaron correctamente los datos ",
             puesto
       }) 
      } catch (error) {
            console.log(error);
            res.status(400).json("Ocurrio un error al actualizar el puesto");
      }
}

const puestosDelete=async(req=request,res=response)=>{
//necesitamos el id que mandamos como parametro en el metodo delete

      const id =req.params.id
      //llamo a la base de dato y entro al modelo de puesto y acualizo el estado
      const puesto=await Puesto.findByIdAndUpdate(id,{estado:false},{new:true})
       res.json({
             msg:"Puesto ha sido eliminado",
             puesto
       }) 
}

module.exports={
      puestosGet,
      puestoGet,
      puestosPost,
      puestosPut,
      puestosDelete,
}