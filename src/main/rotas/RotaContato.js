"use strict";

const ControleContato = require("../controle/ControleContato");
module.exports = class RotaContato {
    constructor(app) {
        app.route("/contato")
            .post(ControleContato.notificarContato)
    } // constructor()
} // class