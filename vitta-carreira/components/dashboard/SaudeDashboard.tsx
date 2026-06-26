import dados from "@/lib/data/saudeDashboard.json";

// Mapeamento direto e fixo para usar estritamente as tuas 5 cores exatas
function saudeParaCor(valor: number): string {
  const v = Math.min(100, Math.max(0, valor));
  
  if (v <= 20) return "#AD6842"; // Marrom (Crítico)
  if (v <= 45) return "#FFC0AD"; // Rosa (Baixo)
  if (v <= 70) return "#FFE9AB"; // Amarelo (Médio)
  if (v <= 85) return "#BFD8FF"; // Azul (Bom)
  return "#B8D498";              // Verde (Excelente)
}

const COR_HUMOR: Record<string, string> = {
  feliz:          "text-[#B8D498]", // Verde
  ansioso:        "text-[#FFE9AB]", // Amarelo
  cansado:        "text-[#BFD8FF]", // Azul
  triste:         "text-[#FFC0AD]", // Rosa
  sobrecarregado: "text-[#AD6842]", // Marrom
};

const BG_TIPO: Record<string, string> = {
  alerta:   "border-[#FFE9AB]/30 bg-[#FFE9AB]/5",
  positivo: "border-[#B8D498]/25 bg-[#B8D498]/4",
  dica:     "border-[#FFC0AD]/40 bg-[#FFC0AD]/6", // Ajustado para a borda Rosé Pastel
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
          backgroundColor: cor || saudeParaCor(valor)
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
          <p className="text-eyebrow text-foreground">Vitta Carreira</p>
          <h1 className="text-display mt-1 text-[clamp(1.6rem,4vw,2.2rem)] text-foreground">
            Dashboard de Saúde Mental
          </h1>
        </div>

        {/* cards de resumo com todas as letras em Off-White */}
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="feature-card text-center">
            <p className="text-[2rem] font-bold" style={{ color: corDinamicaEstilo }}>{pontuacao}</p>
            <p className="field-label mt-1 text-center text-foreground">Bem-estar</p>
          </div>
          <div className="feature-card text-center">
            <p className="text-[2rem] font-bold text-foreground">{resumoSemana.diasAtivos}</p>
            <p className="field-label mt-1 text-center text-foreground">Dias ativos</p>
          </div>
          
          {/* Card de Sequência: Número com a cor Rosé Pastel (#FFC0AD) bem nítida */}
          <div className="feature-card text-center">
            <p className="text-[2rem] font-bold text-[#FFC0AD]">{resumoSemana.sequenciaAtual}</p>
            <p className="field-label mt-1 text-center text-foreground">Sequência 🔥</p>
          </div>
          
          <div className="feature-card text-center">
            <p className="text-[1.6rem]">
              {checkIns.find((c) => c.humor === resumoSemana.humorPredominante)?.emoji ?? "😊"}
            </p>
            <p className="field-label mt-1 text-center text-foreground">Humor + comum</p>
          </div>
        </div>

        {/* pontuação de bem-estar com barra */}
        <div className="feature-card mb-6">
          <div className="mb-3 flex items-center justify-between">
            <span className="field-label text-foreground">Índice de bem-estar da semana</span>
            <span className="font-sans text-sm font-bold" style={{ color: corDinamicaEstilo }}>
              {pontuacao}/{MAX_PONTUACAO}
            </span>
          </div>
          <BarraProgresso valor={pontuacao} />
        </div>

        {/* check-ins da semana */}
        <div className="feature-card mb-6">
          <p className="field-label mb-4 text-foreground">Check-ins dos últimos 7 dias</p>
          <div className="flex items-end justify-between gap-2">
            {checkIns.map((c) => (
              <div key={c.data} className="flex flex-1 flex-col items-center gap-1">
                <span
                  title={c.label}
                  className={`text-[1.3rem] transition-transform hover:scale-125 ${COR_HUMOR[c.humor] ?? ""}`}
                >
                  {c.emoji}
                </span>
                <span className="font-sans text-[0.6rem] text-foreground">
                  {new Date(c.data + "T12:00:00").toLocaleDateString("pt-BR", {
                    weekday: "short",
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* histórico de pontuação por semana */}
        <div className="feature-card mb-6">
          <p className="field-label mb-4 text-foreground">Evolução mensal</p>
          <div className="flex items-end gap-3">
            {historicoPontuacao.map((s) => {
              const altura = Math.max(8, Math.round((s.pontuacao / MAX_PONTUACAO) * 96));
              
              return (
                <div key={s.semana} className="flex flex-1 flex-col items-center gap-1">
                  <span className="font-sans text-[0.7rem] text-foreground">{s.pontuacao}</span>
                  <div
                    className="w-full rounded-t-md transition-all duration-700"
                    style={{ 
                      height: `${altura}px`,
                      backgroundColor: saudeParaCor(s.pontuacao)
                    }}
                  />
                  <span className="font-sans text-[0.7rem] text-foreground">{s.semana}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* insights */}
        <div>
          <p className="field-label mb-4 text-foreground">Insights da semana</p>
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
                    <p className="mt-1 font-sans text-sm text-foreground">{ins.descricao}</p>
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