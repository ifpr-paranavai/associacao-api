const fs = require('fs');
const path = require('path');

const deletaArquivosAntesDosNovos = (req, res, next, dirname) => {
  const caminhoDoDiretorio = path.join(dirname, "../Arquivos/AnexosClassificados");
  const diretorioVaiSerExcluido = 'src/main/Arquivos/AnexosClassificados/';

  if (fs.existsSync(caminhoDoDiretorio)) {
    fs.readdir(caminhoDoDiretorio, (erro, arquivos) => {
      if (erro) {
        console.log("[FileUtil.js] Erro na leitura do diretório:", erro);
        next(erro);
        return;
      }

      const arquivosJaFiltrados = arquivos.filter(arquivo => arquivo !== diretorioVaiSerExcluido);

      // eu preciso deletar todos os arquivos de um diretório antes de apagar
      // ele porque o módulo fs não permite deletar diretórios com arquivos
      arquivosJaFiltrados.forEach(arquivo => {
        const caminhoArquivosExcluidos = path.join(caminhoDoDiretorio, arquivo);
        if (fs.statSync(caminhoArquivosExcluidos).isDirectory()) {
          fs.rmdirSync(caminhoArquivosExcluidos, { recursive: true });
        } else {
          fs.unlinkSync(caminhoArquivosExcluidos);
        }
      });

      fs.mkdir(caminhoDoDiretorio, { recursive: true }, (erro) => {
        if (erro) {
          console.log("[FileUtil.js] Erro na recreação do diretório:", erro);
          next(erro);
          return;
        }
        next();
      });
    });
  } else {
    next();
  }
};

module.exports = {
  deletaArquivosAntesDosNovos
};
