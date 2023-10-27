"use strict";

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../conexao/FabricaConexaoMysql');

class TextoModal extends Model { }

TextoModal.init({
        titulo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        corpo: {
            type: DataTypes.STRING(6000),
            allowNull: true,
        },
    }
        , {
            sequelize,
            modelName: 'textoModal'
        });

module.exports = TextoModal;