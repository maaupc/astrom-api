const {Router} = require ("express")
const {check} = require ("express-validator")

const { existeID } = require('../helpers/db-validator')

const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-token')
const { esAdmin } = require('../middlewares/validar-rol')

const router = Router()

const {
    documentacionGet,
    documentacionPost,
    documentacionPut, 
    obtenerDocumentacion,
    eliminarDocumentacion
} = require("../controllers/documentacion")


//Traer toda la documentacion
router.get("/", documentacionGet)

//Trae la documentacion de cierto empleado
router.get("/:id", 
    [
    check("id", "No se ingreso un ID valido").isMongoId(),
    check("id").custom(existeID)
    ],
    obtenerDocumentacion)

//Crear documentacion nueva 
router.post("/:id",
    [
    validarJWT,
    check("antiguedad","La antiguedad debe ser obligatoria").not().isEmpty(),
    validarCampos
    ],
    documentacionPost);

//Editar toda la documentacion
router.put("/:id", [
    validarJWT,
    esAdmin,
    check("id", "No se ingreso un ID valido").isMongoId(),
    check("id").custom(existeID),
    validarCampos
    ],
    documentacionPut);


//Eliminar toda la documentacion
router.delete("/:id", [
    validarJWT,
    esAdmin,
    check("id", "No se ingreso un ID valido").isMongoId(),
    check("id").custom(existeID),
    validarCampos
    ],
    eliminarDocumentacion);

module.exports=router;