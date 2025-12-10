-- Remove the dangerous public SELECT policy that exposes contact form data
DROP POLICY IF EXISTS "Anyone can view contacts" ON public.visitor_contacts;