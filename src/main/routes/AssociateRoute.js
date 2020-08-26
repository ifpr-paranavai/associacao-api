"use strict";

const AssociateController = require("../controllers/AssociateController");
module.exports = class AssociateRoute {
    constructor(app) {
        app.route("/associates")
            .get(AssociateController.getAll)
            .post(AssociateController.create)
            .put(AssociateController.update)
            .delete(AssociateController.remove);
    } // constructor()

} // class