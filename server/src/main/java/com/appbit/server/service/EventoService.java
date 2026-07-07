package com.appbit.server.service;

import com.appbit.server.dto.EventoResponseDTO;
import com.appbit.server.repository.EventoRepository;
import com.appbit.server.utils.GeoUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EventoService {

    private final EventoRepository repository;

    public List<EventoResponseDTO> buscarEventos(
            Double latitude,
            Double longitude,
            Double raio) {

        return repository.findByAtivoTrue()
                .stream()

                .map(evento -> {

                    double distancia = GeoUtils.calcularDistancia(
                            latitude,
                            longitude,
                            evento.getLatitude(),
                            evento.getLongitude());

                    return new EventoResponseDTO(
                            evento.getId(),
                            evento.getTitulo(),
                            evento.getDescricao(),
                            evento.getTipo(),
                            evento.getEndereco(),
                            evento.getDataEvento(),
                            evento.getVagas(),
                            distancia
                    );
                })

                .filter(e -> e.distanciaKm() <= raio)

                .sorted(Comparator.comparing(EventoResponseDTO::distanciaKm))

                .toList();
    }
}