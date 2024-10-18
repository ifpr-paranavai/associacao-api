const ControleClassificados = require("../controle/ControleClassificados");
const multer = require("multer");
const upload = multer({ dest: "src/main/Arquivos/AnexosClassificados/" });

module.exports = class RotaClassificados {
  constructor(app) {
    app
      .route("/classificados")
      .post(ControleClassificados.criarClassificado);
    app
      .route("/classificados-cliente")
      .get(ControleClassificados.buscarClassificadosCliente);
    app
      .route("/classificados-admin")
      .get(ControleClassificados.buscarClassificadosAdmin);
    app
      .route("/classificados/:id")
      .put(ControleClassificados.atualizarClassificado)
      .delete(ControleClassificados.excluirClassificado)
      .get(ControleClassificados.buscarClassificadoPorId);
    app
      .route("/classificados/titulo/:titulo")
      .get(ControleClassificados.buscarClassificadoPorTitulo);
    app
      .route("/classificados/:id/anexo")
      .post(upload.array("anexo"), ControleClassificados.uploadAnexo);
    app
    .route("/classificados/:id/anexo/download")
    .get(ControleClassificados.downloadAnexo);
    app
      .route("/classificados/valor/:valor")
      .get(ControleClassificados.buscarClassificadoPorValor);
  } // constructor()
}; // class
