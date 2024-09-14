"use strict";

const Classificados = require("../modelos/Classificados");
const { Op } = require("sequelize");
const path = require("path");
const fs = require("fs");

module.exports = class ServicoClassificados {
  static async criarClassificado(classificado) {
    try {
      return await Classificados.create(classificado);
    } catch (error) {
      throw new Error("Falha ao criar classificado: " + error);
    }
  } // criarClassificado

  static async buscarClassificados(limite = 10, pagina = 1) {
    try {
      const offset = (pagina - 1) * limite;
      return await Classificados.findAndCountAll({
        limit: limite,
        offset: offset,
        order: [["createdAt", "DESC"]],
      });
    } catch (error) {
      throw new Error("Falha ao buscar classificados: " + error);
    }
  } // buscarClassificados

  static async buscarClassificadoPorId(id) {
    try {
      const classificado = await Classificados.findByPk(id);
      if (!classificado) {
        throw new Error("Classificado não encontrado");
      }
      return classificado;
    } catch (error) {
      throw new Error("Falha ao buscar classificado: " + error.message);
    }
  } // findByID

  static async atualizarClassificado(id, dadosAtualizados) {
    try {
      const classificado = await Classificados.findByPk(id);
      if (!classificado) {
        throw new Error("Classificado não encontrado");
      }
      const classificadoAtualizado = await classificado.update(
        dadosAtualizados
      );
      return classificadoAtualizado;
    } catch (error) {
      throw new Error("Falha ao atualizar classificado: " + error.message);
    }
  } // atualizarClassificado

  static async excluirClassificado(id) {
    try {
      const classificado = await Classificados.findByPk(id);
      if (!classificado) {
        throw new Error("Classificado não encontrado");
      }
      await classificado.destroy();
      const caminhoAnexo = path.join(
        __dirname,
        "../Arquivos/AnexosClassificados",
        `anexo-classificado-${id}.*`
      );
      const arquivosExcluidos = fs.readdirSync(path.dirname(caminhoAnexo)).filter(file => file.match(path.basename(caminhoAnexo)));
      arquivosExcluidos.forEach(file => fs.unlinkSync(path.join(path.dirname(caminhoAnexo), file)));
      return true;
    } catch (error) {
      throw new Error("Falha ao excluir classificado: " + error.message);
    }
  }

  static async buscarClassificadoPorTitulo(titulo, limite = 10, pagina = 1) {
    try {
      const offset = (pagina - 1) * limite;
      const { rows, count } = await Classificados.findAndCountAll({
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
        throw new Error("Nenhum classificado encontrado no serviço");
      }

      return { rows, count };
    } catch (error) {
      throw new Error("Falha ao buscar classificado: " + error.message);
    }
  } // findByName

  static async buscarClassificadoPorValor(valor) {
    try {
      const classificado = await Classificados.findAll({
        where: { valor: valor },
      });
      if (!classificado) {
        throw new Error("Classificado não encontrado no serviço");
      }
      return classificado;
    } catch (error) {
      throw new Error("Falha ao buscar classificado: " + error.message);
    }
  } // findByValue

  static async downloadAnexo(id) {
    try {
      const classificado = await Classificados.findByPk(id);
      if (!classificado) throw new Error("Classificado não encontrado");
  
      const anexo = fs.readdirSync(
        path.join(__dirname, "../Arquivos/AnexosClassificados")
      ).find(file => file.startsWith(`anexo-classificado-${id}`));
      if (!anexo) throw new Error("Anexo não encontrado");
  
      return path.join(
        path.join(__dirname, "../Arquivos/AnexosClassificados"),
        anexo
      );
    } catch (error) {
      throw new Error("Falha ao fazer download do anexo: " + error.message);
    }
  }
}; // class
