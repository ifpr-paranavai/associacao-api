"use strict";
const AccessControl = require("../middlewares/AccessControl");

const ControleAssociados = require("../controle/ControleAssociados");
const access = new AccessControl('Associado');
const accessDiretoria = new AccessControl('Diretoria');

module.exports = class RotaAssociados {
    constructor(app) {
        app.route("/associados")
            .get(accessDiretoria.verify, ControleAssociados.listarTodos)
            .post(accessDiretoria.verify, ControleAssociados.criarAssociado)
            .put(accessDiretoria.verify, ControleAssociados.atualizar)
        
        app.route("/associados/:_id").delete(accessDiretoria.verify, ControleAssociados.excluir);

        app.route("/associados/:id").get(ControleAssociados.buscarPorId);

        app.get("/associados/actives", ControleAssociados.buscarAtivos);
    
        app.post("/login" , ControleAssociados.login);

        app.post("/cadastrar" , ControleAssociados.cadastrar);



    } // constructor()

} // class