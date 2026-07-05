CREATE TABLE trilhas (
   id SERIAL PRIMARY KEY,
   nome VARCHAR(150) NOT NULL,
   descricao TEXT,
   competencias TEXT NOT NULL,
   nivel VARCHAR(50),
   duracao_horas INT
);
CREATE TABLE vagas (
    id SERIAL PRIMARY KEY,
    empresa VARCHAR(150),
    cargo VARCHAR(150),
    descricao TEXT,
    competencias TEXT,
    localizacao VARCHAR(150)
);