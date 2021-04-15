"use strict";

const Mongoose = require("mongoose");
const Noticia = Mongoose.model('Noticia')


module.exports = class ServicoNoticias {

    static async getCountDocuments(){
        try {
            return await Noticia.countDocuments()
        } catch (error) {
            throw new Error("Falha ao processar requisição: " + error);
        }
    }

    static async listarTodas(query) {
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
            let noticias = await Noticia.find(dinamicQuery)
                                .skip(pageOptions.start)
                                .limit(pageOptions.end)
                                .sort(pageOptions.sort)

            let returnedNoticias = [];
            
            noticias.forEach(noticia => {
                returnedNoticias.push(this.change_ID(noticia))
            });

            return returnedNoticias
        } catch (error) {
            throw new Error("Falha ao processar requisição: " + error);
        }
    } // getList()

        static change_ID(noticia){
            if(!noticia)
            return
            var obj = noticia.toObject();
        
            //Rename fields
            obj.id = obj._id;
            delete obj._id;
        
            return obj;
        }


} // class