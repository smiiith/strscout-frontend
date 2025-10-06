create extension if not exists "pg_net" with schema "public" version '0.8.0';

create table "public"."comps_analysis" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "profile_id" uuid not null,
    "property_id" uuid not null,
    "summary" jsonb not null
);


create table "public"."market_spy_runs" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "profile_id" uuid,
    "scan_id" character varying(255),
    "address" text,
    "geocode" text,
    "started_at" timestamp with time zone,
    "completed_at" timestamp with time zone,
    "execution_time_ms" integer,
    "scraping_time_ms" integer,
    "assessment_time_ms" integer,
    "target_listings" integer,
    "listings_found" integer,
    "listings_assessed" integer,
    "status" character varying(50) default 'in_progress'::character varying,
    "error_message" text
);


create table "public"."stripe_price_mappings" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "stripe_price_id" text not null,
    "billing_type" text not null,
    "listing_count" integer not null,
    "tier" text not null,
    "amount_cents" integer not null,
    "active" boolean not null default true
);


alter table "public"."comps" add column "comp_basis_id" uuid;

alter table "public"."profiles" add column "billing_type" text default 'subscription'::text;

alter table "public"."profiles" add column "current_period_end" timestamp with time zone;

alter table "public"."profiles" add column "current_period_start" timestamp with time zone;

alter table "public"."profiles" add column "current_tier" text default 'starter'::text;

alter table "public"."profiles" add column "listings_purchased" integer default 0;

alter table "public"."profiles" add column "market_spy_listings_limit" integer default 0;

alter table "public"."profiles" add column "market_spy_listings_used" integer default 0;

alter table "public"."profiles" add column "purchase_date" timestamp with time zone;

alter table "public"."profiles" add column "subscription_quantity" integer default 1;

alter table "public"."str_properties" add column "comp_id" uuid;

alter table "public"."str_properties" add column "updated_at" timestamp with time zone default now();

CREATE UNIQUE INDEX comps_analysis_pkey ON public.comps_analysis USING btree (id);

CREATE INDEX idx_market_spy_runs_execution_time ON public.market_spy_runs USING btree (execution_time_ms);

CREATE INDEX idx_market_spy_runs_profile_id ON public.market_spy_runs USING btree (profile_id);

CREATE INDEX idx_market_spy_runs_scan_id ON public.market_spy_runs USING btree (scan_id);

CREATE INDEX idx_market_spy_runs_started_at ON public.market_spy_runs USING btree (started_at);

CREATE INDEX idx_profiles_billing_type ON public.profiles USING btree (billing_type);

CREATE INDEX idx_profiles_current_tier ON public.profiles USING btree (current_tier);

CREATE INDEX idx_profiles_market_spy_usage ON public.profiles USING btree (market_spy_listings_used, market_spy_listings_limit);

CREATE INDEX idx_profiles_plan_id ON public.profiles USING btree (plan_id);

CREATE INDEX idx_profiles_purchase_date ON public.profiles USING btree (purchase_date);

CREATE INDEX idx_profiles_stripe_subscription_id ON public.profiles USING btree (stripe_subscription_id);

CREATE UNIQUE INDEX market_spy_runs_pkey ON public.market_spy_runs USING btree (id);

CREATE UNIQUE INDEX stripe_price_mappings_pkey ON public.stripe_price_mappings USING btree (id);

CREATE UNIQUE INDEX stripe_price_mappings_stripe_price_id_key ON public.stripe_price_mappings USING btree (stripe_price_id);

alter table "public"."comps_analysis" add constraint "comps_analysis_pkey" PRIMARY KEY using index "comps_analysis_pkey";

alter table "public"."market_spy_runs" add constraint "market_spy_runs_pkey" PRIMARY KEY using index "market_spy_runs_pkey";

alter table "public"."stripe_price_mappings" add constraint "stripe_price_mappings_pkey" PRIMARY KEY using index "stripe_price_mappings_pkey";

alter table "public"."comps" add constraint "comps_comp_basis_id_fkey" FOREIGN KEY (comp_basis_id) REFERENCES comp_basis(id) not valid;

alter table "public"."comps" validate constraint "comps_comp_basis_id_fkey";

alter table "public"."comps_analysis" add constraint "comps_analysis_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profiles(id) not valid;

alter table "public"."comps_analysis" validate constraint "comps_analysis_profile_id_fkey";

alter table "public"."comps_analysis" add constraint "comps_analysis_property_id_fkey" FOREIGN KEY (property_id) REFERENCES str_properties(id) not valid;

alter table "public"."comps_analysis" validate constraint "comps_analysis_property_id_fkey";

alter table "public"."market_spy_runs" add constraint "market_spy_runs_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profiles(id) not valid;

alter table "public"."market_spy_runs" validate constraint "market_spy_runs_profile_id_fkey";

alter table "public"."profiles" add constraint "profiles_billing_type_check" CHECK ((billing_type = ANY (ARRAY['subscription'::text, 'one_time'::text]))) not valid;

alter table "public"."profiles" validate constraint "profiles_billing_type_check";

alter table "public"."profiles" add constraint "profiles_current_tier_check" CHECK ((current_tier = ANY (ARRAY['starter'::text, 'growth'::text, 'pro'::text, 'portfolio'::text]))) not valid;

alter table "public"."profiles" validate constraint "profiles_current_tier_check";

alter table "public"."str_properties" add constraint "str_properties_comp_id_fkey" FOREIGN KEY (comp_id) REFERENCES comps(id) not valid;

alter table "public"."str_properties" validate constraint "str_properties_comp_id_fkey";

