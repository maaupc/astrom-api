// Checkear info de empleado



const {Router} = require('express')
const {check} = require('express-validator')

const router = Router()

const{
    licenciasGet,
    licenciasPost,
    licenciasPut,

} = require('../controllers/licencias')



router.get('/', licenciasGet);

router.post('/',[

check("fecha", "La fecha debe ser obligatoria").not().isEmpty()

], licenciasPost);

  // id del usuario que se quiere modificar
router.put('/:id',[
  check("motivo", "Ingrese el motivo de la licencia").not().isEmpty()
], licenciasPut);


  module.exports=router;