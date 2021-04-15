"use strict";

const ControleConfiguracoes = require("../controle/ControleConfiguracoes");
module.exports = class RotaConfiguracoes {
    constructor(app) {
        app.route("/dadosconfig")
            .get(ControleConfiguracoes.getDados)
            .post(ControleConfiguracoes.setDados)
    } // constructor()
} // class