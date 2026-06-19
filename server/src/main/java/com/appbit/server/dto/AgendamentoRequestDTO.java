package com.appbit.server.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public record AgendamentoRequestDTO(
        Long alunoId,
        Long mentorId,
        LocalDate dataAgendada,
        LocalTime horarioAgendada

) {
}
