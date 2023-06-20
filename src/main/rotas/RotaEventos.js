"use strict";

const ControleEventos = require("../controle/ControleEventos");
const multer = require("multer");
const upload = multer({ dest: "src/main/Arquivos/AnexosEventos/" });

module.exports = class RotaEventos {
    constructor(app) {
        app.route("/eventos")
            .post(ControleEventos.criarEvento)
            .get(ControleEventos.buscarEventos)
        app.route("/eventos/:id")
            .put(ControleEventos.atualizarEvento)
            .delete(ControleEventos.excluirEvento)
            .get(ControleEventos.buscarEventoPorId)
        app.route("/eventos/titulo/:titulo")
            .get(ControleEventos.buscarEventoPorTitulo)
        app.route("/eventos/data/:data")
            .get(ControleEventos.buscarEventosPorData)
        app.route("/eventos/:id/anexo")
          .post(upload.single("anexo"), ControleEventos.uploadAnexo);
        app.route("/eventos/:id/anexo/download").get(ControleEventos.downloadAnexo);
    } // constructor()
} // class
