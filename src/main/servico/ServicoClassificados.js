"use strict";

const Classificados = require("../modelos/Classificados");
const { Op } = require("sequelize");
const path = require('path');
const Foto = require("../modelos/Fotos");
const fs = require("fs").promises;
const JSZip = require("jszip");

module.exports = class ServicoClassificados {
  static async criarClassificado(classificado) {
    try {
      return await Classificados.create(classificado);
    } catch (error) {
      throw new Error("Falha ao criar classificado: " + error);
    }
  } // criarClassificado

  static async buscarClassificadosCliente(limite = 3, pagina = 1) {
    try {
      const offset = (pagina - 1) * limite;

      const result = await Foto.findAndCountAll({
        limit: limite,
        offset: offset,
        order: [["createdAt", "DESC"]],
        distinct: true,
        include: [{
          model: Classificados,
          as: 'classificado',
          required: true,
        }],
      });

      result.rows = await Promise.all(result.rows.map(async (foto) => {
        const classificado = foto.classificado;
        const classificadoJSON = classificado.toJSON();

        const extensao = path.extname(foto.titulo).toLowerCase().slice(1);
        const mimeType = `image/${extensao}`;
        classificadoJSON.imagem = `data:${mimeType};base64,${foto.conteudo.toString('base64')}`;

        classificadoJSON.foto = {
          id: foto.id,
          titulo: foto.titulo,
          createdAt: foto.createdAt,
          updatedAt: foto.updatedAt
        };

        delete classificadoJSON.classificado;

        return classificadoJSON;
      }));

      return result;
    } catch (error) {
      throw new Error("Falha ao buscar classificados e fotos: " + error);
    }
  }// buscarClassificados


  static async buscarClassificadosAdmin(limite = 3, pagina = 1) {
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
      return await classificado.update(
        dadosAtualizados
      );
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

      const fotos = await Foto.findAll({ where: { classificado_id: id } });
      for (const foto of fotos) {
        await foto.destroy();
      }

      await classificado.destroy();

      const caminhoAnexo = path.join(
        __dirname,
        "../Arquivos/AnexosClassificados",
        `anexo-classificado-${id}.*`
      );
      const arquivosExcluidos = await fs.readdir(path.dirname(caminhoAnexo));
      for (const file of arquivosExcluidos) {
        if (file.match(path.basename(caminhoAnexo))) {
          await fs.unlink(path.join(path.dirname(caminhoAnexo), file));
        }
      }

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

  static async uploadAnexo(id, anexos) {
    try {
      const classificado = await Classificados.findByPk(id);
      if (!classificado) {
        throw new Error("Classificado não encontrado");
      }

      if (!anexos || anexos.length === 0) {
        throw new Error("Nenhum arquivo enviado");
      }

      const extensoesPermitidas = [".png", ".jpg", ".jpeg"]
      const erros = [];
      let varControleArquivos = 0;

      for (const anexo of anexos) {
        const extensao = path.extname(anexo.originalname);
        if (!extensoesPermitidas.includes(extensao)) {
          erros.push({ filename: anexo.originalname, error: "Arquivo inválido. Somente arquivos PNG, JPG, JPEG, MP4 e MOV são aceitos." });
          continue;
        }

        const novoNomeAnexo = `anexo-classificado-${id}-${varControleArquivos}${extensao}`;

        const fileContent = await fs.readFile(anexo.path);

        await Foto.create({
          classificado_id: classificado.id,
          titulo: novoNomeAnexo,
          conteudo: fileContent,
        });

        await fs.unlink(anexo.path);

        varControleArquivos++;
      }

      if (erros.length > 0) {
        throw new Error(JSON.stringify(erros));
      }

      return { sucesso: true };
    } catch (error) {
      throw new Error("Falha ao fazer upload do anexo: " + error.message);
    }
  } // uploadAnexo

  static async downloadAnexo(id) {
    try {
      const classificado = await this.buscarClassificadoPorId(id);
      if (!classificado) {
        throw new Error("Classificado não encontrado");
      }

      const fotos = await Foto.findAll({
        where: { classificado_id: id }
      });

      if (fotos.length === 0) {
        throw new Error("Não há arquivos para baixar");
      }

      const zip = new JSZip();

      fotos.forEach((foto) => {
        zip.file(foto.titulo, foto.conteudo);
      });

      const conteudoJaZipado = await zip.generateAsync({ type: "nodebuffer" });
      const nomePastaZipada = `anexos-classificados-${id}.zip`;

      return {
        conteudo: conteudoJaZipado,
        nome: nomePastaZipada
      };
    } catch (error) {
      throw new Error("Falha ao baixar anexos: " + error.message);
    }
  } // downloadAnexo

  static async visualizarAnexo(id) {
    try {
      const classificado = await this.buscarClassificadoPorId(id);
      if (!classificado) {
        throw new Error("Classificado não encontrado");
      }

      const fotos = await Foto.findAll({
        where: { classificado_id: id }
      });

      if (fotos.length === 0) {
        throw new Error("Não há arquivos para visualizar");
      }

      const anexosBase64 = fotos.map(foto => {
        const extensao = path.extname(foto.titulo).toLowerCase();
        return {
          filename: foto.titulo,
          type: extensao === '.mp4' || extensao === '.mov' ? 'video' : 'image',
          data: foto.conteudo.toString('base64')
        };
      });

      return { imagens: anexosBase64 };
    } catch (error) {
      throw new Error("Falha ao visualizar anexos: " + error.message);
    }
  } // visualizarAnexo
}; // class
