"use strict";

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../conexao/FabricaConexaoMysql');

class Eventos extends Model { }

Eventos.init({
  titulo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  descricao: {
    type: DataTypes.STRING(5000),
    allowNull: true,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  local: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  data_inicio: {
    type: DataTypes.DATE,
    allowNull: true
  },
  data_fim: {
    type: DataTypes.DATE,
    allowNull: true
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
}
  , {
    sequelize,
    modelName: 'eventos'
  });

module.exports = Eventos;
