"use client";
// WavesBackground.tsx
// Precisa ser Client Component: usa canvas, window e requestAnimationFrame,
// que só existem no navegador (Next.js renderiza Server Components no servidor por padrão).
import { useEffect, useRef } from "react";

interface GradientOrb {
  xPhase: number;
  yPhase: number;
  xSpeed: number;
  ySpeed: number;
  baseRadius: number;
  color: string;
  isClearOrb?: boolean;
}

export function WavesBackground() {
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
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    // Tons puramente dourados e iluminados para as orbs flutuantes
    const GOLD_VIBRANT  = "255, 208, 112"; // Ouro brilhante
    const GOLD_HONEY    = "235, 175, 95";  // Ouro mel aquecido
    const GOLD_SOFT     = "215, 155, 80";  // Dourado suave para transição

    // Reduzido para exatamente 5 orbs (pontos de luz) para uma interface mais limpa e fluida
    const orbs: GradientOrb[] = [
      { xPhase: 0, yPhase: Math.PI / 2, xSpeed: 0.003, ySpeed: 0.002, baseRadius: 0.70, color: `rgba(${GOLD_HONEY}, 0.38)` },
      { xPhase: Math.PI, yPhase: 0, xSpeed: 0.002, ySpeed: 0.004, baseRadius: 0.85, color: `rgba(${GOLD_SOFT}, 0.28)` },
      { xPhase: Math.PI / 3, yPhase: Math.PI / 4, xSpeed: 0.004, ySpeed: 0.003, baseRadius: 0.55, color: `rgba(${GOLD_VIBRANT}, 0.45)`, isClearOrb: true },
      { xPhase: Math.PI * 1.5, yPhase: Math.PI * 0.5, xSpeed: 0.009, ySpeed: 0.011, baseRadius: 0.65, color: `rgba(${GOLD_VIBRANT}, 0.48)`, isClearOrb: true },
      { xPhase: Math.PI * 0.7, yPhase: Math.PI * 1.2, xSpeed: 0.012, ySpeed: 0.008, baseRadius: 0.70, color: `rgba(${GOLD_HONEY}, 0.42)`, isClearOrb: true },
    ];

    const render = () => {
      time += prefersReducedMotion ? 0 : 0.005;

      const cx = width / 2 + Math.sin(time * 0.4) * width * 0.015;
      const cy = height / 2 + Math.cos(time * 0.3) * height * 0.015;

      // Mantido o fundo em chocolate denso e imponente com o centro em dourado aberto
      const bg = ctx.createRadialGradient(cx, cy * 0.92, 0, cx, cy, Math.max(width, height) * 0.90);
      bg.addColorStop(0, "#ffd070");    // Centro iluminado com dourado aberto vivo
      bg.addColorStop(0.25, "#a6734c"); // Chocolate dourado suave
      bg.addColorStop(0.55, "#613b1e"); // Chocolate meio amargo encorpado
      bg.addColorStop(0.85, "#3d2210"); // Chocolate escuro profundo
      bg.addColorStop(1, "#261408");    // Borda limite chocolate intenso para contraste perfeito

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";

      orbs.forEach((orb) => {
        const travelRadius = orb.isClearOrb ? 0.45 : 0.20;
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

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
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
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}