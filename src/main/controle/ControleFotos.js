"use strict";

const ServicoFotos = require("../servico/ServicoFotos");

module.exports = class ControleFotos {

  static async criarFoto(req, res) {
    try {
      const foto = req.body;
      console.log(req.body)
      const novoFoto = await ServicoFotos.criarFoto(foto);
      res.status(201).json(novoFoto);
    } catch (error) {
      res.status(500).json({ error: error.message });

    }
  }//create

  static async buscarFotos(req, res) {
    try {
      const limite = parseInt(req.query.limite) || 10;
      const pagina = parseInt(req.query.pagina) || 1;

      const fotos = await ServicoFotos.buscarFotos(limite, pagina);
      res.json(fotos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// findAll

  static async atualizarFoto(req, res) {
    try {
      const id = req.params.id;
      const fotoAtualizado = req.body;
      const fotos = await ServicoFotos.atualizarFoto(id, fotoAtualizado);
      res.json(fotos);
    } catch (error) {
      res.status(500).json({error: error.message})
    }
  }// update
  
  static async excluirFoto(req, res) {
    try {
      const id = req.params.id;
      const fotoExcluido = await ServicoFotos.excluirFoto(id);
      res.json({ sucesso: fotoExcluido });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// delete

  static async buscarFotoPorId(req, res) {
    try {
      const id = req.params.id;
      const foto = await ServicoFotos.buscarFotoPorId(id);
      res.json(foto);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar foto por ID: " + error.message });
    }
  }// findByID

  static async buscarFotoPorTitulo(req, res) {
    try {
      const titulo = req.params.titulo;

      const limite = parseInt(req.query.limite) || 10;
      const pagina = parseInt(req.query.pagina) || 1;

      const foto = await ServicoFotos.buscarFotoPorTitulo(titulo, limite, pagina);
      res.json(foto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// findByName
  
}; // class