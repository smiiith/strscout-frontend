-- Create exit_survey_responses table
CREATE TABLE IF NOT EXISTS public.exit_survey_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  page_path TEXT NOT NULL,
  selected_option TEXT NOT NULL,
  other_text TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add index for querying by user and date
CREATE INDEX idx_exit_survey_responses_user_id ON public.exit_survey_responses(user_id);
CREATE INDEX idx_exit_survey_responses_created_at ON public.exit_survey_responses(created_at DESC);
CREATE INDEX idx_exit_survey_responses_page_path ON public.exit_survey_responses(page_path);
CREATE INDEX idx_exit_survey_responses_selected_option ON public.exit_survey_responses(selected_option);

-- Enable RLS
ALTER TABLE public.exit_survey_responses ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (anonymous survey responses allowed)
CREATE POLICY "Allow anyone to insert survey responses"
  ON public.exit_survey_responses
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow users to view their own responses
CREATE POLICY "Users can view their own responses"
  ON public.exit_survey_responses
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow admins to view all responses (optional - you can define admin role)
-- For now, use service role key to query all responses

COMMENT ON TABLE public.exit_survey_responses IS 'Stores exit survey responses from pricing page';
COMMENT ON COLUMN public.exit_survey_responses.user_id IS 'User ID if logged in, null if anonymous';
COMMENT ON COLUMN public.exit_survey_responses.page_path IS 'Page where survey was shown (e.g., /pricing)';
COMMENT ON COLUMN public.exit_survey_responses.selected_option IS 'Option selected by user (e.g., too-expensive, not-sure-worth)';
COMMENT ON COLUMN public.exit_survey_responses.other_text IS 'Free-form text if user selected "other"';
COMMENT ON COLUMN public.exit_survey_responses.user_agent IS 'Browser user agent for analytics';
