"use strict";

const Mongoose = require("mongoose");
const Noticia = Mongoose.model('Noticia')


module.exports = class ServicoNoticias {

  
    static async listarTodas() {
        try {
           
            let noticia = await Noticia.find({})
                                
                return noticia
        } catch (error) {
            throw new Error("Falha ao processar requisição: " + error);
        }
    } // getList()

  

} // class