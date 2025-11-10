-- Drop the existing permissive policy that allows public access
DROP POLICY IF EXISTS "Permitir todas operações em candidatos" ON public.candidatos;

-- Create RLS policies that require authentication and user ownership
-- For now, we'll allow all authenticated users to manage candidates
-- This can be further restricted by roles if needed

CREATE POLICY "Authenticated users can view candidates"
ON public.candidatos
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can create candidates"
ON public.candidatos
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update candidates"
ON public.candidatos
FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete candidates"
ON public.candidatos
FOR DELETE
TO authenticated
USING (true);