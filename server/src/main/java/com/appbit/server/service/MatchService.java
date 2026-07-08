package com.appbit.server.service;

import com.appbit.server.dto.GapCompetenciaDTO;
import com.appbit.server.dto.GeminiResponseDTO;
import com.appbit.server.dto.MatchResponseDTO;
import com.appbit.server.entity.Perfil;
import com.appbit.server.entity.Trilha;
import com.appbit.server.entity.Vaga;
import com.appbit.server.repository.PerfilRepository;
import com.appbit.server.repository.TrilhaRepository;
import com.appbit.server.repository.VagaRepository;
import com.appbit.server.utils.Prompt;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MatchService {

    private final PerfilRepository perfilRepository;
    private final TrilhaRepository trilhaRepository;
    private final VagaRepository vagaRepository;
    private final GeminiService geminiService;
    private final GapCompetenciaService gapCompetenciaService;

    private final ObjectMapper objectMapper;

    public MatchResponseDTO analisar(Long usuarioId) {

        Perfil perfil = perfilRepository
                .findByUsuario_Id(usuarioId)
                .orElseThrow(() ->
                        new RuntimeException("Perfil não encontrado."));

        List<Vaga> vagas = vagaRepository.findAll();

        List<Trilha> trilhas = trilhaRepository.findAll();

        GapCompetenciaDTO gap =
                gapCompetenciaService.encontrarMelhorVaga(
                        perfil,
                        vagas
                );

        // ==========================
        // DEBUG
        // ==========================

        System.out.println("\n========== PERFIL ==========");

        System.out.println("Nome: "
                + perfil.getNomeCompleto());

        System.out.println("Competências: "
                + perfil.getCompetencias());

        System.out.println("============================");

        System.out.println("\n========== GAP ==========");

        System.out.println("Melhor vaga: "
                + gap.getVaga());

        System.out.println("Aderência: "
                + gap.getAderencia());

        System.out.println("Lacunas: "
                + gap.getLacunas());

        System.out.println("==========================");

        String prompt = Prompt.criar(

                perfil,

                gap,

                trilhas

        );

        System.out.println("\n========== PROMPT ==========");

        System.out.println(prompt);

        System.out.println("============================");

        String respostaGemini =
                geminiService.gerarTexto(prompt);

        System.out.println("\n======= RESPOSTA GEMINI =======");

        System.out.println(respostaGemini);

        System.out.println("===============================");

        GeminiResponseDTO respostaIA =
                converter(respostaGemini);

        return new MatchResponseDTO(

                gap.getAderencia(),

                gap.getLacunas(),

                gap.getVaga(),

                respostaIA.melhorTrilha(),

                respostaIA.justificativa(),

                respostaIA.planoEstudos()

        );
    }
    private GeminiResponseDTO converter(String resposta) {

        try {

            if (resposta == null || resposta.isBlank()) {
                throw new RuntimeException("Resposta vazia retornada pelo Gemini.");
            }

            resposta = resposta
                    .replace("```json", "")
                    .replace("```", "")
                    .trim();

            System.out.println("\n========== JSON LIMPO ==========");
            System.out.println(resposta);
            System.out.println("================================");

            return objectMapper.readValue(
                    resposta,
                    GeminiResponseDTO.class
            );

        } catch (Exception e) {

            throw new RuntimeException(
                    "Erro ao converter resposta do Gemini.",
                    e
            );
        }
    }
}