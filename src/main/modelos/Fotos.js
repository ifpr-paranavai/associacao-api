"use strict";

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../conexao/FabricaConexaoMysql');

class Foto extends Model { }

Foto.init({
        titulo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }
        , {
            sequelize,
            modelName: 'foto'
        });

module.exports = Foto;