"use strict";

const ServicoNoticias = require("../servico/ServicoNoticias");


module.exports = class ControleNoticias {

  static async criarNoticia(req, res) {
    try {
      const noticia = req.body;
      console.log(req.body)
      const novoNoticia = await ServicoNoticias.criarNoticia(noticia);
      res.status(201).json(novoNoticia);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// create

  static async buscarNoticias(req, res) {
    try {
      const noticias = await ServicoNoticias.buscarNoticias();
      res.json(noticias);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// findAll

  static async buscarNoticiaPorId(req, res) {
    try {
      const id = req.params.id;
      const noticia = await ServicoNoticias.buscarNoticiaPorId(id);
      res.json(noticia);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// findByID

  static async buscarNoticiaPorTitulo(req, res) {
    try {
      const titulo = req.params.titulo;
      const noticia = await ServicoNoticias.buscarNoticiaPorTitulo(titulo);
      res.json(noticia);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// findByName

  static async buscarNoticiasPorData(req, res) {
    try {
      const data = req.params.data;
      const noticias = await ServicoNoticias.buscarNoticiasPorData(data);
      res.json(noticias);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// findByDate

  static async atualizarNoticia(req, res) {
    try {
      const id = req.params.id;
      const noticiaAtualizado = req.body;
      const noticia = await ServicoNoticias.atualizarNoticia(id, noticiaAtualizado);
      res.json(noticia);
    } catch (error) {
      res.status(500).json({error: error.message})
    }
  }// update

  static async excluirNoticia(req, res) {
    try {
      const id = req.params.id;
      const noticiaExcluido = await ServicoNoticias.excluirNoticia(id);
      res.json({ sucesso: noticiaExcluido });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}; // class