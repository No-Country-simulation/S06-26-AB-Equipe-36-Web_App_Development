package com.appbit.server.dto;

import java.util.List;

public record MatchResponseDTO(

        Integer aderencia,

        List<String> lacunas,

        String melhorTrilha,

        String justificativa,

        List<String> planoEstudos

) {}
