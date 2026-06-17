import Link from "next/link";
import { WavesBackground } from "@/components/onboarding/WavesBackground";

const FEATURES = [
  {
    emoji: "🎯",
    title: "Match de vagas",
    desc: "Veja sua compatibilidade real com cada vaga — não um chute genérico, mas o que de fato falta no seu perfil.",
  },
  {
    emoji: "📘",
    title: "Trilhas gratuitas",
    desc: "Cursos certos pra fechar exatamente o gap identificado, sem perder tempo revendo o que você já sabe.",
  },
  {
    emoji: "🧭",
    title: "Mentoria de verdade",
    desc: "Conversas com quem já passou pelo caminho que você quer seguir, não um chatbot de FAQ.",
  },
  {
    emoji: "🐶",
    title: "Check-in de bem-estar",
    desc: "Buscar emprego cansa. O Agente Vitta pergunta como você está, todos os dias — e ajusta o plano com isso.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Cadastre-se e conte sua história",
    desc: "Poucos minutos: quem você é, onde está e o que busca agora.",
  },
  {
    n: "02",
    title: "Receba seu raio-x",
    desc: "Mostramos exatamente o que você já tem — e o que falta pra próxima vaga.",
  },
  {
    n: "03",
    title: "Avance com plano sob medida",
    desc: "Trilhas, vagas compatíveis e mentoria, organizados pra fechar o seu gap.",
  },
];

export default function LandingPage() {
  return (
    <main className="relative z-10 min-h-screen overflow-hidden text-foreground">
      <WavesBackground />

      {/* HERO */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        <div className="relative z-10 flex max-w-2xl flex-col items-center">
          <p className="text-eyebrow">Vitta Carreira</p>

          <h1 className="text-display mt-4 text-[clamp(2.2rem,6vw,3.6rem)] leading-[1.15]">
            Sua carreira merece o mesmo cuidado que você dá ao seu bem-estar
          </h1>

          <p className="mt-5 max-w-lg font-sans text-base text-foreground-muted">
            A gente identifica o que falta entre você e a vaga certa — e cuida de quem está nessa jornada.
          </p>

          <Link
            href="/cadastro"
            className="btn-primary mt-8 inline-block w-auto px-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            Começar agora
          </Link>
          <p className="mt-3 font-sans text-xs text-foreground-muted">Cadastro em poucos minutos, sem cartão.</p>

          {/* elemento-assinatura: o mesmo cartão de "match" que aparece dentro do produto */}
          <div className="mt-12 w-full max-w-sm rounded-xl border border-foreground-muted/20 bg-white/4 p-5 text-left backdrop-blur-sm">
            <div className="mb-1.5 flex justify-between">
              <span className="text-[0.85rem] font-bold text-foreground">Dev Front-end Júnior</span>
              <span className="text-[0.85rem] text-accent">70% Match</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-white/10">
              <div className="h-full w-[70%] rounded-full bg-accent" />
            </div>
            <p className="mt-2 text-[0.75rem] text-foreground-muted">É assim que mostramos seu progresso real.</p>
          </div>
        </div>
      </section>

      {/* PROPOSTA DE VALOR */}
      <section className="border-t border-foreground-muted/10 px-6 py-20 text-center">
        <p className="mx-auto max-w-xl font-sans text-lg leading-relaxed text-foreground">
          Não prometemos vaga garantida. Mostramos o caminho real: o que você já tem, o que falta, e como fechar
          esse gap com <span className="text-accent">trilhas, mentoria e cuidado</span> — sem achismo.
        </p>
      </section>

      {/* FEATURES */}
      <section className="border-t border-foreground-muted/10 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <p className="text-eyebrow text-center">O que você encontra aqui</p>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="feature-card">
                <span className="text-[1.4rem]">{f.emoji}</span>
                <h3 className="text-display mt-3 text-[1.1rem]">{f.title}</h3>
                <p className="mt-2 font-sans text-sm text-foreground-muted">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="border-t border-foreground-muted/10 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-eyebrow text-center">Como funciona</p>
          <div className="mt-10 flex flex-col gap-8">
            {STEPS.map((s) => (
              <div key={s.n} className="flex items-start gap-5">
                <span className="text-display text-accent text-[2.2rem] leading-none">{s.n}</span>
                <div>
                  <h3 className="text-display text-[1.2rem]">{s.title}</h3>
                  <p className="mt-1 font-sans text-sm text-foreground-muted">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="border-t border-foreground-muted/10 px-6 py-20 text-center">
        <h2 className="text-display text-[clamp(1.6rem,4vw,2.2rem)]">Pronto pra começar?</h2>
        <Link
          href="/cadastro"
          className="btn-primary mt-6 inline-block w-auto px-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          Criar minha conta
        </Link>
      </section>

      <footer className="border-t border-foreground-muted/10 px-6 py-8 text-center">
        <p className="font-sans text-xs text-foreground-muted">Vitta Carreira</p>
      </footer>
    </main>
  );
}
