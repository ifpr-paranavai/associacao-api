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
            .get(ControleClassificados.buscarClassificadoPorId)
        app.route("/classificados/titulo/:titulo")
            .get(ControleClassificados.buscarClassificadoPorTitulo)
        app.route("/classificados/valor/:valor")
            .get(ControleClassificados.buscarClassificadoPorValor)
    } // constructor()

} // class