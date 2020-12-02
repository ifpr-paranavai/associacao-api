"use strict";
const AccessControl = require("../middlewares/AccessControl");

const AssociateController = require("../controllers/AssociateController");
const access = new AccessControl('Associado')
const accessDiretoria = new AccessControl('Diretoria')

module.exports = class AssociateRoute {
    constructor(app) {
        app.route("/associates")
            .get(AssociateController.getList)
            .post(AssociateController.create)
        
        app.route("/associates/:id")
            .get(AssociateController.getOne)
            .put(AssociateController.update)
            .delete(AssociateController.delete);

        app.get("/associates/actives", AssociateController.findAllActives);
    } // constructor()

} // class