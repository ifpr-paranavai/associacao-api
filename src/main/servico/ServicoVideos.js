"use strict";

const Videos = require('../modelos/Videos');
const { Op } = require("sequelize");

module.exports = class ServicoVideos {

    static async criarVideo(video) {
            try {
                return await Videos.create(video);
            } catch (error) {
                throw new Error("Falha ao criar video: " + error);
            }
    }// criarVideo

    static async buscarVideos(limite = 10, pagina = 1) {
        try {
          const offset = (pagina - 1) * limite;
          return await Videos.findAndCountAll({ limit: limite, offset: offset });
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


        static async buscarVideoPorTitulo(titulo, limite = 10, pagina = 1) {
            try {
              const offset = (pagina - 1) * limite;
              const { rows, count } = await Videos.findAndCountAll({
                where: {
                  titulo: {
                    [Op.like]: `%${titulo}%`,
                  },
                },
                limit: limite,
                offset: offset,
              });
        
              if (!rows || rows.length === 0) {
                throw new Error("Nenhum video encontrado no serviço");
              }
        
              return { rows, count };
            } catch (error) {
              throw new Error("Falha ao buscar videos: " + error.message);
            }
          }// findByName

} // class