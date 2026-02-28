-- DROP SCHEMA public;

CREATE SCHEMA public AUTHORIZATION pg_database_owner;

-- DROP SEQUENCE public.scan_mismatches_id_seq;

CREATE SEQUENCE public.scan_mismatches_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.scans_id_seq;

CREATE SEQUENCE public.scans_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;-- public.anonymous_usage definition

-- Drop table

-- DROP TABLE public.anonymous_usage;

CREATE TABLE public.anonymous_usage (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	user_id uuid NOT NULL,
	ip_address text NOT NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	CONSTRAINT anonymous_usage_pkey PRIMARY KEY (id)
);
CREATE INDEX idx_anonymous_usage_ip_created ON public.anonymous_usage USING btree (ip_address, created_at DESC);
CREATE INDEX idx_anonymous_usage_user_id ON public.anonymous_usage USING btree (user_id);
ALTER TABLE public.anonymous_usage ENABLE ROW LEVEL SECURITY;

-- Table Policies

CREATE POLICY "Service role can delete old records" ON public.anonymous_usage
 AS PERMISSIVE
 FOR DELETE
 USING (true);
CREATE POLICY "Service role can insert usage records" ON public.anonymous_usage
 AS PERMISSIVE
 FOR INSERT
 WITH CHECK (true);
CREATE POLICY "Users can view own usage records" ON public.anonymous_usage
 AS PERMISSIVE
 FOR SELECT
 USING ((auth.uid() = user_id));


-- public.comp_basis definition

-- Drop table

-- DROP TABLE public.comp_basis;

CREATE TABLE public.comp_basis (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	profile_id uuid NOT NULL,
	address text NOT NULL,
	latitude text NOT NULL,
	longitude text NOT NULL,
	scan_id text NOT NULL,
	status text DEFAULT 'pending'::text NOT NULL,
	product_type text NULL,
	CONSTRAINT comp_basis_pkey PRIMARY KEY (id),
	CONSTRAINT comp_basis_scan_id_key UNIQUE (scan_id)
);


-- public.contact_form_submissions definition

-- Drop table

-- DROP TABLE public.contact_form_submissions;

CREATE TABLE public.contact_form_submissions (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	ip_address text NOT NULL,
	submitted_at timestamptz DEFAULT now() NOT NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	CONSTRAINT contact_form_submissions_pkey PRIMARY KEY (id)
);
CREATE INDEX idx_contact_form_submissions_ip_time ON public.contact_form_submissions USING btree (ip_address, submitted_at DESC);
CREATE INDEX idx_contact_form_submissions_time ON public.contact_form_submissions USING btree (submitted_at DESC);
ALTER TABLE public.contact_form_submissions ENABLE ROW LEVEL SECURITY;

-- Table Policies

CREATE POLICY "Service role has full access to contact_form_submissions" ON public.contact_form_submissions
 AS PERMISSIVE
 FOR ALL
 TO service_role
 USING (true)
 WITH CHECK (true);


-- public.features definition

-- Drop table

-- DROP TABLE public.features;

CREATE TABLE public.features (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	"name" text NULL,
	description text NULL,
	"key" text NOT NULL,
	CONSTRAINT features_key_key UNIQUE (key),
	CONSTRAINT features_pkey PRIMARY KEY (id)
);


-- public.llm_usage definition

-- Drop table

-- DROP TABLE public.llm_usage;

CREATE TABLE public.llm_usage (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	run_id text NULL,
	llm_name text NULL,
	completion_tokens int2 NULL,
	prompt_tokens int4 NULL,
	total_tokens int4 NULL,
	"cost" text NULL,
	"name" text NULL,
	CONSTRAINT llm_usage_pkey PRIMARY KEY (id)
);
ALTER TABLE public.llm_usage ENABLE ROW LEVEL SECURITY;


-- public.pending_conversions definition

-- Drop table

-- DROP TABLE public.pending_conversions;

