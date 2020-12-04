"use strict";

const Mongoose = require("mongoose");
const Associado = Mongoose.model('Associado')


module.exports = class ServicoAssociados {

  
    static async listarTodos() {
        try {
           
            let associado = await Assoociado.find({})
                                
                return associado
        } catch (error) {
            throw new Error("Falha ao processar requisição: " + error);
        }
    } // getList()

  

} // class