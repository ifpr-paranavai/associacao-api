"use strict";
const AccessControl = require("../middlewares/AccessControl");
const ValidadorAssociado = require("../validators/ValidadorAssociado");

const ControleAssociados = require("../controle/ControleAssociados");
const accessDiretoria = new AccessControl('Diretoria');
const validadorAssociado = new ValidadorAssociado();

module.exports = class RotaAssociados {
    constructor(app) {
      app
        .route("/associados")
        .get(accessDiretoria.verify, ControleAssociados.listarTodos)
        .post(
          accessDiretoria.verify,
          validadorAssociado.create,
          ControleAssociados.criarAssociado
        )
        .put(
          accessDiretoria.verify,
          validadorAssociado.update,
          ControleAssociados.atualizar
        )

      app.route("/associados/:_id").delete(
        accessDiretoria.verify,
        validadorAssociado.delete,
        ControleAssociados.excluir
      );

      app.route("/associados/:id").get(ControleAssociados.buscarPorId);

      app.get("/associados/actives", ControleAssociados.buscarAtivos);

      app.post("/login" ,
        validadorAssociado.login,
        ControleAssociados.login
      );

      app.post("/cadastrar" , ControleAssociados.cadastrar);
    } // constructor()

} // class
