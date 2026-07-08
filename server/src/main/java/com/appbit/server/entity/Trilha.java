package com.appbit.server.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.BatchSize;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "trilhas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = "competencias")
public class Trilha {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "trilha_competencias",
            joinColumns = @JoinColumn(name = "trilha_id"),
            inverseJoinColumns = @JoinColumn(name = "competencia_id")
    )
    @BatchSize(size = 20)
    @Builder.Default
    private Set<Competencia> competencias = new LinkedHashSet<>();

    @Column(nullable = false)
    private String nivel;

    @Column(name = "duracao_horas")
    private Integer duracaoHoras;
}