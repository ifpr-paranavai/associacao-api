"use strict";

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../conexao/FabricaConexaoMysql');

class Noticias extends Model { }

Noticias.init({
  titulo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  data_inicio: {
    type: DataTypes.DATE,
    allowNull: true
  },
}
  , {
    sequelize,
    modelName: 'noticias'
  });

module.exports = Noticias;