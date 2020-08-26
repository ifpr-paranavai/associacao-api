'use strict'

const mongoose = require('mongoose');

class ConnectionFactory {

    static async getConnection() {
        let url;
        let options = {
            keepAlive: 1,
            useNewUrlParser: true,
            connectTimeoutMS: 30000,
            useCreateIndex: true,
            useUnifiedTopology: true

        };

        if (!global.config.db.username && !global.config.db.password) url = `mongodb://${global.config.db.url}/${global.config.db.name}`
        else url = `mongodb://${global.config.db.username}:${global.config.db.password}@${global.config.db.url}/${global.config.db.name}`

        return mongoose.connect(url, options);
    }
}

module.exports = ConnectionFactory;
