package com.appbit.server.dto;

import java.time.LocalDate;
import java.util.List;

public record PerfilResponseDTO(
        long id,
        String nomeCompleto,
        String biografia,
        List<String> competencias,
        String genero,
        LocalDate dataNascimento,
        String escolaridade,
        String localizacao,
        String nivelExperiencia,
        String areaAtuacao,
        String objetivoProfissional

) {}
