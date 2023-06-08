"use strict";

const Noticias = require('../modelos/Noticias');

module.exports = class ServicoNoticias {

  static async criarEvento(noticia) {
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
      throw new Error("Falha ao buscar Noticias: " + error);
    }
  }

  static async buscarEventoPorId(id) {
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

  static async buscarEventoPorTitulo(titulo) {
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
      const Noticias = await Noticias.findAll({ where: { data: data } });
      if (!Noticias || Noticias.length === 0) {
        throw new Error('Nenhum noticia encontrado');
      }
      return Noticias;
    } catch (error) {
      throw new Error('Falha ao buscar Noticias: ' + error.message);
    }
  }

  static async atualizarEvento(id, dadosAtualizados) {
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

  static async excluirEvento(id) {
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