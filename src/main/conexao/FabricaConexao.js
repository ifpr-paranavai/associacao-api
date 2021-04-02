'use strict'



const mongoose = require('mongoose');
const plugin = require('../plugins/PluginMongoose');
const ServicoConfiguracoes = require("../servico/ServicoConfiguracoes");
mongoose.plugin(plugin)

class FabricaConexao {

    static async obterConexao() {
        let url;
        let options = {
            keepAlive: 1,
            useNewUrlParser: true,
            connectTimeoutMS: 30000,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        };
        let banco = (await ServicoConfiguracoes.obterDados()).banco
        if (!banco.usuario && !banco.senha) url = `mongodb://${banco.url}/${banco.nome}`
        else url = `mongodb+srv://${banco.usuario}:${banco.senha}@${banco.url}/${banco.name}?retryWrites=true&w=majority`
        
        return mongoose.connect(url, options);
    }
}

module.exports = FabricaConexao;
