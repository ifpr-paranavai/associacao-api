"use strict";

const Mongoose = require("mongoose");

module.exports = class Associado extends Mongoose.Schema {

    constructor() {

        super({
            imagem:{
                src: String,
                alt: String,
            },
            endereco:{
                cep: {type: String},
                estado: String, 
                cidade: String, 
                rua: String,
                numero: Number,
                bairro: String,
            },
            tel_celular:{
                numero: String,
                whatsapp: Boolean,
            },
            nome: String,
            sobrenome: String,
            data_nascimento: Date,
            cpf: String,
            rg: String,
            tel_residencial: String,
            tel_comercial: String,
            email: String,
            email_alternativo: String,
            modalidade: String,            
            receber_comunicado: Boolean, 
            senha: String,
            ativo: Boolean,
            perfil: String,
        });
        Mongoose.model("Associado", this);
    } // constructor()
} // class