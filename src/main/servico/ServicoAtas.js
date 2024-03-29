"use strict";

const Atas = require("../modelos/Atas");
const { Op } = require("sequelize");

module.exports = class ServicoAtas {
  static async criarAta(ata) {
    try {
      return await Atas.create(ata);
    } catch (error) {
      throw new Error("Falha ao criar ata: " + error);
    }
  } // criarAta

  static async buscarAtas(limite = 10, pagina = 1) {
    try {
      const offset = (pagina - 1) * limite;
      return await Atas.findAndCountAll({
        limit: limite,
        offset: offset,
        order: [["createdAt", "DESC"]],
      });
    } catch (error) {
      throw new Error("Falha ao buscar atas: " + error);
    }
  } // buscarAtas

  static async buscarAtaPorId(id) {
    try {
      const ata = await Atas.findByPk(id);
      if (!ata) {
        throw new Error("Ata não encontrado");
      }
      return ata;
    } catch (error) {
      throw new Error("Falha ao buscar ata: " + error.message);
    }
  } // findByID

  static async atualizarAta(id, dadosAtualizados) {
    try {
      const ata = await Atas.findByPk(id);
      if (!ata) {
        throw new Error("Ata não encontrado");
      }
      const ataAtualizado = await ata.update(dadosAtualizados);
      return ataAtualizado;
    } catch (error) {
      throw new Error("Falha ao atualizar ata: " + error.message);
    }
  } // atualizarAta

  static async excluirAta(id) {
    try {
      const ata = await Atas.findByPk(id);
      if (!ata) {
        throw new Error("Ata não encontrado");
      }
      await ata.destroy();
      return true;
    } catch (error) {
      throw new Error("Falha ao excluir ata: " + error.message);
    }
  }

  static async buscarAtaPorTitulo(titulo, limite = 10, pagina = 1) {
    try {
      const offset = (pagina - 1) * limite;
      const { rows, count } = await Atas.findAndCountAll({
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
        throw new Error("Nenhuma ata encontrada no serviço");
      }

      return { rows, count };
    } catch (error) {
      throw new Error("Falha ao buscar atas: " + error.message);
    }
  } // findByName
}; // class
