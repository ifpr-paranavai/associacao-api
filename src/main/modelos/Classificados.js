"use strict";
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../conexao/FabricaConexaoMysql');

class Classificado extends Model {
  static associate(models) {
    this.hasMany(models.Foto, { foreignKey: 'classificadoId' });
  }
}

Classificado.init({
  titulo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  contato: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  usuario: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  sequelize,
  modelName: 'classificado',
  tableName: 'classificados'
});

Classificado.associate = (models) => {
  Classificado.hasMany(models.Foto, { 
    as: 'fotos', 
    foreignKey: 'classificado_id' 
  });
};

module.exports = Classificado;