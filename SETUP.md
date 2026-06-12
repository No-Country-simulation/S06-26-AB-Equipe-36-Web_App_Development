# Guia de Configuração do Ambiente - App BiT

Bem-vindo ao App BiT! Este guia descreve os passos para configurar o ambiente e seguir o fluxo de trabalho da equipe.

## 1. Configuração Inicial (Para quem ainda não clonou/configurou)

Se você é novo no projeto ou precisa configurar o ambiente na sua máquina:

1. **Clonagem e Branch `develop`:**

   ```bash
   git clone <https://github.com/No-Country-simulation/S06-26-AB-Equipe-36-Web_App_Development.git>
   cd S06-26-AB-Equipe-36-Web_App_Development
   git checkout develop
   ```

2. **Configuração do Back-end:**

   Navegue até a pasta /server.

   Crie um arquivo .env na pasta /server/ baseado no .env.example.

   Certifique-se de ter o Java 21 e o Maven configurados.

3. **Configuração do Front-end:**

   Navegue até a pasta /client.

   Instale as dependências: npm install.

   Crie um arquivo .env.local na pasta /client/ baseado no .env.example.

## 2. Fluxo de Trabalho (Para todo o time)

Para mantermos o código organizado, não trabalhamos diretamente na develop. Siga o padrão:

**Sincronize com a develop:**

```bash
git checkout develop
git pull origin develop
```

**Crie ou acesse sua branch:**

Se você ainda não possui uma branch individual, crie uma nova branch para trabalhar:

```bash
git checkout -b nome-da-sua-branch
```

Se você já possui uma branch individual (Leo, Agatha, Joel, etc.), acesse-a:

```bash
git checkout nome-da-sua-branch
# Caso precise atualizar com o que já foi feito na develop:
git merge develop
```

**Desenvolva e suba sua alteração:**

```bash
git add .
git commit -m "feat: descrição curta da tarefa"
git push origin nome-da-sua-branch
```

