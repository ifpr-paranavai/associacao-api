"use strict";

module.exports = class ServicoClassificados {

  
    static async listarTodos() {
        try {
            let classificado = await Classificado.find({})
                return classificado
        } catch (error) {
            throw new Error("Falha ao processar requisição: " + error);
        }
    } // getList()

    static async salvar(classificado) {
        try {
            return await Classificado.create(classificado);
             
        } catch (error) {
            throw new Error("Falha ao processar requisição: " + error);
        }
    } // getList()

} // class