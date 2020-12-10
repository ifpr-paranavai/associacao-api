"use strict";

const ServicoEventos = require("../servico/ServicoEventos");


module.exports = class ControleEventos {

  static async listarTodos(req, res) {
    try {        
        res.status(200).send(await ServicoEventos.listarTodos());
    } catch (e) {
        res.status(500).send(e.message);
        global.logger.error("ControleEventos.listarTodos " + e.message);
    }
  } // findAll()

  static async salvar(req, res) {
    try {        
        res.status(200).send(await ServicoEventos.salvar(req.body));
    } catch (e) {
        res.status(500).send(e.message);
        global.logger.error("ControleEventos.salvar " + e.message);
    }
  } // findAll()
  
  
 
  
}; // class