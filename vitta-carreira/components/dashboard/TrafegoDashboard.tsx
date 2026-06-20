"use client";
import { useState, useMemo } from "react";
import dados from "@/lib/data/trafegoDashboard.json";

type Zona = (typeof dados.zonas)[0];

// Estrutura matemática original restaurada, alterando as cores fixas puramente para tons de café
function fluxoParaCor(valor: number): string {
  const v = Math.min(100, Math.max(0, valor));
  
  if (v < 40) {
    // Interpolação matemática original de: Creme/Leite Vaporizado → Caramelo de café sutil
    const t = v / 40;
    const r = Math.round(240 - t * (240 - 180));
    const g = Math.round(230 - t * (230 - 140));
    const b = Math.round(215 - t * (215 - 90));
    return `rgb(${r},${g},${b})`;
  } else if (v < 70) {
    // Interpolação matemática original de: Caramelo → Grão de café torrado médio
    const t = (v - 40) / 30;
    const r = Math.round(180 - t * (180 - 100));
    const g = Math.round(140 - t * (140 - 65));
    const b = Math.round(90 - t * (90 - 35));
    return `rgb(${r},${g},${b})`;
  } else {
    // Interpolação matemática original de: Café Médio → Café Espresso forte e profundo
    const t = (v - 70) / 30;
    const r = Math.round(100 - t * (100 - 50));
    const g = Math.round(65 - t * (65 - 30));
    const b = Math.round(35 - t * (35 - 15));
    return `rgb(${r},${g},${b})`;
  }
}

export default function TrafegoDashboard() {
  const [zonaAtivaId, setZonaAtivaId] = useState<string>(dados.zonas[0].id);
  const [diaAtivo, setDiaAtivo] = useState<number>(0); // 0 = Seg, 1 = Ter, etc.

  const zonaDetalhada = useMemo(() => {
    return dados.zonas.find((z) => z.id === zonaAtivaId) || dados.zonas[0];
  }, [zonaAtivaId]);

  return (
    <div className="relative z-10 min-h-screen text-foreground">
      <div className="mx-auto max-w-4xl px-6 py-10">
        
        {/* cabeçalho */}
        <div className="mb-8">
          <p className="text-eyebrow">Monitoramento Urbano • {dados.meta.regiao}</p>
          <h1 className="text-display mt-1 text-[clamp(1.6rem,4vw,2.2rem)]">
            Painel de Tráfego e Fluxo
          </h1>
          <p className="font-sans text-[0.7rem] text-foreground-muted mt-1">
            Fonte: {dados.meta.fonte} • Atualizado em {new Date(dados.meta.atualizacao).toLocaleDateString("pt-BR")}
          </p>
        </div>

        {/* seletor de zonas urbanas */}
        <p className="field-label mb-3">Selecione uma Região / Zona</p>
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {dados.zonas.map((z) => {
            const isActive = z.id === zonaAtivaId;
            const somaFluxo = z.fluxo.reduce((acc, dia) => acc + dia.reduce((a, b) => a + b, 0), 0);
            const totalItens = z.fluxo.length * z.fluxo[0].length;
            const mediaGeral = Math.round(somaFluxo / totalItens);

            return (
              <button
                key={z.id}
                onClick={() => setZonaAtivaId(z.id)}
                className={`option-card flex flex-col items-start gap-1 p-4 ${isActive ? "is-active" : ""}`}
              >
                <span className="option-label font-bold">{z.nome}</span>
                <span className="font-sans text-[0.75rem] text-foreground-muted">{z.municipio}</span>
                <div className="mt-2 flex items-center gap-1.5">
                  <div 
                    className="h-2 w-2 rounded-full" 
                    style={{ backgroundColor: fluxoParaCor(mediaGeral) }}
                  />
                  <span className="font-sans text-[0.7rem] text-foreground-muted">Média: {mediaGeral}%</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* visualização detalhada da zona selecionada */}
        {zonaDetalhada && (
          <div className="feature-card mb-6">
            <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-display text-[1.4rem]">{zonaDetalhada.nome}</h2>
                <p className="font-sans text-xs text-foreground-muted">Histórico de ocupação das vias principais</p>
              </div>
              
              {/* seletor de dias da semana */}
              <div className="flex gap-1 overflow-x-auto rounded-lg bg-white/5 p-1">
                {dados.dias.map((dia, idx) => (
                  <button
                    key={dia}
                    onClick={() => setDiaAtivo(idx)}
                    className={`rounded px-2.5 py-1 font-sans text-[0.7rem] font-medium transition-colors ${
                      idx === diaAtivo ? "bg-accent text-foreground" : "text-foreground-muted hover:text-foreground"
                    }`}
                  >
                    {dia}
                  </button>
                ))}
              </div>
            </div>

            {/* gráfico de barras por horário */}
            <p className="field-label mb-4">Fluxo por horário ({dados.dias[diaAtivo]})</p>
            <div className="flex items-end gap-2.5 h-36 border-b border-white/10 pb-2 px-2">
              {zonaDetalhada.fluxo[diaAtivo].map((valor, hi) => (
                <div key={hi} className="flex flex-1 flex-col items-center gap-1">
                  <span className="font-sans text-[0.65rem] text-foreground-muted">{valor}%</span>
                  <div
                    className="w-full rounded-t-md transition-all duration-700"
                    style={{
                      height: `${Math.max(6, Math.round((valor / 100) * 110))}px`,
                      backgroundColor: fluxoParaCor(valor),
                    }}
                  />
                  <span className="font-sans text-[0.65rem] text-foreground-muted mt-1">
                    {dados.horarios[hi]}
                  </span>
                </div>
              ))}
            </div>

            {/* comparativo entre dias na parte inferior */}
            <p className="field-label mt-6 mb-3">Visão Geral: Fluxo médio diário da semana</p>
            <div className="flex items-end gap-2 px-1">
              {dados.dias.map((dia, di) => {
                const media = Math.round(
                  zonaDetalhada.fluxo[di].reduce((a, b) => a + b, 0) / zonaDetalhada.fluxo[di].length
                );
                const isSelected = di === diaAtivo;
                return (
                  <div key={dia} className="flex flex-1 flex-col items-center gap-1 cursor-pointer" onClick={() => setDiaAtivo(di)}>
                    <span className="font-sans text-[0.6rem] text-foreground-muted">{media}%</span>
                    <div
                      className={`w-full rounded-t-md transition-all duration-500 ${isSelected ? "ring-1 ring-accent" : ""}`}
                      style={{
                        height: `${Math.max(6, Math.round((media / 100) * 60))}px`,
                        backgroundColor: fluxoParaCor(media),
                        opacity: isSelected ? 1 : 0.6,
                      }}
                    />
                    <span className={`font-sans text-[0.65rem] mt-1 ${isSelected ? "text-accent font-bold" : "text-foreground-muted"}`}>
                      {dia}
                    </span>
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