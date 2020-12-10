"use strict";

const ControleEventos = require("../controle/ControleEventos");


module.exports = class RotaEventos {
    constructor(app) {
        app.route("/eventos")
            .get(ControleEventos.listarTodos)
            .post(ControleEventos.salvar)
           
    } // constructor()

} // class