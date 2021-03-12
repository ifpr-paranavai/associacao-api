"use strict";

const ServicoAssociados = require("../servico/ServicoAssociados");

const Mongoose = require("mongoose");
const Associado = Mongoose.model("Associado");


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

  static async CriarAssociado(req, res) {
    try {
      res.status(200).send(
        await Associado.CriarAssociado(req.body)
      );
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("ControleAssociados.CriarAssociado" + e.message);
    }
  } 
  
 
  
}; // class