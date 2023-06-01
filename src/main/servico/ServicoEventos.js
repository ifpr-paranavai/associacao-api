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

} // class
