"use strict";

const ServicoEmail = require("../servico/ServicoEmail");

module.exports = class ControleContato {
  static async notificarContato(req, res) {
    try {
      res.status(200).send(await ServicoEmail.notificarContato(req.body));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("ControleContato.notificarContato " + e.message);
    }
  } // notificarContato()
}; // class