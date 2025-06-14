
-- Add missing DELETE policy for financial_assessments table
CREATE POLICY "Users can delete their own assessments" 
  ON public.financial_assessments 
  FOR DELETE 
  USING (auth.uid() = user_id);
