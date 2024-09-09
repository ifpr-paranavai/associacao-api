"use strict";

const ServicoClassificados = require("../servico/ServicoClassificados");
const fs = require('fs');
const path = require('path');
const JSZip = require('jszip')

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
      const limite = parseInt(req.query.limite) || 10;
      const pagina = parseInt(req.query.pagina) || 1;

      const classificados = await ServicoClassificados.buscarClassificados(limite, pagina);
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
      const classificado = await ServicoClassificados.buscarClassificadoPorId(id);
      if (!classificado) {
        res.status(404).json({ error: "Classificado não encontrado" });
        return;
      }

      const anexos = req.files;
  
      if (!anexos || anexos.length === 0) {
        res.status(400).json({ error: "Nenhum arquivo enviado" });
        return;
      }

      const extensoesPermitidas = [".png", ".jpg", ".jpeg", ".mp4", ".mov"];
      const erros = [];
      let varControleArquivos = 0;
  
      for (const anexo of anexos) {
        const extensao = path.extname(anexo.originalname);
  
        if (!extensoesPermitidas.includes(extensao)) {
          erros.push({ filename: anexo.originalname, error: "Arquivo inválido. Somente arquivos PNG, JPG, JPEG, MP4 e MOV são aceitos." });
          continue;
        }
  
        const novoNomeAnexo = `anexo-classificado-${id}-${varControleArquivos}${extensao}`;
        const novoCaminhoAnexo = path.join(
          __dirname,
          "../Arquivos/AnexosClassificados/",
          novoNomeAnexo
        );
  
        const arquivosExistentes = fs.readdirSync(path.dirname(novoCaminhoAnexo)).filter(file => file.startsWith(`anexo-classificado-${id}-${varControleArquivos}`));
        arquivosExistentes.forEach(file => fs.unlinkSync(path.join(path.dirname(novoCaminhoAnexo), file)));
  
        fs.renameSync(anexo.path, novoCaminhoAnexo);
        varControleArquivos++;
      }
  
      if (erros.length > 0) {
        res.status(400).json({ erros });
      } else {
        res.json({ sucesso: true });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async downloadAnexo(req, res) {
    try {
      const id = req.params.id;
      const classificado = await ServicoClassificados.buscarClassificadoPorId(id);
  
      if (!classificado) {
        return res.status(404).json({ error: "Classificado não encontrado" });
      }
  
      const caminhoDoDiretorioDasImagens = path.join(__dirname, "../Arquivos/AnexosClassificados");
      const imagensDoDiretorio = fs.readdirSync(caminhoDoDiretorioDasImagens);
  
      if (imagensDoDiretorio.length === 0) {
        return res.status(404).json({ error: "Não há arquivos para baixar" });
      }
  
      const zip = new JSZip();
  
      imagensDoDiretorio.forEach((imagem) => {
        const caminhoDaImagem = path.join(caminhoDoDiretorioDasImagens, imagem);
        const conteudoArquivoImagem = fs.readFileSync(caminhoDaImagem);
        zip.file(imagem, conteudoArquivoImagem);
      });
  
      const conteudoJaZipado = await zip.generateAsync({ type: "nodebuffer" });
      const nomePastaZipada = `anexos-classificados.zip`;
  
      res.setHeader("Content-Disposition", `attachment; filename=${nomePastaZipada}`);
      res.setHeader("Content-Type", "application/zip");
      
      res.send(conteudoJaZipado);
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } // downloadAttachment
}; // class