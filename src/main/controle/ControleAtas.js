"use strict";

const ServicoAtas = require("../servico/ServicoAtas");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const upload = multer({ dest: path.join(__dirname, "../Arquivos/AnexosAtas") });

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
      const atas = await ServicoAtas.buscarAtas();
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
      const ata = await ServicoAtas.buscarAtaPorTitulo(titulo);
      res.json(ata);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async uploadAnexo(req, res) {
    try {
      const id = req.params.id;
      const ata = await ServicoAtas.buscarAtaPorId(id);
      if (!ata) {
        res.status(404).json({ error: "Ata não encontrada" });
        return;
      }

      const anexo = req.file;
      if (!anexo) {
        res.status(400).json({ error: "Nenhum arquivo enviado" });
        return;
      }

      const novoNomeAnexo = `anexo-ata-${id}${path.extname(
        anexo.originalname
      )}`;
      const novoCaminhoAnexo = path.join(
        __dirname,
        "../Arquivos/AnexosAtas",
        novoNomeAnexo
      );
      fs.renameSync(anexo.path, novoCaminhoAnexo);

      res.json({ sucesso: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
