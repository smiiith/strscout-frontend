-- Add new columns to str_properties table for additional property details
ALTER TABLE public.str_properties 
ADD COLUMN bedrooms text,
ADD COLUMN pets text,
ADD COLUMN instant_book boolean DEFAULT false,
ADD COLUMN cancellation_policy text,
ADD COLUMN review_count integer DEFAULT 0,
ADD COLUMN average_rating decimal(3,2) DEFAULT 0.0,
ADD COLUMN policies text;

-- Add comments for documentation
COMMENT ON COLUMN public.str_properties.bedrooms IS 'Number and type of bedrooms in the property';
COMMENT ON COLUMN public.str_properties.pets IS 'Pet policy information';
COMMENT ON COLUMN public.str_properties.instant_book IS 'Whether the property has instant book enabled';
COMMENT ON COLUMN public.str_properties.cancellation_policy IS 'Cancellation policy details';
COMMENT ON COLUMN public.str_properties.review_count IS 'Total number of reviews';
COMMENT ON COLUMN public.str_properties.average_rating IS 'Average star rating (0.0 to 5.0)';
COMMENT ON COLUMN public.str_properties.policies IS 'House rules and policies';