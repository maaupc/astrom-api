
const {Router} = require('express')
const {check} = require('express-validator')


const {existeLicencia, existeID} = require('../helpers/db-validator')


const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-token')
const { esAdmin } = require('../middlewares/validar-rol')

const{
  licenciasGet,
  licenciasPost,
  licenciasPut,
  obtenerLicencia,
  inactivarLicencia
  
} = require('../controllers/licencias')


const router = Router()

//Obtener todas las licencias
router.get('/', [
  validarJWT,
  esAdmin,
  ],
  licenciasGet);

//Obtener las licencias de un empleado - ID Empleado
router.get('/:id', [
  check("id", "No se ingreso un ID valido").isMongoId(),
  check("id").custom(existeID),
  ],
  obtenerLicencia)

//Crear nueva licencias
router.post('/',[
    validarJWT,
    check("fecha", "La fecha debe ser obligatoria").not().isEmpty(),
    validarCampos
    ],
    licenciasPost);

// Modificar un licencia - ID Licencia
router.put('/:id', [
  validarJWT,
  esAdmin,
  check("id", "No se ingreso un ID valido").isMongoId(),
  check("id").custom(existeLicencia),
  validarCampos,
  ],
  licenciasPut);

//Eliminar una licencia - ID Licencia
router.delete('/:id', [
  validarJWT,
  esAdmin,
  check("id", "No se ingreso un ID valido").isMongoId(),
  check("id").custom(existeLicencia),
  ],
  inactivarLicencia);


  module.exports=router;