-- Update handle_new_user to handle anonymous users properly
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Only create profile if user has an email (skip anonymous users initially)
  -- Anonymous users will get profile created when they convert to permanent
  IF new.email IS NOT NULL THEN
    INSERT INTO public.profiles (id, full_name, avatar_url, primary_email, plan_id)
    VALUES (
      new.id,
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'avatar_url',
      new.email,
      '5cb61d3c-306e-4518-8ec1-fa59585ce27c'  -- Freemium plan ID
    )
    ON CONFLICT (id) DO UPDATE
    SET
      primary_email = EXCLUDED.primary_email,
      full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
      avatar_url = COALESCE(EXCLUDED.avatar_url, profiles.avatar_url),
      updated_at = now();
  END IF;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Make sure trigger exists (recreate if needed)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

COMMENT ON FUNCTION public.handle_new_user() IS 'Creates profile for new users. Skips anonymous users (no email). Profile created when anonymous user converts to permanent.';
