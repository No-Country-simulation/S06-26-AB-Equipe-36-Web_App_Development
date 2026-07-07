package com.appbit.server.utils;

import com.appbit.server.entity.Perfil;
import com.appbit.server.entity.Trilha;
import com.appbit.server.entity.Vaga;

import java.util.List;

public class Prompt {

    private Prompt() {
    }

    public static String criar(
            Perfil perfil,
            List<Vaga> vagas,
            List<Trilha> trilhas
    ) {

        StringBuilder prompt = new StringBuilder();

        prompt.append("Você é um especialista em recrutamento e desenvolvimento profissional.\n\n");

        prompt.append("Perfil do candidato:\n");
        prompt.append("Nome: ").append(perfil.getNomeCompleto()).append("\n");
        prompt.append("Competências: ").append(perfil.getCompetencias()).append("\n");
        prompt.append("Objetivo profissional: ").append(perfil.getObjetivoProfissional()).append("\n\n");

        prompt.append("Vagas disponíveis:\n");

        for (Vaga vaga : vagas) {
            prompt.append("- Empresa: ").append(vaga.getEmpresa()).append("\n");
            prompt.append("  Cargo: ").append(vaga.getCargo()).append("\n");
            prompt.append("  Competências: ").append(vaga.getCompetencias()).append("\n\n");
        }

        prompt.append("Trilhas disponíveis:\n");

        for (Trilha trilha : trilhas) {
            prompt.append("- ").append(trilha.getNome()).append("\n");
            prompt.append("  Competências: ").append(trilha.getCompetencias()).append("\n\n");
        }

        prompt.append("""
                Analise:

                1. Identifique as competências faltantes.
                2. Calcule a aderência do candidato às vagas.
                3. Recomende a melhor trilha.
                4. Explique o motivo.
                5. Monte um plano de estudos.

                Retorne apenas JSON.
                Calcule a aderência entre 0 e 100.
                
                Liste apenas as competências faltantes.
                
                Escolha apenas uma melhor trilha.
                
                Explique em poucas linhas.
                
                Monte um plano de estudos em formato de lista.
                IMPORTANTE
                
                Retorne EXATAMENTE este JSON.
                
                Não utilize markdown.
                
                Não utilize ```json.
                
                Não escreva nenhuma explicação.
                
                Retorne somente:
                
                {
                  "aderencia": 0,
                  "lacunas": [],
                  "melhorTrilha": "",
                  "justificativa": "",
                  "planoEstudos": []
                }
                """);

        return prompt.toString();
    }
}

