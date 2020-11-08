"use strict";
const AssociateController = require("../controllers/AssociateController");

module.exports = class AssociateRoute {
    constructor(app) {
        app.route("/auth")
            .post(AssociateController.auth)
    } // constructor()

} // class