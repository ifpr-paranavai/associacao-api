"use strict";

const ServicoNoticias = require("../servico/ServicoNoticias");


module.exports = class ControleNoticias {

  static async listarTodas(req, res) {   
    try {
        res.header('Access-Control-Expose-Headers', 'X-Total-Count');
        res.header('X-Total-Count', await ServicoNoticias.getCountDocuments());
        res.status(200).send(await ServicoNoticias.listarTodas(req.query));        
    } catch (e) {
        res.status(500).send(e.message);
        global.logger.error("ControleNoticias.listarTodas " + e.message);
    }
  } // findAll()
  
 
  
}; // class