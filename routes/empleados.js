const {Router} = require('express')

//Importacion de validaciones


//Importacion de controladores
const {obtenerEmpleados,
    obtenerEmpleado,
    crearEmpleado,
    editarEmpleado,
    inactivarEmpleado} = require('../controllers/empleados')


const router = Router()

//Peticion para listar todos los empleados
router.get('/', obtenerEmpleados)

//Peticion para buscar empleado por ID
router.get('/:id', obtenerEmpleado)

//Peticion para crear nuevo empleado
router.post('/', crearEmpleado)

//Peticion para editar informacion del empleado
router.put('/:id', editarEmpleado)

//Peticion para inactivar empleado
router.delete('/:id', inactivarEmpleado)


module.exports = router;