const{Router}=require("express")

//Importo para hacer validaciones
const {check}=require("express-validator")

const {validarCampos}=require("../middlewares/validarcampos")
const {existePuesto}=require("../helpers/db-validator")

const {esAdmin} = require('../middlewares/validar-rol')
const {validarJWT} = require('../middlewares/validar-token')

//Importo los controladores
const {puestosGet,
      puestosPost,
      puestosPut,
      puestosDelete,}=require("../controllers/puestos")
      

const router=Router()

//peticion para traer informacion
router.get('/',puestosGet);
//peticion  para mandar informacion 
//validamos con check que el campo de nombre no este vacio antes de pasar a controller
router.post( '/',
      [
      validarJWT,
      esAdmin,
      check("nombre","El nombre del puesto es obligatorio").not().isEmpty(),
      check("horarios","El horario del puesto es obligatorio").not().isEmpty(),
      check("salario","El salario del puesto es obligatorio").not().isEmpty(),
      validarCampos,
      ],
      puestosPost);

//peticion para actualizar le indico que le mando un parametro id  
router.put('/:id',
      [
      validarJWT,
      esAdmin,
      check("id", "El ID ingresado no corresponde a un ID valido").isMongoId(),
      check("id").custom(existePuesto),
      validarCampos,
      ],
      puestosPut); 

//peticion del delete en esta caso no se borraria solo lo desactivaremos 
router.delete('/:id',
      [
      validarJWT,
      esAdmin,
      check("id", "No es un ID válido").isMongoId(),
      check("id").custom(existePuesto),
      validarCampos,
      ],
      puestosDelete);

module.exports=router;