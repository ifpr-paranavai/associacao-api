"use strict";
const AccessControl = require("../middlewares/AccessControl");

const ControleAssociados = require("../controle/ControleAssociados");
const access = new AccessControl('Associado')
const accessDiretoria = new AccessControl('Diretoria')

module.exports = class RotaAssociados {
    constructor(app) {
        app.route("/associados")
            .get(ControleAssociados.listarTodos)
            .post(ControleAssociados.criarAssociado)
            .put(ControleAssociados.atualizar)
            .delete(ControleAssociados.excluir);
        
        app.route("/associados/:id")
            .get(ControleAssociados.buscarPorId)

        app.get("/associados/actives", ControleAssociados.buscarAtivos);
    
        app.post("/login" , ControleAssociados.login);
    } // constructor()

} // class