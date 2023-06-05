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

  static async buscarEventoPorId(id) {
    try {
      const evento = await Eventos.findByPk(id);
      if (!evento) {
        throw new Error('Evento não encontrado');
      }
      return evento;
    } catch (error) {
      throw new Error('Falha ao buscar evento: ' + error.message);
    }
  }

  static async buscarEventoPorTitulo(titulo) {
    try {
      const evento = await Eventos.findAll({ where: { titulo: titulo } });
      if (!evento) {
        throw new Error('Evento não encontrado no serviço');
      }
      return evento;
    } catch (error) {
      throw new Error('Falha ao buscar evento: ' + error.message);
    }
  }

  static async buscarEventosPorData(data) {
    try {
      const eventos = await Eventos.findAll({ where: { data_inicio: data } });
      if (!eventos || eventos.length === 0) {
        throw new Error('Nenhum evento encontrado');
      }
      return eventos;
    } catch (error) {
      throw new Error('Falha ao buscar eventos: ' + error.message);
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

  static async excluirEvento(id) {
    try {
      const evento = await Eventos.findByPk(id);
      if (!evento) {
        throw new Error('Evento não encontrado');
      }
      await evento.destroy();
      return true;
    } catch (error) {
      throw new Error('Falha ao excluir evento: ' + error.message);
    }
  }

} // class
