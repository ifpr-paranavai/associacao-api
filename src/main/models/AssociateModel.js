"use strict";

const Mongoose = require("mongoose");

module.exports = class AssociateModel extends Mongoose.Schema {

    constructor() {

        super({
            address: {          // Endereço
                addressType: String,     // Logradouro
                number: String,
                cep: String,
                district: String,
                complement: String,
                city: String,
                state: String,
            },
            name: String,
            phone: String,
            email: String,
            rg: String,
            cpf: String,
            active: {
                type: Boolean,
                default: true,
            }
        });
        Mongoose.model("Associate", this);
    } // constructor()
} // class