CREATE TABLE public.pending_conversions (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	anonymous_user_id uuid NOT NULL,
	email text NOT NULL,
	property_id uuid NOT NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	expires_at timestamptz DEFAULT now() + '7 days'::interval NOT NULL,
	converted_at timestamptz NULL,
	new_user_id uuid NULL,
	CONSTRAINT pending_conversions_pkey PRIMARY KEY (id)
);
CREATE INDEX idx_pending_conversions_email ON public.pending_conversions USING btree (email) WHERE (converted_at IS NULL);
CREATE INDEX idx_pending_conversions_expires ON public.pending_conversions USING btree (expires_at) WHERE (converted_at IS NULL);
ALTER TABLE public.pending_conversions ENABLE ROW LEVEL SECURITY;

-- Table Policies

CREATE POLICY "Service role has full access" ON public.pending_conversions
 AS PERMISSIVE
 FOR ALL
 USING (true);


-- public."plans" definition

-- Drop table

-- DROP TABLE public."plans";

CREATE TABLE public."plans" (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	"name" text NULL,
	description text NULL,
	active bool DEFAULT true NULL,
	"key" text NOT NULL,
	CONSTRAINT plans_key_key UNIQUE (key),
	CONSTRAINT plans_pkey PRIMARY KEY (id)
);


-- public.stripe_events definition

-- Drop table

-- DROP TABLE public.stripe_events;

CREATE TABLE public.stripe_events (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	stripe_event_id text NOT NULL,
	event_type text NOT NULL,
	processed bool DEFAULT false NULL,
	created_at timestamp DEFAULT now() NULL,
	"data" jsonb NULL,
	CONSTRAINT stripe_events_pkey PRIMARY KEY (id),
	CONSTRAINT stripe_events_stripe_event_id_key UNIQUE (stripe_event_id)
);


-- public.stripe_price_mappings definition

-- Drop table

-- DROP TABLE public.stripe_price_mappings;

CREATE TABLE public.stripe_price_mappings (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	stripe_price_id text NOT NULL,
	billing_type text NOT NULL,
	listing_count int4 NOT NULL,
	tier text NOT NULL,
	amount_cents int4 NOT NULL,
	active bool DEFAULT true NOT NULL,
	CONSTRAINT stripe_price_mappings_billing_type_check CHECK ((billing_type = ANY (ARRAY['subscription'::text, 'one_time'::text]))),
	CONSTRAINT stripe_price_mappings_listing_count_check CHECK ((listing_count > 0)),
	CONSTRAINT stripe_price_mappings_pkey PRIMARY KEY (id),
	CONSTRAINT stripe_price_mappings_stripe_price_id_key UNIQUE (stripe_price_id),
	CONSTRAINT stripe_price_mappings_tier_check CHECK ((tier = ANY (ARRAY['starter'::text, 'growth'::text, 'pro'::text, 'portfolio'::text])))
);


-- public.plans_features_map definition

-- Drop table

-- DROP TABLE public.plans_features_map;

CREATE TABLE public.plans_features_map (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	plan_id uuid NULL,
	feature_id uuid NULL,
	CONSTRAINT plans_features_map_pkey PRIMARY KEY (id),
	CONSTRAINT plans_features_map_feature_id_fkey FOREIGN KEY (feature_id) REFERENCES public.features(id),
	CONSTRAINT plans_features_map_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public."plans"(id)
);


-- public.anonymous_feedback_reports definition

-- Drop table

-- DROP TABLE public.anonymous_feedback_reports;

CREATE TABLE public.anonymous_feedback_reports (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	anonymous_user_id uuid NOT NULL,
	session_storage_id uuid NULL,
	property_id varchar(255) NOT NULL,
	str_property_id uuid NULL,
	ratings_data jsonb NULL,
	created_at timestamptz DEFAULT now() NULL,
	expires_at timestamptz NULL,
	claimed_by_user_id uuid NULL,
	claimed_at timestamptz NULL,
	ip_address inet NULL,
	user_agent text NULL,
	CONSTRAINT anonymous_feedback_reports_pkey PRIMARY KEY (id)
);
CREATE INDEX idx_anon_reports_anonymous_user ON public.anonymous_feedback_reports USING btree (anonymous_user_id);
CREATE INDEX idx_anon_reports_created ON public.anonymous_feedback_reports USING btree (created_at DESC);
CREATE INDEX idx_anon_reports_property ON public.anonymous_feedback_reports USING btree (property_id);
CREATE INDEX idx_anon_reports_session_storage ON public.anonymous_feedback_reports USING btree (session_storage_id);
CREATE INDEX idx_anon_reports_unclaimed ON public.anonymous_feedback_reports USING btree (claimed_by_user_id) WHERE (claimed_by_user_id IS NULL);
ALTER TABLE public.anonymous_feedback_reports ENABLE ROW LEVEL SECURITY;

