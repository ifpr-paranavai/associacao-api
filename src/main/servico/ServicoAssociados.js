"use strict";

const Associado = require("../modelos/Associados");
const TokenUtil = require("../utils/TokenUtil");

module.exports = class ServicoAssociados {

  static async buscarPendentes() {
    try {
      return await Associado.findAll({
        where: {
          ativo: false
        }
      });
    } catch (error) {
      throw new Error("Falha ao processar requisição: " + error);
    }
  } // buscarPendentes()

  static async buscarAssociados() {
    try {
      return await Associado.findAll({
        where: {
          ativo: true
        }
      });
    } catch (error) {
      throw new Error("Falha ao buscar associados: " + error);
    }
  }

  static async buscarTodos() {
    try {
      return await Associado.findAll();
    } catch (error) {
      throw new Error("Falha ao buscar todos associados: " + error);
    }
  }

  static async login(data) {
    try {
      let associado = await Associado.findOne({ where: { email: data.email } });

      if (!associado) throw { message: "E-mail não encontrado!" };

      if (associado.senha !== data.senha) throw { message: "Senha inválida!" };

      if (associado.perfil === "ASSOCIADO") throw {message: "Você não tem nivel de acesso suficiente!"}

      let token = await TokenUtil.genereteToken({
        nome: associado.nome,
        email: associado.email,
        _id: associado._id,
        perfil: associado.perfil,
      });
      return await this.formatarAssociado(associado, token);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async criarAssociado(data) {
    try {
      return await Associado.create(data);
    } catch (error) {
      throw new Error(error.message);
    }
  } // criarAssociado()

  static async atualizarAssociado(id, dadosAtualizados) {
    try {
      const associado = await Associado.findByPk(id);
      if (!associado) {
        throw new Error('Associado não encontrado');
      }
      const associadoAtualizado = await associado.update(dadosAtualizados);
      return associadoAtualizado;
    } catch (error) {
      throw new Error('Falha ao atualizar associado: ' + error.message);
    }
  }

  static async excluirAssociado(id) {
    try {
      const associado = await Associado.findByPk(id);
      if (!associado) {
        throw new Error('Associado não encontrado');
      }
      await associado.destroy();
      return true;
    } catch (error) {
      throw new Error('Falha ao excluir associado: ' + error.message);
    }
  }

  static async buscarPorId(id) {
    try {
      const associado = await Associado.findByPk(id);
      if (!associado) {
        throw new Error('Associado não encontrado');
      }
      return associado;
    } catch (error) {
      throw new Error('Falha ao buscar associado: ' + error.message);
    }
  }

  static async buscarPorCpf(cpf) {
    try {
      const associado = await Associado.findOne({ cpf: cpf });
      return associado;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async formatarAssociado(associado, token) {
    return {
      id: associado.id,
      _id: associado._id,
      imagem: associado.imagem,
      email: associado.email,
      nome: associado.nome,
      perfil: associado.perfil,
      token: token,
    };
  }
}; // class
