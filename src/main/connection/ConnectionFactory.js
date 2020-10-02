'use strict'



const mongoose = require('mongoose');
const plugin = require('../plugins/PluginMongoose')

mongoose.plugin(plugin)

class ConnectionFactory {

    static async getConnection() {
        let url;
        let options = {
            keepAlive: 1,
            useNewUrlParser: true,
            connectTimeoutMS: 30000,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        };

        if (!global.config.db.username && !global.config.db.password) url = `mongodb://${global.config.db.url}/${global.config.db.name}`
        else url = `mongodb://${global.config.db.username}:${global.config.db.password}@${global.config.db.url}/${global.config.db.name}`

        return mongoose.connect(url, options);
    }
}

module.exports = ConnectionFactory;
