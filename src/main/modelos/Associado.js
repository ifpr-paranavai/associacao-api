"use strict";

const Mongoose = require("mongoose");


module.exports = class Associado extends Mongoose.Schema {

    constructor() {

        super({
            
            src: String,
            alt: String,
            // colocar imagem do associado
            nome: String,
            sobrenome: String,
            data_nascimento: Date,
            cpf: String,
            rg: String,
            cep: String,
            estado: String, // perguntar 
            cidade: String, // perguntar
            tel_celular: String,
            tel_residencial: String,
            tel_comercial: String,
            email: String,
            email_alternativo: String,
            // atributo modalidade
            // atributo se o celular possui WhatsApp
            // atributo se o associado vai querer receber comunicados oficiais

            
        });
        Mongoose.model("Associado", this);
    } // constructor()
} // class