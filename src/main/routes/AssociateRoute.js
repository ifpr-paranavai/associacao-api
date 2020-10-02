"use strict";
const AssociateController = require("../controllers/AssociateController");
module.exports = class AssociateRoute {
    constructor(app) {
        app.route("/associates")
            .get(AssociateController.getList)
            .get(AssociateController.getMany)
            .get(AssociateController.getManyReference)
            .post(AssociateController.create)
        
        app.route("/associates/:id")
            .get(AssociateController.getOne)
            .put(AssociateController.update)
            .delete(AssociateController.delete);

        app.get("/associates/actives", AssociateController.findAllActives);
    } // constructor()

} // class