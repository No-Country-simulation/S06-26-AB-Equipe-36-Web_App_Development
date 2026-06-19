package com.appbit.server;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "agendamentos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Agendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "aluno_id", nullable = false)
    private Long alunoId;

    @Column(name = "mentor_id", nullable = false)
    private Long mentorId;

    @Column(name = "data_agendada", nullable = false)
    private LocalDate dataAgendada;

    @Column(name = "horario_agendada", nullable = false)
    private LocalTime horarioAgendada;

    @Column(length = 50)
    private String status = "PENDENTE"; // 'PENDENTE', 'CONFIRMADO', 'CANCELADO'

    @Column(name = "link_reuniao", length = 500)
    private String linkReuniao;
}