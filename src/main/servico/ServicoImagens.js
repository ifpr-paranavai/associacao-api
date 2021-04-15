const fs = require('fs')
module.exports = class ServicoImagens {

    static async existeImagem(relativePath) {
        try {
            if (fs.existsSync(relativePath))
                return true
            return false
        } catch (error) {
            throw new Error("ServicoImagens.getImagem: " + error);
        }
    } // getImagem()
}