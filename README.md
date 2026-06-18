# S06-26-AB-Equipe-36 — App BiT

Web App de Orientação Pessoal para grupos sub-representados.  
Hackathon App BiT · jun/2026

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Front-end | React + Vite + TypeScript + Tailwind |
| Back-end | Java 21 + Spring Boot 3 + Spring AI |
| Banco | PostgreSQL (Supabase / Render) |
| Deploy | Vercel (front) + Render (back) |

## Como rodar localmente

```bash
# 1. Clonar
git clone [https://github.com/No-Country-simulation/S06-26-AB-Equipe-36-Web_App_Development.git](https://github.com/No-Country-simulation/S06-26-AB-Equipe-36-Web_App_Development.git)
cd S06-26-AB-Equipe-36-Web_App_Development

# 2. Configurar variáveis de ambiente
cp .env.example server/.env       # preencher com valores reais
cp .env.example client/.env.local # ajustar VITE_API_URL

# 3. Front-end
cd client && npm install && npm run dev
# → http://localhost:5173

# 4. Back-end
cd ../server && mvn spring-boot:run
# → http://localhost:8080