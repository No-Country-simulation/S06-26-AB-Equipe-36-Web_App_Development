// client/src/areasAtuacao.ts
export interface AreasAtuacaoEstrutura {
  [area: string]: string[];
}

// Escopo focado exclusivamente em carreiras de Tecnologia (Requisito do MVP)
export const AREAS_ATUACAO_DATA: AreasAtuacaoEstrutura = {
  "Desenvolvimento e Design": [
    "Desenvolvimento Front-end",
    "UI/UX e Product Design",
    "Desenvolvimento Back-end",
    "Desenvolvimento Full-stack",
    "Desenvolvimento Mobile"
  ],
  "Dados e Inteligência Artificial": [
    "Engenharia de Dados",
    "Ciência de Dados",
    "Machine Learning / IA",
    "Business Intelligence"
  ],
  "Infraestrutura e Nuvem": [
    "Cloud Computing",
    "DevOps e SRE",
    "Cibersegurança",
    "Suporte Técnico e Redes"
  ],
  "Gestão e Agilidade": [
    "Product Management",
    "Scrum Master / Agile Coach",
    "Análise de Requisitos"
  ]
};

export const getListaAreas = (): string[] => {
  return Object.keys(AREAS_ATUACAO_DATA);
};

export const getAtuacoesPorArea = (areaSelecionada: string): string[] => {
  if (!areaSelecionada) return [];
  return AREAS_ATUACAO_DATA[areaSelecionada] || [];
};