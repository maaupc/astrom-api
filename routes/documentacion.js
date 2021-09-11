
const {Router} = require ("express")
const {check} = require ("express-validator")
const { get } = require("mongoose")

const router = Router()

const {
    documentacionGet,
    documentacionPost,
    documentacionPut, 
} = require("../controllers/documentacion")

router.get("/",documentacionGet)

router.post("/",[
    check("antiguedad","La antiguedad debe ser obligatoria").not().isEmpty()
],documentacionPost);

router.put("/:id",[
    check("recibo_sueldo","Ingrese el recibo").not().isEmpty()
],documentacionPut);

module.exports=router;