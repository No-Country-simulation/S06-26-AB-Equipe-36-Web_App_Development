package com.appbit.server.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "competencias")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = "id")
@ToString(of = {"id", "nome"})
public class Competencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
            nullable = false,
            unique = true,
            length = 100
    )
    private String nome;

    @ManyToMany(mappedBy = "competencias")
    @Builder.Default
    private Set<Perfil> perfis = new LinkedHashSet<>();

    @ManyToMany(mappedBy = "competencias")
    @Builder.Default
    private Set<Vaga> vagas = new LinkedHashSet<>();

    @ManyToMany(mappedBy = "competencias")
    @Builder.Default
    private Set<Trilha> trilhas = new LinkedHashSet<>();
}