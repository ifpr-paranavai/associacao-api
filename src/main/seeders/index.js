const SeederAssociado = require('./SeederAssociado');

const associadoSeeder = new SeederAssociado();
module.exports = () => associadoSeeder.seed();
