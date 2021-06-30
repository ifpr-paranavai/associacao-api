"use strict";

const ServicoAssociados = require("../servico/ServicoAssociados");

module.exports = class ControleAssociados {
  static async login(req, res) {
    try {
      res.status(200).send(await ServicoAssociados.login(req.body));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("ControleAssociados.login " + e.message);
    }
  } // login()

  static async listarTodos(req, res) {
    try {
      const { start, perPage} = req.query;
      const parsedFilter = JSON.parse(req.query.filter || '{}')
      const filter = {}
      Object.keys(parsedFilter).forEach(key => {
        filter[key] = { $regex: `.*${parsedFilter[key]}*.`, $options: 'i' }
      })

      res
        .status(200)
        .send(await ServicoAssociados.listarTodos({ start, perPage, filter }));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("ControleAssociados.listarTodos " + e.message);
    }
  } // listarTodos()

  static async buscarAtivos(req, res) {
    try {
      res.status(200).send(await ServicoAssociados.buscarAtivos());
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("ControleAssociados.listarTodos " + e.message);
    }
  } // listarTodos()

  //criar associado será feito pela diretoria
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
      res
        .status(200)
        .send(await ServicoAssociados.atualizarAssociado(req.body));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("ControleAssociados.atualizar " + e.message);
    }
  } // atualizar()

  static async excluir(req, res) {
    try {
      res
        .status(200)
        .send(await ServicoAssociados.excluirAssociado(req.params));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("ControleAssociados.excluir " + e.message);
    }
  } // excluir()
}; // class
