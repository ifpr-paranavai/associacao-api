"use strict";

const ServicoClassificados = require("../servico/ServicoClassificados");


module.exports = class ControleClassificados {

  static async criarClassificado(req, res) {
    try {
      const classificado = req.body;
      const novoClassificado = await ServicoClassificados.salvar(classificado);
      res.status(201).json(novoClassificado);
    } catch (error) {
      res.status(500).json({ error: error.message });

    }
  }

  static async buscarClassificados(req, res) {
    try {
      const classificados = await ServicoClassificados.buscarClassificados();
      res.json(classificados);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// findAll()

}; // class