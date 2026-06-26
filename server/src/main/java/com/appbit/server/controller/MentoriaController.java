package com.appbit.server.controller;

import com.appbit.server.dto.AgendamentoRequestDTO;
import com.appbit.server.dto.AgendamentoResponseDTO;
import com.appbit.server.dto.MentoriaResponseDTO;
import com.appbit.server.service.MentoriaService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orientar")
@RequiredArgsConstructor
public class MentoriaController {

    private final MentoriaService mentoriaService;

    @GetMapping
    public List<MentoriaResponseDTO> listarMentores() {

        return mentoriaService.listarMentores();
    }

    @PostMapping("/agendar")
    public AgendamentoResponseDTO agendar(
            @RequestBody
            AgendamentoRequestDTO request) {

        return mentoriaService.agendar(request);
    }
}