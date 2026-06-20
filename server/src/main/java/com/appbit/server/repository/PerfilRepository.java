package com.appbit.server.repository;

import com.appbit.server.entity.Perfil;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PerfilRepository
        extends JpaRepository<Perfil, Long> {
}