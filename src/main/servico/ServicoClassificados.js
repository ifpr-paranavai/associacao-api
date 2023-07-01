"use strict";

const Classificados = require('../modelos/Classificados');

module.exports = class ServicoClassificados {

    static async criarClassificado(classificado) {
            try {
                return await Classificados.create(classificado);
            } catch (error) {
                throw new Error("Falha ao criar classificado: " + error);
            }
    }// criarClassificado

    static async buscarClassificados() {
            try {
                return await Classificados.findAll();
            } catch (error) {
                throw new Error("Falha ao buscar classificados: " + error);
            }
    } // buscarClassificados

    static async buscarClassificadoPorId(id) {
        try {
          const classificado = await Classificados.findByPk(id);
          if (!classificado) {
            throw new Error('Classificado não encontrado');
          }
          return classificado;
        } catch (error) {
          throw new Error('Falha ao buscar classificado: ' + error.message);
        }
      }// findByID

    static async atualizarClassificado(id, dadosAtualizados) {
            try {
                const classificado = await Classificados.findByPk(id);
                if (!classificado) {
                    throw new Error('Classificado não encontrado');
                }
                const classificadoAtualizado = await classificado.update(dadosAtualizados);
                return classificadoAtualizado;
            } catch (error) {
                throw new Error('Falha ao atualizar classificado: ' + error.message);
            }
        }// atualizarClassificado

    static async excluirClassificado(id) {
                    try {
                        const classificado = await Classificados.findByPk(id);
                        if (!classificado) {
                            throw new Error('Classificado não encontrado');
                        }
                        await classificado.destroy();
                        return true;
                    } catch (error) {
                        throw new Error('Falha ao excluir classificado: ' + error.message);
                    }
        }


        static async buscarClassificadoPorTitulo(titulo) {
            try {
                const classificado = await Classificados.findAll({ where: { titulo: titulo } });
                if (!classificado) {
                    throw new Error('Classificado não encontrado no serviço');
                }
                return classificado;
            } catch (error) {
                throw new Error('Falha ao buscar classificado: ' + error.message);
            }
        }// findByName

        static async buscarClassificadoPorValor(valor) {
            try {
                const classificado = await Classificados.findAll({ where: { valor: valor } });
                if (!classificado) {
                    throw new Error('Classificado não encontrado no serviço');
                }
                return classificado;
            } catch (error) {
                throw new Error('Falha ao buscar classificado: ' + error.message);
            }
        }// findByValue

} // class