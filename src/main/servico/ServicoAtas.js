"use strict";

const Atas = require('../modelos/Atas');

module.exports = class ServicoAtas {

    static async criarAta(ata) {
            try {
                return await Atas.create(ata);
            } catch (error) {
                throw new Error("Falha ao criar ata: " + error);
            }
    }// criarAta

    static async buscarAtas() {
            try {
                return await Atas.findAll();
            } catch (error) {
                throw new Error("Falha ao buscar atas: " + error);
            }
    } // buscarAtas

    static async buscarAtaPorId(id) {
        try {
          const ata = await Atas.findByPk(id);
          if (!ata) {
            throw new Error('Ata não encontrada');
          }
          return ata;
        } catch (error) {
          throw new Error('Falha ao buscar ata: ' + error.message);
        }
      }// findByID

    static async atualizarAta(id, dadosAtualizados) {
            try {
                const ata = await Atas.findByPk(id);
                if (!ata) {
                    throw new Error('Ata não encontrada');
                }
                const ataAtualizada = await ata.update(dadosAtualizados);
                return ataAtualizada;
            } catch (error) {
                throw new Error('Falha ao atualizar ata: ' + error.message);
            }
        }// atualizarAta

    static async excluirAta(id) {
                    try {
                        const ata = await Atas.findByPk(id);
                        if (!ata) {
                            throw new Error('Ata não encontrada');
                        }
                        await ata.destroy();
                        return true;
                    } catch (error) {
                        throw new Error('Falha ao excluir ata: ' + error.message);
                    }
        }


        static async buscarAtaPorTitulo(titulo) {
            try {
                const ata = await Atas.findAll({ where: { titulo: titulo } });
                if (!ata) {
                    throw new Error('Ata não encontrada no serviço');
                }
                return ata;
            } catch (error) {
                throw new Error('Falha ao buscar ata: ' + error.message);
            }
        }// findByName

        static async buscarAtaPorData(data) {
            try {
                const ata = await Atas.findAll({ where: { data: data } });
                if (!ata) {
                    throw new Error('Ata não encontrada no serviço');
                }
                return ata;
            } catch (error) {
                throw new Error('Falha ao buscar ata: ' + error.message);
            }
        }// findByValue

} // class