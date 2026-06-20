package com.appbit.server.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record LogSaudeResponseDTO(

        Long id,
        Long usuarioId,
        LocalDate dataRegistro,
        String humorDiario,
        BigDecimal horasSono,
        String nivelEstresse,
        List<String> sentimentos,
        String notasTexto

) {
}
