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

                .filter(v -> !v.getCompetencias().isEmpty())

                .map(v -> calcularGap(perfil, v))

                .max(Comparator.comparingInt(GapCompetenciaDTO::getAderencia))

                .orElseThrow(() ->
                        new RuntimeException("Nenhuma vaga válida encontrada."));
    }

    /**
     * Calcula o GAP entre um perfil e uma vaga.
     */
    public GapCompetenciaDTO calcularGap(
            Perfil perfil,
            Vaga vaga
    ) {

        System.out.println("\n==============================");
        System.out.println("VAGA: " + vaga.getCargo());

        System.out.println("Competências da vaga:");
        vaga.getCompetencias().forEach(c ->
                System.out.println("- " + c.getNome()));

        System.out.println("\nCompetências do perfil:");
        perfil.getCompetencias().forEach(c ->
                System.out.println("- " + c.getNome()));

        Set<Competencia> faltantes =
                new HashSet<>(vaga.getCompetencias());

        faltantes.removeAll(perfil.getCompetencias());

        System.out.println("\nCompetências faltantes:");
        faltantes.forEach(c ->
                System.out.println("- " + c.getNome()));

        int totalCompetencias = vaga.getCompetencias().size();

        int competenciasPossuidas =
                totalCompetencias - faltantes.size();

        int aderencia = totalCompetencias == 0
                ? 100
                : (int) Math.round(
                ((double) competenciasPossuidas / totalCompetencias) * 100
        );

        System.out.println("\nTotal competências: " + totalCompetencias);
        System.out.println("Possuídas: " + competenciasPossuidas);
        System.out.println("Aderência: " + aderencia);
        System.out.println("==============================");

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
