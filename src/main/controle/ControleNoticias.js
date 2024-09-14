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
      const limite = parseInt(req.query.limite) || 10;
      const pagina = parseInt(req.query.pagina) || 1;

      const noticias = await ServicoNoticias.buscarNoticias(limite, pagina);
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

      const limite = parseInt(req.query.limite) || 10;
      const pagina = parseInt(req.query.pagina) || 1;

      const noticia = await ServicoNoticias.buscarNoticiaPorTitulo(titulo, limite, pagina);
      res.json(noticia);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// findByName

  static async buscarNoticiaPorData(req, res) {
    try {
      const data = req.params.data;

      const limite = parseInt(req.query.limite) || 10;
      const pagina = parseInt(req.query.pagina) || 1;

      const noticia = await ServicoNoticias.buscarNoticiaPorData(data, limite, pagina);
      res.json(noticia);
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
  }// delete

  static async uploadAnexo(req, res){
    try{
      const id = req.params.id;
      const anexo = req.file;
      await ServicoNoticias.uploadAnexo(id, anexo);
      res.json({ sucesso: true })
    } catch (error){
      res.status(500).json({ error: error.message });
    }
  }

  static async downloadAnexo(req, res) {
    try {
      const id = req.params.id;
      const anexo = await ServicoNoticias.downloadAnexo(id);
      res.download(anexo.comeco,anexo.fim);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}; // class