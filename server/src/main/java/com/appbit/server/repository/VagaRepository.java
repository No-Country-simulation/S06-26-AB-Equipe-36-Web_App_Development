package com.appbit.server.repository;

import com.appbit.server.entity.Vaga;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VagaRepository
        extends JpaRepository<Vaga, Long> {
}