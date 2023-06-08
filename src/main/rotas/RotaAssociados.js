"use strict";
const AccessControl = require("../middlewares/AccessControl");
const ValidadorAssociado = require("../validators/ValidadorAssociado");

const ControleAssociados = require("../controle/ControleAssociados");
const accessDiretoria = new AccessControl("Diretoria");
const validadorAssociado = new ValidadorAssociado();

module.exports = class RotaAssociados {
  constructor(app) {
    app
      .route("/associados")
      .get(
        //accessDiretoria.verify,
        //validadorAssociado.listar,
        ControleAssociados.listarTodos
      )
      .post( 
       /*  accessDiretoria.verify, */
        validadorAssociado.create,
        ControleAssociados.criarAssociado
      )
      .put(
        accessDiretoria.verify,
        validadorAssociado.update,
        ControleAssociados.atualizar
      );

    app
      .route("/associados/:_id")
      .get(
        accessDiretoria.verify,
        validadorAssociado.buscar,
        ControleAssociados.buscarPorId
      )
      .delete(
        accessDiretoria.verify,
        validadorAssociado.delete,
        ControleAssociados.excluir
      );

    app.get("/pendentes", accessDiretoria.verify, ControleAssociados.buscarPendentes);

    app.post("/login", validadorAssociado.login, ControleAssociados.login);

    app.post(
      "/autocadastro",
      validadorAssociado.create,
      ControleAssociados.criarAssociado
    );
  } // constructor()
}; // class
