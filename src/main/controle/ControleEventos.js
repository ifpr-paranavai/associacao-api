"use strict";

const ServicoEventos = require("../servico/ServicoEventos");


module.exports = class ControleEventos {

  static async criarEvento(req, res) {
    try {
      const evento = req.body;
      console.log(req.body)
      const novoEvento = await ServicoEventos.criarEvento(evento);
      res.status(201).json(novoEvento);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// create

  static async buscarEventos(req, res) {
    try {
      const eventos = await ServicoEventos.buscarEventos();
      res.json(eventos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// findAll

  static async atualizarEvento(req, res) {
    try {
      const id = req.params.id;
      const eventoAtualizado = req.body;
      const evento = await ServicoEventos.atualizarEvento(id, eventoAtualizado);
      res.json(evento);
    } catch (error) {
      res.status(500).json({error: error.message})
    }
  }// update

}; // class
