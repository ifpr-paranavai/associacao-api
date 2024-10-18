"use strict";

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../conexao/FabricaConexaoMysql');

class Foto extends Model { }

Foto.init({
        titulo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        conteudo: {
            type: DataTypes.BLOB,
            allowNull: true,
        },
        classificado_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: "classificado_id",
            references: {
              model: 'classificados',
              key: 'id',
            }
          }
    },
    {
        sequelize,
        modelName: 'foto',
        tableName: 'fotos',
});

Foto.associate = (models) => {
    Foto.belongsTo(models.Classificado, { 
        foreignKey: 'classificado_id' 
    });
};          

module.exports = Foto;