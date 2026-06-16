import React, { useState, useEffect, useRef } from "react";

// ============================================================================
// DATASETS REAIS DO PROJETO (ALINHADOS AO BACKLOG E VÍSENT)
// ============================================================================

const AREAS_ATUACAO_DATA: Record<string, string[]> = {
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

const LOCALIZACAO_DATA: any = {
  "América": {
    "Brasil": {
      "Santa Catarina": [
        "Florianópolis", 
        "São José", 
        "Palhoça", 
        "Biguaçu"
      ]
    }
  }
};

// Funções utilitárias locais (substituindo as importações externas)
const getListaAreas = () => Object.keys(AREAS_ATUACAO_DATA);
const getAtuacoesPorArea = (area: string) => AREAS_ATUACAO_DATA[area] || [];
const getLocationData = (form: any) => {
  const continenteAtual = form.continente;
  const paisesDisponiveis = Object.keys(LOCALIZACAO_DATA[continenteAtual] || {});
  const estadosDisponiveis = form.pais ? Object.keys(LOCALIZACAO_DATA[continenteAtual]?.[form.pais] || {}) : [];
  const cidadesDisponiveis = (form.pais && form.estado) ? LOCALIZACAO_DATA[continenteAtual]?.[form.pais]?.[form.estado] || [] : [];
  return { paisesDisponiveis, estadosDisponiveis, cidadesDisponiveis };
};

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

// ============================================================================
// BACKGROUND ANIMADO EM CANVAS (WAVES DE CAFÉ E OURO)
// ============================================================================

function WavesBackground(): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const COFFEE_GOLD   = "156, 107, 58";
    const COFFEE_MILK   = "138, 92, 53";
    const COFFEE_LIGHT  = "122, 79, 41";
    const COFFEE_INT    = "77, 48, 26";
    const COFFEE_DARK   = "42, 26, 13";

    const orbs = [
      { xPhase: 0, yPhase: Math.PI / 2, xSpeed: 0.0015, ySpeed: 0.001, baseRadius: 0.65, color: `rgba(${COFFEE_INT}, 0.85)` },
      { xPhase: Math.PI, yPhase: 0, xSpeed: 0.001, ySpeed: 0.002, baseRadius: 0.85, color: `rgba(${COFFEE_DARK}, 0.90)` },
      { xPhase: Math.PI * 0.4, yPhase: Math.PI * 0.8, xSpeed: -0.001, ySpeed: 0.0018, baseRadius: 0.55, color: `rgba(${COFFEE_DARK}, 0.80)` },
      { xPhase: Math.PI / 3, yPhase: Math.PI / 4, xSpeed: 0.002, ySpeed: 0.0015, baseRadius: 0.5, color: `rgba(${COFFEE_LIGHT}, 0.75)` },
      { xPhase: Math.PI * 1.5, yPhase: Math.PI * 0.5, xSpeed: 0.004, ySpeed: 0.006, baseRadius: 0.6, color: `rgba(${COFFEE_GOLD}, 0.85)`, isClearOrb: true },
      { xPhase: Math.PI * 0.7, yPhase: Math.PI * 1.2, xSpeed: 0.005, ySpeed: 0.004, baseRadius: 0.65, color: `rgba(${COFFEE_MILK}, 0.80)`, isClearOrb: true }
    ];

    const render = () => {
      time += 0.0015;
      const cx = width / 2 + Math.sin(time * 0.4) * width * 0.012;
      const cy = height / 2 + Math.cos(time * 0.3) * height * 0.012;

      const bg = ctx.createRadialGradient(cx, cy * 0.92, 0, cx, cy, Math.max(width, height) * 0.75);
      bg.addColorStop(0, "#9c6b3a");
      bg.addColorStop(0.35, "#7a4f29");
      bg.addColorStop(0.7, "#4d301a");
      bg.addColorStop(1, "#2a1a0d");

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = "source-over";

      orbs.forEach((orb) => {
        const travelRadius = orb.isClearOrb ? 0.42 : 0.16;
        const orbX = cx + Math.sin(time * 15 * orb.xSpeed + orb.xPhase) * (width * travelRadius);
        const orbY = cy + Math.cos(time * 15 * orb.ySpeed + orb.yPhase) * (height * travelRadius);
        
        let currentRadius = Math.max(width, height) * orb.baseRadius;
        if (orb.isClearOrb) {
          const liquidPulse = Math.sin(time * 25 * orb.xSpeed + orb.xPhase) * 0.15;
          currentRadius = currentRadius * (1 + liquidPulse);
        }

        const localGrad = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, Math.max(1, currentRadius));
        localGrad.addColorStop(0, orb.color);
        localGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = localGrad;
        ctx.fillRect(0, 0, width, height);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", resize);
    resize();
    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
    />
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL INTERATIVO
// ============================================================================

export default function App() {
  const [view, setView] = useState<"landing" | "onboarding" | "dashboard">("landing");
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [apiLogs, setApiLogs] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"perfil" | "saude" | "formacao" | "mentoria" | "visent">("perfil");

  // Estado interativo para a seção "Se você já sentiu que..."
  const [selectedDores, setSelectedDores] = useState<number[]>([]);

  // Dados do formulário ajustados para a realidade do MVP (Vísent + Tech)
  const [form, setForm] = useState({
    nome: "",
    email: "",
    nascimento: "1999-07-18",
    genero: "Feminino",
    escolaridade: "Ensino Superior Incompleto",
    continente: "América",
    pais: "Brasil",
    estado: "Santa Catarina",
    cidade: "Florianópolis",
    whatsapp: "+55 48 99112-2233",
    nivel: "Transição de Carreira",
    area: "Desenvolvimento e Design",
    subarea: "Desenvolvimento Front-end",
    oQueBusca: "definir caminho"
  });

  const [mockAiResponse, setMockAiResponse] = useState<any>({
    gap_percentual: 70,
    gap_itens: ["Domínio de Layouts Responsivos & Tailwind v4", "Conceitos Essenciais de React Hooks", "Conectividade assíncrona com REST APIs"],
    trilha_sugerida: "Trilha Frontend Booster (Oracle Next Education & Alura)",
    vagas_compativeis: [
      { cargo: "Desenvolvedor(a) Front-end Júnior", empresa: "App BiT Soluções", match: "73%", local: "Florianópolis, SC", salario: "R$ 3.600" }
    ],
    confianca: "Alta"
  });

  const [saudeResponse, setSaudeResponse] = useState<any>({
    mensagem: "Obrigado pelo seu check-in. Sabemos o quão cansativa é a busca pela transição profissional. Seu esforço é legítimo, respeite o seu tempo.",
    acao_sugerida: "Que tal desligar o computador 15 minutos mais cedo hoje e preparar um chá morno ouvindo uma música tranquila?",
    derivar_cvv: false,
    nota_atual: 7,
    alerta: "Estável"
  });

  const [currentMood, setCurrentMood] = useState<string | null>(null);
  const [moodNote, setMoodNote] = useState<number>(7);
  const [mentorScheduled, setMentorScheduled] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);

  const logApiCall = (endpoint: string, method: string, payload: any, response: any) => {
    setApiLogs(prev => [
      {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        endpoint,
        method,
        payload,
        response
      },
      ...prev.slice(0, 5)
    ]);
  };

  const handleOnboardingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const requestPayload = {
      usuario_id: "usr_" + Math.random().toString(36).substring(2, 9),
      perfil: form.subarea,
      nivel: form.nivel,
      regiao: `${form.cidade}, ${form.estado}, ${form.pais}`,
      idioma: "PT",
      lat: -27.5954, // Coordenadas de Florianópolis (Visent)
      lng: -48.5480
    };

    const simulatedResponse = {
      gap_percentual: 70,
      gap_itens: ["Consumo seguro de Hooks avançados", "Fundamentos de TypeScript estático", "Modularização de componentes reutilizáveis"],
      trilha_sugerida: "Formação React Developer (Alura + Oracle ONE)",
      vagas_compativeis: [
        { cargo: `Desenvolvedor(a) Júnior ${form.subarea}`, empresa: "Equipe 36 Tech", match: "72%", local: `${form.cidade}, SC`, salario: "R$ 4.000" }
      ],
      confianca: "Muito Alta"
    };

    setMockAiResponse(simulatedResponse);
    logApiCall("/orientar", "POST", requestPayload, simulatedResponse);
    setView("dashboard");
  };

  const handleMoodCheckin = (mood: string, rating: number) => {
    setCurrentMood(mood);
    setMoodNote(rating);

    const requestPayload = {
      usuario_id: "usr_appbit_36",
      humor: mood,
      nota_semanal: rating,
      contexto: "Check-in de Bem-estar"
    };

    let simulatedResponse = {
      mensagem: "",
      acao_sugerida: "",
      derivar_cvv: false,
      nota_atual: rating,
      alerta: "Estável"
    };

    if (rating < 4) {
      simulatedResponse = {
        mensagem: "Notamos que o seu nível de sobrecarga está muito agudo hoje. Não passe por isso sozinho(a).",
        acao_sugerida: "Como protocolo acolhedor imediato de segurança, fornecemos o acesso direto ao Centro de Valorização da Vida. Ligue gratuitamente para o 188.",
        derivar_cvv: true,
        nota_atual: rating,
        alerta: "EMERGÊNCIA - Redirecionamento de Segurança Ativo"
      };
    } else {
      const acoes = [
        "Faça uma pausa de 10 minutos longe das linhas de código. Sugerimos olhar para o horizonte respirando calmamente.",
        "Sugerimos caminhar descalço(a) no gramado por alguns minutos para aliviar o estresse físico.",
        "Que tal assistir a um episódio leve de uma série com um copo d'água morna e gelada ao lado?",
        "Escreva em um bloco de notas físico três pequenas conquistas que você obteve na sua semana. Valorize sua caminhada."
      ];
      simulatedResponse = {
        mensagem: `Agradecemos por compartilhar seu check-in diário. Sentir-se "${mood}" faz parte de rotinas sob alta demanda.`,
        acao_sugerida: acoes[Math.floor(Math.random() * acoes.length)],
        derivar_cvv: false,
        nota_atual: rating,
        alerta: "Estável"
      };
    }

    setSaudeResponse(simulatedResponse);
    logApiCall("/saude", "POST", requestPayload, simulatedResponse);
  };

  const triggerOfflineDownload = () => {
    setDownloadProgress(0);
    const interval = setInterval(() => {
      setDownloadProgress(p => {
        if (p === null) return null;
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setDownloadProgress(null), 2500);
          return 100;
        }
        return p + 20;
      });
    }, 300);
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const val = e.target.value;
    setForm((prev) => {
      const updated = { ...prev, [field]: val };
      if (field === "area") {
        const atuacoesdaArea = getAtuacoesPorArea(val);
        updated.subarea = atuacoesdaArea[0] || "";
      } else if (field === "estado") {
        const cidadesDoEstado = LOCALIZACAO_DATA[updated.continente]?.[updated.pais]?.[val] || [];
        updated.cidade = cidadesDoEstado[0] || "";
      }
      return updated;
    });
  };

  const toggleDorSelection = (index: number) => {
    if (selectedDores.includes(index)) {
      setSelectedDores(selectedDores.filter(i => i !== index));
    } else {
      setSelectedDores([...selectedDores, index]);
    }
  };

  const doresList = [
    "Não sabe por onde começar;",
    "Parece que sempre falta algo para conseguir uma vaga;",
    "Não conhece pessoas da área para pedir orientação;",
    "Sente que não pertence ao mercado de tecnologia;",
    "Está cansado de tentar sozinho."
  ];

  const listaAreasDisponiveis = getListaAreas();
  const atuacoesDisponiveis = getAtuacoesPorArea(form.area);
  const { cidadesDisponiveis, estadosDisponiveis } = getLocationData(form);

  return (
    <div className="relative min-h-screen text-amber-50 font-sans selection:bg-amber-500 selection:text-neutral-900 overflow-x-hidden bg-neutral-950">
      
      <WavesBackground />

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 flex justify-between items-center px-6 md:px-12 py-5 bg-neutral-950/80 backdrop-blur-md border-b border-amber-900/10">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setView("landing")}>
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center font-black text-neutral-950 text-lg shadow-md shadow-amber-950/50">
            B
          </div>
          <div className="text-lg font-bold tracking-tight">
            App <span className="text-amber-400 font-light">BiT</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {view === "landing" ? (
            <button
              onClick={() => { setView("onboarding"); setOnboardingStep(1); }}
              className="bg-amber-500 hover:bg-amber-600 text-neutral-950 text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl transition shadow-lg shadow-amber-950/30"
            >
              Começar minha jornada
            </button>
          ) : (
            <button
              onClick={() => setView("landing")}
              className="border border-amber-500/30 hover:border-amber-400 text-amber-300 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl transition"
            >
              ← Voltar para a Home
            </button>
          )}
        </div>
      </header>

      {/* GRID DE LAYOUT */}
      <div className="grid grid-cols-1 xl:grid-cols-4 min-h-[calc(100vh-81px)]">
        
        <main className="xl:col-span-3 p-6 md:p-12 space-y-32">
          
          {/* ============================================================================
              1. A LANDING PAGE DO APP BIT (100% FIEL À ESTRUTURA)
              ============================================================================ */}
          {view === "landing" && (
            <div className="space-y-36 animate-fadeIn max-w-4xl mx-auto">
              
              {/* 1. HERO */}
              <section className="text-center space-y-6 pt-12">
                <h1 className="text-4xl md:text-6xl font-black tracking-tight text-amber-50 leading-[1.1]">
                  Você não precisa enfrentar sua jornada na tecnologia sozinho.
                </h1>
                <p className="text-sm md:text-lg text-amber-100/70 max-w-2xl mx-auto leading-relaxed font-light">
                  O App BiT conecta formação, oportunidades, mentorias e apoio emocional para ajudar pessoas de grupos sub-representados a construir uma carreira em tecnologia com mais confiança e pertencimento.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    onClick={() => { setView("onboarding"); setOnboardingStep(1); }}
                    className="bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-600 hover:to-amber-500 text-neutral-950 font-black py-4 px-8 rounded-xl text-base transition transform hover:scale-105 shadow-xl shadow-amber-950/40"
                  >
                    Começar minha jornada
                  </button>
                  <button
                    onClick={() => { setView("dashboard"); }}
                    className="bg-neutral-900/40 hover:bg-neutral-900/60 backdrop-blur border border-amber-900/30 text-amber-300 font-bold py-4 px-8 rounded-xl text-base transition"
                  >
                    Descobrir meu próximo passo
                  </button>
                </div>

                {/* Elemento visual */}
                <div className="pt-8 max-w-2xl mx-auto">
                  <div className="bg-neutral-900/30 backdrop-blur-md rounded-2xl p-6 border border-amber-900/10 text-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-semibold text-amber-200/80">
                      <div className="p-4 bg-neutral-950/40 rounded-xl border border-white/5 flex flex-col items-center gap-2">
                        <span className="text-2xl">📚</span>
                        <span>Alguém estudando</span>
                      </div>
                      <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-400 flex flex-col items-center gap-2">
                        <span className="text-2xl">🤝</span>
                        <span>Alguém sendo mentorado</span>
                      </div>
                      <div className="p-4 bg-neutral-950/40 rounded-xl border border-white/5 flex flex-col items-center gap-2">
                        <span className="text-2xl">💼</span>
                        <span>Alguém conseguindo vaga</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 2. A DOR */}
              <section id="dor" className="space-y-8 max-w-2xl mx-auto">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-amber-100">Se você já sentiu que…</h2>
                </div>
                <div className="flex flex-col gap-3">
                  {doresList.map((dor, idx) => (
                    <div
                      key={idx}
                      onClick={() => toggleDorSelection(idx)}
                      className={`p-5 rounded-xl border cursor-pointer transition-all flex items-center space-x-4 ${
                        selectedDores.includes(idx) ? "bg-amber-500/10 border-amber-500 shadow-lg shadow-amber-950/50" : "bg-neutral-900/20 border-white/5 hover:border-amber-500/30"
                      }`}
                    >
                      <span className={`text-lg ${selectedDores.includes(idx) ? "text-amber-400" : "text-amber-100/30"}`}>
                        {selectedDores.includes(idx) ? "✓" : "○"}
                      </span>
                      <p className="text-sm md:text-base text-amber-100/90 font-medium">{dor}</p>
                    </div>
                  ))}
                </div>
                {selectedDores.length > 0 && (
                  <div className="p-5 bg-amber-500/5 rounded-xl border border-amber-500/10 text-center font-bold text-amber-400 text-lg animate-fadeIn">
                    Então o App BiT foi feito para você.
                  </div>
                )}
              </section>

              {/* 3. COMO FUNCIONA */}
              <section id="funcionamento" className="space-y-10">
                <h2 className="text-2xl md:text-3xl font-extrabold text-center text-amber-100">Como funciona?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-neutral-900/20 p-8 rounded-2xl border border-white/5 space-y-3 relative overflow-hidden">
                    <div className="absolute -top-4 -right-4 text-6xl font-black text-amber-100/5">1</div>
                    <span className="text-amber-400 font-bold text-xs uppercase tracking-wider block">Passo 1</span>
                    <h3 className="font-bold text-amber-100 text-xl">Conte sua história.</h3>
                    <p className="text-sm text-amber-100/60 leading-relaxed">Crie seu perfil e compartilhe seus objetivos.</p>
                  </div>
                  <div className="bg-neutral-900/20 p-8 rounded-2xl border border-white/5 space-y-3 relative overflow-hidden">
                    <div className="absolute -top-4 -right-4 text-6xl font-black text-amber-100/5">2</div>
                    <span className="text-amber-400 font-bold text-xs uppercase tracking-wider block">Passo 2</span>
                    <h3 className="font-bold text-amber-100 text-xl">Descubra o que falta.</h3>
                    <p className="text-sm text-amber-100/60 leading-relaxed">Receba um diagnóstico com seu gap profissional e saiba exatamente quais passos dar.</p>
                  </div>
                  <div className="bg-neutral-900/20 p-8 rounded-2xl border border-white/5 space-y-3 relative overflow-hidden">
                    <div className="absolute -top-4 -right-4 text-6xl font-black text-amber-100/5">3</div>
                    <span className="text-amber-400 font-bold text-xs uppercase tracking-wider block">Passo 3</span>
                    <h3 className="font-bold text-amber-100 text-xl">Avance com apoio.</h3>
                    <p className="text-sm text-amber-100/60 leading-relaxed">Tenha acesso a formações, mentorias, oportunidades e suporte emocional ao longo da jornada.</p>
                  </div>
                </div>
              </section>

              {/* 4. OS DIFERENCIAIS */}
              <section id="diferenciais" className="space-y-10">
                <h2 className="text-2xl md:text-3xl font-extrabold text-center text-amber-100">Nossas frentes de atuação</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-neutral-900/30 p-6 rounded-2xl border border-white/5 space-y-2">
                    <h4 className="font-bold text-amber-100 text-base">Formação personalizada</h4>
                    <p className="text-sm text-amber-100/60 leading-relaxed">Trilhas que ajudam você a fechar as lacunas identificadas.</p>
                  </div>
                  <div className="bg-neutral-900/30 p-6 rounded-2xl border border-white/5 space-y-2">
                    <h4 className="font-bold text-amber-100 text-base">Empregabilidade inteligente</h4>
                    <p className="text-sm text-amber-100/60 leading-relaxed">Veja o quanto você já atende às vagas e descubra exatamente o que falta.</p>
                  </div>
                  <div className="bg-neutral-900/30 p-6 rounded-2xl border border-white/5 space-y-2">
                    <h4 className="font-bold text-amber-100 text-base">Mentorias humanizadas</h4>
                    <p className="text-sm text-amber-100/60 leading-relaxed">Conexões reais com pessoas que acreditam no seu potencial.</p>
                  </div>
                  <div className="bg-neutral-900/30 p-6 rounded-2xl border border-white/5 space-y-2">
                    <h4 className="font-bold text-amber-100 text-base">Experiências inspiradoras</h4>
                    <p className="text-sm text-amber-100/60 leading-relaxed">Histórias de quem enfrentou desafios parecidos e conseguiu avançar.</p>
                  </div>
                  <div className="bg-neutral-900/30 p-6 rounded-2xl border border-white/5 space-y-2 md:col-span-2">
                    <h4 className="font-bold text-amber-100 text-base">Bem-estar emocional</h4>
                    <p className="text-sm text-amber-100/60 leading-relaxed">Check-ins diários e orientações que cuidam da pessoa por inteiro.</p>
                  </div>
                </div>
              </section>

              {/* 5. O DIFERENCIAL QUE NINGUÉM TEM */}
              <section id="exclusivo" className="space-y-6 max-w-3xl mx-auto text-center bg-neutral-900/40 border border-amber-900/20 p-10 rounded-3xl shadow-xl">
                <h2 className="text-3xl font-extrabold text-amber-100">O diferencial que ninguém tem</h2>
                <div className="space-y-4 text-sm md:text-base text-amber-100/80 leading-relaxed max-w-xl mx-auto font-medium">
                  <p>A maioria das plataformas olha apenas para o currículo.</p>
                  <p className="text-amber-400 font-bold">O App BiT olha para a pessoa inteira.</p>
                  <p>Formação.<br/>Carreira.<br/>Rede de apoio.<br/>Saúde emocional.</p>
                  <p className="text-amber-50">Tudo conectado.</p>
                </div>
              </section>

              {/* 6. DEPOIMENTOS */}
              <section id="depoimentos" className="space-y-8">
                <h2 className="text-2xl md:text-3xl font-extrabold text-center text-amber-100">Relatos de quem já testou</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-8 bg-neutral-900/20 rounded-2xl border border-white/5 space-y-4">
                    <p className="text-sm text-amber-100/70 italic leading-relaxed">"Pela primeira vez não fui descartada de cara. O App BiT me mostrou que eu atendo 73% dos requisitos para vaga Júnior, e gerou a trilha da Oracle na hora para eu fechar o que faltava."</p>
                    <span className="text-[10px] text-amber-400 uppercase font-bold block">— Feedback de usuário em fase de testes (Mariana C.)</span>
                  </div>
                  <div className="p-8 bg-neutral-900/20 rounded-2xl border border-white/5 space-y-4">
                    <p className="text-sm text-amber-100/70 italic leading-relaxed">"A transição de carreira dá um medo absurdo. O check-in diário com emojis me dá suporte nas crises, e programar em par com mentores me deu a confiança que faltava."</p>
                    <span className="text-[10px] text-amber-400 uppercase font-bold block">— Feedback de usuário em fase de testes (Thiago S.)</span>
                  </div>
                </div>
              </section>

              {/* 7. O IMPACTO */}
              <section className="space-y-8 p-10 rounded-3xl border border-amber-500/10 text-center max-w-3xl mx-auto relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none" />
                <h3 className="text-2xl font-black text-amber-400">Imagine se…</h3>
                <div className="flex flex-col gap-4 text-center text-sm md:text-base text-amber-100/80 font-medium">
                  <p>Mais pessoas encontrassem pertencimento na tecnologia;</p>
                  <p>Barreiras deixassem de definir trajetórias;</p>
                  <p>Oportunidades chegassem para quem mais precisa.</p>
                </div>
                <p className="text-lg md:text-xl font-bold text-amber-50 mt-6">O App BiT existe para transformar esse cenário.</p>
              </section>

              {/* A FRASE QUE DEFINE */}
              <section className="text-center py-8 border-t border-b border-white/5 max-w-2xl mx-auto">
                <p className="text-xl md:text-3xl font-bold text-amber-100 italic leading-relaxed">
                  “O App BiT não conecta pessoas apenas a vagas. Conecta pessoas a possibilidades.”
                </p>
              </section>

              {/* 8. CTA FINAL */}
              <section className="text-center space-y-6 max-w-md mx-auto pb-12">
                <h3 className="text-2xl md:text-3xl font-black text-amber-100">Seu próximo passo pode começar hoje.</h3>
                <p className="text-sm text-amber-100/60 leading-relaxed">
                  Descubra oportunidades, fortaleça sua confiança e construa sua jornada na tecnologia com apoio real.
                </p>
                <button
                  onClick={() => { setView("onboarding"); setOnboardingStep(1); }}
                  className="bg-amber-500 hover:bg-amber-600 text-neutral-950 font-black px-8 py-4 rounded-xl text-base transition transform hover:scale-105 shadow-xl shadow-amber-950/40 w-full"
                >
                  Quero conhecer o App BiT
                </button>
              </section>

            </div>
          )}

          {/* ============================================================================
              2. FLUXO DE ONBOARDING 
              ============================================================================ */}
          {view === "onboarding" && (
            <div className="w-full max-w-xl bg-neutral-900/50 backdrop-blur-md rounded-2xl p-6 border border-white/5 shadow-2xl mx-auto">
              <div className="space-y-1 mb-6">
                <span className="text-[10px] uppercase font-bold text-amber-400">Passo {onboardingStep} de 4</span>
                <h2 className="text-xl font-bold text-amber-100">Preencha o seu perfil profissional</h2>
              </div>

              <form onSubmit={handleOnboardingSubmit} className="space-y-4">
                {onboardingStep === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-amber-400 mb-1">Nome Completo</label>
                      <input type="text" required value={form.nome} onChange={handleChange("nome")} className="w-full bg-neutral-950/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-amber-400 mb-1">E-mail</label>
                      <input type="email" required value={form.email} onChange={handleChange("email")} className="w-full bg-neutral-950/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm" />
                    </div>
                  </div>
                )}

                {onboardingStep === 2 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-amber-400 mb-1">Estado</label>
                        <select value={form.estado} onChange={handleChange("estado")} className="w-full bg-neutral-950/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm">
                          {estadosDisponiveis.map(st => (
                            <option key={st} value={st}>{st}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-amber-400 mb-1">Cidade</label>
                        <select value={form.cidade} onChange={handleChange("cidade")} className="w-full bg-neutral-950/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm">
                          {cidadesDisponiveis.map(cit => (
                            <option key={cit} value={cit}>{cit}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {onboardingStep === 3 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-amber-400 mb-1">Área Tech</label>
                      <select value={form.area} onChange={handleChange("area")} className="w-full bg-neutral-950/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm">
                        {listaAreasDisponiveis.map(a => (
                          <option key={a} value={a}>{a}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-amber-400 mb-1">Sua Especialidade</label>
                      <select value={form.subarea} onChange={e => setForm({...form, subarea: e.target.value})} className="w-full bg-neutral-950/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm">
                        {atuacoesDisponiveis.map(sub => (
                          <option key={sub} value={sub}>{sub}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {onboardingStep === 4 && (
                  <div className="p-4 bg-neutral-950/40 rounded-xl text-xs space-y-1 border border-white/5">
                    <p className="text-amber-100/50">Nome: <strong className="text-amber-100">{form.nome || "Não preenchido"}</strong></p>
                    <p className="text-amber-100/50">Local de Estudo: <strong className="text-amber-100">{form.cidade}, {form.estado}</strong></p>
                    <p className="text-amber-100/50">Foco Tech: <strong className="text-amber-400">{form.subarea}</strong></p>
                  </div>
                )}

                <div className="flex justify-between pt-4">
                  {onboardingStep > 1 && <button type="button" onClick={() => setOnboardingStep(onboardingStep - 1)} className="text-xs text-amber-200">Voltar</button>}
                  {onboardingStep < 4 ? (
                    <button type="button" onClick={() => setOnboardingStep(onboardingStep + 1)} className="ml-auto bg-amber-500 text-neutral-950 text-xs font-bold px-4 py-2 rounded-lg">Avançar</button>
                  ) : (
                    <button type="submit" className="ml-auto bg-amber-500 text-neutral-950 text-xs font-bold px-4 py-2 rounded-lg">Concluir Diagnóstico</button>
                  )}
                </div>
              </form>
            </div>
          )}

          {/* ============================================================================
              3. DASHBOARD
              ============================================================================ */}
          {view === "dashboard" && (
            <div className="w-full max-w-4xl space-y-6 mx-auto">
              <div className="p-6 bg-neutral-900/40 backdrop-blur rounded-2xl border border-white/5 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">Painel de Evolução App BiT</h2>
                  <p className="text-xs text-amber-100/50">Foco ativo em {form.subarea} · {form.cidade}, {form.estado}</p>
                </div>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                <button onClick={() => setActiveTab("perfil")} className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap ${activeTab === "perfil" ? "bg-amber-500 text-neutral-950" : "bg-neutral-900/40"}`}>📊 Diagnóstico (70/30)</button>
                <button onClick={() => setActiveTab("saude")} className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap ${activeTab === "saude" ? "bg-amber-500 text-neutral-950" : "bg-neutral-900/40"}`}>🧠 Saúde Mental</button>
                <button onClick={() => setActiveTab("visent")} className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap ${activeTab === "visent" ? "bg-amber-500 text-neutral-950" : "bg-neutral-900/40"}`}>📡 Rede (Vísent)</button>
              </div>

              <div className="bg-neutral-900/30 backdrop-blur rounded-2xl p-6 border border-white/5 min-h-[280px]">
                {activeTab === "perfil" && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-amber-400">Seu Match com o Mercado: {mockAiResponse.gap_percentual}%</h3>
                    <p className="text-xs text-amber-100/60">Gaps identificados pela inteligência artificial para o cargo de **{form.subarea}**:</p>
                    {mockAiResponse.gap_itens.map((item: string, idx: number) => (
                      <p key={idx} className="text-xs bg-neutral-950/40 p-2 rounded-lg text-amber-100/80">✕ {item}</p>
                    ))}
                    <div className="p-3 bg-amber-500/10 rounded-xl text-xs border border-amber-500/20">
                      <strong>Solução sugerida:</strong> {mockAiResponse.trilha_sugerida}
                    </div>
                  </div>
                )}

                {activeTab === "saude" && (
                  <div className="space-y-4">
                    <p className="text-xs text-amber-100/60 text-center">Como está seu bem-estar emocional hoje?</p>
                    <div className="flex justify-center gap-3">
                      <button onClick={() => handleMoodCheckin("Sobrecarregada", 2)} className="bg-neutral-950/40 p-3 rounded-xl text-2xl hover:bg-amber-500/10 transition transform hover:scale-110">🤯</button>
                      <button onClick={() => handleMoodCheckin("Triste", 4)} className="bg-neutral-950/40 p-3 rounded-xl text-2xl hover:bg-amber-500/10 transition transform hover:scale-110">😔</button>
                      <button onClick={() => handleMoodCheckin("Estável", 7)} className="bg-neutral-950/40 p-3 rounded-xl text-2xl hover:bg-amber-500/10 transition transform hover:scale-110">😀</button>
                    </div>
                    <div className="p-4 bg-neutral-950/40 rounded-xl text-xs space-y-2 border border-white/5 mt-4">
                      <p className="italic text-amber-50">"{saudeResponse.mensagem}"</p>
                      {saudeResponse.acao_sugerida && <p className="text-amber-400 mt-2"><strong>Ação Sugerida:</strong> {saudeResponse.acao_sugerida}</p>}
                    </div>
                  </div>
                )}

                {activeTab === "visent" && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-amber-100">Qualidade de Sinal Anatel em {form.cidade}</h3>
                    <p className="text-xs text-amber-100/70 leading-relaxed">Análise de tráfego baseada no arquivo **antenas_flp.csv**. Se sua rede móvel oscilar, baixe os recursos offline para estudar sem travamentos.</p>
                    {downloadProgress !== null ? (
                      <div className="text-xs text-amber-400 font-bold flex items-center gap-3">
                        <div className="w-full bg-neutral-950 rounded-full h-2">
                          <div className="bg-amber-500 h-2 rounded-full transition-all duration-300" style={{ width: `${downloadProgress}%` }}></div>
                        </div>
                        {downloadProgress}%
                      </div>
                    ) : (
                      <button className="bg-amber-500 hover:bg-amber-600 text-neutral-950 text-xs font-bold px-4 py-2 rounded-lg transition" onClick={triggerOfflineDownload}>
                        Sincronizar Aulas Offline
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

        </main>

        {/* LOG CONSOLE DIREITO */}
        <aside className="bg-neutral-950/80 border-t xl:border-t-0 xl:border-l border-amber-900/20 p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase text-amber-100 tracking-wider">Console API (Spring Boot)</h3>
            <div className="space-y-4 overflow-y-auto max-h-[500px]">
              {apiLogs.map((log) => (
                <div key={log.id} className="p-3 bg-neutral-900 rounded-xl text-[10px] space-y-2 border border-white/5">
                  <p className="font-bold text-green-400">{log.method} {log.endpoint}</p>
                  <pre className="bg-neutral-950 p-2 rounded text-amber-200 overflow-x-auto text-[9px] font-mono">{JSON.stringify(log.payload, null, 2)}</pre>
                  <pre className="bg-neutral-950 p-2 rounded text-green-300 overflow-x-auto text-[9px] font-mono">{JSON.stringify(log.response, null, 2)}</pre>
                </div>
              ))}
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
