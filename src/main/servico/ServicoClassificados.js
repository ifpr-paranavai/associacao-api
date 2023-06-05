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
                return await Classificados.find();
            } catch (error) {
                throw new Error("Falha ao buscar classificados: " + error);
            }
    } // buscarClassificados

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

} // class