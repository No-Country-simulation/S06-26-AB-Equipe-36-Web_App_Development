import dados from "@/lib/data/saudeDashboard.json";

const COR_HUMOR: Record<string, string> = {
  feliz:          "text-orange-100",    // Creme clarinho
  ansioso:        "text-yellow-100/55", // Amarelo Baunilha Pastel com opacidade fixa em 55% (Super elegante!)
  cansado:        "text-blue-300",      // Neutro de descanso
  triste:         "text-blue-400",
  sobrecarregado: "text-rose-400",     // Vinho suave
};

const BG_TIPO: Record<string, string> = {
  alerta:   "border-yellow-100/30 bg-yellow-100/5",   // Caixa de aviso discreta
  positivo: "border-orange-100/20 bg-orange-100/4",  // Creme claro para destaques
  dica:     "border-accent/40 bg-accent/6",          // Mantém o teu rosa antigo elegante original
};

const MAX_PONTUACAO = 100;

function BarraProgresso({ valor, max = MAX_PONTUACAO, cor = "bg-accent" }: {
  valor: number; max?: number; cor?: string;
}) {
  const pct = Math.min(100, Math.round((valor / max) * 100));
  return (
    <div className="h-2 w-full rounded-full bg-white/10">
      <div
        className={`h-full rounded-full ${cor} transition-all duration-700`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export default function SaudeDashboard() {
  const { resumoSemana, checkIns, insights, historicoPontuacao } = dados;
  const pontuacao = resumoSemana.pontuacaoBemEstar;
  
  // Cores aplicadas ao Índice Principal (Número e Barra horizontal)
  // Ajustado o texto para /55 e a barra para /55 para uma consistência perfeita na página
  const corPontuacao =
    pontuacao >= 70 ? "text-orange-100" : pontuacao >= 45 ? "text-yellow-100/55" : "text-rose-500";

  const corBarraComponente = 
    pontuacao >= 70 ? "bg-orange-100" : pontuacao >= 45 ? "bg-yellow-100/55" : "bg-rose-900/80";

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
            <p className={`text-[2rem] font-bold ${corPontuacao}`}>{pontuacao}</p>
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
            <span className={`font-sans text-sm font-bold ${corPontuacao}`}>
              {pontuacao}/{MAX_PONTUACAO}
            </span>
          </div>
          <BarraProgresso
            valor={pontuacao}
            cor={corBarraComponente}
          />
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
              
              // Modificado: O estado médio agora aplica o Amarelo Pastel a 55% de opacidade (bg-yellow-100/55)
              const cor = s.pontuacao >= 75 
                  ? "bg-orange-100"        // Bom/Ótimo: Creme Iluminado
                  : s.pontuacao >= 45 
                  ? "bg-yellow-100/55"    // Regular/Atenção: Baunilha Pastel translúcido a 55%
                  : "bg-rose-900/80";     // Crítico: Vinho / Bordô profundo
              
              return (
                <div key={s.semana} className="flex flex-1 flex-col items-center gap-1">
                  <span className="font-sans text-[0.7rem] text-foreground-muted">{s.pontuacao}</span>
                  <div
                    className={`w-full rounded-t-md ${cor} transition-all duration-700`}
                    style={{ height: `${altura}px` }}
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