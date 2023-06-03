"use strict";

const Classificados = require('../modelos/Classificados');

module.exports = class ServicoClassificados {

    static async criarClassificado(classificado) {
            try {
                return await Classificados.create(classificado);
            } catch (error) {
                throw new Error("Falha ao criar classificado: " + error);
            }
    }// criarClassificado()

    static async buscarClassificados() {
            try {
                return await Classificados.find();
            } catch (error) {
                throw new Error("Falha ao buscar classificados: " + error);
            }
    } // buscarClassificados()
} // class