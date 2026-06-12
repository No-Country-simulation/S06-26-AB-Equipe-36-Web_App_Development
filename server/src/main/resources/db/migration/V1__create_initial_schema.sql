-- =========================================================================
-- PARTE 1: ESTRUTURAS DE REGRAS DE NEGÓCIO E MOCKS DO APP (SEMANA 0)
-- =========================================================================

-- 1. Usuários do App
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo_usuario VARCHAR(50) NOT NULL, -- 'ALUNO', 'MENTOR', 'ADMIN'
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Perfis de Usuários
CREATE TABLE perfis (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL UNIQUE,
    nome_completo VARCHAR(255) NOT NULL,
    biografia TEXT,
    competencias TEXT[],
    CONSTRAINT fk_perfil_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- 3. Logs de Saúde Mental (Alimenta a rota /api/saude)
CREATE TABLE logs_saude (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    data_registro DATE DEFAULT CURRENT_DATE,
    humor_diario VARCHAR(50) NOT NULL, -- 'estavel', 'radiante', 'cansado', 'ansioso'
    horas_sono NUMERIC(3,1) NOT NULL,
    nivel_estresse VARCHAR(50) NOT NULL, -- 'baixo', 'moderado', 'alto'
    sentimentos TEXT[],
    notas_texto TEXT,
    CONSTRAINT fk_log_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- 4. Mentores Cadastrados
CREATE TABLE mentores (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL UNIQUE,
    especialidades TEXT[] NOT NULL,
    biografia TEXT,
    aprovado BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_mentor_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- 5. Agendamentos de Mentorias (Alimenta a rota /api/orientar)
CREATE TABLE agendamentos (
    id SERIAL PRIMARY KEY,
    aluno_id INT NOT NULL,
    mentor_id INT NOT NULL,
    data_agendada DATE NOT NULL,
    horario_agendada TIME NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDENTE', -- 'PENDENTE', 'CONFIRMADO', 'CANCELADO'
    link_reuniao VARCHAR(500),
    CONSTRAINT fk_agendamento_aluno FOREIGN KEY (aluno_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    CONSTRAINT fk_agendamento_mentor FOREIGN KEY (mentor_id) REFERENCES mentores(id) ON DELETE CASCADE
);

-- =========================================================================
-- PARTE 2: MODELOS PARA INGESTÃO DO DATASET VÍSENT / CLARO (HACKATHON)
-- =========================================================================

-- 6. Tabela de Antenas FLP (antenas_flp.csv)
CREATE TABLE dataset_antenas (
    ecgi VARCHAR(50) PRIMARY KEY, -- Mantido como String para evitar corrupção de id
    tecnologia VARCHAR(20),
    municipio VARCHAR(100),
    bairro VARCHAR(100),
    latitude NUMERIC(10, 8),
    longitude NUMERIC(11, 8)
);

-- 7. Tabela de Assinantes (assinantes.csv)
CREATE TABLE dataset_assinantes (
    assinante_hash INT PRIMARY KEY,
    idade INT,
    genero VARCHAR(20),
    renda_estimada NUMERIC(10, 2),
    segmento_usuario VARCHAR(50)
);

-- 8. Tabela de Fluxo de Vias (tensor_fluxo_vias.csv)
CREATE TABLE dataset_fluxo_vias (
    id SERIAL PRIMARY KEY,
    ecgi_origem VARCHAR(50),
    cluster_origem VARCHAR(100),
    municipio_origem VARCHAR(100),
    ecgi_destino VARCHAR(50),
    cluster_destino VARCHAR(100),
    municipio_destino VARCHAR(100),
    n_usuarios INT,
    n_transicoes INT,
    dist_km NUMERIC(6, 2),
    periodo_predominante VARCHAR(20),
    pct_do_cluster_origem NUMERIC(5, 2)
);