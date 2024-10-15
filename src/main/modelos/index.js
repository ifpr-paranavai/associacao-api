const Classificado = require('./Classificados');
const Foto = require('./Fotos');

Classificado.associate({ Foto });
Foto.associate({ Classificado });

module.exports = {
  Classificado,
  Foto,
};