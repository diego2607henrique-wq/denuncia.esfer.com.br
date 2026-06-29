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

  res.status(201).json({
    mensagem: "Denúncia registrada com sucesso",
    protocolo: nova.protocolo,
    data_envio: nova.data_envio
  });
};

exports.consultarDenuncia = (req, res) => {
  const denuncia = denuncias.find(d => d.protocolo === req.params.protocolo);

  if (!denuncia) {
    return res.status(404).json({ 
      erro: "Protocolo não encontrado",
      protocolo: req.params.protocolo
    });
  }

  res.json(denuncia);
};

exports.listarDenuncias = (req, res) => {
  res.json({
    total: denuncias.length,
    denuncias: denuncias
  });
};

exports.atualizarStatus = (req, res) => {
  const denuncia = denuncias.find(d => d.protocolo === req.params.protocolo);

  if (!denuncia) {
    return res.status(404).json({ 
      erro: "Protocolo não encontrado"
    });
  }

  const statusValidos = ["Recebida", "Em análise", "Resolvida", "Rejeitada"];
  
  if (!statusValidos.includes(req.body.status)) {
    return res.status(400).json({
      erro: "Status inválido",
      statusValidos: statusValidos
    });
  }

  denuncia.status = req.body.status;
  denuncia.data_atualizacao = new Date();

  res.json({
    mensagem: "Status atualizado com sucesso",
    denuncia: denuncia
  });
};