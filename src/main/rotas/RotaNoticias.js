"use strict";

const ControleNoticias = require("../controle/ControleNoticias");
const multer = require("multer");
const upload = multer({ dest: "src/main/Arquivos/AnexosNoticias/" });


module.exports = class RotaNoticias {
    constructor(app) {
        app.route("/noticias")
            .post(ControleNoticias.criarNoticia)
            .get(ControleNoticias.buscarNoticias)
        app.route("/noticias/:id")
            .put(ControleNoticias.atualizarNoticia)
            .delete(ControleNoticias.excluirNoticia)
            .get(ControleNoticias.buscarNoticiaPorId)
        app.route("/noticias/titulo/:titulo")
            .get(ControleNoticias.buscarNoticiaPorTitulo)
        app.route("/noticias/data/:data")
            .get(ControleNoticias.buscarNoticiasPorData)
            app
      .route("/noticias/:id/anexo")
      .post(upload.single("anexo"), ControleNoticias.uploadAnexo);
      app.route("/noticias/:id/anexo/download").get(ControleNoticias.downloadAnexo);
    } // constructor()
} // class