-- Table Policies

CREATE POLICY "Anonymous users can insert own reports" ON public.anonymous_feedback_reports
 AS PERMISSIVE
 FOR INSERT
 WITH CHECK ((auth.uid() = anonymous_user_id));
CREATE POLICY "Anonymous users can read own reports" ON public.anonymous_feedback_reports
 AS PERMISSIVE
 FOR SELECT
 USING (((auth.uid() = anonymous_user_id) OR (auth.uid() = claimed_by_user_id)));
CREATE POLICY "Service role full access" ON public.anonymous_feedback_reports
 AS PERMISSIVE
 FOR ALL
 USING (((auth.jwt() ->> 'role'::text) = 'service_role'::text));
CREATE POLICY "Users can claim anonymous reports" ON public.anonymous_feedback_reports
 AS PERMISSIVE
 FOR UPDATE
 USING (((auth.uid() = anonymous_user_id) OR (auth.uid() = claimed_by_user_id)));


-- public.comps definition

-- Drop table

-- DROP TABLE public.comps;

CREATE TABLE public.comps (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	profile_id uuid NOT NULL,
	scan_id text NOT NULL,
	listing_id text NOT NULL,
	thirty_day int2 NULL,
	sixty_day int2 NULL,
	ninety_day int2 NULL,
	overall_occupancy int2 NULL,
	comp_basis_id uuid NULL,
	CONSTRAINT comps_pkey PRIMARY KEY (id)
);


-- public.comps_analysis definition

-- Drop table

-- DROP TABLE public.comps_analysis;

CREATE TABLE public.comps_analysis (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	profile_id uuid NOT NULL,
	property_id uuid NOT NULL,
	summary jsonb NOT NULL,
	CONSTRAINT comps_analysis_pkey PRIMARY KEY (id)
);


-- public.exit_survey_responses definition

-- Drop table

-- DROP TABLE public.exit_survey_responses;

CREATE TABLE public.exit_survey_responses (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	user_id uuid NULL,
	page_path text NOT NULL,
	selected_option text NOT NULL,
	other_text text NULL,
	user_agent text NULL,
	created_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL,
	CONSTRAINT exit_survey_responses_pkey PRIMARY KEY (id)
);
CREATE INDEX idx_exit_survey_responses_created_at ON public.exit_survey_responses USING btree (created_at DESC);
CREATE INDEX idx_exit_survey_responses_page_path ON public.exit_survey_responses USING btree (page_path);
CREATE INDEX idx_exit_survey_responses_selected_option ON public.exit_survey_responses USING btree (selected_option);
CREATE INDEX idx_exit_survey_responses_user_id ON public.exit_survey_responses USING btree (user_id);
ALTER TABLE public.exit_survey_responses ENABLE ROW LEVEL SECURITY;

-- Table Policies

CREATE POLICY "Allow anyone to insert survey responses" ON public.exit_survey_responses
 AS PERMISSIVE
 FOR INSERT
 WITH CHECK (true);
CREATE POLICY "Users can view their own responses" ON public.exit_survey_responses
 AS PERMISSIVE
 FOR SELECT
 TO authenticated
 USING ((auth.uid() = user_id));


-- public.feedback_genius_runs definition

-- Drop table

-- DROP TABLE public.feedback_genius_runs;

