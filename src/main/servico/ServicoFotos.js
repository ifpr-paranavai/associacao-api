"use strict";

const Fotos = require("../modelos/Fotos");
const { Op } = require("sequelize");

module.exports = class ServicoFotos {
  static async criarFoto(foto) {
    try {
      return await Fotos.create(foto);
    } catch (error) {
      throw new Error("Falha ao criar foto: " + error);
    }
  } // criarFoto

  static async buscarFotos(limite = 10, pagina = 1) {
    try {
      const offset = (pagina - 1) * limite;
      return await Fotos.findAndCountAll({ limit: limite, offset: offset });
    } catch (error) {
      throw new Error("Falha ao buscar fotos: " + error);
    }
  } // buscarFotos

  static async buscarFotoPorId(id) {
    try {
      const foto = await Fotos.findByPk(id);
      if (!foto) {
        throw new Error("Foto não encontrado");
      }
      return foto;
    } catch (error) {
      throw new Error("Falha ao buscar foto: " + error.message);
    }
  } // findByID

  static async atualizarFoto(id, dadosAtualizados) {
    try {
      const foto = await Fotos.findByPk(id);
      if (!foto) {
        throw new Error("Foto não encontrado");
      }
      const fotoAtualizado = await foto.update(dadosAtualizados);
      return fotoAtualizado;
    } catch (error) {
      throw new Error("Falha ao atualizar foto: " + error.message);
    }
  } // atualizarFoto

  static async excluirFoto(id) {
    try {
      const foto = await Fotos.findByPk(id);
      if (!foto) {
        throw new Error("Foto não encontrado");
      }
      await foto.destroy();
      return true;
    } catch (error) {
      throw new Error("Falha ao excluir foto: " + error.message);
    }
  }

  static async buscarFotoPorTitulo(titulo, limite = 10, pagina = 1) {
    try {
      const offset = (pagina - 1) * limite;
      const { rows, count } = await Fotos.findAndCountAll({
        where: {
          titulo: {
            [Op.like]: `%${titulo}%`,
          },
        },
        limit: limite,
        offset: offset,
      });

      if (!rows || rows.length === 0) {
        throw new Error("Nenhuma foto encontrada no serviço");
      }

      return { rows, count };
    } catch (error) {
      throw new Error("Falha ao buscar fotos: " + error.message);
    }
  } // findByName
}; // class
