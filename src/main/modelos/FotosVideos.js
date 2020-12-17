"use strict";

const Mongoose = require("mongoose");


module.exports = class FotosVideos extends Mongoose.Schema {

    constructor() {

        super({
                src: String,
                alt: String,
                tipo: String
    
                 
        });
        Mongoose.model("FotosVideos", this);
    } // constructor()
} // class