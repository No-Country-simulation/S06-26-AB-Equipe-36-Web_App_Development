"use client";
import { useState } from "react";
import dados from "@/lib/data/orientarMentores.json";

type Mentor = (typeof dados.mentores)[0];
type Horario = Mentor["horarios"][0];

function Estrelas({ nota }: { nota: number }) {
  return (
    <span className="font-sans text-xs text-yellow-400">
      {"★".repeat(Math.floor(nota))}
      {nota % 1 >= 0.5 ? "½" : ""}
      <span className="ml-1 text-foreground-muted">{nota.toFixed(1)}</span>
    </span>
  );
}

function Avatar({ mentor }: { mentor: Mentor }) {
  return (
    <div
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-sans text-base font-bold text-background"
      style={{ backgroundColor: mentor.cor }}
    >
      {mentor.iniciais}
    </div>
  );
}

function CardMentor({
  mentor,
  onAgendar,
}: {
  mentor: Mentor;
  onAgendar: (m: Mentor) => void;
}) {
  return (
    <div className="feature-card flex flex-col gap-4">
      {/* cabeçalho */}
      <div className="flex items-start gap-3">
        <Avatar mentor={mentor} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-sans text-sm font-bold text-foreground">{mentor.nome}</h3>
            {mentor.disponivel ? (
              <span className="rounded-full bg-green-500/15 px-2 py-0.5 font-sans text-[0.6rem] text-green-400">
                Disponível
              </span>
            ) : (
              <span className="rounded-full bg-white/10 px-2 py-0.5 font-sans text-[0.6rem] text-foreground-muted">
                Agenda cheia
              </span>
            )}
          </div>
          <p className="font-sans text-xs text-foreground-muted">{mentor.titulo}</p>
          <p className="font-sans text-xs text-accent">{mentor.empresa}</p>
        </div>
      </div>

      {/* bio */}
      <p className="font-sans text-sm leading-relaxed text-foreground-muted">{mentor.bio}</p>

      {/* especialidades */}
      <div className="flex flex-wrap gap-1.5">
        {mentor.especialidades.map((e) => (
          <span
            key={e}
            className="rounded-full border border-foreground-muted/20 bg-white/4 px-2.5 py-0.5 font-sans text-[0.65rem] text-foreground-muted"
          >
            {e}
          </span>
        ))}
      </div>

      {/* rodapé */}
      <div className="flex items-center justify-between border-t border-foreground-muted/10 pt-3">
        <div className="flex flex-col gap-0.5">
          <Estrelas nota={mentor.avaliacao} />
          <span className="font-sans text-[0.65rem] text-foreground-muted">
            {mentor.sessoes} sessões realizadas
          </span>
        </div>
        <button
          type="button"
          onClick={() => onAgendar(mentor)}
          disabled={!mentor.disponivel}
          className="rounded-xl border border-accent bg-accent/10 px-4 py-2 font-sans text-xs uppercase tracking-wider text-foreground transition-colors hover:bg-accent/25 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Agendar
        </button>
      </div>
    </div>
  );
}

function ModalAgendamento({
  mentor,
  onFechar,
}: {
  mentor: Mentor;
  onFechar: () => void;
}) {
  const [horarioSelecionado, setHorarioSelecionado] = useState<Horario | null>(null);
  const [confirmado, setConfirmado] = useState(false);

  const formatarData = (dataStr: string) =>
    new Date(dataStr + "T12:00:00").toLocaleDateString("pt-BR", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });

  if (confirmado) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 px-4 backdrop-blur-sm">
        <div className="w-full max-w-sm rounded-2xl border border-foreground-muted/20 bg-background p-8 text-center">
          <p className="text-[2rem]">🎉</p>
          <h2 className="text-display mt-2 text-[1.4rem]">Sessão agendada!</h2>
          <p className="mt-2 font-sans text-sm text-foreground-muted">
            Sua sessão com <strong className="text-foreground">{mentor.nome}</strong> está marcada para{" "}
            <strong className="text-accent">
              {formatarData(horarioSelecionado!.data)} às {horarioSelecionado!.horario}
            </strong>
            . Você receberá uma confirmação por e-mail.
          </p>
          <button
            type="button"
            onClick={onFechar}
            className="btn-primary mt-6"
          >
            Fechar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 px-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl border border-foreground-muted/20 bg-background p-6">
        {/* cabeçalho do modal */}
        <div className="mb-5 flex items-center gap-3">
          <Avatar mentor={mentor} />
          <div>
            <h2 className="font-sans text-sm font-bold text-foreground">{mentor.nome}</h2>
            <p className="font-sans text-xs text-foreground-muted">{mentor.titulo}</p>
          </div>
          <button
            type="button"
            onClick={onFechar}
            className="ml-auto font-sans text-foreground-muted hover:text-foreground"
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        <p className="field-label mb-3">Escolha um horário disponível</p>

        <div className="flex flex-col gap-2">
          {mentor.horarios.map((h, i) => (
            <button
              key={i}
              type="button"
              disabled={!h.disponivel}
              onClick={() => setHorarioSelecionado(h)}
              className={`option-card ${horarioSelecionado === h ? "is-active" : ""} disabled:cursor-not-allowed disabled:opacity-40`}
            >
              <span className="text-sm">🗓</span>
              <span className="option-label text-sm">
                {formatarData(h.data)} · {h.horario}
              </span>
              {!h.disponivel && (
                <span className="ml-auto font-sans text-[0.65rem] text-foreground-muted">Ocupado</span>
              )}
            </button>
          ))}
        </div>

        <button
          type="button"
          disabled={!horarioSelecionado}
          onClick={() => setConfirmado(true)}
          className="btn-primary mt-5 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Confirmar agendamento
        </button>
      </div>
    </div>
  );
}

export default function MentoriaArea() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  const [mentorAgendando, setMentorAgendando] = useState<Mentor | null>(null);

  const categorias = ["Todos", ...dados.categorias];

  const mentoresFiltrados =
    categoriaAtiva === "Todos"
      ? dados.mentores
      : dados.mentores.filter((m) => m.categoria === categoriaAtiva);

  return (
    <div className="relative z-10 min-h-screen text-foreground">
      <div className="mx-auto max-w-4xl px-6 py-10">

        {/* cabeçalho */}
        <div className="mb-8">
          <p className="text-eyebrow">Vitta Carreira</p>
          <h1 className="text-display mt-1 text-[clamp(1.6rem,4vw,2.2rem)]">
            Área de Mentorias
          </h1>
          <p className="mt-2 font-sans text-sm text-foreground-muted">
            Profissionais reais que já passaram pelo caminho que você quer seguir.
          </p>
        </div>

        {/* filtro por categoria */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categorias.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoriaAtiva(cat)}
              className={`rounded-full border px-4 py-1.5 font-sans text-xs uppercase tracking-wider transition-colors ${
                categoriaAtiva === cat
                  ? "border-accent bg-accent/15 text-foreground"
                  : "border-foreground-muted/20 bg-white/4 text-foreground-muted hover:border-foreground-muted/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* grid de mentores */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {mentoresFiltrados.map((mentor) => (
            <CardMentor
              key={mentor.id}
              mentor={mentor}
              onAgendar={setMentorAgendando}
            />
          ))}
        </div>
      </div>

      {/* modal de agendamento */}
      {mentorAgendando && (
        <ModalAgendamento
          mentor={mentorAgendando}
          onFechar={() => setMentorAgendando(null)}
        />
      )}
    </div>
  );
}
