"use strict";

const ServicoClassificados = require("../servico/ServicoClassificados");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const upload = multer({ dest: path.join(__dirname, "../Arquivos/AnexosClassificados") });


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
      const caminhoAnexo = path.join(
        __dirname,
        "../Arquivos/AnexosClassificados",
        `anexo-classificado-${id}.*`
      );
      const arquivosExcluidos = fs.readdirSync(path.dirname(caminhoAnexo)).filter(file => file.match(path.basename(caminhoAnexo)));
      arquivosExcluidos.forEach(file => fs.unlinkSync(path.join(path.dirname(caminhoAnexo), file)));
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

  static async uploadAnexo(req, res) {
    try {
      const id = req.params.id;
      const classificado = await ServicoClassificados.buscarClassificadoPorId(id);
      if (!classificado) {
        res.status(404).json({ error: "Classificado não encontrado" });
        return;
      }
  
      const anexo = req.file;
      if (!anexo) {
        res.status(400).json({ error: "Nenhum arquivo enviado" });
        return;
      }
  
      const extensao = path.extname(anexo.originalname);
      const extensoesPermitidas = [".png", ".jpg", ".jpeg", ".mp4", ".mov"];
      if (!extensoesPermitidas.includes(extensao)) {
        res.status(400).json({ error: "Arquivo inválido. Somente arquivos PNG, JPG, JPEG, MP4 e MOV são aceitos." });
        return;
      }
  
      const novoNomeAnexo = `anexo-classificado-${id}${extensao}`;
      const novoCaminhoAnexo = path.join(
        __dirname,
        "../Arquivos/AnexosClassificados",
        novoNomeAnexo
      );
  
      // Excluir arquivo existente com o mesmo nome, mas com extensão diferente
      const arquivosExistentes = fs.readdirSync(path.dirname(novoCaminhoAnexo)).filter(file => file.startsWith(`anexo-classificado-${id}`));
      arquivosExistentes.forEach(file => fs.unlinkSync(path.join(path.dirname(novoCaminhoAnexo), file)));
  
      fs.renameSync(anexo.path, novoCaminhoAnexo);
  
      res.json({ sucesso: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// uploadAttachment

  static async downloadAnexo(req, res) {
    try {
      const id = req.params.id;
      const classificado = await ServicoClassificados.buscarClassificadoPorId(id);
      if (!classificado) {
        res.status(404).json({ error: "Classificado não encontrada" });
        return;
      }
  
      const caminhoAnexo = path.join(
        __dirname,
        "../Arquivos/AnexosClassificados",
        `anexo-classificado-${id}.*`
      );
      
      const anexo = fs.readdirSync(path.dirname(caminhoAnexo)).find(file => file.match(path.basename(caminhoAnexo)));
      if (!anexo) {
        res.status(404).json({ error: "Anexo não encontrado" });
        return;
      }
  
      const extensao = path.extname(anexo);
      res.download(path.join(path.dirname(caminhoAnexo), anexo), `anexo-classificado-${id}${extensao}`);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// downloadAttachment
  
}; // class