const ServicoConfiguracoes = require("../servico/ServicoConfiguracoes");

const {verify, sign } = require('jsonwebtoken');

class TokenUtil{
    static async genereteToken(user) {
        let jwt = await (ServicoConfiguracoes.obterDados()).jwt
        return sign({ user }, jwt.secret, { expiresIn: jwt.expiresIn });
    }
    static decodeToken(token){
        return verify(token, jwt.secret);
    }
}

module.exports = TokenUtil;