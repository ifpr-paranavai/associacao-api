"use strict";

const Noticias = require('../modelos/Noticias');

module.exports = class ServicoNoticias {

  static async criarNoticia(noticia) {
    try {
      return await Noticias.create(noticia);
    } catch (error) {
      throw new Error("Falha ao criar noticia: " + error);
    }
  }

  static async buscarNoticias() {
    try {
      return await Noticias.findAll();
    } catch (error) {
      throw new Error("Falha ao buscar noticias: " + error);
    }
  }

  static async buscarNoticiaPorId(id) {
    try {
      const noticia = await Noticias.findByPk(id);
      if (!noticia) {
        throw new Error('Noticia não encontrado');
      }
      return noticia;
    } catch (error) {
      throw new Error('Falha ao buscar noticia: ' + error.message);
    }
  }

  static async buscarNoticiaPorTitulo(titulo) {
    try {
      const noticia = await Noticias.findAll({ where: { titulo: titulo } });
      if (!noticia) {
        throw new Error('Noticia não encontrado no serviço');
      }
      return noticia;
    } catch (error) {
      throw new Error('Falha ao buscar noticia: ' + error.message);
    }
  }

  static async buscarNoticiasPorData(data) {
    try {
      const noticias = await Noticias.findAll({ where: { data_inicio: data } });
      if (!noticias || noticias.length === 0) {
        throw new Error('Nenhum noticia encontrado');
      }
      return noticias;
    } catch (error) {
      throw new Error('Falha ao buscar noticias: ' + error.message);
    }
  }

  static async atualizarNoticia(id, dadosAtualizados) {
    try {
      const noticia = await Noticias.findByPk(id);
      if (!noticia) {
        throw new Error('Noticia não encontrado');
      }
      const noticiaAtualizado = await noticia.update(dadosAtualizados);
      return noticiaAtualizado;
    } catch (error) {
      throw new Error('Falha ao atualizar noticia: ' + error.message);
    }
  }

  static async excluirNoticia(id) {
    try {
      const noticia = await Noticias.findByPk(id);
      if (!noticia) {
        throw new Error('Noticia não encontrado');
      }
      await noticia.destroy();
      return true;
    } catch (error) {
      throw new Error('Falha ao excluir noticia: ' + error.message);
    }
  }

} // class