"use strict";

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../conexao/FabricaConexaoMysql');

class Associado extends Model { }

Associado.init({
  numero: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bairro: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rua: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cep: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tel_celular: {
    type: DataTypes.STRING,
    allowNull: true
  },
  whatsapp:{
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: true
  },
  sobrenome: {
    type: DataTypes.STRING,
    allowNull: true
  },
  data_nascimento: {
    type: DataTypes.DATE,
    allowNull: true
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: true
  },
  rg: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tel_residencial: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tel_comercial: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email_alternativo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  modalidade: {
    type: DataTypes.STRING,
    allowNull: true
  },
  receber_comunicado: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  perfil: {
    type: DataTypes.STRING,
    allowNull: true
  },
  data_cadastro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: true
  }
}
  , {
    sequelize,
    modelName: 'associado'
  });

module.exports = Associado;
