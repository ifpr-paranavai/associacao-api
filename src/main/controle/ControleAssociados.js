"use strict";

const ServicoAssociados = require("../servico/ServicoAssociados");


module.exports = class ControleAssociados {

  static async listarTodos(req, res) {
    try {        
        res.status(200).send(await ServicoAssociados.listarTodos());
    } catch (e) {
        res.status(500).send(e.message);
        global.logger.error("ControleAssociados.listarTodos " + e.message);
    }
  } // findAll()


  static async salvar(req, res) {
    try {        
        res.status(200).send(await ServicoAssociados.salvar(req.body));
    } catch (e) {
        res.status(500).send(e.message);
        global.logger.error("ControleAssociados.salvar " + e.message);
    }
  } // findAll()
  
 
  
}; // class