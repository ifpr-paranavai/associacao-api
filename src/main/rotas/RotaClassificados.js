"use strict";

const ControleClassificados = require("../controle/ControleClassificados");

module.exports = class RotaClassificados {
    constructor(app) {
        app.route("/classificados")
        .post(ControleClassificados.criarClassificado)
        .get(ControleClassificados.buscarClassificados)
    app.route("/classificados/:id")
        .put(ControleClassificados.atualizarClassificado)
        .delete(ControleClassificados.excluirClassificado)
    } // constructor()

} // class