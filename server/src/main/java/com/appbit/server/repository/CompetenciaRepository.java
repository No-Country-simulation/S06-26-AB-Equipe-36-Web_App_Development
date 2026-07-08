package com.appbit.server.repository;

import com.appbit.server.entity.Competencia;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CompetenciaRepository extends JpaRepository<Competencia, Long> {

    Optional<Competencia> findByNomeIgnoreCase(String nome);

}
