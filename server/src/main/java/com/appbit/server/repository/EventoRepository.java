package com.appbit.server.repository;

import com.appbit.server.entity.Evento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventoRepository extends JpaRepository<Evento, Long> {
    List<Evento> findByAtivoTrue();
}
