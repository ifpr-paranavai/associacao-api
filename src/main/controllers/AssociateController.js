"use strict";

const Mongoose = require("mongoose");
const Associate = Mongoose.model("Associate");

module.exports = class AssociateController {
  static async getAll(req, res) {
    try {
        res.status(200).send(
            await Associate.find({})
        );
    } catch (e) {
        res.status(500).send(e.message);
        global.logger.error(e.message);
    }
  } // getAll()
  

  static async create(req, res) {
    try {
      res.status(200).send(
        await Associate.create(req.body)
      );
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error(e.message);
    }
  } // create()

  static async update(req, res) {
    try {

      if (!req.body._id){
        return res.status(403).send({
          message: "_ID deve ser informado"
        });
      }

      if (await Associate.findByIdAndUpdate(req.body._id, req.body)) {
        return res.status(200).send({
            message: "Atualizado com sucesso",
            update: req.body
        });
      }
    } catch (e) {
      res.status(500).send("error");
      global.logger.error(e.message);
    }
  } // update()

  static async remove(req, res) {
    try {
      if (!req.body._id){
        return res.status(403).send({
           message: "_ID deve ser informado"
        });
      }
      if (await Associate.findByIdAndRemove(req.body._id)){
        return res.status(200).send({
          message: "Excluído com sucesso",
          remove: req.body._id
        });
      }
    } catch (e) {
      res.status(500).send("error");
      global.logger.error(e.message);
    }
  } // remove()
}; // class