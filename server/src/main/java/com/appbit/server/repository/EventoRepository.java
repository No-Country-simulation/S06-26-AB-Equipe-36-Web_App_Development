
package com.appbit.server.repository;

import com.appbit.server.entity.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EventoRepository extends JpaRepository<Evento, Long> {

    @Query("""
        SELECT e
        FROM Evento e
        WHERE e.ativo = true
        AND (
            6371 * acos(
                cos(radians(:latitude))
                * cos(radians(e.latitude))
                * cos(radians(e.longitude) - radians(:longitude))
                + sin(radians(:latitude))
                * sin(radians(e.latitude))
            )
        ) <= :raio
        """)
    List<Evento> buscarEventosNoRaio(

            @Param("latitude") Double latitude,

            @Param("longitude") Double longitude,

            @Param("raio") Double raio

    );

}