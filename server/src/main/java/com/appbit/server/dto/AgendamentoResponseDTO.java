package com.appbit.server.dto;

import com.appbit.server.entity.enums.StatusAgendamento;

public record AgendamentoResponseDTO(
        Long id,
        StatusAgendamento status,
        String mensagem
) {
}
