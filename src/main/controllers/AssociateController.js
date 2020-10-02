"use strict";

const AssociateService = require("../services/AssociateService");

const Mongoose = require("mongoose");
const Associate = Mongoose.model("Associate");

module.exports = class AssociateController {
  static async getList(req, res) {
    try {        
        res.header('Access-Control-Expose-Headers', 'X-Total-Count');
        res.header('X-Total-Count', await AssociateService.getCountDocuments());
        res.status(200).send(await AssociateService.getList(req.query));
    } catch (e) {
        res.status(500).send(e.message);
        global.logger.error("AssociateController.getList " + e.message);
    }
  } // findAll()
  
  static async findAllActives(req, res) {
    try {
        res.status(200).send(
            await Associate.find({active: true})
        );
    } catch (e) {
        res.status(500).send(e.message);
        global.logger.error(e.message);
    }
  } // findAllActives()

  static async getOne(req, res) {
    try {
        res.status(200).send(await AssociateService.findOne(req.params));
    } catch (e) {
        res.status(500).send(e.message);
        global.logger.error("AssociateController.getOne " + e.message);
    }
  } // findOne()

  static async create(req, res) {
    try {
      res.status(200).send(
        await Associate.create(req.body)
      );
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("AssociateController.create " + e.message);
    }
  } // create()

  static async update(req, res) {
    try {

      if (!req.params.id){
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

  static async delete(req, res) {
    try {
      if (!req.params._id){
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
  } // delete()

  static async getMany(req, res) {
      res.status(500).send("error: Operação não suportada");
      global.logger.error(e.message);
  }
  static async getManyReference(req, res) {
    res.status(500).send("error: Operação não suportada");
    global.logger.error(e.message);
}
  
}; // class