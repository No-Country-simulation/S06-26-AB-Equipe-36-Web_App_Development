package com.appbit.server.entity;

import com.appbit.server.entity.enums.StatusAgendamento;
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
@Builder
public class Agendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "aluno_id")
    private Long alunoId;

    @ManyToOne
    @JoinColumn(name = "mentor_id")
    private Mentor mentor;

    @Column(name = "data_agendada")
    private LocalDate dataAgendada;

    @Column(name = "horario_agendada")
    private LocalTime horarioAgendada;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private StatusAgendamento status;

    @Column(name = "link_reuniao")
    private String linkReuniao;
}
