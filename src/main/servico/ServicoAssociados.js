"use strict";

const Mongoose = require("mongoose");
const Associado = Mongoose.model('Associado')
const TokenUtil = require("../utils/TokenUtil");


module.exports = class ServicoAssociados {

  
    static async listarTodos() {
        try {
            let associado = await Associado.find({})
                 return associado
        } catch (error) {
            throw new Error("Falha ao processar requisição: " + error);
        }
    } // listarTodos()


    static async salvar(associado) {
        try {           
            return await Associado.create(associado) 
        } catch (error) {
            throw new Error("Falha ao processar requisição: " + error);
        }
    } // getList()

    static async login(data){
        try {        
            if (!data.email || !data.senha)
                throw { message: "E-mail e Senha devem ser informados!" };

            let associado = await Associado.findOne({email: data.email}); 

            if(!associado) throw { message: "E-mail não encontrado!" };

            if(associado.senha != data.senha) throw { message: "Senha inválida!" };
            console.log(associado)
            let token = await TokenUtil.genereteToken({nome: associado.nome, email: associado.email, _id: associado._id, perfil: associado.perfil});
            console.log(token)
            return await this.formatarAssociado(associado, token);
        } catch (error) {
            throw new Error(error.message);
        }
    }
    static async formatarAssociado(associado, token) {
        return {
            id: associado._id,
            email: associado.email,
            nome: associado.nome,
            perfil: associado.perfil,
            token: token
        };
    }
  

} // class