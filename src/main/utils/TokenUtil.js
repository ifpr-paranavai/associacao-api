const {jwt} = require('./../../../configuracoes.json');

const {verify, sign } = require('jsonwebtoken');

class TokenUtil{
    static async genereteToken(associado) {
        return sign({ associado }, jwt.secret, { expiresIn: jwt.expiresIn });
    }
    static decodeToken(token){
        return verify(token, jwt.secret);
    }
}

module.exports = TokenUtil;