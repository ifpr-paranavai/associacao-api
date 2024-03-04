"use strict";

const ServicoEventos = require("../servico/ServicoEventos");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const upload = multer({ dest: path.join(__dirname, "../Arquivos/AnexosEventos") });


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
      const limite = parseInt(req.query.limite) || 10;
      const pagina = parseInt(req.query.pagina) || 1;

      const eventos = await ServicoEventos.buscarEventos(limite, pagina);
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

      const limite = parseInt(req.query.limite) || 10;
      const pagina = parseInt(req.query.pagina) || 1;

      const evento = await ServicoEventos.buscarEventoPorTitulo(titulo, limite, pagina);
      res.json(evento);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// findByName

  static async buscarEventoPorData(req, res) {
    try {
      const data = req.params.data;

      const limite = parseInt(req.query.limite) || 10;
      const pagina = parseInt(req.query.pagina) || 1;

      const evento = await ServicoEventos.buscarEventoPorData(data, limite, pagina);
      res.json(evento);
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

  static async uploadAnexo(req, res) {
    try {
      const id = req.params.id;
      const anexo = req.file;
      await ServicoEventos.uploadAnexo(id,anexo);
      res.json({ sucesso: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// uploadAttachment
  static async downloadAnexo(req, res) {
    try {
      const id = req.params.id;
      const anexo = await ServicoEventos.downloadAnexo(id);
      res.download(anexo.comeco,anexo.fim);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}; // class
