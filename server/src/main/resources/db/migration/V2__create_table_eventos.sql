CREATE TABLE eventos (
   id BIGSERIAL PRIMARY KEY,
   titulo VARCHAR(150) NOT NULL,
   descricao TEXT,
   tipo VARCHAR(30) NOT NULL,
   endereco VARCHAR(255),
   latitude DOUBLE PRECISION NOT NULL,
   longitude DOUBLE PRECISION NOT NULL,
   data_evento TIMESTAMP NOT NULL,
   vagas INTEGER,
   organizador VARCHAR(100),
   ativo BOOLEAN DEFAULT TRUE
);