package com.appbit.server.controller;

import com.appbit.server.dto.PerfilRequestDTO;
import com.appbit.server.dto.PerfilResponseDTO;
import com.appbit.server.config.CustomUserDetails;
import com.appbit.server.service.PerfilService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/perfis")
@CrossOrigin("*")
public class PerfilController {

    private final PerfilService perfilService;

    public PerfilController(PerfilService perfilService) {
        this.perfilService = perfilService;
    }

    @PostMapping
    public PerfilResponseDTO criarPerfil(
            Authentication authentication,
            @RequestBody PerfilRequestDTO dto) {

        CustomUserDetails user =
                (CustomUserDetails) authentication.getPrincipal();

        return perfilService.criarPerfil(
                user.getUsuario().getId(),
                dto
        );
    }

    @GetMapping
    public PerfilResponseDTO buscarPerfil(
            Authentication authentication) {

        CustomUserDetails user =
                (CustomUserDetails) authentication.getPrincipal();

        return perfilService.buscarPerfil(
                user.getUsuario().getId()
        );
    }

    @PutMapping
    public PerfilResponseDTO atualizarPerfil(
            Authentication authentication,
            @RequestBody PerfilRequestDTO dto) {

        CustomUserDetails user =
                (CustomUserDetails) authentication.getPrincipal();

        return perfilService.atualizarPerfil(
                user.getUsuario().getId(),
                dto
        );
    }
}