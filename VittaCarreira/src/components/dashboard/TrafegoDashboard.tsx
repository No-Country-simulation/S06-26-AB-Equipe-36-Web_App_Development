"use client";
import { useState, useMemo } from "react";
import dados from "@/lib/data/trafegoDashboard.json";

type Zona = (typeof dados.zonas)[0];

// Função baseada na tua paleta real: Verde → Azul → Amarelo → Rosa → Marrom
function fluxoParaCor(valor: number): string {
  const v = Math.min(100, Math.max(0, valor));
  
  if (v < 25) {
    // De Verde (#B8D498) para Azul (#BFD8FF)
    const t = v / 25;
    const r = Math.round(184 + t * (191 - 184));
    const g = Math.round(212 + t * (216 - 212));
    const b = Math.round(152 + t * (255 - 152));
    return `rgb(${r},${g},${b})`;
  } else if (v < 50) {
    // De Azul (#BFD8FF) para Amarelo (#FFE9AB)
    const t = (v - 25) / 25;
    const r = Math.round(191 + t * (255 - 191));
    const g = Math.round(216 + t * (233 - 216));
    const b = Math.round(255 - t * (255 - 171));
    return `rgb(${r},${g},${b})`;
  } else if (v < 75) {
    // De Amarelo (#FFE9AB) para Rosa (#FFC0AD)
    const t = (v - 50) / 25;
    const r = 255;
    const g = Math.round(233 - t * (233 - 192));
    const b = Math.round(171 - t * (171 - 173));
    return `rgb(${r},${g},${b})`;
  } else {
    // De Rosa (#FFC0AD) para Marrom (#AD6842)
    const t = (v - 75) / 25;
    const r = Math.round(255 - t * (255 - 173));
    const g = Math.round(192 - t * (192 - 104));
    const b = Math.round(173 - t * (173 - 66));
    return `rgb(${r},${g},${b})`;
  }
}

export default function TrafegoDashboard() {
  const [zonaAtivaId, setZonaAtivaId] = useState<string>(dados.zonas[0].id);
  const [diaAtivo, setDiaAtivo] = useState<number>(0);

  const zonaDetalhada = useMemo(() => {
    return dados.zonas.find((z) => z.id === zonaAtivaId) || dados.zonas[0];
  }, [zonaAtivaId]);

  return (
    <div className="relative z-10 min-h-screen text-foreground">
      <div className="mx-auto max-w-4xl px-6 py-10">
        
        {/* cabeçalho */}
        <div className="mb-8">
          <p className="text-eyebrow text-foreground">Monitoramento Urbano • {dados.meta.regiao}</p>
          <h1 className="text-display mt-1 text-[clamp(1.6rem,4vw,2.2rem)] text-foreground">
            Painel de Tráfego e Fluxo
          </h1>
        </div>

        {/* seletor de zonas */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {dados.zonas.map((z) => {
            const isActive = z.id === zonaAtivaId;
            const somaFluxo = z.fluxo.reduce((acc, dia) => acc + dia.reduce((a, b) => a + b, 0), 0);
            const mediaGeral = Math.round(somaFluxo / (z.fluxo.length * z.fluxo[0].length));

            return (
              <button
                key={z.id}
                onClick={() => setZonaAtivaId(z.id)}
                className={`option-card flex flex-col items-start gap-1 p-4 border-foreground-muted/20 bg-white/4 ${isActive ? "is-active !border-[#FFC0AD]" : ""}`}
              >
                <span className="option-label font-bold text-foreground">{z.nome}</span>
                <span className="font-sans text-[0.75rem] text-foreground">{z.municipio}</span>
                <div className="mt-2 flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: fluxoParaCor(mediaGeral) }} />
                  <span className="font-sans text-[0.7rem] text-foreground">Média: {mediaGeral}%</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* gráfico */}
        {zonaDetalhada && (
          <div className="feature-card mb-6">
            <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-display text-[1.4rem] text-foreground">{zonaDetalhada.nome}</h2>
                <p className="font-sans text-xs text-foreground">Histórico de ocupação das vias principais</p>
              </div>
              <div className="flex gap-1 bg-white/5 p-1 rounded-lg">
                {dados.dias.map((dia, idx) => (
                  <button
                    key={dia}
                    onClick={() => setDiaAtivo(idx)}
                    className={`rounded px-2.5 py-1 font-sans text-[0.7rem] font-medium transition-colors ${
                      idx === diaAtivo ? "bg-white/15 text-foreground font-bold" : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    {dia}
                  </button>
                ))}
              </div>
            </div>

            <p className="field-label mb-4 text-foreground">Fluxo por horário ({dados.dias[diaAtivo]})</p>
            <div className="flex items-end gap-2.5 h-36 border-b border-white/10 pb-2 px-2">
              {zonaDetalhada.fluxo[diaAtivo].map((valor, hi) => (
                <div key={hi} className="flex flex-1 flex-col items-center gap-1">
                  <span className="font-sans text-[0.65rem] text-foreground">{valor}%</span>
                  <div
                    className="w-full rounded-t-md transition-all duration-700"
                    style={{
                      height: `${Math.max(6, Math.round((valor / 100) * 110))}px`,
                      backgroundColor: fluxoParaCor(valor),
                    }}
                  />
                  <span className="font-sans text-[0.65rem] text-foreground mt-1">{dados.horarios[hi]}</span>
                </div>
              ))}
            </div>

            {/* comparativo diário */}
            <p className="field-label mt-5 mb-3 text-foreground">Fluxo médio diário</p>
            <div className="flex items-end gap-2">
              {dados.dias.map((dia, di) => {
                const media = Math.round(
                  zonaDetalhada.fluxo[di].reduce((a, b) => a + b, 0) / zonaDetalhada.fluxo[di].length
                );
                const isSelected = di === diaAtivo;
                return (
                  <div key={dia} className="flex flex-1 flex-col items-center gap-1">
                    <span className="font-sans text-[0.6rem] text-foreground">{media}%</span>
                    <div
                      className={`w-full rounded-t-md transition-all duration-500 ${isSelected ? "ring-1 ring-[#FFC0AD]" : ""}`}
                      style={{
                        height: `${Math.max(6, Math.round((media / 100) * 60))}px`,
                        backgroundColor: fluxoParaCor(media),
                        opacity: isSelected ? 1 : 0.6,
                      }}
                    />
                    <span className={`font-sans text-[0.6rem] ${isSelected ? "text-foreground font-bold" : "text-foreground"}`}>{dia}</span>
                  </div>
                );
              })}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}