CREATE TABLE public.feedback_genius_runs (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	created_at timestamptz DEFAULT now() NULL,
	updated_at timestamptz DEFAULT now() NULL,
	profile_id uuid NULL,
	property_id varchar(255) NULL,
	airbnb_url text NULL,
	started_at timestamptz NULL,
	completed_at timestamptz NULL,
	execution_time_ms int4 NULL,
	scraping_time_ms int4 NULL,
	assessment_time_ms int4 NULL,
	status varchar(50) DEFAULT 'in_progress'::character varying NULL,
	error_message text NULL,
	str_property_id uuid NULL,
	CONSTRAINT feedback_genius_runs_pkey PRIMARY KEY (id)
);
CREATE INDEX idx_feedback_genius_runs_execution_time ON public.feedback_genius_runs USING btree (execution_time_ms);
CREATE INDEX idx_feedback_genius_runs_profile_id ON public.feedback_genius_runs USING btree (profile_id);
CREATE INDEX idx_feedback_genius_runs_property_id ON public.feedback_genius_runs USING btree (property_id);
CREATE INDEX idx_feedback_genius_runs_started_at ON public.feedback_genius_runs USING btree (started_at);
CREATE INDEX idx_feedback_genius_runs_status ON public.feedback_genius_runs USING btree (status);


-- public.listing_feedback_usage definition

-- Drop table

-- DROP TABLE public.listing_feedback_usage;

CREATE TABLE public.listing_feedback_usage (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	profile_id uuid NOT NULL,
	property_id uuid NOT NULL,
	CONSTRAINT listing_feedback_usage_pkey PRIMARY KEY (id)
);
ALTER TABLE public.listing_feedback_usage ENABLE ROW LEVEL SECURITY;


-- public.listings definition

-- Drop table

-- DROP TABLE public.listings;

CREATE TABLE public.listings (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	profile_id uuid NULL,
	listed_on text NULL,
	external_listing_id text NULL,
	property_id uuid NULL,
	CONSTRAINT listings_pkey PRIMARY KEY (id)
);


-- public.market_scout_runs definition

-- Drop table

-- DROP TABLE public.market_scout_runs;

CREATE TABLE public.market_scout_runs (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	created_at timestamptz DEFAULT now() NULL,
	updated_at timestamptz DEFAULT now() NULL,
	profile_id uuid NULL,
	scan_id varchar(255) NULL,
	address text NULL,
	geocode text NULL,
	started_at timestamptz NULL,
	completed_at timestamptz NULL,
	execution_time_ms int4 NULL,
	scraping_time_ms int4 NULL,
	assessment_time_ms int4 NULL,
	target_listings int4 NULL,
	listings_found int4 NULL,
	listings_assessed int4 NULL,
	status varchar(50) DEFAULT 'in_progress'::character varying NULL,
	error_message text NULL,
	form_data jsonb NULL,
	CONSTRAINT market_scout_runs_pkey PRIMARY KEY (id)
);
CREATE INDEX idx_market_scout_runs_execution_time ON public.market_scout_runs USING btree (execution_time_ms);
CREATE INDEX idx_market_scout_runs_profile_id ON public.market_scout_runs USING btree (profile_id);
CREATE INDEX idx_market_scout_runs_scan_id ON public.market_scout_runs USING btree (scan_id);
CREATE INDEX idx_market_scout_runs_started_at ON public.market_scout_runs USING btree (started_at);


-- public.market_spy_runs definition

-- Drop table

-- DROP TABLE public.market_spy_runs;

CREATE TABLE public.market_spy_runs (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	created_at timestamptz DEFAULT now() NULL,
	updated_at timestamptz DEFAULT now() NULL,
	profile_id uuid NULL,
	scan_id varchar(255) NULL,
	address text NULL,
	geocode text NULL,
	started_at timestamptz NULL,
	completed_at timestamptz NULL,
	execution_time_ms int4 NULL,
	scraping_time_ms int4 NULL,
	assessment_time_ms int4 NULL,
	target_listings int4 NULL,
	listings_found int4 NULL,
	listings_assessed int4 NULL,
	status varchar(50) DEFAULT 'in_progress'::character varying NULL,
	error_message text NULL,
	form_data jsonb NULL,
	CONSTRAINT market_spy_runs_pkey PRIMARY KEY (id)
);
CREATE INDEX idx_market_spy_runs_execution_time ON public.market_spy_runs USING btree (execution_time_ms);
CREATE INDEX idx_market_spy_runs_profile_id ON public.market_spy_runs USING btree (profile_id);
CREATE INDEX idx_market_spy_runs_scan_id ON public.market_spy_runs USING btree (scan_id);
CREATE INDEX idx_market_spy_runs_started_at ON public.market_spy_runs USING btree (started_at);

