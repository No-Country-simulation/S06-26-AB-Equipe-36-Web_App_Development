import os
import pandas as pd
from sqlalchemy import create_engine, text

# ==============================================================================
# CONFIGURAÇÃO DE CONEXÃO COM O BANCO DE DADOS (POSTGRESQL)
# ==============================================================================
# Cada desenvolvedor deve ajustar as credenciais abaixo de acordo com seu ambiente local.
# Padrão SQLAlchemy: 'postgresql://USUARIO:SENHA@localhost:PORTA/NOME_DO_BANCO'

# Exemplo Local meu (Leo):
DB_URL = ""

# Caso precise alterar para o padrão de outro ambiente, descomente e ajuste a linha abaixo:
# DB_URL = 'postgresql://postgres:postgres@localhost:5432/bit_db'
# ==============================================================================

try:
    engine = create_engine(DB_URL)
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))
    print("🔌 Conexão com o banco PostgreSQL estabelecida com sucesso!")
except Exception as e:
    print(f"❌ Erro de conexão: {e}")
    exit(1)


def pipeline_antenas():
    caminho = os.path.join('data', 'antenas_flp.csv')
    print(f"\n🚀 Processando: {caminho} ➔ Tabela: dataset_antenas")

    if not os.path.exists(caminho):
        print("❌ Arquivo não encontrado.")
        return

    try:
        df = pd.read_csv(caminho)
        df_tratado = pd.DataFrame()
        df_tratado['ecgi'] = df['ecgi'].astype(str)
        df_tratado['tecnologia'] = '4G/5G'
        df_tratado['municipio'] = df['municipio']
        df_tratado['bairro'] = df['cluster']
        df_tratado['latitude'] = df['lat']
        df_tratado['longitude'] = df['lon']

        df_tratado.to_sql('dataset_antenas', con=engine, if_exists='append', index=False)
        print(f"   📥 {len(df_tratado)} registros inseridos na tabela 'dataset_antenas'!")
    except Exception as e:
        print(f"❌ Erro ao processar antenas: {e}")


def pipeline_assinantes(tamanho_chunk=20000):
    caminho = os.path.join('data', 'assinantes.csv')
    print(f"\n🚀 Processando: {caminho} ➔ Tabela: dataset_assinantes (via Chunks)")

    if not os.path.exists(caminho):
        print("❌ Arquivo não encontrado.")
        return

    try:
        total = 0
        for i, chunk in enumerate(pd.read_csv(caminho, chunksize=tamanho_chunk)):
            df_tratado = pd.DataFrame()
            df_tratado['assinante_hash'] = chunk['assinante_hash']

            df_tratado['idade'] = chunk['age_group'].replace({'18-24': 21, '25-34': 30, '35-44': 40, '45-54': 50, '55+': 60})
            df_tratado['idade'] = pd.to_numeric(df_tratado['idade'], errors='coerce').fillna(35).astype(int)

            df_tratado['genero'] = 'N/I'

            df_tratado['renda_estimada'] = chunk['income_cluster'].replace({'A': 12000.00, 'B': 6000.00, 'C': 3000.00, 'D': 1500.00})
            df_tratado['renda_estimada'] = pd.to_numeric(df_tratado['renda_estimada'], errors='coerce').fillna(2500.00)

            df_tratado['segmento_usuario'] = chunk['mobility_pattern']

            df_tratado.to_sql('dataset_assinantes', con=engine, if_exists='append', index=False)
            total += len(df_tratado)
            print(f"   📥 Bloco {i + 1}: {len(df_tratado)} assinantes inseridos...")

        print(f"✅ Concluído! Total de {total} registros na tabela 'dataset_assinantes'.")
    except Exception as e:
        print(f"❌ Erro ao processar assinantes: {e}")


def pipeline_fluxo_vias(tamanho_chunk=20000):
    """
    [ISSUE I007] Mapeia o arquivo tensor_fluxo_vias.csv que está na pasta data
    para inserir os registros em pedaços de forma otimizada.
    """
    caminho = os.path.join('data', 'tensor_fluxo_vias.csv')
    print(f"\n🚀 [ISSUE I007] Processando: {caminho} ➔ Tabela: dataset_fluxo_vias (via Chunks)")

    if not os.path.exists(caminho):
        print("❌ Arquivo tensor_fluxo_vias.csv não encontrado.")
        return

    # Como o arquivo não tem cabeçalho nominal, definimos a ordem exata das colunas do CSV
    colunas_csv = [
        'ecgi_origem', 'lat_origem', 'lon_origem', 'cluster_origem', 'municipio_origem',
        'ecgi_destino', 'lat_destino', 'lon_destino', 'cluster_destino', 'municipio_destino',
        'n_usuarios', 'n_transicoes', 'dist_km', 'periodo_predominante', 'pct_do_cluster_origem'
    ]

    try:
        total = 0
        # header=0 avisa o pandas para usar a primeira linha como cabeçalho e ler os dados a partir da linha 1
        for i, chunk in enumerate(pd.read_csv(caminho, header=0, names=colunas_csv, chunksize=tamanho_chunk)):

            # Filtramos apenas as colunas que você mapeou na tabela do banco
            df_tratado = chunk[[
                'ecgi_origem', 'cluster_origem', 'municipio_origem',
                'ecgi_destino', 'cluster_destino', 'municipio_destino',
                'n_usuarios', 'n_transicoes', 'dist_km',
                'periodo_predominante', 'pct_do_cluster_origem'
            ]].copy()

            # Força o tipo String nos campos de identificadores para não corromper
            df_tratado['ecgi_origem'] = df_tratado['ecgi_origem'].astype(str)
            df_tratado['ecgi_destino'] = df_tratado['ecgi_destino'].astype(str)

            # Inserção incremental
            df_tratado.to_sql('dataset_fluxo_vias', con=engine, if_exists='append', index=False)
            total += len(df_tratado)
            print(f"   📥 Bloco {i + 1}: {len(df_tratado)} registros de fluxo de vias inseridos...")

        print(f"✅ Concluído! Total de {total} registros na tabela 'dataset_fluxo_vias'.")
    except Exception as e:
        print(f"❌ Erro ao processar fluxo de vias: {e}")


if __name__ == "__main__":
    # NOTA DE EXECUÇÃO: Descomente as linhas abaixo apenas se for a PRIMEIRA carga
    # no seu banco de dados local, para evitar duplicidade de registros (Primary Key).
    # pipeline_antenas()
    # pipeline_assinantes()

    # Executa a carga incremental da Issue I007 (Fluxo de Vias)
    pipeline_fluxo_vias()
    print("\n🏁 Pipelines de Ingestão do MVP Finalizadas!")