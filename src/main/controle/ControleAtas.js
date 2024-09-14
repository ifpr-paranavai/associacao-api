"use strict";

const ServicoAtas = require("../servico/ServicoAtas");

module.exports = class ControleAtas {
  static async criarAta(req, res) {
    try {
      const ata = req.body;
      const novoAta = await ServicoAtas.criarAta(ata);
      res.status(201).json(novoAta);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async buscarAtas(req, res) {
    try {
      const limite = parseInt(req.query.limite) || 10;
      const pagina = parseInt(req.query.pagina) || 1;

      const atas = await ServicoAtas.buscarAtas(limite, pagina);
      res.json(atas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async atualizarAta(req, res) {
    try {
      const id = req.params.id;
      const ataAtualizado = req.body;
      const atas = await ServicoAtas.atualizarAta(id, ataAtualizado);
      res.json(atas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async excluirAta(req, res) {
    try {
      const id = req.params.id;
      const ataExcluido = await ServicoAtas.excluirAta(id);
      res.json({ sucesso: ataExcluido });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async buscarAtaPorId(req, res) {
    try {
      const id = req.params.id;
      const ata = await ServicoAtas.buscarAtaPorId(id);
      res.json(ata);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erro ao buscar ata por ID: " + error.message });
    }
  }

  static async buscarAtaPorTitulo(req, res) {
    try {
      const titulo = req.params.titulo;

      const limite = parseInt(req.query.limite) || 10;
      const pagina = parseInt(req.query.pagina) || 1;

      const ata = await ServicoAtas.buscarAtaPorTitulo(titulo, limite, pagina);
      res.json(ata);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async uploadAnexo(req, res) {
    try {
      const id = req.params.id;
      const anexo = req.file;
      await ServicoAtas.uploadAnexo(id, anexo);
      res.json({ sucesso: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async downloadAnexo(req, res) {
    try {
      const id = req.params.id;
      const caminhoAnexo = await ServicoAtas.downloadAnexo(id);
      res.download(caminhoAnexo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
