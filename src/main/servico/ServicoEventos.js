"use strict";

const Mongoose = require("mongoose");
const Evento = Mongoose.model('Evento')


module.exports = class ServicoEventos {

    static async getCountDocuments(){
        try {
            return await Eventos.countDocuments()
        } catch (error) {
            throw new Error("Falha ao processar requisição: " + error);
        }
    }
  
    static async listarTodos(query) {
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

            let eventos = await Eventos.find(dinamicQuery)
                                .skip(pageOptions.start)
                                .limit(pageOptions.end)
                                .sort(pageOptions.sort)

            let returnedEventos = [];
            
            eventos.forEach(eventos => {
                returnedEventos.push(this.change_ID(eventos))
            });

            return returnedEventos
        } catch (error) {
            throw new Error("Falha ao processar requisição: " + error);
        }
    }  // getList()

    static async salvar(evento) {
        try {
           
            return await Evento.create(evento);
                                
            
        } catch (error) {
            throw new Error("Falha ao processar requisição: " + error);
        }
    } // getList()

    static change_ID(eventos){
        if(!eventos)
            return
            var obj = eventos.toObject();
       
        //Rename fields
        obj.id = obj._id;
        delete obj._id;
     
        return obj;
    }

} // class