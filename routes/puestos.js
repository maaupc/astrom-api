const{Router}=require("express")
//importo para hacer validaciones
const {check}=require("express-validator")
const router=Router()
const {validarCampos}=require("../middlewares/validarcampos")
const {existePuesto}=require("../helpers/db-validators")
const{validarSalario}=require("../helpers/db-validators")
const {puestosGet,
      puestosPost,
      puestosPut,
      puestosDelete,}=require("../controllers/puestos")

//peticion para traer informacion
router.get('/',puestosGet);
//peticion  para mandar informacion 
//validamos con check que el campo de nombre no este vacio antes de pasar a controller
router.post( '/',
      [
      check("nombre","El nombre del puesto es obligatorio").not().isEmpty(),
      check("horarios","El horario del puesto es obligatorio").not().isEmpty(),
      check("salario","El salario del puesto es obligatorio").not().isEmpty(),
      validarCampos,
      ],
      puestosPost);

//peticion para actualizar le indico que le mando un parametro id  
router.put('/:id',
      [
      check("id", "El ID ingresado no corresponde a un ID valido").isMongoId(),
      check("id").custom(existePuesto),
      validarCampos,
      ],
      puestosPut); 

//peticion del delete en esta caso no se borraria solo lo desactivaremos 
router.delete('/:id',
      [
      check("id", "No es un ID válido").isMongoId(),
      check("id").custom(existePuesto),
      validarCampos,
      ],
      puestosDelete);

module.exports=router;