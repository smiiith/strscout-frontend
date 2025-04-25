CREATE TABLE IF NOT EXISTS "features" (
    id uuid NOT NULL DEFAULT gen_random_uuid(), 
    created_at timestamp with time zone NOT NULL DEFAULT now(), 
    name text, 
    description text, 
    key text NOT NULL
);

CREATE TABLE IF NOT EXISTS "listing_feedback_usage" (
    id uuid NOT NULL DEFAULT gen_random_uuid(), 
    created_at timestamp with time zone NOT NULL DEFAULT now(), 
    profile_id uuid NOT NULL, 
    property_id uuid NOT NULL
);

CREATE TABLE IF NOT EXISTS "listings" (
    id uuid NOT NULL DEFAULT gen_random_uuid(), 
    created_at timestamp with time zone NOT NULL DEFAULT now(), 
    profile_id uuid, 
    listed_on text, 
    external_listing_id text, 
    property_id uuid
);

CREATE TABLE IF NOT EXISTS "llm_usage" (
    id uuid NOT NULL DEFAULT gen_random_uuid(), 
    created_at timestamp with time zone NOT NULL DEFAULT now(), 
    run_id text, 
    llm_name text, 
    completion_tokens smallint, 
    prompt_tokens integer, 
    total_tokens integer, 
    cost text, 
    name text
);

CREATE TABLE IF NOT EXISTS "plans" (
    id uuid NOT NULL DEFAULT gen_random_uuid(), 
    created_at timestamp with time zone NOT NULL DEFAULT now(), 
    name text, 
    description text, 
    active boolean DEFAULT true, 
    key text NOT NULL
);

CREATE TABLE IF NOT EXISTS "plans_features_map" (
    id uuid NOT NULL DEFAULT gen_random_uuid(), 
    created_at timestamp with time zone NOT NULL DEFAULT now(), 
    plan_id uuid, 
    feature_id uuid
);

CREATE TABLE IF NOT EXISTS "profiles" (
    id uuid NOT NULL, 
    updated_at timestamp with time zone, 
    username text, 
    full_name text, 
    avatar_url text, 
    website text, 
    primary_email text, 
    secondary_email text, 
    primary_phone text, 
    secondary_phone text, 
    notification_preference text, 
    plan_id uuid
);

CREATE TABLE IF NOT EXISTS "properties" (
    id uuid NOT NULL DEFAULT gen_random_uuid(), 
    created_at timestamp with time zone NOT NULL DEFAULT now(), 
    name text, 
    description text, 
    profile_id uuid, 
    primary_email text, 
    secondary_email text, 
    primary_phone text, 
    secondary_phone text, 
    primary_contact text, 
    secondary_contact text, 
    notification_preference text DEFAULT 'email'::text
);

CREATE TABLE IF NOT EXISTS "property_ratings" (
    id uuid NOT NULL DEFAULT gen_random_uuid(), 
    created_at timestamp with time zone NOT NULL DEFAULT now(), 
    property_id uuid NOT NULL, 
    ratings jsonb NOT NULL, 
    modified_at timestamp without time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "scan_mismatches" (
    id bigint NOT NULL, 
    created_at timestamp with time zone NOT NULL DEFAULT now(), 
    profile_id uuid, 
    property_id uuid, 
    mismatch_date timestamp with time zone DEFAULT now(), 
    message text, 
    scan_id bigint
);

CREATE TABLE IF NOT EXISTS "scans" (
    id bigint NOT NULL, 
    created_at timestamp with time zone NOT NULL DEFAULT now(), 
    profile_id uuid, 
    property_id uuid, 
    has_mismatch boolean DEFAULT false
);

CREATE TABLE IF NOT EXISTS "str_properties" (
    id uuid NOT NULL DEFAULT gen_random_uuid(), 
    created_at timestamp with time zone NOT NULL DEFAULT now(), 
    address text, 
    title text NOT NULL, 
    city text, 
    state text, 
    zip text, 
    url text, 
    external_id text NOT NULL, 
    description text, 
    user_id uuid, 
    parent_id uuid, 
    is_parent boolean, 
    amenities json, 
    hero_image_link text, 
    other_image_links jsonb
);

CREATE TABLE IF NOT EXISTS "str_property_ratings" (
    id uuid NOT NULL DEFAULT gen_random_uuid(), 
    created_at timestamp with time zone NOT NULL DEFAULT now(), 
    property_id uuid NOT NULL, 
    description_rating_number text, 
    hero_image_rating_number text, 
    overall_photo_rating text, 
    interior_rating_category text, 
    "30_day_occupancy" text, 
    "60_day_occupancy" text, 
    "90_day_occupancy" text, 
    feedback text, 
    suggestions text, 
    description_rating_category text, 
    amenities_rating_category text, 
    amenities_rating_number text, 
    hero_image_rating_category text, 
    title_rating_number text, 
    title_rating_category text, 
    interior_rating_number text, 
    other_images_rating_category text, 
    other_images_rating_number text
);