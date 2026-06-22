package com.appbit.server.dto;

import java.math.BigDecimal;
import java.util.List;

public record LogSaudeRequestDTO(

        Long usuarioId,
        String humorDiario,
        BigDecimal horasSono,
        String nivelEstresse,
        List<String> sentimentos,
        String notasTexto

) {
}
