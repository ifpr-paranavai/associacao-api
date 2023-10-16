const { decodeToken } = require('../utils/TokenUtil');

const AssociateService = require("../services/AssociateService");
const { json } = require('body-parser');

class AccessControl {
    constructor (entity){
        const target = entity;
        this.verify = async (req, res, next) =>{
            const token = req.headers.authorization;
            if(!token) return res.status(400).send('Token não fornecido');

            try {
                const { associado } = decodeToken(token);
                console.log(associado)
                if(!associado)
                    return res.status(401).send('Acesso não autorizado: Token inválido');


                if(!associado.perfil)
                    return res.status(401).send('Acesso não autorizado');

                if(associado.perfil === 'ADMIN') next()
                else return res.status(401).send('Acesso não autorizado');

            } catch (error) {
                res.status(500).send('error');
                global.logger.error(
                    `AccessControl: erro ao verificar o token: ${error.message}`
                );
            }
        }
    }
}
module.exports = AccessControl;
