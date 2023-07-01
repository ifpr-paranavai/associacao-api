"use strict";

const ServicoNoticias = require("../servico/ServicoNoticias");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const upload = multer({ dest: path.join(__dirname, "../Arquivos/AnexosNoticias") });


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
      const caminhoAnexo = path.join(
        __dirname,
        "../Arquivos/AnexosNoticias",
        `anexo-noticia-${id}.*`
      );
      const arquivosExcluidos = fs.readdirSync(path.dirname(caminhoAnexo)).filter(file => file.match(path.basename(caminhoAnexo)));
      arquivosExcluidos.forEach(file => fs.unlinkSync(path.join(path.dirname(caminhoAnexo), file)));
      res.json({ sucesso: noticiaExcluido });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// delete

  static async uploadAnexo(req, res) {
    try {
      const id = req.params.id;
      const noticia = await ServicoNoticias.buscarNoticiaPorId(id);
      if (!noticia) {
        res.status(404).json({ error: "Noticia não encontrado" });
        return;
      }
  
      const anexo = req.file;
      if (!anexo) {
        res.status(400).json({ error: "Nenhum arquivo enviado" });
        return;
      }
  
      const extensao = path.extname(anexo.originalname);
      const extensoesPermitidas = [".png", ".jpg", ".jpeg"];
      if (!extensoesPermitidas.includes(extensao)) {
        res.status(400).json({ error: "Arquivo inválido. Somente arquivos PNG, JPG, JPEG, MP4 e MOV são aceitos." });
        return;
      }
  
      const novoNomeAnexo = `anexo-noticia-${id}${extensao}`;
      const novoCaminhoAnexo = path.join(
        __dirname,
        "../Arquivos/AnexosNoticias",
        novoNomeAnexo
      );
  
      // Excluir arquivo existente com o mesmo nome, mas com extensão diferente
      const arquivosExistentes = fs.readdirSync(path.dirname(novoCaminhoAnexo)).filter(file => file.startsWith(`anexo-noticia-${id}`));
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
      const noticia = await ServicoNoticias.buscarNoticiaPorId(id);
      if (!noticia) {
        res.status(404).json({ error: "Noticia não encontrada" });
        return;
      }
  
      const caminhoAnexo = path.join(
        __dirname,
        "../Arquivos/AnexosNoticias",
        `anexo-noticia-${id}.*`
      );
      
      const anexo = fs.readdirSync(path.dirname(caminhoAnexo)).find(file => file.match(path.basename(caminhoAnexo)));
      if (!anexo) {
        res.status(404).json({ error: "Anexo não encontrado" });
        return;
      }
  
      const extensao = path.extname(anexo);
      res.download(path.join(path.dirname(caminhoAnexo), anexo), `anexo-noticia-${id}${extensao}`);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// downloadAttachment

}; // class