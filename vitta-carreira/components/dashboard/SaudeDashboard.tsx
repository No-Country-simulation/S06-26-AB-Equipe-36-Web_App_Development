import dados from "@/lib/data/saudeDashboard.json";

// Função matemática original que gera o degradê suave baseado puramente em tons ricos de café
function saudeParaCor(valor: number): string {
  const v = Math.min(100, Math.max(0, valor));
  
  if (v < 40) {
    // Nota Baixa: Café Espresso forte, profundo e discreto
    const t = v / 40;
    const r = Math.round(50 + t * (100 - 50));
    const g = Math.round(30 + t * (65 - 30));
    const b = Math.round(15 + t * (35 - 15));
    return `rgb(${r},${g},${b})`;
  } else if (v < 70) {
    // Nota Média: Caramelo → Grão de café torrado médio
    const t = (v - 40) / 30;
    const r = Math.round(100 + t * (180 - 100));
    const g = Math.round(65 + t * (140 - 65));
    const b = Math.round(35 + t * (90 - 35));
    return `rgb(${r},${g},${b})`;
  } else {
    // Nota Alta: Transição para o Creme / Leite Vaporizado bem clarinho e iluminado
    const t = (v - 70) / 30;
    const r = Math.round(180 + t * (240 - 180));
    const g = Math.round(140 + t * (230 - 140));
    const b = Math.round(90 + t * (215 - 90));
    return `rgb(${r},${g},${b})`;
  }
}

// Mapeamentos estáticos adaptados para tons de café correspondentes
const COR_HUMOR: Record<string, string> = {
  feliz:          "text-[rgb(240,230,215)]", // Creme
  ansioso:        "text-[rgb(156,107,58)]",  // Caramelo
  cansado:        "text-blue-300",           // Neutro de descanso
  triste:         "text-blue-400",
  sobrecarregado: "text-[rgb(70,45,25)]",    // Café Escuro
};

const BG_TIPO: Record<string, string> = {
  alerta:   "border-[rgb(156,107,58)]/30 bg-[rgb(156,107,58)]/5", // Avisos em Caramelo
  positivo: "border-[rgb(240,230,215)]/20 bg-[rgb(240,230,215)]/4", // Destaques em Creme
  dica:     "border-accent/40 bg-accent/6",                       // Mantém o rosa antigo do projeto
};

const MAX_PONTUACAO = 100;

function BarraProgresso({ valor, max = MAX_PONTUACAO, cor }: {
  valor: number; max?: number; cor?: string;
}) {
  const pct = Math.min(100, Math.round((valor / max) * 100));
  return (
    <div className="h-2 w-full rounded-full bg-white/10">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ 
          width: `${pct}%`,
          backgroundColor: cor || saudeParaCor(valor) // Se não passar cor fixa, usa a matemática do café
        }}
      />
    </div>
  );
}

export default function SaudeDashboard() {
  const { resumoSemana, checkIns, insights, historicoPontuacao } = dados;
  const pontuacao = resumoSemana.pontuacaoBemEstar;
  
  const corDinamicaEstilo = saudeParaCor(pontuacao);

  return (
    <div className="relative z-10 min-h-screen text-foreground">
      <div className="mx-auto max-w-4xl px-6 py-10">

        {/* cabeçalho */}
        <div className="mb-8">
          <p className="text-eyebrow">Vitta Carreira</p>
          <h1 className="text-display mt-1 text-[clamp(1.6rem,4vw,2.2rem)]">
            Dashboard de Saúde Mental
          </h1>
        </div>

        {/* cards de resumo */}
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="feature-card text-center">
            {/* O número agora recebe a cor exata do café calculada dinamicamente */}
            <p className="text-[2rem] font-bold" style={{ color: corDinamicaEstilo }}>{pontuacao}</p>
            <p className="field-label mt-1 text-center">Bem-estar</p>
          </div>
          <div className="feature-card text-center">
            <p className="text-[2rem] font-bold text-foreground">{resumoSemana.diasAtivos}</p>
            <p className="field-label mt-1 text-center">Dias ativos</p>
          </div>
          <div className="feature-card text-center">
            <p className="text-[2rem] font-bold text-accent">{resumoSemana.sequenciaAtual}</p>
            <p className="field-label mt-1 text-center">Sequência 🔥</p>
          </div>
          <div className="feature-card text-center">
            <p className="text-[1.6rem]">
              {checkIns.find((c) => c.humor === resumoSemana.humorPredominante)?.emoji ?? "😊"}
            </p>
            <p className="field-label mt-1 text-center">Humor + comum</p>
          </div>
        </div>

        {/* pontuação de bem-estar com barra */}
        <div className="feature-card mb-6">
          <div className="mb-3 flex items-center justify-between">
            <span className="field-label">Índice de bem-estar da semana</span>
            <span className="font-sans text-sm font-bold" style={{ color: corDinamicaEstilo }}>
              {pontuacao}/{MAX_PONTUACAO}
            </span>
          </div>
          <BarraProgresso valor={pontuacao} />
        </div>

        {/* check-ins da semana */}
        <div className="feature-card mb-6">
          <p className="field-label mb-4">Check-ins dos últimos 7 dias</p>
          <div className="flex items-end justify-between gap-2">
            {checkIns.map((c) => (
              <div key={c.data} className="flex flex-1 flex-col items-center gap-1">
                <span
                  title={c.label}
                  className={`text-[1.3rem] transition-transform hover:scale-125 ${COR_HUMOR[c.humor] ?? ""}`}
                >
                  {c.emoji}
                </span>
                <span className="font-sans text-[0.6rem] text-foreground-muted">
                  {new Date(c.data + "T12:00:00").toLocaleDateString("pt-BR", {
                    weekday: "short",
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* histórico de pontuação por semana (Evolução Mensal) */}
        <div className="feature-card mb-6">
          <p className="field-label mb-4">Evolução mensal</p>
          <div className="flex items-end gap-3">
            {historicoPontuacao.map((s) => {
              const altura = Math.max(8, Math.round((s.pontuacao / MAX_PONTUACAO) * 96));
              
              return (
                <div key={s.semana} className="flex flex-1 flex-col items-center gap-1">
                  <span className="font-sans text-[0.7rem] text-foreground-muted">{s.pontuacao}</span>
                  <div
                    className="w-full rounded-t-md transition-all duration-700"
                    style={{ 
                      height: `${altura}px`,
                      backgroundColor: saudeParaCor(s.pontuacao) // Cada barra do gráfico gera a sua cor de café correspondente
                    }}
                  />
                  <span className="font-sans text-[0.7rem] text-foreground-muted">{s.semana}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* insights */}
        <div>
          <p className="field-label mb-4">Insights da semana</p>
          <div className="flex flex-col gap-3">
            {insights.map((ins) => (
              <div
                key={ins.id}
                className={`rounded-xl border p-4 ${BG_TIPO[ins.tipo] ?? "border-foreground-muted/20 bg-white/4"}`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-[1.2rem]">{ins.emoji}</span>
                  <div>
                    <p className="font-sans text-sm font-bold text-foreground">{ins.titulo}</p>
                    <p className="mt-1 font-sans text-sm text-foreground-muted">{ins.descricao}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}