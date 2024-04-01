"use strict";

const Eventos = require('../modelos/Eventos');
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");

module.exports = class ServicoEventos {

  static async criarEvento(evento) {
    try {
      return await Eventos.create(evento);
    } catch (error) {
      throw new Error("Falha ao criar evento: " + error);
    }
  }

  static async buscarEventos(limite = 10, pagina = 1) {
    try {
      const offset = (pagina - 1) * limite;
      return await Eventos.findAndCountAll({
        limit: limite,
        offset: offset,
        order: [['createdAt', 'DESC']],
      });
    } catch (error) {
      throw new Error("Falha ao buscar atas: " + error);
    }
  }
  

  static async buscarEventoPorId(id) {
    try {
      const evento = await Eventos.findByPk(id);
      if (!evento) {
        throw new Error('Evento não encontrado');
      }
      return evento;
    } catch (error) {
      throw new Error('Falha ao buscar evento: ' + error.message);
    }
  }

  static async buscarEventoPorTitulo(titulo, limite = 10, pagina = 1) {
    try {
      const offset = (pagina - 1) * limite;
      const { rows, count } = await Eventos.findAndCountAll({
        where: {
          titulo: {
            [Op.like]: `%${titulo}%`,
          },
        },
        limit: limite,
        offset: offset,
        order: [['createdAt', 'DESC']],
      });

      if (!rows || rows.length === 0) {
        throw new Error("Nenhum evento encontrado no serviço");
      }

      return { rows, count };
    } catch (error) {
      throw new Error("Falha ao buscar eventos: " + error.message);
    }
  }

  static async buscarEventoPorData(dataInicio, limite = 10, pagina = 1) {
    try {
      const offset = (pagina - 1) * limite;
      const { rows, count } = await Eventos.findAndCountAll({
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
  

  static async atualizarEvento(id, dadosAtualizados) {
    try {
      const evento = await Eventos.findByPk(id);
      if (!evento) {
        throw new Error('Evento não encontrado');
      }
      const eventoAtualizado = await evento.update(dadosAtualizados);
      return eventoAtualizado;
    } catch (error) {
      throw new Error('Falha ao atualizar evento: ' + error.message);
    }
  }

  static async excluirEvento(id) {
    try {
      const evento = await Eventos.findByPk(id);
      if (!evento) {
        throw new Error('Evento não encontrado');
      }
      await evento.destroy();
      return true;
    } catch (error) {
      throw new Error('Falha ao excluir evento: ' + error.message);
    }
  }
  static async uploadAnexo(id,file) {
    try {
      const evento = await Eventos.findByPk(id);
      if (!evento) {
        throw new Error('Evento não encontrado');
      }
  
      if (!file) {
        throw new Error('Nenhum arquivo enviado');
      }
  
      const extensao = path.extname(file.originalname);
      const extensoesPermitidas = [".png", ".jpg", ".jpeg"];
      if (!extensoesPermitidas.includes(extensao)) {
        throw new Error('Arquivo inválido. Somente arquivos PNG, JPG, JPEG são aceitos.');
      }
  
      const novoNomeAnexo = `anexo-evento-${id}${extensao}`;
      const novoCaminhoAnexo = path.join(
        __dirname,
        "../Arquivos/AnexosEventos",
        novoNomeAnexo
      );
  
        // Excluir arquivo existente com o mesmo nome, mas com extensão diferente
      const arquivosExistentes = fs.readdirSync(path.dirname(novoCaminhoAnexo)).filter(file => file.startsWith(`anexo-evento-${id}`));
      arquivosExistentes.forEach(file => fs.unlinkSync(path.join(path.dirname(novoCaminhoAnexo), file)));
  
      fs.renameSync(file.path, novoCaminhoAnexo);
  
      
    } catch (error) {
      throw new Error('Falha ao carregar anexo' + error.message);
    }
  }// uploadAttachment
  
  static async downloadAnexo(id) {
    try {
      const evento = await Eventos.findByPk(id);
      if (!evento) {
        throw new Error('Evento não encontrado');
      }
  
      const caminhoAnexo = path.join(
        __dirname,
        "../Arquivos/AnexosEventos",
        `anexo-evento-${id}.*`
      );
  
      const anexo = fs.readdirSync(path.dirname(caminhoAnexo)).find(file => file.match(path.basename(caminhoAnexo)));
      if (!anexo) {
        throw new Error('Anexo não encontrado');
      }
  
      const extensao = path.extname(anexo);
      const comeco = path.join(path.dirname(caminhoAnexo), anexo); 
      const fim = `anexo-evento-${id}${extensao}`;
      const arquivo = {comeco,fim};
      return arquivo
    } catch (error) {
      throw new Error('Falha em baixar o arquivo'+ error.message);
    }
  }// downloadAttachment
} // class
