"use strict";

const Associate = require("../modelos/Associados");
const TokenUtil = require("../utils/TokenUtil");

module.exports = class AssociateService {

    static async authentication(data){
        try {        
            if (!data.email || !data.password)
                throw { message: "E-mail e Senha devem ser informados!" };

            let user = await Associate.findOne({email: data.email, active: true}); 
            
            if(!user) throw { message: "Usuário não encontrado!" };

            if(user.password !== data.password) throw { message: "Senha inválida!" };

            let token = TokenUtil.genereteToken({name: user.name, email: user.email, _id: user._id, role: user.role});

            return await this.loggedUserFormatter(user, token);
        } catch (error) {
            throw new Error(error.message);
        }
    }
    static async getCountDocuments(){
        try {
            return await Associate.countDocuments()
        } catch (error) {
            throw new Error("Falha ao processar requisição: " + error);
        }
    }

    static async getList(query) {
        try {

            let order = query._order || 'ASC'
            let field = query._sort || 'name'
            const pageOptions = {
                start: parseInt(query._start, 10) || 0,
                end: parseInt(query._end, 10) || 10,
                sort: order == 'ASC' ? field : "-" + field
            }
            let dinamicQuery = {}
            
            if(query.q){
                const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
                const searchRgx = rgx(query.q);
                dinamicQuery['$or'] =  [
                    { name: { $regex: searchRgx, $options: "i" } },
                    { email: { $regex: searchRgx, $options: "i" } }
                ]
            }


            let associates = await Associate.find(dinamicQuery)
                                .skip(pageOptions.start)
                                .limit(pageOptions.end)
                                .sort(pageOptions.sort)

            let returnedAssociates = [];
            
            associates.forEach(associate => {
                returnedAssociates.push(this.change_ID(associate))
            });

            return returnedAssociates
        } catch (error) {
            throw new Error("Falha ao processar requisição: " + error);
        }
    } // getList()

    static async findOne(params) {
        if(!params._id)
            throw new Error("Falha ao processar requisição: O id deve ser informado");
        try {
            let associate = await Associate.findById({ _id : params._id })
            return this.change_ID(associate)
        } catch (error) {
            throw new Error("Falha ao processar requisição: " + error);
        }
    } // findOne

    static change_ID(associate){
        var obj = associate.toObject();
     
        //Rename fields
        obj._id = obj._id;
        delete obj._id;
     
        return obj;
    }

    //devolver usuario logado com token
    static async loggedUserFormatter(user, token) {
        return {
            _id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
            token: token
        };
    }

} // class