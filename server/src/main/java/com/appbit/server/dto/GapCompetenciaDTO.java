package com.appbit.server.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class GapCompetenciaDTO {

    private String vaga;

    private Integer aderencia;

    private List<String> lacunas;

}