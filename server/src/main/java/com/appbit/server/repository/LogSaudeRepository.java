package com.appbit.server.repository;

import com.appbit.server.entity.LogSaude;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LogSaudeRepository
        extends JpaRepository<LogSaude, Long> {

    List<LogSaude> findByUsuarioIdOrderByDataRegistroDesc(
            Long usuarioId
    );
}