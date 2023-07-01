"use strict";

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../conexao/FabricaConexaoMysql');

class Ata extends Model { }

Ata.init({
        titulo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descricao: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }
        , {
            sequelize,
            modelName: 'ata'
        });

module.exports = Ata;