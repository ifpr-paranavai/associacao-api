"use strict";

const ServicoClassificados = require("../servico/ServicoClassificados");


module.exports = class ControleClassificados {

  static async criarClassificado(req, res) {
    try {
      const classificado = req.body;
      console.log(req.body)
      const novoClassificado = await ServicoClassificados.salvar(classificado);
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

}; // class