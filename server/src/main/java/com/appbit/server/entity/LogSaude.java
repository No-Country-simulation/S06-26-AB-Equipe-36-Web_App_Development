package com.appbit.server.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "logs_saude")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LogSaude {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "usuario_id", nullable = false)
    private Long usuarioId;

    @Column(name = "data_registro")
    private LocalDate dataRegistro;

    @Column(name = "humor_diario", nullable = false)
    private String humorDiario;

    @Column(name = "horas_sono", nullable = false)
    private BigDecimal horasSono;

    @Column(name = "nivel_estresse", nullable = false)
    private String nivelEstresse;

    @ElementCollection
    @CollectionTable(
            name = "log_saude_sentimentos",
            joinColumns = @JoinColumn(name = "log_saude_id")
    )
    @Column(name = "sentimento")
    private List<String> sentimentos;

    @Column(name = "notas_texto")
    private String notasTexto;
}