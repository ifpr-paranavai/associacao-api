"use strict";

const Mongoose = require("mongoose");
const Associate = Mongoose.model('Associate')

module.exports = class AssociateService {

    static async getCountDocuments(){
        try {
            return await Associate.countDocuments()
        } catch (error) {
            throw new Error("Falha ao processar requisição: " + error);
        }
    }

    static async getList(query) {
        try {
            console.log(query)

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

            console.log(JSON.stringify(dinamicQuery))

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
        if(!params.id)
            throw new Error("Falha ao processar requisição: O id deve ser informado");
        try {
            let associate = await Associate.findById({_id : params.id})
            return this.change_ID(associate)
        } catch (error) {
            throw new Error("Falha ao processar requisição: " + error);
        }
    } // findOne

    static change_ID(associate){
        var obj = associate.toObject();
     
        //Rename fields
        obj.id = obj._id;
        delete obj._id;
     
        return obj;
    }
} // class