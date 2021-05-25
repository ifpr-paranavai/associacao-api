const { jwt } = require('./../../../configuracoes.json');

const { verify, sign } = require('jsonwebtoken');

class TokenUtil {
    static async genereteToken(associado) {
        return sign({ associado }, jwt.secret, { expiresIn: jwt.expiresIn });
    }
    static decodeToken(token) {
        const [_, tokenWithoutBearer] = token.split('Bearer').map(text => text.trim());
        return verify(tokenWithoutBearer, jwt.secret);
    }
}

module.exports = TokenUtil;