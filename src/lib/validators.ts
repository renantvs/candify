import { z } from "zod";

export const candidatoSchema = z.object({
  nome_completo: z
    .string()
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres")
    .trim(),
  email: z
    .string()
    .email("Email inválido")
    .max(255, "Email deve ter no máximo 255 caracteres")
    .trim(),
  telefone: z
    .string()
    .regex(
      /^\(\d{2}\) \d{5}-\d{4}$/,
      "Telefone deve estar no formato (XX) XXXXX-XXXX"
    ),
  area_interesse: z
    .string()
    .min(1, "Selecione uma área de interesse"),
  data_cadastro: z
    .string()
    .regex(
      /^\d{2}\/\d{2}\/\d{4}$/,
      "Data deve estar no formato dd/mm/aaaa"
    ),
});

export type CandidatoFormData = z.infer<typeof candidatoSchema>;