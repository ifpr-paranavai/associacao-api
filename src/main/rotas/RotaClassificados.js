"use strict";

const ControleClassificados = require("../controle/ControleClassificados");


module.exports = class RotaClassificados {
    constructor(app) {
        app.route("/classificados")
            .get(ControleClassificados.listarTodos)
            .post(ControleClassificados.salvar)
           
    } // constructor()

} // class