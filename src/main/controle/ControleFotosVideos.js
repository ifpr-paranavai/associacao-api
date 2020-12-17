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

  static async listarFotos(req, res) {
    try {        
        res.status(200).send(await ServicoFotosVideos.listarFotos());
    } catch (e) {
        res.status(500).send(e.message);
        global.logger.error("ControleFotosVideos.listarFotos " + e.message);
    }
  }

  static async listarVideos(req, res) {
    try {        
        res.status(200).send(await ServicoFotosVideos.listarVideos());
    } catch (e) {
        res.status(500).send(e.message);
        global.logger.error("ControleFotosVideos.listarFotos " + e.message);
    }
  }

  static async salvar(req, res) {
    try {        
        res.status(200).send(await ServicoFotosVideos.salvar(req.body));
    } catch (e) {
        res.status(500).send(e.message);
        global.logger.error("ControleFotosVideos.salvar " + e.message);
    }
  } // findAll()
  
 
  
}; // class