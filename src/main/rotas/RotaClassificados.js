"use strict";

const ControleClassificados = require("../controle/ControleClassificados");

module.exports = class RotaClassificados {
    constructor(app) {
        app
        .route("/classificados")
        .get(
            ControleClassificados.buscarClassificados
        )
        .post(
            ControleClassificados.criarClassificado
        )
        
    app
        .route("/classificados/:valor")
        .get(
            ControleClassificados.buscarClassificadoPorValor
        )
        .put(
            ControleClassificados.atualizarClassificado
        )
        .delete(
            ControleClassificados.excluirClassificado
        )
    app
        .route("/classificados/nome/:nome")
        .get(
            ControleClassificados.buscarClassificadoPorNome
        )
    } // constructor()

} // class