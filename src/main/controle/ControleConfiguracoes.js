"use strict";

const ServicoAssociados = require("../servico/ServicoAssociados");

const Associado = require("../modelos/Associados");


module.exports = class ControleAssociados {

  static async getDados(req, res) {
    try {        
        res.status(200).send(await ServicoAssociados.listarTodos());
    } catch (e) {
        res.status(500).send(e.message);
        global.logger.error("ControleAssociados.listarTodos " + e.message);
    }
  } // listarTodos()

  static async setDados(req, res) {
    try {        
        res.status(200).send(await ServicoAssociados.buscarAtivos());
    } catch (e) {
        res.status(500).send(e.message);
        global.logger.error("ControleAssociados.listarTodos " + e.message);
    }
  } // listarTodos()

  static async criarAssociado(req, res) {
    try {
      res.status(200).send(await ServicoAssociados.criarAssociado(req.body));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("ControleAssociados.criarAssociado" + e.message);
    }
  } // criarAssociado()

  static async buscarPorId(req, res) {
    try {
        res.status(200).send(await ServicoAssociados.buscarPorId(req.params));
    } catch (e) {
        res.status(500).send(e.message);
        global.logger.error("ControleAssociados.buscarPorId " + e.message);
    }
  } // buscarPorId()
  static async atualizar(req, res) {
    try {
        res.status(200).send(await ServicoAssociados.atualizar(req.body));
    } catch (e) {
        res.status(500).send(e.message);
        global.logger.error("ControleAssociados.atualizar " + e.message);
    }
  } // atualizar()

  static async excluir(req, res) {
    try {
        res.status(200).send(await ServicoAssociados.excluir(req.body));
    } catch (e) {
        res.status(500).send(e.message);
        global.logger.error("ControleAssociados.excluir " + e.message);
    }
  } // excluir()
 
  
}; // class