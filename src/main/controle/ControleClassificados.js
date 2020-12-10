"use strict";

const ServicoClassificados = require("../servico/ServicoClassificados");


module.exports = class ControleClassificados {

  static async listarTodos(req, res) {
    try {        
        res.status(200).send(await ServicoClassificados.listarTodos());
    } catch (e) {
        res.status(500).send(e.message);
        global.logger.error("ControleClassificados.listarTodos " + e.message);
    }
  } // findAll()
  
  static async salvar(req, res) {
    try {        
        res.status(200).send(await ServicoClassificados.salvar(req.body));
    } catch (e) {
        res.status(500).send(e.message);
        global.logger.error("ControleClassificados.salvar " + e.message);
    }
  } // findAll()
  
}; // class