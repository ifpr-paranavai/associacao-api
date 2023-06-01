"use strict";

const ControleEventos = require("../controle/ControleEventos");


module.exports = class RotaEventos {
    constructor(app) {
        app.route("/eventos")
            .post(ControleEventos.criarEvento)
    } // constructor()
} // class
