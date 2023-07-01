"use strict";

const ServicoFotos = require("../servico/ServicoFotos");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const upload = multer({ dest: path.join(__dirname, "../Arquivos/AnexosFotos") });


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
      const fotos = await ServicoFotos.buscarFotos();
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
      const caminhoAnexo = path.join(
        __dirname,
        "../Arquivos/AnexosFotos",
        `anexo-foto-${id}.*`
      );
      const arquivosExcluidos = fs.readdirSync(path.dirname(caminhoAnexo)).filter(file => file.match(path.basename(caminhoAnexo)));
      arquivosExcluidos.forEach(file => fs.unlinkSync(path.join(path.dirname(caminhoAnexo), file)));
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
      const foto = await ServicoFotos.buscarFotoPorTitulo(titulo);
      res.json(foto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// findByName

  static async buscarFotoPorValor(req, res) {
    try {
      const valor = req.params.valor;
      const foto = await ServicoFotos.buscarFotoPorValor(valor);
      res.json(foto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// findByValue

  static async uploadAnexo(req, res) {
    try {
      const id = req.params.id;
      const foto = await ServicoFotos.buscarFotoPorId(id);
      if (!foto) {
        res.status(404).json({ error: "Foto não encontrado" });
        return;
      }
  
      const anexo = req.file;
      if (!anexo) {
        res.status(400).json({ error: "Nenhum arquivo enviado" });
        return;
      }
  
      const extensao = path.extname(anexo.originalname);
      const extensoesPermitidas = [".png", ".jpg", ".jpeg"];
      if (!extensoesPermitidas.includes(extensao)) {
        res.status(400).json({ error: "Arquivo inválido. Somente arquivos PNG, JPG, JPEG, MP4 e MOV são aceitos." });
        return;
      }
  
      const novoNomeAnexo = `anexo-foto-${id}${extensao}`;
      const novoCaminhoAnexo = path.join(
        __dirname,
        "../Arquivos/AnexosFotos",
        novoNomeAnexo
      );
  
      // Excluir arquivo existente com o mesmo nome, mas com extensão diferente
      const arquivosExistentes = fs.readdirSync(path.dirname(novoCaminhoAnexo)).filter(file => file.startsWith(`anexo-foto-${id}`));
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
      const foto = await ServicoFotos.buscarFotoPorId(id);
      if (!foto) {
        res.status(404).json({ error: "Foto não encontrada" });
        return;
      }
  
      const caminhoAnexo = path.join(
        __dirname,
        "../Arquivos/AnexosFotos",
        `anexo-foto-${id}.*`
      );
      
      const anexo = fs.readdirSync(path.dirname(caminhoAnexo)).find(file => file.match(path.basename(caminhoAnexo)));
      if (!anexo) {
        res.status(404).json({ error: "Anexo não encontrado" });
        return;
      }
  
      const extensao = path.extname(anexo);
      res.download(path.join(path.dirname(caminhoAnexo), anexo), `anexo-foto-${id}${extensao}`);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }// downloadAttachment
  
}; // class