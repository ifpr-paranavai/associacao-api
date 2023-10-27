"use strict";

const TextoModal = require("../modelos/TextoModal");
const { Op } = require("sequelize");

module.exports = class ServicoTextoModal {
  static async buscarTextoModal() {
    try {
      return await TextoModal.findAll();
    } catch (error) {
      throw new Error("Falha ao buscar textoModal: " + error);
    }
  } // buscarTextoModal

  static async atualizarTextoModal(id, dadosAtualizados) {
    try {
      const textoModal = await TextoModal.findByPk(id);
      if (!textoModal) {
        throw new Error("TextoModal não encontrado");
      }
      const textoModalAtualizado = await textoModal.update(dadosAtualizados);
      return textoModalAtualizado;
    } catch (error) {
      throw new Error("Falha ao atualizar TextoModal: " + error.message);
    }
  } // atualizarTextoModal
}; // class
