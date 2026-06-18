package com.appbit.server.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.cloud.vertexai.VertexAI;
import com.google.cloud.vertexai.api.GenerateContentResponse;
import com.google.cloud.vertexai.generativeai.GenerativeModel;

import jakarta.annotation.PostConstruct;

@Service
public class GeminiService {

    @Value("${spring.ai.google.vertexai.gemini.api-key}")
    private String apiKey;

    @Value("${spring.ai.google.vertexai.gemini.model}")
    private String modelName;

    private GenerativeModel model;

    @PostConstruct
    public void init() {
        try {
            // Inicializa a API do Google Vertex com a chave mapeada
            VertexAI vertexAi = new VertexAI("", apiKey);
            this.model = new GenerativeModel(modelName, vertexAi);
        } catch (IllegalArgumentException e) {
            // Captura caso os parâmetros passados sejam inválidos ou nulos
            throw new RuntimeException("Parâmetros inválidos na configuração do Gemini: " + e.getMessage(), e);
        } catch (Exception e) {
            // Captura qualquer outra exceção de inicialização do runtime do Google
            throw new RuntimeException("Erro inesperado ao iniciar o cliente do Gemini: " + e.getMessage(), e);
        }
    }

    public String gerarTexto(String prompt) {
        try {
            GenerateContentResponse response = this.model.generateContent(prompt);
            // Extração segura do conteúdo de texto retornado pelo modelo
            return response.getCandidates(0).getContent().getParts(0).getText();
        } catch (IndexOutOfBoundsException e) {
            // Tratamento específico exigido pela IDE para prevenir falhas de índice caso o modelo retorne vazio
            throw new RuntimeException("Erro ao extrair resposta vazia do modelo: " + e.getMessage(), e);
        } catch (Exception e) {
            // Captura genérica para outros erros de rede/comunicação da API
            throw new RuntimeException("Erro na comunicação com o Gemini: " + e.getMessage(), e);
        }
    }
}