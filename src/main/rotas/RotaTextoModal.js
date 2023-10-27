"use strict";

const ControleTextoModal = require("../controle/ControleTextoModal");

module.exports = class RotaTextoModal {
  constructor(app) {
    app.route("/textoModal").get(ControleTextoModal.buscarTextoModal);
    app
      .route("/textoModal/:id")
      .put(ControleTextoModal.atualizarTextoModal)
  } // constructor()
}; // class
