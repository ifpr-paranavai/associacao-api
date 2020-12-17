"use strict";

const ControleFotosVideos = require("../controle/ControleFotosVideos");


module.exports = class RotaFotosVideos {
    constructor(app) {
        app.route("/galeria")
            .get(ControleFotosVideos.listarTodos)
            .post(ControleFotosVideos.salvar)

        app.route("/galeria/fotos")
            .get(ControleFotosVideos.listarFotos)
         
        app.route("/galeria/videos")
            .get(ControleFotosVideos.listarVideos)
           
    } // constructor()

} // class