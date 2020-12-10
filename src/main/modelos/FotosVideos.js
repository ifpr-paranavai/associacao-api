"use strict";

const Mongoose = require("mongoose");


module.exports = class FotosVideos extends Mongoose.Schema {

    constructor() {

        super({
            imagem:{
                src: String,
                alt: String,
            },
            video:{
                src: String,
                alt: String,
            },         
        });
        Mongoose.model("FotosVideos", this);
    } // constructor()
} // class