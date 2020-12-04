"use strict";

const ServicoNoticias = require("../servico/ServicoAssociados");


module.exports = class ControleAssociados {

  static async listarTodos(req, res) {
    try {        
        res.status(200).send(await ServicoAssociados.listarTodos());
    } catch (e) {
        res.status(500).send(e.message);
        global.logger.error("ControleAssociados.listarTodos " + e.message);
    }
  } // findAll()
  
 
  
}; // class