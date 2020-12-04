"use strict";

const Mongoose = require("mongoose");


module.exports = class Classificados extends Mongoose.Schema {

    constructor() {

        super({
            
            src: String,
            alt: String,
            nome: String,
          // colocar atributo de imagem 
            descricao: String,
            preco: Number,
            contato: String, // rever tipo de dado

            
        });
        Mongoose.model("Classificado", this);
    } // constructor()
} // class