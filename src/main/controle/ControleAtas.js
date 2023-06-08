"use strict";

const ServicoAtas = require("../servico/ServicoAtas");


module.exports = class ControleAtas {

  static async criarAta(req, res) {
    try {
      const ata = req.body;
      console.log(req.body)
      const novoAta = await ServicoAtas.criarAta(ata);
      res.status(201).json(novoAta);
    } catch (error) {
      res.status(500).json({ error: error.message });

    }
  }//create

  static async buscarAtas(req, res) {
    try {
      const atas = await ServicoAtas.buscarAtas();
      res.json(atas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// findAll

  static async atualizarAta(req, res) {
    try {
      const id = req.params.id;
      const ataAtualizado = req.body;
      const atas = await ServicoAtas.atualizarAta(id, ataAtualizado);
      res.json(atas);
    } catch (error) {
      res.status(500).json({error: error.message})
    }
  }// update
  
  static async excluirAta(req, res) {
    try {
      const id = req.params.id;
      const ataExcluido = await ServicoAtas.excluirAta(id);
      res.json({ sucesso: ataExcluido });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// delete

  static async buscarAtaPorId(req, res) {
    try {
      const id = req.params.id;
      const ata = await ServicoAtas.buscarAtaPorId(id);
      res.json(ata);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar ata por ID: " + error.message });
    }
  }// findByID

  static async buscarAtaPorTitulo(req, res) {
    try {
      const titulo = req.params.titulo;
      const ata = await ServicoAtas.buscarAtaPorTitulo(titulo);
      res.json(ata);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// findByName

  static async buscarAtaPorValor(req, res) {
    try {
      const valor = req.params.valor;
      const ata = await ServicoAtas.buscarAtaPorValor(valor);
      res.json(ata);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// findByValue
}; // class