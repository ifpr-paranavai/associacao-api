"use strict";
const multer = require("multer");
const path = require("path");

const upload = multer({ dest: path.join(__dirname, "../Arquivos/ImagensAssociados") });

const ServicoAssociados = require("../servico/ServicoAssociados");

module.exports = class ControleAssociados {
  static async login(req, res) {
    try {
      res.status(200).send(await ServicoAssociados.login(req.body));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("ControleAssociados.login " + e.message);
    }
  } // login()

  static async buscarPendentes(req, res) {
    try {
      res.status(200).send(await ServicoAssociados.buscarPendentes());
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("ControleAssociados.buscarPendentes " + e.message);
    }
  }

  static async buscarAtivos(req, res) {
    try {
      res.status(200).send(await ServicoAssociados.buscarAtivos());
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("ControleAssociados.buscarAtivos " + e.message);
    }
  }

  static async buscarPorCpf(req, res) {
    try {
      const cpf = req.params.cpf;
      const associado = await ServicoAssociados.buscarPorCpf(cpf);

      if (!associado) {
        res.status(404).json({ error: "Associado não encontrado" });
        return;
      }

      res.status(200).json(associado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } // buscarPorCPF()

  //criar associado será feito pela diretoria
  static async criarAssociado(req, res) {
    try {
      res.status(200).send(await ServicoAssociados.criarAssociado(req.body));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("ControleAssociados.criarAssociado" + e.message);
    }
  } // criarAssociado()

  static async buscarAssociados(req, res) {
    try {
      const associados = await ServicoAssociados.buscarAssociados();
      res.json(associados);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// buscarAssociados()

  static async buscarAssociadoPorNome(req, res) {
    try {
      const nome = req.params.nome;

      const limite = parseInt(req.query.limite) || 10;
      const pagina = parseInt(req.query.pagina) || 1;

      const associado = await ServicoAssociados.buscarAssociadoPorNome(nome, limite, pagina);
      res.json(associado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async buscarTodos(req, res) {
    try {
      const associados = await ServicoAssociados.buscarTodos();
      res.json(associados);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// buscarAssociados()

  static async buscarAssociados(req, res) {
    try {
      const limite = parseInt(req.query.limite) || 10;
      const pagina = parseInt(req.query.pagina) || 1;

      const associados = await ServicoAssociados.buscarAssociados(limite, pagina);
      res.json(associados);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async buscarPorId(req, res) {
    try {
      const id = req.params.id;
      const associado = await ServicoAssociados.buscarPorId(id);
      res.json(associado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// buscarPorId

  static async atualizarAssociado(req, res) {
    try {
      const id = req.params.id;
      const associadoAtualizado = req.body;
      const associado = await ServicoAssociados.atualizarAssociado(id, associadoAtualizado);
      res.json(associado);
    } catch (error) {
      res.status(500).json({error: error.message})
    }
  }// update

  static async excluirAssociado(req, res) {
    try {
      const id = req.params.id;
      const associadoExcluido = await ServicoAssociados.excluirAssociado(id);
      res.json({ sucesso: associadoExcluido });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// delete

  static async uploadImagem(req, res){
    try {
      const id = req.params.id;
      const imagem = req.file;
      await ServicoAssociados.uploadImagem(id, imagem);
      res.json({ sucesso:true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async downloadImagem(req, res) {
    try {
      const id = req.params.id;
      const imagem = await ServicoAssociados.downloadImagem(id);
      res.download(imagem.caminho, imagem.nome);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

  }



}; // class
