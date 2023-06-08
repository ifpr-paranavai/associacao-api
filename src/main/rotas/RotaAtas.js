"use strict";

const ControleAtas = require("../controle/ControleAtas");

module.exports = class RotaAtas {
    constructor(app) {
        app.route("/atas")
            .post(ControleAtas.criarAta)
            .get(ControleAtas.buscarAtas)
        app.route("/atas/:id")
            .put(ControleAtas.atualizarAta)
            .delete(ControleAtas.excluirAta)
            .get(ControleAtas.buscarAtaPorId)
        app.route("/atas/titulo/:titulo")
            .get(ControleAtas.buscarAtaPorTitulo)
    } // constructor()

} // class