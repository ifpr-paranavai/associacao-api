"use strict";
const AccessControl = require("../middlewares/AccessControl");
const ValidadorAssociado = require("../validators/ValidadorAssociado");

const ControleAssociados = require("../controle/ControleAssociados");
const accessDiretoria = new AccessControl("Diretoria");
const validadorAssociado = new ValidadorAssociado();
const multer = require("multer");
const upload = multer({ dest:"src/main/Arquivos/ImagensAssociados/"});

module.exports = class RotaAssociados {
  constructor(app) {
    app.route("/")
      .get(
        ControleAssociados.buscarTodos
      )
    app.route("/associados")
      .get(
        //accessDiretoria.verify,
        //validadorAssociado.listar,
        // accessDiretoria.verify,
        validadorAssociado.listar,
        ControleAssociados.buscarAssociados
      )
      .post(
        // accessDiretoria.verify,
        validadorAssociado.create,
        ControleAssociados.criarAssociado
      )
    app.route("/associados/:id")
      .put(ControleAssociados.atualizarAssociado)
      .get(
        // accessDiretoria.verify,
        //validadorAssociado.buscar,
        ControleAssociados.buscarPorId
      )
      .delete(
        // accessDiretoria.verify,
        //validadorAssociado.delete,
        ControleAssociados.excluirAssociado
      )

    app.get("/pendentes", /* accessDiretoria.verify, */ ControleAssociados.buscarPendentes);

    app.post("/login", validadorAssociado.login, ControleAssociados.login);

    app.post(
      "/autocadastro",
      validadorAssociado.create,
      ControleAssociados.criarAssociado
    );

    app.post(
      "/associados/uploadImagem/:_id",
      upload.single("imagem"),
      ControleAssociados.uploadImagem
    );

    app.get(
      "/associados/downloadImagem/:_id",
      ControleAssociados.downloadImagem
    );

    app.get(
      "/associados/buscarPorCpf/:cpf",
      ControleAssociados.buscarPorCpf
    );
  } // constructor()
}; // class
