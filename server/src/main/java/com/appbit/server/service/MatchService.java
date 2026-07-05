package com.appbit.server.service;

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

    private final ObjectMapper objectMapper = new ObjectMapper();

    public MatchResponseDTO analisar(Long usuarioId) {

        Perfil perfil = perfilRepository.findByUsuario_Id(usuarioId)
                .orElseThrow(() ->
                        new RuntimeException("Perfil não encontrado."));

        List<Trilha> trilhas = trilhaRepository.findAll();
        List<Vaga> vagas = vagaRepository.findAll();

        // DEBUG DO PERFIL
        System.out.println("========== PERFIL ==========");
        System.out.println("Nome: " + perfil.getNomeCompleto());
        System.out.println("Competências: " + perfil.getCompetencias());
        System.out.println("Objetivo: " + perfil.getObjetivoProfissional());
        System.out.println("============================");

        String prompt = Prompt.criar(
                perfil,
                vagas,
                trilhas
        );

        // DEBUG DO PROMPT
        System.out.println("========== PROMPT ==========");
        System.out.println(prompt);
        System.out.println("============================");

        String respostaGemini = geminiService.gerarTexto(prompt);

        // DEBUG DA RESPOSTA
        System.out.println("===== RESPOSTA DO GEMINI =====");
        System.out.println(respostaGemini);
        System.out.println("==============================");

        return converter(respostaGemini);
    }

    private MatchResponseDTO converter(String resposta) {

        try {

            resposta = resposta
                    .replace("```json", "")
                    .replace("```", "")
                    .trim();

            return objectMapper.readValue(
                    resposta,
                    MatchResponseDTO.class
            );

        } catch (Exception e) {

            System.out.println("===== RESPOSTA RECEBIDA =====");
            System.out.println(resposta);
            System.out.println("=============================");

            throw new RuntimeException(
                    "Erro ao converter resposta do Gemini.",
                    e
            );
        }
    }
}