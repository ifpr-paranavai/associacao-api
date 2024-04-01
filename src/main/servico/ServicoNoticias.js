"use strict";

const Noticias = require("../modelos/Noticias");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");

module.exports = class ServicoNoticias {
  static async criarNoticia(noticia) {
    try {
      return await Noticias.create(noticia);
    } catch (error) {
      throw new Error("Falha ao criar noticia: " + error);
    }
  }

  static async buscarNoticias(limite = 10, pagina = 1) {
    try {
      const offset = (pagina - 1) * limite;
      return await Noticias.findAndCountAll({
        limit: limite,
        offset: offset,
        order: [["createdAt", "DESC"]],
      });
    } catch (error) {
      throw new Error("Falha ao buscar noticias: " + error);
    }
  }

  static async buscarNoticiaPorId(id) {
    try {
      const noticia = await Noticias.findByPk(id);
      if (!noticia) {
        throw new Error("Noticia não encontrado");
      }
      return noticia;
    } catch (error) {
      throw new Error("Falha ao buscar noticia: " + error.message);
    }
  }

  static async buscarNoticiaPorTitulo(titulo, limite = 10, pagina = 1) {
    try {
      const offset = (pagina - 1) * limite;
      const { rows, count } = await Noticias.findAndCountAll({
        where: {
          titulo: {
            [Op.like]: `%${titulo}%`,
          },
        },
        limit: limite,
        offset: offset,
        order: [["createdAt", "DESC"]],
      });

      if (!rows || rows.length === 0) {
        throw new Error("Nenhuma noticia encontrada no serviço");
      }

      return { rows, count };
    } catch (error) {
      throw new Error("Falha ao buscar noticias: " + error.message);
    }
  }

  static async buscarNoticiaPorData(dataInicio, limite = 10, pagina = 1) {
    try {
      const offset = (pagina - 1) * limite;
      const { rows, count } = await Noticias.findAndCountAll({
        where: {
          data_inicio: {
            [Op.gte]: dataInicio,
          },
        },
        limit: limite,
        offset: offset,
        order: [['createdAt', 'DESC']],
      });
  
      if (!rows || rows.length === 0) {
        throw new Error("Nenhum evento encontrado por data no serviço");
      }
  
      return { rows, count };
    } catch (error) {
      throw new Error("Falha ao buscar eventos por data: " + error.message);
    }
  }

  static async atualizarNoticia(id, dadosAtualizados) {
    try {
      const noticia = await Noticias.findByPk(id);
      if (!noticia) {
        throw new Error("Noticia não encontrado");
      }
      const noticiaAtualizado = await noticia.update(dadosAtualizados);
      return noticiaAtualizado;
    } catch (error) {
      throw new Error("Falha ao atualizar noticia: " + error.message);
    }
  }

  static async excluirNoticia(id) {
    try {
      const noticia = await Noticias.findByPk(id);
      if (!noticia) {
        throw new Error("Noticia não encontrado");
      }
      await noticia.destroy();
      return true;
    } catch (error) {
      throw new Error("Falha ao excluir noticia: " + error.message);
    }
  }

  static async uploadAnexo(id, file){
    try{
      const noticia = await Noticias.findByPk(id);

      if(!noticia){
        throw new Error("Noticia não encontrada");
      }

      if(!file){
        throw new Error("Nenhum arquivo enviado");
      }

      const extensao = path.extname(anexo.originalname);
      const extensoesPermitidas = [".png", ".jpg", ".jpeg"];

      if(!extensoesPermitidas.includes(extensao)){
        throw new Error("Extensão de arquivo não permitida");
      }

      const novoNomeArquivo = `anexo-noticia-${id}${extensao}`;
      const novoCaminhoAnexo = path.join(
        __dirname,
        "../Arquivos/AnexosNoticias",
        novoNomeArquivo
      );

      const arquivosExistentes = fs.readdirSync(path.dirname(novoCaminhoAnexo).filter(file => file.startsWith(`anexo-noticia-${id}`)));
      arquivosExistentes.forEach(file => fs.unlinkSync(path.join(path.dirname(novoCaminhoAnexo), file)));
      
      fs.renameSync(file.path, novoCaminhoAnexo);
    
    } catch (error){
      throw new Error("Falha ao fazer upload do anexo: " + error.message);
    }
  }

  static async downloadAnexo(id){
    try{

      const noticia = await ServicoNoticias.buscarNoticiaPorId(id);
      if(!noticia){
        throw new Error("Noticia não encontrada");
      }

      const caminhoAnexo = path.join(
        __dirname,
        "../Arquivos/AnexosNoticias",
        `anexo-noticia-${id}.*`
      );

      const anexo = fs.readdirSync(path.dirname(caminhoAnexo)).find(file => file.match(path.basename(caminhoAnexo)));

      if(!anexo){
        throw new Error("Anexo não encontrado");
      }

      const extensao = path.extname(anexo);
    
    } catch (error){
      throw new Error("Falha ao fazer download do anexo")
    }
  }

}; // class
