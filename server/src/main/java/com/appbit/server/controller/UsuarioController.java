package com.appbit.server.controller;

import com.appbit.server.dto.AuthResponseDTO;
import com.appbit.server.dto.CadastroRequestDTO;
import com.appbit.server.dto.LoginRequestDTO;
import com.appbit.server.service.UsuarioService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin("*")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/cadastro")
    public AuthResponseDTO cadastro(
            @RequestBody CadastroRequestDTO dto) {

        return usuarioService.cadastro(dto);
    }

    @PostMapping("/login")
    public AuthResponseDTO login(
            @RequestBody LoginRequestDTO dto) {

        return usuarioService.login(dto);
    }
}