package com.appbit.server.service;

import com.appbit.server.dto.PerfilRequestDTO;
import com.appbit.server.dto.PerfilResponseDTO;
import com.appbit.server.entity.Competencia;
import com.appbit.server.entity.Perfil;
import com.appbit.server.entity.Usuario;
import com.appbit.server.repository.CompetenciaRepository;
import com.appbit.server.repository.PerfilRepository;
import com.appbit.server.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class PerfilService {

    private final PerfilRepository perfilRepository;
    private final UsuarioRepository usuarioRepository;
    private final CompetenciaRepository competenciaRepository;

    public PerfilService(
            PerfilRepository perfilRepository,
            UsuarioRepository usuarioRepository,
            CompetenciaRepository competenciaRepository
    ) {

        this.perfilRepository = perfilRepository;
        this.usuarioRepository = usuarioRepository;
        this.competenciaRepository = competenciaRepository;
    }

    public PerfilResponseDTO criarPerfil(Long usuarioId, PerfilRequestDTO dto) {

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Usuário não encontrado."
                        ));

        if (perfilRepository.existsByUsuario_Id(usuarioId)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Este usuário já possui um perfil."
            );
        }

        Set<Competencia> competencias = dto.competencias()
                .stream()
                .map(nome -> competenciaRepository
                        .findByNomeIgnoreCase(nome.trim())
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Competência não encontrada: " + nome
                                )))
                .collect(Collectors.toSet());

        Perfil perfil = Perfil.builder()
                .usuario(usuario)
                .nomeCompleto(dto.nomeCompleto())
                .biografia(dto.biografia())
                .competencias(competencias)
                .genero(dto.genero())
                .dataNascimento(dto.dataNascimento())
                .escolaridade(dto.escolaridade())
                .localizacao(dto.localizacao())
                .nivelExperiencia(dto.nivelExperiencia())
                .areaAtuacao(dto.areaAtuacao())
                .objetivoProfissional(dto.objetivoProfissional())
                .build();

        Perfil perfilSalvo = perfilRepository.save(perfil);

        return converter(perfilSalvo);
    }
    public PerfilResponseDTO buscarPerfil(Long usuarioId) {

        Perfil perfil = perfilRepository.findByUsuario_Id(usuarioId)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Perfil não encontrado."
                        ));

        return converter(perfil);
    }

    public PerfilResponseDTO atualizarPerfil(
            Long usuarioId,
            PerfilRequestDTO dto
    ) {

        Perfil perfil = perfilRepository.findByUsuario_Id(usuarioId)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Perfil não encontrado."
                        ));

        Set<Competencia> competencias = dto.competencias()
                .stream()
                .map(nome -> competenciaRepository
                        .findByNomeIgnoreCase(nome.trim())
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Competência não encontrada: " + nome
                                )))
                .collect(Collectors.toSet());

        perfil.setNomeCompleto(dto.nomeCompleto());
        perfil.setBiografia(dto.biografia());
        perfil.setCompetencias(competencias);
        perfil.setGenero(dto.genero());
        perfil.setDataNascimento(dto.dataNascimento());
        perfil.setEscolaridade(dto.escolaridade());
        perfil.setLocalizacao(dto.localizacao());
        perfil.setNivelExperiencia(dto.nivelExperiencia());
        perfil.setAreaAtuacao(dto.areaAtuacao());
        perfil.setObjetivoProfissional(dto.objetivoProfissional());

        Perfil perfilAtualizado = perfilRepository.save(perfil);

        return converter(perfilAtualizado);
    }

    private PerfilResponseDTO converter(Perfil perfil) {

        List<String> competencias = perfil.getCompetencias()
                .stream()
                .map(Competencia::getNome)
                .sorted()
                .toList();

        return new PerfilResponseDTO(
                perfil.getId(),
                perfil.getNomeCompleto(),
                perfil.getBiografia(),
                competencias,
                perfil.getGenero(),
                perfil.getDataNascimento(),
                perfil.getEscolaridade(),
                perfil.getLocalizacao(),
                perfil.getNivelExperiencia(),
                perfil.getAreaAtuacao(),
                perfil.getObjetivoProfissional()
        );
    }

}