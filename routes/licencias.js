
const {Router, request} = require('express')
const {check} = require('express-validator')


const {existeLicencia, existeID, licenciaActiva, fechaFin} = require('../helpers/db-validator')


const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-token')
const { esAdmin } = require('../middlewares/validar-rol')

const{
  licenciasGet,
  licenciasPost,
  licenciasPut,
  obtenerLicencia,
  eliminarLicencia
  
} = require('../controllers/licencias')


const router = Router()

//Obtener todas las licencias
router.get('/', licenciasGet);

//Obtener las licencias de un empleado - ID Empleado
router.get('/:id', [
  check("id", "No se ingreso un ID valido").isMongoId(),
  check("id").custom(existeID),
  ],
  obtenerLicencia)

//Crear nueva licencias
router.post('/',[
    validarJWT,
    check("inicio", "La fecha de inicio debe ser obligatoria").not().isEmpty(),
    check("fin", "La fecha de finalizacion debe ser obligatoria").not().isEmpty(),
    check("fin").custom((fin, {req})=>fechaFin(fin, req)),
    validarCampos
    ],
    licenciasPost);

// Modificar un licencia - ID Licencia
router.put('/:id', [
  validarJWT,
  esAdmin,
  check("id", "No se ingreso un ID valido").isMongoId(),
  check("id").custom(existeLicencia),
  check("id").custom((id, {req})=>licenciaActiva(id, req)),
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
  eliminarLicencia);


  module.exports=router;