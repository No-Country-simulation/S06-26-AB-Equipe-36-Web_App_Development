package com.appbit.server.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "trilhas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Trilha {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(columnDefinition = "TEXT")
    private String competencias;

    @Column(nullable = false)
    private String nivel;

    @Column(name = "duracao_horas")
    private Integer duracaoHoras;
}
