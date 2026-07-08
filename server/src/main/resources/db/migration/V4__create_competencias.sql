CREATE TABLE competencias
(
    id   BIGSERIAL PRIMARY KEY,
    nome VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE perfil_competencias
(
    perfil_id      BIGINT NOT NULL,
    competencia_id BIGINT NOT NULL,
    PRIMARY KEY (perfil_id, competencia_id),
    FOREIGN KEY (perfil_id)
        REFERENCES perfis (id)
        ON DELETE CASCADE,
    FOREIGN KEY (competencia_id)
        REFERENCES competencias (id)
        ON DELETE CASCADE
);

CREATE TABLE vaga_competencias
(
    vaga_id        BIGINT NOT NULL,
    competencia_id BIGINT NOT NULL,
    PRIMARY KEY (vaga_id, competencia_id),
    FOREIGN KEY (vaga_id)
        REFERENCES vagas (id)
        ON DELETE CASCADE,
    FOREIGN KEY (competencia_id)
        REFERENCES competencias (id)
        ON DELETE CASCADE
);

CREATE TABLE trilha_competencias
(
    trilha_id      BIGINT NOT NULL,
    competencia_id BIGINT NOT NULL,
    PRIMARY KEY (trilha_id, competencia_id),
    FOREIGN KEY (trilha_id)
        REFERENCES trilhas (id)
        ON DELETE CASCADE,
    FOREIGN KEY (competencia_id)
        REFERENCES competencias (id)
        ON DELETE CASCADE
);