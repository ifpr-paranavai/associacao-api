const { decodeToken } = require('../utils/TokenUtil');

const AssociateService = require("../services/AssociateService");
const { json } = require('body-parser');

class AccessControl {
    constructor (entity){
        const target = entity;
        this.verify = async (req, res, next) =>{
            const token = req.headers['x-access-token'];
            if(!token) return res.status(400).send('Token não fornecido');

            try {
                const {user} = decodeToken(token);
                
                if(!user || !user._id) 
                    return res.status(401).send('Acesso não autorizado: Token inválido');
                
                const { role } = await AssociateService.findOne({id: user._id})

                if(!role)
                    return res.status(401).send('Acesso não autorizado');

                if(target === role || role === 'Diretoria') next()
                else return res.status(401).send('Acesso não autorizado');
                
            } catch (error) {
                res.status(500).send('Falha no servidor');
                global.logger.error(
                    `AccessControl: erro ao verificar o token: ${error.message}`
                )
            }
        }
    }
}
module.exports = AccessControl;