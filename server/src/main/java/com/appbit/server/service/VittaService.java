package com.appbit.server.service;
import com.appbit.server.dto.MoodAnalysisDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VittaService {
    private final GeminiService geminiService;
    public MoodAnalysisDTO analyzeMood() {

        String prompt = """
                Gere uma mensagem acolhedora sobre saúde mental.
                Responda em português do Brasil.
                """;

        String analysis =
                geminiService.gerarTexto(prompt);
        return new MoodAnalysisDTO(analysis);
    }
}
