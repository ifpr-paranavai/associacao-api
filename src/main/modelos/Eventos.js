"use strict";

const Mongoose = require("mongoose");


module.exports = class Eventos extends Mongoose.Schema {

    constructor() {

        super({
            
            imagem:{
                src: String,
                alt: String,
            },
            titulo: String,
            descricao: String,
            link: String,
        });
        Mongoose.model("Evento", this);
    } // constructor()
} // class