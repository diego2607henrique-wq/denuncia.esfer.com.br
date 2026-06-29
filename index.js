const express = require("express");
const denunciaController = require("./controllers/denunciaController");
const { validarDenuncia } = require("./middleware/validacao");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Middleware de validação para POST
app.use("/api/denuncias", (req, res, next) => {
  if (req.method === "POST") {
    const erros = validarDenuncia(req.body);
    if (erros.length > 0) {
      return res.status(400).json({
        erro: "Dados inválidos",
        detalhes: erros
      });
    }
  }
  next();
});

// Rotas
app.use("/api/denuncias", require("./routes/denuncias"));

// Health check
app.get("/", (req, res) => {
  res.json({
    mensagem: "Servidor de denúncias está funcionando",
    versao: "1.0.0",
    status: "online"
  });
});

// Tratamento de rotas não encontradas
app.use((req, res) => {
  res.status(404).json({
    erro: "Rota não encontrada",
    caminho: req.path,
    metodo: req.method
  });
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    erro: "Erro interno do servidor",
    mensagem: err.message
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
  console.log(`📝 Sistema de denúncias ativo`);
});

module.exports = app;