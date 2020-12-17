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

    static async listarFotos() {
        try {
           
            let fotos = await FotosVideos.find({tipo: "foto"})
                                
                return fotos
        } catch (error) {
            throw new Error("Falha ao processar requisição: " + error);
        }
    }

    static async listarVideos() {
        try {
           
            let fotos = await FotosVideos.find({tipo: "video"})
                                
                return fotos
        } catch (error) {
            throw new Error("Falha ao processar requisição: " + error);
        }
    }

    static async salvar(fotosvideos) {
        try {
            console.log(fotosvideos);
            return await FotosVideos.create(fotosvideos)
                                
            
        } catch (error) {
            throw new Error("Falha ao processar requisição: " + error);
        }
    } // getList()

  

} // class