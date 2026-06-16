// client/src/localizacoes.ts
export interface LocalizacaoEstrutura {
  [continente: string]: {
    [pais: string]: {
      [estado: string]: string[];
    };
  };
}

// Escopo geográfico do MVP restrito ao Dataset Vísent CDRView (Florianópolis e Região)
export const LOCALIZACAO_DATA: LocalizacaoEstrutura = {
  "América": {
    "Brasil": {
      "Santa Catarina": [
        "Florianópolis",
        "São José",
        "Palhoça",
        "Biguaçu"
      ]
    }
  }
};