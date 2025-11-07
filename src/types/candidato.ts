export interface Candidato {
  id: string;
  nome_completo: string;
  email: string;
  telefone: string;
  area_interesse: string;
  data_cadastro: string;
  created_at?: string;
  updated_at?: string;
}

export const areasInteresse = [
  "Tecnologia",
  "Vendas",
  "Marketing",
  "RH",
  "Financeiro",
  "Operações",
  "Administrativo",
  "Outros",
] as const;

export type AreaInteresse = typeof areasInteresse[number];