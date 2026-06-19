package com.appbit.server;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "perfis")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Perfil {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "usuario_id", nullable = false, unique = true)
    private Long usuarioId;

    @Column(name = "nome_completo", nullable = false)
    private String nomeCompleto;

    @Column(columnDefinition = "TEXT")
    private String biografia;

    @ElementCollection
    @CollectionTable(name = "perfil_competencias", joinColumns = @JoinColumn(name = "perfil_id"))
    @Column(name = "competencia")
    private List<String> competencias;

    @Column(length = 50)
    private String genero;

    @Column(name = "data_nascimento")
    private LocalDate dataNascimento;

    @Column(length = 100)
    private String escolaridade;

    @Column(length = 150)
    private String localizacao;

    @Column(name = "nivel_experiencia", length = 50)
    private String nivelExperiencia;

    @Column(name = "area_atuacao", length = 100)
    private String areaAtuacao;

    @Column(name = "objetivo_profissional", length = 255)
    private String objetivoProfessional;
}