create extension if not exists "pg_net" with schema "public" version '0.8.0';

create table if not exists "public"."comp_basis" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "profile_id" uuid not null,
    "address" text not null,
    "latitude" text not null,
    "longitude" text not null,
    "scan_id" text not null,
    "status" text not null default 'pending'::text
);


create table if not exists "public"."comps" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "profile_id" uuid not null,
    "scan_id" text not null,
    "listing_id" text not null,
    "thirty_day" smallint,
    "sixty_day" smallint,
    "ninety_day" smallint,
    "overall_occupancy" smallint
);


create table if not exists "public"."stripe_events" (
    "id" uuid not null default gen_random_uuid(),
    "stripe_event_id" text not null,
    "event_type" text not null,
    "processed" boolean default false,
    "created_at" timestamp without time zone default now(),
    "data" jsonb
);


-- Add columns if they don't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'stripe_customer_id') THEN
        ALTER TABLE "public"."profiles" ADD COLUMN "stripe_customer_id" text;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'stripe_subscription_id') THEN
        ALTER TABLE "public"."profiles" ADD COLUMN "stripe_subscription_id" text;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'subscription_status') THEN
        ALTER TABLE "public"."profiles" ADD COLUMN "subscription_status" text;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'str_properties' AND column_name = 'is_comp') THEN
        ALTER TABLE "public"."str_properties" ADD COLUMN "is_comp" boolean default false;
    END IF;
END $$;

-- Set default for plan_id
ALTER TABLE "public"."profiles" ALTER COLUMN "plan_id" SET DEFAULT '5cb61d3c-306e-4518-8ec1-fa59585ce27c'::uuid;

-- Create indexes if they don't exist
CREATE UNIQUE INDEX IF NOT EXISTS comp_basis_pkey ON public.comp_basis USING btree (id);
CREATE UNIQUE INDEX IF NOT EXISTS comp_basis_scan_id_key ON public.comp_basis USING btree (scan_id);
CREATE UNIQUE INDEX IF NOT EXISTS comps_pkey ON public.comps USING btree (id);
CREATE UNIQUE INDEX IF NOT EXISTS stripe_events_pkey ON public.stripe_events USING btree (id);
CREATE UNIQUE INDEX IF NOT EXISTS stripe_events_stripe_event_id_key ON public.stripe_events USING btree (stripe_event_id);

-- Add constraints if they don't exist
DO $$
BEGIN
    -- Primary key constraints
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'comp_basis_pkey') THEN
        ALTER TABLE "public"."comp_basis" ADD CONSTRAINT "comp_basis_pkey" PRIMARY KEY USING INDEX "comp_basis_pkey";
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'comps_pkey') THEN
        ALTER TABLE "public"."comps" ADD CONSTRAINT "comps_pkey" PRIMARY KEY USING INDEX "comps_pkey";
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'stripe_events_pkey') THEN
        ALTER TABLE "public"."stripe_events" ADD CONSTRAINT "stripe_events_pkey" PRIMARY KEY USING INDEX "stripe_events_pkey";
    END IF;
    
    -- Unique constraints
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'comp_basis_scan_id_key') THEN
        ALTER TABLE "public"."comp_basis" ADD CONSTRAINT "comp_basis_scan_id_key" UNIQUE USING INDEX "comp_basis_scan_id_key";
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'stripe_events_stripe_event_id_key') THEN
        ALTER TABLE "public"."stripe_events" ADD CONSTRAINT "stripe_events_stripe_event_id_key" UNIQUE USING INDEX "stripe_events_stripe_event_id_key";
    END IF;
    
    -- Foreign key constraints
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'comps_profile_id_fkey') THEN
        ALTER TABLE "public"."comps" ADD CONSTRAINT "comps_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profiles(id) NOT VALID;
        ALTER TABLE "public"."comps" VALIDATE CONSTRAINT "comps_profile_id_fkey";
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'comps_scan_id_fkey') THEN
        ALTER TABLE "public"."comps" ADD CONSTRAINT "comps_scan_id_fkey" FOREIGN KEY (scan_id) REFERENCES comp_basis(scan_id) NOT VALID;
        ALTER TABLE "public"."comps" VALIDATE CONSTRAINT "comps_scan_id_fkey";
    END IF;
