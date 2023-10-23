"use strict";

const ServicoVideos = require("../servico/ServicoVideos");

module.exports = class ControleVideos {

  static async criarVideo(req, res) {
    try {
      const video = req.body;
      console.log(req.body)
      const novoVideo = await ServicoVideos.criarVideo(video);
      res.status(201).json(novoVideo);
    } catch (error) {
      res.status(500).json({ error: error.message });

    }
  }//create
  static async buscarVideos(req, res) {
    try {
      const limite = parseInt(req.query.limite) || 10;
      const pagina = parseInt(req.query.pagina) || 1;

      const videos = await ServicoVideos.buscarVideos(limite, pagina);
      res.json(videos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// findAll

  static async atualizarVideo(req, res) {
    try {
      const id = req.params.id;
      const videoAtualizado = req.body;
      const videos = await ServicoVideos.atualizarVideo(id, videoAtualizado);
      res.json(videos);
    } catch (error) {
      res.status(500).json({error: error.message})
    }
  }// update
  
  static async excluirVideo(req, res) {
    try {
      const id = req.params.id;
      const videoExcluido = await ServicoVideos.excluirVideo(id);
      res.json({ sucesso: videoExcluido });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// delete

  static async buscarVideoPorId(req, res) {
    try {
      const id = req.params.id;
      const video = await ServicoVideos.buscarVideoPorId(id);
      res.json(video);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar video por ID: " + error.message });
    }
  }// findByID

  static async buscarVideoPorTitulo(req, res) {
    try {
      const titulo = req.params.titulo;

      const limite = parseInt(req.query.limite) || 10;
      const pagina = parseInt(req.query.pagina) || 1;

      const video = await ServicoVideos.buscarVideoPorTitulo(titulo, limite, pagina);
      res.json(video);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// findByName
  
}; // class