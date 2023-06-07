"use strict";

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../conexao/FabricaConexaoMysql');

class Classificado extends Model { }

Classificado.init({
        titulo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descricao: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        foto_video: {
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
        srcImagem: {
            type: DataTypes.STRING,
            allowNull: true,
          },
    }
        , {
            sequelize,
            modelName: 'classificado'
        });

module.exports = Classificado;
