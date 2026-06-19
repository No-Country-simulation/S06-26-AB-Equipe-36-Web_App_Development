package com.appbit.server.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

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

    @OneToOne
    @JoinColumn(
            name = "usuario_id",
            nullable = false,
            unique = true
    )
    private User usuario;

    @Column(name = "nome_completo", nullable = false)
    private String nomeCompleto;

    private String biografia;

    @ElementCollection
    @CollectionTable(
            name = "perfil_competencias",
            joinColumns = @JoinColumn(name = "perfil_id")
    )
    @Column(name = "competencia")
    private List<String> competencias;
}