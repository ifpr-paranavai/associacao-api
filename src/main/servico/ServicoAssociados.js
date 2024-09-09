"use strict";

const Associado = require("../modelos/Associados");
const TokenUtil = require("../utils/TokenUtil");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");

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

  static async buscarAssociados(limite = 10, pagina = 1) {
    try {
      const offset = (pagina - 1) * limite;
      return await Associado.findAndCountAll({
        limit: limite,
        offset: offset,
        order: [["createdAt", "DESC"]],
      });
    } catch (error) {
      throw new Error("Falha ao buscar associados: " + error);
    }
  } // buscarAtas

  static async buscarAssociadoPorNome(nome, limite = 10, pagina = 1) {
    try {
      const offset = (pagina - 1) * limite;
      const { rows, count } = await Associado.findAndCountAll({
        where: {
          nome: {
            [Op.like]: `%${nome}%`,
          },
        },
        limit: limite,
        offset: offset,
        order: [["createdAt", "DESC"]],
      });

      if (!rows || rows.length === 0) {
        throw new Error("Nenhum associado encontrado no serviço");
      }

      return { rows, count };
    } catch (error) {
      throw new Error("Falha ao buscar associados: " + error.message);
    }
  } // findByName

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

      // if (associado.senha !== data.senha) throw { message: "Senha inválida!" };

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
      const associado = await Associado.findAll({
        where: {
          cpf: {
            [Op.like]: `%${cpf}%`,
          },
        },
      });
      if (!associado) {
        throw new Error('Associado não encontrado');
      }
      return associado;
    } catch (error) {
      throw new Error('Falha ao buscar associado: ' + error.message);
    }
  }

  static async buscarPorCpfEEmail(cpf, email) {
      const associado = await Associado.findAll({
        where: {
          [Op.or]: [
            { cpf: { [Op.like]: `%${cpf}%` } },
            { email: { [Op.like]: `%${email}%` } },
          ],
        },
      });

      return associado;
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

  static async deletarImagem(id) {
    const associado = await this.buscarPorId(id);

    if(!associado) {
      throw new Error('Associado não encontrado');
    }

    const caminhoImagem = path.join(
      __dirname,
      "../Arquivos/ImagensAssociados",
      `imagem-associado-${id}.*`,
    );

    const imagem = fs.readdirSync(path.dirname(caminhoImagem)).find(file => file.match(path.basename(caminhoImagem)));

    if(!imagem) {
      throw new Error("Imagem não encontrada");
    }

    fs.unlinkSync(path.join(path.dirname(caminhoImagem), imagem));

    return { sucesso: true, mensagem: "Imagem deletada com sucesso" };
  }
};
