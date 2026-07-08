package com.appbit.server.dto;

import java.util.List;

public record GeminiResponseDTO(

        String melhorTrilha,

        String justificativa,

        List<String> planoEstudos

) {}