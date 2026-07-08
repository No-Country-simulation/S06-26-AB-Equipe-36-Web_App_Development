package com.appbit.server.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.BatchSize;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "vagas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = "competencias")
public class Vaga {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String empresa;

    private String cargo;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "vaga_competencias",
            joinColumns = @JoinColumn(name = "vaga_id"),
            inverseJoinColumns = @JoinColumn(name = "competencia_id")
    )
    @BatchSize(size = 20)
    @Builder.Default
    private Set<Competencia> competencias = new LinkedHashSet<>();

    @Column(name = "localizacao")
    private String localizacao;
}