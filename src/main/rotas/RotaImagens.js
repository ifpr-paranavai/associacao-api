"use strict";
const ControleImagens = require("../controle/ControleImagens");


module.exports = class RotaImagens {
    constructor(app) {
        app.route("/imagem/:nomeArquivo")
            .get(ControleImagens.getImagem)
           
    } // constructor()

} // class
