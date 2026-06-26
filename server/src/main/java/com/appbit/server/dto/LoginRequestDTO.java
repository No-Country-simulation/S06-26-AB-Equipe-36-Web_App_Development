package com.appbit.server.dto;

public record LoginRequestDTO(
        String email,
        String senha
) {}
