"use strict";

const ServicoTextoModal = require("../servico/ServicoTextoModal");

module.exports = class ControleTextoModal {

  static async buscarTextoModal(req, res) {
    try {
      const textoModal = await ServicoTextoModal.buscarTextoModal();
      res.json(textoModal);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async atualizarTextoModal(req, res) {
    try {
      const id = req.params.id;
      const textoModalAtualizado = req.body;
      const textoModal = await ServicoTextoModal.atualizarTextoModal(id, textoModalAtualizado);
      res.json(textoModal);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
