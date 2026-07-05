package com.appbit.server.entity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "eventos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Evento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;

    private String descricao;

    private String tipo;

    private String endereco;

    private Double latitude;

    private Double longitude;

    private LocalDateTime dataEvento;

    private Integer vagas;

    private String organizador;

    private Boolean ativo;
}
