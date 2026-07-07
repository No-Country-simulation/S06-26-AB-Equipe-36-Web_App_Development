package com.appbit.server.controller;

import com.appbit.server.dto.EventoResponseDTO;
import com.appbit.server.service.EventoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/eventos")
@RequiredArgsConstructor
public class EventoController {

    private final EventoService service;

    @GetMapping
    public ResponseEntity<List<EventoResponseDTO>> listar(

            @RequestParam Double latitude,

            @RequestParam Double longitude,

            @RequestParam Double raio

    ) {

        return ResponseEntity.ok(
                service.buscarEventos(latitude, longitude, raio)
        );
    }
}