END $$;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$begin
  insert into public.profiles (id, full_name, avatar_url, primary_email)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', new.email);
  return new;
end;$function$
;

grant delete on table "public"."comp_basis" to "anon";

grant insert on table "public"."comp_basis" to "anon";

grant references on table "public"."comp_basis" to "anon";

grant select on table "public"."comp_basis" to "anon";

grant trigger on table "public"."comp_basis" to "anon";

grant truncate on table "public"."comp_basis" to "anon";

grant update on table "public"."comp_basis" to "anon";

grant delete on table "public"."comp_basis" to "authenticated";

grant insert on table "public"."comp_basis" to "authenticated";

grant references on table "public"."comp_basis" to "authenticated";

grant select on table "public"."comp_basis" to "authenticated";

grant trigger on table "public"."comp_basis" to "authenticated";

grant truncate on table "public"."comp_basis" to "authenticated";

grant update on table "public"."comp_basis" to "authenticated";

grant delete on table "public"."comp_basis" to "service_role";

grant insert on table "public"."comp_basis" to "service_role";

grant references on table "public"."comp_basis" to "service_role";

grant select on table "public"."comp_basis" to "service_role";

grant trigger on table "public"."comp_basis" to "service_role";

grant truncate on table "public"."comp_basis" to "service_role";

grant update on table "public"."comp_basis" to "service_role";

grant delete on table "public"."comps" to "anon";

grant insert on table "public"."comps" to "anon";

grant references on table "public"."comps" to "anon";

grant select on table "public"."comps" to "anon";

grant trigger on table "public"."comps" to "anon";

grant truncate on table "public"."comps" to "anon";

grant update on table "public"."comps" to "anon";

grant delete on table "public"."comps" to "authenticated";

grant insert on table "public"."comps" to "authenticated";

grant references on table "public"."comps" to "authenticated";

grant select on table "public"."comps" to "authenticated";

grant trigger on table "public"."comps" to "authenticated";

grant truncate on table "public"."comps" to "authenticated";

grant update on table "public"."comps" to "authenticated";

grant delete on table "public"."comps" to "service_role";

grant insert on table "public"."comps" to "service_role";

grant references on table "public"."comps" to "service_role";

grant select on table "public"."comps" to "service_role";

grant trigger on table "public"."comps" to "service_role";

grant truncate on table "public"."comps" to "service_role";

grant update on table "public"."comps" to "service_role";

grant delete on table "public"."stripe_events" to "anon";

grant insert on table "public"."stripe_events" to "anon";

grant references on table "public"."stripe_events" to "anon";

grant select on table "public"."stripe_events" to "anon";

grant trigger on table "public"."stripe_events" to "anon";

grant truncate on table "public"."stripe_events" to "anon";

grant update on table "public"."stripe_events" to "anon";

grant delete on table "public"."stripe_events" to "authenticated";

grant insert on table "public"."stripe_events" to "authenticated";

grant references on table "public"."stripe_events" to "authenticated";

grant select on table "public"."stripe_events" to "authenticated";

grant trigger on table "public"."stripe_events" to "authenticated";

grant truncate on table "public"."stripe_events" to "authenticated";

grant update on table "public"."stripe_events" to "authenticated";

grant delete on table "public"."stripe_events" to "service_role";

grant insert on table "public"."stripe_events" to "service_role";

grant references on table "public"."stripe_events" to "service_role";

grant select on table "public"."stripe_events" to "service_role";

grant trigger on table "public"."stripe_events" to "service_role";

grant truncate on table "public"."stripe_events" to "service_role";

grant update on table "public"."stripe_events" to "service_role";


