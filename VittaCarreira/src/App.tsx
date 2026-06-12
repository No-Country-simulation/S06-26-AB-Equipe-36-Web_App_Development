import { useState, useEffect } from "react";
import { getListaAreas, getAtuacoesPorArea } from "./areasAtuacao";
import { LOCALIZACAO_DATA } from "./localizacoes";
import { WavesBackground } from "./WavesBackground";

  const getLocationData = (form: any) => {
  const continenteAtual = form.continente as keyof typeof LOCALIZACAO_DATA;
  const paisesDisponiveis = Object.keys(LOCALIZACAO_DATA[continenteAtual] || {});
  const estadosDisponiveis = form.pais ? Object.keys(LOCALIZACAO_DATA[continenteAtual]?.[form.pais] || {}) : [];
  const cidadesDisponiveis = (form.pais && form.estado) ? LOCALIZACAO_DATA[continenteAtual]?.[form.pais]?.[form.estado] || [] : [];
  return { paisesDisponiveis, estadosDisponiveis, cidadesDisponiveis };
};

export default function App() {
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
    const t1 = setTimeout(() => setStage(1), 2200);
    const t2 = setTimeout(() => setStage(2), 5400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const val = e.target.value;
    setForm((prev) => {
      const updated = { ...prev, [field]: val };
      
      // Reseta e atualiza as listas dependentes de forma segura usando asserção de tipo válida
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

  // --- LÓGICA E LOCALIZAÇÃO ---
  const continentesDisponiveis = Object.keys(LOCALIZACAO_DATA);
  const { paisesDisponiveis, estadosDisponiveis, cidadesDisponiveis } = getLocationData(form);
  
  const listaAreasDisponiveis = getListaAreas();            
  const atuacoesDisponiveis = getAtuacoesPorArea(form.area);

  return (
    <div className="relative size-full overflow-hidden" style={{ background: "#1a1814" }}>
     <style>{` @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Inter:wght@300;400;500&display=swap');
  
       .inp::placeholder { color: #c4b8a8; }
       .inp option { background: #2a1a0d; color: #e8e0d5; }
  
  /* --- CUSTOMIZAÇÃO DO CALENDÁRIO NATIVO (POP-UP) --- */
  /* Força o navegador a adotar a paleta escura padrão para a caixinha flutuante */
     input[type="date"] {
     color-scheme: dark;
    }

  /* Deixa o ícone do calendário no tom creme */
    .inp::-webkit-calendar-picker-indicator {
    filter: invert(93%) sepia(8%) saturate(541%) hue-rotate(323%) brightness(95%) contrast(93%);
    cursor: pointer;
   }

  /* Injeta as cores customizadas no esqueleto do picker nos navegadores modernos */
  ::-webkit-datetime-edit-text { color: #e8e0d5; }
  ::-webkit-datetime-edit-month-field { color: #e8e0d5; }
  ::-webkit-datetime-edit-day-field { color: #e8e0d5; }
  ::-webkit-datetime-edit-year-field { color: #e8e0d5; }

  /* Estilos Globais do Layout */
  .ft { font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 300; font-style: italic; letter-spacing: 0.1em; color: #e8e0d5; }
  .fs { font-family: 'Inter', sans-serif; letter-spacing: 0.28em; color: #e8dcc8; text-transform: uppercase; font-size: 0.65rem; }
  .fl { display: flex; align-items: center; justify-content: center; gap: 8px; margin: 14px auto; }
  .fl-line { width: 16px; height: 1px; background: #e8dcc8; }
  .fl-dot { width: 4px; height: 4px; border-radius: 50%; background: #c4929a; }
  .lbl { font-family: 'Inter', sans-serif; font-size: 0.7rem; letter-spacing: 0.12em; color: #e8dcc8; text-transform: uppercase; display: block; margin-bottom: 6px; }
  .inp { width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(200,180,160,0.2); border-radius: 10px; padding: 12px 14px; color: #e8e0d5; font-family: 'Inter', sans-serif; font-size: 0.9rem; box-sizing: border-box; outline: none; transition: border-color 0.2s; }
  .inp:focus { border-color: #c4929a; }
  .inp:disabled { opacity: 0.4; cursor: not-allowed; }
  .btn { width: 100%; background: rgba(196,146,154,0.16); border: 1px solid #c4929a; color: #e8e0d5; border-radius: 10px; padding: 13px; font-family: 'Inter', sans-serif; font-size: 0.85rem; letter-spacing: 0.08em; cursor: pointer; transition: background 0.2s; text-transform: uppercase; }
  .btn:hover { background: rgba(196,146,154,0.28); }

  .opt-card { display: flex; align-items: center; gap: 12px; width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(200,180,160,0.2); border-radius: 10px; padding: 14px; cursor: pointer; transition: all 0.2s ease; color: inherit; text-align: left; }
  .opt-card:hover { border-color: rgba(200,180,160,0.4); }
  .opt-card.active { border-color: #c4929a; background: rgba(196,146,154,0.08); }
  .opt-text { font-family: 'Inter', sans-serif; font-size: 0.85rem; color: #e8e0d5; }
  .stage { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; transition: opacity 1.2s ease; padding: 0 32px; box-sizing: border-box; overflow-y: auto; }
`}</style>
      <WavesBackground />

      {/* Stage 0: Bem-vindo */}
      <div className="stage" style={{ opacity: stage === 0 ? 1 : 0, zIndex: 5, pointerEvents: "none" }}>
        <h1 className="ft" style={{ fontSize: "clamp(2.8rem, 8vw, 4.5rem)", margin: 0 }}>Bem-vindo</h1>
        <div className="fl"><span className="fl-line" /><span className="fl-dot" /><span className="fl-line" /></div>
        <p className="fs">Vitta Carreira</p>
      </div>

      {/* Stage 1: Boas-vindas */}
      <div className="stage" style={{ opacity: stage === 1 ? 1 : 0, zIndex: 4, pointerEvents: "none" }}>
        <h1 className="ft" style={{ fontSize: "clamp(1.6rem, 5.5vw, 2.4rem)", margin: 0, lineHeight: 1.4 }}>
          Primeiro vamos começar<br />com o seu cadastro
        </h1>
      </div>

      {/* Stage 2: Etapa 1 — Dados pessoais */}
      <div className="stage" style={{ opacity: stage === 2 ? 1 : 0, zIndex: stage === 2 ? 3 : 1, justifyContent: "flex-start", paddingTop: 60, alignItems: "stretch", textAlign: "left", pointerEvents: stage === 2 ? "auto" : "none" }}>
        <div className="max-w-100 w-full mx-auto pb-8">
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h1 className="ft" style={{ fontSize: "1.9rem", margin: 0 }}>Criar conta</h1>
            <div className="fl"><span className="fl-line" /><span className="fl-dot" /><span className="fl-line" /></div>
            <p className="fs">Etapa 1 de 3 · Dados pessoais</p>
          </div>

          <div className="flex flex-col" style={{ gap: 16 }}>
            <div>
              <label className="lbl" htmlFor="nome">Nome completo</label>
              <input id="nome" className="inp" type="text" placeholder="Seu nome" value={form.nome} onChange={handleChange("nome")} />
            </div>
            <div>
              <label className="lbl" htmlFor="email">E-mail</label>
              <input id="email" className="inp" type="email" placeholder="seu@email.com" value={form.email} onChange={handleChange("email")} />
            </div>
            <div className="flex" style={{ gap: 12 }}>
              <div style={{ flex: 1 }}>
                <label className="lbl" htmlFor="nascimento">Data de nascimento</label>
                <input id="nascimento" className="inp" type="date" value={form.nascimento} onChange={handleChange("nascimento")} />
              </div>
              <div style={{ flex: 1 }}>
                <label className="lbl" htmlFor="genero">Gênero</label>
                <select id="genero" className="inp" value={form.genero} onChange={handleChange("genero")}>
                  <option value="">Selecionar</option>
                  <option value="feminino">Feminino</option>
                  <option value="masculino">Masculino</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
            </div>
            <div>
              <label className="lbl" htmlFor="whatsapp">WhatsApp</label>
              <input id="whatsapp" className="inp" type="tel" placeholder="(00) 00000-0000" value={form.whatsapp} onChange={handleChange("whatsapp")} />
            </div>
          </div>
          <button className="btn" style={{ marginTop: 32 }} onClick={() => setStage(3)}>Continuar</button>
        </div>
      </div>

      {/* Stage 3: Etapa 2 — Localização Dinâmica */}
      <div className="stage" style={{ opacity: stage === 3 ? 1 : 0, zIndex: stage === 3 ? 3 : 1, justifyContent: "flex-start", paddingTop: 60, alignItems: "stretch", textAlign: "left", pointerEvents: stage === 3 ? "auto" : "none" }}>
        <div className="max-w-100 w-full mx-auto pb-8">
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h1 className="ft" style={{ fontSize: "1.9rem", margin: 0 }}>Onde você está?</h1>
            <div className="fl"><span className="fl-line" /><span className="fl-dot" /><span className="fl-line" /></div>
            <p className="fs">Etapa 2 de 3 · Localização e Formação</p>
          </div>

          <div className="flex flex-col" style={{ gap: 16 }}>
            <div>
              <label htmlFor="escolaridade" className="lbl">Escolaridade</label>
              <select id="escolaridade" className="inp" value={form.escolaridade} onChange={handleChange("escolaridade")}>
                <option value="">Selecionar</option>
                <option value="medio">Ensino Médio</option>
                <option value="tecnico">Ensino Técnico</option>
                <option value="superior-incompleto">Superior Incompleto</option>
                <option value="superior-completo">Superior Completo</option>
                <option value="pos-graduacao">Pós-Graduação</option>
              </select>
            </div>

            <div className="flex" style={{ gap: 12 }}>
              <div style={{ flex: 1 }}>
                <label htmlFor="continente" className="lbl">Continente</label>
                <select id="continente" className="inp" value={form.continente} onChange={handleChange("continente")}>
                  {continentesDisponiveis.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label htmlFor="pais" className="lbl">País</label>
                <select id="pais" className="inp" value={form.pais} onChange={handleChange("pais")}>
                  <option value="">Selecionar</option>
                  {paisesDisponiveis.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex" style={{ gap: 12 }}>
              <div style={{ flex: 1 }}>
                <label htmlFor="estado" className="lbl">Estado</label>
                <select id="estado" className="inp" value={form.estado} onChange={handleChange("estado")} disabled={!estadosDisponiveis.length}>
                  <option value="">Selecionar</option>
                  {estadosDisponiveis.map((estado) => (
                    <option key={estado} value={estado}>{estado}</option>
                  ))}
                </select>
              </div>

              <div style={{ flex: 1 }}>
                <label htmlFor="cidade" className="lbl">Cidade</label>
                <select id="cidade" className="inp" value={form.cidade} onChange={handleChange("cidade")} disabled={!cidadesDisponiveis.length}>
                  <option value="">Selecionar</option>
                  {cidadesDisponiveis.map((cidade) => (
                    <option key={cidade} value={cidade}>{cidade}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>      
          <button className="btn" style={{ marginTop: 32 }} onClick={() => setStage(4)}>Continuar</button>
        </div>
      </div>

      {/* Stage 4: Etapa 3 — Perfil Profissional (Corrigido divs duplicadas) */}
      <div className="stage" style={{ opacity: stage === 4 ? 1 : 0, zIndex: stage === 4 ? 3 : 1, justifyContent: "flex-start", paddingTop: 60, alignItems: "stretch", textAlign: "left", pointerEvents: stage === 4 ? "auto" : "none" }}>
        <div className="max-w-100 w-full mx-auto pb-8">
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h1 className="ft" style={{ fontSize: "1.9rem", margin: 0 }}>Sua jornada profissional</h1>
            <div className="fl"><span className="fl-line" /><span className="fl-dot" /><span className="fl-line" /></div>
            <p className="fs">Etapa 3 de 3 · Perfil Profissional</p>
          </div>

          <div className="flex flex-col" style={{ gap: 16 }}>
            <div>
              <label className="lbl" htmlFor="experiencia">Nível de Experiência</label>
              <select id="experiencia" className="inp" value={form.experiencia} onChange={handleChange("experiencia")}>
                <option value="sem-experiencia">Sem experiência</option>
                <option value="estagiario">Estagiário</option>
                <option value="trainee">Trainee</option>
                <option value="junior">Júnior</option>
                <option value="pleno">Pleno</option>
                <option value="senior">Sênior</option>
              </select>
            </div>
            <div>
              <label className="lbl" htmlFor="area">Área de Atuação</label>
              <select id="area" className="inp" value={form.area} onChange={handleChange("area")}>
                <option value="">Selecionar Área</option>
                {listaAreasDisponiveis.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="lbl" htmlFor="atuacao">Especialidade / Função</label>
              <select id="atuacao" className="inp" value={form.atuacao} onChange={handleChange("atuacao")} disabled={!form.area}>
                <option value="">Selecionar Atuação</option>
                {atuacoesDisponiveis.map((at) => (
                  <option key={at} value={at}>{at}</option>
                ))}
              </select>
            </div>

            <div>
              <div className="lbl" id="objetivoLabel">O que você busca agora?</div>
              <div className="flex flex-col" style={{ gap: 10, marginTop: 8 }}>
                {["Estudar e me capacitar", "Definir meu caminho", "Buscar minha primeira vaga", "Mudar de emprego / área"].map((obj, idx) => {
                  const emojis = ["📘", "🧭", "💼", "🔄"];
                  return (
                    <button
                      key={obj}
                      className={`opt-card ${form.objetivo === obj ? "active" : ""}`}
                      onClick={() => handleSelectObjetivo(obj)}
                      type="button"
                    >
                      <span style={{ fontSize: "1.1rem" }}>{emojis[idx]}</span>
                      <span className="opt-text">{obj}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <button className="btn" style={{ marginTop: 32 }} onClick={() => console.log("Formulário Completo Enviado:", form)}>
            Concluir Cadastro
          </button>
        </div>
      </div>
    </div>
  );
}