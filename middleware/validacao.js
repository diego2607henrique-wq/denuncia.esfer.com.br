// Validação de dados de entrada
function validarDenuncia(dados) {
  const erros = [];

  // Validar categoria
  if (!dados.categoria || typeof dados.categoria !== "string" || dados.categoria.trim() === "") {
    erros.push("Categoria é obrigatória");
  }

  // Validar descrição
  if (!dados.descricao || typeof dados.descricao !== "string" || dados.descricao.trim() === "") {
    erros.push("Descrição é obrigatória");
  } else if (dados.descricao.length < 10) {
    erros.push("Descrição deve ter no mínimo 10 caracteres");
  } else if (dados.descricao.length > 5000) {
    erros.push("Descrição não pode exceder 5000 caracteres");
  }

  // Validar setor
  if (!dados.setor || typeof dados.setor !== "string" || dados.setor.trim() === "") {
    erros.push("Setor é obrigatório");
  }

  // Validar anonimato (booleano)
  if (typeof dados.anonimo !== "boolean") {
    erros.push("Campo 'anônimo' deve ser verdadeiro ou falso");
  }

  return erros;
}

module.exports = {
  validarDenuncia
};
