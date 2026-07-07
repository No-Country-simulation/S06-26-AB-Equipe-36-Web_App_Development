package com.appbit.server.controller;

import com.appbit.server.dto.MatchRequestDTO;
import com.appbit.server.dto.MatchResponseDTO;
import com.appbit.server.service.MatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/match")
@RequiredArgsConstructor
public class MatchController {

    private final MatchService service;

    @PostMapping
    public MatchResponseDTO analisar(
            @RequestBody MatchRequestDTO dto){

        return service.analisar(dto.usuarioId());

    }

}