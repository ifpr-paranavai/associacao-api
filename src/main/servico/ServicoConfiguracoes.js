"use strict";

const jsonfile = require('jsonfile')
const siteSettings = './configuracoes.json';

module.exports = class ServicoConfiguracoes {

    static async obterDados() {
        try {
            let data = await jsonfile.readFileSync(siteSettings)
            return data
        } catch (error) {
            throw new Error("ServicoConfiguracoes.obterDados: " + error);
        }
    } // obterDados()
    static async definirDados(json) {
        try {
            await jsonfile.writeFileSync(siteSettings, json, { spaces: 2 })
            return { status: 200, message: "As informações foram atualizadas!" }
        } catch (error) {
            throw new Error("ServicoConfiguracoes.definirDados: " + error);
        }
    } // definirDados()
} // class