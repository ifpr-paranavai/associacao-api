"use strict";

const Mongoose = require('mongoose');
const faker = require('faker');
const Associado = Mongoose.model('Associado');


module.exports = class SeederAssociado {
  gerarAssociado() {
    return {
      id: faker.datatype.uuid(),
      nome: faker.name.findName(),
      email: faker.internet.email(),
      perfil: 'Associado',
      modalidade: 'aeromodelismo',
      imagem:{
        src: faker.internet.avatar(),
        alt: '',
      },
      endereco:{
        cep: faker.address.zipCode(),
        estado: faker.address.state(),
        cidade: faker.address.cityName(),
        rua: faker.address.streetName(),
        numero: Math.random(),
        bairro: faker.address.country(),
      },
      tel_celular:{
        numero: faker.phone.phoneNumber(),
        whatsapp: false,
      },
      data_nascimento: faker.datatype.datetime(),
      cpf: Math.random(),
      rg: Math.random(),
      senha: faker.internet.password(),
      ativo: false,
    };
  }

  async seed() {
    try {
      const promises = []
      for (let i = 0; i < 20; i++) {
        const data = this.gerarAssociado();
        promises.push(Associado.create(data));
      }
      return await Promise.all(promises);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
