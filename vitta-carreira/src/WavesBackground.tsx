// WavesBackground.tsx
import React, { useEffect, useRef } from "react";

interface GradientOrb {
  xPhase: number;
  yPhase: number;
  xSpeed: number;
  ySpeed: number;
  baseRadius: number; // Mudado para baseRadius para permitir a deformação
  color: string;
  isClearOrb?: boolean;
}

export function WavesBackground(): React.JSX.Element {
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

    // Tons quentes e dourados originais
    const COFFEE_GOLD   = "156, 107, 58";  // O tom dourado iluminado (#9c6b3a)
    const COFFEE_MILK   = "138, 92, 53";   // O tom suave de café com leite intermediário
    const COFFEE_LIGHT  = "122, 79, 41";   // O tom médio dourado (#7a4f29)
    const COFFEE_INT    = "77, 48, 26";    // O tom escuro intermediário (#4d301a)
    const COFFEE_DARK   = "42, 26, 13";    // O tom mais profundo (#2a1a0d)

    // Configuração com deformação líquida e velocidade ampliada nas bordas
    const orbs: GradientOrb[] = [
      // --- PONTOS ESCUROS (Mantém a base densa do fundo) ---
      {
        xPhase: 0,
        yPhase: Math.PI / 2,
        xSpeed: 0.003,
        ySpeed: 0.002,
        baseRadius: 0.65,
        color: `rgba(${COFFEE_INT}, 0.85)`,
      },
      {
        xPhase: Math.PI,
        yPhase: 0,
        xSpeed: 0.002,
        ySpeed: 0.004,
        baseRadius: 0.85,
        color: `rgba(${COFFEE_DARK}, 0.90)`,
      },
      {
        xPhase: Math.PI * 0.4,
        yPhase: Math.PI * 0.8,
        xSpeed: -0.0022,
        ySpeed: 0.0032,
        baseRadius: 0.55,
        color: `rgba(${COFFEE_DARK}, 0.80)`,
      },
      {
        xPhase: Math.PI / 3,
        yPhase: Math.PI / 4,
        xSpeed: 0.004,
        ySpeed: 0.003,
        baseRadius: 0.5,
        color: `rgba(${COFFEE_LIGHT}, 0.75)`,
      },

      // --- PONTOS CLAROS/DOURADOS (Com muito mais movimento e alteração de forma líquida) ---
      {
        xPhase: Math.PI * 1.5,
        yPhase: Math.PI * 0.5,
        xSpeed: 0.009, // Velocidade de órbita bem mais rápida para agitar o líquido
        ySpeed: 0.011, 
        baseRadius: 0.6,
        color: `rgba(${COFFEE_GOLD}, 0.85)`,
        isClearOrb: true,
      },
      {
        xPhase: Math.PI * 0.7,
        yPhase: Math.PI * 1.2,
        xSpeed: 0.012, 
        ySpeed: 0.008, 
        baseRadius: 0.65,
        color: `rgba(${COFFEE_MILK}, 0.80)`,
        isClearOrb: true,
      },
      {
        xPhase: Math.PI * 1.9,
        yPhase: Math.PI * 0.2,
        xSpeed: -0.01, // Sentido oposto rápido
        ySpeed: -0.009,
        baseRadius: 0.7,
        color: `rgba(${COFFEE_MILK}, 0.80)`,
        isClearOrb: true,
      },
    ];

    const render = () => {
      time += 0.005;

      const cx = width / 2 + Math.sin(time * 0.4) * width * 0.015;
      const cy = height / 2 + Math.cos(time * 0.3) * height * 0.015;

      // 1. Seu gradiente base original intocado
      const bg = ctx.createRadialGradient(
        cx,
        cy * 0.92,
        0,
        cx,
        cy,
        Math.max(width, height) * 0.75
      );
      bg.addColorStop(0, "#9c6b3a");
      bg.addColorStop(0.35, "#7a4f29");
      bg.addColorStop(0.7, "#4d301a");
      bg.addColorStop(1, "#2a1a0d");

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // 2. Renderização das massas se deformando
      ctx.globalCompositeOperation = "source-over";

      orbs.forEach((orb) => {
        // Define a distância do centro (claros vão para a borda extrema, escuros ficam no centro)
        const travelRadius = orb.isClearOrb ? 0.42 : 0.16;

        const orbX = cx + Math.sin(time * 15 * orb.xSpeed + orb.xPhase) * (width * travelRadius);
        const orbY = cy + Math.cos(time * 15 * orb.ySpeed + orb.yPhase) * (height * travelRadius);
        
        // --- O SEGREDO DA MUDANÇA DE FORMA LÍQUIDA ---
        // Se for um ponto claro, o tamanho dele pulsa constantemente de forma assimétrica
        // Simula o formato do gradiente esticando e encolhendo enquanto chacoalha
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
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}