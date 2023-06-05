"use strict";

const ControleEventos = require("../controle/ControleEventos");


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
    } // constructor()
} // class
