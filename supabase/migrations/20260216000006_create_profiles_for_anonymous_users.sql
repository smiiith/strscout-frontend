-- Fix handle_new_user to create profiles for anonymous users
-- This is needed because str_properties has a foreign key to profiles.id
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Create profile for all users (including anonymous)
  -- Anonymous users will have NULL email until they convert
  INSERT INTO public.profiles (id, full_name, avatar_url, primary_email, plan_id)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', 'Anonymous User'),
    new.raw_user_meta_data->>'avatar_url',
    new.email,  -- Will be NULL for anonymous users
    '5cb61d3c-306e-4518-8ec1-fa59585ce27c'  -- Freemium plan ID
  )
  ON CONFLICT (id) DO UPDATE
  SET
    primary_email = EXCLUDED.primary_email,
    full_name = CASE
      WHEN EXCLUDED.full_name = 'Anonymous User' THEN profiles.full_name
      ELSE COALESCE(EXCLUDED.full_name, profiles.full_name)
    END,
    avatar_url = COALESCE(EXCLUDED.avatar_url, profiles.avatar_url),
    updated_at = now();

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.handle_new_user() IS 'Creates profile for all users including anonymous. Anonymous users have NULL email until conversion.';
