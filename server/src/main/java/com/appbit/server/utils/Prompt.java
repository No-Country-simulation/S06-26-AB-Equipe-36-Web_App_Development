package com.appbit.server.utils;

import com.appbit.server.dto.GapCompetenciaDTO;
import com.appbit.server.entity.Competencia;
import com.appbit.server.entity.Perfil;
import com.appbit.server.entity.Trilha;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class Prompt {

    private Prompt() {
    }

    private static String competenciasToString(Set<Competencia> competencias) {

        if (competencias == null || competencias.isEmpty()) {
            return "Nenhuma competência cadastrada.";
        }

        return competencias.stream()
                .map(Competencia::getNome)
                .sorted()
                .collect(Collectors.joining(", "));
    }

    public static String criar(
            Perfil perfil,
            GapCompetenciaDTO gap,
            List<Trilha> trilhas
    ) {

        StringBuilder prompt = new StringBuilder();

        prompt.append("""
Você é um especialista em recrutamento, carreira e desenvolvimento profissional.

IMPORTANTE:

O sistema já executou toda a análise técnica.

O sistema já calculou:

- Melhor vaga
- Aderência
- Competências faltantes

NÃO recalcule nenhum desses valores.

Sua responsabilidade é somente:

1. Escolher a melhor trilha.
2. Explicar o motivo.
3. Criar um plano de estudos.

=====================================
PERFIL DO CANDIDATO
=====================================

""");

        prompt.append("Nome: ")
                .append(perfil.getNomeCompleto())
                .append("\n");

        prompt.append("Área de atuação: ")
                .append(perfil.getAreaAtuacao())
                .append("\n");

        prompt.append("Nível de experiência: ")
                .append(perfil.getNivelExperiencia())
                .append("\n");

        prompt.append("Objetivo profissional: ")
                .append(perfil.getObjetivoProfissional())
                .append("\n\n");

        prompt.append("Competências do candidato:\n");

        prompt.append(
                competenciasToString(
                        perfil.getCompetencias()
                )
        );

        prompt.append("\n\n");

        prompt.append("""
=====================================
RESULTADO DA ANÁLISE DO SISTEMA
=====================================

""");

        prompt.append("Melhor vaga encontrada: ")
                .append(gap.getVaga())
                .append("\n");

        prompt.append("Aderência calculada pelo sistema: ")
                .append(gap.getAderencia())
                .append("%\n\n");

        prompt.append("Competências faltantes:\n");

        if (gap.getLacunas().isEmpty()) {

            prompt.append("Nenhuma competência faltante.\n");

        } else {

            gap.getLacunas().forEach(l ->
                    prompt.append("- ")
                            .append(l)
                            .append("\n")
            );

        }

        prompt.append("\n");

        prompt.append("""
=====================================
TRILHAS DISPONÍVEIS
=====================================

""");

        for (Trilha trilha : trilhas) {

            prompt.append("Nome: ")
                    .append(trilha.getNome())
                    .append("\n");

            prompt.append("Descrição: ")
                    .append(trilha.getDescricao())
                    .append("\n");

            prompt.append("Nível: ")
                    .append(trilha.getNivel())
                    .append("\n");

            prompt.append("Carga Horária: ")
                    .append(trilha.getDuracaoHoras())
                    .append(" horas\n");

            prompt.append("Competências desenvolvidas:\n");

            prompt.append(
                    competenciasToString(
                            trilha.getCompetencias()
                    )
            );

            prompt.append("\n\n");
        }

        prompt.append("""
=====================================
SUA TAREFA
=====================================

Analise SOMENTE as competências faltantes.

Escolha APENAS UMA trilha dentre as trilhas disponíveis.

A recomendação deve priorizar a trilha que desenvolva o maior número possível
das competências faltantes.

Caso duas trilhas cubram a mesma quantidade de competências, escolha a de
menor carga horária.

Não invente trilhas.

Não invente competências.

Não altere a aderência calculada pelo sistema.

Não altere as competências faltantes.

Considere que o candidato já domina todas as competências informadas em seu perfil.

Explique em poucas linhas por que a trilha escolhida é a melhor opção.

Monte um plano de estudos em ordem lógica.

Cada etapa do plano deve conter uma ação prática.

Exemplo:

- Estudar Docker
- Criar um projeto utilizando Docker
- Estudar AWS
- Fazer deploy de uma aplicação
- Publicar o projeto no GitHub

=====================================
IMPORTANTE
=====================================

Retorne APENAS um JSON válido.

Não utilize Markdown.

Não utilize ```json.

Não escreva nenhuma explicação antes ou depois do JSON.

Retorne exatamente neste formato:

{
  "melhorTrilha": "",
  "justificativa": "",
  "planoEstudos": [
    ""
  ]
}

""");

        return prompt.toString();
    }

}
