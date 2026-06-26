package com.appbit.server.dto;

public record CadastroRequestDTO(
        String email,
        String senha,
        String tipoUsuario
) {}
