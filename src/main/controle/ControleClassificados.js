"use strict";

const ServicoClassificados = require("../servico/ServicoClassificados");
const JSZip = require('jszip')
const fs = require('fs').promises;
const path = require('path');
const Fotos = require('../modelos/Fotos')
const Classificado = require('../modelos/Classificados')


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

  static async buscarClassificadosCliente(req, res) {
    try {
      const limite = parseInt(req.query.limite) || 10;
      const pagina = parseInt(req.query.pagina) || 1;

      const classificados = await ServicoClassificados.buscarClassificadosCliente(limite, pagina);
      res.json(classificados);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } // findAll

  static async buscarClassificadosAdmin(req, res) {
    try {
      const limite = parseInt(req.query.limite) || 10;
      const pagina = parseInt(req.query.pagina) || 1;

      const classificados = await ServicoClassificados.buscarClassificadosAdmin(limite, pagina);
      res.json(classificados);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } // findAll

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
      await ServicoClassificados.excluirClassificado(id);
      return res.status(200).send();
    } catch (error) {
      res.status(500).json({ error: "Falha ao excluir classificado: " + error.message});
    }
  } // delete

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

      const limite = parseInt(req.query.limite) || 10;
      const pagina = parseInt(req.query.pagina) || 1;

      const classificado = await ServicoClassificados.buscarClassificadoPorTitulo(titulo, limite, pagina);
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

  static async uploadAnexo(req, res) {
    try {
      const id = req.params.id;
      const anexos = req.files;

      if (!anexos || anexos.length === 0) {
        return res.status(400).json({ error: "Nenhum arquivo enviado" });
      }

      const resultado = await ServicoClassificados.uploadAnexo(id, anexos);
      res.json(resultado);
    } catch (error) {
      if (error.message.startsWith('[')) {
        res.status(400).json({ erros: JSON.parse(error.message) });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  } // uploadAnexo

  static async downloadAnexo(req, res) {
    try {
      const id = req.params.id;
      const resultado = await ServicoClassificados.downloadAnexo(id);

      res.setHeader("Content-Disposition", `attachment; filename=${resultado.nome}`);
      res.setHeader("Content-Type", "application/zip");
      res.send(resultado.conteudo);
    } catch (error) {
      if (error.message === "Classificado não encontrado" || error.message === "Não há arquivos para baixar") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  } // downloadAnexo

  static async visualizarAnexo(req, res) {
    try {
      const id = req.params.id;
      const resultado = await ServicoClassificados.visualizarAnexo(id);
      res.status(200).json(resultado);
    } catch (error) {
      if (error.message === "Classificado não encontrado" || error.message === "Não há arquivos para visualizar") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Erro interno do servidor ao visualizar anexos" });
      }
    }
  } // visualizarAnexo
}; // class
