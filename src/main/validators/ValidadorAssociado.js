const StringUtil = require('../utils/StringUtil');

class ValidadorAssociado {
  login(req, res, next) {
    const data = req.body;

    if (!data.email || !data.senha) {
      return res.status(400).send('E-mail e Senha devem ser informados!');
    }

    return next();
  }

  create(req, res, next) {
    const data = req.body;
    const stringUtil = new StringUtil();

    if (data.email === data.email_alternativo) {
      return res.status(400).send('Os emails não podem ser iguais');
    }
    if (!data.cpf || !stringUtil.isValidCPF(data.cpf)) {
      return res.status(400).send('O CPF informado é inválido');
    }

    return next();
  }

  update(req, res, next) {
    const data = req.body;
    const stringUtil = new StringUtil();

    if (!data._id) {
      return res.status(400).send('O identificador do associado não foi informado');
    }
    if (data.email === data.email_alternativo) {
      return res.status(400).send('Os emails não podem ser iguais');
    }
    if (!data.cpf || !stringUtil.isValidCPF(data.cpf)) {
      return res.status(400).send('O CPF informado é inválido');
    }

    return next();
  }

  delete(req, res, next) {
    const data = req.params;

    if (!data._id) {
      return res.status(400).send('O identificador do associado não foi informado');
    }

    return next();
  }
}

module.exports = ValidadorAssociado;
