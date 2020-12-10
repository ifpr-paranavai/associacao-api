"use strict";

const Mongoose = require("mongoose");
const FotosVideos = Mongoose.model('FotosVideos')


module.exports = class ServicoFotosVideos{

  
    static async listarTodos() {
        try {
           
            let fotosvideos = await FotosVideos.find({})
                                
                return fotosvideos
        } catch (error) {
            throw new Error("Falha ao processar requisição: " + error);
        }
    } // getList()


    static async salvar(fotosvideos) {
        try {
           
            return await FotosVideos.create(fotosvideos)
                                
            
        } catch (error) {
            throw new Error("Falha ao processar requisição: " + error);
        }
    } // getList()

  

} // class