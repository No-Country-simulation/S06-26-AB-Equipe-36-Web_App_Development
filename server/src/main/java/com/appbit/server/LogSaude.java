package com.appbit.server;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "logs_saude")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")

public class LogSaude {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "usuario_id", nullable = false)
    private Long usuarioId;

    @Column(name = "data_registro")
    private LocalDate dataRegistro = LocalDate.now();

    @Column(name = "humor_diario", nullable = false, length = 50)
    private String humorDiario; // 'estavel', 'radiante', 'cansado', 'ansioso'

    @Column(name = "horas_sono", nullable = false)
    private Double horasSono;

    @Column(name = "nivel_estresse", nullable = false, length = 50)
    private String nivelEstresse; // 'baixo', 'moderado', 'alto'

    @ElementCollection
    @CollectionTable(name = "log_saude_sentimentos", joinColumns = @JoinColumn(name = "log_saude_id"))
    @Column(name = "sentimento")
    private List<String> sentimentos;

    @Column(name = "notas_texto", columnDefinition = "TEXT")
    private String notasTexto;
}