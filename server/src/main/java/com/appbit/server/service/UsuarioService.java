package com.appbit.server.service;

import com.appbit.server.config.JwtService;
import com.appbit.server.dto.AuthResponseDTO;
import com.appbit.server.dto.CadastroRequestDTO;
import com.appbit.server.dto.LoginRequestDTO;
import com.appbit.server.entity.Usuario;
import com.appbit.server.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UsuarioService(
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthResponseDTO cadastro(CadastroRequestDTO dto) {

        if (usuarioRepository.existsByEmail(dto.email())) {
            throw new RuntimeException("E-mail já cadastrado.");
        }

        Usuario usuario = new Usuario();

        usuario.setEmail(dto.email());
        usuario.setSenha(passwordEncoder.encode(dto.senha()));
        usuario.setTipoUsuario(dto.tipoUsuario());
        usuario.setDataCriacao(LocalDateTime.now());

        usuario = usuarioRepository.save(usuario);

        String token = jwtService.gerarToken(usuario.getEmail());

        return new AuthResponseDTO(
                token,
                usuario.getId(),
                usuario.getTipoUsuario()
        );
    }

    public AuthResponseDTO login(LoginRequestDTO dto) {


        System.out.println("\n========== LOGIN SERVICE ==========");
        System.out.println("Email: " + dto.email());

        Usuario usuario = usuarioRepository
                .findByEmail(dto.email())
                .orElseThrow(() ->
                        new RuntimeException("Usuário não encontrado."));

        if (!passwordEncoder.matches(
                dto.senha(),
                usuario.getSenha())) {

            throw new RuntimeException("Senha inválida.");
        }

        String token = jwtService.gerarToken(usuario.getEmail());

        return new AuthResponseDTO(
                token,
                usuario.getId(),
                usuario.getTipoUsuario()
        );
    }


    public Usuario buscarUsuario(Long id) {

        return usuarioRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Usuário não encontrado."));
    }

}