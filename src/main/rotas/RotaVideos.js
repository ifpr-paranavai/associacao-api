"use strict";

const ControleVideos = require("../controle/ControleVideos");
const multer = require("multer");
const upload = multer({ dest: "src/main/Arquivos/AnexosVideos/" });

module.exports = class RotaVideos {
  constructor(app) {
    app
      .route("/videos")
      .post(ControleVideos.criarVideo)
      .get(ControleVideos.buscarVideos);
    app
      .route("/videos/:id")
      .put(ControleVideos.atualizarVideo)
      .delete(ControleVideos.excluirVideo)
      .get(ControleVideos.buscarVideoPorId);
    app
      .route("/videos/titulo/:titulo")
      .get(ControleVideos.buscarVideoPorTitulo);
    app
      .route("/videos/:id/anexo")
      .post(upload.single("anexo"), ControleVideos.uploadAnexo);
      app.route("/videos/:id/anexo/download").get(ControleVideos.downloadAnexo);
    app
      .route("/videos/valor/:valor")
      .get(ControleVideos.buscarVideoPorValor);
  } // constructor()
}; // class