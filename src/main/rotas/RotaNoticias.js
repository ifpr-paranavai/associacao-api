"use strict";

const ControleNoticias = require("../controle/ControleNoticias");


module.exports = class RotaNoticias {
    constructor(app) {
        app.route("/noticias")
            .get(ControleNoticias.listarTodas)
           
    } // constructor()

} // class