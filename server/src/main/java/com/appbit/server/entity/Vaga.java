package com.appbit.server.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "vagas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vaga {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String empresa;

    private String cargo;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(columnDefinition = "TEXT")
    private String competencias;

    private String localizacao;
}
