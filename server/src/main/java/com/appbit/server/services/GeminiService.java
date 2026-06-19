package com.appbit.server.services;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import java.util.List;
import java.util.Map;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.model}")
    private String model;

    private WebClient webClient;

    @PostConstruct
    public void init() {

        try {

            System.out.println("MODEL = " + model);
            System.out.println(
                    "API KEY CONFIGURADA = "
                            + (apiKey != null && !apiKey.isBlank())
            );

            this.webClient = WebClient.builder()
                    .baseUrl("https://generativelanguage.googleapis.com")
                    .build();

        } catch (IllegalArgumentException e) {

            throw new RuntimeException(
                    "Parâmetros inválidos na configuração do Gemini: "
                            + e.getMessage(),
                    e
            );

        } catch (Exception e) {

            throw new RuntimeException(
                    "Erro inesperado ao iniciar o cliente Gemini: "
                            + e.getMessage(),
                    e
            );
        }
    }

    public String gerarTexto(String prompt) {

        try {

            String endpoint =
                    "/v1beta/models/"
                            + model
                            + ":generateContent?key="
                            + apiKey;

            System.out.println(
                    "Endpoint Gemini: https://generativelanguage.googleapis.com"
                            + endpoint.replace(apiKey, "***")
            );

            Map<String, Object> requestBody = Map.of(
                    "contents",
                    List.of(
                            Map.of(
                                    "parts",
                                    List.of(
                                            Map.of(
                                                    "text",
                                                    prompt
                                            )
                                    )
                            )
                    )
            );

            Map<?, ?> response =
                    webClient.post()
                            .uri(endpoint)
                            .contentType(MediaType.APPLICATION_JSON)
                            .bodyValue(requestBody)
                            .retrieve()
                            .bodyToMono(Map.class)
                            .block();

            if (response == null) {
                throw new RuntimeException(
                        "Resposta vazia retornada pelo Gemini."
                );
            }

            List<?> candidates =
                    (List<?>) response.get("candidates");

            if (candidates == null || candidates.isEmpty()) {
                throw new RuntimeException(
                        "Nenhum candidato retornado pelo Gemini."
                );
            }

            Map<?, ?> candidate =
                    (Map<?, ?>) candidates.get(0);

            Map<?, ?> content =
                    (Map<?, ?>) candidate.get("content");

            List<?> parts =
                    (List<?>) content.get("parts");

            if (parts == null || parts.isEmpty()) {
                throw new RuntimeException(
                        "Nenhuma parte de conteúdo retornada pelo Gemini."
                );
            }

            Map<?, ?> part =
                    (Map<?, ?>) parts.get(0);

            return String.valueOf(
                    part.get("text")
            );

        } catch (WebClientResponseException.NotFound e) {

            throw new RuntimeException(
                    "Modelo Gemini não encontrado. Verifique o valor de gemini.model. Modelo atual: "
                            + model,
                    e
            );

        } catch (WebClientResponseException.Unauthorized e) {

            throw new RuntimeException(
                    "API Key inválida ou expirada.",
                    e
            );

        } catch (IndexOutOfBoundsException e) {

            throw new RuntimeException(
                    "Erro ao extrair resposta do Gemini: "
                            + e.getMessage(),
                    e
            );

        } catch (ClassCastException e) {

            throw new RuntimeException(
                    "Estrutura de resposta inválida retornada pelo Gemini: "
                            + e.getMessage(),
                    e
            );



        }catch (WebClientResponseException e) {

            System.out.println("STATUS: " + e.getStatusCode());
            System.out.println("BODY: " + e.getResponseBodyAsString());

            throw e;
        }

        catch (Exception e) {

            throw new RuntimeException(
                    "Erro na comunicação com o Gemini: "
                            + e.getMessage(),
                    e
            );

        }

    }
}
