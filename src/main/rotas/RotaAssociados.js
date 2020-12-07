"use strict";

const ControleAssociados = require("../controle/ControleAssociados");


module.exports = class RotaAssociados {
    constructor(app) {
        app.route("/associados")
            .get(ControleAssociados.listarTodos)
            .post(ControleAssociados.salvar)
           
    } // constructor()

} // class