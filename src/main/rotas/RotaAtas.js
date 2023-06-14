"use strict";

const ControleAtas = require("../controle/ControleAtas");
const multer = require("multer");
const upload = multer({ dest: "src/main/Arquivos/AnexosAtas/" });

module.exports = class RotaAtas {
  constructor(app) {
    app.route("/atas").post(ControleAtas.criarAta).get(ControleAtas.buscarAtas);
    app
      .route("/atas/:id")
      .put(ControleAtas.atualizarAta)
      .delete(ControleAtas.excluirAta)
      .get(ControleAtas.buscarAtaPorId);
    app
      .route("/atas/:id/anexo")
      .post(upload.single("anexo"), ControleAtas.uploadAnexo);
      app.route("/atas/:id/anexo/download").get(ControleAtas.downloadAnexo);
    app.route("/atas/titulo/:titulo").get(ControleAtas.buscarAtaPorTitulo);
  } // constructor()
}; // class
