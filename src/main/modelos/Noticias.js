"use strict";

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../conexao/FabricaConexaoMysql');

class Noticias extends Model { }

Noticias.init({
  srcImagem: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_inicio: {
    type: DataTypes.DATE,
    allowNull: false
  },
}
  , {
    sequelize,
    modelName: 'noticias'
  });

module.exports = Noticias;