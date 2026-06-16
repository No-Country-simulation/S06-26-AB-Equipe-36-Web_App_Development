import OnboardingFlow from "@/components/onboarding/OnboardingFlow";

export default function Home() {
  // Por enquanto o fluxo de cadastro está direto na home.
  // Quando a F001 (Landing Page) estiver pronta, mova este componente
  // para uma rota própria, ex: app/cadastro/page.tsx, e deixe a Home
  // como a página de marketing/captação.
  return <OnboardingFlow />;
}
