package com.appbit.server;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "mentores")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Mentor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "usuario_id", nullable = false, unique = true)
    private Long usuarioId;

    @ElementCollection
    @CollectionTable(name = "mentor_especialidades", joinColumns = @JoinColumn(name = "mentor_id"))
    @Column(name = "especialidade")
    private List<String> especialidades;

    @Column(columnDefinition = "TEXT")
    private String biografia;

    private Boolean aprovado = true;
}