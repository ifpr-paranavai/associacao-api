"use strict";

const Fotos = require('../modelos/Fotos');

module.exports = class ServicoFotos {

    static async criarFoto(foto) {
            try {
                return await Fotos.create(foto);
            } catch (error) {
                throw new Error("Falha ao criar foto: " + error);
            }
    }// criarFoto

    static async buscarFotos() {
            try {
                return await Fotos.findAll();
            } catch (error) {
                throw new Error("Falha ao buscar fotos: " + error);
            }
    } // buscarFotos

    static async buscarFotoPorId(id) {
        try {
          const foto = await Fotos.findByPk(id);
          if (!foto) {
            throw new Error('Foto não encontrado');
          }
          return foto;
        } catch (error) {
          throw new Error('Falha ao buscar foto: ' + error.message);
        }
      }// findByID

    static async atualizarFoto(id, dadosAtualizados) {
            try {
                const foto = await Fotos.findByPk(id);
                if (!foto) {
                    throw new Error('Foto não encontrado');
                }
                const fotoAtualizado = await foto.update(dadosAtualizados);
                return fotoAtualizado;
            } catch (error) {
                throw new Error('Falha ao atualizar foto: ' + error.message);
            }
        }// atualizarFoto

    static async excluirFoto(id) {
                    try {
                        const foto = await Fotos.findByPk(id);
                        if (!foto) {
                            throw new Error('Foto não encontrado');
                        }
                        await foto.destroy();
                        return true;
                    } catch (error) {
                        throw new Error('Falha ao excluir foto: ' + error.message);
                    }
        }


        static async buscarFotoPorTitulo(titulo) {
            try {
                const foto = await Fotos.findAll({ where: { titulo: titulo } });
                if (!foto) {
                    throw new Error('Foto não encontrado no serviço');
                }
                return foto;
            } catch (error) {
                throw new Error('Falha ao buscar foto: ' + error.message);
            }
        }// findByName

        static async buscarFotoPorValor(valor) {
            try {
                const foto = await Fotos.findAll({ where: { valor: valor } });
                if (!foto) {
                    throw new Error('Foto não encontrado no serviço');
                }
                return foto;
            } catch (error) {
                throw new Error('Falha ao buscar foto: ' + error.message);
            }
        }// findByValue

} // class