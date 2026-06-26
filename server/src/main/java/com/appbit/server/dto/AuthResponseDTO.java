package com.appbit.server.dto;

public record AuthResponseDTO(
        String token,
        Long usuarioId,
        String tipoUsuario

) {}