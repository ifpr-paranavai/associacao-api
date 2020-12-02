"use strict";

const Mongoose = require("mongoose");


module.exports = class Noticia extends Mongoose.Schema {

    constructor() {

        super({
            
            src: String,
            alt: String,
            titulo: String,
            subtitulo: String,
            corpo: String,

            
        });
        Mongoose.model("Noticia", this);
    } // constructor()
} // class