-- Table Policies

CREATE POLICY "Users can insert own market spy runs" ON public.market_spy_runs
 AS PERMISSIVE
 FOR INSERT
 WITH CHECK ((auth.uid() = profile_id));
CREATE POLICY "Users can update own market spy runs" ON public.market_spy_runs
 AS PERMISSIVE
 FOR UPDATE
 USING ((auth.uid() = profile_id));
CREATE POLICY "Users can view own market spy runs" ON public.market_spy_runs
 AS PERMISSIVE
 FOR SELECT
 USING ((auth.uid() = profile_id));


-- public.profiles definition

-- Drop table

-- DROP TABLE public.profiles;

CREATE TABLE public.profiles (
	id uuid NOT NULL,
	updated_at timestamptz NULL,
	username text NULL,
	full_name text NULL,
	avatar_url text NULL,
	website text NULL,
	primary_email text NULL,
	secondary_email text NULL,
	primary_phone text NULL,
	secondary_phone text NULL,
	notification_preference text NULL,
	plan_id uuid DEFAULT '5cb61d3c-306e-4518-8ec1-fa59585ce27c'::uuid NULL,
	stripe_customer_id text NULL,
	stripe_subscription_id text NULL,
	subscription_status text NULL,
	subscription_quantity int4 DEFAULT 1 NULL,
	market_spy_listings_limit int4 DEFAULT 0 NULL,
	market_spy_listings_used int4 DEFAULT 0 NULL,
	billing_type text DEFAULT 'subscription'::text NULL,
	current_tier text DEFAULT 'starter'::text NULL,
	listings_purchased int4 DEFAULT 0 NULL,
	purchase_date timestamptz NULL,
	current_period_start timestamptz NULL,
	current_period_end timestamptz NULL,
	one_time_listings_balance int4 DEFAULT 0 NULL,
	is_admin bool DEFAULT false NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	CONSTRAINT profiles_billing_type_check CHECK ((billing_type = ANY (ARRAY['subscription'::text, 'one_time'::text]))),
	CONSTRAINT profiles_current_tier_check CHECK ((current_tier = ANY (ARRAY['starter'::text, 'growth'::text, 'pro'::text, 'portfolio'::text]))),
	CONSTRAINT profiles_pkey PRIMARY KEY (id),
	CONSTRAINT profiles_username_key UNIQUE (username),
	CONSTRAINT username_length CHECK ((char_length(username) >= 3))
);
CREATE INDEX idx_profiles_billing_type ON public.profiles USING btree (billing_type);
CREATE INDEX idx_profiles_current_tier ON public.profiles USING btree (current_tier);
CREATE INDEX idx_profiles_market_spy_usage ON public.profiles USING btree (market_spy_listings_used, market_spy_listings_limit);
CREATE INDEX idx_profiles_plan_id ON public.profiles USING btree (plan_id);
CREATE INDEX idx_profiles_purchase_date ON public.profiles USING btree (purchase_date);
CREATE INDEX idx_profiles_stripe_subscription_id ON public.profiles USING btree (stripe_subscription_id);

-- Table Policies

CREATE POLICY "Public profiles are viewable only by authenticated users" ON public.profiles
 AS PERMISSIVE
 FOR SELECT
 TO authenticated
 USING (true);
CREATE POLICY "Users can create a profile." ON public.profiles
 AS PERMISSIVE
 FOR INSERT
 TO authenticated
 WITH CHECK ((( SELECT auth.uid() AS uid) = id));
CREATE POLICY "Users can update their own profile." ON public.profiles
 AS PERMISSIVE
 FOR UPDATE
 TO authenticated
 USING ((( SELECT auth.uid() AS uid) = id))
 WITH CHECK ((( SELECT auth.uid() AS uid) = id));


