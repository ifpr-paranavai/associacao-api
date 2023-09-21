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

  static async buscarTodos(req, res) {
    try {
      const associados = await ServicoAssociados.buscarTodos();
      res.json(associados);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// buscarAssociados()

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

  static async uploadImagem(req, res) {
    try {
      const id = req.params.id;
      const associado = await ServicoAssociados.buscarPorId(id);
      if (!associado) {
        res.status(404).json({ error: "Associado não encontrado" });
        return;
      }

      const imagem = req.file;
      if (!imagem) {
        res.status(400).json({ error: "Nenhuma imagem enviada" });
        return;
      }

      const extensao = path.extname(imagem.originalname);
      const extensoesPermitidas = [".png", ".jpg", ".jpeg"];
      if (!extensoesPermitidas.includes(extensao)) {
        res.status(400).json({ error: "Imagem inválida. Apenas imagens PNG, JPG, JPEG são aceitas." });
        return;
      }

      const novoNomeImagem = `imagem-associado-${id}${extensao}`;
      const novoCaminhoImagem = path.join(
        __dirname,
        "../Arquivos/ImagensAssociados",
        novoNomeImagem
      );

      // Excluir imagem existente com o mesmo nome, mas com extensão diferente
      const imagensExistentes = fs.readdirSync(path.dirname(novoCaminhoImagem)).filter(file => file.startsWith(`imagem-associado-${id}`));
      imagensExistentes.forEach(file => fs.unlinkSync(path.join(path.dirname(novoCaminhoImagem), file)));

      fs.renameSync(imagem.path, novoCaminhoImagem);

      res.json({ sucesso: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async downloadImagem(req, res) {
    try {
      const id = req.params.id;
      const associado = await ServicoAssociados.buscarPorId(id);
      if (!associado) {
        res.status(404).json({ error: "Associado não encontrado" });
        return;
      }

      const caminhoImagem = path.join(
        __dirname,
        "../Arquivos/ImagensAssociados",
        `imagem-associado-${id}.*`
      );

      const imagem = fs.readdirSync(path.dirname(caminhoImagem)).find(file => file.match(path.basename(caminhoImagem)));
      if (!imagem) {
        res.status(404).json({ error: "Imagem não encontrada" });
        return;
      }

      const extensao = path.extname(imagem);
      res.download(path.join(path.dirname(caminhoImagem), imagem), `imagem-associado-${id}${extensao}`);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}; // class
