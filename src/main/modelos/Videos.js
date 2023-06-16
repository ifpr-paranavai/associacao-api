"use strict";

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../conexao/FabricaConexaoMysql');

class Video extends Model { }

Video.init({
        titulo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }
        , {
            sequelize,
            modelName: 'video'
        });

module.exports = Video;