-- public.properties definition

-- Drop table

-- DROP TABLE public.properties;

CREATE TABLE public.properties (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	"name" text NULL,
	description text NULL,
	profile_id uuid NULL,
	primary_email text NULL,
	secondary_email text NULL,
	primary_phone text NULL,
	secondary_phone text NULL,
	primary_contact text NULL,
	secondary_contact text NULL,
	notification_preference text DEFAULT 'email'::text NULL,
	CONSTRAINT properties_pkey PRIMARY KEY (id)
);


-- public.property_ratings definition

-- Drop table

-- DROP TABLE public.property_ratings;

CREATE TABLE public.property_ratings (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	property_id uuid NOT NULL,
	ratings jsonb NOT NULL,
	modified_at timestamp DEFAULT now() NULL,
	CONSTRAINT property_ratings_property_id_key UNIQUE (property_id)
);


-- public.scan_mismatches definition

-- Drop table

-- DROP TABLE public.scan_mismatches;

CREATE TABLE public.scan_mismatches (
	id int8 GENERATED BY DEFAULT AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START 1 CACHE 1 NO CYCLE) NOT NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	profile_id uuid NULL,
	property_id uuid NULL,
	mismatch_date timestamptz DEFAULT now() NULL,
	message text NULL,
	scan_id int8 NULL,
	CONSTRAINT scan_mismatches_pkey PRIMARY KEY (id)
);


-- public.scans definition

-- Drop table

-- DROP TABLE public.scans;

CREATE TABLE public.scans (
	id int8 GENERATED BY DEFAULT AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START 1 CACHE 1 NO CYCLE) NOT NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	profile_id uuid NULL,
	property_id uuid NULL,
	has_mismatch bool DEFAULT false NULL,
	CONSTRAINT scans_pkey PRIMARY KEY (id)
);


-- public.str_properties definition

-- Drop table

-- DROP TABLE public.str_properties;

CREATE TABLE public.str_properties (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	address text NULL,
	title text NOT NULL,
	city text NULL,
	state text NULL,
	zip text NULL,
	url text NULL,
	external_id text NOT NULL,
	description text NULL,
	user_id uuid NULL,
	parent_id uuid NULL,
	is_parent bool NULL,
	amenities json NULL,
	hero_image_link text NULL,
	other_image_links jsonb NULL,
	is_comp bool DEFAULT false NULL,
	comp_id uuid NULL,
	bedrooms text NULL,
	pets text NULL,
	instant_book bool DEFAULT false NULL,
	cancellation_policy text NULL,
	review_count int4 DEFAULT 0 NULL,
	average_rating numeric(3, 2) DEFAULT 0.0 NULL,
	policies text NULL,
	updated_at timestamptz DEFAULT now() NULL,
	CONSTRAINT str_properties_external_id_key UNIQUE (external_id),
	CONSTRAINT str_properties_pkey PRIMARY KEY (id)
);

-- Table Triggers

create trigger update_str_properties_updated_at before
update
    on
    public.str_properties for each row execute function update_updated_at_column();


-- public.str_property_ratings definition

-- Drop table

-- DROP TABLE public.str_property_ratings;

CREATE TABLE public.str_property_ratings (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	property_id uuid NOT NULL,
	description_rating_number text NULL,
	hero_image_rating_number text NULL,
	overall_photo_rating text NULL,
	interior_rating_category text NULL,
	"30_day_occupancy" text NULL,
	"60_day_occupancy" text NULL,
	"90_day_occupancy" text NULL,
	feedback text NULL,
	suggestions text NULL,
	description_rating_category text NULL,
	amenities_rating_category text NULL,
	amenities_rating_number text NULL,
	hero_image_rating_category text NULL,
	title_rating_number text NULL,
	title_rating_category text NULL,
	interior_rating_number text NULL,
	other_images_rating_category text NULL,
	other_images_rating_number text NULL,
	CONSTRAINT str_property_ratings_pkey PRIMARY KEY (id),
	CONSTRAINT str_property_ratings_property_id_key UNIQUE (property_id)
);


-- public.anonymous_feedback_reports foreign keys

