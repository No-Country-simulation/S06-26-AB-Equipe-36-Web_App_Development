package com.appbit.server.dto;

import java.time.LocalDateTime;

public record EventoResponseDTO(
        Long id,
        String titulo,
        String descricao,
        String tipo,
        String endereco,
        LocalDateTime dataEvento,
        Integer vagas,
        Double distanciaKm

) {}