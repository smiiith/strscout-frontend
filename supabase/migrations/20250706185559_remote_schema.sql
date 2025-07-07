create extension if not exists "pg_net" with schema "public" version '0.8.0';

create table "public"."comp_basis" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "profile_id" uuid not null,
    "address" text not null,
    "latitude" text not null,
    "longitude" text not null,
    "scan_id" text not null,
    "status" text not null default 'pending'::text
);


create table "public"."comps" (
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


create table "public"."stripe_events" (
    "id" uuid not null default gen_random_uuid(),
    "stripe_event_id" text not null,
    "event_type" text not null,
    "processed" boolean default false,
    "created_at" timestamp without time zone default now(),
    "data" jsonb
);


alter table "public"."profiles" add column "stripe_customer_id" text;

alter table "public"."profiles" add column "stripe_subscription_id" text;

alter table "public"."profiles" add column "subscription_status" text;

alter table "public"."profiles" alter column "plan_id" set default '5cb61d3c-306e-4518-8ec1-fa59585ce27c'::uuid;

alter table "public"."str_properties" add column "is_comp" boolean default false;

CREATE UNIQUE INDEX comp_basis_pkey ON public.comp_basis USING btree (id);

CREATE UNIQUE INDEX comp_basis_scan_id_key ON public.comp_basis USING btree (scan_id);

CREATE UNIQUE INDEX comps_pkey ON public.comps USING btree (id);

CREATE UNIQUE INDEX stripe_events_pkey ON public.stripe_events USING btree (id);

CREATE UNIQUE INDEX stripe_events_stripe_event_id_key ON public.stripe_events USING btree (stripe_event_id);

alter table "public"."comp_basis" add constraint "comp_basis_pkey" PRIMARY KEY using index "comp_basis_pkey";

alter table "public"."comps" add constraint "comps_pkey" PRIMARY KEY using index "comps_pkey";

alter table "public"."stripe_events" add constraint "stripe_events_pkey" PRIMARY KEY using index "stripe_events_pkey";

alter table "public"."comp_basis" add constraint "comp_basis_scan_id_key" UNIQUE using index "comp_basis_scan_id_key";

alter table "public"."comps" add constraint "comps_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profiles(id) not valid;

alter table "public"."comps" validate constraint "comps_profile_id_fkey";

alter table "public"."comps" add constraint "comps_scan_id_fkey" FOREIGN KEY (scan_id) REFERENCES comp_basis(scan_id) not valid;

alter table "public"."comps" validate constraint "comps_scan_id_fkey";

alter table "public"."stripe_events" add constraint "stripe_events_stripe_event_id_key" UNIQUE using index "stripe_events_stripe_event_id_key";

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


