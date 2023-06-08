"use strict";

const ControleNoticias = require("../controle/ControleNoticias");


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
    } // constructor()
} // class