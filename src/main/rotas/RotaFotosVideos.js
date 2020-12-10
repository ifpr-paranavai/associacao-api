"use strict";

const ControleFotosVideos = require("../controle/ControleFotosVideos");


module.exports = class RotaFotosVideos {
    constructor(app) {
        app.route("/galeria")
            .get(ControleFotosVideos.listarTodos)
            .post(ControleFotosVideos.salvar)
           
    } // constructor()

} // class