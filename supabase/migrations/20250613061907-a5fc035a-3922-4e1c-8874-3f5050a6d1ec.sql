
-- Create a profiles table to store additional user information
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles table
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Create a function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id, 
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create financial assessments table for storing user assessment data
CREATE TABLE public.financial_assessments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  income DECIMAL(10,2),
  expenses DECIMAL(10,2),
  savings DECIMAL(10,2),
  debt DECIMAL(10,2),
  emergency_fund DECIMAL(10,2),
  financial_goals TEXT[],
  risk_tolerance TEXT CHECK (risk_tolerance IN ('low', 'medium', 'high')),
  assessment_score INTEGER CHECK (assessment_score >= 0 AND assessment_score <= 100),
  recommendations TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable RLS for financial assessments
ALTER TABLE public.financial_assessments ENABLE ROW LEVEL SECURITY;

-- Create policies for financial assessments
CREATE POLICY "Users can view their own assessments" 
  ON public.financial_assessments 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own assessments" 
  ON public.financial_assessments 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own assessments" 
  ON public.financial_assessments 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create budgets table for storing user budget data
CREATE TABLE public.budgets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  total_income DECIMAL(10,2) NOT NULL DEFAULT 0,
  categories JSONB NOT NULL DEFAULT '[]',
  period TEXT NOT NULL CHECK (period IN ('monthly', 'weekly', 'yearly')) DEFAULT 'monthly',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable RLS for budgets
ALTER TABLE public.budgets ENABLE ROW LEVEL SECURITY;

-- Create policies for budgets
CREATE POLICY "Users can view their own budgets" 
  ON public.budgets 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own budgets" 
  ON public.budgets 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own budgets" 
  ON public.budgets 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own budgets" 
  ON public.budgets 
  FOR DELETE 
  USING (auth.uid() = user_id);