alter table "public"."stripe_price_mappings" add constraint "stripe_price_mappings_billing_type_check" CHECK ((billing_type = ANY (ARRAY['subscription'::text, 'one_time'::text]))) not valid;

alter table "public"."stripe_price_mappings" validate constraint "stripe_price_mappings_billing_type_check";

alter table "public"."stripe_price_mappings" add constraint "stripe_price_mappings_listing_count_check" CHECK ((listing_count > 0)) not valid;

alter table "public"."stripe_price_mappings" validate constraint "stripe_price_mappings_listing_count_check";

alter table "public"."stripe_price_mappings" add constraint "stripe_price_mappings_stripe_price_id_key" UNIQUE using index "stripe_price_mappings_stripe_price_id_key";

alter table "public"."stripe_price_mappings" add constraint "stripe_price_mappings_tier_check" CHECK ((tier = ANY (ARRAY['starter'::text, 'growth'::text, 'pro'::text, 'portfolio'::text]))) not valid;

alter table "public"."stripe_price_mappings" validate constraint "stripe_price_mappings_tier_check";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$function$
;

grant delete on table "public"."comps_analysis" to "anon";

grant insert on table "public"."comps_analysis" to "anon";

grant references on table "public"."comps_analysis" to "anon";

grant select on table "public"."comps_analysis" to "anon";

grant trigger on table "public"."comps_analysis" to "anon";

grant truncate on table "public"."comps_analysis" to "anon";

grant update on table "public"."comps_analysis" to "anon";

grant delete on table "public"."comps_analysis" to "authenticated";

grant insert on table "public"."comps_analysis" to "authenticated";

grant references on table "public"."comps_analysis" to "authenticated";

grant select on table "public"."comps_analysis" to "authenticated";

grant trigger on table "public"."comps_analysis" to "authenticated";

grant truncate on table "public"."comps_analysis" to "authenticated";

grant update on table "public"."comps_analysis" to "authenticated";

grant delete on table "public"."comps_analysis" to "service_role";

grant insert on table "public"."comps_analysis" to "service_role";

grant references on table "public"."comps_analysis" to "service_role";

grant select on table "public"."comps_analysis" to "service_role";

grant trigger on table "public"."comps_analysis" to "service_role";

grant truncate on table "public"."comps_analysis" to "service_role";

grant update on table "public"."comps_analysis" to "service_role";

grant delete on table "public"."market_spy_runs" to "anon";

grant insert on table "public"."market_spy_runs" to "anon";

grant references on table "public"."market_spy_runs" to "anon";

grant select on table "public"."market_spy_runs" to "anon";

grant trigger on table "public"."market_spy_runs" to "anon";

grant truncate on table "public"."market_spy_runs" to "anon";

grant update on table "public"."market_spy_runs" to "anon";

grant delete on table "public"."market_spy_runs" to "authenticated";

grant insert on table "public"."market_spy_runs" to "authenticated";

grant references on table "public"."market_spy_runs" to "authenticated";

grant select on table "public"."market_spy_runs" to "authenticated";

grant trigger on table "public"."market_spy_runs" to "authenticated";

grant truncate on table "public"."market_spy_runs" to "authenticated";

grant update on table "public"."market_spy_runs" to "authenticated";

grant delete on table "public"."market_spy_runs" to "service_role";

grant insert on table "public"."market_spy_runs" to "service_role";

grant references on table "public"."market_spy_runs" to "service_role";

grant select on table "public"."market_spy_runs" to "service_role";

grant trigger on table "public"."market_spy_runs" to "service_role";

grant truncate on table "public"."market_spy_runs" to "service_role";

grant update on table "public"."market_spy_runs" to "service_role";

grant delete on table "public"."stripe_price_mappings" to "anon";

grant insert on table "public"."stripe_price_mappings" to "anon";

grant references on table "public"."stripe_price_mappings" to "anon";

grant select on table "public"."stripe_price_mappings" to "anon";

grant trigger on table "public"."stripe_price_mappings" to "anon";

grant truncate on table "public"."stripe_price_mappings" to "anon";

grant update on table "public"."stripe_price_mappings" to "anon";

grant delete on table "public"."stripe_price_mappings" to "authenticated";

grant insert on table "public"."stripe_price_mappings" to "authenticated";

grant references on table "public"."stripe_price_mappings" to "authenticated";

grant select on table "public"."stripe_price_mappings" to "authenticated";

grant trigger on table "public"."stripe_price_mappings" to "authenticated";

grant truncate on table "public"."stripe_price_mappings" to "authenticated";

grant update on table "public"."stripe_price_mappings" to "authenticated";

grant delete on table "public"."stripe_price_mappings" to "service_role";

grant insert on table "public"."stripe_price_mappings" to "service_role";

grant references on table "public"."stripe_price_mappings" to "service_role";

grant select on table "public"."stripe_price_mappings" to "service_role";

grant trigger on table "public"."stripe_price_mappings" to "service_role";

grant truncate on table "public"."stripe_price_mappings" to "service_role";

grant update on table "public"."stripe_price_mappings" to "service_role";

create policy "Users can insert own market spy runs"
on "public"."market_spy_runs"
as permissive
for insert
to public
with check ((auth.uid() = profile_id));


create policy "Users can update own market spy runs"
on "public"."market_spy_runs"
as permissive
for update
to public
using ((auth.uid() = profile_id));


create policy "Users can view own market spy runs"
on "public"."market_spy_runs"
as permissive
for select
to public
using ((auth.uid() = profile_id));


CREATE TRIGGER update_str_properties_updated_at BEFORE UPDATE ON public.str_properties FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


