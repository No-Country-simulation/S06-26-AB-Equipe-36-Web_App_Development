"use client";
// OnboardingFlow.tsx
// Migrado do protótipo Vite da Agatha (App.tsx) para a arquitetura Next.js.
// Precisa ser Client Component: usa useState/useEffect e interações de formulário.
import { useState, useEffect } from "react";
import { getListaAreas, getAtuacoesPorArea } from "@/lib/data/areasAtuacao";
import { LOCALIZACAO_DATA } from "@/lib/data/localizacoes";

const getLocationData = (form: any) => {
  const continenteAtual = form.continente as keyof typeof LOCALIZACAO_DATA;
  const paisesDisponiveis = Object.keys(LOCALIZACAO_DATA[continenteAtual] || {});
  const estadosDisponiveis = form.pais ? Object.keys(LOCALIZACAO_DATA[continenteAtual]?.[form.pais] || {}) : [];
  const cidadesDisponiveis = (form.pais && form.estado) ? LOCALIZACAO_DATA[continenteAtual]?.[form.pais]?.[form.estado] || [] : [];
  return { paisesDisponiveis, estadosDisponiveis, cidadesDisponiveis };
};

export default function OnboardingFlow() {
  const [stage, setStage] = useState(0);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    nascimento: "",
    genero: "",
    whatsapp: "",

    escolaridade: "",
    continente: "América",
    pais: "Brasil",
    estado: "",
    cidade: "",

    experiencia: "sem-experiencia",
    area: "",
    atuacao: "",
    objetivo: "Estudar e me capacitar",
  });

  useEffect(() => {
    if (stage === 0) {
      const t1 = setTimeout(() => setStage(1), 2200);
      return () => clearTimeout(t1);
    }
    if (stage === 1) {
      const t2 = setTimeout(() => setStage(2), 3200);
      return () => clearTimeout(t2);
    }
    if (stage === 5) {
      const t3 = setTimeout(() => setStage(6), 2500);
      return () => clearTimeout(t3);
    }
    if (stage === 6) {
      const t4 = setTimeout(() => setStage(7), 3000);
      return () => clearTimeout(t4);
    }
  }, [stage]);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const val = e.target.value;
    setForm((prev) => {
      const updated = { ...prev, [field]: val };
      if (field === "continente") {
        const continenteChave = val as keyof typeof LOCALIZACAO_DATA;
        const paisesDoNovoContinente = Object.keys(LOCALIZACAO_DATA[continenteChave] || {});
        updated.pais = paisesDoNovoContinente[0] || "";
        updated.estado = "";
        updated.cidade = "";
      } else if (field === "pais") {
        updated.estado = "";
        updated.cidade = "";
      } else if (field === "estado") {
        updated.cidade = "";
      } else if (field === "area") {
        updated.atuacao = "";
      }
      return updated;
    });
  };

  const handleSelectObjetivo = (val: string) => {
    setForm((prev) => ({ ...prev, objetivo: val }));
  };

  const continentesDisponiveis = Object.keys(LOCALIZACAO_DATA);
  const { paisesDisponiveis, estadosDisponiveis, cidadesDisponiveis } = getLocationData(form);

  const listaAreasDisponiveis = getListaAreas();
  const atuacoesDisponiveis = getAtuacoesPorArea(form.area);

  return (
    <div className="relative z-10 size-full text-foreground">

      {/* Stage 0: Bem-vindo */}
      <div className={`stage-panel pointer-events-none z-[5] ${stage === 0 ? "opacity-100" : "opacity-0"}`}>
        <h1 className="text-display m-0 text-[clamp(2.8rem,8vw,4.5rem)] text-foreground">Bem-vindo</h1>
        <div className="divider"><span className="divider-line" /><span className="divider-dot" /><span className="divider-line" /></div>
        <p className="text-eyebrow text-foreground">Vitta Carreira</p>
      </div>

      {/* Stage 1: Boas-vindas */}
      <div className={`stage-panel pointer-events-none z-[4] ${stage === 1 ? "opacity-100" : "opacity-0"}`}>
        <h1 className="text-display m-0 text-[clamp(1.6rem,5.5vw,2.4rem)] leading-[1.4] text-foreground">
          Primeiro vamos começar<br />com o seu cadastro
        </h1>
      </div>

      {/* Stage 2: Etapa 1 — Dados pessoais */}
      <div
        className={`stage-panel justify-start items-stretch text-left pt-15 ${
          stage === 2 ? "z-[3] opacity-100 pointer-events-auto" : "z-[1] opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-100 w-full mx-auto pb-8">
          <div className="text-center mb-8">
            <h1 className="text-display m-0 text-[1.9rem] text-foreground">Criar conta</h1>
            <div className="divider"><span className="divider-line" /><span className="divider-dot" /><span className="divider-line" /></div>
            <p className="text-eyebrow text-foreground">Etapa 1 de 3 · Dados pessoais</p>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="field-label text-foreground" htmlFor="nome">Nome completo</label>
              <input id="nome" className="field-input text-foreground" type="text" placeholder="Seu nome" value={form.nome} onChange={handleChange("nome")} />
            </div>
            <div>
              <label className="field-label text-foreground" htmlFor="email">E-mail</label>
              <input id="email" className="field-input text-foreground" type="email" placeholder="seu@email.com" value={form.email} onChange={handleChange("email")} />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="field-label text-foreground" htmlFor="nascimento">Data de nascimento</label>
                <input id="nascimento" className="field-input text-foreground" type="date" value={form.nascimento} onChange={handleChange("nascimento")} />
              </div>
              <div className="flex-1">
                <label className="field-label text-foreground" htmlFor="genero">Gênero</label>
                <select id="genero" className="field-input text-foreground" value={form.genero} onChange={handleChange("genero")}>
                  <option value="">Selecionar</option>
                  <option value="feminino">Feminino</option>
                  <option value="masculino">Masculino</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
            </div>
            <div>
              <label className="field-label text-foreground" htmlFor="whatsapp">WhatsApp</label>
              <input id="whatsapp" className="field-input text-foreground" type="tel" placeholder="(00) 00000-0000" value={form.whatsapp} onChange={handleChange("whatsapp")} />
            </div>
          </div>
          <button className="btn-primary mt-8" onClick={() => setStage(3)}>Continuar</button>
        </div>
      </div>

      {/* Stage 3: Etapa 2 — Localização Dinâmica */}
      <div
        className={`stage-panel justify-start items-stretch text-left pt-15 ${
          stage === 3 ? "z-[3] opacity-100 pointer-events-auto" : "z-[1] opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-100 w-full mx-auto pb-8">
          <div className="text-center mb-8">
            <h1 className="text-display m-0 text-[1.9rem] text-foreground">Onde você está?</h1>
            <div className="divider"><span className="divider-line" /><span className="divider-dot" /><span className="divider-line" /></div>
            <p className="text-eyebrow text-foreground">Etapa 2 de 3 · Localização e Formação</p>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="escolaridade" className="field-label text-foreground">Escolaridade</label>
              <select id="escolaridade" className="field-input text-foreground" value={form.escolaridade} onChange={handleChange("escolaridade")}>
                <option value="">Selecionar</option>
                <option value="medio">Ensino Médio</option>
                <option value="tecnico">Ensino Técnico</option>
                <option value="superior-incompleto">Superior Incompleto</option>
                <option value="superior-completo">Superior Completo</option>
                <option value="pos-graduacao">Pós-Graduação</option>
              </select>
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <label htmlFor="continente" className="field-label text-foreground">Continente</label>
                <select id="continente" className="field-input text-foreground" value={form.continente} onChange={handleChange("continente")}>
                  {continentesDisponiveis.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label htmlFor="pais" className="field-label text-foreground">País</label>
                <select id="pais" className="field-input text-foreground" value={form.pais} onChange={handleChange("pais")}>
                  <option value="">Selecionar</option>
                  {paisesDisponiveis.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <label htmlFor="estado" className="field-label text-foreground">Estado</label>
                <select id="estado" className="field-input text-foreground" value={form.estado} onChange={handleChange("estado")} disabled={!estadosDisponiveis.length}>
                  <option value="">Selecionar</option>
                  {estadosDisponiveis.map((estado) => (
                    <option key={estado} value={estado}>{estado}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label htmlFor="cidade" className="field-label text-foreground">Cidade</label>
                <select id="cidade" className="field-input text-foreground" value={form.cidade} onChange={handleChange("cidade")} disabled={!cidadesDisponiveis.length}>
                  <option value="">Selecionar</option>
                  {cidadesDisponiveis.map((cidade: string) => (
                    <option key={cidade} value={cidade}>{cidade}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <button className="btn-primary mt-8" onClick={() => setStage(4)}>Continuar</button>
        </div>
      </div>

      {/* Stage 4: Etapa 3 — Perfil Profissional */}
      <div
        className={`stage-panel justify-start items-stretch text-left pt-15 ${
          stage === 4 ? "z-[3] opacity-100 pointer-events-auto" : "z-[1] opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-100 w-full mx-auto pb-8">
          <div className="text-center mb-8">
            <h1 className="text-display m-0 text-[1.9rem] text-foreground">Sua jornada profissional</h1>
            <div className="divider"><span className="divider-line" /><span className="divider-dot" /><span className="divider-line" /></div>
            <p className="text-eyebrow text-foreground">Etapa 3 de 3 · Perfil Profissional</p>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="field-label text-foreground" htmlFor="experiencia">Nível de Experiência</label>
              <select id="experiencia" className="field-input text-foreground" value={form.experiencia} onChange={handleChange("experiencia")}>
                <option value="sem-experiencia">Sem experiência</option>
                <option value="estagiario">Estagiário</option>
                <option value="trainee">Trainee</option>
                <option value="junior">Júnior</option>
                <option value="pleno">Pleno</option>
                <option value="senior">Sênior</option>
              </select>
            </div>
            <div>
              <label className="field-label text-foreground" htmlFor="area">Área de Atuação</label>
              <select id="area" className="field-input text-foreground" value={form.area} onChange={handleChange("area")}>
                <option value="">Selecionar Área</option>
                {listaAreasDisponiveis.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="field-label text-foreground" htmlFor="atuacao">Especialidade / Função</label>
              <select id="atuacao" className="field-input text-foreground" value={form.atuacao} onChange={handleChange("atuacao")} disabled={!form.area}>
                <option value="">Selecionar Atuação</option>
                {atuacoesDisponiveis.map((at) => (
                  <option key={at} value={at}>{at}</option>
                ))}
              </select>
            </div>

            <div>
              <div className="field-label text-foreground" id="objetivoLabel">O que você busca agora?</div>
              <div className="flex flex-col gap-2.5 mt-2">
                {["Estudar e me capacitar", "Definir meu caminho", "Buscar minha primeira vaga", "Mudar de emprego / área"].map((obj, idx) => {
                  const emojis = ["📘", "🧭", "💼", "🔄"];
                  return (
                    <button
                      key={obj}
                      className={`option-card border-foreground-muted/20 bg-white/4 ${form.objetivo === obj ? "is-active !border-[#FFC0AD]" : ""}`}
                      onClick={() => handleSelectObjetivo(obj)}
                      type="button"
                    >
                      <span className="text-[1.1rem]">{emojis[idx]}</span>
                      <span className="option-label text-foreground">{obj}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <button className="btn-primary mt-8" onClick={() => setStage(5)}>Concluir Cadastro</button>
        </div>
      </div>

      {/* Stage 5: Transição suave */}
      <div className={`stage-panel pointer-events-none ${stage === 5 ? "opacity-100 z-[5]" : "opacity-0 z-[1]"}`}>
        <h1 className="text-display m-0 text-[clamp(2rem,6vw,3rem)] text-foreground">Muito bem!</h1>
        <p className="text-eyebrow mt-3 text-foreground">Seu perfil foi criado com sucesso.</p>
      </div>

      {/* Stage 6: Transição suave */}
      <div className={`stage-panel pointer-events-none ${stage === 6 ? "opacity-100 z-[5]" : "opacity-0 z-[1]"}`}>
        <h1 className="text-display m-0 text-[clamp(1.6rem,5vw,2.4rem)] leading-[1.4] text-foreground">
          Agora vamos começar<br />o que realmente importa...
        </h1>
      </div>

      {/* Stage 7: Check-in de Saúde Mental */}
      <div
        className={`stage-panel justify-start items-stretch text-left pt-20 ${
          stage === 7 ? "z-[3] opacity-100 pointer-events-auto" : "z-[1] opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-100 w-full mx-auto pb-8 text-center">
          <h1 className="text-display m-0 text-[2.2rem] text-foreground">Como você está se sentindo hoje?</h1>
          <div className="divider"><span className="divider-line" /><span className="divider-dot" /><span className="divider-line" /></div>
          <p className="text-eyebrow mb-10 text-foreground">Check-in diário de bem-estar</p>

          <div className="flex flex-col gap-3 max-w-100 mx-auto">
            {[
              { label: "Feliz e motivado(a)", emoji: "😊", valor: "feliz", cor: "text-[#B8D498]" },
              { label: "Cansado(a) / Exausto(a)", emoji: "🥱", valor: "cansado", cor: "text-[#BFD8FF]" },
              { label: "Triste ou desanimado(a)", emoji: "😢", valor: "triste", cor: "text-[#FFC0AD]" },
              { label: "Ansioso(a) / Preocupado(a)", emoji: "😰", valor: "ansioso", cor: "text-[#FFE9AB]" },
              { label: "Sobrecarregado(a)", emoji: "🤯", valor: "sobrecarregado", cor: "text-[#AD6842]" },
            ].map((item) => (
              <button
                key={item.valor}
                className="option-card border-foreground-muted/20 bg-white/4"
                onClick={() => {
                  console.log("Humor selecionado:", item.valor);
                  setStage(8);
                }}
                type="button"
              >
                <span className={`text-[1.3rem] ${item.cor}`}>{item.emoji}</span>
                <span className="option-label text-[0.95rem] text-foreground">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stage 8: Dashboard Principal / Home com Rosé Pastel nos Números e Destaques */}
      <div
        className={`stage-panel justify-start items-stretch text-left pt-10 ${
          stage === 8 ? "z-[3] opacity-100 pointer-events-auto" : "z-[1] opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-180 w-full mx-auto pb-8">
          <div className="flex justify-between items-center mb-6 border-b border-foreground-muted/15 pb-4">
            <div>
              <span className="text-eyebrow text-foreground">Olá, {form.nome || "Participante"}, seja bem-vindo(a)!</span>
              <h2 className="text-display text-[1.6rem] m-0 mt-1 text-foreground">Seu Ecossistema Vitta Carreira</h2>
            </div>
          </div>

          <div className="bg-[#FFC0AD]/10 border border-dashed border-[#FFC0AD] rounded-xl p-5 mb-6">
            <p className="field-label text-[#FFC0AD] font-bold m-0">🐶 Agente Vitta diz:</p>
            <p className="text-foreground font-sans text-sm mt-2 leading-relaxed">
              Identifiquei que você está buscando <strong>{form.objetivo}</strong> na área de{" "}
              <strong>{form.area || "Tecnologia"}</strong>. Preparamos um plano focado nos 30% que faltam
              para você conquistar seus objetivos. Lembre-se de dar uma pausa se precisar!
            </p>
          </div>

          <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            <div className="bg-white/4 border border-foreground-muted/15 rounded-xl p-5">
              <span className="text-eyebrow text-foreground">Oportunidades</span>
              <h3 className="text-display text-[1.3rem] my-1.5 text-foreground">Vagas Compatíveis</h3>
              <div className="bg-white/5 rounded-lg p-3 mb-3">
                <div className="flex justify-between mb-1.5">
                  <span className="text-[0.85rem] text-foreground font-bold">Dev Front-end Júnior</span>
                  {/* Destaque num lindo Rosé Pastel vívido */}
                  <span className="text-[0.85rem] font-bold text-[#FFC0AD]">70% Match</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full">
                  <div className="h-full bg-[#FFC0AD] rounded-full" />
                </div>
                <p className="text-[0.75rem] text-foreground mt-2">Falta: Tailwind CSS e consumo de APIs externas.</p>
              </div>
            </div>

            <div className="bg-white/4 border border-foreground-muted/15 rounded-xl p-5">
              <span className="text-eyebrow text-foreground">Próximo Passo</span>
              <h3 className="text-display text-[1.3rem] my-1.5 text-foreground">Trilha Recomendada</h3>
              <p className="text-[0.85rem] text-foreground mb-3">
                Para fechar os seus 30% de gap nesta vaga, recomendamos iniciar:
              </p>
              <button
                type="button"
                className="block w-full bg-[#FFC0AD]/15 text-foreground p-2.5 rounded-lg text-center text-[0.8rem] border border-[#FFC0AD] cursor-pointer hover:bg-[#FFC0AD]/25 transition-colors font-medium"
              >
                🚀 Iniciar Curso Gratuito Google Cloud / Alura
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}