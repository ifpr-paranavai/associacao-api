"use strict";

const ControleFotos = require("../controle/ControleFotos");
const multer = require("multer");
const upload = multer({ dest: "src/main/Arquivos/AnexosFotos/" });

module.exports = class RotaFotos {
  constructor(app) {
    app
      .route("/fotos")
      .post(ControleFotos.criarFoto)
      .get(ControleFotos.buscarFotos);
    app
      .route("/fotos/:id")
      .put(ControleFotos.atualizarFoto)
      .delete(ControleFotos.excluirFoto)
      .get(ControleFotos.buscarFotoPorId);
    app
      .route("/fotos/titulo/:titulo")
      .get(ControleFotos.buscarFotoPorTitulo);
  } // constructor()
}; // class