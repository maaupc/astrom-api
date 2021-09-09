//para capturar los resultados del check
const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) => {
  //valido si el campo es valido chequeando el error que obtuve en routes
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
//para que siga con el proceso osea los controllers
  next();
};

module.exports = {
  validarCampos,
};