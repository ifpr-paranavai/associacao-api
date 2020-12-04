"use strict";

const Mongoose = require("mongoose");
const Classificado = Mongoose.model('Classificado')


module.exports = class ServicoClassificados {

  
    static async listarTodos() {
        try {
           
            let classificado = await Classificado.find({})
                                
                return classificado
        } catch (error) {
            throw new Error("Falha ao processar requisição: " + error);
        }
    } // getList()

  

} // class