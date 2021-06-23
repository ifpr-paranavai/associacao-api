'use strict'

const fs = require('fs');
const path = require('path');
const basename = path.basename(module.filename);

class Loader {

    static loadAll(app) {
        Loader.loadModels();
        Loader.loadRoutes(app);
        // Loader.loadSeeders();
    }

    static loadRoutes(app) {
        let baseDir = (__dirname + '/src/main/rotas');
        fs
            .readdirSync(path.join(baseDir))
            .filter(function (file) {
                return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
            })
            .forEach(function (file) {
                global.logger.info(`Carregando rotas: ${file}`)
                let route = require((path.join(baseDir, file)));
                new route(app);
            });
    }

    static loadModels() {
        let baseDir = (__dirname + '/src/main/modelos');
        fs
            .readdirSync(baseDir)
            .filter(function (file) {
                return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
            })
            .forEach(function (file) {
                global.logger.info(`Carregando modelos: ${file}`);
                let model = require((path.join(baseDir, file)));
                new model();
            });
    }

    // static loadSeeders() {
    //     let baseDir = (__dirname + '/src/main/seeders');
    //     fs
    //         .readdirSync(baseDir)
    //         .filter(function (file) {
    //             return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    //         })
    //         .forEach(function (file) {
    //           if (file !== 'index.js') {
    //             return
    //           }
    //           global.logger.info(`Carregando seeders: ${file}`);
    //           let seeder = require((path.join(baseDir, file)));
    //           seeder();
    //         });
    // }

}

module.exports = Loader;
