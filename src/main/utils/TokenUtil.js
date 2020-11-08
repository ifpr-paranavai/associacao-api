require('./../../../config');

const {verify, sign } = require('jsonwebtoken');

class TokenUtil{
    static genereteToken(user){
        return sign({ user }, global.config.jwt.secret, { expiresIn: global.config.jwt.expiresIn });
    }
    static decodeToken(token){
        return verify(token, global.config.jwt.secret);
    }
}

module.exports = TokenUtil;