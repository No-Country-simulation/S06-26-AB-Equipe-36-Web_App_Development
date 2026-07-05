package com.appbit.server.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "perfis")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Perfil {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "usuario_id",
            nullable = false,
            unique = true
    )
    private Usuario usuario;

    @Column(name = "nome_completo", nullable = false)
    private String nomeCompleto;

    @Column(columnDefinition = "TEXT")
    private String biografia;

    @Column(columnDefinition = "TEXT")
    private String competencias;

    private String genero;

    @Column(name = "data_nascimento")
    private LocalDate dataNascimento;

    private String escolaridade;

    private String localizacao;

    @Column(name = "nivel_experiencia")
    private String nivelExperiencia;

    @Column(name = "area_atuacao")
    private String areaAtuacao;

    @Column(name = "objetivo_profissional")
    private String objetivoProfissional;
}