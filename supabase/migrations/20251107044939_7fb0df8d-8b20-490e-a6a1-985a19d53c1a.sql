-- Criar tabela de candidatos
CREATE TABLE public.candidatos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome_completo TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT NOT NULL,
  area_interesse TEXT NOT NULL,
  data_cadastro TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.candidatos ENABLE ROW LEVEL SECURITY;

-- Política para permitir todas operações (SELECT, INSERT, UPDATE, DELETE)
CREATE POLICY "Permitir todas operações em candidatos" 
ON public.candidatos 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_candidatos_updated_at
BEFORE UPDATE ON public.candidatos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();