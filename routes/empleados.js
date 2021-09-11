const {Router} = require('express')

//Importacion de validaciones
const { check } = require('express-validator')
const { existeID, existeDni, existePuesto } = require('../helpers/db-validator')

const {validarCampos} = require('../middlewares/validar-campos')
const {esAdmin} = require('../middlewares/validar-rol')
const {validarJWT} = require('../middlewares/validar-token')

//Importacion de controladores
const {obtenerEmpleados,
    obtenerEmpleado,
    crearEmpleado,
    editarEmpleado,
    inactivarEmpleado} = require('../controllers/empleados')


const router = Router()

//Peticion para listar todos los empleados - ADMIN 
router.get('/' , obtenerEmpleados)

//Peticion para buscar empleado por ID - ADMIN
router.get('/:id',[
    check("id", "No se ingreso un ID valido").isMongoId(),
    check("id").custom(existeID)
    ], obtenerEmpleado)

//Peticion para crear nuevo empleado - ADMIN
router.post('/', [
    validarJWT,
    esAdmin,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "La contraseña es obligatoria").not().isEmpty().trim(),
    check("password", "Debe tener 5 caracteres minimo").isLength({min:6}),
    check("email", "No es un correo valido").isEmail(),
    check("dni").custom(existeDni),
    check("puesto", "No se ingreso un ID valido").isMongoId(),
    check("puesto").custom(existePuesto),
    check("rol", "No se ingreso un rol valido").isIn(["USER_ROLE","ADMIN_ROLE"]),
    validarCampos
    ], crearEmpleado)

//Peticion para editar informacion del empleado - PUBLICO
router.put('/:id', [
    check("id", "No se ingreso un ID valido").isMongoId(),
    check("id").custom(existeID),
    check("dni").custom(existeDni),
    validarCampos
    ], editarEmpleado)

//Peticion para inactivar empleado - ADMIN
router.delete('/:id', [
    validarJWT,
    esAdmin,
    check("id", "No se ingreso un ID valido").isMongoId(),
    check("id").custom(existeID),
    validarCampos
    ],inactivarEmpleado)


module.exports = router;