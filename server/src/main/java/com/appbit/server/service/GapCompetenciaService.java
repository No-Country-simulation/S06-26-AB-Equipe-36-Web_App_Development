package com.appbit.server.service;

import com.appbit.server.dto.GapCompetenciaDTO;
import com.appbit.server.entity.Competencia;
import com.appbit.server.entity.Perfil;
import com.appbit.server.entity.Vaga;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class GapCompetenciaService {

    /**
     * Encontra a vaga com maior aderência ao perfil.
     */
    public GapCompetenciaDTO encontrarMelhorVaga(
            Perfil perfil,
            List<Vaga> vagas
    ) {

        return vagas.stream()
                .map(vaga -> calcularGap(perfil, vaga))
                .max(Comparator.comparingInt(GapCompetenciaDTO::getAderencia))
                .orElseThrow(() ->
                        new RuntimeException("Nenhuma vaga encontrada."));
    }

    /**
     * Calcula o GAP entre um perfil e uma vaga.
     */
    public GapCompetenciaDTO calcularGap(
            Perfil perfil,
            Vaga vaga
    ) {

        Set<Competencia> faltantes =
                new HashSet<>(vaga.getCompetencias());

        faltantes.removeAll(perfil.getCompetencias());

        int totalCompetencias = vaga.getCompetencias().size();

        int competenciasPossuidas =
                totalCompetencias - faltantes.size();

        int aderencia = totalCompetencias == 0
                ? 100
                : (int) Math.round(
                ((double) competenciasPossuidas / totalCompetencias) * 100
        );

        return GapCompetenciaDTO.builder()
                .vaga(vaga.getCargo())
                .aderencia(aderencia)
                .lacunas(
                        faltantes.stream()
                                .map(Competencia::getNome)
                                .sorted()
                                .toList()
                )
                .build();
    }

}
