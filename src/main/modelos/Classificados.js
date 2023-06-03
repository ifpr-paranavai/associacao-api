"use strict";

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../conexao/FabricaConexaoMysql');

Classificados.init({
        titulo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descricao: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imagem: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        preco: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        contato: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        usuario: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }
        , {
            sequelize,
            modelName: 'classificados'
        });

module.exports = Classificados;
