-- Create visitor_contacts table for storing visitor information
CREATE TABLE public.visitor_contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  whatsapp TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.visitor_contacts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (public form)
CREATE POLICY "Anyone can submit contact form"
  ON public.visitor_contacts
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy for viewing (only admin in future, but for now allow all)
CREATE POLICY "Anyone can view contacts"
  ON public.visitor_contacts
  FOR SELECT
  TO public
  USING (true);

-- Add index for faster queries
CREATE INDEX idx_visitor_contacts_created_at ON public.visitor_contacts(created_at DESC);