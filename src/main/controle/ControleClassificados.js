"use strict";

const ServicoClassificados = require("../servico/ServicoClassificados");


module.exports = class ControleClassificados {

  static async criarClassificado(req, res) {
    try {
      const classificado = req.body;
      console.log(req.body)
      const novoClassificado = await ServicoClassificados.criarClassificado(classificado);
      res.status(201).json(novoClassificado);
    } catch (error) {
      res.status(500).json({ error: error.message });

    }
  }//create

  static async buscarClassificados(req, res) {
    try {
      const classificados = await ServicoClassificados.buscarClassificados();
      res.json(classificados);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// findAll

  static async atualizarClassificado(req, res) {
    try {
      const id = req.params.id;
      const classificadoAtualizado = req.body;
      const classificados = await ServicoClassificados.atualizarClassificado(id, classificadoAtualizado);
      res.json(classificados);
    } catch (error) {
      res.status(500).json({error: error.message})
    }
  }// update
  
  static async excluirClassificado(req, res) {
    try {
      const id = req.params.id;
      const classificadoExcluido = await ServicoClassificados.excluirClassificado(id);
      res.json({ sucesso: classificadoExcluido });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// delete

  static async buscarClassificadoPorId(req, res) {
    try {
      const id = req.params.id;
      const classificado = await ServicoClassificados.buscarClassificadoPorId(id);
      res.json(classificado);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar classificado por ID: " + error.message });
    }
  }// findByID

  static async buscarClassificadoPorTitulo(req, res) {
    try {
      const titulo = req.params.titulo;
      const classificado = await ServicoClassificados.buscarClassificadoPorTitulo(titulo);
      res.json(classificado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// findByName

  static async buscarClassificadoPorValor(req, res) {
    try {
      const valor = req.params.valor;
      const classificado = await ServicoClassificados.buscarClassificadoPorValor(valor);
      res.json(classificado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// findByValue
}; // class