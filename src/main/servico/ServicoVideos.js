"use strict";

const Videos = require('../modelos/Videos');

module.exports = class ServicoVideos {

    static async criarVideo(video) {
            try {
                return await Videos.create(video);
            } catch (error) {
                throw new Error("Falha ao criar video: " + error);
            }
    }// criarVideo

    static async buscarVideos() {
            try {
                return await Videos.findAll();
            } catch (error) {
                throw new Error("Falha ao buscar videos: " + error);
            }
    } // buscarVideos

    static async buscarVideoPorId(id) {
        try {
          const video = await Videos.findByPk(id);
          if (!video) {
            throw new Error('Video não encontrado');
          }
          return video;
        } catch (error) {
          throw new Error('Falha ao buscar video: ' + error.message);
        }
      }// findByID

    static async atualizarVideo(id, dadosAtualizados) {
            try {
                const video = await Videos.findByPk(id);
                if (!video) {
                    throw new Error('Video não encontrado');
                }
                const videoAtualizado = await video.update(dadosAtualizados);
                return videoAtualizado;
            } catch (error) {
                throw new Error('Falha ao atualizar video: ' + error.message);
            }
        }// atualizarVideo

    static async excluirVideo(id) {
                    try {
                        const video = await Videos.findByPk(id);
                        if (!video) {
                            throw new Error('Video não encontrado');
                        }
                        await video.destroy();
                        return true;
                    } catch (error) {
                        throw new Error('Falha ao excluir video: ' + error.message);
                    }
        }


        static async buscarVideoPorTitulo(titulo) {
            try {
                const video = await Videos.findAll({ where: { titulo: titulo } });
                if (!video) {
                    throw new Error('Video não encontrado no serviço');
                }
                return video;
            } catch (error) {
                throw new Error('Falha ao buscar video: ' + error.message);
            }
        }// findByName

        static async buscarVideoPorValor(valor) {
            try {
                const video = await Videos.findAll({ where: { valor: valor } });
                if (!video) {
                    throw new Error('Video não encontrado no serviço');
                }
                return video;
            } catch (error) {
                throw new Error('Falha ao buscar video: ' + error.message);
            }
        }// findByValue

} // class