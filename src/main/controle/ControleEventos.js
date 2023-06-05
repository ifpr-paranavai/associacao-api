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

  static async buscarEventoPorId(req, res) {
    try {
      const id = req.params.id;
      const evento = await ServicoEventos.buscarEventoPorId(id);
      res.json(evento);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// findByID

  static async buscarEventoPorTitulo(req, res) {
    try {
      const titulo = req.params.titulo;
      const evento = await ServicoEventos.buscarEventoPorTitulo(titulo);
      res.json(evento);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// findByName

  static async buscarEventosPorData(req, res) {
    try {
      const data = req.params.data;
      const eventos = await ServicoEventos.buscarEventosPorData(data);
      res.json(eventos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// findByDate

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

  static async excluirEvento(req, res) {
    try {
      const id = req.params.id;
      const eventoExcluido = await ServicoEventos.excluirEvento(id);
      res.json({ sucesso: eventoExcluido });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}; // class
