"use strict";

const ServicoFotosVideos = require("../servico/ServicoFotosVideos");


module.exports = class ControleFotosVideos {

  static async listarTodos(req, res) {
    try {        
        res.status(200).send(await ServicoFotosVideos.listarTodos());
    } catch (e) {
        res.status(500).send(e.message);
        global.logger.error("ControleFotosVideos.listarTodos " + e.message);
    }
  } // findAll()


  static async salvar(req, res) {
    try {        
        res.status(200).send(await ServicoFotosVideos.salvar(req.body));
    } catch (e) {
        res.status(500).send(e.message);
        global.logger.error("ControleFotosVideos.salvar " + e.message);
    }
  } // findAll()
  
 
  
}; // class