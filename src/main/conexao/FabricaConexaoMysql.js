'use strict'

const { bancoMysql } = require('./../../../configuracoes.json');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(bancoMysql.nome, bancoMysql.usuario, bancoMysql.senha, {
  host: bancoMysql.url,
  dialect: 'mariadb'
});

module.exports = sequelize;

