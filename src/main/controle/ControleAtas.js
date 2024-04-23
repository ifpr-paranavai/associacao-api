"use strict";

const ServicoAtas = require("../servico/ServicoAtas");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const upload = multer({ dest: path.join(__dirname, "../Arquivos/AnexosAtas") });

module.exports = class ControleAtas {
  static async criarAta(req, res) {
    try {
      const ata = req.body;
      const novoAta = await ServicoAtas.criarAta(ata);
      res.status(201).json(novoAta);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async buscarAtas(req, res) {
    try {
      const limite = parseInt(req.query.limite) || 10;
      const pagina = parseInt(req.query.pagina) || 1;

      const atas = await ServicoAtas.buscarAtas(limite, pagina);
      res.json(atas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async atualizarAta(req, res) {
    try {
      const id = req.params.id;
      const ataAtualizado = req.body;
      const atas = await ServicoAtas.atualizarAta(id, ataAtualizado);
      res.json(atas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async excluirAta(req, res) {
    try {
      const id = req.params.id;
      const ataExcluido = await ServicoAtas.excluirAta(id);
      const caminhoAnexo = path.join(
        __dirname,
        "../Arquivos/AnexosAtas",
        `anexo-ata-${id}.pdf`
      );
      fs.unlinkSync(caminhoAnexo); // adiciona esta linha para apagar o arquivo anexo
      res.json({ sucesso: ataExcluido });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async buscarAtaPorId(req, res) {
    try {
      const id = req.params.id;
      const ata = await ServicoAtas.buscarAtaPorId(id);
      res.json(ata);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erro ao buscar ata por ID: " + error.message });
    }
  }

  static async buscarAtaPorTitulo(req, res) {
    try {
      const titulo = req.params.titulo;

      const limite = parseInt(req.query.limite) || 10;
      const pagina = parseInt(req.query.pagina) || 1;

      const ata = await ServicoAtas.buscarAtaPorTitulo(titulo, limite, pagina);
      res.json(ata);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async uploadAnexo(req, res) {
    try {
      const id = req.params.id;
      const classificado = await ServicoClassificados.buscarClassificadoPorId(id);
      if (!classificado) {
        res.status(404).json({ error: "Classificado não encontrado" });
        return;
      }
  
      const files = req.files.anexo;
      if (!files) {
        res.status(400).json({ error: "Nenhum arquivo enviado" });
        return;
      }
  
      // Loop through the files and upload them
      files.forEach((file) => {
        const extensao = path.extname(file.originalname);
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
  
        fs.renameSync(file.path, novoCaminhoAnexo);
      });
  
      res.json({ sucesso: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

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
  
      const files = fs.readdirSync(path.dirname(caminhoAnexo)).filter(file => file.match(path.basename(caminhoAnexo)));
  
      if (!files) {
        res.status(404).json({ error: "Anexo não encontrado" });
        return;
      }
  
      // Create a zip file containing all the uploaded files
      const zip = new JSZip();
      files.forEach((file) => {
        const filePath = path.join(path.dirname(caminhoAnexo), file);
        const fileBuffer = fs.readFileSync(filePath);
        zip.file(file, fileBuffer);
      });
  
      const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });
      res.set('Content-Disposition', `attachment; filename="anexos-classificado-${id}.zip"`);
      res.set('Content-Type', 'application/zip');
      res.send(zipBuffer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
