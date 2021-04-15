"use strict";

const ServicoImagens = require("../servico/ServicoImagens");

module.exports = class ControleImagens {
    static async getImagem(req, res) {
        try {
            let relativePath = appRoot + '/assets/' + req.params.nomeArquivo
            if (await ServicoImagens.existeImagem(relativePath)) {
                res.status(200).sendFile(relativePath)
            } else {
                res.status(404).send("Arquivo não encontrado");
            }
        } catch (e) {
            res.status(500).send(e.message);
            global.logger.error("ControleImagens.getImagem " + e.message);
        }
    } // getImage()
}