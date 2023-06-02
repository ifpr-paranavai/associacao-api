"use strict";

const Eventos = require('../modelos/Eventos');

module.exports = class ServicoEventos {

  static async criarEvento(evento) {
    try {
      return await Eventos.create(evento);
    } catch (error) {
      throw new Error("Falha ao criar evento: " + error);
    }
  }

  static async buscarEventos() {
    try {
      return await Eventos.findAll();
    } catch (error) {
      throw new Error("Falha ao buscar eventos: " + error);
    }
  }

  static async atualizarEvento(id, dadosAtualizados) {
    try {
      const evento = await Eventos.findByPk(id);
      if (!evento) {
        throw new Error('Evento não encontrado');
      }
      const eventoAtualizado = await evento.update(dadosAtualizados);
      return eventoAtualizado;
    } catch (error) {
      throw new Error('Falha ao atualizar evento: ' + error.message);
    }
  }

} // class
