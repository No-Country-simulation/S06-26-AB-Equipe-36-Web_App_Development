export default function App() {
  return (
    <div
      className="relative size-full overflow-hidden"
      style={{ background: "#1a1814" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&display=swap');

        @keyframes wave1 {
          0%   { transform: translate(-30%, -20%) rotate(-18deg) scaleX(1)    scaleY(1); }
          20%  { transform: translate(-14%, -32%) rotate(-6deg)  scaleX(1.14) scaleY(0.88); }
          45%  { transform: translate(-38%, -10%) rotate(-28deg) scaleX(0.88) scaleY(1.14); }
          70%  { transform: translate(-10%, -26%) rotate(-8deg)  scaleX(1.10) scaleY(0.92); }
          100% { transform: translate(-30%, -20%) rotate(-18deg) scaleX(1)    scaleY(1); }
        }
        @keyframes wave2 {
          0%   { transform: translate(20%, -15%) rotate(22deg)  scaleX(1)    scaleY(1); }
          25%  { transform: translate(34%, -28%) rotate(8deg)   scaleX(0.86) scaleY(1.16); }
          55%  { transform: translate(10%, -4%)  rotate(36deg)  scaleX(1.15) scaleY(0.87); }
          80%  { transform: translate(28%, -20%) rotate(16deg)  scaleX(0.92) scaleY(1.10); }
          100% { transform: translate(20%, -15%) rotate(22deg)  scaleX(1)    scaleY(1); }
        }
        @keyframes wave3 {
          0%   { transform: translate(-20%, 25%) rotate(12deg)  scaleX(1)    scaleY(1); }
          30%  { transform: translate(-6%,  14%) rotate(0deg)   scaleX(1.13) scaleY(0.88); }
          60%  { transform: translate(-32%, 34%) rotate(22deg)  scaleX(0.87) scaleY(1.13); }
          85%  { transform: translate(-12%, 20%) rotate(8deg)   scaleX(1.08) scaleY(0.94); }
          100% { transform: translate(-20%, 25%) rotate(12deg)  scaleX(1)    scaleY(1); }
        }
        @keyframes wave4 {
          0%   { transform: translate(22%, 20%) rotate(-14deg) scaleX(1)    scaleY(1); }
          35%  { transform: translate(10%, 32%) rotate(-2deg)  scaleX(1.12) scaleY(0.89); }
          65%  { transform: translate(34%, 10%) rotate(-26deg) scaleX(0.88) scaleY(1.14); }
          90%  { transform: translate(18%, 26%) rotate(-10deg) scaleX(1.06) scaleY(0.95); }
          100% { transform: translate(22%, 20%) rotate(-14deg) scaleX(1)    scaleY(1); }
        }
        @keyframes wave5 {
          0%   { transform: translate(-50%, -50%) rotate(6deg)   scaleX(1)    scaleY(1); }
          28%  { transform: translate(-36%, -62%) rotate(20deg)  scaleX(1.14) scaleY(0.87); }
          56%  { transform: translate(-64%, -40%) rotate(-8deg)  scaleX(0.87) scaleY(1.14); }
          82%  { transform: translate(-44%, -56%) rotate(14deg)  scaleX(1.08) scaleY(0.93); }
          100% { transform: translate(-50%, -50%) rotate(6deg)   scaleX(1)    scaleY(1); }
        }
        @keyframes wave6 {
          0%   { transform: translate(-35%, -10%) rotate(-8deg)  scaleX(1)    scaleY(1); }
          38%  { transform: translate(-18%, -22%) rotate(6deg)   scaleX(1.12) scaleY(0.89); }
          72%  { transform: translate(-46%, -2%)  rotate(-20deg) scaleX(0.90) scaleY(1.12); }
          100% { transform: translate(-35%, -10%) rotate(-8deg)  scaleX(1)    scaleY(1); }
        }
        @keyframes wave7 {
          0%   { transform: translate(10%, 30%) rotate(16deg)  scaleX(1)    scaleY(1); }
          42%  { transform: translate(26%, 16%) rotate(2deg)   scaleX(0.88) scaleY(1.15); }
          78%  { transform: translate(4%,  42%) rotate(28deg)  scaleX(1.13) scaleY(0.88); }
          100% { transform: translate(10%, 30%) rotate(16deg)  scaleX(1)    scaleY(1); }
        }

        .welcome-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 300;
          font-style: italic;
          letter-spacing: 0.18em;
          color: #e8e0d5;
          text-shadow: 0 2px 40px rgba(200,180,160,0.18), 0 1px 0 rgba(255,255,255,0.06);
        }
        .welcome-sub {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 300;
          letter-spacing: 0.32em;
          color: #a09488;
          text-transform: uppercase;
          font-size: 0.72rem;
        }
        .welcome-line {
          width: 48px;
          height: 1px;
          background: linear-gradient(to right, transparent, #a09488, transparent);
          margin: 0 auto;
        }
      `}</style>

      <div className="absolute inset-0">
        {/* Mancha 1 — rosa acinzentado, canto superior esquerdo */}
        <div
          className="absolute opacity-[0.22] blur-2xl"
          style={{
            top: 0, left: 0, width: 780, height: 520,
            background: "radial-gradient(ellipse 55% 40% at 38% 55%, #c4929a 0%, #b87880 35%, transparent 72%)",
            borderRadius: "72% 28% 63% 37% / 44% 58% 42% 56%",
            animation: "wave1 14s ease-in-out -3s infinite",
          }}
        />

        {/* Mancha 2 — lavanda acinzentada, canto superior direito */}
        <div
          className="absolute opacity-[0.20] blur-2xl"
          style={{
            top: 0, right: 0, width: 700, height: 560,
            background: "radial-gradient(ellipse 60% 45% at 52% 48%, #8e84b0 0%, #7a6e98 38%, transparent 72%)",
            borderRadius: "38% 62% 47% 53% / 60% 38% 62% 40%",
            animation: "wave2 16s ease-in-out -8s infinite",
          }}
        />

        {/* Mancha 3 — verde sage escuro, inferior esquerdo */}
        <div
          className="absolute opacity-[0.22] blur-2xl"
          style={{
            bottom: 0, left: 0, width: 720, height: 540,
            background: "radial-gradient(ellipse 50% 55% at 42% 46%, #6e9278 0%, #5c8068 38%, transparent 72%)",
            borderRadius: "55% 45% 38% 62% / 48% 64% 36% 52%",
            animation: "wave3 13s ease-in-out -14s infinite",
          }}
        />

        {/* Mancha 4 — azul acinzentado, inferior direito */}
        <div
          className="absolute opacity-[0.20] blur-2xl"
          style={{
            bottom: 0, right: 0, width: 680, height: 520,
            background: "radial-gradient(ellipse 58% 42% at 50% 52%, #5e8ea8 0%, #4c7a92 38%, transparent 72%)",
            borderRadius: "44% 56% 62% 38% / 58% 44% 56% 42%",
            animation: "wave4 15s ease-in-out -5s infinite",
          }}
        />

        {/* Mancha 5 — âmbar marrom, centro */}
        <div
          className="absolute opacity-[0.18] blur-2xl"
          style={{
            top: "50%", left: "50%", width: 560, height: 480,
            background: "radial-gradient(ellipse 62% 50% at 48% 52%, #a07840 0%, #8a6430 42%, transparent 72%)",
            borderRadius: "62% 38% 50% 50% / 46% 56% 44% 54%",
            animation: "wave5 18s ease-in-out -18s infinite",
          }}
        />

        {/* Mancha 6 — pêssego neutro, meio esquerdo */}
        <div
          className="absolute opacity-[0.18] blur-2xl"
          style={{
            top: "40%", left: 0, width: 560, height: 440,
            background: "radial-gradient(ellipse 55% 48% at 44% 54%, #b07858 0%, #9a6448 40%, transparent 72%)",
            borderRadius: "48% 52% 66% 34% / 52% 42% 58% 48%",
            animation: "wave6 12s ease-in-out -10s infinite",
          }}
        />

        {/* Mancha 7 — menta fria, meio direito */}
        <div
          className="absolute opacity-[0.16] blur-2xl"
          style={{
            top: "35%", right: 0, width: 540, height: 460,
            background: "radial-gradient(ellipse 52% 46% at 54% 48%, #5a9490 0%, #487e7a 40%, transparent 72%)",
            borderRadius: "36% 64% 54% 46% / 62% 38% 64% 36%",
            animation: "wave7 17s ease-in-out -20s infinite",
          }}
        />

        {/* Véu escuro para aprofundar o fundo */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 30%, #1a1814 85%)" }}
        />
      </div>

      {/* Conteúdo elegante */}
      <div className="relative z-10 size-full flex items-center justify-center">
        <div className="text-center" style={{ gap: 0 }}>
            <h1 className="welcome-title" style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}>
            Bem-vindo
          </h1>
        </div>
      </div>
    </div>
  );
}
