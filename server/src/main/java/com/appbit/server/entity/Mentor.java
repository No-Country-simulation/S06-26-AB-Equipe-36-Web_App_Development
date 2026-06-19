package com.appbit.server.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "mentores")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Mentor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "usuario_id")
    private Long usuarioId;

    @Column(name = "especialidades")
    private String especialidades;

    @Column(name = "biografia")
    private String biografia;

    @Column(name = "aprovado")
    private Boolean aprovado;
}