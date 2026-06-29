const { v4: uuidv4 } = require("uuid");

let denuncias = []; // (depois vira banco real)

function gerarProtocolo() {
  return "ESF-" + uuidv4().split("-")[0].toUpperCase();
}

exports.criarDenuncia = (req, res) => {
  const nova = {
    protocolo: gerarProtocolo(),
    categoria: req.body.categoria,
    descricao: req.body.descricao,
    setor: req.body.setor,
    data_envio: new Date(),
    status: "Recebida",
    anonimo: req.body.anonimo
  };

  denuncias.push(nova);

  res.json({
    mensagem: "Denúncia registrada com sucesso",
    protocolo: nova.protocolo
  });
};

exports.consultarDenuncia = (req, res) => {
  const denuncia = denuncias.find(d => d.protocolo === req.params.protocolo);

  if (!denuncia) {
    return res.status(404).json({ erro: "Protocolo não encontrado" });
  }

  res.json(denuncia);
};