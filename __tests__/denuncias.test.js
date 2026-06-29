const denunciaController = require("../controllers/denunciaController");
const { validarDenuncia } = require("../middleware/validacao");

describe("Controller de Denúncias", () => {
  let req, res;

  beforeEach(() => {
    // Mock do objeto req (request)
    req = {
      body: {},
      params: {}
    };

    // Mock do objeto res (response)
    res = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis()
    };
  });

  describe("criarDenuncia", () => {
    it("deve criar uma denúncia com dados válidos", () => {
      req.body = {
        categoria: "Corrupção",
        descricao: "Descrição detalhada da denúncia",
        setor: "TI",
        anonimo: true
      };

      denunciaController.criarDenuncia(req, res);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          mensagem: "Denúncia registrada com sucesso",
          protocolo: expect.stringMatching(/^ESF-[A-F0-9]{8}$/)
        })
      );
    });

    it("deve gerar protocolo único para cada denúncia", () => {
      const protocolos = new Set();

      for (let i = 0; i < 5; i++) {
        req.body = {
          categoria: "Teste",
          descricao: "Descrição de teste para protocolo",
          setor: "TI",
          anonimo: false
        };

        denunciaController.criarDenuncia(req, res);
        const protocolo = res.json.mock.calls[i][0].protocolo;
        protocolos.add(protocolo);
      }

      expect(protocolos.size).toBe(5);
    });
  });

  describe("consultarDenuncia", () => {
    it("deve retornar erro 404 para protocolo não encontrado", () => {
      req.params.protocolo = "ESF-INEXISTENTE";

      denunciaController.consultarDenuncia(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          erro: "Protocolo não encontrado"
        })
      );
    });

    it("deve retornar denúncia existente", () => {
      // Primeiro criar uma denúncia
      req.body = {
        categoria: "Teste",
        descricao: "Descrição de teste para consulta",
        setor: "TI",
        anonimo: true
      };

      denunciaController.criarDenuncia(req, res);
      const protocolo = res.json.mock.calls[0][0].protocolo;

      // Depois consultar
      req.params.protocolo = protocolo;
      res.json.mockClear();

      denunciaController.consultarDenuncia(req, res);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          protocolo: protocolo,
          categoria: "Teste",
          setor: "TI",
          anonimo: true
        })
      );
    });
  });
});

describe("Validação de Denúncias", () => {
  it("deve validar categoria obrigatória", () => {
    const erros = validarDenuncia({
      categoria: "",
      descricao: "Descrição válida",
      setor: "TI",
      anonimo: true
    });

    expect(erros).toContain("Categoria é obrigatória");
  });

  it("deve validar descrição mínima", () => {
    const erros = validarDenuncia({
      categoria: "Teste",
      descricao: "Curto",
      setor: "TI",
      anonimo: true
    });

    expect(erros).toContain("Descrição deve ter no mínimo 10 caracteres");
  });

  it("deve validar campo anônimo como booleano", () => {
    const erros = validarDenuncia({
      categoria: "Teste",
      descricao: "Descrição válida",
      setor: "TI",
      anonimo: "sim"
    });

    expect(erros).toContain("Campo 'anônimo' deve ser verdadeiro ou falso");
  });

  it("deve aceitar dados válidos", () => {
    const erros = validarDenuncia({
      categoria: "Corrupção",
      descricao: "Descrição detalhada e válida",
      setor: "TI",
      anonimo: true
    });

    expect(erros.length).toBe(0);
  });
});