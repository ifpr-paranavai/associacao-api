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

  static async uploadAnexo(req, res) {
    try {
      const id = req.params.id;
      const evento = await ServicoEventos.buscarEventoPorId(id);
      if (!evento) {
        res.status(404).json({ error: "Evento não encontrado" });
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
        res.status(400).json({ error: "Arquivo inválido. Somente arquivos PNG, JPG, JPEG são aceitos." });
        return;
      }

      const novoNomeAnexo = `anexo-evento-${id}${extensao}`;
      const novoCaminhoAnexo = path.join(
        __dirname,
        "../Arquivos/AnexosEventos",
        novoNomeAnexo
      );

      // Excluir arquivo existente com o mesmo nome, mas com extensão diferente
      const arquivosExistentes = fs.readdirSync(path.dirname(novoCaminhoAnexo)).filter(file => file.startsWith(`anexo-evento-${id}`));
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
      const evento = await ServicoEventos.buscarEventoPorId(id);
      if (!evento) {
        res.status(404).json({ error: "Evento não encontrado" });
        return;
      }

      const caminhoAnexo = path.join(
        __dirname,
        "../Arquivos/AnexosEventos",
        `anexo-evento-${id}.*`
      );

      const anexo = fs.readdirSync(path.dirname(caminhoAnexo)).find(file => file.match(path.basename(caminhoAnexo)));
      if (!anexo) {
        res.status(404).json({ error: "Anexo não encontrado" });
        return;
      }

      const extensao = path.extname(anexo);
      res.download(path.join(path.dirname(caminhoAnexo), anexo), `anexo-evento-${id}${extensao}`);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// downloadAttachment

}; // class
