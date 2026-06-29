# denuncia.esfer.com.br

Sistema de denúncias para a Esfera. Permite que usuários registrem denúncias de forma anônima ou identificada, gerando um protocolo único para cada denúncia.

## 🚀 Funcionalidades

- ✅ Registrar denúncias com categorias e setores
- ✅ Gerar protocolo único (ESF-XXXXX)
- ✅ Consultar denúncias pelo protocolo
- ✅ Opção de denúncia anônima
- ⏳ Integração com banco de dados (em desenvolvimento)

## 📋 Requisitos

- Node.js 14+
- npm ou yarn

## 🔧 Instalação

```bash
# Clonar o repositório
git clone https://github.com/diego2607henrique-wq/denuncia.esfer.com.br.git
cd denuncia.esfer.com.br

# Instalar dependências
npm install
```

## ▶️ Como executar

```bash
# Ambiente de desenvolvimento (com nodemon)
npm run dev

# Produção
npm start
```

## 📚 API Endpoints

### Criar Denúncia
```http
POST /api/denuncias
Content-Type: application/json

{
  "categoria": "Corrupção",
  "descricao": "Descrição da denúncia",
  "setor": "TI",
  "anonimo": true
}
```

**Resposta:**
```json
{
  "mensagem": "Denúncia registrada com sucesso",
  "protocolo": "ESF-a1b2c3d4"
}
```

### Consultar Denúncia
```http
GET /api/denuncias/:protocolo
```

**Resposta:**
```json
{
  "protocolo": "ESF-a1b2c3d4",
  "categoria": "Corrupção",
  "descricao": "Descrição da denúncia",
  "setor": "TI",
  "data_envio": "2026-06-29T14:30:36.000Z",
  "status": "Recebida",
  "anonimo": true
}
```

## 🗂️ Estrutura do Projeto

```
denuncia.esfer.com.br/
├── controllers/
│   └── denunciaController.js
├── routes/
│   └── denuncias.js (em desenvolvimento)
├── index.js (em desenvolvimento)
├── package.json
├── .gitignore
└── README.md
```

## 📝 TODO

- [ ] Criar arquivo principal (index.js)
- [ ] Implementar rotas REST
- [ ] Integrar com banco de dados real
- [ ] Adicionar validação de dados
- [ ] Implementar autenticação
- [ ] Adicionar testes unitários
- [ ] Implementar frontend

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.
