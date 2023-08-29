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

  static async listarTodos(req, res) {
    try {
        const associado = await ServicoAssociados.listarTodos();
        res.json(associado);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  }

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

  //criar associado será feito pela diretoria
  static async criarAssociado(req, res) {
    try {
      res.status(200).send(await ServicoAssociados.criarAssociado(req.body));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("ControleAssociados.criarAssociado" + e.message);
    }
  } // criarAssociado()

  static async buscarPorId(req, res) {
    try {
      res.status(200).send(await ServicoAssociados.buscarPorId(req.params));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("ControleAssociados.buscarPorId " + e.message);
    }
  } // buscarPorId()

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

  static async atualizar(req, res) {
    try {
      res
        .status(200)
        .send(await ServicoAssociados.atualizarAssociado(req.body));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("ControleAssociados.atualizar " + e.message);
    }
  } // atualizar()

  static async excluir(req, res) {
    try {
      res
        .status(200)
        .send(await ServicoAssociados.excluirAssociado(req.params));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("ControleAssociados.excluir " + e.message);
    }
  } // excluir()

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
