"use strict";

const Mongoose = require("mongoose");
const Evento = Mongoose.model('Evento')


module.exports = class ServicoEventos {

  
    static async listarTodos() {
        try {
           
            let evento = await Evento.find({})
                                
                return evento
        } catch (error) {
            throw new Error("Falha ao processar requisição: " + error);
        }
    } // getList()

    static async salvar(evento) {
        try {
           
            return await Evento.create(evento);
                                
            
        } catch (error) {
            throw new Error("Falha ao processar requisição: " + error);
        }
    } // getList()

} // class