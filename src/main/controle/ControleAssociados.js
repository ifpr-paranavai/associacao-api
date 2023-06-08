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
        const associado = await ServicoAssociados.listarTodos();
        res.json(associado);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  }

  static async buscarPendentes(req, res) {
    try {
      res.status(200).send(await ServicoAssociados.buscarPendentes());
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("ControleAssociados.buscarPendentes " + e.message);
    }
  }

  static async buscarAtivos(req, res) {
    try {
      res.status(200).send(await ServicoAssociados.buscarAtivos());
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("ControleAssociados.buscarAtivos " + e.message);
    }
  }

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
