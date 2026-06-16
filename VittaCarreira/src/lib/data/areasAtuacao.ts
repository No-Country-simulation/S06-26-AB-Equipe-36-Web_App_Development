// areasAtuacao.ts

export interface AreasAtuacaoEstrutura {
  [area: string]: string[];
}

export const AREAS_ATUACAO_DATA: AreasAtuacaoEstrutura = {
  "Tecnologia e TI": [
    "Desenvolvimento Back-end",
    "Desenvolvimento Front-end",
    "Desenvolvimento Full-stack",
    "Desenvolvimento Mobile",
    "DevOps e Infraestrutura",
    "Engenharia de Dados",
    "Inteligência Artificial e ML",
    "Cibersegurança",
    "Suporte Técnico e Redes"
  ],
  "Saúde e Bem-Estar": [
    "Medicina",
    "Enfermagem",
    "Fisioterapia",
    "Psicologia Clínica",
    "Nutrição",
    "Educação Física / Personal Trainer",
    "Odontologia",
    "Farmácia",
    "Estética e Cosmetologia"
  ],
  "Marketing e Comunicação": [
    "Growth Marketing",
    "Social Media e Conteúdo",
    "Gestão de Tráfego Pago",
    "SEO e Marketing de Conteúdo",
    "Copywriting",
    "Relações Públicas",
    "Assessoria de Imprensa",
    "Branding e Posicionamento"
  ],
  "Artes, Design e Audiovisual": [
    "UI/UX Design",
    "Design Gráfico",
    "Motion Design e Animação",
    "Fotografia",
    "Edição de Vídeo",
    "Ilustração Digital",
    "Produção Musical e Áudio",
    "Direção de Arte"
  ],
  "Arquitetura, Engenharia e Construção": [
    "Arquitetura de Interiores",
    "Projetos Residenciais/Comerciais",
    "Engenharia Civil",
    "Engenharia Elétrica / Mecânica",
    "Paisagismo",
    "Desenho Técnico e BIM",
    "Gestão de Obras"
  ],
  "Gastronomia e Culinária": [
    "Chef de Cozinha",
    "Confeitaria e Panificação",
    "Cozinheiro Geral",
    "Consultoria Gastronômica",
    "Barman / Bartender",
    "Sommelier",
    "Gestão de Restaurantes"
  ],
  "Negócios, Vendas e Operações": [
    "Vendas / Comercial",
    "Customer Success e Atendimento",
    "Recursos Humanos e DP",
    "Gestão Financeira e Contabilidade",
    "Administração Geral",
    "Gestão de Projetos"
  ],
  "Freelancer e Serviços Autônomos": [
    "Assistente Virtual",
    "Tradução e Transcrição",
    "Consultoria Independente",
    "Redação Freelancer",
    "Gestão de Ecommerce / Dropshipping"
  ],
  "Educação e Treinamentos": [
    "Ensino de Idiomas",
    "Professor Particular / Tutoria",
    "Produção de Infoprodutos",
    "Treinamento Corporativo",
    "Pedagogia"
  ]
};

// Retorna todas as categorias principais (TI, Saúde, etc.)
export const getListaAreas = (): string[] => {
  return Object.keys(AREAS_ATUACAO_DATA);
};

// Retorna as atuações de uma área específica com fallback seguro para array vazio
export const getAtuacoesPorArea = (areaSelecionada: string): string[] => {
  if (!areaSelecionada) return [];
  return AREAS_ATUACAO_DATA[areaSelecionada] || [];
};