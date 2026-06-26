package com.appbit.server.repository;

import com.appbit.server.entity.Perfil;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PerfilRepository extends JpaRepository<Perfil, Long> {

    Optional<Perfil> findByUsuario_Id(Long usuarioId);

    boolean existsByUsuario_Id(Long usuarioId);

}