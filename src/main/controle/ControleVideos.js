"use strict";

const ServicoVideos = require("../servico/ServicoVideos");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const upload = multer({ dest: path.join(__dirname, "../Arquivos/AnexosVideos") });


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
      const videos = await ServicoVideos.buscarVideos();
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
      const caminhoAnexo = path.join(
        __dirname,
        "../Arquivos/AnexosVideos",
        `anexo-video-${id}.*`
      );
      const arquivosExcluidos = fs.readdirSync(path.dirname(caminhoAnexo)).filter(file => file.match(path.basename(caminhoAnexo)));
      arquivosExcluidos.forEach(file => fs.unlinkSync(path.join(path.dirname(caminhoAnexo), file)));
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
      const video = await ServicoVideos.buscarVideoPorTitulo(titulo);
      res.json(video);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// findByName

  static async buscarVideoPorValor(req, res) {
    try {
      const valor = req.params.valor;
      const video = await ServicoVideos.buscarVideoPorValor(valor);
      res.json(video);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// findByValue

  static async uploadAnexo(req, res) {
    try {
      const id = req.params.id;
      const video = await ServicoVideos.buscarVideoPorId(id);
      if (!video) {
        res.status(404).json({ error: "Video não encontrado" });
        return;
      }
  
      const anexo = req.file;
      if (!anexo) {
        res.status(400).json({ error: "Nenhum arquivo enviado" });
        return;
      }
  
      const extensao = path.extname(anexo.originalname);
      const extensoesPermitidas = [".mp4", ".mov"];
      if (!extensoesPermitidas.includes(extensao)) {
        res.status(400).json({ error: "Arquivo inválido. Somente arquivos PNG, JPG, JPEG, MP4 e MOV são aceitos." });
        return;
      }
  
      const novoNomeAnexo = `anexo-video-${id}${extensao}`;
      const novoCaminhoAnexo = path.join(
        __dirname,
        "../Arquivos/AnexosVideos",
        novoNomeAnexo
      );
  
      // Excluir arquivo existente com o mesmo nome, mas com extensão diferente
      const arquivosExistentes = fs.readdirSync(path.dirname(novoCaminhoAnexo)).filter(file => file.startsWith(`anexo-video-${id}`));
      arquivosExistentes.forEach(file => fs.unlinkSync(path.join(path.dirname(novoCaminhoAnexo), file)));
  
      fs.renameSync(anexo.path, novoCaminhoAnexo);
  
      res.json({ sucesso: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// uploadAttachment

  static async downloadAnexo(req, res) {
    try {
      const id = req.params.id;
      const video = await ServicoVideos.buscarVideoPorId(id);
      if (!video) {
        res.status(404).json({ error: "Video não encontrada" });
        return;
      }
  
      const caminhoAnexo = path.join(
        __dirname,
        "../Arquivos/AnexosVideos",
        `anexo-video-${id}.*`
      );
      
      const anexo = fs.readdirSync(path.dirname(caminhoAnexo)).find(file => file.match(path.basename(caminhoAnexo)));
      if (!anexo) {
        res.status(404).json({ error: "Anexo não encontrado" });
        return;
      }
  
      const extensao = path.extname(anexo);
      res.download(path.join(path.dirname(caminhoAnexo), anexo), `anexo-video-${id}${extensao}`);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// downloadAttachment
  
}; // class