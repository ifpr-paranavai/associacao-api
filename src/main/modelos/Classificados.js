"use strict";

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../conexao/FabricaConexaoMysql');

class Classificado extends Model { }

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
        },
    }
        , {
            sequelize,
            modelName: 'classificado'
        });

module.exports = Classificado;
