"use strict";

const Mongoose = require("mongoose");


module.exports = class Eventos extends Mongoose.Schema {

    constructor() {

        super({
            
            src: String,
            alt: String,
            // colocar atributo imagem
            titulo: String,
            descricao: String,
            link: String,

            
        });
        Mongoose.model("Evento", this);
    } // constructor()
} // class