ALTER TABLE public.anonymous_feedback_reports ADD CONSTRAINT anonymous_feedback_reports_claimed_by_user_id_fkey FOREIGN KEY (claimed_by_user_id) REFERENCES auth.users(id) ON DELETE SET NULL;


-- public.comps foreign keys

ALTER TABLE public.comps ADD CONSTRAINT comps_comp_basis_id_fkey FOREIGN KEY (comp_basis_id) REFERENCES public.comp_basis(id);
ALTER TABLE public.comps ADD CONSTRAINT comps_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id);
ALTER TABLE public.comps ADD CONSTRAINT comps_scan_id_fkey FOREIGN KEY (scan_id) REFERENCES public.comp_basis(scan_id);


-- public.comps_analysis foreign keys

ALTER TABLE public.comps_analysis ADD CONSTRAINT comps_analysis_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id);
ALTER TABLE public.comps_analysis ADD CONSTRAINT comps_analysis_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.str_properties(id);


-- public.exit_survey_responses foreign keys

ALTER TABLE public.exit_survey_responses ADD CONSTRAINT exit_survey_responses_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL;


-- public.feedback_genius_runs foreign keys

ALTER TABLE public.feedback_genius_runs ADD CONSTRAINT feedback_genius_runs_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id);
ALTER TABLE public.feedback_genius_runs ADD CONSTRAINT feedback_genius_runs_str_property_id_fkey FOREIGN KEY (str_property_id) REFERENCES public.str_properties(id);


-- public.listing_feedback_usage foreign keys

ALTER TABLE public.listing_feedback_usage ADD CONSTRAINT listing_feedback_usage_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id);
ALTER TABLE public.listing_feedback_usage ADD CONSTRAINT listing_feedback_usage_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.str_properties(id);


-- public.listings foreign keys

ALTER TABLE public.listings ADD CONSTRAINT listings_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id);
ALTER TABLE public.listings ADD CONSTRAINT listings_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.properties(id);


-- public.market_scout_runs foreign keys

ALTER TABLE public.market_scout_runs ADD CONSTRAINT market_scout_runs_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id);


-- public.market_spy_runs foreign keys

ALTER TABLE public.market_spy_runs ADD CONSTRAINT market_spy_runs_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id);


-- public.profiles foreign keys

ALTER TABLE public.profiles ADD CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id);
ALTER TABLE public.profiles ADD CONSTRAINT profiles_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public."plans"(id);


-- public.properties foreign keys

ALTER TABLE public.properties ADD CONSTRAINT properties_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id);


-- public.property_ratings foreign keys

ALTER TABLE public.property_ratings ADD CONSTRAINT property_ratings_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.str_properties(id);


-- public.scan_mismatches foreign keys

ALTER TABLE public.scan_mismatches ADD CONSTRAINT scan_mismatches_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id);
ALTER TABLE public.scan_mismatches ADD CONSTRAINT scan_mismatches_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.properties(id);
ALTER TABLE public.scan_mismatches ADD CONSTRAINT scan_mismatches_scan_id_fkey FOREIGN KEY (scan_id) REFERENCES public.scans(id);


-- public.scans foreign keys

ALTER TABLE public.scans ADD CONSTRAINT scans_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id);
ALTER TABLE public.scans ADD CONSTRAINT scans_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.properties(id);


-- public.str_properties foreign keys

ALTER TABLE public.str_properties ADD CONSTRAINT str_properties_comp_id_fkey FOREIGN KEY (comp_id) REFERENCES public.comps(id);
ALTER TABLE public.str_properties ADD CONSTRAINT str_properties_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id);


-- public.str_property_ratings foreign keys

ALTER TABLE public.str_property_ratings ADD CONSTRAINT str_property_ratings_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.str_properties(id);



-- DROP FUNCTION public.cleanup_old_contact_submissions();

CREATE OR REPLACE FUNCTION public.cleanup_old_contact_submissions()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  DELETE FROM contact_form_submissions
  WHERE submitted_at < NOW() - INTERVAL '24 hours';
END;
$function$
;

-- DROP FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
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
  $function$
;

-- DROP FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$function$
;