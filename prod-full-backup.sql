--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8
-- Dumped by pg_dump version 17.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: auth; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA auth;


ALTER SCHEMA auth OWNER TO supabase_admin;

--
-- Name: extensions; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA extensions;


ALTER SCHEMA extensions OWNER TO postgres;

--
-- Name: graphql; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql;


ALTER SCHEMA graphql OWNER TO supabase_admin;

--
-- Name: graphql_public; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql_public;


ALTER SCHEMA graphql_public OWNER TO supabase_admin;

--
-- Name: pg_net; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;


--
-- Name: EXTENSION pg_net; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_net IS 'Async HTTP';


--
-- Name: pgbouncer; Type: SCHEMA; Schema: -; Owner: pgbouncer
--

CREATE SCHEMA pgbouncer;


ALTER SCHEMA pgbouncer OWNER TO pgbouncer;

--
-- Name: realtime; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA realtime;


ALTER SCHEMA realtime OWNER TO supabase_admin;

--
-- Name: storage; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA storage;


ALTER SCHEMA storage OWNER TO supabase_admin;

--
-- Name: vault; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA vault;


ALTER SCHEMA vault OWNER TO supabase_admin;

--
-- Name: pg_graphql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_graphql WITH SCHEMA graphql;


--
-- Name: EXTENSION pg_graphql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_graphql IS 'pg_graphql: GraphQL support';


--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA extensions;


--
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: pgjwt; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgjwt WITH SCHEMA extensions;


--
-- Name: EXTENSION pgjwt; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgjwt IS 'JSON Web Token API for Postgresql';


--
-- Name: supabase_vault; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS supabase_vault WITH SCHEMA vault;


--
-- Name: EXTENSION supabase_vault; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION supabase_vault IS 'Supabase Vault Extension';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: aal_level; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.aal_level AS ENUM (
    'aal1',
    'aal2',
    'aal3'
);


ALTER TYPE auth.aal_level OWNER TO supabase_auth_admin;

--
-- Name: code_challenge_method; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.code_challenge_method AS ENUM (
    's256',
    'plain'
);


ALTER TYPE auth.code_challenge_method OWNER TO supabase_auth_admin;

--
-- Name: factor_status; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_status AS ENUM (
    'unverified',
    'verified'
);


ALTER TYPE auth.factor_status OWNER TO supabase_auth_admin;

--
-- Name: factor_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_type AS ENUM (
    'totp',
    'webauthn',
    'phone'
);


ALTER TYPE auth.factor_type OWNER TO supabase_auth_admin;

--
-- Name: oauth_registration_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_registration_type AS ENUM (
    'dynamic',
    'manual'
);


ALTER TYPE auth.oauth_registration_type OWNER TO supabase_auth_admin;

--
-- Name: one_time_token_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.one_time_token_type AS ENUM (
    'confirmation_token',
    'reauthentication_token',
    'recovery_token',
    'email_change_token_new',
    'email_change_token_current',
    'phone_change_token'
);


ALTER TYPE auth.one_time_token_type OWNER TO supabase_auth_admin;

--
-- Name: action; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.action AS ENUM (
    'INSERT',
    'UPDATE',
    'DELETE',
    'TRUNCATE',
    'ERROR'
);


ALTER TYPE realtime.action OWNER TO supabase_admin;

--
-- Name: equality_op; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.equality_op AS ENUM (
    'eq',
    'neq',
    'lt',
    'lte',
    'gt',
    'gte',
    'in'
);


ALTER TYPE realtime.equality_op OWNER TO supabase_admin;

--
-- Name: user_defined_filter; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.user_defined_filter AS (
	column_name text,
	op realtime.equality_op,
	value text
);


ALTER TYPE realtime.user_defined_filter OWNER TO supabase_admin;

--
-- Name: wal_column; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_column AS (
	name text,
	type_name text,
	type_oid oid,
	value jsonb,
	is_pkey boolean,
	is_selectable boolean
);


ALTER TYPE realtime.wal_column OWNER TO supabase_admin;

--
-- Name: wal_rls; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_rls AS (
	wal jsonb,
	is_rls_enabled boolean,
	subscription_ids uuid[],
	errors text[]
);


ALTER TYPE realtime.wal_rls OWNER TO supabase_admin;

--
-- Name: buckettype; Type: TYPE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TYPE storage.buckettype AS ENUM (
    'STANDARD',
    'ANALYTICS'
);


ALTER TYPE storage.buckettype OWNER TO supabase_storage_admin;

--
-- Name: email(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.email() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.email', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'email')
  )::text
$$;


ALTER FUNCTION auth.email() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION email(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.email() IS 'Deprecated. Use auth.jwt() -> ''email'' instead.';


--
-- Name: jwt(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.jwt() RETURNS jsonb
    LANGUAGE sql STABLE
    AS $$
  select 
    coalesce(
        nullif(current_setting('request.jwt.claim', true), ''),
        nullif(current_setting('request.jwt.claims', true), '')
    )::jsonb
$$;


ALTER FUNCTION auth.jwt() OWNER TO supabase_auth_admin;

--
-- Name: role(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.role() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.role', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role')
  )::text
$$;


ALTER FUNCTION auth.role() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION role(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.role() IS 'Deprecated. Use auth.jwt() -> ''role'' instead.';


--
-- Name: uid(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
  )::uuid
$$;


ALTER FUNCTION auth.uid() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION uid(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.uid() IS 'Deprecated. Use auth.jwt() -> ''sub'' instead.';


--
-- Name: grant_pg_cron_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_cron_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_cron'
  )
  THEN
    grant usage on schema cron to postgres with grant option;

    alter default privileges in schema cron grant all on tables to postgres with grant option;
    alter default privileges in schema cron grant all on functions to postgres with grant option;
    alter default privileges in schema cron grant all on sequences to postgres with grant option;

    alter default privileges for user supabase_admin in schema cron grant all
        on sequences to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on tables to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on functions to postgres with grant option;

    grant all privileges on all tables in schema cron to postgres with grant option;
    revoke all on table cron.job from postgres;
    grant select on table cron.job to postgres with grant option;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_cron_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_cron_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_cron_access() IS 'Grants access to pg_cron';


--
-- Name: grant_pg_graphql_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_graphql_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
DECLARE
    func_is_graphql_resolve bool;
BEGIN
    func_is_graphql_resolve = (
        SELECT n.proname = 'resolve'
        FROM pg_event_trigger_ddl_commands() AS ev
        LEFT JOIN pg_catalog.pg_proc AS n
        ON ev.objid = n.oid
    );

    IF func_is_graphql_resolve
    THEN
        -- Update public wrapper to pass all arguments through to the pg_graphql resolve func
        DROP FUNCTION IF EXISTS graphql_public.graphql;
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language sql
        as $$
            select graphql.resolve(
                query := query,
                variables := coalesce(variables, '{}'),
                "operationName" := "operationName",
                extensions := extensions
            );
        $$;

        -- This hook executes when `graphql.resolve` is created. That is not necessarily the last
        -- function in the extension so we need to grant permissions on existing entities AND
        -- update default permissions to any others that are created after `graphql.resolve`
        grant usage on schema graphql to postgres, anon, authenticated, service_role;
        grant select on all tables in schema graphql to postgres, anon, authenticated, service_role;
        grant execute on all functions in schema graphql to postgres, anon, authenticated, service_role;
        grant all on all sequences in schema graphql to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on tables to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on functions to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on sequences to postgres, anon, authenticated, service_role;

        -- Allow postgres role to allow granting usage on graphql and graphql_public schemas to custom roles
        grant usage on schema graphql_public to postgres with grant option;
        grant usage on schema graphql to postgres with grant option;
    END IF;

END;
$_$;


ALTER FUNCTION extensions.grant_pg_graphql_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_graphql_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_graphql_access() IS 'Grants access to pg_graphql';


--
-- Name: grant_pg_net_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_net_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_net'
  )
  THEN
    IF NOT EXISTS (
      SELECT 1
      FROM pg_roles
      WHERE rolname = 'supabase_functions_admin'
    )
    THEN
      CREATE USER supabase_functions_admin NOINHERIT CREATEROLE LOGIN NOREPLICATION;
    END IF;

    GRANT USAGE ON SCHEMA net TO supabase_functions_admin, postgres, anon, authenticated, service_role;

    IF EXISTS (
      SELECT FROM pg_extension
      WHERE extname = 'pg_net'
      -- all versions in use on existing projects as of 2025-02-20
      -- version 0.12.0 onwards don't need these applied
      AND extversion IN ('0.2', '0.6', '0.7', '0.7.1', '0.8', '0.10.0', '0.11.0')
    ) THEN
      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;

      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;

      REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
      REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;

      GRANT EXECUTE ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
      GRANT EXECUTE ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
    END IF;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_net_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_net_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_net_access() IS 'Grants access to pg_net';


--
-- Name: pgrst_ddl_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_ddl_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN SELECT * FROM pg_event_trigger_ddl_commands()
  LOOP
    IF cmd.command_tag IN (
      'CREATE SCHEMA', 'ALTER SCHEMA'
    , 'CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO', 'ALTER TABLE'
    , 'CREATE FOREIGN TABLE', 'ALTER FOREIGN TABLE'
    , 'CREATE VIEW', 'ALTER VIEW'
    , 'CREATE MATERIALIZED VIEW', 'ALTER MATERIALIZED VIEW'
    , 'CREATE FUNCTION', 'ALTER FUNCTION'
    , 'CREATE TRIGGER'
    , 'CREATE TYPE', 'ALTER TYPE'
    , 'CREATE RULE'
    , 'COMMENT'
    )
    -- don't notify in case of CREATE TEMP table or other objects created on pg_temp
    AND cmd.schema_name is distinct from 'pg_temp'
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_ddl_watch() OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_drop_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  obj record;
BEGIN
  FOR obj IN SELECT * FROM pg_event_trigger_dropped_objects()
  LOOP
    IF obj.object_type IN (
      'schema'
    , 'table'
    , 'foreign table'
    , 'view'
    , 'materialized view'
    , 'function'
    , 'trigger'
    , 'type'
    , 'rule'
    )
    AND obj.is_temporary IS false -- no pg_temp objects
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_drop_watch() OWNER TO supabase_admin;

--
-- Name: set_graphql_placeholder(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.set_graphql_placeholder() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
    DECLARE
    graphql_is_dropped bool;
    BEGIN
    graphql_is_dropped = (
        SELECT ev.schema_name = 'graphql_public'
        FROM pg_event_trigger_dropped_objects() AS ev
        WHERE ev.schema_name = 'graphql_public'
    );

    IF graphql_is_dropped
    THEN
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language plpgsql
        as $$
            DECLARE
                server_version float;
            BEGIN
                server_version = (SELECT (SPLIT_PART((select version()), ' ', 2))::float);

                IF server_version >= 14 THEN
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql extension is not enabled.'
                            )
                        )
                    );
                ELSE
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'
                            )
                        )
                    );
                END IF;
            END;
        $$;
    END IF;

    END;
$_$;


ALTER FUNCTION extensions.set_graphql_placeholder() OWNER TO supabase_admin;

--
-- Name: FUNCTION set_graphql_placeholder(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.set_graphql_placeholder() IS 'Reintroduces placeholder function for graphql_public.graphql';


--
-- Name: get_auth(text); Type: FUNCTION; Schema: pgbouncer; Owner: supabase_admin
--

CREATE FUNCTION pgbouncer.get_auth(p_usename text) RETURNS TABLE(username text, password text)
    LANGUAGE plpgsql SECURITY DEFINER
    AS $_$
begin
    raise debug 'PgBouncer auth request: %', p_usename;

    return query
    select 
        rolname::text, 
        case when rolvaliduntil < now() 
            then null 
            else rolpassword::text 
        end 
    from pg_authid 
    where rolname=$1 and rolcanlogin;
end;
$_$;


ALTER FUNCTION pgbouncer.get_auth(p_usename text) OWNER TO supabase_admin;

--
-- Name: handle_new_user(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.handle_new_user() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$;


ALTER FUNCTION public.handle_new_user() OWNER TO postgres;

--
-- Name: apply_rls(jsonb, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer DEFAULT (1024 * 1024)) RETURNS SETOF realtime.wal_rls
    LANGUAGE plpgsql
    AS $$
declare
-- Regclass of the table e.g. public.notes
entity_ regclass = (quote_ident(wal ->> 'schema') || '.' || quote_ident(wal ->> 'table'))::regclass;

-- I, U, D, T: insert, update ...
action realtime.action = (
    case wal ->> 'action'
        when 'I' then 'INSERT'
        when 'U' then 'UPDATE'
        when 'D' then 'DELETE'
        else 'ERROR'
    end
);

-- Is row level security enabled for the table
is_rls_enabled bool = relrowsecurity from pg_class where oid = entity_;

subscriptions realtime.subscription[] = array_agg(subs)
    from
        realtime.subscription subs
    where
        subs.entity = entity_;

-- Subscription vars
roles regrole[] = array_agg(distinct us.claims_role::text)
    from
        unnest(subscriptions) us;

working_role regrole;
claimed_role regrole;
claims jsonb;

subscription_id uuid;
subscription_has_access bool;
visible_to_subscription_ids uuid[] = '{}';

-- structured info for wal's columns
columns realtime.wal_column[];
-- previous identity values for update/delete
old_columns realtime.wal_column[];

error_record_exceeds_max_size boolean = octet_length(wal::text) > max_record_bytes;

-- Primary jsonb output for record
output jsonb;

begin
perform set_config('role', null, true);

columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'columns') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

old_columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'identity') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

for working_role in select * from unnest(roles) loop

    -- Update `is_selectable` for columns and old_columns
    columns =
        array_agg(
            (
                c.name,
                c.type_name,
                c.type_oid,
                c.value,
                c.is_pkey,
                pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
            )::realtime.wal_column
        )
        from
            unnest(columns) c;

    old_columns =
            array_agg(
                (
                    c.name,
                    c.type_name,
                    c.type_oid,
                    c.value,
                    c.is_pkey,
                    pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
                )::realtime.wal_column
            )
            from
                unnest(old_columns) c;

    if action <> 'DELETE' and count(1) = 0 from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            -- subscriptions is already filtered by entity
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 400: Bad Request, no primary key']
        )::realtime.wal_rls;

    -- The claims role does not have SELECT permission to the primary key of entity
    elsif action <> 'DELETE' and sum(c.is_selectable::int) <> count(1) from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 401: Unauthorized']
        )::realtime.wal_rls;

    else
        output = jsonb_build_object(
            'schema', wal ->> 'schema',
            'table', wal ->> 'table',
            'type', action,
            'commit_timestamp', to_char(
                ((wal ->> 'timestamp')::timestamptz at time zone 'utc'),
                'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
            ),
            'columns', (
                select
                    jsonb_agg(
                        jsonb_build_object(
                            'name', pa.attname,
                            'type', pt.typname
                        )
                        order by pa.attnum asc
                    )
                from
                    pg_attribute pa
                    join pg_type pt
                        on pa.atttypid = pt.oid
                where
                    attrelid = entity_
                    and attnum > 0
                    and pg_catalog.has_column_privilege(working_role, entity_, pa.attname, 'SELECT')
            )
        )
        -- Add "record" key for insert and update
        || case
            when action in ('INSERT', 'UPDATE') then
                jsonb_build_object(
                    'record',
                    (
                        select
                            jsonb_object_agg(
                                -- if unchanged toast, get column name and value from old record
                                coalesce((c).name, (oc).name),
                                case
                                    when (c).name is null then (oc).value
                                    else (c).value
                                end
                            )
                        from
                            unnest(columns) c
                            full outer join unnest(old_columns) oc
                                on (c).name = (oc).name
                        where
                            coalesce((c).is_selectable, (oc).is_selectable)
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                    )
                )
            else '{}'::jsonb
        end
        -- Add "old_record" key for update and delete
        || case
            when action = 'UPDATE' then
                jsonb_build_object(
                        'old_record',
                        (
                            select jsonb_object_agg((c).name, (c).value)
                            from unnest(old_columns) c
                            where
                                (c).is_selectable
                                and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                        )
                    )
            when action = 'DELETE' then
                jsonb_build_object(
                    'old_record',
                    (
                        select jsonb_object_agg((c).name, (c).value)
                        from unnest(old_columns) c
                        where
                            (c).is_selectable
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                            and ( not is_rls_enabled or (c).is_pkey ) -- if RLS enabled, we can't secure deletes so filter to pkey
                    )
                )
            else '{}'::jsonb
        end;

        -- Create the prepared statement
        if is_rls_enabled and action <> 'DELETE' then
            if (select 1 from pg_prepared_statements where name = 'walrus_rls_stmt' limit 1) > 0 then
                deallocate walrus_rls_stmt;
            end if;
            execute realtime.build_prepared_statement_sql('walrus_rls_stmt', entity_, columns);
        end if;

        visible_to_subscription_ids = '{}';

        for subscription_id, claims in (
                select
                    subs.subscription_id,
                    subs.claims
                from
                    unnest(subscriptions) subs
                where
                    subs.entity = entity_
                    and subs.claims_role = working_role
                    and (
                        realtime.is_visible_through_filters(columns, subs.filters)
                        or (
                          action = 'DELETE'
                          and realtime.is_visible_through_filters(old_columns, subs.filters)
                        )
                    )
        ) loop

            if not is_rls_enabled or action = 'DELETE' then
                visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
            else
                -- Check if RLS allows the role to see the record
                perform
                    -- Trim leading and trailing quotes from working_role because set_config
                    -- doesn't recognize the role as valid if they are included
                    set_config('role', trim(both '"' from working_role::text), true),
                    set_config('request.jwt.claims', claims::text, true);

                execute 'execute walrus_rls_stmt' into subscription_has_access;

                if subscription_has_access then
                    visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
                end if;
            end if;
        end loop;

        perform set_config('role', null, true);

        return next (
            output,
            is_rls_enabled,
            visible_to_subscription_ids,
            case
                when error_record_exceeds_max_size then array['Error 413: Payload Too Large']
                else '{}'
            end
        )::realtime.wal_rls;

    end if;
end loop;

perform set_config('role', null, true);
end;
$$;


ALTER FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) OWNER TO supabase_admin;

--
-- Name: broadcast_changes(text, text, text, text, text, record, record, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text DEFAULT 'ROW'::text) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    -- Declare a variable to hold the JSONB representation of the row
    row_data jsonb := '{}'::jsonb;
BEGIN
    IF level = 'STATEMENT' THEN
        RAISE EXCEPTION 'function can only be triggered for each row, not for each statement';
    END IF;
    -- Check the operation type and handle accordingly
    IF operation = 'INSERT' OR operation = 'UPDATE' OR operation = 'DELETE' THEN
        row_data := jsonb_build_object('old_record', OLD, 'record', NEW, 'operation', operation, 'table', table_name, 'schema', table_schema);
        PERFORM realtime.send (row_data, event_name, topic_name);
    ELSE
        RAISE EXCEPTION 'Unexpected operation type: %', operation;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Failed to process the row: %', SQLERRM;
END;

$$;


ALTER FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) OWNER TO supabase_admin;

--
-- Name: build_prepared_statement_sql(text, regclass, realtime.wal_column[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) RETURNS text
    LANGUAGE sql
    AS $$
      /*
      Builds a sql string that, if executed, creates a prepared statement to
      tests retrive a row from *entity* by its primary key columns.
      Example
          select realtime.build_prepared_statement_sql('public.notes', '{"id"}'::text[], '{"bigint"}'::text[])
      */
          select
      'prepare ' || prepared_statement_name || ' as
          select
              exists(
                  select
                      1
                  from
                      ' || entity || '
                  where
                      ' || string_agg(quote_ident(pkc.name) || '=' || quote_nullable(pkc.value #>> '{}') , ' and ') || '
              )'
          from
              unnest(columns) pkc
          where
              pkc.is_pkey
          group by
              entity
      $$;


ALTER FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) OWNER TO supabase_admin;

--
-- Name: cast(text, regtype); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime."cast"(val text, type_ regtype) RETURNS jsonb
    LANGUAGE plpgsql IMMUTABLE
    AS $$
    declare
      res jsonb;
    begin
      execute format('select to_jsonb(%L::'|| type_::text || ')', val)  into res;
      return res;
    end
    $$;


ALTER FUNCTION realtime."cast"(val text, type_ regtype) OWNER TO supabase_admin;

--
-- Name: check_equality_op(realtime.equality_op, regtype, text, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) RETURNS boolean
    LANGUAGE plpgsql IMMUTABLE
    AS $$
      /*
      Casts *val_1* and *val_2* as type *type_* and check the *op* condition for truthiness
      */
      declare
          op_symbol text = (
              case
                  when op = 'eq' then '='
                  when op = 'neq' then '!='
                  when op = 'lt' then '<'
                  when op = 'lte' then '<='
                  when op = 'gt' then '>'
                  when op = 'gte' then '>='
                  when op = 'in' then '= any'
                  else 'UNKNOWN OP'
              end
          );
          res boolean;
      begin
          execute format(
              'select %L::'|| type_::text || ' ' || op_symbol
              || ' ( %L::'
              || (
                  case
                      when op = 'in' then type_::text || '[]'
                      else type_::text end
              )
              || ')', val_1, val_2) into res;
          return res;
      end;
      $$;


ALTER FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) OWNER TO supabase_admin;

--
-- Name: is_visible_through_filters(realtime.wal_column[], realtime.user_defined_filter[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) RETURNS boolean
    LANGUAGE sql IMMUTABLE
    AS $_$
    /*
    Should the record be visible (true) or filtered out (false) after *filters* are applied
    */
        select
            -- Default to allowed when no filters present
            $2 is null -- no filters. this should not happen because subscriptions has a default
            or array_length($2, 1) is null -- array length of an empty array is null
            or bool_and(
                coalesce(
                    realtime.check_equality_op(
                        op:=f.op,
                        type_:=coalesce(
                            col.type_oid::regtype, -- null when wal2json version <= 2.4
                            col.type_name::regtype
                        ),
                        -- cast jsonb to text
                        val_1:=col.value #>> '{}',
                        val_2:=f.value
                    ),
                    false -- if null, filter does not match
                )
            )
        from
            unnest(filters) f
            join unnest(columns) col
                on f.column_name = col.name;
    $_$;


ALTER FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) OWNER TO supabase_admin;

--
-- Name: list_changes(name, name, integer, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) RETURNS SETOF realtime.wal_rls
    LANGUAGE sql
    SET log_min_messages TO 'fatal'
    AS $$
      with pub as (
        select
          concat_ws(
            ',',
            case when bool_or(pubinsert) then 'insert' else null end,
            case when bool_or(pubupdate) then 'update' else null end,
            case when bool_or(pubdelete) then 'delete' else null end
          ) as w2j_actions,
          coalesce(
            string_agg(
              realtime.quote_wal2json(format('%I.%I', schemaname, tablename)::regclass),
              ','
            ) filter (where ppt.tablename is not null and ppt.tablename not like '% %'),
            ''
          ) w2j_add_tables
        from
          pg_publication pp
          left join pg_publication_tables ppt
            on pp.pubname = ppt.pubname
        where
          pp.pubname = publication
        group by
          pp.pubname
        limit 1
      ),
      w2j as (
        select
          x.*, pub.w2j_add_tables
        from
          pub,
          pg_logical_slot_get_changes(
            slot_name, null, max_changes,
            'include-pk', 'true',
            'include-transaction', 'false',
            'include-timestamp', 'true',
            'include-type-oids', 'true',
            'format-version', '2',
            'actions', pub.w2j_actions,
            'add-tables', pub.w2j_add_tables
          ) x
      )
      select
        xyz.wal,
        xyz.is_rls_enabled,
        xyz.subscription_ids,
        xyz.errors
      from
        w2j,
        realtime.apply_rls(
          wal := w2j.data::jsonb,
          max_record_bytes := max_record_bytes
        ) xyz(wal, is_rls_enabled, subscription_ids, errors)
      where
        w2j.w2j_add_tables <> ''
        and xyz.subscription_ids[1] is not null
    $$;


ALTER FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) OWNER TO supabase_admin;

--
-- Name: quote_wal2json(regclass); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.quote_wal2json(entity regclass) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
      select
        (
          select string_agg('' || ch,'')
          from unnest(string_to_array(nsp.nspname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
        )
        || '.'
        || (
          select string_agg('' || ch,'')
          from unnest(string_to_array(pc.relname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
          )
      from
        pg_class pc
        join pg_namespace nsp
          on pc.relnamespace = nsp.oid
      where
        pc.oid = entity
    $$;


ALTER FUNCTION realtime.quote_wal2json(entity regclass) OWNER TO supabase_admin;

--
-- Name: send(jsonb, text, text, boolean); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean DEFAULT true) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  BEGIN
    -- Set the topic configuration
    EXECUTE format('SET LOCAL realtime.topic TO %L', topic);

    -- Attempt to insert the message
    INSERT INTO realtime.messages (payload, event, topic, private, extension)
    VALUES (payload, event, topic, private, 'broadcast');
  EXCEPTION
    WHEN OTHERS THEN
      -- Capture and notify the error
      RAISE WARNING 'ErrorSendingBroadcastMessage: %', SQLERRM;
  END;
END;
$$;


ALTER FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) OWNER TO supabase_admin;

--
-- Name: subscription_check_filters(); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.subscription_check_filters() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    /*
    Validates that the user defined filters for a subscription:
    - refer to valid columns that the claimed role may access
    - values are coercable to the correct column type
    */
    declare
        col_names text[] = coalesce(
                array_agg(c.column_name order by c.ordinal_position),
                '{}'::text[]
            )
            from
                information_schema.columns c
            where
                format('%I.%I', c.table_schema, c.table_name)::regclass = new.entity
                and pg_catalog.has_column_privilege(
                    (new.claims ->> 'role'),
                    format('%I.%I', c.table_schema, c.table_name)::regclass,
                    c.column_name,
                    'SELECT'
                );
        filter realtime.user_defined_filter;
        col_type regtype;

        in_val jsonb;
    begin
        for filter in select * from unnest(new.filters) loop
            -- Filtered column is valid
            if not filter.column_name = any(col_names) then
                raise exception 'invalid column for filter %', filter.column_name;
            end if;

            -- Type is sanitized and safe for string interpolation
            col_type = (
                select atttypid::regtype
                from pg_catalog.pg_attribute
                where attrelid = new.entity
                      and attname = filter.column_name
            );
            if col_type is null then
                raise exception 'failed to lookup type for column %', filter.column_name;
            end if;

            -- Set maximum number of entries for in filter
            if filter.op = 'in'::realtime.equality_op then
                in_val = realtime.cast(filter.value, (col_type::text || '[]')::regtype);
                if coalesce(jsonb_array_length(in_val), 0) > 100 then
                    raise exception 'too many values for `in` filter. Maximum 100';
                end if;
            else
                -- raises an exception if value is not coercable to type
                perform realtime.cast(filter.value, col_type);
            end if;

        end loop;

        -- Apply consistent order to filters so the unique constraint on
        -- (subscription_id, entity, filters) can't be tricked by a different filter order
        new.filters = coalesce(
            array_agg(f order by f.column_name, f.op, f.value),
            '{}'
        ) from unnest(new.filters) f;

        return new;
    end;
    $$;


ALTER FUNCTION realtime.subscription_check_filters() OWNER TO supabase_admin;

--
-- Name: to_regrole(text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.to_regrole(role_name text) RETURNS regrole
    LANGUAGE sql IMMUTABLE
    AS $$ select role_name::regrole $$;


ALTER FUNCTION realtime.to_regrole(role_name text) OWNER TO supabase_admin;

--
-- Name: topic(); Type: FUNCTION; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE FUNCTION realtime.topic() RETURNS text
    LANGUAGE sql STABLE
    AS $$
select nullif(current_setting('realtime.topic', true), '')::text;
$$;


ALTER FUNCTION realtime.topic() OWNER TO supabase_realtime_admin;

--
-- Name: add_prefixes(text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.add_prefixes(_bucket_id text, _name text) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    prefixes text[];
BEGIN
    prefixes := "storage"."get_prefixes"("_name");

    IF array_length(prefixes, 1) > 0 THEN
        INSERT INTO storage.prefixes (name, bucket_id)
        SELECT UNNEST(prefixes) as name, "_bucket_id" ON CONFLICT DO NOTHING;
    END IF;
END;
$$;


ALTER FUNCTION storage.add_prefixes(_bucket_id text, _name text) OWNER TO supabase_storage_admin;

--
-- Name: can_insert_object(text, text, uuid, jsonb); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  INSERT INTO "storage"."objects" ("bucket_id", "name", "owner", "metadata") VALUES (bucketid, name, owner, metadata);
  -- hack to rollback the successful insert
  RAISE sqlstate 'PT200' using
  message = 'ROLLBACK',
  detail = 'rollback successful insert';
END
$$;


ALTER FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) OWNER TO supabase_storage_admin;

--
-- Name: delete_prefix(text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.delete_prefix(_bucket_id text, _name text) RETURNS boolean
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
    -- Check if we can delete the prefix
    IF EXISTS(
        SELECT FROM "storage"."prefixes"
        WHERE "prefixes"."bucket_id" = "_bucket_id"
          AND level = "storage"."get_level"("_name") + 1
          AND "prefixes"."name" COLLATE "C" LIKE "_name" || '/%'
        LIMIT 1
    )
    OR EXISTS(
        SELECT FROM "storage"."objects"
        WHERE "objects"."bucket_id" = "_bucket_id"
          AND "storage"."get_level"("objects"."name") = "storage"."get_level"("_name") + 1
          AND "objects"."name" COLLATE "C" LIKE "_name" || '/%'
        LIMIT 1
    ) THEN
    -- There are sub-objects, skip deletion
    RETURN false;
    ELSE
        DELETE FROM "storage"."prefixes"
        WHERE "prefixes"."bucket_id" = "_bucket_id"
          AND level = "storage"."get_level"("_name")
          AND "prefixes"."name" = "_name";
        RETURN true;
    END IF;
END;
$$;


ALTER FUNCTION storage.delete_prefix(_bucket_id text, _name text) OWNER TO supabase_storage_admin;

--
-- Name: delete_prefix_hierarchy_trigger(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.delete_prefix_hierarchy_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    prefix text;
BEGIN
    prefix := "storage"."get_prefix"(OLD."name");

    IF coalesce(prefix, '') != '' THEN
        PERFORM "storage"."delete_prefix"(OLD."bucket_id", prefix);
    END IF;

    RETURN OLD;
END;
$$;


ALTER FUNCTION storage.delete_prefix_hierarchy_trigger() OWNER TO supabase_storage_admin;

--
-- Name: enforce_bucket_name_length(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.enforce_bucket_name_length() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
    if length(new.name) > 100 then
        raise exception 'bucket name "%" is too long (% characters). Max is 100.', new.name, length(new.name);
    end if;
    return new;
end;
$$;


ALTER FUNCTION storage.enforce_bucket_name_length() OWNER TO supabase_storage_admin;

--
-- Name: extension(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.extension(name text) RETURNS text
    LANGUAGE plpgsql IMMUTABLE
    AS $$
DECLARE
    _parts text[];
    _filename text;
BEGIN
    SELECT string_to_array(name, '/') INTO _parts;
    SELECT _parts[array_length(_parts,1)] INTO _filename;
    RETURN reverse(split_part(reverse(_filename), '.', 1));
END
$$;


ALTER FUNCTION storage.extension(name text) OWNER TO supabase_storage_admin;

--
-- Name: filename(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.filename(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[array_length(_parts,1)];
END
$$;


ALTER FUNCTION storage.filename(name text) OWNER TO supabase_storage_admin;

--
-- Name: foldername(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.foldername(name text) RETURNS text[]
    LANGUAGE plpgsql IMMUTABLE
    AS $$
DECLARE
    _parts text[];
BEGIN
    -- Split on "/" to get path segments
    SELECT string_to_array(name, '/') INTO _parts;
    -- Return everything except the last segment
    RETURN _parts[1 : array_length(_parts,1) - 1];
END
$$;


ALTER FUNCTION storage.foldername(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_level(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_level(name text) RETURNS integer
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
SELECT array_length(string_to_array("name", '/'), 1);
$$;


ALTER FUNCTION storage.get_level(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_prefix(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_prefix(name text) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
SELECT
    CASE WHEN strpos("name", '/') > 0 THEN
             regexp_replace("name", '[\/]{1}[^\/]+\/?$', '')
         ELSE
             ''
        END;
$_$;


ALTER FUNCTION storage.get_prefix(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_prefixes(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_prefixes(name text) RETURNS text[]
    LANGUAGE plpgsql IMMUTABLE STRICT
    AS $$
DECLARE
    parts text[];
    prefixes text[];
    prefix text;
BEGIN
    -- Split the name into parts by '/'
    parts := string_to_array("name", '/');
    prefixes := '{}';

    -- Construct the prefixes, stopping one level below the last part
    FOR i IN 1..array_length(parts, 1) - 1 LOOP
            prefix := array_to_string(parts[1:i], '/');
            prefixes := array_append(prefixes, prefix);
    END LOOP;

    RETURN prefixes;
END;
$$;


ALTER FUNCTION storage.get_prefixes(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_size_by_bucket(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_size_by_bucket() RETURNS TABLE(size bigint, bucket_id text)
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    return query
        select sum((metadata->>'size')::bigint) as size, obj.bucket_id
        from "storage".objects as obj
        group by obj.bucket_id;
END
$$;


ALTER FUNCTION storage.get_size_by_bucket() OWNER TO supabase_storage_admin;

--
-- Name: list_multipart_uploads_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, next_key_token text DEFAULT ''::text, next_upload_token text DEFAULT ''::text) RETURNS TABLE(key text, id text, created_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(key COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                        substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1)))
                    ELSE
                        key
                END AS key, id, created_at
            FROM
                storage.s3_multipart_uploads
            WHERE
                bucket_id = $5 AND
                key ILIKE $1 || ''%'' AND
                CASE
                    WHEN $4 != '''' AND $6 = '''' THEN
                        CASE
                            WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                                substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                key COLLATE "C" > $4
                            END
                    ELSE
                        true
                END AND
                CASE
                    WHEN $6 != '''' THEN
                        id COLLATE "C" > $6
                    ELSE
                        true
                    END
            ORDER BY
                key COLLATE "C" ASC, created_at ASC) as e order by key COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_key_token, bucket_id, next_upload_token;
END;
$_$;


ALTER FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text) OWNER TO supabase_storage_admin;

--
-- Name: list_objects_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, start_after text DEFAULT ''::text, next_token text DEFAULT ''::text) RETURNS TABLE(name text, id uuid, metadata jsonb, updated_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(name COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                        substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1)))
                    ELSE
                        name
                END AS name, id, metadata, updated_at
            FROM
                storage.objects
            WHERE
                bucket_id = $5 AND
                name ILIKE $1 || ''%'' AND
                CASE
                    WHEN $6 != '''' THEN
                    name COLLATE "C" > $6
                ELSE true END
                AND CASE
                    WHEN $4 != '''' THEN
                        CASE
                            WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                                substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                name COLLATE "C" > $4
                            END
                    ELSE
                        true
                END
            ORDER BY
                name COLLATE "C" ASC) as e order by name COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_token, bucket_id, start_after;
END;
$_$;


ALTER FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text) OWNER TO supabase_storage_admin;

--
-- Name: objects_insert_prefix_trigger(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.objects_insert_prefix_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    PERFORM "storage"."add_prefixes"(NEW."bucket_id", NEW."name");
    NEW.level := "storage"."get_level"(NEW."name");

    RETURN NEW;
END;
$$;


ALTER FUNCTION storage.objects_insert_prefix_trigger() OWNER TO supabase_storage_admin;

--
-- Name: objects_update_prefix_trigger(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.objects_update_prefix_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    old_prefixes TEXT[];
BEGIN
    -- Ensure this is an update operation and the name has changed
    IF TG_OP = 'UPDATE' AND (NEW."name" <> OLD."name" OR NEW."bucket_id" <> OLD."bucket_id") THEN
        -- Retrieve old prefixes
        old_prefixes := "storage"."get_prefixes"(OLD."name");

        -- Remove old prefixes that are only used by this object
        WITH all_prefixes as (
            SELECT unnest(old_prefixes) as prefix
        ),
        can_delete_prefixes as (
             SELECT prefix
             FROM all_prefixes
             WHERE NOT EXISTS (
                 SELECT 1 FROM "storage"."objects"
                 WHERE "bucket_id" = OLD."bucket_id"
                   AND "name" <> OLD."name"
                   AND "name" LIKE (prefix || '%')
             )
         )
        DELETE FROM "storage"."prefixes" WHERE name IN (SELECT prefix FROM can_delete_prefixes);

        -- Add new prefixes
        PERFORM "storage"."add_prefixes"(NEW."bucket_id", NEW."name");
    END IF;
    -- Set the new level
    NEW."level" := "storage"."get_level"(NEW."name");

    RETURN NEW;
END;
$$;


ALTER FUNCTION storage.objects_update_prefix_trigger() OWNER TO supabase_storage_admin;

--
-- Name: operation(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.operation() RETURNS text
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    RETURN current_setting('storage.operation', true);
END;
$$;


ALTER FUNCTION storage.operation() OWNER TO supabase_storage_admin;

--
-- Name: prefixes_insert_trigger(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.prefixes_insert_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    PERFORM "storage"."add_prefixes"(NEW."bucket_id", NEW."name");
    RETURN NEW;
END;
$$;


ALTER FUNCTION storage.prefixes_insert_trigger() OWNER TO supabase_storage_admin;

--
-- Name: search(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql
    AS $$
declare
    can_bypass_rls BOOLEAN;
begin
    SELECT rolbypassrls
    INTO can_bypass_rls
    FROM pg_roles
    WHERE rolname = coalesce(nullif(current_setting('role', true), 'none'), current_user);

    IF can_bypass_rls THEN
        RETURN QUERY SELECT * FROM storage.search_v1_optimised(prefix, bucketname, limits, levels, offsets, search, sortcolumn, sortorder);
    ELSE
        RETURN QUERY SELECT * FROM storage.search_legacy_v1(prefix, bucketname, limits, levels, offsets, search, sortcolumn, sortorder);
    END IF;
end;
$$;


ALTER FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO supabase_storage_admin;

--
-- Name: search_legacy_v1(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search_legacy_v1(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
declare
    v_order_by text;
    v_sort_order text;
begin
    case
        when sortcolumn = 'name' then
            v_order_by = 'name';
        when sortcolumn = 'updated_at' then
            v_order_by = 'updated_at';
        when sortcolumn = 'created_at' then
            v_order_by = 'created_at';
        when sortcolumn = 'last_accessed_at' then
            v_order_by = 'last_accessed_at';
        else
            v_order_by = 'name';
        end case;

    case
        when sortorder = 'asc' then
            v_sort_order = 'asc';
        when sortorder = 'desc' then
            v_sort_order = 'desc';
        else
            v_sort_order = 'asc';
        end case;

    v_order_by = v_order_by || ' ' || v_sort_order;

    return query execute
        'with folders as (
           select path_tokens[$1] as folder
           from storage.objects
             where objects.name ilike $2 || $3 || ''%''
               and bucket_id = $4
               and array_length(objects.path_tokens, 1) <> $1
           group by folder
           order by folder ' || v_sort_order || '
     )
     (select folder as "name",
            null as id,
            null as updated_at,
            null as created_at,
            null as last_accessed_at,
            null as metadata from folders)
     union all
     (select path_tokens[$1] as "name",
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
     from storage.objects
     where objects.name ilike $2 || $3 || ''%''
       and bucket_id = $4
       and array_length(objects.path_tokens, 1) = $1
     order by ' || v_order_by || ')
     limit $5
     offset $6' using levels, prefix, search, bucketname, limits, offsets;
end;
$_$;


ALTER FUNCTION storage.search_legacy_v1(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO supabase_storage_admin;

--
-- Name: search_v1_optimised(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search_v1_optimised(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
declare
    v_order_by text;
    v_sort_order text;
begin
    case
        when sortcolumn = 'name' then
            v_order_by = 'name';
        when sortcolumn = 'updated_at' then
            v_order_by = 'updated_at';
        when sortcolumn = 'created_at' then
            v_order_by = 'created_at';
        when sortcolumn = 'last_accessed_at' then
            v_order_by = 'last_accessed_at';
        else
            v_order_by = 'name';
        end case;

    case
        when sortorder = 'asc' then
            v_sort_order = 'asc';
        when sortorder = 'desc' then
            v_sort_order = 'desc';
        else
            v_sort_order = 'asc';
        end case;

    v_order_by = v_order_by || ' ' || v_sort_order;

    return query execute
        'with folders as (
           select (string_to_array(name, ''/''))[level] as name
           from storage.prefixes
             where lower(prefixes.name) like lower($2 || $3) || ''%''
               and bucket_id = $4
               and level = $1
           order by name ' || v_sort_order || '
     )
     (select name,
            null as id,
            null as updated_at,
            null as created_at,
            null as last_accessed_at,
            null as metadata from folders)
     union all
     (select path_tokens[level] as "name",
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
     from storage.objects
     where lower(objects.name) like lower($2 || $3) || ''%''
       and bucket_id = $4
       and level = $1
     order by ' || v_order_by || ')
     limit $5
     offset $6' using levels, prefix, search, bucketname, limits, offsets;
end;
$_$;


ALTER FUNCTION storage.search_v1_optimised(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO supabase_storage_admin;

--
-- Name: search_v2(text, text, integer, integer, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search_v2(prefix text, bucket_name text, limits integer DEFAULT 100, levels integer DEFAULT 1, start_after text DEFAULT ''::text) RETURNS TABLE(key text, name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
BEGIN
    RETURN query EXECUTE
        $sql$
        SELECT * FROM (
            (
                SELECT
                    split_part(name, '/', $4) AS key,
                    name || '/' AS name,
                    NULL::uuid AS id,
                    NULL::timestamptz AS updated_at,
                    NULL::timestamptz AS created_at,
                    NULL::jsonb AS metadata
                FROM storage.prefixes
                WHERE name COLLATE "C" LIKE $1 || '%'
                AND bucket_id = $2
                AND level = $4
                AND name COLLATE "C" > $5
                ORDER BY prefixes.name COLLATE "C" LIMIT $3
            )
            UNION ALL
            (SELECT split_part(name, '/', $4) AS key,
                name,
                id,
                updated_at,
                created_at,
                metadata
            FROM storage.objects
            WHERE name COLLATE "C" LIKE $1 || '%'
                AND bucket_id = $2
                AND level = $4
                AND name COLLATE "C" > $5
            ORDER BY name COLLATE "C" LIMIT $3)
        ) obj
        ORDER BY name COLLATE "C" LIMIT $3;
        $sql$
        USING prefix, bucket_name, limits, levels, start_after;
END;
$_$;


ALTER FUNCTION storage.search_v2(prefix text, bucket_name text, limits integer, levels integer, start_after text) OWNER TO supabase_storage_admin;

--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW; 
END;
$$;


ALTER FUNCTION storage.update_updated_at_column() OWNER TO supabase_storage_admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: audit_log_entries; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.audit_log_entries (
    instance_id uuid,
    id uuid NOT NULL,
    payload json,
    created_at timestamp with time zone,
    ip_address character varying(64) DEFAULT ''::character varying NOT NULL
);


ALTER TABLE auth.audit_log_entries OWNER TO supabase_auth_admin;

--
-- Name: TABLE audit_log_entries; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.audit_log_entries IS 'Auth: Audit trail for user actions.';


--
-- Name: flow_state; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.flow_state (
    id uuid NOT NULL,
    user_id uuid,
    auth_code text NOT NULL,
    code_challenge_method auth.code_challenge_method NOT NULL,
    code_challenge text NOT NULL,
    provider_type text NOT NULL,
    provider_access_token text,
    provider_refresh_token text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    authentication_method text NOT NULL,
    auth_code_issued_at timestamp with time zone
);


ALTER TABLE auth.flow_state OWNER TO supabase_auth_admin;

--
-- Name: TABLE flow_state; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.flow_state IS 'stores metadata for pkce logins';


--
-- Name: identities; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.identities (
    provider_id text NOT NULL,
    user_id uuid NOT NULL,
    identity_data jsonb NOT NULL,
    provider text NOT NULL,
    last_sign_in_at timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    email text GENERATED ALWAYS AS (lower((identity_data ->> 'email'::text))) STORED,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE auth.identities OWNER TO supabase_auth_admin;

--
-- Name: TABLE identities; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.identities IS 'Auth: Stores identities associated to a user.';


--
-- Name: COLUMN identities.email; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.identities.email IS 'Auth: Email is a generated column that references the optional email property in the identity_data';


--
-- Name: instances; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.instances (
    id uuid NOT NULL,
    uuid uuid,
    raw_base_config text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE auth.instances OWNER TO supabase_auth_admin;

--
-- Name: TABLE instances; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.instances IS 'Auth: Manages users across multiple sites.';


--
-- Name: mfa_amr_claims; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_amr_claims (
    session_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    authentication_method text NOT NULL,
    id uuid NOT NULL
);


ALTER TABLE auth.mfa_amr_claims OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_amr_claims; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_amr_claims IS 'auth: stores authenticator method reference claims for multi factor authentication';


--
-- Name: mfa_challenges; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_challenges (
    id uuid NOT NULL,
    factor_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    verified_at timestamp with time zone,
    ip_address inet NOT NULL,
    otp_code text,
    web_authn_session_data jsonb
);


ALTER TABLE auth.mfa_challenges OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_challenges; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_challenges IS 'auth: stores metadata about challenge requests made';


--
-- Name: mfa_factors; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_factors (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    friendly_name text,
    factor_type auth.factor_type NOT NULL,
    status auth.factor_status NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    secret text,
    phone text,
    last_challenged_at timestamp with time zone,
    web_authn_credential jsonb,
    web_authn_aaguid uuid
);


ALTER TABLE auth.mfa_factors OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_factors; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_factors IS 'auth: stores metadata about factors';


--
-- Name: oauth_clients; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_clients (
    id uuid NOT NULL,
    client_id text NOT NULL,
    client_secret_hash text NOT NULL,
    registration_type auth.oauth_registration_type NOT NULL,
    redirect_uris text NOT NULL,
    grant_types text NOT NULL,
    client_name text,
    client_uri text,
    logo_uri text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    CONSTRAINT oauth_clients_client_name_length CHECK ((char_length(client_name) <= 1024)),
    CONSTRAINT oauth_clients_client_uri_length CHECK ((char_length(client_uri) <= 2048)),
    CONSTRAINT oauth_clients_logo_uri_length CHECK ((char_length(logo_uri) <= 2048))
);


ALTER TABLE auth.oauth_clients OWNER TO supabase_auth_admin;

--
-- Name: one_time_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.one_time_tokens (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    token_type auth.one_time_token_type NOT NULL,
    token_hash text NOT NULL,
    relates_to text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT one_time_tokens_token_hash_check CHECK ((char_length(token_hash) > 0))
);


ALTER TABLE auth.one_time_tokens OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.refresh_tokens (
    instance_id uuid,
    id bigint NOT NULL,
    token character varying(255),
    user_id character varying(255),
    revoked boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    parent character varying(255),
    session_id uuid
);


ALTER TABLE auth.refresh_tokens OWNER TO supabase_auth_admin;

--
-- Name: TABLE refresh_tokens; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.refresh_tokens IS 'Auth: Store of tokens used to refresh JWT tokens once they expire.';


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: auth; Owner: supabase_auth_admin
--

CREATE SEQUENCE auth.refresh_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE auth.refresh_tokens_id_seq OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: supabase_auth_admin
--

ALTER SEQUENCE auth.refresh_tokens_id_seq OWNED BY auth.refresh_tokens.id;


--
-- Name: saml_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_providers (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    entity_id text NOT NULL,
    metadata_xml text NOT NULL,
    metadata_url text,
    attribute_mapping jsonb,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    name_id_format text,
    CONSTRAINT "entity_id not empty" CHECK ((char_length(entity_id) > 0)),
    CONSTRAINT "metadata_url not empty" CHECK (((metadata_url = NULL::text) OR (char_length(metadata_url) > 0))),
    CONSTRAINT "metadata_xml not empty" CHECK ((char_length(metadata_xml) > 0))
);


ALTER TABLE auth.saml_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_providers IS 'Auth: Manages SAML Identity Provider connections.';


--
-- Name: saml_relay_states; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_relay_states (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    request_id text NOT NULL,
    for_email text,
    redirect_to text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    flow_state_id uuid,
    CONSTRAINT "request_id not empty" CHECK ((char_length(request_id) > 0))
);


ALTER TABLE auth.saml_relay_states OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_relay_states; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_relay_states IS 'Auth: Contains SAML Relay State information for each Service Provider initiated login.';


--
-- Name: schema_migrations; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.schema_migrations (
    version character varying(255) NOT NULL
);


ALTER TABLE auth.schema_migrations OWNER TO supabase_auth_admin;

--
-- Name: TABLE schema_migrations; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.schema_migrations IS 'Auth: Manages updates to the auth system.';


--
-- Name: sessions; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sessions (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    factor_id uuid,
    aal auth.aal_level,
    not_after timestamp with time zone,
    refreshed_at timestamp without time zone,
    user_agent text,
    ip inet,
    tag text
);


ALTER TABLE auth.sessions OWNER TO supabase_auth_admin;

--
-- Name: TABLE sessions; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sessions IS 'Auth: Stores session data associated to a user.';


--
-- Name: COLUMN sessions.not_after; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sessions.not_after IS 'Auth: Not after is a nullable column that contains a timestamp after which the session should be regarded as expired.';


--
-- Name: sso_domains; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_domains (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    domain text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "domain not empty" CHECK ((char_length(domain) > 0))
);


ALTER TABLE auth.sso_domains OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_domains; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_domains IS 'Auth: Manages SSO email address domain mapping to an SSO Identity Provider.';


--
-- Name: sso_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_providers (
    id uuid NOT NULL,
    resource_id text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    disabled boolean,
    CONSTRAINT "resource_id not empty" CHECK (((resource_id = NULL::text) OR (char_length(resource_id) > 0)))
);


ALTER TABLE auth.sso_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_providers IS 'Auth: Manages SSO identity provider information; see saml_providers for SAML.';


--
-- Name: COLUMN sso_providers.resource_id; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sso_providers.resource_id IS 'Auth: Uniquely identifies a SSO provider according to a user-chosen resource ID (case insensitive), useful in infrastructure as code.';


--
-- Name: users; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.users (
    instance_id uuid,
    id uuid NOT NULL,
    aud character varying(255),
    role character varying(255),
    email character varying(255),
    encrypted_password character varying(255),
    email_confirmed_at timestamp with time zone,
    invited_at timestamp with time zone,
    confirmation_token character varying(255),
    confirmation_sent_at timestamp with time zone,
    recovery_token character varying(255),
    recovery_sent_at timestamp with time zone,
    email_change_token_new character varying(255),
    email_change character varying(255),
    email_change_sent_at timestamp with time zone,
    last_sign_in_at timestamp with time zone,
    raw_app_meta_data jsonb,
    raw_user_meta_data jsonb,
    is_super_admin boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    phone text DEFAULT NULL::character varying,
    phone_confirmed_at timestamp with time zone,
    phone_change text DEFAULT ''::character varying,
    phone_change_token character varying(255) DEFAULT ''::character varying,
    phone_change_sent_at timestamp with time zone,
    confirmed_at timestamp with time zone GENERATED ALWAYS AS (LEAST(email_confirmed_at, phone_confirmed_at)) STORED,
    email_change_token_current character varying(255) DEFAULT ''::character varying,
    email_change_confirm_status smallint DEFAULT 0,
    banned_until timestamp with time zone,
    reauthentication_token character varying(255) DEFAULT ''::character varying,
    reauthentication_sent_at timestamp with time zone,
    is_sso_user boolean DEFAULT false NOT NULL,
    deleted_at timestamp with time zone,
    is_anonymous boolean DEFAULT false NOT NULL,
    CONSTRAINT users_email_change_confirm_status_check CHECK (((email_change_confirm_status >= 0) AND (email_change_confirm_status <= 2)))
);


ALTER TABLE auth.users OWNER TO supabase_auth_admin;

--
-- Name: TABLE users; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.users IS 'Auth: Stores user login data within a secure schema.';


--
-- Name: COLUMN users.is_sso_user; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.users.is_sso_user IS 'Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails.';


--
-- Name: features; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.features (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    name text,
    description text,
    key text NOT NULL
);


ALTER TABLE public.features OWNER TO postgres;

--
-- Name: listing_feedback_usage; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.listing_feedback_usage (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    profile_id uuid NOT NULL,
    property_id uuid NOT NULL
);


ALTER TABLE public.listing_feedback_usage OWNER TO postgres;

--
-- Name: listings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.listings (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    profile_id uuid,
    listed_on text,
    external_listing_id text,
    property_id uuid
);


ALTER TABLE public.listings OWNER TO postgres;

--
-- Name: llm_usage; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.llm_usage (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    run_id text,
    llm_name text,
    completion_tokens smallint,
    prompt_tokens integer,
    total_tokens integer,
    cost text,
    name text
);


ALTER TABLE public.llm_usage OWNER TO postgres;

--
-- Name: plans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plans (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    name text,
    description text,
    active boolean DEFAULT true,
    key text NOT NULL
);


ALTER TABLE public.plans OWNER TO postgres;

--
-- Name: plans_features_map; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plans_features_map (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    plan_id uuid,
    feature_id uuid
);


ALTER TABLE public.plans_features_map OWNER TO postgres;

--
-- Name: profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profiles (
    id uuid NOT NULL,
    updated_at timestamp with time zone,
    username text,
    full_name text,
    avatar_url text,
    website text,
    CONSTRAINT username_length CHECK ((char_length(username) >= 3))
);


ALTER TABLE public.profiles OWNER TO postgres;

--
-- Name: properties; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.properties (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
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


ALTER TABLE public.properties OWNER TO postgres;

--
-- Name: property_ratings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.property_ratings (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    property_id uuid NOT NULL,
    ratings jsonb NOT NULL,
    modified_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.property_ratings OWNER TO postgres;

--
-- Name: scan_mismatches; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.scan_mismatches (
    id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    profile_id uuid,
    property_id uuid,
    mismatch_date timestamp with time zone DEFAULT now(),
    message text,
    scan_id bigint
);


ALTER TABLE public.scan_mismatches OWNER TO postgres;

--
-- Name: scan_mismatches_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.scan_mismatches ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.scan_mismatches_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: scans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.scans (
    id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    profile_id uuid,
    property_id uuid,
    has_mismatch boolean DEFAULT false
);


ALTER TABLE public.scans OWNER TO postgres;

--
-- Name: scans_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.scans ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.scans_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: str_properties; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.str_properties (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
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


ALTER TABLE public.str_properties OWNER TO postgres;

--
-- Name: str_property_ratings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.str_property_ratings (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
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


ALTER TABLE public.str_property_ratings OWNER TO postgres;

--
-- Name: messages; Type: TABLE; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE TABLE realtime.messages (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
)
PARTITION BY RANGE (inserted_at);


ALTER TABLE realtime.messages OWNER TO supabase_realtime_admin;

--
-- Name: schema_migrations; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


ALTER TABLE realtime.schema_migrations OWNER TO supabase_admin;

--
-- Name: subscription; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.subscription (
    id bigint NOT NULL,
    subscription_id uuid NOT NULL,
    entity regclass NOT NULL,
    filters realtime.user_defined_filter[] DEFAULT '{}'::realtime.user_defined_filter[] NOT NULL,
    claims jsonb NOT NULL,
    claims_role regrole GENERATED ALWAYS AS (realtime.to_regrole((claims ->> 'role'::text))) STORED NOT NULL,
    created_at timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


ALTER TABLE realtime.subscription OWNER TO supabase_admin;

--
-- Name: subscription_id_seq; Type: SEQUENCE; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE realtime.subscription ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME realtime.subscription_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: buckets; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets (
    id text NOT NULL,
    name text NOT NULL,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    public boolean DEFAULT false,
    avif_autodetection boolean DEFAULT false,
    file_size_limit bigint,
    allowed_mime_types text[],
    owner_id text,
    type storage.buckettype DEFAULT 'STANDARD'::storage.buckettype NOT NULL
);


ALTER TABLE storage.buckets OWNER TO supabase_storage_admin;

--
-- Name: COLUMN buckets.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.buckets.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: buckets_analytics; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets_analytics (
    id text NOT NULL,
    type storage.buckettype DEFAULT 'ANALYTICS'::storage.buckettype NOT NULL,
    format text DEFAULT 'ICEBERG'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.buckets_analytics OWNER TO supabase_storage_admin;

--
-- Name: migrations; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.migrations (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    hash character varying(40) NOT NULL,
    executed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE storage.migrations OWNER TO supabase_storage_admin;

--
-- Name: objects; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.objects (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    bucket_id text,
    name text,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    last_accessed_at timestamp with time zone DEFAULT now(),
    metadata jsonb,
    path_tokens text[] GENERATED ALWAYS AS (string_to_array(name, '/'::text)) STORED,
    version text,
    owner_id text,
    user_metadata jsonb,
    level integer
);


ALTER TABLE storage.objects OWNER TO supabase_storage_admin;

--
-- Name: COLUMN objects.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.objects.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: prefixes; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.prefixes (
    bucket_id text NOT NULL,
    name text NOT NULL COLLATE pg_catalog."C",
    level integer GENERATED ALWAYS AS (storage.get_level(name)) STORED NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE storage.prefixes OWNER TO supabase_storage_admin;

--
-- Name: s3_multipart_uploads; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads (
    id text NOT NULL,
    in_progress_size bigint DEFAULT 0 NOT NULL,
    upload_signature text NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    version text NOT NULL,
    owner_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_metadata jsonb
);


ALTER TABLE storage.s3_multipart_uploads OWNER TO supabase_storage_admin;

--
-- Name: s3_multipart_uploads_parts; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads_parts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    upload_id text NOT NULL,
    size bigint DEFAULT 0 NOT NULL,
    part_number integer NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    etag text NOT NULL,
    owner_id text,
    version text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.s3_multipart_uploads_parts OWNER TO supabase_storage_admin;

--
-- Name: refresh_tokens id; Type: DEFAULT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('auth.refresh_tokens_id_seq'::regclass);


--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) FROM stdin;
00000000-0000-0000-0000-000000000000	32f8e107-ea43-45cc-85a5-888f559d6191	{"action":"user_confirmation_requested","actor_id":"68a16476-3bdb-40ea-90f4-c308b391c259","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-04-25 04:33:53.829303+00	
00000000-0000-0000-0000-000000000000	073dfdc6-046c-477c-9761-afe25c215b92	{"action":"user_modified","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"user","traits":{"user_email":"smiiith@gmail.com","user_id":"68a16476-3bdb-40ea-90f4-c308b391c259","user_phone":""}}	2025-04-25 04:33:55.757538+00	
00000000-0000-0000-0000-000000000000	6825ed1d-d131-4736-9794-1b3f4e8f7727	{"action":"user_signedup","actor_id":"68a16476-3bdb-40ea-90f4-c308b391c259","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"team"}	2025-04-25 04:34:53.763722+00	
00000000-0000-0000-0000-000000000000	2f03f3f3-fd6d-43a3-8269-6577b54c6309	{"action":"login","actor_id":"68a16476-3bdb-40ea-90f4-c308b391c259","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-25 04:42:05.133922+00	
00000000-0000-0000-0000-000000000000	88ea4238-e051-402b-8dd8-1e448ebba83b	{"action":"token_refreshed","actor_id":"68a16476-3bdb-40ea-90f4-c308b391c259","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 05:43:22.17386+00	
00000000-0000-0000-0000-000000000000	791e0877-1c74-4b42-9326-c61cf0e63667	{"action":"token_revoked","actor_id":"68a16476-3bdb-40ea-90f4-c308b391c259","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 05:43:22.176473+00	
00000000-0000-0000-0000-000000000000	79cf22e0-9130-41ec-9f1c-79cbd4f54fa0	{"action":"token_refreshed","actor_id":"68a16476-3bdb-40ea-90f4-c308b391c259","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 16:14:25.179004+00	
00000000-0000-0000-0000-000000000000	fffc752a-42c7-45c9-a0cb-17bb2a5254a6	{"action":"token_revoked","actor_id":"68a16476-3bdb-40ea-90f4-c308b391c259","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 16:14:25.184669+00	
00000000-0000-0000-0000-000000000000	b0238c78-0367-497c-b19c-dc79d19b7190	{"action":"token_refreshed","actor_id":"68a16476-3bdb-40ea-90f4-c308b391c259","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 17:21:57.277307+00	
00000000-0000-0000-0000-000000000000	f713f5c4-ede0-488e-a053-8345496eed6e	{"action":"token_revoked","actor_id":"68a16476-3bdb-40ea-90f4-c308b391c259","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 17:21:57.278098+00	
00000000-0000-0000-0000-000000000000	3a041e79-f3e2-49cd-8ad0-3218116fbd53	{"action":"token_refreshed","actor_id":"68a16476-3bdb-40ea-90f4-c308b391c259","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 20:14:27.744473+00	
00000000-0000-0000-0000-000000000000	d8a19cef-b818-4322-8fbc-61416f2bbbb3	{"action":"token_revoked","actor_id":"68a16476-3bdb-40ea-90f4-c308b391c259","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 20:14:27.745238+00	
00000000-0000-0000-0000-000000000000	44c2a560-f9e1-4452-b579-92d8c6068172	{"action":"token_refreshed","actor_id":"68a16476-3bdb-40ea-90f4-c308b391c259","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 20:14:29.38048+00	
00000000-0000-0000-0000-000000000000	7d7b29f1-d04b-4fae-a3b1-91a53ee11bab	{"action":"token_refreshed","actor_id":"68a16476-3bdb-40ea-90f4-c308b391c259","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 20:14:29.423164+00	
00000000-0000-0000-0000-000000000000	f487dd39-c5d5-45b9-9fb9-5016433f2a53	{"action":"token_refreshed","actor_id":"68a16476-3bdb-40ea-90f4-c308b391c259","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 20:14:30.22792+00	
00000000-0000-0000-0000-000000000000	39071672-b449-4e3e-9407-827b33519372	{"action":"token_refreshed","actor_id":"68a16476-3bdb-40ea-90f4-c308b391c259","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 23:40:25.551296+00	
00000000-0000-0000-0000-000000000000	e8a940fc-d635-4dad-8554-5e9a10c46760	{"action":"token_revoked","actor_id":"68a16476-3bdb-40ea-90f4-c308b391c259","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 23:40:25.552781+00	
00000000-0000-0000-0000-000000000000	9312cdd9-1d21-4cf8-84b6-a33216fdfa43	{"action":"token_refreshed","actor_id":"68a16476-3bdb-40ea-90f4-c308b391c259","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-26 17:03:32.015183+00	
00000000-0000-0000-0000-000000000000	fcda7e7c-da8e-4492-8258-e00c1dac3585	{"action":"token_revoked","actor_id":"68a16476-3bdb-40ea-90f4-c308b391c259","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-26 17:03:32.019436+00	
00000000-0000-0000-0000-000000000000	482f904b-f230-491e-93b5-52f82b9aa52e	{"action":"token_refreshed","actor_id":"68a16476-3bdb-40ea-90f4-c308b391c259","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-26 18:13:13.350363+00	
00000000-0000-0000-0000-000000000000	8644c0ad-d991-4bfc-8b16-7d906c501215	{"action":"token_revoked","actor_id":"68a16476-3bdb-40ea-90f4-c308b391c259","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-26 18:13:13.353975+00	
00000000-0000-0000-0000-000000000000	e44bac91-66d5-46a0-ac8a-6453ef59156a	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"smiiith@gmail.com","user_id":"68a16476-3bdb-40ea-90f4-c308b391c259","user_phone":""}}	2025-04-26 18:55:41.211316+00	
00000000-0000-0000-0000-000000000000	d7b19abf-91e0-4085-81f2-48abbbc7f85c	{"action":"user_confirmation_requested","actor_id":"9ac57477-e774-46cb-a6a1-f5c919540240","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-04-26 18:56:16.604187+00	
00000000-0000-0000-0000-000000000000	1d3e5828-0cdb-468f-9115-d55244016f04	{"action":"user_modified","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"user","traits":{"user_email":"smiiith@gmail.com","user_id":"9ac57477-e774-46cb-a6a1-f5c919540240","user_phone":""}}	2025-04-26 18:56:18.266514+00	
00000000-0000-0000-0000-000000000000	8c2cfe0c-781c-4358-8d47-f494595e8853	{"action":"user_signedup","actor_id":"9ac57477-e774-46cb-a6a1-f5c919540240","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"team"}	2025-04-26 18:56:37.112214+00	
00000000-0000-0000-0000-000000000000	b1fda0c1-cf00-43aa-8fed-1f56ebcf2d5a	{"action":"login","actor_id":"9ac57477-e774-46cb-a6a1-f5c919540240","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-26 18:56:53.758877+00	
00000000-0000-0000-0000-000000000000	42febfa4-9b5e-4398-862e-37b6a89af9ce	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"smiiith@gmail.com","user_id":"9ac57477-e774-46cb-a6a1-f5c919540240","user_phone":""}}	2025-04-26 19:25:42.242869+00	
00000000-0000-0000-0000-000000000000	896d12f8-9422-4f7e-b83a-e7507090674e	{"action":"user_confirmation_requested","actor_id":"00045f36-09ab-4733-a579-ce5bda77e7ec","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-04-26 19:26:15.619299+00	
00000000-0000-0000-0000-000000000000	3dff4ff8-cf6e-4d75-bb6b-875a5173c5b7	{"action":"user_modified","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"user","traits":{"user_email":"smiiith@gmail.com","user_id":"00045f36-09ab-4733-a579-ce5bda77e7ec","user_phone":""}}	2025-04-26 19:26:17.077858+00	
00000000-0000-0000-0000-000000000000	e1ca2704-3783-44b2-9957-4cf1ba6992fc	{"action":"user_signedup","actor_id":"00045f36-09ab-4733-a579-ce5bda77e7ec","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"team"}	2025-04-26 19:26:32.452654+00	
00000000-0000-0000-0000-000000000000	7d14ae74-5bac-4006-9825-772e06a7b6fb	{"action":"login","actor_id":"00045f36-09ab-4733-a579-ce5bda77e7ec","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-26 19:26:45.458516+00	
00000000-0000-0000-0000-000000000000	29e851e1-dc15-4a1f-83bd-007831d2c119	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"smiiith@gmail.com","user_id":"00045f36-09ab-4733-a579-ce5bda77e7ec","user_phone":""}}	2025-04-26 19:28:31.302422+00	
00000000-0000-0000-0000-000000000000	72e29834-1376-4809-91b6-95a277edb5cc	{"action":"user_confirmation_requested","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-04-26 19:55:28.837412+00	
00000000-0000-0000-0000-000000000000	709bde07-3b4a-4ffb-9634-5d08f8dfbb47	{"action":"user_modified","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"user","traits":{"user_email":"smiiith@gmail.com","user_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","user_phone":""}}	2025-04-26 19:55:30.30836+00	
00000000-0000-0000-0000-000000000000	4cdd0462-20b0-43cc-b107-aaa0718adadb	{"action":"user_signedup","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"team"}	2025-04-26 19:56:07.702043+00	
00000000-0000-0000-0000-000000000000	175ebb19-c107-460d-bd51-58d536a2d0ee	{"action":"login","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-26 19:57:20.468377+00	
00000000-0000-0000-0000-000000000000	478732c5-e917-4f5d-8792-f55044f3733d	{"action":"logout","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-04-26 19:59:05.665447+00	
00000000-0000-0000-0000-000000000000	5770101d-c395-4feb-996d-b88373423bcd	{"action":"user_confirmation_requested","actor_id":"2d28824e-7da2-4f94-86c8-c169fbb17f14","actor_username":"smiiith+2@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-04-26 20:03:31.13078+00	
00000000-0000-0000-0000-000000000000	202a010d-0664-4a92-9ee2-5214efaecde9	{"action":"user_modified","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"user","traits":{"user_email":"smiiith+2@gmail.com","user_id":"2d28824e-7da2-4f94-86c8-c169fbb17f14","user_phone":""}}	2025-04-26 20:03:33.222168+00	
00000000-0000-0000-0000-000000000000	855a887d-e807-48ae-b481-55c7d70cc039	{"action":"user_signedup","actor_id":"2d28824e-7da2-4f94-86c8-c169fbb17f14","actor_username":"smiiith+2@gmail.com","actor_via_sso":false,"log_type":"team"}	2025-04-26 20:04:31.858973+00	
00000000-0000-0000-0000-000000000000	c30e8503-6906-4dc7-ae0f-e09815e004d8	{"action":"login","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-26 20:04:43.664221+00	
00000000-0000-0000-0000-000000000000	37b5157f-f1bb-42ba-8abb-964474c1fb8e	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-26 23:18:18.175393+00	
00000000-0000-0000-0000-000000000000	09e14db1-3599-4e13-8edd-4a9fe5de2275	{"action":"token_revoked","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-26 23:18:18.177123+00	
00000000-0000-0000-0000-000000000000	1787f9a5-bf83-4ddd-bbac-fc30cf2bfc5a	{"action":"user_confirmation_requested","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-04-27 04:27:02.833992+00	
00000000-0000-0000-0000-000000000000	2613e6fa-fa96-498c-b211-26f35cba2e0a	{"action":"user_modified","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"user","traits":{"user_email":"rick@rickbays.com","user_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","user_phone":""}}	2025-04-27 04:27:04.361024+00	
00000000-0000-0000-0000-000000000000	8ecb58d0-361e-401d-b7c1-1ffd069d1ee7	{"action":"user_signedup","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"team"}	2025-04-27 04:27:24.792007+00	
00000000-0000-0000-0000-000000000000	56860aed-e37b-4ae4-b8e0-1794ca9cc263	{"action":"login","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-27 04:27:35.763723+00	
00000000-0000-0000-0000-000000000000	d34c17c1-78b4-4b28-bb68-fbef4b8acefb	{"action":"login","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-27 04:34:20.230644+00	
00000000-0000-0000-0000-000000000000	682cd7c5-3fc7-473d-993c-886ace19b2e5	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-04-27 14:27:14.733541+00	
00000000-0000-0000-0000-000000000000	81ba55bf-a68c-4c8e-8696-eb6c98c3ebb4	{"action":"token_revoked","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-04-27 14:27:14.738117+00	
00000000-0000-0000-0000-000000000000	d02bb1bf-4e56-4dba-ab09-f6b8fb6f6561	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-04-27 14:27:16.184643+00	
00000000-0000-0000-0000-000000000000	d3d06e17-19bd-4900-9f8c-a1f55184599e	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-04-27 14:27:19.477984+00	
00000000-0000-0000-0000-000000000000	64f57f00-3b67-47e0-b24f-d992d1b89d3d	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-04-27 14:27:19.900413+00	
00000000-0000-0000-0000-000000000000	606c655b-146b-42de-a0cc-b31403ecc15d	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-04-27 14:27:19.958892+00	
00000000-0000-0000-0000-000000000000	b5e58008-c915-4d04-befa-b2b796101b14	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-04-27 14:27:31.416698+00	
00000000-0000-0000-0000-000000000000	40f750bf-6335-457f-8213-7a91c7f69f07	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-04-27 14:27:31.798211+00	
00000000-0000-0000-0000-000000000000	49e71079-f972-4b7f-b231-2c089356ec1e	{"action":"login","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-27 14:27:31.899697+00	
00000000-0000-0000-0000-000000000000	bdad3b0d-3ec1-47d7-afd6-266192bb475d	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-27 17:04:14.360129+00	
00000000-0000-0000-0000-000000000000	6f12565a-9cbd-4966-b00b-6ad9eaeb2f69	{"action":"token_revoked","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-27 17:04:14.360928+00	
00000000-0000-0000-0000-000000000000	525c1c74-1e03-4164-be01-f13a0421223b	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-27 17:04:15.904998+00	
00000000-0000-0000-0000-000000000000	0e0184f1-69e2-4dd5-a160-d60b081fd555	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-04-27 17:36:33.660273+00	
00000000-0000-0000-0000-000000000000	9823f8af-93a6-415c-ac91-d035c37d535a	{"action":"token_revoked","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-04-27 17:36:33.661902+00	
00000000-0000-0000-0000-000000000000	6dbaa116-adb0-4fcd-83d6-b7ca15c55811	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-04-27 17:36:34.148823+00	
00000000-0000-0000-0000-000000000000	30583d22-740f-4177-9fb6-2ad094e8a5a0	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-04-27 17:36:37.075949+00	
00000000-0000-0000-0000-000000000000	ef6c8722-de94-494b-a4b7-3428fd363a68	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-04-27 17:36:37.479333+00	
00000000-0000-0000-0000-000000000000	d8595502-3e1f-4e81-9b81-d6eb5d360661	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-04-27 17:36:37.495587+00	
00000000-0000-0000-0000-000000000000	1efabad5-339d-4827-aea8-d6e99ee914c4	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-04-27 17:36:47.791406+00	
00000000-0000-0000-0000-000000000000	763e1048-fe2d-467d-ab12-0805db0006c7	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-04-27 17:36:48.251706+00	
00000000-0000-0000-0000-000000000000	886a6b4a-e2af-4942-92bf-6071c13c2d75	{"action":"login","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-27 17:36:48.337025+00	
00000000-0000-0000-0000-000000000000	16a84722-0bf2-49e0-b082-08dabcc470f8	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-27 18:02:35.613955+00	
00000000-0000-0000-0000-000000000000	88587aa2-1162-430b-b712-e6719dab9f7b	{"action":"token_revoked","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-27 18:02:35.61952+00	
00000000-0000-0000-0000-000000000000	aaa82bef-09fd-4b27-845a-b780b55e6acc	{"action":"logout","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-04-27 18:03:56.069647+00	
00000000-0000-0000-0000-000000000000	da0b9e32-ced7-4278-9cb7-f942e4b352b4	{"action":"login","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-27 18:04:06.224108+00	
00000000-0000-0000-0000-000000000000	ee7d126e-fef5-4271-9f37-a4fbeaa55128	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-27 19:04:27.107508+00	
00000000-0000-0000-0000-000000000000	c453407b-639b-42f9-afc8-78e07d57d021	{"action":"token_revoked","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-27 19:04:27.110333+00	
00000000-0000-0000-0000-000000000000	604657a5-64f8-486a-9d83-784b6da8a4b5	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-27 20:32:55.322516+00	
00000000-0000-0000-0000-000000000000	c0ac8c9e-cc8b-41f5-ab39-53934e8b2b3b	{"action":"token_revoked","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-27 20:32:55.324055+00	
00000000-0000-0000-0000-000000000000	5b2dc979-f9a4-4282-8cc8-335bb0ceca0a	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-04-27 20:39:31.083471+00	
00000000-0000-0000-0000-000000000000	15bdb951-2114-414e-8dbd-e2de9216f9b8	{"action":"token_revoked","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-04-27 20:39:31.085174+00	
00000000-0000-0000-0000-000000000000	d64d05ef-5e48-4a97-bf54-aa709446fe8d	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-04-27 20:39:31.754149+00	
00000000-0000-0000-0000-000000000000	34640f01-ebef-4be0-adde-678583ca043d	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-04-27 20:39:31.764205+00	
00000000-0000-0000-0000-000000000000	2684cda5-6c93-4823-9f89-1ff7d95d4f13	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-04-27 20:39:32.779049+00	
00000000-0000-0000-0000-000000000000	52c023c5-5eb3-4f7b-826a-3694c70d30c9	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-27 21:31:18.258934+00	
00000000-0000-0000-0000-000000000000	0b3336a8-1000-45fa-948d-cdf07373de40	{"action":"token_revoked","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-27 21:31:18.260435+00	
00000000-0000-0000-0000-000000000000	e93c5d0f-6a9e-4201-81c6-3e60f02b5f26	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-27 23:37:33.655233+00	
00000000-0000-0000-0000-000000000000	da2be460-3582-4258-90c9-93751898c435	{"action":"token_revoked","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-27 23:37:33.65893+00	
00000000-0000-0000-0000-000000000000	3d1c4cd0-703a-4332-b887-e1d47c4d22e3	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-27 23:37:34.335901+00	
00000000-0000-0000-0000-000000000000	df6f6388-d737-438d-aaa7-f6d37f218298	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-27 23:37:34.990056+00	
00000000-0000-0000-0000-000000000000	c6cbf947-64e3-4c91-8cf2-e96ef1f9679a	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-27 23:37:35.006167+00	
00000000-0000-0000-0000-000000000000	d62302a8-aa6d-440b-87eb-2a537ebb4faa	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-27 23:37:41.890217+00	
00000000-0000-0000-0000-000000000000	dc909584-998b-4e14-866a-968b7cf3cf32	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-27 23:37:42.404829+00	
00000000-0000-0000-0000-000000000000	6fe08190-e8e5-4bff-82b1-37f87ff7003b	{"action":"login","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-27 23:37:57.186419+00	
00000000-0000-0000-0000-000000000000	ff149e50-1d77-4300-beb0-d18e6588cb06	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-28 00:42:18.567162+00	
00000000-0000-0000-0000-000000000000	a586a28d-3aa3-477f-9188-9d0e251ef803	{"action":"token_revoked","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-28 00:42:18.568659+00	
00000000-0000-0000-0000-000000000000	a81d3b4a-bb39-4ce4-a52d-ab4874f79235	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-28 15:13:31.014134+00	
00000000-0000-0000-0000-000000000000	c086c9b0-8571-4faa-9904-378f1b623103	{"action":"token_revoked","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-28 15:13:31.023218+00	
00000000-0000-0000-0000-000000000000	0b874a5a-3a05-42cb-b159-a7c7220fd91c	{"action":"login","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-29 03:35:49.553785+00	
00000000-0000-0000-0000-000000000000	15a691a2-7120-4530-9155-ec1f23e38008	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-29 04:41:15.870592+00	
00000000-0000-0000-0000-000000000000	97711882-76f3-497e-bcb7-27aa698def44	{"action":"token_revoked","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-29 04:41:15.8715+00	
00000000-0000-0000-0000-000000000000	003ebea4-5074-483f-a708-2500c5339b62	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-30 00:59:50.390232+00	
00000000-0000-0000-0000-000000000000	e0df3b74-b287-4a71-8aff-f3fd7740c597	{"action":"token_revoked","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-30 00:59:50.39711+00	
00000000-0000-0000-0000-000000000000	b722c80f-771a-44b8-8446-5cb56e03d7ee	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-30 00:59:52.1723+00	
00000000-0000-0000-0000-000000000000	22944a45-77cd-4031-8075-9abf272d85bb	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-30 00:59:52.194881+00	
00000000-0000-0000-0000-000000000000	a57574b0-c74b-4be3-899d-3107ae386a56	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-30 00:59:53.22756+00	
00000000-0000-0000-0000-000000000000	8c772c8d-5170-423b-bfa1-567176df196e	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-01 03:31:09.017968+00	
00000000-0000-0000-0000-000000000000	3690312f-b00a-4140-99a3-ee53b32db04b	{"action":"token_revoked","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-01 03:31:09.029884+00	
00000000-0000-0000-0000-000000000000	539c188c-7028-411b-bca5-3a1847c8d9b7	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-01 03:31:10.860465+00	
00000000-0000-0000-0000-000000000000	883ddc16-c537-4d11-8e0e-f7c2dc61b998	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-01 03:31:10.886118+00	
00000000-0000-0000-0000-000000000000	b28c35e7-1045-4ce3-ae13-65c1352d4432	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-01 03:31:11.678778+00	
00000000-0000-0000-0000-000000000000	c06f17c6-8108-4678-bffd-83114e7f5f01	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-01 16:36:11.511591+00	
00000000-0000-0000-0000-000000000000	79dfb3c2-7f06-4d50-9f10-cf52d7dfe69e	{"action":"token_revoked","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-01 16:36:11.532464+00	
00000000-0000-0000-0000-000000000000	698138a9-78f6-4700-bc88-0618f1161778	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-01 21:31:36.384162+00	
00000000-0000-0000-0000-000000000000	8c2d7e95-e659-4920-859c-29d359a47f65	{"action":"token_revoked","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-01 21:31:36.38699+00	
00000000-0000-0000-0000-000000000000	bba4b611-6e39-4eb6-acba-6a4c965b1262	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-01 21:31:38.301719+00	
00000000-0000-0000-0000-000000000000	01f638ae-e27c-4428-8d06-20d070a2c0ad	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-01 21:31:38.327725+00	
00000000-0000-0000-0000-000000000000	86b5bbd8-6480-4402-b100-981efc612a62	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-01 21:31:39.234409+00	
00000000-0000-0000-0000-000000000000	69bb048e-fedd-4068-8c03-4a0b4671e747	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-02 04:21:45.407323+00	
00000000-0000-0000-0000-000000000000	bc553ce8-1508-4c01-a3a1-81bd2d77706f	{"action":"token_revoked","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-02 04:21:45.409997+00	
00000000-0000-0000-0000-000000000000	7fd0ed57-356f-4fc5-af54-05c518fc14fa	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-02 04:21:46.808246+00	
00000000-0000-0000-0000-000000000000	28ebadec-e226-4963-b5b4-3e7a108ac0d4	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-02 04:21:46.838354+00	
00000000-0000-0000-0000-000000000000	ccd4d183-f661-4a0f-85bd-c7dbe5eac395	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-02 04:21:49.596146+00	
00000000-0000-0000-0000-000000000000	6ea73da3-f326-43ca-afd1-45cbefd1e945	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-02 04:21:50.079918+00	
00000000-0000-0000-0000-000000000000	7190f83d-7414-486d-b6bf-3727676ee6cf	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-02 04:21:50.678047+00	
00000000-0000-0000-0000-000000000000	959911b5-76cc-4872-b395-41e2940ff8db	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-02 15:05:43.002118+00	
00000000-0000-0000-0000-000000000000	1de6fed2-be9a-4e77-97fc-6414179d29e3	{"action":"token_revoked","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-02 15:05:43.013713+00	
00000000-0000-0000-0000-000000000000	debe94bf-7dda-468c-8699-01a1a940e25f	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-03 23:56:29.053026+00	
00000000-0000-0000-0000-000000000000	e5ae72ee-b083-4459-a337-6b3b119a0bd1	{"action":"token_revoked","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-03 23:56:29.075275+00	
00000000-0000-0000-0000-000000000000	412b9a6f-2b6c-47b8-b587-40edd4d3944d	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-03 23:56:30.846483+00	
00000000-0000-0000-0000-000000000000	80516b07-6128-4a6f-a830-8ab3f95498bb	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-03 23:56:30.878448+00	
00000000-0000-0000-0000-000000000000	cee702d0-43b2-4324-a3c6-e22be24a718b	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-04 02:27:52.543294+00	
00000000-0000-0000-0000-000000000000	09fc1b79-4d00-4558-a8c4-f073d90ca557	{"action":"token_revoked","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-04 02:27:52.546306+00	
00000000-0000-0000-0000-000000000000	e04d24e1-9d27-422d-b6ba-b8d6c443902d	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-05-04 14:52:36.440354+00	
00000000-0000-0000-0000-000000000000	fd674536-b830-4c46-bc8e-982f298d7681	{"action":"token_revoked","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-05-04 14:52:36.45078+00	
00000000-0000-0000-0000-000000000000	84f0a1ab-244b-419a-8775-f7b679a1b2ea	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-05-04 14:52:37.861315+00	
00000000-0000-0000-0000-000000000000	75f48fe8-eff5-4ad1-a6d4-8a8ab6b0564f	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-05-04 14:52:40.883182+00	
00000000-0000-0000-0000-000000000000	4cdf44e2-513b-4d21-94d0-03365a6c7281	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-05-04 14:52:41.370112+00	
00000000-0000-0000-0000-000000000000	45ec9a95-0dc9-434b-ad49-606b359ea738	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-05-04 14:52:41.419221+00	
00000000-0000-0000-0000-000000000000	e1c2470c-7383-4a09-bda8-16cf5156be2b	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-05-04 14:53:03.087147+00	
00000000-0000-0000-0000-000000000000	7c57a887-4c47-437c-95ad-a9fc42c5593f	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-05-04 14:53:08.098467+00	
00000000-0000-0000-0000-000000000000	bd656109-8de3-46f6-ada7-d8bec7c6c1ca	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-05-04 14:53:08.535771+00	
00000000-0000-0000-0000-000000000000	fc00ee94-8701-41ee-b5c6-8db76cf45e1a	{"action":"user_recovery_requested","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"user"}	2025-05-04 14:53:08.568179+00	
00000000-0000-0000-0000-000000000000	3be51163-1fa4-4f47-8f89-e11ff877f4b2	{"action":"login","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"account"}	2025-05-04 14:53:46.115275+00	
00000000-0000-0000-0000-000000000000	43a19a38-fd95-4d1d-91d2-beb9b064dfca	{"action":"login","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-05-04 14:55:17.191826+00	
00000000-0000-0000-0000-000000000000	73d8134c-bd90-458f-aa68-578ecc53080f	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-05-04 16:47:57.924547+00	
00000000-0000-0000-0000-000000000000	632ed308-378f-491d-a1e6-539a991d2876	{"action":"token_revoked","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-05-04 16:47:57.925914+00	
00000000-0000-0000-0000-000000000000	58d2650c-b39e-424d-a8e8-c9fe64612edd	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-04 17:24:52.031284+00	
00000000-0000-0000-0000-000000000000	c6a43442-48c3-49c0-9ded-b95e7d9cca07	{"action":"token_revoked","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-04 17:24:52.033986+00	
00000000-0000-0000-0000-000000000000	ce131cdc-5ef8-47c7-8abf-799a6c7da502	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-05-04 17:59:30.486511+00	
00000000-0000-0000-0000-000000000000	a378d2cd-a230-43fb-ac95-d5d42c409b4c	{"action":"token_revoked","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-05-04 17:59:30.487312+00	
00000000-0000-0000-0000-000000000000	5d4d5772-1567-4b74-b381-8a33b45f6235	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-05 03:59:27.589498+00	
00000000-0000-0000-0000-000000000000	3548250b-f204-4479-9d45-af3b5535aadb	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-05 03:59:29.014609+00	
00000000-0000-0000-0000-000000000000	e82cac38-c068-499a-8c84-0b9f3e28a582	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-05 03:59:29.041103+00	
00000000-0000-0000-0000-000000000000	4cf7910e-ae0e-4a77-8797-a41f17137008	{"action":"login","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-05-05 15:14:04.415758+00	
00000000-0000-0000-0000-000000000000	2cc763b5-356d-432f-ab6a-6e19748b32ac	{"action":"login","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-05-05 15:14:07.175839+00	
00000000-0000-0000-0000-000000000000	8f133eb0-734d-458b-9637-5349d27c390b	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-05 23:21:08.773254+00	
00000000-0000-0000-0000-000000000000	f3966d8b-e953-4b41-b456-6001564fcb30	{"action":"token_revoked","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-05 23:21:08.790613+00	
00000000-0000-0000-0000-000000000000	f85657bb-8ec7-4341-a442-e575dc0ab9b0	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-05 23:21:10.70546+00	
00000000-0000-0000-0000-000000000000	282b4ecf-22cd-4251-9a37-dec86154d46a	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-05 23:21:10.719683+00	
00000000-0000-0000-0000-000000000000	5d0ea315-5897-4c9d-9373-6297218ad897	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-05 23:21:11.725046+00	
00000000-0000-0000-0000-000000000000	daf9f66c-2f16-4481-a60b-85c835a27a4f	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-06 05:06:43.210832+00	
00000000-0000-0000-0000-000000000000	af1dbb26-fc22-4884-b22a-6c385df05b8e	{"action":"token_revoked","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-06 05:06:43.21435+00	
00000000-0000-0000-0000-000000000000	04f27a35-ed25-42f0-9b4f-87e11df830a4	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-06 05:06:44.66733+00	
00000000-0000-0000-0000-000000000000	d1d2297a-49dc-430b-9d77-97b2a4d7f644	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-06 05:06:44.679528+00	
00000000-0000-0000-0000-000000000000	6303239c-87cc-423b-a058-abbb20463372	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-06 05:06:45.450222+00	
00000000-0000-0000-0000-000000000000	31e3d04b-c413-4078-99bd-2b478378c5e2	{"action":"user_recovery_requested","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-05-06 05:08:11.681359+00	
00000000-0000-0000-0000-000000000000	acc08a40-f361-4461-bfb6-4140d86c9049	{"action":"login","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-05-06 05:13:39.04775+00	
00000000-0000-0000-0000-000000000000	11c70f01-2506-484a-bc93-a8079b01ba75	{"action":"user_recovery_requested","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-05-06 05:17:17.575713+00	
00000000-0000-0000-0000-000000000000	fa6f4a5a-4cdc-4689-8808-d1d5e7358554	{"action":"login","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-05-06 05:17:31.512597+00	
00000000-0000-0000-0000-000000000000	41356ac3-4d57-442b-b7c6-c53fe8a7065e	{"action":"user_updated_password","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-05-06 05:18:21.490617+00	
00000000-0000-0000-0000-000000000000	185c8619-2501-40c6-8dc2-a4b5536798c2	{"action":"user_modified","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-05-06 05:18:21.491207+00	
00000000-0000-0000-0000-000000000000	ab56934a-4c68-4c88-946e-e961c338461a	{"action":"logout","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-05-06 05:18:28.102847+00	
00000000-0000-0000-0000-000000000000	44d36d37-08e6-4b7d-bfbb-f4400c48338b	{"action":"login","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-05-06 05:18:53.510054+00	
00000000-0000-0000-0000-000000000000	7fa8fd80-d64c-4df7-851b-480ddcd257b4	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-05-06 17:23:54.943688+00	
00000000-0000-0000-0000-000000000000	20f1faae-9399-4a8f-9d54-f578abdc0e13	{"action":"token_revoked","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-05-06 17:23:54.955822+00	
00000000-0000-0000-0000-000000000000	e3531ebc-6845-47a7-8b08-0cba6fa0cce8	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-05-06 17:23:56.984777+00	
00000000-0000-0000-0000-000000000000	16d04077-366f-4e44-9eb9-551b5785c9c7	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-05-06 17:23:57.098997+00	
00000000-0000-0000-0000-000000000000	dd1b8b60-9474-4ff1-b2c8-cc5e848bf011	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-05-06 18:52:51.621593+00	
00000000-0000-0000-0000-000000000000	98c6cfa1-6cd6-420a-a73f-67d785ee28c1	{"action":"token_revoked","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-05-06 18:52:51.624373+00	
00000000-0000-0000-0000-000000000000	7f0921e2-0ccd-4deb-99a4-c9164a138447	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-05-06 18:52:53.112359+00	
00000000-0000-0000-0000-000000000000	8ddf5d6f-794c-4310-9268-2371efc55d1c	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-06 20:32:51.742798+00	
00000000-0000-0000-0000-000000000000	b260f7ed-0cd6-436e-a1df-c5bff4ceae48	{"action":"token_revoked","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-06 20:32:51.745236+00	
00000000-0000-0000-0000-000000000000	95db3c65-49e3-4a3c-a059-0dbb9b850474	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-06 20:32:52.337322+00	
00000000-0000-0000-0000-000000000000	6e85ff97-d99e-4662-a942-ab74dcc2a7f8	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-06 20:32:56.944315+00	
00000000-0000-0000-0000-000000000000	5916edd7-18c2-4769-96e6-70b96c085d83	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-06 20:32:57.587815+00	
00000000-0000-0000-0000-000000000000	7c559eed-5522-45ac-939a-b7b602c0b675	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-06 20:33:11.856889+00	
00000000-0000-0000-0000-000000000000	0a340a02-0ca6-4e8b-8a8f-6d154b39bb9d	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-06 20:33:12.466521+00	
00000000-0000-0000-0000-000000000000	c4507474-4dfe-4801-9c59-880a7f034e2f	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-06 20:33:12.494356+00	
00000000-0000-0000-0000-000000000000	f67e1756-3a5d-4692-bad8-66085f7e307b	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-06 20:33:19.555449+00	
00000000-0000-0000-0000-000000000000	ed288370-4afb-4985-9925-7a2584943d5f	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-06 20:34:25.130245+00	
00000000-0000-0000-0000-000000000000	3ff5f00e-4b0c-4796-b974-339ac75708ba	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-06 20:34:25.505729+00	
00000000-0000-0000-0000-000000000000	c6f76f9b-c2b9-4bcd-ac7d-efcdb44dc557	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-06 20:34:25.522253+00	
00000000-0000-0000-0000-000000000000	52a2720e-2b92-4b8e-b3d5-43d92cc70da8	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-07 03:09:28.772846+00	
00000000-0000-0000-0000-000000000000	e1ee2428-2cbf-4086-8db3-01a0f84591f6	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-07 03:09:30.276878+00	
00000000-0000-0000-0000-000000000000	5df1f8ed-c90c-4119-be36-b19c50921cf9	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-07 03:09:30.305059+00	
00000000-0000-0000-0000-000000000000	5a74e80a-0f53-4e0b-a12f-10a068472bf9	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-07 03:09:33.7149+00	
00000000-0000-0000-0000-000000000000	a65c37ab-2b6a-47c3-b526-ffbd86885b1b	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-07 03:09:33.915915+00	
00000000-0000-0000-0000-000000000000	92c29a3b-e115-43f9-bef9-c7242eebd312	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-07 03:09:34.0681+00	
00000000-0000-0000-0000-000000000000	905fc290-0917-4145-9fb0-2e1b65d91d79	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-07 03:10:49.076599+00	
00000000-0000-0000-0000-000000000000	aa9553c2-e814-4b9c-a2d7-527f5eddd9c4	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-07 03:10:49.703349+00	
00000000-0000-0000-0000-000000000000	e3ab1d75-7d04-4c6f-a67b-d46763f41034	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-07 03:10:49.713497+00	
00000000-0000-0000-0000-000000000000	4596f430-d367-4f74-a516-c5b4fab74fa0	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-07 03:20:56.132783+00	
00000000-0000-0000-0000-000000000000	2fab53e7-6d40-470d-8d11-ce735101d7ca	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-07 03:20:57.848871+00	
00000000-0000-0000-0000-000000000000	e8b96e3a-e273-44ab-9b95-2bcc014729ae	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-07 03:20:57.860067+00	
00000000-0000-0000-0000-000000000000	07607b5a-d080-4ef7-8a7f-70ae72554b53	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-07 03:33:24.776894+00	
00000000-0000-0000-0000-000000000000	d6ab2a69-52a1-4ff1-b8f5-aaca505e0a97	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-07 03:33:26.188268+00	
00000000-0000-0000-0000-000000000000	b229a0f4-b830-4f1f-925d-cfdac080c2ea	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-07 03:38:26.444652+00	
00000000-0000-0000-0000-000000000000	e72dee00-63bc-42d9-b7b2-bceb1dc1412e	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-07 03:38:48.416285+00	
00000000-0000-0000-0000-000000000000	d381c93d-1e7d-426e-a431-8fdf33bfa0c0	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-07 03:38:48.994073+00	
00000000-0000-0000-0000-000000000000	09da1efb-3580-4824-8383-3ff925ac63b6	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-07 03:38:49.009796+00	
00000000-0000-0000-0000-000000000000	824ae56a-9695-41e3-be08-00f227c6ae81	{"action":"user_confirmation_requested","actor_id":"7a15b080-dee4-4cfd-b5e3-b82c5ac51ec6","actor_username":"smiiith+16@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-05-07 03:38:49.10578+00	
00000000-0000-0000-0000-000000000000	3a0c6156-a790-4aee-8521-e790fa128fdb	{"action":"user_modified","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"user","traits":{"user_email":"smiiith+16@gmail.com","user_id":"7a15b080-dee4-4cfd-b5e3-b82c5ac51ec6","user_phone":""}}	2025-05-07 03:38:50.645655+00	
00000000-0000-0000-0000-000000000000	245e2b20-99a8-4ce4-be6e-eab2ca9a525b	{"action":"user_confirmation_requested","actor_id":"7a15b080-dee4-4cfd-b5e3-b82c5ac51ec6","actor_username":"smiiith+16@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-05-07 03:45:52.846078+00	
00000000-0000-0000-0000-000000000000	7924514a-a56c-49d6-b58f-9a8c119f9aa8	{"action":"user_modified","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"user","traits":{"user_email":"smiiith+16@gmail.com","user_id":"7a15b080-dee4-4cfd-b5e3-b82c5ac51ec6","user_phone":""}}	2025-05-07 03:45:54.534293+00	
00000000-0000-0000-0000-000000000000	79bb54e2-24e9-4ee4-8ade-cbdc5c545af9	{"action":"user_signedup","actor_id":"7a15b080-dee4-4cfd-b5e3-b82c5ac51ec6","actor_username":"smiiith+16@gmail.com","actor_via_sso":false,"log_type":"team"}	2025-05-07 03:46:09.394516+00	
00000000-0000-0000-0000-000000000000	cdb35bfa-2b29-468b-b91e-f146c07b4cef	{"action":"logout","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-05-07 03:54:05.201588+00	
00000000-0000-0000-0000-000000000000	f096173a-bd00-431d-be8d-26e36696bc1e	{"action":"user_recovery_requested","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-05-07 03:54:12.541361+00	
00000000-0000-0000-0000-000000000000	a21dad38-515b-4400-af56-e818a918a73c	{"action":"login","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-05-07 03:54:24.997779+00	
00000000-0000-0000-0000-000000000000	e9a56d83-c3dd-40f5-a397-46a5a438ab92	{"action":"user_recovery_requested","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-05-07 04:22:55.855991+00	
00000000-0000-0000-0000-000000000000	3d0b55a5-abf5-4b94-97fc-489c0a5feb44	{"action":"login","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-05-07 04:23:18.775834+00	
00000000-0000-0000-0000-000000000000	8f31ccc2-366b-4f23-9c4b-55b666d23eb2	{"action":"user_updated_password","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-05-07 04:23:28.991145+00	
00000000-0000-0000-0000-000000000000	5c1a0caf-18b3-4c67-96eb-17d4288653a2	{"action":"user_modified","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-05-07 04:23:28.991902+00	
00000000-0000-0000-0000-000000000000	dfbd6093-277e-4216-b2b6-098840adb529	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-07 05:46:52.774427+00	
00000000-0000-0000-0000-000000000000	e5218e10-bf3b-4707-a8aa-9e84f3ca0cc5	{"action":"token_revoked","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-07 05:46:52.77789+00	
00000000-0000-0000-0000-000000000000	a2004430-00d9-4bb8-99ad-01ea619a3019	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-07 05:46:54.20915+00	
00000000-0000-0000-0000-000000000000	bfab5bb5-1d4e-4c4f-a51d-311e9d56fca5	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-07 05:46:54.257464+00	
00000000-0000-0000-0000-000000000000	ada8c76b-9221-4e5d-981c-ab4f3efad0fc	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-07 05:46:55.644807+00	
00000000-0000-0000-0000-000000000000	0282edc2-e57e-4c6e-9e70-1cb452fe9ef2	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-07 05:46:58.114431+00	
00000000-0000-0000-0000-000000000000	a6a5df55-ff77-4790-a00a-228a7bbb3db0	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-07 05:46:58.562559+00	
00000000-0000-0000-0000-000000000000	a7f4104d-ee19-45cf-8df2-01c554e35b2d	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-07 05:47:03.261503+00	
00000000-0000-0000-0000-000000000000	162492ec-47b0-4fca-a034-de03c586ed14	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-05-07 14:33:36.717401+00	
00000000-0000-0000-0000-000000000000	6fa29bb4-b373-4ac5-a170-af181b75e419	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-05-07 14:33:38.396922+00	
00000000-0000-0000-0000-000000000000	657803f1-a8d4-47a4-be09-4add595316e2	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-05-07 14:33:44.535379+00	
00000000-0000-0000-0000-000000000000	64bd0862-be1b-4665-b2a4-61866e0f66ad	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-05-07 14:33:45.051431+00	
00000000-0000-0000-0000-000000000000	224a39c5-aa37-4ff8-86d2-df2f441485ee	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-05-07 14:33:45.760837+00	
00000000-0000-0000-0000-000000000000	50dd5641-09b7-4e3c-b95c-fd171ed17ac2	{"action":"logout","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"account"}	2025-05-07 14:33:51.823403+00	
00000000-0000-0000-0000-000000000000	f9c2b03a-1176-4e7e-a629-13e7bfeae8c6	{"action":"user_confirmation_requested","actor_id":"9d09ce16-014e-4e6b-bf29-9569bea73610","actor_username":"unionweb619+8@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-05-07 14:36:02.639901+00	
00000000-0000-0000-0000-000000000000	de465e31-ce40-4955-a7e8-0e8df8a38f1e	{"action":"user_modified","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"user","traits":{"user_email":"unionweb619+8@gmail.com","user_id":"9d09ce16-014e-4e6b-bf29-9569bea73610","user_phone":""}}	2025-05-07 14:36:04.198652+00	
00000000-0000-0000-0000-000000000000	2495c309-df17-4199-a8c8-44d1f8f17191	{"action":"user_signedup","actor_id":"9d09ce16-014e-4e6b-bf29-9569bea73610","actor_username":"unionweb619+8@gmail.com","actor_via_sso":false,"log_type":"team"}	2025-05-07 14:37:23.160395+00	
00000000-0000-0000-0000-000000000000	2028f37b-cd34-4ce0-8dd3-1f40ca46b489	{"action":"login","actor_id":"9d09ce16-014e-4e6b-bf29-9569bea73610","actor_username":"unionweb619+8@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-05-07 14:37:47.771391+00	
00000000-0000-0000-0000-000000000000	2c5c82a1-3b91-4daa-9cc7-dff37a2c8e0d	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-07 15:45:28.784414+00	
00000000-0000-0000-0000-000000000000	a989adc2-4434-43f4-b973-46222847ce35	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-07 15:45:35.536535+00	
00000000-0000-0000-0000-000000000000	f0d0a5a4-9fd5-4e9c-87a2-5480f6fe2643	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-07 15:45:36.205999+00	
00000000-0000-0000-0000-000000000000	eaad2d67-f402-4e29-a7d7-47425d273106	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-08 00:28:35.776764+00	
00000000-0000-0000-0000-000000000000	1c8341b4-7757-47ca-9ea5-7d54b1da3943	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-08 00:28:37.495741+00	
00000000-0000-0000-0000-000000000000	0d75cd37-909b-4384-adfc-5f7dbf581fa4	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-08 00:28:37.504149+00	
00000000-0000-0000-0000-000000000000	2961f94f-3908-4e14-a3c2-c42f1b05009c	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-08 00:28:39.965493+00	
00000000-0000-0000-0000-000000000000	68ee52d7-dac8-436d-8333-a416f9c41189	{"action":"user_confirmation_requested","actor_id":"01294339-df5d-448c-b6f9-ad9980ea25c9","actor_username":"georgia@hunterholidays.com.au","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-05-08 15:08:12.55761+00	
00000000-0000-0000-0000-000000000000	5f4e8add-32f2-43b8-a834-d6075ab6a882	{"action":"user_modified","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"user","traits":{"user_email":"georgia@hunterholidays.com.au","user_id":"01294339-df5d-448c-b6f9-ad9980ea25c9","user_phone":""}}	2025-05-08 15:08:14.230396+00	
00000000-0000-0000-0000-000000000000	15cb19d7-978c-4e26-b54f-1d9ec9dac223	{"action":"user_signedup","actor_id":"01294339-df5d-448c-b6f9-ad9980ea25c9","actor_username":"georgia@hunterholidays.com.au","actor_via_sso":false,"log_type":"team"}	2025-05-08 15:08:35.462593+00	
00000000-0000-0000-0000-000000000000	8a0b9f3e-f333-4d2d-84f7-a293107b42e7	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-09 03:28:23.835205+00	
00000000-0000-0000-0000-000000000000	2c971e71-2006-4ae0-a72e-cd0d15853839	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-09 03:28:25.284581+00	
00000000-0000-0000-0000-000000000000	20ceaf56-b680-4da4-9683-6fecb90e3097	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-09 03:28:28.604612+00	
00000000-0000-0000-0000-000000000000	42c629b7-5198-41f4-b246-987e2eae811c	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-09 03:28:29.274126+00	
00000000-0000-0000-0000-000000000000	cadd9598-6b8e-4efe-882b-825a59af1935	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-09 03:28:29.747633+00	
00000000-0000-0000-0000-000000000000	4c198d9d-d72c-4575-928c-6b944a515949	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-09 16:39:39.271111+00	
00000000-0000-0000-0000-000000000000	0d97868e-b9c7-4529-b1e2-366d7cc10e73	{"action":"token_revoked","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-09 16:39:39.277401+00	
00000000-0000-0000-0000-000000000000	872c32b7-3159-487f-8e49-c27cfd69091b	{"action":"user_confirmation_requested","actor_id":"2a6c6985-d71f-4805-951e-9c1e76e3975f","actor_username":"jason_e_halstead@yahoo.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-05-10 13:19:41.619718+00	
00000000-0000-0000-0000-000000000000	2b1fa82c-e914-4f2f-b974-4116286b5dea	{"action":"user_modified","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"user","traits":{"user_email":"jason_e_halstead@yahoo.com","user_id":"2a6c6985-d71f-4805-951e-9c1e76e3975f","user_phone":""}}	2025-05-10 13:19:43.057733+00	
00000000-0000-0000-0000-000000000000	2644eed1-4db5-4f61-a0e1-ca0e89fba012	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-10 16:33:09.41881+00	
00000000-0000-0000-0000-000000000000	6d0abefc-fa8e-4dd3-99eb-f15aa48fcdd3	{"action":"token_revoked","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-10 16:33:09.426568+00	
00000000-0000-0000-0000-000000000000	6f098ae0-4dee-49cf-840a-99f8a710f4f7	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-10 16:33:11.436943+00	
00000000-0000-0000-0000-000000000000	1911de14-f603-452d-ad12-a2330bd61f3c	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-10 16:33:11.46208+00	
00000000-0000-0000-0000-000000000000	367f4b86-906d-4ddf-aa73-47dfb4ec13ff	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-10 16:33:12.330254+00	
00000000-0000-0000-0000-000000000000	7d8382ef-614d-43f1-bc53-a800a7484f0d	{"action":"user_signedup","actor_id":"2a6c6985-d71f-4805-951e-9c1e76e3975f","actor_username":"jason_e_halstead@yahoo.com","actor_via_sso":false,"log_type":"team"}	2025-05-10 19:22:06.619558+00	
00000000-0000-0000-0000-000000000000	73b69d82-3809-480f-8577-336c56be66a2	{"action":"login","actor_id":"2a6c6985-d71f-4805-951e-9c1e76e3975f","actor_username":"jason_e_halstead@yahoo.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-05-10 19:23:25.832976+00	
00000000-0000-0000-0000-000000000000	72a1e03d-ac89-428e-87a3-f72db714eea8	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-10 19:54:40.533764+00	
00000000-0000-0000-0000-000000000000	8338bf68-6dea-4c84-8571-4463eb788000	{"action":"token_revoked","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-10 19:54:40.537036+00	
00000000-0000-0000-0000-000000000000	c0da5287-f8db-4382-bd6c-5494c97ddf5f	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-10 19:54:42.05898+00	
00000000-0000-0000-0000-000000000000	3e9e9072-a45e-49dc-bdbb-b547ad33776d	{"action":"token_refreshed","actor_id":"2a6c6985-d71f-4805-951e-9c1e76e3975f","actor_username":"jason_e_halstead@yahoo.com","actor_via_sso":false,"log_type":"token"}	2025-05-10 22:15:53.501963+00	
00000000-0000-0000-0000-000000000000	47521c1d-d50f-4277-b54c-e55fdeb2d134	{"action":"token_revoked","actor_id":"2a6c6985-d71f-4805-951e-9c1e76e3975f","actor_username":"jason_e_halstead@yahoo.com","actor_via_sso":false,"log_type":"token"}	2025-05-10 22:15:53.504889+00	
00000000-0000-0000-0000-000000000000	555a49bf-9d47-4a5b-a693-624845b59541	{"action":"user_confirmation_requested","actor_id":"3f2332c9-4f3f-45ed-9215-a65684d36bf5","actor_username":"crbcrafting@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-05-11 00:43:04.626837+00	
00000000-0000-0000-0000-000000000000	ece29e2a-b638-4bdb-889c-3e07920bebe0	{"action":"user_modified","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"user","traits":{"user_email":"crbcrafting@gmail.com","user_id":"3f2332c9-4f3f-45ed-9215-a65684d36bf5","user_phone":""}}	2025-05-11 00:43:06.195388+00	
00000000-0000-0000-0000-000000000000	4bcc29e7-a2de-4245-ae81-0d5d3e645736	{"action":"user_signedup","actor_id":"3f2332c9-4f3f-45ed-9215-a65684d36bf5","actor_username":"crbcrafting@gmail.com","actor_via_sso":false,"log_type":"team"}	2025-05-11 00:44:17.701887+00	
00000000-0000-0000-0000-000000000000	df622922-34d9-401e-9569-9dce9dc38951	{"action":"login","actor_id":"3f2332c9-4f3f-45ed-9215-a65684d36bf5","actor_username":"crbcrafting@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-05-11 00:44:33.28954+00	
00000000-0000-0000-0000-000000000000	d0549a07-8f68-449b-8614-d994f0fc2a96	{"action":"token_refreshed","actor_id":"3f2332c9-4f3f-45ed-9215-a65684d36bf5","actor_username":"crbcrafting@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-11 02:00:02.077676+00	
00000000-0000-0000-0000-000000000000	1eaf3530-c616-4a10-807e-9f1d5d01ad63	{"action":"token_revoked","actor_id":"3f2332c9-4f3f-45ed-9215-a65684d36bf5","actor_username":"crbcrafting@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-11 02:00:02.080456+00	
00000000-0000-0000-0000-000000000000	94a3a9d5-2ae6-45f1-8731-1a6698a1ccb5	{"action":"user_confirmation_requested","actor_id":"d0418bd1-e5e0-413e-9696-17d1e34556b3","actor_username":"patopropertiestn@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-05-11 02:19:43.899216+00	
00000000-0000-0000-0000-000000000000	89e2adf3-b052-4477-a77c-a23ea235ec59	{"action":"user_modified","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"user","traits":{"user_email":"patopropertiestn@gmail.com","user_id":"d0418bd1-e5e0-413e-9696-17d1e34556b3","user_phone":""}}	2025-05-11 02:19:45.418706+00	
00000000-0000-0000-0000-000000000000	60b051c9-0100-4247-97cf-542f21b15760	{"action":"user_signedup","actor_id":"d0418bd1-e5e0-413e-9696-17d1e34556b3","actor_username":"patopropertiestn@gmail.com","actor_via_sso":false,"log_type":"team"}	2025-05-11 02:20:02.641015+00	
00000000-0000-0000-0000-000000000000	34968586-fb09-49d8-8255-307b927ba446	{"action":"login","actor_id":"d0418bd1-e5e0-413e-9696-17d1e34556b3","actor_username":"patopropertiestn@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-05-11 02:20:09.390665+00	
00000000-0000-0000-0000-000000000000	e2a6865f-f241-4c8e-b721-b9d8c485e4bb	{"action":"login","actor_id":"d0418bd1-e5e0-413e-9696-17d1e34556b3","actor_username":"patopropertiestn@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-05-11 02:20:11.261462+00	
00000000-0000-0000-0000-000000000000	fdff7ab9-8f26-4655-b898-873fa76e0321	{"action":"login","actor_id":"d0418bd1-e5e0-413e-9696-17d1e34556b3","actor_username":"patopropertiestn@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-05-11 03:03:36.287597+00	
00000000-0000-0000-0000-000000000000	509da2fe-7376-4fec-a558-296a95988e4d	{"action":"login","actor_id":"d0418bd1-e5e0-413e-9696-17d1e34556b3","actor_username":"patopropertiestn@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-05-11 03:03:38.701271+00	
00000000-0000-0000-0000-000000000000	9738df91-7453-4f62-97b5-827f3743f450	{"action":"token_refreshed","actor_id":"2a6c6985-d71f-4805-951e-9c1e76e3975f","actor_username":"jason_e_halstead@yahoo.com","actor_via_sso":false,"log_type":"token"}	2025-05-11 11:02:10.686105+00	
00000000-0000-0000-0000-000000000000	3873042e-652e-472d-81cf-3c8ca107c3dd	{"action":"token_revoked","actor_id":"2a6c6985-d71f-4805-951e-9c1e76e3975f","actor_username":"jason_e_halstead@yahoo.com","actor_via_sso":false,"log_type":"token"}	2025-05-11 11:02:10.692865+00	
00000000-0000-0000-0000-000000000000	03d26e81-3ce2-420d-a6b8-caced62870be	{"action":"token_refreshed","actor_id":"2a6c6985-d71f-4805-951e-9c1e76e3975f","actor_username":"jason_e_halstead@yahoo.com","actor_via_sso":false,"log_type":"token"}	2025-05-11 12:02:33.54359+00	
00000000-0000-0000-0000-000000000000	f3e48815-d677-4d75-b42e-cb4c3e93f447	{"action":"token_revoked","actor_id":"2a6c6985-d71f-4805-951e-9c1e76e3975f","actor_username":"jason_e_halstead@yahoo.com","actor_via_sso":false,"log_type":"token"}	2025-05-11 12:02:33.547713+00	
00000000-0000-0000-0000-000000000000	d9cf12b7-0280-486f-8300-8d14bb4fb9e4	{"action":"token_refreshed","actor_id":"3f2332c9-4f3f-45ed-9215-a65684d36bf5","actor_username":"crbcrafting@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-11 13:19:36.006519+00	
00000000-0000-0000-0000-000000000000	ec1eed7e-8966-4255-a76e-86bff24b82f3	{"action":"token_revoked","actor_id":"3f2332c9-4f3f-45ed-9215-a65684d36bf5","actor_username":"crbcrafting@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-11 13:19:36.007814+00	
00000000-0000-0000-0000-000000000000	32f15fca-1fc3-4908-9443-2f510a344fd3	{"action":"user_confirmation_requested","actor_id":"3d6ec7f6-350e-467f-9178-6fa595bab52e","actor_username":"keytfarinas@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-05-11 14:35:27.475632+00	
00000000-0000-0000-0000-000000000000	35e80c94-5a48-4423-a38a-dd1f223a7174	{"action":"user_modified","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"user","traits":{"user_email":"keytfarinas@gmail.com","user_id":"3d6ec7f6-350e-467f-9178-6fa595bab52e","user_phone":""}}	2025-05-11 14:35:29.060452+00	
00000000-0000-0000-0000-000000000000	362a57fd-d533-4ccd-85ca-ce21b85f7130	{"action":"user_signedup","actor_id":"3d6ec7f6-350e-467f-9178-6fa595bab52e","actor_username":"keytfarinas@gmail.com","actor_via_sso":false,"log_type":"team"}	2025-05-11 14:35:45.713517+00	
00000000-0000-0000-0000-000000000000	2cda4f70-3310-4dc7-a03c-8082a7c06985	{"action":"user_recovery_requested","actor_id":"3d6ec7f6-350e-467f-9178-6fa595bab52e","actor_username":"keytfarinas@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-05-11 14:36:59.095972+00	
00000000-0000-0000-0000-000000000000	f92a7a47-2cfa-40fa-97ca-10cbdc4deaed	{"action":"login","actor_id":"3d6ec7f6-350e-467f-9178-6fa595bab52e","actor_username":"keytfarinas@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-05-11 14:37:16.241574+00	
00000000-0000-0000-0000-000000000000	6a2301cc-bd8e-42c1-85fa-39ffabb18248	{"action":"user_updated_password","actor_id":"3d6ec7f6-350e-467f-9178-6fa595bab52e","actor_username":"keytfarinas@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-05-11 14:37:32.320819+00	
00000000-0000-0000-0000-000000000000	96915d79-893f-4010-8cb4-3a0a272953a8	{"action":"user_modified","actor_id":"3d6ec7f6-350e-467f-9178-6fa595bab52e","actor_username":"keytfarinas@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-05-11 14:37:32.322799+00	
00000000-0000-0000-0000-000000000000	1c1f458b-8d38-4d30-b4c8-24a85fadb260	{"action":"token_refreshed","actor_id":"2a6c6985-d71f-4805-951e-9c1e76e3975f","actor_username":"jason_e_halstead@yahoo.com","actor_via_sso":false,"log_type":"token"}	2025-05-11 15:05:17.10005+00	
00000000-0000-0000-0000-000000000000	05bdd4a0-5822-4e0b-9eec-0437cdb99894	{"action":"token_revoked","actor_id":"2a6c6985-d71f-4805-951e-9c1e76e3975f","actor_username":"jason_e_halstead@yahoo.com","actor_via_sso":false,"log_type":"token"}	2025-05-11 15:05:17.101326+00	
00000000-0000-0000-0000-000000000000	7026a7b1-6b15-4652-90f8-5f43611a342f	{"action":"token_refreshed","actor_id":"3d6ec7f6-350e-467f-9178-6fa595bab52e","actor_username":"keytfarinas@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-11 16:42:43.673612+00	
00000000-0000-0000-0000-000000000000	a7313b2d-77c8-4c0f-8dea-189f2bc7cde0	{"action":"token_revoked","actor_id":"3d6ec7f6-350e-467f-9178-6fa595bab52e","actor_username":"keytfarinas@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-11 16:42:43.67548+00	
00000000-0000-0000-0000-000000000000	69f21633-5fdc-49d1-9f1d-324992dfb58a	{"action":"token_refreshed","actor_id":"3d6ec7f6-350e-467f-9178-6fa595bab52e","actor_username":"keytfarinas@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-11 16:42:43.730144+00	
00000000-0000-0000-0000-000000000000	6d991a38-2d79-4f88-b061-647e9c4bc3d3	{"action":"token_refreshed","actor_id":"3d6ec7f6-350e-467f-9178-6fa595bab52e","actor_username":"keytfarinas@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-11 16:42:43.798165+00	
00000000-0000-0000-0000-000000000000	0bc782b1-4c99-46ef-bd65-388fdc450cc8	{"action":"token_refreshed","actor_id":"3d6ec7f6-350e-467f-9178-6fa595bab52e","actor_username":"keytfarinas@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-11 16:42:43.845475+00	
00000000-0000-0000-0000-000000000000	5862358a-6db3-4ec5-bac1-ccb3560b6dec	{"action":"token_refreshed","actor_id":"3d6ec7f6-350e-467f-9178-6fa595bab52e","actor_username":"keytfarinas@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-11 16:42:43.970335+00	
00000000-0000-0000-0000-000000000000	54fe2744-b51d-4b39-b8c2-c43100d47267	{"action":"token_refreshed","actor_id":"3d6ec7f6-350e-467f-9178-6fa595bab52e","actor_username":"keytfarinas@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-11 16:42:45.609575+00	
00000000-0000-0000-0000-000000000000	ef828dae-2dff-4559-b8c6-2726796f2ce5	{"action":"token_refreshed","actor_id":"3d6ec7f6-350e-467f-9178-6fa595bab52e","actor_username":"keytfarinas@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-11 16:52:16.512588+00	
00000000-0000-0000-0000-000000000000	6852f984-da28-4170-b4d6-14ee94ec5006	{"action":"token_refreshed","actor_id":"3d6ec7f6-350e-467f-9178-6fa595bab52e","actor_username":"keytfarinas@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-11 16:52:16.741798+00	
00000000-0000-0000-0000-000000000000	2a0f7965-a775-49a7-a4f5-0e642571378a	{"action":"token_refreshed","actor_id":"3d6ec7f6-350e-467f-9178-6fa595bab52e","actor_username":"keytfarinas@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-11 16:52:17.243861+00	
00000000-0000-0000-0000-000000000000	4f57d22b-a1d2-4e60-96bb-43587c84ddf2	{"action":"token_refreshed","actor_id":"3d6ec7f6-350e-467f-9178-6fa595bab52e","actor_username":"keytfarinas@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-11 16:52:17.258644+00	
00000000-0000-0000-0000-000000000000	046c72e4-7ad1-445d-ad1d-a5bc35a71071	{"action":"token_refreshed","actor_id":"3d6ec7f6-350e-467f-9178-6fa595bab52e","actor_username":"keytfarinas@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-11 16:52:17.568715+00	
00000000-0000-0000-0000-000000000000	22ad43a8-41ff-466c-b9dc-2e4f6a35f1aa	{"action":"token_refreshed","actor_id":"3d6ec7f6-350e-467f-9178-6fa595bab52e","actor_username":"keytfarinas@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-11 17:52:58.873535+00	
00000000-0000-0000-0000-000000000000	b859e307-48db-49c9-bfc5-a164c64fd3e7	{"action":"token_refreshed","actor_id":"3d6ec7f6-350e-467f-9178-6fa595bab52e","actor_username":"keytfarinas@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-11 17:53:00.977735+00	
00000000-0000-0000-0000-000000000000	14c77b69-a664-4791-b401-2841d6c1dc25	{"action":"token_refreshed","actor_id":"3d6ec7f6-350e-467f-9178-6fa595bab52e","actor_username":"keytfarinas@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-11 17:53:00.997914+00	
00000000-0000-0000-0000-000000000000	e9aa334a-f5db-44cf-b9a7-cc67493466cc	{"action":"token_refreshed","actor_id":"2a6c6985-d71f-4805-951e-9c1e76e3975f","actor_username":"jason_e_halstead@yahoo.com","actor_via_sso":false,"log_type":"token"}	2025-05-11 17:53:36.734945+00	
00000000-0000-0000-0000-000000000000	f479e674-e2a7-42d8-ab4c-26a17bf10505	{"action":"token_revoked","actor_id":"2a6c6985-d71f-4805-951e-9c1e76e3975f","actor_username":"jason_e_halstead@yahoo.com","actor_via_sso":false,"log_type":"token"}	2025-05-11 17:53:36.735508+00	
00000000-0000-0000-0000-000000000000	d3cb715a-ac44-4fb0-8987-0345c54b4ef3	{"action":"token_refreshed","actor_id":"2a6c6985-d71f-4805-951e-9c1e76e3975f","actor_username":"jason_e_halstead@yahoo.com","actor_via_sso":false,"log_type":"token"}	2025-05-11 17:53:37.738636+00	
00000000-0000-0000-0000-000000000000	8e5b914e-5607-4be5-b972-83369c68e700	{"action":"token_refreshed","actor_id":"d0418bd1-e5e0-413e-9696-17d1e34556b3","actor_username":"patopropertiestn@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-12 01:58:53.03614+00	
00000000-0000-0000-0000-000000000000	2bf41b33-2a08-4558-b44b-78d8636f060c	{"action":"token_revoked","actor_id":"d0418bd1-e5e0-413e-9696-17d1e34556b3","actor_username":"patopropertiestn@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-12 01:58:53.043521+00	
00000000-0000-0000-0000-000000000000	1baf2066-5e49-40e5-8dc8-276678e597cb	{"action":"token_refreshed","actor_id":"d0418bd1-e5e0-413e-9696-17d1e34556b3","actor_username":"patopropertiestn@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-12 01:58:54.080298+00	
00000000-0000-0000-0000-000000000000	353fece9-33e2-4d70-b354-68be17bb6202	{"action":"token_refreshed","actor_id":"d0418bd1-e5e0-413e-9696-17d1e34556b3","actor_username":"patopropertiestn@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-12 01:58:54.106687+00	
00000000-0000-0000-0000-000000000000	062b18db-9029-4f19-ae59-009329ad803f	{"action":"token_refreshed","actor_id":"d0418bd1-e5e0-413e-9696-17d1e34556b3","actor_username":"patopropertiestn@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-12 03:06:17.591667+00	
00000000-0000-0000-0000-000000000000	ea87413a-e574-4867-b837-2822a0cdfd1b	{"action":"token_refreshed","actor_id":"d0418bd1-e5e0-413e-9696-17d1e34556b3","actor_username":"patopropertiestn@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-12 03:06:18.449621+00	
00000000-0000-0000-0000-000000000000	33cbbcdf-5a8b-4865-8ba7-315fdfca5611	{"action":"token_refreshed","actor_id":"d0418bd1-e5e0-413e-9696-17d1e34556b3","actor_username":"patopropertiestn@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-12 03:06:18.463304+00	
00000000-0000-0000-0000-000000000000	f5d47ea5-d958-4e96-8337-edbdf59587ff	{"action":"token_refreshed","actor_id":"d0418bd1-e5e0-413e-9696-17d1e34556b3","actor_username":"patopropertiestn@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-12 03:07:41.160101+00	
00000000-0000-0000-0000-000000000000	4c51a8c3-59eb-4356-b9b2-2992be1ec4c8	{"action":"token_refreshed","actor_id":"d0418bd1-e5e0-413e-9696-17d1e34556b3","actor_username":"patopropertiestn@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-12 03:07:42.796555+00	
00000000-0000-0000-0000-000000000000	ad1b13d3-ac97-4bb8-bb86-f2890fbdbd14	{"action":"token_refreshed","actor_id":"d0418bd1-e5e0-413e-9696-17d1e34556b3","actor_username":"patopropertiestn@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-12 03:07:42.810931+00	
00000000-0000-0000-0000-000000000000	2bfaa2a8-9424-4f22-875b-26e1d582199e	{"action":"token_refreshed","actor_id":"2a6c6985-d71f-4805-951e-9c1e76e3975f","actor_username":"jason_e_halstead@yahoo.com","actor_via_sso":false,"log_type":"token"}	2025-05-12 11:21:44.902982+00	
00000000-0000-0000-0000-000000000000	21b1a8eb-29ae-473f-bc03-c66169efede7	{"action":"token_revoked","actor_id":"2a6c6985-d71f-4805-951e-9c1e76e3975f","actor_username":"jason_e_halstead@yahoo.com","actor_via_sso":false,"log_type":"token"}	2025-05-12 11:21:44.914789+00	
00000000-0000-0000-0000-000000000000	e9d7e287-2c84-4c49-b7be-c3b4ac355c89	{"action":"token_refreshed","actor_id":"2a6c6985-d71f-4805-951e-9c1e76e3975f","actor_username":"jason_e_halstead@yahoo.com","actor_via_sso":false,"log_type":"token"}	2025-05-12 13:49:53.932817+00	
00000000-0000-0000-0000-000000000000	9dc851a0-4b40-4ad3-9ee7-150a58c587ae	{"action":"token_revoked","actor_id":"2a6c6985-d71f-4805-951e-9c1e76e3975f","actor_username":"jason_e_halstead@yahoo.com","actor_via_sso":false,"log_type":"token"}	2025-05-12 13:49:53.935412+00	
00000000-0000-0000-0000-000000000000	3ee29bc9-e715-45da-bc2b-452285b77532	{"action":"token_refreshed","actor_id":"d0418bd1-e5e0-413e-9696-17d1e34556b3","actor_username":"patopropertiestn@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-12 15:29:10.740637+00	
00000000-0000-0000-0000-000000000000	441d8fc6-12c3-4e62-b457-8d8a112cb93c	{"action":"token_refreshed","actor_id":"d0418bd1-e5e0-413e-9696-17d1e34556b3","actor_username":"patopropertiestn@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-12 15:29:12.646901+00	
00000000-0000-0000-0000-000000000000	245ab740-e628-46c4-9042-c8cb86ca3fa5	{"action":"token_refreshed","actor_id":"d0418bd1-e5e0-413e-9696-17d1e34556b3","actor_username":"patopropertiestn@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-12 15:29:12.670385+00	
00000000-0000-0000-0000-000000000000	c235d930-0e97-4529-b3ec-98461d08c8da	{"action":"token_refreshed","actor_id":"d0418bd1-e5e0-413e-9696-17d1e34556b3","actor_username":"patopropertiestn@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-12 17:46:48.289259+00	
00000000-0000-0000-0000-000000000000	05ceea26-e96f-4d88-90c8-9842b1e8614e	{"action":"token_refreshed","actor_id":"d0418bd1-e5e0-413e-9696-17d1e34556b3","actor_username":"patopropertiestn@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-12 17:46:50.19872+00	
00000000-0000-0000-0000-000000000000	ef17a702-fcfc-4da0-bc25-591fca5cc5d4	{"action":"token_refreshed","actor_id":"d0418bd1-e5e0-413e-9696-17d1e34556b3","actor_username":"patopropertiestn@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-12 17:46:50.215357+00	
00000000-0000-0000-0000-000000000000	1c6f44d6-7288-403c-9a4d-e781491564e6	{"action":"user_confirmation_requested","actor_id":"e151c236-9a85-4de3-ba10-56d0ffe2feb2","actor_username":"billndimoll@msn.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-05-12 21:44:10.655051+00	
00000000-0000-0000-0000-000000000000	01c4fcdf-741e-48fd-b65e-3d59abfe5016	{"action":"user_modified","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"user","traits":{"user_email":"billndimoll@msn.com","user_id":"e151c236-9a85-4de3-ba10-56d0ffe2feb2","user_phone":""}}	2025-05-12 21:44:12.466219+00	
00000000-0000-0000-0000-000000000000	82ad2917-76da-4795-9381-0557ea4c12c4	{"action":"user_signedup","actor_id":"e151c236-9a85-4de3-ba10-56d0ffe2feb2","actor_username":"billndimoll@msn.com","actor_via_sso":false,"log_type":"team"}	2025-05-12 21:44:34.192158+00	
00000000-0000-0000-0000-000000000000	109fb81d-a14c-4a44-8dbf-73a09ed39e54	{"action":"login","actor_id":"e151c236-9a85-4de3-ba10-56d0ffe2feb2","actor_username":"billndimoll@msn.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-05-12 21:45:43.542387+00	
00000000-0000-0000-0000-000000000000	c0489722-ce19-44da-81d6-383addbdfb56	{"action":"token_refreshed","actor_id":"9d09ce16-014e-4e6b-bf29-9569bea73610","actor_username":"unionweb619+8@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-14 20:08:51.987294+00	
00000000-0000-0000-0000-000000000000	ea602a42-021c-49f4-b501-c4bc02f2bd33	{"action":"token_revoked","actor_id":"9d09ce16-014e-4e6b-bf29-9569bea73610","actor_username":"unionweb619+8@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-14 20:08:51.999205+00	
00000000-0000-0000-0000-000000000000	b419c435-cabf-41e5-aba1-93182b680806	{"action":"token_refreshed","actor_id":"9d09ce16-014e-4e6b-bf29-9569bea73610","actor_username":"unionweb619+8@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-14 20:08:53.58943+00	
00000000-0000-0000-0000-000000000000	2c66d039-eb1c-4f2a-899b-d772fd6f4175	{"action":"token_refreshed","actor_id":"9d09ce16-014e-4e6b-bf29-9569bea73610","actor_username":"unionweb619+8@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-14 20:08:57.726154+00	
00000000-0000-0000-0000-000000000000	305642ce-095d-446f-a63d-4e10e29ceb3a	{"action":"token_refreshed","actor_id":"9d09ce16-014e-4e6b-bf29-9569bea73610","actor_username":"unionweb619+8@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-14 20:08:58.451611+00	
00000000-0000-0000-0000-000000000000	9028245e-7ebe-4046-8d24-ca623f84112f	{"action":"token_refreshed","actor_id":"9d09ce16-014e-4e6b-bf29-9569bea73610","actor_username":"unionweb619+8@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-14 20:08:58.462486+00	
00000000-0000-0000-0000-000000000000	219ce391-eba9-4113-aa83-fbca083de626	{"action":"token_refreshed","actor_id":"9d09ce16-014e-4e6b-bf29-9569bea73610","actor_username":"unionweb619+8@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-14 20:09:06.293154+00	
00000000-0000-0000-0000-000000000000	0974fd20-8089-4571-9c79-e5bf6ceed8ff	{"action":"token_refreshed","actor_id":"9d09ce16-014e-4e6b-bf29-9569bea73610","actor_username":"unionweb619+8@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-14 20:09:51.041848+00	
00000000-0000-0000-0000-000000000000	b22d6a5f-5af8-475c-a8c3-f1cb7af4c740	{"action":"token_refreshed","actor_id":"9d09ce16-014e-4e6b-bf29-9569bea73610","actor_username":"unionweb619+8@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-14 20:09:51.513561+00	
00000000-0000-0000-0000-000000000000	d527ea82-b0ea-428c-9115-f327aa3ead19	{"action":"token_refreshed","actor_id":"9d09ce16-014e-4e6b-bf29-9569bea73610","actor_username":"unionweb619+8@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-14 20:09:51.533378+00	
00000000-0000-0000-0000-000000000000	994d2d67-5702-43d9-991f-4c3a57dcfa30	{"action":"user_repeated_signup","actor_id":"9d09ce16-014e-4e6b-bf29-9569bea73610","actor_username":"unionweb619+8@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-05-14 20:09:51.538034+00	
00000000-0000-0000-0000-000000000000	e501642f-0052-4d46-b6bb-e39117557846	{"action":"user_confirmation_requested","actor_id":"7def9335-8114-4b71-b5f3-8194b8f1cac8","actor_username":"unionweb619+10@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-05-14 20:13:42.771531+00	
00000000-0000-0000-0000-000000000000	347fcc77-1f96-4fc6-bd83-b773459e3cbc	{"action":"user_modified","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"user","traits":{"user_email":"unionweb619+10@gmail.com","user_id":"7def9335-8114-4b71-b5f3-8194b8f1cac8","user_phone":""}}	2025-05-14 20:13:44.330744+00	
00000000-0000-0000-0000-000000000000	ec69ed65-2537-4135-b940-25e431430c28	{"action":"user_signedup","actor_id":"7def9335-8114-4b71-b5f3-8194b8f1cac8","actor_username":"unionweb619+10@gmail.com","actor_via_sso":false,"log_type":"team"}	2025-05-14 20:14:35.844061+00	
00000000-0000-0000-0000-000000000000	0e3f53aa-6bbd-4dc0-8599-58704776f5c5	{"action":"token_refreshed","actor_id":"9d09ce16-014e-4e6b-bf29-9569bea73610","actor_username":"unionweb619+8@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-14 21:55:59.279332+00	
00000000-0000-0000-0000-000000000000	252bca3d-b97c-4261-a715-c4168b86947f	{"action":"token_revoked","actor_id":"9d09ce16-014e-4e6b-bf29-9569bea73610","actor_username":"unionweb619+8@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-14 21:55:59.28295+00	
00000000-0000-0000-0000-000000000000	7a963c29-e820-4923-ad12-624d81ee1a32	{"action":"token_refreshed","actor_id":"9d09ce16-014e-4e6b-bf29-9569bea73610","actor_username":"unionweb619+8@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-14 23:41:25.980112+00	
00000000-0000-0000-0000-000000000000	b39150c9-7035-4616-ac79-9ed939905b98	{"action":"token_revoked","actor_id":"9d09ce16-014e-4e6b-bf29-9569bea73610","actor_username":"unionweb619+8@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-14 23:41:25.982076+00	
00000000-0000-0000-0000-000000000000	b5dbbedc-3f1f-4198-bc50-6220bddb537a	{"action":"token_refreshed","actor_id":"9d09ce16-014e-4e6b-bf29-9569bea73610","actor_username":"unionweb619+8@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-14 23:41:27.568911+00	
00000000-0000-0000-0000-000000000000	e0888202-f29b-414a-82f2-fb77dcab1b9b	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-15 00:06:29.312265+00	
00000000-0000-0000-0000-000000000000	bb83b007-1e96-4753-a9b4-8c85bbeadd09	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-15 00:06:29.907502+00	
00000000-0000-0000-0000-000000000000	8551841b-0938-4f7b-a8f5-76fa40ed23d3	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-15 00:06:34.129182+00	
00000000-0000-0000-0000-000000000000	d533f481-2310-4330-9190-0d507898f6ed	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-15 00:06:34.960748+00	
00000000-0000-0000-0000-000000000000	bd849c62-729e-4f43-9ee8-a01a3063923b	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-15 00:06:34.974675+00	
00000000-0000-0000-0000-000000000000	777060ad-5ff8-490c-b9dd-14619c5e4d57	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-15 00:06:37.546823+00	
00000000-0000-0000-0000-000000000000	b3927fd8-220d-4bba-898c-ee8ffaca0536	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-15 00:07:13.64148+00	
00000000-0000-0000-0000-000000000000	8e9ef670-7777-49bf-a29d-9a6186592e1d	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-15 00:07:14.111157+00	
00000000-0000-0000-0000-000000000000	c3ca4ff6-1286-4d10-86a3-e614b872579a	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-15 00:07:14.124488+00	
00000000-0000-0000-0000-000000000000	fe44321c-1de2-4bb5-b29a-1fe9523fc934	{"action":"user_confirmation_requested","actor_id":"2c7f34a4-2893-48c3-b552-3e505a9c2135","actor_username":"smiiith+3@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-05-15 00:07:14.24886+00	
00000000-0000-0000-0000-000000000000	708d763c-f7e4-414d-bbf0-94506e1e20ea	{"action":"user_modified","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"user","traits":{"user_email":"smiiith+3@gmail.com","user_id":"2c7f34a4-2893-48c3-b552-3e505a9c2135","user_phone":""}}	2025-05-15 00:07:15.940254+00	
00000000-0000-0000-0000-000000000000	a29c5757-bdc6-45bf-8b64-e2cd1b724ac8	{"action":"user_signedup","actor_id":"2c7f34a4-2893-48c3-b552-3e505a9c2135","actor_username":"smiiith+3@gmail.com","actor_via_sso":false,"log_type":"team"}	2025-05-15 00:07:31.6948+00	
00000000-0000-0000-0000-000000000000	ec8fd0a7-3ecb-4f05-a2dd-52af3003b098	{"action":"logout","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-05-15 00:09:12.084269+00	
00000000-0000-0000-0000-000000000000	d72d9b77-9583-4aa7-ab91-08b97190746c	{"action":"user_confirmation_requested","actor_id":"956aca82-f8e9-462d-aaa8-8c78af551e96","actor_username":"smiiith+4@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-05-15 00:09:42.076226+00	
00000000-0000-0000-0000-000000000000	4a4aef27-ab67-4935-ab86-ee906729df04	{"action":"user_modified","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"user","traits":{"user_email":"smiiith+4@gmail.com","user_id":"956aca82-f8e9-462d-aaa8-8c78af551e96","user_phone":""}}	2025-05-15 00:09:43.489063+00	
00000000-0000-0000-0000-000000000000	22997080-f6fc-4110-98bb-8142ed24df49	{"action":"user_signedup","actor_id":"956aca82-f8e9-462d-aaa8-8c78af551e96","actor_username":"smiiith+4@gmail.com","actor_via_sso":false,"log_type":"team"}	2025-05-15 00:13:07.39354+00	
00000000-0000-0000-0000-000000000000	d62e3166-750b-454f-a8ed-8196c840849d	{"action":"user_confirmation_requested","actor_id":"1f04962f-9175-4935-a985-bf47c694a262","actor_username":"smiiith+5@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-05-15 00:13:34.161405+00	
00000000-0000-0000-0000-000000000000	8b271e89-fef4-4c03-9872-a4fcdae7e684	{"action":"user_modified","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"user","traits":{"user_email":"smiiith+5@gmail.com","user_id":"1f04962f-9175-4935-a985-bf47c694a262","user_phone":""}}	2025-05-15 00:13:35.793029+00	
00000000-0000-0000-0000-000000000000	31c42150-2f9a-4e62-8174-86008c54e972	{"action":"user_signedup","actor_id":"1f04962f-9175-4935-a985-bf47c694a262","actor_username":"smiiith+5@gmail.com","actor_via_sso":false,"log_type":"team"}	2025-05-15 00:14:48.646149+00	
00000000-0000-0000-0000-000000000000	7eff8a2b-b3cf-4d00-981b-f8243dfa6ff0	{"action":"login","actor_id":"1f04962f-9175-4935-a985-bf47c694a262","actor_username":"smiiith+5@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"email"}}	2025-05-15 00:14:49.42638+00	
00000000-0000-0000-0000-000000000000	e04d89e5-62c8-4ffb-a094-9c432d804974	{"action":"token_refreshed","actor_id":"9d09ce16-014e-4e6b-bf29-9569bea73610","actor_username":"unionweb619+8@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-15 04:21:10.934035+00	
00000000-0000-0000-0000-000000000000	70b383a9-b0e1-4d83-981e-a789af3f078e	{"action":"token_refreshed","actor_id":"9d09ce16-014e-4e6b-bf29-9569bea73610","actor_username":"unionweb619+8@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-15 04:21:12.363462+00	
00000000-0000-0000-0000-000000000000	7d6e0ead-bc11-49b2-bb8a-b91c6ca76c4d	{"action":"token_refreshed","actor_id":"9d09ce16-014e-4e6b-bf29-9569bea73610","actor_username":"unionweb619+8@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-15 04:21:16.023269+00	
00000000-0000-0000-0000-000000000000	55b1cfe4-0434-420b-b055-26d56d514786	{"action":"token_refreshed","actor_id":"9d09ce16-014e-4e6b-bf29-9569bea73610","actor_username":"unionweb619+8@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-15 04:21:16.677792+00	
00000000-0000-0000-0000-000000000000	567a4453-62f1-4b8f-8dbc-599ab89da3ad	{"action":"token_refreshed","actor_id":"9d09ce16-014e-4e6b-bf29-9569bea73610","actor_username":"unionweb619+8@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-15 04:21:16.702765+00	
00000000-0000-0000-0000-000000000000	a75adc13-a163-45d6-933c-9a035b476b91	{"action":"token_refreshed","actor_id":"9d09ce16-014e-4e6b-bf29-9569bea73610","actor_username":"unionweb619+8@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-15 04:21:19.699118+00	
00000000-0000-0000-0000-000000000000	540a0a67-e5e8-456a-9777-3d1ee6b0cbd3	{"action":"token_refreshed","actor_id":"9d09ce16-014e-4e6b-bf29-9569bea73610","actor_username":"unionweb619+8@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-15 04:21:47.000899+00	
00000000-0000-0000-0000-000000000000	b0a96bb3-04bc-43e0-93c3-7db7bf031d4d	{"action":"token_refreshed","actor_id":"9d09ce16-014e-4e6b-bf29-9569bea73610","actor_username":"unionweb619+8@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-15 04:21:47.782034+00	
00000000-0000-0000-0000-000000000000	a1c73016-d416-4649-8421-229f8e271d09	{"action":"token_refreshed","actor_id":"9d09ce16-014e-4e6b-bf29-9569bea73610","actor_username":"unionweb619+8@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-15 04:21:47.794666+00	
00000000-0000-0000-0000-000000000000	bab897ea-8fa8-4bfb-82ea-f96a76128477	{"action":"user_confirmation_requested","actor_id":"8c9a07f9-6d75-4144-a987-c5a9e7e500ea","actor_username":"unionweb619+11@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-05-15 04:21:47.890047+00	
00000000-0000-0000-0000-000000000000	b5229116-4bce-4a9f-92b6-211555e4136c	{"action":"user_modified","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"user","traits":{"user_email":"unionweb619+11@gmail.com","user_id":"8c9a07f9-6d75-4144-a987-c5a9e7e500ea","user_phone":""}}	2025-05-15 04:21:49.483499+00	
00000000-0000-0000-0000-000000000000	1ab1d2be-b355-4e22-afbc-3d0f073ce8a4	{"action":"user_signedup","actor_id":"8c9a07f9-6d75-4144-a987-c5a9e7e500ea","actor_username":"unionweb619+11@gmail.com","actor_via_sso":false,"log_type":"team"}	2025-05-15 04:22:06.053952+00	
00000000-0000-0000-0000-000000000000	b4cd3bf6-af63-41c2-8c77-5769ec947696	{"action":"login","actor_id":"8c9a07f9-6d75-4144-a987-c5a9e7e500ea","actor_username":"unionweb619+11@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"email"}}	2025-05-15 04:22:07.509554+00	
00000000-0000-0000-0000-000000000000	bc2dd780-c5cd-411f-8777-e5de55469e91	{"action":"token_refreshed","actor_id":"1f04962f-9175-4935-a985-bf47c694a262","actor_username":"smiiith+5@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-15 16:45:11.644495+00	
00000000-0000-0000-0000-000000000000	d9b38bbb-141b-4399-aafa-4e677fc60379	{"action":"token_revoked","actor_id":"1f04962f-9175-4935-a985-bf47c694a262","actor_username":"smiiith+5@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-15 16:45:11.661155+00	
00000000-0000-0000-0000-000000000000	759b21fa-7571-441e-847a-75e2edd99ed0	{"action":"token_refreshed","actor_id":"1f04962f-9175-4935-a985-bf47c694a262","actor_username":"smiiith+5@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-16 16:58:15.557081+00	
00000000-0000-0000-0000-000000000000	99239690-5c40-4887-9ea6-7020aee894f8	{"action":"token_revoked","actor_id":"1f04962f-9175-4935-a985-bf47c694a262","actor_username":"smiiith+5@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-16 16:58:15.569789+00	
00000000-0000-0000-0000-000000000000	619bb938-9479-4dda-96a6-9b4e4f3e50dc	{"action":"token_refreshed","actor_id":"1f04962f-9175-4935-a985-bf47c694a262","actor_username":"smiiith+5@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-16 16:58:16.344325+00	
00000000-0000-0000-0000-000000000000	3d1536fa-1e85-4250-ab12-ab5ff7416d97	{"action":"token_refreshed","actor_id":"1f04962f-9175-4935-a985-bf47c694a262","actor_username":"smiiith+5@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-17 18:57:43.055003+00	
00000000-0000-0000-0000-000000000000	3575cc68-287d-4a06-9f9e-2bbb15d7abb2	{"action":"token_refreshed","actor_id":"1f04962f-9175-4935-a985-bf47c694a262","actor_username":"smiiith+5@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-17 18:57:44.527758+00	
00000000-0000-0000-0000-000000000000	cb590c5d-f5a5-4c7d-874f-3f55b986add1	{"action":"token_refreshed","actor_id":"8c9a07f9-6d75-4144-a987-c5a9e7e500ea","actor_username":"unionweb619+11@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-18 14:26:44.542105+00	
00000000-0000-0000-0000-000000000000	51907bae-12cc-445c-bf0a-0a4156a79e7d	{"action":"token_revoked","actor_id":"8c9a07f9-6d75-4144-a987-c5a9e7e500ea","actor_username":"unionweb619+11@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-18 14:26:44.550099+00	
00000000-0000-0000-0000-000000000000	d4a4a148-0b62-4918-b927-9d33db3350ce	{"action":"token_refreshed","actor_id":"8c9a07f9-6d75-4144-a987-c5a9e7e500ea","actor_username":"unionweb619+11@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-18 14:26:45.998677+00	
00000000-0000-0000-0000-000000000000	4ec01fd4-871c-431d-8c5a-bb07412f9435	{"action":"token_refreshed","actor_id":"1f04962f-9175-4935-a985-bf47c694a262","actor_username":"smiiith+5@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-21 22:57:36.45503+00	
00000000-0000-0000-0000-000000000000	2130e891-ca17-4a26-9f18-d3f38a6e6f7b	{"action":"token_refreshed","actor_id":"1f04962f-9175-4935-a985-bf47c694a262","actor_username":"smiiith+5@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-21 22:57:37.850887+00	
00000000-0000-0000-0000-000000000000	fd83e83c-7c44-4190-bfd3-83ac183def42	{"action":"token_refreshed","actor_id":"1f04962f-9175-4935-a985-bf47c694a262","actor_username":"smiiith+5@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-21 22:57:44.350264+00	
00000000-0000-0000-0000-000000000000	a3659c53-243c-436c-9c46-c4beb909e26e	{"action":"token_refreshed","actor_id":"1f04962f-9175-4935-a985-bf47c694a262","actor_username":"smiiith+5@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-21 22:57:45.121655+00	
00000000-0000-0000-0000-000000000000	86b9390d-a08c-4661-ba8d-cb84883cd446	{"action":"token_refreshed","actor_id":"1f04962f-9175-4935-a985-bf47c694a262","actor_username":"smiiith+5@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-21 22:57:45.138606+00	
00000000-0000-0000-0000-000000000000	bcbe8b48-7964-4eeb-a140-3c2ee42e8509	{"action":"token_refreshed","actor_id":"1f04962f-9175-4935-a985-bf47c694a262","actor_username":"smiiith+5@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-21 22:57:58.688057+00	
00000000-0000-0000-0000-000000000000	ae69bdc9-61f2-4404-94b7-5dc3179438a3	{"action":"token_refreshed","actor_id":"1f04962f-9175-4935-a985-bf47c694a262","actor_username":"smiiith+5@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-21 22:57:59.157233+00	
00000000-0000-0000-0000-000000000000	42912cee-a89d-4faa-aa1e-946ce0d81c23	{"action":"login","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-05-21 22:58:29.242387+00	
00000000-0000-0000-0000-000000000000	0c720d51-f9ad-4eb3-b08f-41309ae73b3a	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-23 18:01:47.038868+00	
00000000-0000-0000-0000-000000000000	d5b5cc35-f06e-404d-8dd0-af1d26d53f54	{"action":"token_revoked","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-23 18:01:47.047596+00	
00000000-0000-0000-0000-000000000000	d3ccac3e-e690-44c8-b4bb-80645884efe4	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-23 18:01:48.649312+00	
00000000-0000-0000-0000-000000000000	6b676a24-422c-4e06-850f-60ab2f16acab	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-23 18:01:48.673137+00	
00000000-0000-0000-0000-000000000000	b3f422ca-1e92-4222-963b-8a46f43fbf79	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-23 18:01:49.448841+00	
00000000-0000-0000-0000-000000000000	e1618385-e98d-42e5-b262-7eb2e218a368	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-24 15:15:08.154593+00	
00000000-0000-0000-0000-000000000000	49768359-1082-4535-8ae7-37283a8e99ea	{"action":"token_revoked","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-24 15:15:08.162794+00	
00000000-0000-0000-0000-000000000000	b84ba757-27f9-4681-bc3b-0a8ec9eead42	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-24 15:15:09.725695+00	
00000000-0000-0000-0000-000000000000	701ea78d-1544-4a18-9e64-190135a01bf7	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-24 15:15:09.78285+00	
00000000-0000-0000-0000-000000000000	665c672c-c65b-4071-bc5f-b7a2df8d91b5	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-24 15:15:10.550358+00	
00000000-0000-0000-0000-000000000000	83c18f6b-adb4-445c-9b52-fad28b40540f	{"action":"token_refreshed","actor_id":"3f2332c9-4f3f-45ed-9215-a65684d36bf5","actor_username":"crbcrafting@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-25 21:14:10.937682+00	
00000000-0000-0000-0000-000000000000	f31325a0-c221-4e62-bb98-c8e286d3c0c8	{"action":"token_revoked","actor_id":"3f2332c9-4f3f-45ed-9215-a65684d36bf5","actor_username":"crbcrafting@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-25 21:14:10.94962+00	
00000000-0000-0000-0000-000000000000	08e43740-1086-4b75-900f-c5adafffa9a3	{"action":"token_refreshed","actor_id":"3f2332c9-4f3f-45ed-9215-a65684d36bf5","actor_username":"crbcrafting@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-25 21:14:11.403978+00	
00000000-0000-0000-0000-000000000000	87bda47b-0a86-4db7-a333-185674f48767	{"action":"token_refreshed","actor_id":"3f2332c9-4f3f-45ed-9215-a65684d36bf5","actor_username":"crbcrafting@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-25 21:14:12.454711+00	
00000000-0000-0000-0000-000000000000	7d2d2ed7-1922-4b5b-b439-47b90000221e	{"action":"token_refreshed","actor_id":"3f2332c9-4f3f-45ed-9215-a65684d36bf5","actor_username":"crbcrafting@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-25 21:14:12.78191+00	
00000000-0000-0000-0000-000000000000	8d3351cc-ae32-46bf-9e67-b365bd3c7e4e	{"action":"token_refreshed","actor_id":"3f2332c9-4f3f-45ed-9215-a65684d36bf5","actor_username":"crbcrafting@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-25 21:14:15.717328+00	
00000000-0000-0000-0000-000000000000	4521c94b-9ae0-4994-8246-1e60e3b4f815	{"action":"token_refreshed","actor_id":"3f2332c9-4f3f-45ed-9215-a65684d36bf5","actor_username":"crbcrafting@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-25 21:14:16.206918+00	
00000000-0000-0000-0000-000000000000	f4c7e945-dff7-4783-914b-08449bfcdc9e	{"action":"token_refreshed","actor_id":"3f2332c9-4f3f-45ed-9215-a65684d36bf5","actor_username":"crbcrafting@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-25 21:14:16.977505+00	
00000000-0000-0000-0000-000000000000	e087fa9f-826a-4faa-9a22-46c3c22695f9	{"action":"user_repeated_signup","actor_id":"d0418bd1-e5e0-413e-9696-17d1e34556b3","actor_username":"patopropertiestn@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-05-26 04:09:53.794967+00	
00000000-0000-0000-0000-000000000000	8865da9a-5dbb-452b-84f6-a050f0ad7056	{"action":"token_refreshed","actor_id":"d0418bd1-e5e0-413e-9696-17d1e34556b3","actor_username":"patopropertiestn@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-26 04:10:37.70355+00	
00000000-0000-0000-0000-000000000000	2afc35bc-dcde-4655-a019-e054d68fc3e1	{"action":"token_refreshed","actor_id":"d0418bd1-e5e0-413e-9696-17d1e34556b3","actor_username":"patopropertiestn@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-26 04:10:38.329498+00	
00000000-0000-0000-0000-000000000000	afd42bcc-699f-41dc-b879-773c6521fad2	{"action":"login","actor_id":"d0418bd1-e5e0-413e-9696-17d1e34556b3","actor_username":"patopropertiestn@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-05-26 04:13:40.440974+00	
00000000-0000-0000-0000-000000000000	87368352-114e-4166-922d-8a999232b48d	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-29 20:37:04.066761+00	
00000000-0000-0000-0000-000000000000	ac878a7f-1afb-4f7f-a806-414603c38a3b	{"action":"token_revoked","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-29 20:37:04.080808+00	
00000000-0000-0000-0000-000000000000	707fb5fd-616d-4f12-a1f3-1bf9f160c3ab	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-29 20:37:05.719385+00	
00000000-0000-0000-0000-000000000000	9c1d00ca-e9fe-4b95-bfd1-0414e05f3e3c	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-29 20:37:05.74184+00	
00000000-0000-0000-0000-000000000000	a780e8b5-baaa-44d0-8550-3ad015a74f65	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-29 20:37:06.632404+00	
00000000-0000-0000-0000-000000000000	8e1a8782-cd8e-4a0c-99c1-8da5dd1ea718	{"action":"token_refreshed","actor_id":"8c9a07f9-6d75-4144-a987-c5a9e7e500ea","actor_username":"unionweb619+11@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-29 21:08:51.440049+00	
00000000-0000-0000-0000-000000000000	6467d582-7c51-491a-b537-f336100fdf2e	{"action":"token_refreshed","actor_id":"8c9a07f9-6d75-4144-a987-c5a9e7e500ea","actor_username":"unionweb619+11@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-29 21:08:52.059857+00	
00000000-0000-0000-0000-000000000000	e5fd1e20-b6a1-4048-abf2-c52edff71bba	{"action":"token_refreshed","actor_id":"8c9a07f9-6d75-4144-a987-c5a9e7e500ea","actor_username":"unionweb619+11@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-29 21:10:01.302575+00	
00000000-0000-0000-0000-000000000000	6e9efee7-9f84-4b7e-9392-35246c272d36	{"action":"token_refreshed","actor_id":"8c9a07f9-6d75-4144-a987-c5a9e7e500ea","actor_username":"unionweb619+11@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-29 21:10:01.951946+00	
00000000-0000-0000-0000-000000000000	19ed4d3e-6b75-4761-9c20-68d3d3aa84a5	{"action":"token_refreshed","actor_id":"8c9a07f9-6d75-4144-a987-c5a9e7e500ea","actor_username":"unionweb619+11@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-29 21:10:01.991161+00	
00000000-0000-0000-0000-000000000000	e5b5e6e6-362b-4f91-b350-e10feab1a46e	{"action":"token_refreshed","actor_id":"8c9a07f9-6d75-4144-a987-c5a9e7e500ea","actor_username":"unionweb619+11@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-29 21:10:22.28328+00	
00000000-0000-0000-0000-000000000000	c4df13f3-784a-4962-8b15-1f00b1850cb1	{"action":"token_refreshed","actor_id":"8c9a07f9-6d75-4144-a987-c5a9e7e500ea","actor_username":"unionweb619+11@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-29 21:10:22.727996+00	
00000000-0000-0000-0000-000000000000	4b386fa8-2e9a-47f9-9157-95612d73e3cc	{"action":"login","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-05-29 21:12:25.811874+00	
00000000-0000-0000-0000-000000000000	14e20b76-f9b7-4a5b-9101-6ee5e4abbaf1	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-05-29 22:48:20.572179+00	
00000000-0000-0000-0000-000000000000	ce517ba3-9cd6-4771-9ee0-bb2282552bf1	{"action":"token_revoked","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-05-29 22:48:20.575737+00	
00000000-0000-0000-0000-000000000000	1b02dce6-1b4b-475c-ba31-93a11680c26f	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-05-29 22:48:21.84141+00	
00000000-0000-0000-0000-000000000000	6fb31e7c-aaea-414e-8a07-43e86cd6c028	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-30 16:04:43.809625+00	
00000000-0000-0000-0000-000000000000	f76a9c2e-19f7-489a-9e53-3344d1cb432f	{"action":"token_revoked","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-30 16:04:43.825533+00	
00000000-0000-0000-0000-000000000000	a34d193b-a28a-461c-ad66-9cc9e9cb6aff	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-30 16:04:44.69423+00	
00000000-0000-0000-0000-000000000000	292e4ac3-0d87-45c8-8d0b-6ebb4c33b36f	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-30 16:04:44.706998+00	
00000000-0000-0000-0000-000000000000	aad00ebf-dc6a-459b-bed5-e4eb2cc45c91	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-05-30 17:41:32.909092+00	
00000000-0000-0000-0000-000000000000	5afe06ab-20ff-4f90-81d7-5a838c7dcb1b	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-05-30 17:41:34.347343+00	
00000000-0000-0000-0000-000000000000	753330d2-13d3-4b74-b110-2deb92f641be	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-05-30 17:41:37.960333+00	
00000000-0000-0000-0000-000000000000	b371bf38-1e08-468a-9cc0-0519a6471314	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-05-30 17:41:38.505581+00	
00000000-0000-0000-0000-000000000000	755bb80a-cf01-4ec4-8c46-40b3d4fa6fbe	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-05-30 17:41:38.537026+00	
00000000-0000-0000-0000-000000000000	cc9fde95-2195-44f6-b95e-fc7e04edde97	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-05-30 17:41:59.876501+00	
00000000-0000-0000-0000-000000000000	53e02a8c-4278-46e1-bc65-82b4c195f772	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-05-30 17:42:00.258294+00	
00000000-0000-0000-0000-000000000000	7362fcbb-8d5a-4e46-8f11-6f272dc11107	{"action":"login","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-05-30 17:42:00.333724+00	
00000000-0000-0000-0000-000000000000	8c360c25-df90-46a5-ad1e-03a8db3acb8e	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-05-30 23:45:15.308947+00	
00000000-0000-0000-0000-000000000000	22dd109a-6b2c-4048-940d-d408616a128a	{"action":"token_revoked","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-05-30 23:45:15.317909+00	
00000000-0000-0000-0000-000000000000	63401736-3e48-4b84-a438-d196244e4a1b	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-05-30 23:45:16.685291+00	
00000000-0000-0000-0000-000000000000	83293f92-162d-4ec1-a3d2-242019b4a806	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-05-31 16:02:32.356046+00	
00000000-0000-0000-0000-000000000000	3fa0e8be-f0e8-44a4-9856-a9968ff6f14c	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-05-31 16:02:33.096679+00	
00000000-0000-0000-0000-000000000000	c54b253d-9dc3-46f1-bb27-c6ee7fb6768d	{"action":"token_refreshed","actor_id":"3f2332c9-4f3f-45ed-9215-a65684d36bf5","actor_username":"crbcrafting@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-01 01:25:33.106357+00	
00000000-0000-0000-0000-000000000000	17de224b-1639-44de-8705-088679af9e5b	{"action":"token_revoked","actor_id":"3f2332c9-4f3f-45ed-9215-a65684d36bf5","actor_username":"crbcrafting@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-01 01:25:33.112824+00	
00000000-0000-0000-0000-000000000000	313be563-7edd-485c-8e1f-cff0436aca0b	{"action":"token_refreshed","actor_id":"3f2332c9-4f3f-45ed-9215-a65684d36bf5","actor_username":"crbcrafting@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-01 01:25:34.630777+00	
00000000-0000-0000-0000-000000000000	0dcb1c4f-2cd0-40c7-9749-2e6d919bf9fd	{"action":"token_refreshed","actor_id":"3f2332c9-4f3f-45ed-9215-a65684d36bf5","actor_username":"crbcrafting@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-01 01:25:41.386961+00	
00000000-0000-0000-0000-000000000000	eed8136c-9dda-434b-9741-73440bfbc77f	{"action":"token_refreshed","actor_id":"3f2332c9-4f3f-45ed-9215-a65684d36bf5","actor_username":"crbcrafting@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-01 01:25:42.143406+00	
00000000-0000-0000-0000-000000000000	33736baf-7067-4783-be7f-4568c72621b9	{"action":"token_refreshed","actor_id":"3f2332c9-4f3f-45ed-9215-a65684d36bf5","actor_username":"crbcrafting@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-01 01:25:43.169905+00	
00000000-0000-0000-0000-000000000000	1b2061c6-803f-43d4-b05a-6ef152bba948	{"action":"token_refreshed","actor_id":"3f2332c9-4f3f-45ed-9215-a65684d36bf5","actor_username":"crbcrafting@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-01 02:33:13.053423+00	
00000000-0000-0000-0000-000000000000	a8be2428-8df9-4d90-8dac-41d8fcdbc762	{"action":"token_revoked","actor_id":"3f2332c9-4f3f-45ed-9215-a65684d36bf5","actor_username":"crbcrafting@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-01 02:33:13.062101+00	
00000000-0000-0000-0000-000000000000	7c7501d4-0582-4d7f-9f2b-deee7a7b3994	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-06-01 15:18:11.145234+00	
00000000-0000-0000-0000-000000000000	f3a25c22-0aaa-4f7a-818e-d459e6ecbec3	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-06-01 15:18:12.588377+00	
00000000-0000-0000-0000-000000000000	20baf194-d005-4b84-9b79-98b77d59938b	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-06-01 15:18:16.311425+00	
00000000-0000-0000-0000-000000000000	df9f172f-d6c8-42cf-ae57-f84f3572d170	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-06-01 15:18:16.911687+00	
00000000-0000-0000-0000-000000000000	cd3b866c-4b00-4da3-9cdf-7742f899fd6f	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-06-01 15:18:17.717501+00	
00000000-0000-0000-0000-000000000000	288df253-d111-4c98-b3e6-93c79ce09bf0	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-06-01 17:47:07.838508+00	
00000000-0000-0000-0000-000000000000	de99d50f-a0b8-4698-850c-7319051113a3	{"action":"token_revoked","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-06-01 17:47:07.841849+00	
00000000-0000-0000-0000-000000000000	3f6284c0-fb96-4ec1-ac07-fbfa21452bdc	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-06-02 04:45:13.616594+00	
00000000-0000-0000-0000-000000000000	2a5c8474-d84f-4c61-bee1-3853652f6434	{"action":"token_revoked","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-06-02 04:45:13.625982+00	
00000000-0000-0000-0000-000000000000	20fdd9f5-f3b7-49e0-80db-a250920591bd	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-06-02 04:45:15.130335+00	
00000000-0000-0000-0000-000000000000	a8e22a97-fe45-457d-9c31-c9b0c5c157c4	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-06-03 13:57:26.114274+00	
00000000-0000-0000-0000-000000000000	cae22766-e4c4-4779-b4fa-a8f8bc09d9bb	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-06-03 13:57:27.505732+00	
00000000-0000-0000-0000-000000000000	38e2fec6-51ed-4c04-b498-891ff756bc55	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-06-03 13:57:31.404075+00	
00000000-0000-0000-0000-000000000000	db68daa2-c748-4166-825b-29d63ecc027f	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-06-03 13:57:32.135452+00	
00000000-0000-0000-0000-000000000000	7dcf6e4b-4e4f-44cc-864e-ca0fd844c95a	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-06-03 13:57:32.152465+00	
00000000-0000-0000-0000-000000000000	78f29cfd-6bd5-4492-a5ca-695861968fd2	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-06-03 17:37:00.94871+00	
00000000-0000-0000-0000-000000000000	8f84a838-87d9-41fa-aa1d-95b9d0c0aaa3	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-06-03 17:37:35.222448+00	
00000000-0000-0000-0000-000000000000	4830bb48-c024-41c5-8ae9-62ee1014bc17	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-06-03 17:37:36.039791+00	
00000000-0000-0000-0000-000000000000	938e9196-7514-4947-8060-54ccb33a5877	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-06-03 17:37:36.052926+00	
00000000-0000-0000-0000-000000000000	66a01192-3813-485e-8869-0b8b5beb6a50	{"action":"user_confirmation_requested","actor_id":"dca1a8ab-6b8d-4e0a-a4d3-e28df4462192","actor_username":"unionweb619+24@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-06-03 17:37:36.204996+00	
00000000-0000-0000-0000-000000000000	20f08e47-c75f-4686-9024-5e85c485111d	{"action":"user_modified","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"user","traits":{"user_email":"unionweb619+24@gmail.com","user_id":"dca1a8ab-6b8d-4e0a-a4d3-e28df4462192","user_phone":""}}	2025-06-03 17:37:37.905576+00	
00000000-0000-0000-0000-000000000000	d426d880-4dd0-4b2b-9d2a-3982e33ea678	{"action":"user_signedup","actor_id":"dca1a8ab-6b8d-4e0a-a4d3-e28df4462192","actor_username":"unionweb619+24@gmail.com","actor_via_sso":false,"log_type":"team"}	2025-06-03 17:38:01.597266+00	
00000000-0000-0000-0000-000000000000	344f5478-aec9-4753-b987-ea3861e93a22	{"action":"login","actor_id":"dca1a8ab-6b8d-4e0a-a4d3-e28df4462192","actor_username":"unionweb619+24@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"email"}}	2025-06-03 17:38:05.840143+00	
00000000-0000-0000-0000-000000000000	d35b89e6-93b4-4114-a82d-d47e66e80f8a	{"action":"token_refreshed","actor_id":"dca1a8ab-6b8d-4e0a-a4d3-e28df4462192","actor_username":"unionweb619+24@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-03 19:06:40.934435+00	
00000000-0000-0000-0000-000000000000	fdd39a8a-cf89-4c3e-810d-719addf7faeb	{"action":"token_revoked","actor_id":"dca1a8ab-6b8d-4e0a-a4d3-e28df4462192","actor_username":"unionweb619+24@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-03 19:06:40.938635+00	
00000000-0000-0000-0000-000000000000	9dcdc585-03b1-4bdf-925a-be06d335fa64	{"action":"token_refreshed","actor_id":"dca1a8ab-6b8d-4e0a-a4d3-e28df4462192","actor_username":"unionweb619+24@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-03 19:06:42.320567+00	
00000000-0000-0000-0000-000000000000	133b6d36-2b71-4bd1-bad8-90069d055bbb	{"action":"token_refreshed","actor_id":"dca1a8ab-6b8d-4e0a-a4d3-e28df4462192","actor_username":"unionweb619+24@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-03 19:07:02.606834+00	
00000000-0000-0000-0000-000000000000	d4f7c9db-49ab-4dd8-8a61-8d288061d15e	{"action":"token_refreshed","actor_id":"dca1a8ab-6b8d-4e0a-a4d3-e28df4462192","actor_username":"unionweb619+24@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-03 19:07:23.021844+00	
00000000-0000-0000-0000-000000000000	66c32db9-8591-4fde-aec3-cacb9680aa95	{"action":"token_refreshed","actor_id":"dca1a8ab-6b8d-4e0a-a4d3-e28df4462192","actor_username":"unionweb619+24@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-03 19:07:31.291577+00	
00000000-0000-0000-0000-000000000000	6d138af0-9755-4166-8723-83c4e11e6d7b	{"action":"token_refreshed","actor_id":"dca1a8ab-6b8d-4e0a-a4d3-e28df4462192","actor_username":"unionweb619+24@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-03 19:07:39.42036+00	
00000000-0000-0000-0000-000000000000	e89f4c6f-7dfb-42ed-8d83-a5e12910a671	{"action":"token_refreshed","actor_id":"dca1a8ab-6b8d-4e0a-a4d3-e28df4462192","actor_username":"unionweb619+24@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-03 19:07:39.858892+00	
00000000-0000-0000-0000-000000000000	d24e246f-fcf4-4bd8-bb42-dfb9bf06740c	{"action":"token_refreshed","actor_id":"dca1a8ab-6b8d-4e0a-a4d3-e28df4462192","actor_username":"unionweb619+24@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-03 19:07:39.886585+00	
00000000-0000-0000-0000-000000000000	0a9da9fb-c7b8-4a66-91c6-23ad379d9ae0	{"action":"token_refreshed","actor_id":"dca1a8ab-6b8d-4e0a-a4d3-e28df4462192","actor_username":"unionweb619+24@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-03 19:07:53.800238+00	
00000000-0000-0000-0000-000000000000	d8e00253-a791-417f-af5e-8cd640751744	{"action":"token_refreshed","actor_id":"dca1a8ab-6b8d-4e0a-a4d3-e28df4462192","actor_username":"unionweb619+24@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-03 19:07:54.249133+00	
00000000-0000-0000-0000-000000000000	8f5c49de-9083-4829-9c96-69e4d3057d0b	{"action":"login","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-06-03 19:07:54.323228+00	
00000000-0000-0000-0000-000000000000	d9df7d49-d459-4e27-a7bf-079bb8b9d2c4	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-06-04 14:24:54.110941+00	
00000000-0000-0000-0000-000000000000	cc0fb7e2-1664-4cae-9e66-a1c102e7ca4b	{"action":"token_revoked","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-06-04 14:24:54.121746+00	
00000000-0000-0000-0000-000000000000	c6f2441d-9c9d-4887-91d5-296bd55a4c8e	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-06-04 16:30:11.912404+00	
00000000-0000-0000-0000-000000000000	f67e2c07-ff0b-4836-ac4c-3e1712c725bb	{"action":"token_revoked","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-06-04 16:30:11.916185+00	
00000000-0000-0000-0000-000000000000	ffc9ad3c-606f-45b0-95c7-4d8077af6b62	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-06-04 17:30:42.758479+00	
00000000-0000-0000-0000-000000000000	a5647670-37f2-4bff-aa21-69c5fc39449e	{"action":"token_revoked","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-06-04 17:30:42.76275+00	
00000000-0000-0000-0000-000000000000	efff19d0-e503-469d-9ac9-63a9f10edb82	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-06-08 19:59:40.030972+00	
00000000-0000-0000-0000-000000000000	c9620bc7-9494-41ce-8c5a-a67164e53558	{"action":"token_revoked","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-06-08 19:59:40.040704+00	
00000000-0000-0000-0000-000000000000	ae970555-a3e8-407a-a0c4-d28d902d70a0	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-06-08 19:59:41.507486+00	
00000000-0000-0000-0000-000000000000	5d75ba49-addf-41b1-9046-8e180bfa2d68	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-06-08 19:59:44.623277+00	
00000000-0000-0000-0000-000000000000	78756ba7-40ef-4e1b-af77-9403797bdac7	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-06-08 19:59:45.275142+00	
00000000-0000-0000-0000-000000000000	20bb3bff-7997-46eb-b194-4c20eb087140	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-06-08 19:59:45.303523+00	
00000000-0000-0000-0000-000000000000	844d229a-cdec-46d7-9c84-d13bad7ec5dd	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-06-08 19:59:57.588282+00	
00000000-0000-0000-0000-000000000000	99587075-d104-41e3-9ff2-6536e988efaa	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-06-08 19:59:57.980921+00	
00000000-0000-0000-0000-000000000000	9a111ab2-6ad7-422d-9d43-f1ecd33cf592	{"action":"login","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-06-08 19:59:58.081899+00	
00000000-0000-0000-0000-000000000000	8fc58ae1-b2f3-45eb-af30-f0d30129938e	{"action":"user_recovery_requested","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-07-01 14:36:47.598093+00	
00000000-0000-0000-0000-000000000000	21fe102e-d1a3-420b-8cf7-4e5892d93f73	{"action":"login","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-07-01 14:37:10.408286+00	
00000000-0000-0000-0000-000000000000	449959d9-5379-426f-87ca-d7383bece9e7	{"action":"user_updated_password","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-07-01 14:37:22.928262+00	
00000000-0000-0000-0000-000000000000	fb5e3920-2086-4393-b289-b84a83576814	{"action":"user_modified","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-07-01 14:37:22.928881+00	
00000000-0000-0000-0000-000000000000	d5baecb0-4787-4348-94d4-1e176d6ad28e	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-07-04 15:25:23.677871+00	
00000000-0000-0000-0000-000000000000	7425cfbb-27e4-45e5-932b-5451d0049aed	{"action":"token_revoked","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-07-04 15:25:23.688553+00	
00000000-0000-0000-0000-000000000000	4b4d5e12-7ff6-4e08-8e30-2231eef589dd	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-07-04 15:25:25.140863+00	
00000000-0000-0000-0000-000000000000	44a71c61-9508-40cb-8991-c82b8dd9a7f8	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-07-04 15:25:28.620958+00	
00000000-0000-0000-0000-000000000000	acb44ed2-3858-4979-af4b-e6353d0995fc	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-07-04 15:25:29.355412+00	
00000000-0000-0000-0000-000000000000	0eefc2c9-cf2b-4378-90f9-49e64655f463	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-07-04 15:25:29.40103+00	
00000000-0000-0000-0000-000000000000	04540be2-a82b-4ed1-b127-9a62d1c1a444	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-07-04 15:25:41.852212+00	
00000000-0000-0000-0000-000000000000	0e931921-39df-476c-809e-d5742c549a27	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-07-04 15:25:42.33063+00	
00000000-0000-0000-0000-000000000000	fc14cb23-2967-4cab-a763-2344d7d29c82	{"action":"login","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-07-04 15:25:42.405329+00	
00000000-0000-0000-0000-000000000000	3db81b1e-e87a-4657-8f1b-626d34a8052d	{"action":"logout","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"account"}	2025-07-04 15:26:08.348735+00	
00000000-0000-0000-0000-000000000000	99bcb7f6-8f56-4c51-97ff-9ecaf1738830	{"action":"user_confirmation_requested","actor_id":"99d864a8-cf28-40ae-82d5-d28fd8f8a10b","actor_username":"unionweb619+52@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-07-04 15:26:50.688988+00	
00000000-0000-0000-0000-000000000000	e8b81cd8-7046-43a2-9e4c-d3c8fd415093	{"action":"user_modified","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"user","traits":{"user_email":"unionweb619+52@gmail.com","user_id":"99d864a8-cf28-40ae-82d5-d28fd8f8a10b","user_phone":""}}	2025-07-04 15:26:52.064308+00	
00000000-0000-0000-0000-000000000000	0d430817-96eb-4e06-8a46-81c176fdadfb	{"action":"login","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-07-04 16:16:47.107602+00	
00000000-0000-0000-0000-000000000000	02d1985f-c137-4a14-8fa2-fa129cc71ac7	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-06 21:21:10.3933+00	
00000000-0000-0000-0000-000000000000	7058353c-78db-4c92-ac8a-784585cbfd2a	{"action":"token_revoked","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-06 21:21:10.405252+00	
00000000-0000-0000-0000-000000000000	0af85ad5-d296-466b-8f6b-15da68476c22	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-06 21:21:12.060674+00	
00000000-0000-0000-0000-000000000000	2a1aa32e-f419-40fd-ac0b-4f5b0a8164e2	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-06 21:21:12.088772+00	
00000000-0000-0000-0000-000000000000	03932f5c-db40-4ee1-ab0a-083ba48c46d3	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-06 21:21:13.167754+00	
00000000-0000-0000-0000-000000000000	95aeab42-72e6-4991-8d09-36e4b9569b89	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-08 04:28:23.666313+00	
00000000-0000-0000-0000-000000000000	fbc01604-fd38-4c6e-b797-635c1ef5e6f3	{"action":"token_revoked","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-08 04:28:23.678757+00	
00000000-0000-0000-0000-000000000000	f5e3c361-9242-4365-85ac-7f5430a9c054	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-08 04:28:25.333643+00	
00000000-0000-0000-0000-000000000000	6fd13dfa-8892-4437-adfc-0a1334c24e6c	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-08 04:28:25.358037+00	
00000000-0000-0000-0000-000000000000	ba559e31-63d4-4096-9a7c-e826e1eabbfe	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-12 15:24:40.167094+00	
00000000-0000-0000-0000-000000000000	a3d8693b-6342-4b3a-8f4c-c145ab06bd5e	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-12 15:24:41.886851+00	
00000000-0000-0000-0000-000000000000	9e958882-d83a-4429-948c-abc7cac726b5	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-12 15:24:41.900465+00	
00000000-0000-0000-0000-000000000000	cc2870e4-7403-459f-b29b-a3706a38bda4	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-12 15:24:46.50108+00	
00000000-0000-0000-0000-000000000000	5b454eac-4ac1-46d9-a79f-6a646982729a	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-15 16:05:47.981514+00	
00000000-0000-0000-0000-000000000000	a901f8f8-1798-42dc-8bc2-3e790fac8c7e	{"action":"token_revoked","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-15 16:05:47.994321+00	
00000000-0000-0000-0000-000000000000	e0f21aa2-285d-47a8-b137-12f8f9e08834	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-15 16:05:48.858102+00	
00000000-0000-0000-0000-000000000000	b71b03de-528c-4592-8968-f51c0c4cf48c	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-15 16:05:48.867707+00	
00000000-0000-0000-0000-000000000000	7e8177a6-6d0b-4a95-a2f0-37a0d340c934	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-15 16:05:49.372787+00	
00000000-0000-0000-0000-000000000000	44eb3d84-7bdb-4457-9eb9-3ffc4c9b4a08	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-15 16:05:49.726339+00	
00000000-0000-0000-0000-000000000000	576808d1-d9c8-4120-9127-801d9eb21c92	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-15 16:05:49.876435+00	
00000000-0000-0000-0000-000000000000	0a0d4a7b-8151-461c-b142-cd0591d9c8f5	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-15 16:05:50.646202+00	
00000000-0000-0000-0000-000000000000	b3967e3d-c732-40ed-b535-03c39b6daa26	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-20 05:51:26.375935+00	
00000000-0000-0000-0000-000000000000	e9f74577-4719-43fe-bba2-40026ac35a99	{"action":"token_revoked","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-20 05:51:26.38196+00	
00000000-0000-0000-0000-000000000000	da0c3985-4358-41de-a2d0-6efc0b9b4b1c	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-20 05:51:27.969168+00	
00000000-0000-0000-0000-000000000000	dfe0c5d3-a078-4733-a5c8-a1ed3b3cd58b	{"action":"token_refreshed","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-20 05:51:27.981166+00	
00000000-0000-0000-0000-000000000000	46a38a60-853b-4b03-9a2b-9c086357c51c	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-07-24 21:14:33.782631+00	
00000000-0000-0000-0000-000000000000	26dfba8f-95bf-4d29-a3af-820a34699924	{"action":"token_revoked","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-07-24 21:14:33.796399+00	
00000000-0000-0000-0000-000000000000	a124cd7e-72de-45fe-8b22-53da72ed5289	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-07-24 21:14:35.684349+00	
00000000-0000-0000-0000-000000000000	2ff341d6-268c-4679-b907-3a9045998dfe	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-07-24 21:14:39.250374+00	
00000000-0000-0000-0000-000000000000	ad5da19b-5dc0-4423-8129-1a2b2d80e823	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-07-24 21:14:39.902782+00	
00000000-0000-0000-0000-000000000000	ce4d28c3-27ee-4ddd-bf3f-5396fd95daf0	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-07-24 21:14:39.922554+00	
00000000-0000-0000-0000-000000000000	8883428b-7db6-4dff-9628-2757b9804b3d	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-07-24 21:14:44.028513+00	
00000000-0000-0000-0000-000000000000	c738fcb4-409c-4f3e-8308-564048437830	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-07-24 21:15:24.991322+00	
00000000-0000-0000-0000-000000000000	87469dd2-e627-4aeb-a8ef-75dbfe50c940	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-07-24 21:15:25.749781+00	
00000000-0000-0000-0000-000000000000	631e3db2-03a9-47fe-9b97-65a92a819915	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-07-24 21:15:25.766535+00	
00000000-0000-0000-0000-000000000000	6bc2c502-acb9-44bd-a8d5-1c82eaa4ece8	{"action":"user_confirmation_requested","actor_id":"0c89b7a9-692b-458b-b556-780cc4552188","actor_username":"unionweb619+55@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-07-24 21:15:25.914914+00	
00000000-0000-0000-0000-000000000000	19079b81-8d29-413e-9446-f8cf178e2955	{"action":"user_modified","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"user","traits":{"user_email":"unionweb619+55@gmail.com","user_id":"0c89b7a9-692b-458b-b556-780cc4552188","user_phone":""}}	2025-07-24 21:15:27.473727+00	
00000000-0000-0000-0000-000000000000	9499acfc-86e4-4e1c-a712-1bc8d8f9dfe3	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-07-25 16:24:42.442576+00	
00000000-0000-0000-0000-000000000000	0699e602-8418-413a-9e44-4e305bd9d803	{"action":"token_revoked","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-07-25 16:24:42.457583+00	
00000000-0000-0000-0000-000000000000	7722e862-a8ff-4ba9-b916-8e7f9151f7ae	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-07-25 16:24:44.039023+00	
00000000-0000-0000-0000-000000000000	8db3699b-59d2-4ea3-aa77-ef5409761654	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-07-25 16:25:30.634158+00	
00000000-0000-0000-0000-000000000000	27adfa6b-6682-406a-95c3-ad43644d7882	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-07-25 16:25:31.020691+00	
00000000-0000-0000-0000-000000000000	dced038d-4b76-4d0a-9265-5340b3b68406	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-07-25 16:25:35.594964+00	
00000000-0000-0000-0000-000000000000	10aedcff-664e-486b-94f6-9d028c8c560b	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-07-25 16:25:36.098589+00	
00000000-0000-0000-0000-000000000000	26a9f0c6-9f3a-482b-8b4b-e5fdaff01d5a	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-07-25 16:25:36.114013+00	
00000000-0000-0000-0000-000000000000	244b74e8-a545-450d-ad31-1142d400644d	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-07-25 16:25:39.537719+00	
00000000-0000-0000-0000-000000000000	d173e8c8-5f2b-4ec0-8047-00a0096ec101	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-07-25 16:27:39.454841+00	
00000000-0000-0000-0000-000000000000	16edb290-2d20-44b4-9d64-a745c33f1101	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-07-25 16:27:40.155638+00	
00000000-0000-0000-0000-000000000000	0e233eb9-a3ef-4de3-ab4d-f6e4d707b869	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-07-25 16:27:40.17618+00	
00000000-0000-0000-0000-000000000000	f48650ea-296a-493b-a6a8-d006b0404e65	{"action":"user_confirmation_requested","actor_id":"3651e1f8-d0c8-4675-8a2e-75d10cc4342f","actor_username":"taylor.brooks@petlover.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-07-25 16:27:40.312587+00	
00000000-0000-0000-0000-000000000000	8095400f-9826-436b-9a9c-7d61854479e5	{"action":"user_modified","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"user","traits":{"user_email":"taylor.brooks@petlover.com","user_id":"3651e1f8-d0c8-4675-8a2e-75d10cc4342f","user_phone":""}}	2025-07-25 16:27:41.62031+00	
00000000-0000-0000-0000-000000000000	c16909bb-85ae-41d7-a7b6-ee8a3e9e51d3	{"action":"user_signedup","actor_id":"3651e1f8-d0c8-4675-8a2e-75d10cc4342f","actor_username":"taylor.brooks@petlover.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-07-25 16:28:13.6145+00	
00000000-0000-0000-0000-000000000000	6387490e-ccc8-4ef5-9282-00eaddffb200	{"action":"login","actor_id":"3651e1f8-d0c8-4675-8a2e-75d10cc4342f","actor_username":"taylor.brooks@petlover.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"email"}}	2025-07-25 16:28:19.774521+00	
00000000-0000-0000-0000-000000000000	d0a7a12b-db95-488c-b503-a14a51da5fdb	{"action":"token_refreshed","actor_id":"3651e1f8-d0c8-4675-8a2e-75d10cc4342f","actor_username":"taylor.brooks@petlover.com","actor_via_sso":false,"log_type":"token"}	2025-07-29 13:48:09.066172+00	
00000000-0000-0000-0000-000000000000	8daef4d3-0f57-4424-83b0-c1ecbeb42407	{"action":"token_revoked","actor_id":"3651e1f8-d0c8-4675-8a2e-75d10cc4342f","actor_username":"taylor.brooks@petlover.com","actor_via_sso":false,"log_type":"token"}	2025-07-29 13:48:09.076316+00	
00000000-0000-0000-0000-000000000000	22465dfc-d533-44b8-b223-45ad1dc323a2	{"action":"token_refreshed","actor_id":"3651e1f8-d0c8-4675-8a2e-75d10cc4342f","actor_username":"taylor.brooks@petlover.com","actor_via_sso":false,"log_type":"token"}	2025-07-29 13:48:09.856126+00	
00000000-0000-0000-0000-000000000000	7c472aa1-2ede-4306-80e7-44bcd178b2cf	{"action":"token_refreshed","actor_id":"3651e1f8-d0c8-4675-8a2e-75d10cc4342f","actor_username":"taylor.brooks@petlover.com","actor_via_sso":false,"log_type":"token"}	2025-07-29 13:48:36.613746+00	
00000000-0000-0000-0000-000000000000	9227ba57-ee5e-461f-b245-10965e1c1021	{"action":"token_refreshed","actor_id":"3651e1f8-d0c8-4675-8a2e-75d10cc4342f","actor_username":"taylor.brooks@petlover.com","actor_via_sso":false,"log_type":"token"}	2025-07-29 13:48:37.303066+00	
00000000-0000-0000-0000-000000000000	19e18cdb-801f-4baa-a3c6-0aa8dc09bd6f	{"action":"token_refreshed","actor_id":"3651e1f8-d0c8-4675-8a2e-75d10cc4342f","actor_username":"taylor.brooks@petlover.com","actor_via_sso":false,"log_type":"token"}	2025-07-29 13:48:37.320702+00	
00000000-0000-0000-0000-000000000000	a8afbee3-6f5b-4843-8483-e390d615dfd4	{"action":"token_refreshed","actor_id":"3651e1f8-d0c8-4675-8a2e-75d10cc4342f","actor_username":"taylor.brooks@petlover.com","actor_via_sso":false,"log_type":"token"}	2025-07-29 13:48:41.320367+00	
00000000-0000-0000-0000-000000000000	dc8eb75c-7b1a-4ce3-bdc0-cd5032d7dff0	{"action":"token_refreshed","actor_id":"3651e1f8-d0c8-4675-8a2e-75d10cc4342f","actor_username":"taylor.brooks@petlover.com","actor_via_sso":false,"log_type":"token"}	2025-07-29 13:49:46.111001+00	
00000000-0000-0000-0000-000000000000	be5fb373-e464-41f7-b560-88f7be476190	{"action":"token_refreshed","actor_id":"3651e1f8-d0c8-4675-8a2e-75d10cc4342f","actor_username":"taylor.brooks@petlover.com","actor_via_sso":false,"log_type":"token"}	2025-07-29 13:49:46.588041+00	
00000000-0000-0000-0000-000000000000	12946f9b-89c2-4aac-85d3-7d8c9dddf9fd	{"action":"token_refreshed","actor_id":"3651e1f8-d0c8-4675-8a2e-75d10cc4342f","actor_username":"taylor.brooks@petlover.com","actor_via_sso":false,"log_type":"token"}	2025-07-29 13:49:46.744251+00	
00000000-0000-0000-0000-000000000000	d7e3d253-95e8-4a13-8534-b77bd3f15e34	{"action":"user_confirmation_requested","actor_id":"cd26ec36-fc54-4623-a7d6-5ca4dcd7853e","actor_username":"unionweb619+61@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-07-29 13:49:46.905041+00	
00000000-0000-0000-0000-000000000000	161485f6-9fda-4843-a8bf-aac22bbbe3f8	{"action":"user_modified","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"user","traits":{"user_email":"unionweb619+61@gmail.com","user_id":"cd26ec36-fc54-4623-a7d6-5ca4dcd7853e","user_phone":""}}	2025-07-29 13:49:48.246563+00	
00000000-0000-0000-0000-000000000000	02cf16a7-b3a2-4d2f-81ce-a5ff611eefc6	{"action":"user_signedup","actor_id":"cd26ec36-fc54-4623-a7d6-5ca4dcd7853e","actor_username":"unionweb619+61@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-07-29 13:50:22.13328+00	
00000000-0000-0000-0000-000000000000	e2c70aa9-7653-453c-849b-4c7c979f2b8b	{"action":"login","actor_id":"cd26ec36-fc54-4623-a7d6-5ca4dcd7853e","actor_username":"unionweb619+61@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"email"}}	2025-07-29 13:50:24.003232+00	
00000000-0000-0000-0000-000000000000	2fc699e5-273e-4d82-9eda-ef0e2bc11ba3	{"action":"token_refreshed","actor_id":"cd26ec36-fc54-4623-a7d6-5ca4dcd7853e","actor_username":"unionweb619+61@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-31 21:08:01.135462+00	
00000000-0000-0000-0000-000000000000	b4f4fa6e-bbdb-4aef-a3bc-f6ef205712f9	{"action":"token_revoked","actor_id":"cd26ec36-fc54-4623-a7d6-5ca4dcd7853e","actor_username":"unionweb619+61@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-31 21:08:01.15572+00	
00000000-0000-0000-0000-000000000000	5e8e44db-5b0e-42e6-9d20-d82c77cc26e6	{"action":"token_refreshed","actor_id":"cd26ec36-fc54-4623-a7d6-5ca4dcd7853e","actor_username":"unionweb619+61@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-31 21:08:03.042727+00	
00000000-0000-0000-0000-000000000000	ed899e9c-cfcc-4a0e-8823-1730a16bbe4b	{"action":"token_refreshed","actor_id":"cd26ec36-fc54-4623-a7d6-5ca4dcd7853e","actor_username":"unionweb619+61@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-31 21:15:35.4873+00	
00000000-0000-0000-0000-000000000000	6ba72e09-d27e-4f44-b3c8-901d7a093510	{"action":"token_refreshed","actor_id":"cd26ec36-fc54-4623-a7d6-5ca4dcd7853e","actor_username":"unionweb619+61@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-31 21:15:37.213207+00	
00000000-0000-0000-0000-000000000000	aaefc1c4-9ea1-4fc4-9c60-7d89219d5bbb	{"action":"token_refreshed","actor_id":"cd26ec36-fc54-4623-a7d6-5ca4dcd7853e","actor_username":"unionweb619+61@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-31 21:15:37.238132+00	
00000000-0000-0000-0000-000000000000	28269590-ab8f-46b9-a486-c7df8d69db48	{"action":"token_refreshed","actor_id":"cd26ec36-fc54-4623-a7d6-5ca4dcd7853e","actor_username":"unionweb619+61@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-31 21:15:50.768934+00	
00000000-0000-0000-0000-000000000000	3eac95fd-9d73-4f09-b434-b548c2ba42e8	{"action":"token_refreshed","actor_id":"cd26ec36-fc54-4623-a7d6-5ca4dcd7853e","actor_username":"unionweb619+61@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-31 21:15:51.462441+00	
00000000-0000-0000-0000-000000000000	98240324-a6d0-4b3d-8a2a-2c677eb867ba	{"action":"login","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-07-31 21:16:16.932724+00	
00000000-0000-0000-0000-000000000000	d8b34cbd-aa01-4b65-b549-0eb2ad81c4e6	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-08-05 22:17:14.87893+00	
00000000-0000-0000-0000-000000000000	c503e818-ca33-42ff-948e-ff8d85f31fe5	{"action":"token_revoked","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-08-05 22:17:14.905074+00	
00000000-0000-0000-0000-000000000000	60599707-d148-43c2-8d0a-df8ab63912ce	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-08-05 22:17:16.764111+00	
00000000-0000-0000-0000-000000000000	7943eb7b-2d18-4a9d-8c5f-0632c7c3ccd0	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-08-05 22:17:16.982638+00	
00000000-0000-0000-0000-000000000000	ec0effca-1860-4a09-8640-f12233530ff2	{"action":"token_refreshed","actor_id":"9622ec62-4edb-4c3d-ba47-d9f7b78b098e","actor_username":"rick@rickbays.com","actor_via_sso":false,"log_type":"token"}	2025-08-05 22:17:17.519054+00	
00000000-0000-0000-0000-000000000000	8dcd1a15-e027-4b4f-ba70-30023a71335d	{"action":"token_refreshed","actor_id":"3f2332c9-4f3f-45ed-9215-a65684d36bf5","actor_username":"crbcrafting@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-15 01:40:45.52202+00	
00000000-0000-0000-0000-000000000000	3b86e14b-f1a2-4b42-a5c1-73e0d5a37797	{"action":"token_revoked","actor_id":"3f2332c9-4f3f-45ed-9215-a65684d36bf5","actor_username":"crbcrafting@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-15 01:40:45.547215+00	
00000000-0000-0000-0000-000000000000	483bc8ee-eade-4e98-aa59-7244d4359b75	{"action":"token_refreshed","actor_id":"3f2332c9-4f3f-45ed-9215-a65684d36bf5","actor_username":"crbcrafting@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-15 01:40:47.412043+00	
00000000-0000-0000-0000-000000000000	38c8539b-a9da-4638-8875-8c310beabf9f	{"action":"login","actor_id":"8b883958-ffca-4f06-860f-b73753f4a1c8","actor_username":"smiiith@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-09-07 18:42:21.029427+00	
00000000-0000-0000-0000-000000000000	60bed167-1c2d-4087-a24d-2d24feda0901	{"action":"login","actor_id":"2a6c6985-d71f-4805-951e-9c1e76e3975f","actor_username":"jason_e_halstead@yahoo.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-09-19 23:36:22.750757+00	
\.


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.flow_state (id, user_id, auth_code, code_challenge_method, code_challenge, provider_type, provider_access_token, provider_refresh_token, created_at, updated_at, authentication_method, auth_code_issued_at) FROM stdin;
0d8b6da7-76dd-4a17-8c2f-be5a6b66da07	68a16476-3bdb-40ea-90f4-c308b391c259	b51d9db5-e905-4b8e-97f6-8ec61bc73a73	s256	79RCUxnLoSiIv2rXCxWNWxm5o-_NaFM_FCMuadR1eHo	email			2025-04-25 04:33:53.83794+00	2025-04-25 04:34:53.770378+00	email/signup	2025-04-25 04:34:53.77034+00
2bbbaacf-1893-4570-acb8-31d3d3e491e8	9ac57477-e774-46cb-a6a1-f5c919540240	89db80cd-e39c-4a0c-a274-8b517e949c0e	s256	ZgaECKfBS_9SS2hB7ekgfo-a6PtabhiGQObn5JHh4BQ	email			2025-04-26 18:56:16.605207+00	2025-04-26 18:56:37.118675+00	email/signup	2025-04-26 18:56:37.118636+00
6a138c55-a3b3-4c5d-aa21-bcb485178c0c	00045f36-09ab-4733-a579-ce5bda77e7ec	f5aada9b-07b9-492a-a1b2-e0c75090a438	s256	jXZRIpj6-3AG29CNsOW09Mc_NbgunCssqf0kT4Hanf0	email			2025-04-26 19:26:15.619833+00	2025-04-26 19:26:32.457513+00	email/signup	2025-04-26 19:26:32.457475+00
12271f69-fe90-497d-b4dd-065e741953ef	8b883958-ffca-4f06-860f-b73753f4a1c8	0d43e912-86d8-40c6-90ce-ae5c80b8f121	s256	k06bDcDZXAbVwjO6QQc5b_ryTuT5ykde7jOJgkd2PHE	email			2025-04-26 19:55:28.838745+00	2025-04-26 19:56:07.70671+00	email/signup	2025-04-26 19:56:07.706671+00
06f9bff5-31f3-4d41-9c81-b36b54c8264d	2d28824e-7da2-4f94-86c8-c169fbb17f14	e6366291-b3e0-44ef-b673-68bcdde5a709	s256	W1c95vQR8ExFwafunjBT3Q72rPdpxsuvs9se5WQyZKM	email			2025-04-26 20:03:31.131982+00	2025-04-26 20:04:31.864309+00	email/signup	2025-04-26 20:04:31.864275+00
ef9cdc91-280d-4159-a49a-2d5d37701ae2	9622ec62-4edb-4c3d-ba47-d9f7b78b098e	0935169e-78ae-40c6-92fa-fc782be469d3	s256	o_kD3Sx0DkkmzoxyDocdxjCSVPxdeOF5Km_XdLqHB1A	email			2025-04-27 04:27:02.839766+00	2025-04-27 04:27:24.800069+00	email/signup	2025-04-27 04:27:24.800032+00
bf0e6093-6fba-4ba3-81b7-d6c56be7a978	9622ec62-4edb-4c3d-ba47-d9f7b78b098e	b3204f1d-6f80-434c-8c9f-221dce88133c	s256	KNzm6EW6SxPtfseRnsa6II37Nw5q7LOw2D3N8D7w5qM	recovery			2025-05-04 14:53:08.557827+00	2025-05-04 14:53:46.120576+00	recovery	2025-05-04 14:53:46.120538+00
ff976d63-fd68-4629-b932-b644ab06f1c8	8b883958-ffca-4f06-860f-b73753f4a1c8	635a18ab-fbd1-4422-bdb5-83adcfd2f339	s256	zakl8NB8AZNI8mCzWQ3JZP5vSQo6l-iH33yLpWQUcjU	recovery			2025-05-06 05:08:11.663793+00	2025-05-06 05:13:39.055233+00	recovery	2025-05-06 05:13:39.055191+00
193c6a5f-d8b0-45e4-8bb8-df8ed87300e4	8b883958-ffca-4f06-860f-b73753f4a1c8	ea86f0e7-f0ba-4062-b08c-3da425135efb	s256	gT7MwgnBYFUolgbS266WWlrLZuSuC2VB5i16alUb0L8	recovery			2025-05-06 05:17:17.572472+00	2025-05-06 05:17:17.572472+00	recovery	\N
65ea7fa6-a5b6-4f81-b337-725d055bd304	7a15b080-dee4-4cfd-b5e3-b82c5ac51ec6	d9806705-adc4-4a0b-b6e1-6c68921d2f37	s256	Jgv-Sti1tda7d7wScsDWyeQzeAR_pBRZ4rTtTCKIPF8	email			2025-05-07 03:38:49.106978+00	2025-05-07 03:38:49.106978+00	email/signup	\N
c76bf531-c0e3-4ae4-bd2b-c3c6590616c0	7a15b080-dee4-4cfd-b5e3-b82c5ac51ec6	aae7f38c-5ee7-49fd-b9ae-ee2579605dfe	s256	DHJD36Cvh8-IDq4HDS-eD6Y4MotWXW6QBm1Zc1j6nSI	email			2025-05-07 03:45:52.849032+00	2025-05-07 03:46:09.400787+00	email/signup	2025-05-07 03:46:09.400751+00
de3ab6f7-dab1-4d8d-bb74-f2b82dd3ad31	8b883958-ffca-4f06-860f-b73753f4a1c8	5bb17686-29a1-4877-b294-d73b0ab6ee64	s256	T79coxl4y3JbGH_IwJk0cwbnckuFqZub4zY8FZ3JFxU	recovery			2025-05-07 03:54:12.537726+00	2025-05-07 03:54:12.537726+00	recovery	\N
081ffc40-b624-46b6-9fa5-001b197f6455	8b883958-ffca-4f06-860f-b73753f4a1c8	f726f9ed-106a-45ff-a7aa-2946cfaf78bf	s256	GoALJounLS_RXTWoFObVzJYrbiBJC6krtjfq9Tfpqqc	recovery			2025-05-07 04:22:55.852148+00	2025-05-07 04:22:55.852148+00	recovery	\N
f348b850-bd5b-4e4f-9d40-a4db95af0f9f	9d09ce16-014e-4e6b-bf29-9569bea73610	04bf3c9b-d738-41d1-9c53-363c58f78380	s256	dyxdaMQvRiEFXPShWNzQPrwHO2kOVGPt5is86Jpc5l4	email			2025-05-07 14:36:02.642714+00	2025-05-07 14:37:23.169245+00	email/signup	2025-05-07 14:37:23.169208+00
41606c5f-83d3-4d17-9900-6d11ef47292b	01294339-df5d-448c-b6f9-ad9980ea25c9	7e2ef957-c31d-410d-aa68-746de22a2951	s256	PKV3ByozJ2ocxjlKcH3Eoht_ZYZvGGtuXd2jitACAOA	email			2025-05-08 15:08:12.565673+00	2025-05-08 15:08:35.471601+00	email/signup	2025-05-08 15:08:35.471557+00
ec6010dd-f2b5-433c-b704-4e18d4803736	2a6c6985-d71f-4805-951e-9c1e76e3975f	d78c0288-a235-4ad8-aad6-469c3651e668	s256	j_s8xK70AM-zLFt7QVXxo6P_FW2ulylGOa-37UljjZE	email			2025-05-10 13:19:41.624153+00	2025-05-10 19:22:06.639227+00	email/signup	2025-05-10 19:22:06.639188+00
df23e003-5ef4-4ea5-927e-655943334561	3f2332c9-4f3f-45ed-9215-a65684d36bf5	15161b5b-765c-4f06-8e3e-62b03e4517af	s256	CDcPO-k1LXVovO7Qt97tOHsiwca7S5zQbovMRyrSoGY	email			2025-05-11 00:43:04.631908+00	2025-05-11 00:44:17.714371+00	email/signup	2025-05-11 00:44:17.714332+00
5629e67c-f74c-4a9b-a4c9-161907b1b193	d0418bd1-e5e0-413e-9696-17d1e34556b3	c30aec0e-e9fc-4818-b541-7a8c03e2bc93	s256	ThOpFn01iplXRt8WdDJvNIjyQXuoeNJG0In0drlr-Ag	email			2025-05-11 02:19:43.902785+00	2025-05-11 02:20:02.646554+00	email/signup	2025-05-11 02:20:02.646516+00
a61c9a99-2403-41a2-a2c5-ff80523e6559	3d6ec7f6-350e-467f-9178-6fa595bab52e	c398faf3-2537-4c23-915d-1468ad54b029	s256	clvmBI9boY85nKStcV33i6Abgt6XEVS8il6Rraj0TpI	email			2025-05-11 14:35:27.477537+00	2025-05-11 14:35:45.723278+00	email/signup	2025-05-11 14:35:45.723234+00
918e5abc-f73f-461e-8976-b7dec76c3d05	3d6ec7f6-350e-467f-9178-6fa595bab52e	a86059cd-3c2b-4e5f-87c6-975321d9d5df	s256	9VWqyM7VVGsYSfJrdiHcqjYd0KwMA3soVLx8SM1CVPw	recovery			2025-05-11 14:36:59.091989+00	2025-05-11 14:36:59.091989+00	recovery	\N
fc44d3f8-8483-48be-b835-5c57c4fd0538	e151c236-9a85-4de3-ba10-56d0ffe2feb2	5e50c716-d255-4d20-ad3b-527bf800ebef	s256	ojsC099-R6R9QUropw-dx4n-6zdMdHEj2bUkLIA_mD0	email			2025-05-12 21:44:10.658226+00	2025-05-12 21:44:34.200236+00	email/signup	2025-05-12 21:44:34.199935+00
1b54fa9e-9f0c-4159-805a-d56341c3dbb6	7def9335-8114-4b71-b5f3-8194b8f1cac8	38d9226a-485c-4eb1-9167-f925e8f6a0bf	s256	rPgg4rcaYExSny3nhb8eN555Nm5e0cw_E61ZB869yVk	email			2025-05-14 20:13:42.775407+00	2025-05-14 20:14:35.848705+00	email/signup	2025-05-14 20:14:35.848668+00
82abdd1c-23f0-4324-8eca-ddd026c33054	2c7f34a4-2893-48c3-b552-3e505a9c2135	0997f9e3-53b8-4d17-b7fa-6914e7fa4b55	s256	p6kGqfuo_ZA0dn3tw5s2-HRxgiDrQlRSecGv9jEyA2w	email			2025-05-15 00:07:14.249679+00	2025-05-15 00:07:31.699747+00	email/signup	2025-05-15 00:07:31.699711+00
d58756da-1119-4ef3-a307-ddc2d3374ad7	956aca82-f8e9-462d-aaa8-8c78af551e96	376c6650-17e7-4358-a3e9-13b6c881fe13	s256	zg3WYT2ul84Gh_BsvFABqPpN1MhU2j1Lmea3s21hYKk	email			2025-05-15 00:09:42.077415+00	2025-05-15 00:13:07.402074+00	email/signup	2025-05-15 00:13:07.402038+00
e681ba7d-5c08-42ee-960d-f13841fc865f	8b883958-ffca-4f06-860f-b73753f4a1c8	de83ab1d-a200-42ad-ab9c-ab1df31bea26	s256	bUL5lk5ZoPYO0L_YOsbEJ9rHC0akKfVOue_4t2O5htA	recovery			2025-07-01 14:36:47.576634+00	2025-07-01 14:36:47.576634+00	recovery	\N
e15f1a38-9c81-4346-966b-fce22cd19973	99d864a8-cf28-40ae-82d5-d28fd8f8a10b	66b42f8c-2e14-467a-9276-cf604d359b1a	s256	KxkbBYbk90RsM6_OXnT0xEhMRQuY6a8FHLRPvcga9-c	email			2025-07-04 15:26:50.690223+00	2025-07-04 15:26:50.690223+00	email/signup	\N
6557101d-2924-4fcb-b9f7-7562eb3f75b1	0c89b7a9-692b-458b-b556-780cc4552188	0ae773fa-a006-4d9f-9c13-bc0f8d18babf	s256	YIY-G2lLe_oiDqkK2VsnowK6ilaZeZenVgyfRr62oR0	email			2025-07-24 21:15:25.915839+00	2025-07-24 21:15:25.915839+00	email/signup	\N
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) FROM stdin;
d0418bd1-e5e0-413e-9696-17d1e34556b3	d0418bd1-e5e0-413e-9696-17d1e34556b3	{"sub": "d0418bd1-e5e0-413e-9696-17d1e34556b3", "email": "patopropertiestn@gmail.com", "email_verified": true, "phone_verified": false}	email	2025-05-11 02:19:43.8951+00	2025-05-11 02:19:43.895151+00	2025-05-11 02:19:43.895151+00	7c388778-19c0-4167-910e-4dd020d3ebb8
3d6ec7f6-350e-467f-9178-6fa595bab52e	3d6ec7f6-350e-467f-9178-6fa595bab52e	{"sub": "3d6ec7f6-350e-467f-9178-6fa595bab52e", "email": "keytfarinas@gmail.com", "email_verified": true, "phone_verified": false}	email	2025-05-11 14:35:27.471321+00	2025-05-11 14:35:27.471416+00	2025-05-11 14:35:27.471416+00	e1658cf4-dce9-4608-aaad-c74befaa51d4
8b883958-ffca-4f06-860f-b73753f4a1c8	8b883958-ffca-4f06-860f-b73753f4a1c8	{"sub": "8b883958-ffca-4f06-860f-b73753f4a1c8", "email": "smiiith@gmail.com", "email_verified": true, "phone_verified": false}	email	2025-04-26 19:55:28.834433+00	2025-04-26 19:55:28.834482+00	2025-04-26 19:55:28.834482+00	6a6b8f54-324b-4f09-bf9c-77238d378a5f
2d28824e-7da2-4f94-86c8-c169fbb17f14	2d28824e-7da2-4f94-86c8-c169fbb17f14	{"sub": "2d28824e-7da2-4f94-86c8-c169fbb17f14", "email": "smiiith+2@gmail.com", "email_verified": true, "phone_verified": false}	email	2025-04-26 20:03:31.127326+00	2025-04-26 20:03:31.127372+00	2025-04-26 20:03:31.127372+00	483daaae-87b8-401b-9b19-e14665405423
9622ec62-4edb-4c3d-ba47-d9f7b78b098e	9622ec62-4edb-4c3d-ba47-d9f7b78b098e	{"sub": "9622ec62-4edb-4c3d-ba47-d9f7b78b098e", "email": "rick@rickbays.com", "email_verified": true, "phone_verified": false}	email	2025-04-27 04:27:02.82987+00	2025-04-27 04:27:02.829917+00	2025-04-27 04:27:02.829917+00	f79fa9c4-0596-49c9-9d48-26cc37ad8575
7a15b080-dee4-4cfd-b5e3-b82c5ac51ec6	7a15b080-dee4-4cfd-b5e3-b82c5ac51ec6	{"sub": "7a15b080-dee4-4cfd-b5e3-b82c5ac51ec6", "email": "smiiith+16@gmail.com", "email_verified": true, "phone_verified": false}	email	2025-05-07 03:38:49.100255+00	2025-05-07 03:38:49.100313+00	2025-05-07 03:38:49.100313+00	2988bfb3-03d9-4973-a1b1-1e6f75fac9ac
9d09ce16-014e-4e6b-bf29-9569bea73610	9d09ce16-014e-4e6b-bf29-9569bea73610	{"sub": "9d09ce16-014e-4e6b-bf29-9569bea73610", "email": "unionweb619+8@gmail.com", "email_verified": true, "phone_verified": false}	email	2025-05-07 14:36:02.635009+00	2025-05-07 14:36:02.635076+00	2025-05-07 14:36:02.635076+00	ecb562d8-6eaa-48bb-b6d9-0e62f5469d4a
01294339-df5d-448c-b6f9-ad9980ea25c9	01294339-df5d-448c-b6f9-ad9980ea25c9	{"sub": "01294339-df5d-448c-b6f9-ad9980ea25c9", "email": "georgia@hunterholidays.com.au", "email_verified": true, "phone_verified": false}	email	2025-05-08 15:08:12.550551+00	2025-05-08 15:08:12.550607+00	2025-05-08 15:08:12.550607+00	2156bc4d-5e9f-4aea-bdd3-7854a927c481
2a6c6985-d71f-4805-951e-9c1e76e3975f	2a6c6985-d71f-4805-951e-9c1e76e3975f	{"sub": "2a6c6985-d71f-4805-951e-9c1e76e3975f", "email": "jason_e_halstead@yahoo.com", "email_verified": true, "phone_verified": false}	email	2025-05-10 13:19:41.614662+00	2025-05-10 13:19:41.614712+00	2025-05-10 13:19:41.614712+00	563d17ed-79f7-426e-88c2-34548beff6e0
3f2332c9-4f3f-45ed-9215-a65684d36bf5	3f2332c9-4f3f-45ed-9215-a65684d36bf5	{"sub": "3f2332c9-4f3f-45ed-9215-a65684d36bf5", "email": "crbcrafting@gmail.com", "email_verified": true, "phone_verified": false}	email	2025-05-11 00:43:04.622281+00	2025-05-11 00:43:04.622337+00	2025-05-11 00:43:04.622337+00	18ff0908-181e-4d0b-9d85-6aaa43bc803a
e151c236-9a85-4de3-ba10-56d0ffe2feb2	e151c236-9a85-4de3-ba10-56d0ffe2feb2	{"sub": "e151c236-9a85-4de3-ba10-56d0ffe2feb2", "email": "billndimoll@msn.com", "email_verified": true, "phone_verified": false}	email	2025-05-12 21:44:10.649329+00	2025-05-12 21:44:10.649387+00	2025-05-12 21:44:10.649387+00	02aa35b5-aadb-43c2-a665-bdd1bbc5ce75
7def9335-8114-4b71-b5f3-8194b8f1cac8	7def9335-8114-4b71-b5f3-8194b8f1cac8	{"sub": "7def9335-8114-4b71-b5f3-8194b8f1cac8", "email": "unionweb619+10@gmail.com", "email_verified": true, "phone_verified": false}	email	2025-05-14 20:13:42.766684+00	2025-05-14 20:13:42.76674+00	2025-05-14 20:13:42.76674+00	4ca258b2-17cb-45fc-9f05-9fa6d51467e2
2c7f34a4-2893-48c3-b552-3e505a9c2135	2c7f34a4-2893-48c3-b552-3e505a9c2135	{"sub": "2c7f34a4-2893-48c3-b552-3e505a9c2135", "email": "smiiith+3@gmail.com", "email_verified": true, "phone_verified": false}	email	2025-05-15 00:07:14.245195+00	2025-05-15 00:07:14.245244+00	2025-05-15 00:07:14.245244+00	ecb7c55f-f2c7-4198-a99c-cd7c8d5ed8b5
956aca82-f8e9-462d-aaa8-8c78af551e96	956aca82-f8e9-462d-aaa8-8c78af551e96	{"sub": "956aca82-f8e9-462d-aaa8-8c78af551e96", "email": "smiiith+4@gmail.com", "email_verified": true, "phone_verified": false}	email	2025-05-15 00:09:42.072637+00	2025-05-15 00:09:42.072683+00	2025-05-15 00:09:42.072683+00	6b849ee2-2531-4822-907b-6d1b91bec03f
1f04962f-9175-4935-a985-bf47c694a262	1f04962f-9175-4935-a985-bf47c694a262	{"sub": "1f04962f-9175-4935-a985-bf47c694a262", "email": "smiiith+5@gmail.com", "email_verified": true, "phone_verified": false}	email	2025-05-15 00:13:34.15936+00	2025-05-15 00:13:34.159408+00	2025-05-15 00:13:34.159408+00	cdac0e9e-9575-4441-b4b3-100da2c7da1e
8c9a07f9-6d75-4144-a987-c5a9e7e500ea	8c9a07f9-6d75-4144-a987-c5a9e7e500ea	{"sub": "8c9a07f9-6d75-4144-a987-c5a9e7e500ea", "email": "unionweb619+11@gmail.com", "email_verified": true, "phone_verified": false}	email	2025-05-15 04:21:47.886401+00	2025-05-15 04:21:47.886456+00	2025-05-15 04:21:47.886456+00	a4396e64-551b-44af-9e06-6e6e8ccaa694
dca1a8ab-6b8d-4e0a-a4d3-e28df4462192	dca1a8ab-6b8d-4e0a-a4d3-e28df4462192	{"sub": "dca1a8ab-6b8d-4e0a-a4d3-e28df4462192", "email": "unionweb619+24@gmail.com", "email_verified": true, "phone_verified": false}	email	2025-06-03 17:37:36.201024+00	2025-06-03 17:37:36.20108+00	2025-06-03 17:37:36.20108+00	1570ea35-9320-46fd-97bb-312ed9bb4ce8
99d864a8-cf28-40ae-82d5-d28fd8f8a10b	99d864a8-cf28-40ae-82d5-d28fd8f8a10b	{"sub": "99d864a8-cf28-40ae-82d5-d28fd8f8a10b", "email": "unionweb619+52@gmail.com", "email_verified": false, "phone_verified": false}	email	2025-07-04 15:26:50.682797+00	2025-07-04 15:26:50.682866+00	2025-07-04 15:26:50.682866+00	57663464-d12a-4485-bbce-fa0cedb91a8f
0c89b7a9-692b-458b-b556-780cc4552188	0c89b7a9-692b-458b-b556-780cc4552188	{"sub": "0c89b7a9-692b-458b-b556-780cc4552188", "email": "unionweb619+55@gmail.com", "email_verified": false, "phone_verified": false}	email	2025-07-24 21:15:25.908274+00	2025-07-24 21:15:25.908345+00	2025-07-24 21:15:25.908345+00	bd973fee-ceea-46b5-9792-8f4cbbb33824
3651e1f8-d0c8-4675-8a2e-75d10cc4342f	3651e1f8-d0c8-4675-8a2e-75d10cc4342f	{"sub": "3651e1f8-d0c8-4675-8a2e-75d10cc4342f", "email": "taylor.brooks@petlover.com", "email_verified": true, "phone_verified": false}	email	2025-07-25 16:27:40.30769+00	2025-07-25 16:27:40.307739+00	2025-07-25 16:27:40.307739+00	4233c524-92c6-4615-90ca-11d39b57ca52
cd26ec36-fc54-4623-a7d6-5ca4dcd7853e	cd26ec36-fc54-4623-a7d6-5ca4dcd7853e	{"sub": "cd26ec36-fc54-4623-a7d6-5ca4dcd7853e", "email": "unionweb619+61@gmail.com", "email_verified": true, "phone_verified": false}	email	2025-07-29 13:49:46.89569+00	2025-07-29 13:49:46.895744+00	2025-07-29 13:49:46.895744+00	d388f995-c94b-43d4-9686-811ba789ebaa
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.instances (id, uuid, raw_base_config, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) FROM stdin;
88973c9b-df99-4c97-836d-e7edef63a29d	2025-05-07 14:37:47.783345+00	2025-05-07 14:37:47.783345+00	password	a0cb2149-f399-4cc3-bccb-14c95fcc6904
32584432-9a8b-42c8-918d-4973e62caa01	2025-05-10 19:23:25.846657+00	2025-05-10 19:23:25.846657+00	password	8f2c30db-6ffe-433a-a278-6b5fed7e7fbb
4bf945c8-73a9-4d84-acdd-26d8189ecbc1	2025-05-11 00:44:33.300102+00	2025-05-11 00:44:33.300102+00	password	7a0cbcbb-5ce9-4d10-8359-c2098d1e4958
bb99b5ea-edb1-43e9-a4b9-71c7034bd5fb	2025-05-11 02:20:09.3982+00	2025-05-11 02:20:09.3982+00	password	545c547e-68da-42e3-9afb-a749f3e55e3d
d901e618-6f0c-4323-9dfe-e60ea1604c11	2025-05-11 02:20:11.264094+00	2025-05-11 02:20:11.264094+00	password	ab0c1c4e-21db-490c-badf-49f59923333d
df3009e5-68c2-41e1-8150-44fe44b25dab	2025-05-11 03:03:36.298684+00	2025-05-11 03:03:36.298684+00	password	8698e114-48bd-425f-988a-70d7aa1f7c2d
8a3e0f11-c975-4009-8abe-02aa36a11e32	2025-05-11 03:03:38.703872+00	2025-05-11 03:03:38.703872+00	password	8cc8fd80-bcdc-4e0f-9bf1-6b64c0275610
0e05094d-ca4c-49b5-bc8b-1e95b30396ed	2025-05-11 14:37:16.255098+00	2025-05-11 14:37:16.255098+00	otp	63a05c8d-8600-47d7-a04f-2729fe1da6eb
97b0767c-5955-4d4d-8ab3-5f1589346fd1	2025-05-12 21:45:43.555506+00	2025-05-12 21:45:43.555506+00	password	d35a0f30-514a-4f20-86d8-600a34dc0979
a5ae7d69-363b-47d5-8cd5-2f3f1b86a8a6	2025-05-15 00:14:49.435929+00	2025-05-15 00:14:49.435929+00	email/signup	8647f8db-eda8-4a06-9459-b84cc2d9a49c
c7e29ac6-333a-400a-8859-01038105df5f	2025-05-15 04:22:07.518198+00	2025-05-15 04:22:07.518198+00	email/signup	1998352b-1c4e-41bd-92f1-035bf2ca5cb5
aaee57dc-bca9-4dde-9014-fc15a789a55b	2025-05-26 04:13:40.450926+00	2025-05-26 04:13:40.450926+00	password	2a9fa495-d503-4bf1-874b-1f34ad914548
216306fb-5815-4f5b-807d-f9ab1d571243	2025-06-03 17:38:05.862937+00	2025-06-03 17:38:05.862937+00	email/signup	382ecf50-786b-4429-b86d-3d23ddf3f748
e6364d62-0e3d-4138-8b33-067fb29f33f7	2025-07-01 14:37:10.444417+00	2025-07-01 14:37:10.444417+00	otp	40c47f7f-3313-484b-a2c6-86457d7750b3
657fdfd8-14b0-4fba-ab5a-391fad08df26	2025-07-04 16:16:47.116473+00	2025-07-04 16:16:47.116473+00	password	bfc02f64-6f17-4e9f-8353-bb6925b25364
9279ad01-9754-4628-9da7-2e750755a56c	2025-07-25 16:28:19.782628+00	2025-07-25 16:28:19.782628+00	email/signup	02fbd96b-87ad-4e11-93f3-0c9fac524f04
4fff02c4-f600-471d-80ae-530a676c0a59	2025-07-29 13:50:24.011206+00	2025-07-29 13:50:24.011206+00	email/signup	8ee2218e-44f0-4333-9b25-730a58b7e8b6
bbf8ea0b-deda-4a73-9158-5fecde8c25ab	2025-07-31 21:16:16.948442+00	2025-07-31 21:16:16.948442+00	password	e1a08f4a-d62c-4352-bb31-9f4ee4a92205
b420862a-5d06-488d-b282-c4217791c3d5	2025-09-07 18:42:21.136435+00	2025-09-07 18:42:21.136435+00	password	25e94a25-aa08-42d1-ac9c-1657d17e4510
9ec56a5a-e092-410b-a0d9-5edfc7e119f8	2025-09-19 23:36:22.856418+00	2025-09-19 23:36:22.856418+00	password	2f7d9956-27ab-47e3-9fdf-189c48252045
\.


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_challenges (id, factor_id, created_at, verified_at, ip_address, otp_code, web_authn_session_data) FROM stdin;
\.


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret, phone, last_challenged_at, web_authn_credential, web_authn_aaguid) FROM stdin;
\.


--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_clients (id, client_id, client_secret_hash, registration_type, redirect_uris, grant_types, client_name, client_uri, logo_uri, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.one_time_tokens (id, user_id, token_type, token_hash, relates_to, created_at, updated_at) FROM stdin;
08f3cb64-9c46-4d30-90a4-d8a9b6209182	99d864a8-cf28-40ae-82d5-d28fd8f8a10b	confirmation_token	pkce_bfa593eb0df5e88c1d85b9c2e67ae277cbe2c04adad1839fadb9e126	unionweb619+52@gmail.com	2025-07-04 15:26:51.950453	2025-07-04 15:26:51.950453
2ee222e8-fb59-493e-9910-c5641755e539	0c89b7a9-692b-458b-b556-780cc4552188	confirmation_token	pkce_15c3318161cce7e70d89aaf07fd77015994ccec6191ab3fbdd2e4559	unionweb619+55@gmail.com	2025-07-24 21:15:27.20207	2025-07-24 21:15:27.20207
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) FROM stdin;
00000000-0000-0000-0000-000000000000	92	a4dnxe6aqasa	3f2332c9-4f3f-45ed-9215-a65684d36bf5	t	2025-05-25 21:14:10.964093+00	2025-06-01 01:25:33.114062+00	dihf3qofg4ka	4bf945c8-73a9-4d84-acdd-26d8189ecbc1
00000000-0000-0000-0000-000000000000	100	zw72ru6amr4c	3f2332c9-4f3f-45ed-9215-a65684d36bf5	t	2025-06-01 01:25:33.130241+00	2025-06-01 02:33:13.062636+00	a4dnxe6aqasa	4bf945c8-73a9-4d84-acdd-26d8189ecbc1
00000000-0000-0000-0000-000000000000	104	jogjbo4nj2f2	dca1a8ab-6b8d-4e0a-a4d3-e28df4462192	t	2025-06-03 17:38:05.847642+00	2025-06-03 19:06:40.939195+00	\N	216306fb-5815-4f5b-807d-f9ab1d571243
00000000-0000-0000-0000-000000000000	105	2ix27wycpmls	dca1a8ab-6b8d-4e0a-a4d3-e28df4462192	f	2025-06-03 19:06:40.943965+00	2025-06-03 19:06:40.943965+00	jogjbo4nj2f2	216306fb-5815-4f5b-807d-f9ab1d571243
00000000-0000-0000-0000-000000000000	61	syramfqomkro	2a6c6985-d71f-4805-951e-9c1e76e3975f	t	2025-05-10 19:23:25.841295+00	2025-05-10 22:15:53.505405+00	\N	32584432-9a8b-42c8-918d-4973e62caa01
00000000-0000-0000-0000-000000000000	64	aahitevca436	3f2332c9-4f3f-45ed-9215-a65684d36bf5	t	2025-05-11 00:44:33.294863+00	2025-05-11 02:00:02.081804+00	\N	4bf945c8-73a9-4d84-acdd-26d8189ecbc1
00000000-0000-0000-0000-000000000000	66	owvbdlujikw5	d0418bd1-e5e0-413e-9696-17d1e34556b3	f	2025-05-11 02:20:09.393059+00	2025-05-11 02:20:09.393059+00	\N	bb99b5ea-edb1-43e9-a4b9-71c7034bd5fb
00000000-0000-0000-0000-000000000000	112	jy57ddppfjll	8b883958-ffca-4f06-860f-b73753f4a1c8	t	2025-07-01 14:37:10.422905+00	2025-07-06 21:21:10.408669+00	\N	e6364d62-0e3d-4138-8b33-067fb29f33f7
00000000-0000-0000-0000-000000000000	67	2zwjwslpitz5	d0418bd1-e5e0-413e-9696-17d1e34556b3	f	2025-05-11 02:20:11.262948+00	2025-05-11 02:20:11.262948+00	\N	d901e618-6f0c-4323-9dfe-e60ea1604c11
00000000-0000-0000-0000-000000000000	68	zgovjd5c4v3c	d0418bd1-e5e0-413e-9696-17d1e34556b3	f	2025-05-11 03:03:36.294964+00	2025-05-11 03:03:36.294964+00	\N	df3009e5-68c2-41e1-8150-44fe44b25dab
00000000-0000-0000-0000-000000000000	63	3hbg5nuov4g7	2a6c6985-d71f-4805-951e-9c1e76e3975f	t	2025-05-10 22:15:53.506717+00	2025-05-11 11:02:10.693378+00	syramfqomkro	32584432-9a8b-42c8-918d-4973e62caa01
00000000-0000-0000-0000-000000000000	116	rhwc453fyuor	8b883958-ffca-4f06-860f-b73753f4a1c8	t	2025-07-06 21:21:10.423822+00	2025-07-08 04:28:23.681272+00	jy57ddppfjll	e6364d62-0e3d-4138-8b33-067fb29f33f7
00000000-0000-0000-0000-000000000000	70	pjihl5lg3i2w	2a6c6985-d71f-4805-951e-9c1e76e3975f	t	2025-05-11 11:02:10.698323+00	2025-05-11 12:02:33.549044+00	3hbg5nuov4g7	32584432-9a8b-42c8-918d-4973e62caa01
00000000-0000-0000-0000-000000000000	65	stmifkzi4aah	3f2332c9-4f3f-45ed-9215-a65684d36bf5	t	2025-05-11 02:00:02.083373+00	2025-05-11 13:19:36.00835+00	aahitevca436	4bf945c8-73a9-4d84-acdd-26d8189ecbc1
00000000-0000-0000-0000-000000000000	117	in7llxxbqjmo	8b883958-ffca-4f06-860f-b73753f4a1c8	t	2025-07-08 04:28:23.700956+00	2025-07-15 16:05:47.999492+00	rhwc453fyuor	e6364d62-0e3d-4138-8b33-067fb29f33f7
00000000-0000-0000-0000-000000000000	118	funvwcrrma23	8b883958-ffca-4f06-860f-b73753f4a1c8	t	2025-07-15 16:05:48.012511+00	2025-07-20 05:51:26.383391+00	in7llxxbqjmo	e6364d62-0e3d-4138-8b33-067fb29f33f7
00000000-0000-0000-0000-000000000000	71	im3bxtcontnh	2a6c6985-d71f-4805-951e-9c1e76e3975f	t	2025-05-11 12:02:33.550382+00	2025-05-11 15:05:17.101794+00	pjihl5lg3i2w	32584432-9a8b-42c8-918d-4973e62caa01
00000000-0000-0000-0000-000000000000	119	misljky4jz5m	8b883958-ffca-4f06-860f-b73753f4a1c8	f	2025-07-20 05:51:26.39422+00	2025-07-20 05:51:26.39422+00	funvwcrrma23	e6364d62-0e3d-4138-8b33-067fb29f33f7
00000000-0000-0000-0000-000000000000	73	mwbkffjvaz5k	3d6ec7f6-350e-467f-9178-6fa595bab52e	t	2025-05-11 14:37:16.250984+00	2025-05-11 16:42:43.676029+00	\N	0e05094d-ca4c-49b5-bc8b-1e95b30396ed
00000000-0000-0000-0000-000000000000	75	6peetg2scmuq	3d6ec7f6-350e-467f-9178-6fa595bab52e	f	2025-05-11 16:42:43.677951+00	2025-05-11 16:42:43.677951+00	mwbkffjvaz5k	0e05094d-ca4c-49b5-bc8b-1e95b30396ed
00000000-0000-0000-0000-000000000000	74	sz6rcuwg5s54	2a6c6985-d71f-4805-951e-9c1e76e3975f	t	2025-05-11 15:05:17.10368+00	2025-05-11 17:53:36.735996+00	im3bxtcontnh	32584432-9a8b-42c8-918d-4973e62caa01
00000000-0000-0000-0000-000000000000	115	663botakhpqy	9622ec62-4edb-4c3d-ba47-d9f7b78b098e	t	2025-07-04 16:16:47.112651+00	2025-07-24 21:14:33.797595+00	\N	657fdfd8-14b0-4fba-ab5a-391fad08df26
00000000-0000-0000-0000-000000000000	69	jnvrhwuvro3c	d0418bd1-e5e0-413e-9696-17d1e34556b3	t	2025-05-11 03:03:38.7027+00	2025-05-12 01:58:53.044774+00	\N	8a3e0f11-c975-4009-8abe-02aa36a11e32
00000000-0000-0000-0000-000000000000	77	yuqx3zclarjz	d0418bd1-e5e0-413e-9696-17d1e34556b3	f	2025-05-12 01:58:53.055913+00	2025-05-12 01:58:53.055913+00	jnvrhwuvro3c	8a3e0f11-c975-4009-8abe-02aa36a11e32
00000000-0000-0000-0000-000000000000	76	kyodw57dpoqs	2a6c6985-d71f-4805-951e-9c1e76e3975f	t	2025-05-11 17:53:36.738669+00	2025-05-12 11:21:44.9203+00	sz6rcuwg5s54	32584432-9a8b-42c8-918d-4973e62caa01
00000000-0000-0000-0000-000000000000	78	ycy7ixwzjmcy	2a6c6985-d71f-4805-951e-9c1e76e3975f	t	2025-05-12 11:21:44.938308+00	2025-05-12 13:49:53.936447+00	kyodw57dpoqs	32584432-9a8b-42c8-918d-4973e62caa01
00000000-0000-0000-0000-000000000000	79	vewwhz5w6vtu	2a6c6985-d71f-4805-951e-9c1e76e3975f	f	2025-05-12 13:49:53.937634+00	2025-05-12 13:49:53.937634+00	ycy7ixwzjmcy	32584432-9a8b-42c8-918d-4973e62caa01
00000000-0000-0000-0000-000000000000	80	guwnmkkx3jf6	e151c236-9a85-4de3-ba10-56d0ffe2feb2	f	2025-05-12 21:45:43.550174+00	2025-05-12 21:45:43.550174+00	\N	97b0767c-5955-4d4d-8ab3-5f1589346fd1
00000000-0000-0000-0000-000000000000	58	xfsr5tfq6wfb	9d09ce16-014e-4e6b-bf29-9569bea73610	t	2025-05-07 14:37:47.776564+00	2025-05-14 20:08:52.001515+00	\N	88973c9b-df99-4c97-836d-e7edef63a29d
00000000-0000-0000-0000-000000000000	120	6zvxuvhi3ovx	9622ec62-4edb-4c3d-ba47-d9f7b78b098e	t	2025-07-24 21:14:33.814751+00	2025-07-25 16:24:42.461049+00	663botakhpqy	657fdfd8-14b0-4fba-ab5a-391fad08df26
00000000-0000-0000-0000-000000000000	81	e62y2z37vj6g	9d09ce16-014e-4e6b-bf29-9569bea73610	t	2025-05-14 20:08:52.016448+00	2025-05-14 21:55:59.285438+00	xfsr5tfq6wfb	88973c9b-df99-4c97-836d-e7edef63a29d
00000000-0000-0000-0000-000000000000	121	4lbiwnt7ai5b	9622ec62-4edb-4c3d-ba47-d9f7b78b098e	f	2025-07-25 16:24:42.475174+00	2025-07-25 16:24:42.475174+00	6zvxuvhi3ovx	657fdfd8-14b0-4fba-ab5a-391fad08df26
00000000-0000-0000-0000-000000000000	82	neozswcakuqr	9d09ce16-014e-4e6b-bf29-9569bea73610	t	2025-05-14 21:55:59.290099+00	2025-05-14 23:41:25.983246+00	e62y2z37vj6g	88973c9b-df99-4c97-836d-e7edef63a29d
00000000-0000-0000-0000-000000000000	83	lau4flohyeyi	9d09ce16-014e-4e6b-bf29-9569bea73610	f	2025-05-14 23:41:25.98507+00	2025-05-14 23:41:25.98507+00	neozswcakuqr	88973c9b-df99-4c97-836d-e7edef63a29d
00000000-0000-0000-0000-000000000000	122	hetqat352mrs	3651e1f8-d0c8-4675-8a2e-75d10cc4342f	t	2025-07-25 16:28:19.779426+00	2025-07-29 13:48:09.08317+00	\N	9279ad01-9754-4628-9da7-2e750755a56c
00000000-0000-0000-0000-000000000000	84	l4aoexmibwti	1f04962f-9175-4935-a985-bf47c694a262	t	2025-05-15 00:14:49.429482+00	2025-05-15 16:45:11.66177+00	\N	a5ae7d69-363b-47d5-8cd5-2f3f1b86a8a6
00000000-0000-0000-0000-000000000000	123	yoxtudpgcv7f	3651e1f8-d0c8-4675-8a2e-75d10cc4342f	f	2025-07-29 13:48:09.095974+00	2025-07-29 13:48:09.095974+00	hetqat352mrs	9279ad01-9754-4628-9da7-2e750755a56c
00000000-0000-0000-0000-000000000000	86	n6sa6spk7jvi	1f04962f-9175-4935-a985-bf47c694a262	t	2025-05-15 16:45:11.677743+00	2025-05-16 16:58:15.571616+00	l4aoexmibwti	a5ae7d69-363b-47d5-8cd5-2f3f1b86a8a6
00000000-0000-0000-0000-000000000000	87	vdp2kzoibtqt	1f04962f-9175-4935-a985-bf47c694a262	f	2025-05-16 16:58:15.587957+00	2025-05-16 16:58:15.587957+00	n6sa6spk7jvi	a5ae7d69-363b-47d5-8cd5-2f3f1b86a8a6
00000000-0000-0000-0000-000000000000	85	trchfk6jdgz7	8c9a07f9-6d75-4144-a987-c5a9e7e500ea	t	2025-05-15 04:22:07.511027+00	2025-05-18 14:26:44.551441+00	\N	c7e29ac6-333a-400a-8859-01038105df5f
00000000-0000-0000-0000-000000000000	88	vflrts53kxof	8c9a07f9-6d75-4144-a987-c5a9e7e500ea	f	2025-05-18 14:26:44.561972+00	2025-05-18 14:26:44.561972+00	trchfk6jdgz7	c7e29ac6-333a-400a-8859-01038105df5f
00000000-0000-0000-0000-000000000000	124	brfdpi4ffbf2	cd26ec36-fc54-4623-a7d6-5ca4dcd7853e	t	2025-07-29 13:50:24.009728+00	2025-07-31 21:08:01.159975+00	\N	4fff02c4-f600-471d-80ae-530a676c0a59
00000000-0000-0000-0000-000000000000	125	kwmrkeih5tsc	cd26ec36-fc54-4623-a7d6-5ca4dcd7853e	f	2025-07-31 21:08:01.178753+00	2025-07-31 21:08:01.178753+00	brfdpi4ffbf2	4fff02c4-f600-471d-80ae-530a676c0a59
00000000-0000-0000-0000-000000000000	126	4aiq7rh2ugg4	9622ec62-4edb-4c3d-ba47-d9f7b78b098e	t	2025-07-31 21:16:16.94317+00	2025-08-05 22:17:14.91118+00	\N	bbf8ea0b-deda-4a73-9158-5fecde8c25ab
00000000-0000-0000-0000-000000000000	127	3d7dxuebdwhv	9622ec62-4edb-4c3d-ba47-d9f7b78b098e	f	2025-08-05 22:17:14.939482+00	2025-08-05 22:17:14.939482+00	4aiq7rh2ugg4	bbf8ea0b-deda-4a73-9158-5fecde8c25ab
00000000-0000-0000-0000-000000000000	101	3j5ko64eovmf	3f2332c9-4f3f-45ed-9215-a65684d36bf5	t	2025-06-01 02:33:13.067923+00	2025-08-15 01:40:45.552477+00	zw72ru6amr4c	4bf945c8-73a9-4d84-acdd-26d8189ecbc1
00000000-0000-0000-0000-000000000000	128	feqkb4zeyxze	3f2332c9-4f3f-45ed-9215-a65684d36bf5	f	2025-08-15 01:40:45.57517+00	2025-08-15 01:40:45.57517+00	3j5ko64eovmf	4bf945c8-73a9-4d84-acdd-26d8189ecbc1
00000000-0000-0000-0000-000000000000	72	dihf3qofg4ka	3f2332c9-4f3f-45ed-9215-a65684d36bf5	t	2025-05-11 13:19:36.009043+00	2025-05-25 21:14:10.951903+00	stmifkzi4aah	4bf945c8-73a9-4d84-acdd-26d8189ecbc1
00000000-0000-0000-0000-000000000000	93	oqc6xpvrptxg	d0418bd1-e5e0-413e-9696-17d1e34556b3	f	2025-05-26 04:13:40.445802+00	2025-05-26 04:13:40.445802+00	\N	aaee57dc-bca9-4dde-9014-fc15a789a55b
00000000-0000-0000-0000-000000000000	129	t2ltsjy6qukw	8b883958-ffca-4f06-860f-b73753f4a1c8	f	2025-09-07 18:42:21.084006+00	2025-09-07 18:42:21.084006+00	\N	b420862a-5d06-488d-b282-c4217791c3d5
00000000-0000-0000-0000-000000000000	130	3267wetismok	2a6c6985-d71f-4805-951e-9c1e76e3975f	f	2025-09-19 23:36:22.806131+00	2025-09-19 23:36:22.806131+00	\N	9ec56a5a-e092-410b-a0d9-5edfc7e119f8
\.


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.saml_providers (id, sso_provider_id, entity_id, metadata_xml, metadata_url, attribute_mapping, created_at, updated_at, name_id_format) FROM stdin;
\.


--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.saml_relay_states (id, sso_provider_id, request_id, for_email, redirect_to, created_at, updated_at, flow_state_id) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.schema_migrations (version) FROM stdin;
20171026211738
20171026211808
20171026211834
20180103212743
20180108183307
20180119214651
20180125194653
00
20210710035447
20210722035447
20210730183235
20210909172000
20210927181326
20211122151130
20211124214934
20211202183645
20220114185221
20220114185340
20220224000811
20220323170000
20220429102000
20220531120530
20220614074223
20220811173540
20221003041349
20221003041400
20221011041400
20221020193600
20221021073300
20221021082433
20221027105023
20221114143122
20221114143410
20221125140132
20221208132122
20221215195500
20221215195800
20221215195900
20230116124310
20230116124412
20230131181311
20230322519590
20230402418590
20230411005111
20230508135423
20230523124323
20230818113222
20230914180801
20231027141322
20231114161723
20231117164230
20240115144230
20240214120130
20240306115329
20240314092811
20240427152123
20240612123726
20240729123726
20240802193726
20240806073726
20241009103726
20250717082212
20250731150234
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) FROM stdin;
8a3e0f11-c975-4009-8abe-02aa36a11e32	d0418bd1-e5e0-413e-9696-17d1e34556b3	2025-05-11 03:03:38.702035+00	2025-05-26 04:10:38.331123+00	\N	aal1	\N	2025-05-26 04:10:38.331053	node	44.200.226.41	\N
aaee57dc-bca9-4dde-9014-fc15a789a55b	d0418bd1-e5e0-413e-9696-17d1e34556b3	2025-05-26 04:13:40.442101+00	2025-05-26 04:13:40.442101+00	\N	aal1	\N	\N	node	44.200.226.41	\N
657fdfd8-14b0-4fba-ab5a-391fad08df26	9622ec62-4edb-4c3d-ba47-d9f7b78b098e	2025-07-04 16:16:47.109922+00	2025-07-25 16:27:40.17732+00	\N	aal1	\N	2025-07-25 16:27:40.177248	node	3.92.211.48	\N
0e05094d-ca4c-49b5-bc8b-1e95b30396ed	3d6ec7f6-350e-467f-9178-6fa595bab52e	2025-05-11 14:37:16.24503+00	2025-05-11 17:53:00.999558+00	\N	aal1	\N	2025-05-11 17:53:00.999482	node	3.237.18.168	\N
c7e29ac6-333a-400a-8859-01038105df5f	8c9a07f9-6d75-4144-a987-c5a9e7e500ea	2025-05-15 04:22:07.51018+00	2025-05-29 21:10:22.730035+00	\N	aal1	\N	2025-05-29 21:10:22.729952	node	54.211.204.172	\N
88973c9b-df99-4c97-836d-e7edef63a29d	9d09ce16-014e-4e6b-bf29-9569bea73610	2025-05-07 14:37:47.7732+00	2025-05-15 04:21:47.796611+00	\N	aal1	\N	2025-05-15 04:21:47.796536	node	54.158.10.152	\N
9279ad01-9754-4628-9da7-2e750755a56c	3651e1f8-d0c8-4675-8a2e-75d10cc4342f	2025-07-25 16:28:19.775104+00	2025-07-29 13:49:46.749077+00	\N	aal1	\N	2025-07-29 13:49:46.748999	node	18.205.66.136	\N
32584432-9a8b-42c8-918d-4973e62caa01	2a6c6985-d71f-4805-951e-9c1e76e3975f	2025-05-10 19:23:25.836003+00	2025-05-12 13:49:53.940897+00	\N	aal1	\N	2025-05-12 13:49:53.940827	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36	149.120.37.16	\N
216306fb-5815-4f5b-807d-f9ab1d571243	dca1a8ab-6b8d-4e0a-a4d3-e28df4462192	2025-06-03 17:38:05.842801+00	2025-06-03 19:07:54.25001+00	\N	aal1	\N	2025-06-03 19:07:54.249943	node	52.204.149.141	\N
a5ae7d69-363b-47d5-8cd5-2f3f1b86a8a6	1f04962f-9175-4935-a985-bf47c694a262	2025-05-15 00:14:49.427617+00	2025-05-21 22:57:59.158141+00	\N	aal1	\N	2025-05-21 22:57:59.158077	node	52.91.237.75	\N
97b0767c-5955-4d4d-8ab3-5f1589346fd1	e151c236-9a85-4de3-ba10-56d0ffe2feb2	2025-05-12 21:45:43.544186+00	2025-05-12 21:45:43.544186+00	\N	aal1	\N	\N	node	34.227.149.251	\N
4fff02c4-f600-471d-80ae-530a676c0a59	cd26ec36-fc54-4623-a7d6-5ca4dcd7853e	2025-07-29 13:50:24.003869+00	2025-07-31 21:15:51.467453+00	\N	aal1	\N	2025-07-31 21:15:51.467382	node	54.159.172.223	\N
bb99b5ea-edb1-43e9-a4b9-71c7034bd5fb	d0418bd1-e5e0-413e-9696-17d1e34556b3	2025-05-11 02:20:09.39145+00	2025-05-11 02:20:09.39145+00	\N	aal1	\N	\N	node	34.238.163.12	\N
d901e618-6f0c-4323-9dfe-e60ea1604c11	d0418bd1-e5e0-413e-9696-17d1e34556b3	2025-05-11 02:20:11.26225+00	2025-05-11 02:20:11.26225+00	\N	aal1	\N	\N	node	44.222.168.30	\N
df3009e5-68c2-41e1-8150-44fe44b25dab	d0418bd1-e5e0-413e-9696-17d1e34556b3	2025-05-11 03:03:36.290828+00	2025-05-11 03:03:36.290828+00	\N	aal1	\N	\N	node	50.19.206.54	\N
e6364d62-0e3d-4138-8b33-067fb29f33f7	8b883958-ffca-4f06-860f-b73753f4a1c8	2025-07-01 14:37:10.413325+00	2025-07-20 05:51:27.982954+00	\N	aal1	\N	2025-07-20 05:51:27.982879	node	35.173.57.225	\N
bbf8ea0b-deda-4a73-9158-5fecde8c25ab	9622ec62-4edb-4c3d-ba47-d9f7b78b098e	2025-07-31 21:16:16.934567+00	2025-08-05 22:17:17.524355+00	\N	aal1	\N	2025-08-05 22:17:17.524285	node	54.175.181.186	\N
4bf945c8-73a9-4d84-acdd-26d8189ecbc1	3f2332c9-4f3f-45ed-9215-a65684d36bf5	2025-05-11 00:44:33.290318+00	2025-08-15 01:40:47.416323+00	\N	aal1	\N	2025-08-15 01:40:47.41625	node	13.220.251.170	\N
b420862a-5d06-488d-b282-c4217791c3d5	8b883958-ffca-4f06-860f-b73753f4a1c8	2025-09-07 18:42:21.064915+00	2025-09-07 18:42:21.064915+00	\N	aal1	\N	\N	node	52.23.210.117	\N
9ec56a5a-e092-410b-a0d9-5edfc7e119f8	2a6c6985-d71f-4805-951e-9c1e76e3975f	2025-09-19 23:36:22.779652+00	2025-09-19 23:36:22.779652+00	\N	aal1	\N	\N	node	3.237.2.2	\N
\.


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sso_domains (id, sso_provider_id, domain, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sso_providers (id, resource_id, created_at, updated_at, disabled) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) FROM stdin;
00000000-0000-0000-0000-000000000000	2d28824e-7da2-4f94-86c8-c169fbb17f14	authenticated	authenticated	smiiith+2@gmail.com	$2a$10$4drdB4k1815/Mf9iBQ/iXesq2HT2tG9./sk6bQhVoE17RZxbELxBK	2025-04-26 20:04:31.859527+00	\N		2025-04-26 20:03:31.132744+00		\N			\N	\N	{"role": "freemium", "provider": "email", "providers": ["email"]}	{"sub": "2d28824e-7da2-4f94-86c8-c169fbb17f14", "email": "smiiith+2@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-04-26 20:03:31.121931+00	2025-04-26 20:04:31.862599+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	d0418bd1-e5e0-413e-9696-17d1e34556b3	authenticated	authenticated	patopropertiestn@gmail.com	$2a$10$UFSzNB3f7/QrxS2uTH1vjO66Jb/n2Q1pNY1LYWqqywz/cbFVZHak.	2025-05-11 02:20:02.64164+00	\N		2025-05-11 02:19:43.905167+00		\N			\N	2025-05-26 04:13:40.442012+00	{"role": "freemium", "provider": "email", "providers": ["email"]}	{"sub": "d0418bd1-e5e0-413e-9696-17d1e34556b3", "email": "patopropertiestn@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-05-11 02:19:43.887444+00	2025-05-26 04:13:40.45036+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	3f2332c9-4f3f-45ed-9215-a65684d36bf5	authenticated	authenticated	crbcrafting@gmail.com	$2a$10$V5Pte5J4KjUW2mtz53aLfevXpTGj/Q5a3mTA.3wYY/ldN0OwpHVuW	2025-05-11 00:44:17.70269+00	\N		2025-05-11 00:43:04.637735+00		\N			\N	2025-05-11 00:44:33.290241+00	{"role": "freemium", "provider": "email", "providers": ["email"]}	{"sub": "3f2332c9-4f3f-45ed-9215-a65684d36bf5", "email": "crbcrafting@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-05-11 00:43:04.60292+00	2025-08-15 01:40:45.586271+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	9622ec62-4edb-4c3d-ba47-d9f7b78b098e	authenticated	authenticated	rick@rickbays.com	$2a$10$aEqbGcX9kyrVpwsX/T5czeKJwz5nKpRArMpDMF5PXZi.mWop.XQHW	2025-04-27 04:27:24.793175+00	\N		2025-04-27 04:27:02.846817+00		2025-05-04 14:53:08.57015+00			\N	2025-07-31 21:16:16.934479+00	{"role": "freemium", "provider": "email", "providers": ["email"]}	{"sub": "9622ec62-4edb-4c3d-ba47-d9f7b78b098e", "email": "rick@rickbays.com", "email_verified": true, "phone_verified": false}	\N	2025-04-27 04:27:02.804898+00	2025-08-05 22:17:14.949417+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	3d6ec7f6-350e-467f-9178-6fa595bab52e	authenticated	authenticated	keytfarinas@gmail.com	$2a$10$/ekpp.Ym83dkitBQFiV3LOo243EtwGnU3RIvUAd85.QXAkFHVL1Ge	2025-05-11 14:35:45.717168+00	\N		\N		\N			\N	2025-05-11 14:37:16.244955+00	{"role": "freemium", "provider": "email", "providers": ["email"]}	{"sub": "3d6ec7f6-350e-467f-9178-6fa595bab52e", "email": "keytfarinas@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-05-11 14:35:27.453506+00	2025-05-11 16:42:43.67901+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	7a15b080-dee4-4cfd-b5e3-b82c5ac51ec6	authenticated	authenticated	smiiith+16@gmail.com	$2a$10$0QtODPewCuMmXHc7YJ8Bd.V1.SnJvylxQ5yuKBZIgkz8GHqa/g0zW	2025-05-07 03:46:09.395089+00	\N		2025-05-07 03:45:52.850295+00		\N			\N	\N	{"role": "freemium", "provider": "email", "providers": ["email"]}	{"sub": "7a15b080-dee4-4cfd-b5e3-b82c5ac51ec6", "email": "smiiith+16@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-05-07 03:38:49.073142+00	2025-05-07 03:46:09.398863+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	01294339-df5d-448c-b6f9-ad9980ea25c9	authenticated	authenticated	georgia@hunterholidays.com.au	$2a$10$IP6hDUDA2ltUNmCOmpxlXeVhLBAbKPXR4kfDyQyQat611/AA6P/yq	2025-05-08 15:08:35.463341+00	\N		2025-05-08 15:08:12.574643+00		\N			\N	\N	{"role": "freemium", "provider": "email", "providers": ["email"]}	{"sub": "01294339-df5d-448c-b6f9-ad9980ea25c9", "email": "georgia@hunterholidays.com.au", "email_verified": true, "phone_verified": false}	\N	2025-05-08 15:08:12.504538+00	2025-05-08 15:08:35.467174+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	e151c236-9a85-4de3-ba10-56d0ffe2feb2	authenticated	authenticated	billndimoll@msn.com	$2a$10$Cb0mQtH8bf0CnFIKIVyVUOYGtCa4MRTR/27voy.Q/DDLrTjZxh64C	2025-05-12 21:44:34.193872+00	\N		2025-05-12 21:44:10.67097+00		\N			\N	2025-05-12 21:45:43.544107+00	{"role": "freemium", "provider": "email", "providers": ["email"]}	{"sub": "e151c236-9a85-4de3-ba10-56d0ffe2feb2", "email": "billndimoll@msn.com", "email_verified": true, "phone_verified": false}	\N	2025-05-12 21:44:10.619177+00	2025-05-12 21:45:43.554503+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	7def9335-8114-4b71-b5f3-8194b8f1cac8	authenticated	authenticated	unionweb619+10@gmail.com	$2a$10$u/D61cWsTtwiNxmAHNbjWOLMJZi1KJMlDl0VGFr.bUwr1hL0QvNoy	2025-05-14 20:14:35.844641+00	\N		2025-05-14 20:13:42.786646+00		\N			\N	\N	{"role": "freemium", "provider": "email", "providers": ["email"]}	{"sub": "7def9335-8114-4b71-b5f3-8194b8f1cac8", "email": "unionweb619+10@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-05-14 20:13:42.732299+00	2025-05-14 20:14:35.846963+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	9d09ce16-014e-4e6b-bf29-9569bea73610	authenticated	authenticated	unionweb619+8@gmail.com	$2a$10$m4oWPYoG/VgHEzeQ7qGSWuquZMl3hkFrRJHU2/5UDqABxICgppYVC	2025-05-07 14:37:23.161177+00	\N		2025-05-07 14:36:02.647886+00		\N			\N	2025-05-07 14:37:47.77202+00	{"role": "freemium", "provider": "email", "providers": ["email"]}	{"sub": "9d09ce16-014e-4e6b-bf29-9569bea73610", "email": "unionweb619+8@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-05-07 14:36:02.615118+00	2025-05-14 23:41:25.987417+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	2c7f34a4-2893-48c3-b552-3e505a9c2135	authenticated	authenticated	smiiith+3@gmail.com	$2a$10$Iv1HrPJORgEEssVCYHWNde14QuS1QeRVkGWbLZBU63UDsAwH5SL1G	2025-05-15 00:07:31.695475+00	\N		2025-05-15 00:07:14.252315+00		\N			\N	\N	{"role": "freemium", "provider": "email", "providers": ["email"]}	{"sub": "2c7f34a4-2893-48c3-b552-3e505a9c2135", "email": "smiiith+3@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-05-15 00:07:14.2303+00	2025-05-15 00:07:31.697953+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	0c89b7a9-692b-458b-b556-780cc4552188	authenticated	authenticated	unionweb619+55@gmail.com	$2a$10$19P3QFRgLcjxH9.RajXCNOUGBUZTtUDprDXxL8bdISx3PcanTHUTm	\N	\N	pkce_15c3318161cce7e70d89aaf07fd77015994ccec6191ab3fbdd2e4559	2025-07-24 21:15:25.923998+00		\N			\N	\N	{"role": "freemium", "provider": "email", "providers": ["email"]}	{"sub": "0c89b7a9-692b-458b-b556-780cc4552188", "email": "unionweb619+55@gmail.com", "email_verified": false, "phone_verified": false}	\N	2025-07-24 21:15:25.879308+00	2025-07-24 21:15:27.473365+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	1f04962f-9175-4935-a985-bf47c694a262	authenticated	authenticated	smiiith+5@gmail.com	$2a$10$dzv1LnLFDfO15oFOVDB9dOTxnAMTZ9W.UPHYI8erTrsjuUn/1/AHa	2025-05-15 00:14:48.648556+00	\N		2025-05-15 00:13:34.162559+00		\N			\N	2025-05-15 00:14:49.427536+00	{"role": "freemium", "provider": "email", "providers": ["email"]}	{"sub": "1f04962f-9175-4935-a985-bf47c694a262", "email": "smiiith+5@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-05-15 00:13:34.155867+00	2025-05-16 16:58:15.597131+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	956aca82-f8e9-462d-aaa8-8c78af551e96	authenticated	authenticated	smiiith+4@gmail.com	$2a$10$7cxM30yJbGZd11Os.qIYb.5cv5J9mYU.RKCVzq.t1SIRFTPKUWXcS	2025-05-15 00:13:07.395211+00	\N		2025-05-15 00:09:42.078999+00		\N			\N	\N	{"role": "freemium", "provider": "email", "providers": ["email"]}	{"sub": "956aca82-f8e9-462d-aaa8-8c78af551e96", "email": "smiiith+4@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-05-15 00:09:42.067886+00	2025-05-15 00:13:07.399756+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	8c9a07f9-6d75-4144-a987-c5a9e7e500ea	authenticated	authenticated	unionweb619+11@gmail.com	$2a$10$4ha8s0WvuA0nwtsuII0UY.KKePPxURZ0sy89C9IE2h8J8qSG9f7ZC	2025-05-15 04:22:06.055173+00	\N		2025-05-15 04:21:47.902583+00		\N			\N	2025-05-15 04:22:07.510106+00	{"role": "freemium", "provider": "email", "providers": ["email"]}	{"sub": "8c9a07f9-6d75-4144-a987-c5a9e7e500ea", "email": "unionweb619+11@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-05-15 04:21:47.867984+00	2025-05-18 14:26:44.569367+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	2a6c6985-d71f-4805-951e-9c1e76e3975f	authenticated	authenticated	jason_e_halstead@yahoo.com	$2a$10$Mf0CfIGPd3GIECRt7YEbge3dJpzKviJPnxO.iAArTo10n.EDi09aa	2025-05-10 19:22:06.622768+00	\N		2025-05-10 13:19:41.630896+00		\N			\N	2025-09-19 23:36:22.779548+00	{"role": "freemium", "provider": "email", "providers": ["email"]}	{"sub": "2a6c6985-d71f-4805-951e-9c1e76e3975f", "email": "jason_e_halstead@yahoo.com", "email_verified": true, "phone_verified": false}	\N	2025-05-10 13:19:41.57603+00	2025-09-19 23:36:22.84354+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	dca1a8ab-6b8d-4e0a-a4d3-e28df4462192	authenticated	authenticated	unionweb619+24@gmail.com	$2a$10$eaPKQg8KoR8qXmphiIWo0OeArC6IdwyqaDkeMQChsGXKhYS6kJL2y	2025-06-03 17:38:01.597957+00	\N		2025-06-03 17:37:36.216951+00		\N			\N	2025-06-03 17:38:05.840703+00	{"role": "freemium", "provider": "email", "providers": ["email"]}	{"sub": "dca1a8ab-6b8d-4e0a-a4d3-e28df4462192", "email": "unionweb619+24@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-06-03 17:37:36.161235+00	2025-06-03 19:06:40.947774+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	99d864a8-cf28-40ae-82d5-d28fd8f8a10b	authenticated	authenticated	unionweb619+52@gmail.com	$2a$10$L4kHGjYrVFClv0x3rqd8lulh3q1dp9yijbXBxVeyB8qBevKHYv8PK	\N	\N	pkce_bfa593eb0df5e88c1d85b9c2e67ae277cbe2c04adad1839fadb9e126	2025-07-04 15:26:50.700775+00		\N			\N	\N	{"role": "freemium", "provider": "email", "providers": ["email"]}	{"sub": "99d864a8-cf28-40ae-82d5-d28fd8f8a10b", "email": "unionweb619+52@gmail.com", "email_verified": false, "phone_verified": false}	\N	2025-07-04 15:26:50.652461+00	2025-07-04 15:26:52.063901+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	3651e1f8-d0c8-4675-8a2e-75d10cc4342f	authenticated	authenticated	taylor.brooks@petlover.com	$2a$10$GP8SAupSaG3FycjXNcJUseI2.RQx4wc1GBRH8sq6b40UgdQUyE7.S	2025-07-25 16:28:13.61508+00	\N		2025-07-25 16:27:40.321992+00		\N			\N	2025-07-25 16:28:19.775035+00	{"role": "freemium", "provider": "email", "providers": ["email"]}	{"sub": "3651e1f8-d0c8-4675-8a2e-75d10cc4342f", "email": "taylor.brooks@petlover.com", "email_verified": true, "phone_verified": false}	\N	2025-07-25 16:27:40.2814+00	2025-07-29 13:48:09.105645+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	cd26ec36-fc54-4623-a7d6-5ca4dcd7853e	authenticated	authenticated	unionweb619+61@gmail.com	$2a$10$VGnrNMozYAuxAe3e7tovYexuLlTnXB3MZg6D6BOGghxjoKkuZarUi	2025-07-29 13:50:22.133844+00	\N		2025-07-29 13:49:46.91752+00		\N			\N	2025-07-29 13:50:24.003781+00	{"role": "freemium", "provider": "email", "providers": ["email"]}	{"sub": "cd26ec36-fc54-4623-a7d6-5ca4dcd7853e", "email": "unionweb619+61@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-07-29 13:49:46.868803+00	2025-07-31 21:08:01.187274+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	8b883958-ffca-4f06-860f-b73753f4a1c8	authenticated	authenticated	smiiith@gmail.com	$2a$10$nFHHcHWi2Y5tZwT.YkJTuuUjPLYJgCx0e3cxN8.CixiEXp6CVc16W	2025-04-26 19:56:07.702649+00	\N		\N		\N			\N	2025-09-07 18:42:21.064818+00	{"role": "freemium", "provider": "email", "providers": ["email"]}	{"sub": "8b883958-ffca-4f06-860f-b73753f4a1c8", "email": "smiiith@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-04-26 19:55:28.827579+00	2025-09-07 18:42:21.114684+00	\N	\N			\N		0	\N		\N	f	\N	f
\.


--
-- Data for Name: features; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.features (id, created_at, name, description, key) FROM stdin;
\.


--
-- Data for Name: listing_feedback_usage; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.listing_feedback_usage (id, created_at, profile_id, property_id) FROM stdin;
169c92e9-2508-4bb4-8881-eeaaca883a0c	2025-04-26 20:05:45.97299+00	8b883958-ffca-4f06-860f-b73753f4a1c8	71ef7d18-0f73-4245-beb9-86f9c204c089
8b2c2b83-eba2-4f38-8524-412829c9163c	2025-04-27 17:15:43.159324+00	8b883958-ffca-4f06-860f-b73753f4a1c8	71ef7d18-0f73-4245-beb9-86f9c204c089
2aef4ec4-5d1e-4786-af02-0575f8988a64	2025-04-27 17:28:12.769402+00	8b883958-ffca-4f06-860f-b73753f4a1c8	7cee2fb2-cfa4-48ce-976a-87b8347ca1e7
42f31b2c-4544-4c54-89ac-3f28b2ba050f	2025-04-27 17:37:12.885338+00	8b883958-ffca-4f06-860f-b73753f4a1c8	7cee2fb2-cfa4-48ce-976a-87b8347ca1e7
c1aeca25-8009-43ed-84b0-a04b83496061	2025-04-27 17:38:46.373621+00	9622ec62-4edb-4c3d-ba47-d9f7b78b098e	70dfa2bd-bfb8-472a-b526-f6393c0a452c
7a612a4f-f84c-4320-b408-b25705d4d7af	2025-04-27 21:31:38.608186+00	8b883958-ffca-4f06-860f-b73753f4a1c8	d56479ec-d48e-44a1-b0ff-03479d78c264
b69de41d-021b-43fb-a56b-352b022b2913	2025-04-27 23:39:25.059249+00	8b883958-ffca-4f06-860f-b73753f4a1c8	d56479ec-d48e-44a1-b0ff-03479d78c264
f61d8357-cf1f-467c-b823-7e26c4198650	2025-05-01 21:33:02.018473+00	8b883958-ffca-4f06-860f-b73753f4a1c8	0d3de194-51d6-4595-aa7d-09c0ba4287c1
6995acd5-57a7-41be-8bfc-960a871dcde3	2025-05-01 21:36:05.660145+00	8b883958-ffca-4f06-860f-b73753f4a1c8	d56479ec-d48e-44a1-b0ff-03479d78c264
bf7bf7f2-cb38-4356-88b5-f7eae7c52f5e	2025-05-04 02:29:45.535687+00	8b883958-ffca-4f06-860f-b73753f4a1c8	e46c98a9-f2f3-411f-a462-a59ff8171ed0
63f699c3-948e-44d6-b28d-3514acd66a12	2025-05-04 14:56:56.246984+00	9622ec62-4edb-4c3d-ba47-d9f7b78b098e	d83b24aa-f073-4af6-963f-c4cc91f0f7ed
973aa368-985b-409b-a400-d824dc6d8347	2025-05-04 14:58:51.977638+00	9622ec62-4edb-4c3d-ba47-d9f7b78b098e	bb656334-8907-45b9-8e49-d29359a42e7b
6f8b716e-19d1-4133-9bef-c0883b7d9d3a	2025-05-04 15:00:07.572844+00	9622ec62-4edb-4c3d-ba47-d9f7b78b098e	e46c98a9-f2f3-411f-a462-a59ff8171ed0
f451c2cf-dd5e-4ab8-9f41-d1e4440dd91f	2025-05-04 17:04:03.997669+00	9622ec62-4edb-4c3d-ba47-d9f7b78b098e	b72b23db-1b96-4d91-a178-0a254debed2f
ea99bfb4-6fd8-4296-a50b-ff2541d9addb	2025-05-07 14:39:23.914433+00	9d09ce16-014e-4e6b-bf29-9569bea73610	be8c1246-fae2-488f-b8db-ec78b93195c8
2c704edf-9cd1-48ba-a030-f10e5b140791	2025-05-10 19:24:46.557052+00	2a6c6985-d71f-4805-951e-9c1e76e3975f	4e3d6739-a175-4670-b210-3165bd6419ac
8ed1c23a-77c7-48a1-8575-10ff6b620ece	2025-05-11 00:47:39.140776+00	3f2332c9-4f3f-45ed-9215-a65684d36bf5	daf06d19-6685-4c54-8b3e-815ca5afaa1f
35373807-c80c-403b-9748-99d8800e029b	2025-05-11 02:23:05.599222+00	d0418bd1-e5e0-413e-9696-17d1e34556b3	730e3382-53cd-4f9a-ba2c-5e6074cf0c25
ced9e5ca-8e26-4cd6-8861-1c6cdc83b5f9	2025-05-11 03:05:04.934987+00	d0418bd1-e5e0-413e-9696-17d1e34556b3	730e3382-53cd-4f9a-ba2c-5e6074cf0c25
ef308aa7-8f51-4825-8e2e-d93cbdb4ff6c	2025-05-11 17:54:32.031075+00	2a6c6985-d71f-4805-951e-9c1e76e3975f	4e3d6739-a175-4670-b210-3165bd6419ac
d424d603-1dfd-47d6-8094-18b06574b0af	2025-05-11 18:49:49.574761+00	2a6c6985-d71f-4805-951e-9c1e76e3975f	4e3d6739-a175-4670-b210-3165bd6419ac
06db7cdb-3581-4c1f-b232-1bef84132bb4	2025-05-12 21:47:18.645053+00	e151c236-9a85-4de3-ba10-56d0ffe2feb2	86bdadd1-39bd-4008-839e-6052acf811f7
ebca56cd-5dcd-43c6-bd53-3786921b9812	2025-05-14 20:22:38.492266+00	9d09ce16-014e-4e6b-bf29-9569bea73610	9cf3e031-bc6f-42e3-bf8b-ea39d4b16287
c4e05676-2fd9-4699-b8e6-e4df4a534232	2025-05-15 00:34:51.45838+00	1f04962f-9175-4935-a985-bf47c694a262	71ef7d18-0f73-4245-beb9-86f9c204c089
9e9b0b0e-5bbb-46ac-a9f2-a1d55ec65dc8	2025-05-21 22:59:59.138096+00	8b883958-ffca-4f06-860f-b73753f4a1c8	d316fbad-0553-4357-998d-497d19a7dc94
1355ec3a-26c3-49e1-b0c5-1ac9792633a9	2025-05-25 21:18:29.593448+00	3f2332c9-4f3f-45ed-9215-a65684d36bf5	daf06d19-6685-4c54-8b3e-815ca5afaa1f
76ce88d2-90f5-4686-87a9-0f6abc0846f9	2025-06-01 02:36:18.618352+00	3f2332c9-4f3f-45ed-9215-a65684d36bf5	daf06d19-6685-4c54-8b3e-815ca5afaa1f
17762448-2466-4d81-a6c4-74c6a323bc14	2025-09-19 23:37:47.347316+00	2a6c6985-d71f-4805-951e-9c1e76e3975f	b8860c9b-0b4f-4ea2-bcab-36dadf86f39e
\.


--
-- Data for Name: listings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.listings (id, created_at, profile_id, listed_on, external_listing_id, property_id) FROM stdin;
\.


--
-- Data for Name: llm_usage; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.llm_usage (id, created_at, run_id, llm_name, completion_tokens, prompt_tokens, total_tokens, cost, name) FROM stdin;
7dbb490a-301c-47d4-a817-52cca40f6d3b	2025-04-26 20:05:09.502327+00	20478800_1745697908	gpt-4o-mini	7	1583	1590	0.00024165	tier
ef1dcf00-720b-4a9b-9494-fd73bccdbe07	2025-04-26 20:05:25.891286+00	20478800_1745697908	gpt-4o-mini	455	1852	2307	0.0005507999999999999	title
a7ebbef8-fe07-48ea-badb-47420371ffd9	2025-04-26 20:05:29.615393+00	20478800_1745697908	gpt-4o-mini	466	900	1366	0.0004146	amenities
28111e5e-1d48-41d1-9e9c-57643526d89b	2025-04-26 20:05:30.218466+00	20478800_1745697908	gpt-4o	455	2307	2762	0.0103175	hero image
53192d1d-89e8-4732-9812-ca4a1a80f035	2025-04-26 20:05:31.851308+00	20478800_1745697908	gpt-4o	397	7873	8270	0.0236525	other images
e62d846d-1ca7-4e9f-8105-55500be00f74	2025-04-26 20:05:31.982203+00	20478800_1745697908	gpt-4o-mini	787	2000	2787	0.0007722	description
d8c026fe-6b89-478f-a945-6697ab2184d0	2025-04-26 20:05:33.562755+00	20478800_1745697908	gpt-4o-mini	936	4260	5196	0.0012006	interior design
69c2e590-26de-4819-933e-cd07e33f8d6b	2025-04-26 20:05:45.872452+00	20478800_1745697908	gpt-4o-mini	750	9915	10665	0.0019372500000000002	overall rating
c9f168ce-eba4-49fb-b881-7197e4a40485	2025-04-27 04:28:18.209652+00	34924840_1745728096	gpt-4o-mini	7	1403	1410	0.00021464999999999999	tier
f8e411d1-4f60-43a9-8bc0-08cc2e8aa419	2025-04-27 04:28:34.619858+00	34924840_1745728096	gpt-4o-mini	476	999	1475	0.00043545	amenities
0164935d-eeda-42ea-8637-ebab9aa70ce0	2025-04-27 04:28:35.979102+00	34924840_1745728096	gpt-4o-mini	473	1654	2127	0.0005319000000000001	interior design
ffe3a3b9-9bdb-4553-8cb8-d5d3319fd7f0	2025-04-27 04:28:38.02622+00	34924840_1745728096	gpt-4o	391	3893	4284	0.0136425	other images
c86ce314-e646-4ad1-8d33-f79db674419a	2025-04-27 04:28:51.378262+00	34924840_1745728096	gpt-4o	421	1692	2113	0.00844	hero image
f013d6ad-a4ec-4c23-9d6b-50087d2666e7	2025-04-27 04:28:55.2776+00	34924840_1745728096	gpt-4o-mini	1488	4510	5998	0.0015693	description
124ce651-b675-4202-b18d-11f47a89265a	2025-04-27 17:14:47.491114+00	92659576_1745774086	gpt-4o-mini	7	1583	1590	0.00024165	tier
8818cf5e-1f81-4122-8c90-07ebcf33d582	2025-04-27 17:15:05.627307+00	92659576_1745774086	gpt-4o-mini	477	900	1377	0.00042120000000000005	amenities
a2d4d0de-6c3e-473d-8486-af43bb73d487	2025-04-27 17:15:07.661734+00	92659576_1745774086	gpt-4o-mini	512	1852	2364	0.000585	title
0f8d39a6-e3b7-4fdd-b13c-5555b5dd072d	2025-04-27 17:15:07.784624+00	92659576_1745774086	gpt-4o	477	2307	2784	0.0105375	hero image
8c8d2adb-3a44-4aba-bc9e-2b8fdb8425bc	2025-04-27 17:15:08.158794+00	92659576_1745774086	gpt-4o-mini	486	1829	2315	0.00056595	interior design
47df158b-e1b0-4985-ab2d-84f10f15ae3e	2025-04-27 17:15:13.284589+00	92659576_1745774086	gpt-4o	432	7873	8305	0.0240025	other images
b411ce86-ef0b-48e1-b946-8cc7a2168262	2025-04-27 17:15:25.366573+00	92659576_1745774086	gpt-4o-mini	1057	4617	5674	0.00132675	description
c30a12a2-da94-45c3-8e7a-2ca458acfd1b	2025-04-27 17:15:43.035942+00	92659576_1745774086	gpt-4o-mini	782	9950	10732	0.0019617	overall rating
e2266fed-4af9-4fcf-a6b9-3210dfa19888	2025-04-27 17:27:36.912432+00	36571272_1745774856	gpt-4o-mini	7	1270	1277	0.0001947	tier
b9ae7dc4-f5b6-4632-9727-226f1be6f383	2025-04-27 17:27:46.075754+00	36571272_1745774856	gpt-4o-mini	429	812	1241	0.0003792	amenities
5a9798cf-1656-49c3-8473-07461ee5413e	2025-04-27 17:27:46.915192+00	36571272_1745774856	gpt-4o	416	1647	2063	0.0082775	hero image
34c3f207-6840-4e22-ada3-79dbab70e336	2025-04-27 17:27:47.449296+00	36571272_1745774856	gpt-4o	361	3806	4167	0.013125	other images
f4f5c63a-4f5c-410c-99af-807f6ec5975f	2025-04-27 17:27:47.689035+00	36571272_1745774856	gpt-4o-mini	504	1522	2026	0.0005306999999999999	interior design
d2caad89-b263-4951-8e7e-f89e9fca9fbc	2025-04-27 17:27:51.223217+00	36571272_1745774856	gpt-4o-mini	713	1693	2406	0.0006817500000000001	description
db3a8773-1586-4c99-8e71-5d6e0f98b9b9	2025-04-27 17:28:02.931026+00	36571272_1745774856	gpt-4o-mini	1114	3784	4898	0.0012360000000000001	title
296c133f-6200-4c0c-9b2c-e18191dc98a4	2025-04-27 17:28:12.656375+00	36571272_1745774856	gpt-4o-mini	466	4672	5138	0.0009804	overall rating
f87c908b-b2ba-48d6-a2d9-e29cdacbc6b5	2025-04-27 17:36:23.557615+00	78551910_1745775382	gpt-4o-mini	7	1270	1277	0.0001947	tier
686f2c7e-36ce-41a2-8a1d-e602febe47ed	2025-04-27 17:36:44.229055+00	78551910_1745775382	gpt-4o	377	3806	4183	0.013284999999999998	other images
3d248822-ef10-4865-95dd-158e9f016ac9	2025-04-27 17:36:44.906123+00	78551910_1745775382	gpt-4o	396	1647	2043	0.0080775	hero image
b19d5ae7-b295-4930-94dd-19a9af7cd004	2025-04-27 17:36:45.613075+00	78551910_1745775382	gpt-4o-mini	471	812	1283	0.00040439999999999996	amenities
70f63c9f-a2c0-4c11-8c61-d43fc3ceb9a3	2025-04-27 17:36:47.227545+00	78551910_1745775382	gpt-4o-mini	477	1522	1999	0.0005145	interior design
b9ad9fff-b9ae-42f9-a23d-34b86bd93f12	2025-04-27 17:36:56.164353+00	78551910_1745775382	gpt-4o-mini	1259	3868	5127	0.0013356000000000002	title
2f5209c4-8f35-4a06-858d-ffcb26becb3c	2025-04-27 17:37:02.576072+00	78551910_1745775382	gpt-4o-mini	1449	4267	5716	0.0015094499999999999	description
1a06ebdc-a494-4fa8-9e31-864078c384e4	2025-04-27 17:37:12.736066+00	78551910_1745775382	gpt-4o-mini	516	4438	4954	0.0009752999999999999	overall rating
77c53174-6acc-4a0c-9ca3-98b156336319	2025-04-27 17:38:07.583189+00	55845821_1745775487	gpt-4o-mini	7	1337	1344	0.00020475	tier
1401dbad-d40b-4284-9948-f77ea70c99e5	2025-04-27 17:38:28.242285+00	55845821_1745775487	gpt-4o-mini	552	1614	2166	0.0005733	title
1e3f42eb-f2ef-4301-a867-68a573adc327	2025-04-27 17:38:28.261844+00	55845821_1745775487	gpt-4o-mini	471	782	1253	0.0003999	amenities
309f91fc-76ec-4d64-8a5d-84066123ab8a	2025-04-27 17:38:31.203139+00	55845821_1745775487	gpt-4o	498	1638	2136	0.009075	hero image
4017cccf-9f8d-4b48-b92b-e342ab8b17e0	2025-04-27 17:38:31.210888+00	55845821_1745775487	gpt-4o	396	3884	4280	0.01367	other images
7913f45b-1bff-4a8f-b8e1-a9c4e0d1b160	2025-04-27 17:38:35.200832+00	55845821_1745775487	gpt-4o-mini	706	1762	2468	0.0006879	description
4f19bcf9-8e31-477d-b331-912af08c9286	2025-04-27 17:38:40.243675+00	55845821_1745775487	gpt-4o-mini	993	3916	4909	0.0011832	interior design
b5a924b4-85f4-4bb3-a9d4-04127a28189a	2025-04-27 17:38:46.254492+00	55845821_1745775487	gpt-4o-mini	406	4475	4881	0.00091485	overall rating
bd0c19a7-0dc3-4f53-bae3-605e0973b3e3	2025-04-27 21:31:04.621114+00	72856134_1745789463	gpt-4o-mini	7	2335	2342	0.00035444999999999997	tier
ccba2386-d481-412e-90dd-38d63294020a	2025-04-27 21:31:19.133701+00	72856134_1745789463	gpt-4o-mini	443	1036	1479	0.00042120000000000005	amenities
2f91aef7-ed95-41a7-8691-2073d81e60bc	2025-04-27 21:31:19.927994+00	72856134_1745789463	gpt-4o-mini	507	2588	3095	0.0006924	interior design
a87ffce1-f710-448a-92df-653cc8989902	2025-04-27 21:31:21.484044+00	72856134_1745789463	gpt-4o-mini	660	2759	3419	0.00080985	description
37519254-23ac-48e1-a105-c3365616967a	2025-04-27 21:31:24.3786+00	72856134_1745789463	gpt-4o	397	3896	4293	0.01371	other images
9073c1ed-4074-4e3e-85d7-a74c2d52ade6	2025-04-27 21:31:25.747793+00	72856134_1745789463	gpt-4o	427	2623	3050	0.0108275	hero image
83e0d8ae-c6a0-49f6-85b5-78195098974e	2025-04-27 21:31:30.201622+00	72856134_1745789463	gpt-4o-mini	1135	5937	7072	0.0015715500000000001	title
1212bbcc-0ef9-42da-ab9a-b9358176e8f2	2025-04-27 21:31:38.515161+00	72856134_1745789463	gpt-4o-mini	515	4337	4852	0.00095955	overall rating
2bce09cb-456f-4256-abbe-d8294f63e53e	2025-04-27 23:38:39.154346+00	95140954_1745797118	gpt-4o-mini	7	2335	2342	0.00035444999999999997	tier
aa67c87f-88be-4850-b70a-c0671e557be8	2025-04-27 23:38:58.55645+00	95140954_1745797118	gpt-4o	387	3896	4283	0.01361	other images
30101a66-6e11-4d03-9be9-f672106138e6	2025-04-27 23:39:02.112661+00	95140954_1745797118	gpt-4o	469	2623	3092	0.0112475	hero image
bd9e6b83-c516-4bef-b04d-05b737d11d62	2025-04-27 23:39:04.939048+00	95140954_1745797118	gpt-4o-mini	848	2615	3463	0.00090105	amenities
c401a62d-5999-47be-b596-c4d27400e7c4	2025-04-27 23:39:07.65835+00	95140954_1745797118	gpt-4o-mini	1092	5890	6982	0.0015387	title
27008133-0a91-4355-8e73-6c6ad68630f5	2025-04-27 23:39:09.478099+00	95140954_1745797118	gpt-4o-mini	997	5810	6807	0.0014697	interior design
9a7dbd00-f60d-4aba-b780-57685392039a	2025-04-27 23:39:15.47623+00	95140954_1745797118	gpt-4o-mini	1356	6331	7687	0.00176325	description
d1f12ac6-7079-4816-9855-1ec9524be63d	2025-04-27 23:39:24.966278+00	95140954_1745797118	gpt-4o-mini	504	4367	4871	0.00095745	overall rating
05a1c878-4edc-4335-923e-d0d9e504429b	2025-05-01 21:32:09.078755+00	54869997_1746135127	gpt-4o-mini	8	1633	1641	0.00024975	tier
ccab4d91-4645-4078-9fe0-5c4d6434ec1e	2025-05-01 21:32:34.452156+00	54869997_1746135127	gpt-4o-mini	459	1029	1488	0.00042975	amenities
89f3d63c-a5ce-4788-b1a0-140a036ed2b4	2025-05-01 21:32:36.050729+00	54869997_1746135127	gpt-4o-mini	577	1909	2486	0.00063255	title
db46d439-f9fa-467e-9780-e55f17eda95e	2025-05-01 21:32:36.545887+00	54869997_1746135127	gpt-4o-mini	515	1886	2401	0.0005919	interior design
c15ca98b-86f0-4a9a-976d-a2d126abd4f9	2025-05-01 21:32:38.521734+00	54869997_1746135127	gpt-4o-mini	804	2057	2861	0.00079095	description
42cfab30-8510-4a6a-9bce-ebd505cc4806	2025-05-01 21:32:38.807817+00	54869997_1746135127	gpt-4o	405	2377	2782	0.0099925	hero image
97ca7e50-2d37-4d08-9fbe-fc904b2691a6	2025-05-01 21:32:42.567522+00	54869997_1746135127	gpt-4o	410	5821	6231	0.0186525	other images
d5b48b86-20b4-4f6f-97c2-d983640d18f0	2025-05-01 21:33:01.895099+00	54869997_1746135127	gpt-4o-mini	870	9636	10506	0.0019674	overall rating
07381bfa-199a-45e9-9667-000b9c5dbcad	2025-05-01 21:35:26.676095+00	51474527_1746135325	gpt-4o-mini	7	2365	2372	0.00035894999999999997	tier
67522915-f46c-44c3-b91b-6407077a66c1	2025-05-01 21:35:43.225341+00	51474527_1746135325	gpt-4o-mini	465	2618	3083	0.0006717	interior design
2d6c8068-0261-465a-867d-32cfc4cdede8	2025-05-01 21:35:47.220332+00	51474527_1746135325	gpt-4o-mini	715	2789	3504	0.00084735	description
119a9b3c-d656-4f0d-8ddc-15b9d1fc8ba4	2025-05-01 21:35:49.788877+00	51474527_1746135325	gpt-4o	443	2628	3071	0.011	hero image
8560fa8b-aba5-447c-b444-979f94932568	2025-05-01 21:35:52.384333+00	51474527_1746135325	gpt-4o-mini	969	5845	6814	0.00145815	title
79a973ca-4770-4416-8983-56ec83a3bc4c	2025-05-01 21:35:52.604539+00	51474527_1746135325	gpt-4o	451	3921	4372	0.0143125	other images
2a3b2271-180f-4f78-93b1-7a54476e6ef7	2025-05-01 21:35:59.840834+00	51474527_1746135325	gpt-4o-mini	1387	4845	6232	0.00155895	amenities
a4cd2402-218d-4c37-b7c0-ee32401e1ea8	2025-05-01 21:36:05.565271+00	51474527_1746135325	gpt-4o-mini	414	4441	4855	0.0009145500000000001	overall rating
a95c7d6d-fa8f-4815-a38b-475613e856f1	2025-05-04 02:28:58.619453+00	50737559_1746325737	gpt-4o-mini	7	1927	1934	0.00029325	tier
2d89d12d-4268-42a4-919b-0fb5b03c1212	2025-05-04 02:29:16.38019+00	50737559_1746325737	gpt-4o-mini	455	2186	2641	0.0006009	interior design
b4f42bd4-e50d-419f-832d-7f958bc29aac	2025-05-04 02:29:19.560847+00	50737559_1746325737	gpt-4o-mini	596	2209	2805	0.00068895	title
c67392a9-bf52-43c4-bad8-dae70a3d61c0	2025-05-04 02:29:20.503692+00	50737559_1746325737	gpt-4o	507	1990	2497	0.010045	hero image
2216845f-dc67-44a5-84e1-999872db44b3	2025-05-04 02:29:24.04942+00	50737559_1746325737	gpt-4o-mini	880	2584	3464	0.0009156	amenities
485c2f6d-7992-4c55-b53d-981c87456e00	2025-05-04 02:29:25.035706+00	50737559_1746325737	gpt-4o	392	7102	7494	0.021675	other images
4bb70c3e-cddf-4f52-a244-51126f346817	2025-05-04 02:29:34.261368+00	50737559_1746325737	gpt-4o-mini	1321	5346	6667	0.0015945	description
24251cb5-3835-4222-ac6b-6f46e1a4f804	2025-05-04 02:29:45.398089+00	50737559_1746325737	gpt-4o-mini	538	4844	5382	0.0010494	overall rating
5c2ba6a7-9f44-4508-9fca-6f30e1817689	2025-05-04 14:56:04.519163+00	65459757_1746370563	gpt-4o-mini	8	2354	2362	0.0003579	tier
e41b55b2-0ca7-499d-ad9a-ea03400deed7	2025-05-04 14:56:32.992064+00	65459757_1746370563	gpt-4o-mini	467	2606	3073	0.0006711	interior design
b1811986-2176-4b66-8743-2b330ae055de	2025-05-04 14:56:33.915826+00	65459757_1746370563	gpt-4o	446	2259	2705	0.0101075	hero image
4765b45e-1c8c-4698-89ed-e9e3add3c4fa	2025-05-04 14:56:40.251252+00	65459757_1746370563	gpt-4o	355	7253	7608	0.0216825	other images
242adb20-1ffb-4357-a48b-bb40aa764835	2025-05-04 14:56:41.758528+00	65459757_1746370563	gpt-4o-mini	1064	5938	7002	0.0015291	title
855eb7b5-3ccb-4c5d-93d6-4aacae5b5663	2025-05-04 14:56:42.973099+00	65459757_1746370563	gpt-4o-mini	980	3158	4138	0.0010617	amenities
a7e3c827-ed97-453f-b649-e22e2c7c450e	2025-05-04 14:56:47.660292+00	65459757_1746370563	gpt-4o-mini	1507	6445	7952	0.0018709500000000001	description
d33ccb89-19d5-44c3-ad6c-189d11a4ba9a	2025-05-04 14:56:56.107024+00	65459757_1746370563	gpt-4o-mini	475	4376	4851	0.0009414	overall rating
efbf4c7e-ede8-4aa9-8c79-e8e3dfa76d2d	2025-05-04 14:58:16.553622+00	99075639_1746370695	gpt-4o-mini	8	1154	1162	0.00017790000000000001	tier
d97726e2-7bf0-4a17-9a2a-684a82a51b55	2025-05-04 14:58:34.761814+00	99075639_1746370695	gpt-4o-mini	503	1404	1907	0.0005124	interior design
833004f5-78c4-49fa-9dab-78b6ff2fb456	2025-05-04 14:58:35.160666+00	99075639_1746370695	gpt-4o-mini	509	1427	1936	0.00051945	title
0cafa182-59aa-4a24-ae35-348afd841e93	2025-05-04 14:58:37.625344+00	99075639_1746370695	gpt-4o-mini	691	1575	2266	0.00065085	description
c3beea53-fffe-4d12-8770-a39b8de6716d	2025-05-04 14:58:38.980387+00	99075639_1746370695	gpt-4o	499	1779	2278	0.0094375	hero image
1c50a3e6-6435-4775-bdf7-8e020ae7cb54	2025-05-04 14:58:39.330042+00	99075639_1746370695	gpt-4o-mini	465	926	1391	0.0004179	amenities
527cb660-510e-4c35-b671-ca766d66afb5	2025-05-04 14:58:43.310893+00	99075639_1746370695	gpt-4o	432	7807	8239	0.0238375	other images
d834f626-ab15-43b6-a615-f8acef92f5e3	2025-05-04 14:58:51.824764+00	99075639_1746370695	gpt-4o-mini	462	4795	5257	0.0009964499999999999	overall rating
c3ed27a2-3da0-4e49-ac88-70f3599266db	2025-05-04 14:59:28.006253+00	68289426_1746370767	gpt-4o-mini	7	1927	1934	0.00029325	tier
467f00e9-2ef8-467e-8119-51bfbf7c71f9	2025-05-04 14:59:48.369415+00	68289426_1746370767	gpt-4o-mini	515	2186	2701	0.0006368999999999999	interior design
6f36b789-4a7d-4943-a955-680dc8627933	2025-05-04 14:59:48.564378+00	68289426_1746370767	gpt-4o-mini	436	1003	1439	0.00041205	amenities
7bd9ab7e-7a7f-45eb-b19b-2385bb597bbb	2025-05-04 14:59:49.101779+00	68289426_1746370767	gpt-4o	422	1990	2412	0.009195	hero image
6113c258-cf7d-4d00-b830-ea72d8941743	2025-05-04 14:59:51.08644+00	68289426_1746370767	gpt-4o-mini	629	2209	2838	0.00070875	title
d1fd1226-ac8d-41c0-980f-602fcf73836e	2025-05-04 14:59:52.230862+00	68289426_1746370767	gpt-4o-mini	761	2357	3118	0.0008101499999999999	description
9ed64fcf-eb3d-4766-86d3-83ff9d269071	2025-05-04 14:59:55.625223+00	68289426_1746370767	gpt-4o	393	7102	7495	0.021685	other images
b205cea2-7162-4323-b37e-9acac1d7010f	2025-05-04 15:00:07.492297+00	68289426_1746370767	gpt-4o-mini	569	4877	5446	0.00107295	overall rating
5a381847-31ee-480a-8427-426927ff8f9c	2025-05-04 17:03:13.990303+00	68336234_1746378192	gpt-4o-mini	7	1433	1440	0.00021915	tier
40995bb7-0921-43c0-b21c-420e07fd9496	2025-05-04 17:03:23.398763+00	68336234_1746378192	gpt-4o-mini	472	1046	1518	0.0004401	amenities
bf480b10-45bf-47dc-943b-c388e22e35ac	2025-05-04 17:03:25.312698+00	68336234_1746378192	gpt-4o-mini	466	1686	2152	0.0005325	interior design
edc61d1f-100e-4ff5-93ec-f09b60568ac7	2025-05-04 17:03:30.910565+00	68336234_1746378192	gpt-4o	534	1986	2520	0.010305	hero image
a6b72508-2976-4fc4-be0d-cf73f2067cb5	2025-05-04 17:03:34.119304+00	68336234_1746378192	gpt-4o-mini	1086	4084	5170	0.0012642	title
23e13472-e4eb-4525-8ba4-f02023581791	2025-05-04 17:03:34.872232+00	68336234_1746378192	gpt-4o	403	9411	9814	0.0275575	other images
1cfaf3c2-63db-4372-bcd5-aafcf4937167	2025-05-04 17:03:46.266405+00	68336234_1746378192	gpt-4o-mini	1754	7688	9442	0.0022056000000000003	description
ad376e79-186e-48fe-a050-9af675bb8964	2025-05-04 17:04:03.874253+00	68336234_1746378192	gpt-4o-mini	832	10047	10879	0.0020062500000000002	overall rating
479248cc-a106-4ab6-9ff3-688f394c41fa	2025-05-07 14:38:32.10073+00	23719343_1746628710	gpt-4o-mini	8	1470	1478	0.0002253	tier
204f57f5-90fd-482b-99d8-5289c48eef4c	2025-05-07 14:38:58.022082+00	23719343_1746628710	gpt-4o-mini	741	1896	2637	0.000729	description
e36d3dbc-a98c-427a-9171-1d8b0d036f97	2025-05-07 14:38:59.723682+00	23719343_1746628710	gpt-4o-mini	894	2084	2978	0.000849	amenities
ff887ec9-dab5-4fdb-8626-d9bf29c09ebe	2025-05-07 14:39:01.182313+00	23719343_1746628710	gpt-4o-mini	950	4052	5002	0.0011778000000000001	interior design
a82e943f-718f-4514-bc43-2a992b97d357	2025-05-07 14:39:06.739882+00	23719343_1746628710	gpt-4o-mini	1027	4150	5177	0.0012387000000000001	title
b92a40c4-b977-486e-a7fc-ba062ec6881d	2025-05-07 14:39:13.445003+00	23719343_1746628710	gpt-4o	372	3908	4280	0.013489999999999999	other images
320b8760-7c79-44ac-a850-35a7541b437f	2025-05-07 14:39:14.877026+00	23719343_1746628710	gpt-4o	445	1748	2193	0.00882	hero image
b53ac4e2-b4fc-4e67-90c9-7dfbb0cab7d3	2025-05-07 14:39:23.78666+00	23719343_1746628710	gpt-4o-mini	455	4366	4821	0.0009279000000000001	overall rating
710aa765-e192-4da4-8c27-3100764b0817	2025-05-09 03:29:00.595301+00	12824470_1746761339	gpt-4o-mini	7	1583	1590	0.00024165	tier
52f91663-060a-4edb-80f0-c2fab7425f32	2025-05-09 03:29:21.24795+00	12824470_1746761339	gpt-4o-mini	500	1829	2329	0.00057435	interior design
7814ae67-fc4f-4580-b9b3-c262f0b4c1bf	2025-05-09 03:29:21.681645+00	12824470_1746761339	gpt-4o	435	2307	2742	0.0101175	hero image
9a0ed139-e3af-42ae-bbe3-e855eaef890a	2025-05-09 03:29:24.064798+00	12824470_1746761339	gpt-4o	398	7873	8271	0.0236625	other images
9e7fa8ad-98d0-4a07-bf43-02e6afb9a5db	2025-05-09 03:29:25.108274+00	12824470_1746761339	gpt-4o-mini	984	2411	3395	0.0009520500000000001	amenities
f1bd7b9f-6b53-43a4-8652-2ea28b85d52e	2025-05-09 03:29:29.362711+00	12824470_1746761339	gpt-4o-mini	1213	4452	5665	0.0013955999999999999	title
32b4346c-f7f8-466f-affe-b1d759101925	2025-05-09 03:29:31.205026+00	12824470_1746761339	gpt-4o-mini	1241	4607	5848	0.0014356500000000001	description
3dff6883-28c5-484d-a4c6-9902531c34ac	2025-05-10 19:24:14.770153+00	83592355_1746905053	gpt-4o-mini	7	2613	2620	0.00039615	tier
e11bdcde-1303-45f8-bb0a-0b9e93a5af02	2025-05-10 19:24:31.008472+00	83592355_1746905053	gpt-4o-mini	489	1000	1489	0.00044339999999999994	amenities
342bde73-cd8f-4b1d-bf4d-0839fef7e6fe	2025-05-10 19:24:31.989388+00	83592355_1746905053	gpt-4o-mini	474	2867	3341	0.0007144499999999999	interior design
a9c4cc65-41e1-4653-a3ed-c567fa9908bf	2025-05-10 19:24:34.346121+00	83592355_1746905053	gpt-4o	493	2515	3008	0.0112175	hero image
206fc1c1-b328-4501-a5b9-8e63766b6944	2025-05-10 19:24:36.21915+00	83592355_1746905053	gpt-4o-mini	745	3038	3783	0.0009027	description
8ba0e3eb-1706-4d12-adac-6b3a9bb5fe11	2025-05-10 19:24:37.45687+00	83592355_1746905053	gpt-4o-mini	882	6387	7269	0.0014872499999999999	title
32241f5c-e403-468f-a15d-dbdac4f24667	2025-05-10 19:24:38.707258+00	83592355_1746905053	gpt-4o	369	6918	7287	0.020985	other images
1c9bf7dd-07ae-48f3-8ae2-2e53609f9b9c	2025-05-10 19:24:46.372849+00	83592355_1746905053	gpt-4o-mini	436	4411	4847	0.00092325	overall rating
8367c929-2884-4f44-bc4d-2624e661a903	2025-05-11 00:46:38.335018+00	14363002_1746924396	gpt-4o-mini	8	1317	1325	0.00020235	tier
67729007-d518-4265-bd21-f835324fcf2c	2025-05-11 00:46:48.634526+00	14363002_1746924396	gpt-4o	427	1589	2016	0.0082425	hero image
3034dfe3-9c93-4cc7-b769-2a7b51c159fb	2025-05-11 00:46:49.09862+00	14363002_1746924396	gpt-4o	399	4586	4985	0.015455	other images
0454160e-7e5e-42a3-9818-eee2e3015dd8	2025-05-11 00:46:49.44964+00	14363002_1746924396	gpt-4o-mini	502	983	1485	0.00044865	amenities
19fb9d10-c394-433f-862f-640e18457e9f	2025-05-11 00:46:50.394851+00	14363002_1746924396	gpt-4o-mini	573	1586	2159	0.0005817	title
35983133-76aa-4066-be38-4778431961ae	2025-05-11 00:47:00.372197+00	14363002_1746924396	gpt-4o-mini	988	3739	4727	0.00115365	interior design
ae74f6dd-21b3-4afb-9aab-eeb79a2928ff	2025-05-11 00:47:21.795496+00	14363002_1746924396	gpt-4o-mini	2359	7847	10206	0.00259245	description
c1e0b8b1-18b2-4961-b8d5-31119eff76d0	2025-05-11 00:47:39.026568+00	14363002_1746924396	gpt-4o-mini	1048	10742	11790	0.0022401	overall rating
71bc5a5d-5253-43fc-b6aa-69a351daf06c	2025-05-11 02:22:10.898227+00	65178450_1746930129	gpt-4o-mini	7	2579	2586	0.00039105	tier
34740fa7-5f31-49f6-bd48-1e86dd2ca787	2025-05-11 02:22:29.96927+00	65178450_1746930129	gpt-4o	466	2271	2737	0.0103375	hero image
223e4de5-2dad-442f-927d-588e117e698e	2025-05-11 02:22:30.732362+00	65178450_1746930129	gpt-4o-mini	478	934	1412	0.00042689999999999997	amenities
eedc0cd6-8726-49f5-b9ed-96ba581a8c09	2025-05-11 02:22:31.792214+00	65178450_1746930129	gpt-4o-mini	591	2855	3446	0.00078285	title
12d7f36d-1508-44c5-8e24-ae537b4c8d54	2025-05-11 02:22:32.03783+00	65178450_1746930129	gpt-4o-mini	560	2832	3392	0.0007608000000000001	interior design
36ec770f-56c5-4461-9133-7b1254f86a1e	2025-05-11 02:22:36.234777+00	65178450_1746930129	gpt-4o	405	8742	9147	0.025904999999999997	other images
5663dd41-6486-4459-a6fc-c02390e9acda	2025-05-11 02:22:56.163711+00	65178450_1746930129	gpt-4o-mini	2084	11523	13607	0.00297885	description
d33b2d62-e980-44e0-ab38-0bbcefd9348e	2025-05-11 02:23:05.450153+00	65178450_1746930129	gpt-4o-mini	537	4635	5172	0.00101745	overall rating
2d71b301-ca57-49c3-ad60-817ac463cb11	2025-05-11 03:04:32.277566+00	69978132_1746932670	gpt-4o-mini	7	2579	2586	0.00039105	tier
8e39c8bf-cacd-4a38-a697-b26854ea7004	2025-05-11 03:04:41.688358+00	69978132_1746932670	gpt-4o	424	2271	2695	0.0099175	hero image
5f2ccfb0-db40-46ae-aad4-22e90b080a22	2025-05-11 03:04:42.938602+00	69978132_1746932670	gpt-4o-mini	432	2832	3264	0.000684	interior design
a51fbb91-f05a-47d9-9f72-c490ce3de686	2025-05-11 03:04:43.055468+00	69978132_1746932670	gpt-4o-mini	491	2855	3346	0.0007228499999999999	title
1e55f3cb-b80a-461c-a695-dbfd59291920	2025-05-11 03:04:47.617192+00	69978132_1746932670	gpt-4o	437	8742	9179	0.026225	other images
c5aae707-9f25-4350-965e-8d9b141a561d	2025-05-11 03:04:54.539709+00	69978132_1746932670	gpt-4o-mini	999	2500	3499	0.0009744	amenities
33899242-5857-4fa3-b4c4-8743c69de37e	2025-05-11 03:04:57.530891+00	69978132_1746932670	gpt-4o-mini	1286	6823	8109	0.0017950499999999999	description
a254ad9d-b89d-480a-8d51-7d8637108ab2	2025-05-11 03:05:04.831384+00	69978132_1746932670	gpt-4o-mini	438	4551	4989	0.00094545	overall rating
12bb5993-cef6-4811-be16-a68d724a72db	2025-05-11 17:54:04.347209+00	27366156_1746986043	gpt-4o-mini	7	2724	2731	0.0004128	tier
da41dc71-aa53-4047-99e5-f4cb657ddaca	2025-05-11 17:54:13.497166+00	27366156_1746986043	gpt-4o-mini	523	2978	3501	0.0007605	interior design
447fcec2-8f31-4295-894d-c93ea44c794c	2025-05-11 17:54:14.86841+00	27366156_1746986043	gpt-4o	453	2515	2968	0.0108175	hero image
51d0809c-572d-4db6-84f5-1f092bfa1a15	2025-05-11 17:54:16.384778+00	27366156_1746986043	gpt-4o-mini	671	3149	3820	0.00087495	description
44e23b35-ded1-4cc2-b284-fa3952bb59e4	2025-05-11 17:54:21.177306+00	27366156_1746986043	gpt-4o-mini	982	2611	3593	0.0009808500000000001	amenities
3bb398a0-ea60-46f3-8e9b-a60a04f0c9ec	2025-05-11 17:54:21.70033+00	27366156_1746986043	gpt-4o	441	8134	8575	0.024745	other images
f2649963-e748-47dd-8bf4-d74a49ef46e9	2025-05-11 17:54:23.771388+00	27366156_1746986043	gpt-4o-mini	1094	6691	7785	0.0016600500000000002	title
2036d1b3-f88c-4e3d-98e5-c0914f5fead7	2025-05-11 17:54:31.905676+00	27366156_1746986043	gpt-4o-mini	487	4491	4978	0.0009658500000000001	overall rating
509f2b4d-e2e1-4900-8a6e-f8065d780d0e	2025-05-11 18:49:13.18669+00	62540451_1746989351	gpt-4o-mini	7	2795	2802	0.00042345	tier
a19c9108-cdee-4039-bdb8-77582fe7946f	2025-05-11 18:49:30.09159+00	62540451_1746989351	gpt-4o-mini	470	3048	3518	0.0007392	interior design
e41be113-c9fb-4725-9be0-e40ef6078e10	2025-05-11 18:49:32.305274+00	62540451_1746989351	gpt-4o	448	2585	3033	0.0109425	hero image
04e2d06a-f418-4bef-80e2-7fe5f66649ba	2025-05-11 18:49:33.400167+00	62540451_1746989351	gpt-4o-mini	541	1081	1622	0.00048675	amenities
4462e888-97ab-41a5-be24-7566563949bc	2025-05-11 18:49:35.203954+00	62540451_1746989351	gpt-4o-mini	708	3219	3927	0.0009076500000000001	description
e7131eb0-e70d-465a-9824-6a1654fdb303	2025-05-11 18:49:37.270848+00	62540451_1746989351	gpt-4o	402	8134	8536	0.024354999999999998	other images
f758f23b-d4b3-465d-9822-a0a3fde34850	2025-05-11 18:49:40.134524+00	62540451_1746989351	gpt-4o-mini	1011	6782	7793	0.0016239000000000002	title
d7a4f6d5-d12b-41b7-a844-addedc11321f	2025-05-11 18:49:49.434073+00	62540451_1746989351	gpt-4o-mini	467	4436	4903	0.0009456	overall rating
1fb224af-3c74-408f-bae6-3872990d6d9c	2025-05-12 21:46:34.492613+00	13478751_1747086393	gpt-4o-mini	8	2747	2755	0.00041685	tier
073ac826-de85-46f1-b6b5-bdab2caec232	2025-05-12 21:46:52.868066+00	13478751_1747086393	gpt-4o-mini	590	3027	3617	0.00080805	title
60d46737-4869-497c-bdbe-0b50d8ddda60	2025-05-12 21:46:56.08021+00	13478751_1747086393	gpt-4o-mini	744	3175	3919	0.00092265	description
8013f212-3c20-4a34-bc69-2794ef021cbd	2025-05-12 21:46:58.801168+00	13478751_1747086393	gpt-4o-mini	1054	3082	4136	0.0010947	amenities
9b111480-8695-4699-9c36-50037a71b331	2025-05-12 21:46:58.824621+00	13478751_1747086393	gpt-4o-mini	1028	6641	7669	0.00161295	interior design
797d91da-9366-4c3e-9be6-3a55006076ae	2025-05-12 21:47:01.087056+00	13478751_1747086393	gpt-4o	403	2538	2941	0.010374999999999999	hero image
60a35bda-2975-49d4-9fdc-820e71a87b82	2025-05-12 21:47:06.176968+00	13478751_1747086393	gpt-4o	412	10432	10844	0.030199999999999998	other images
bf4f54b7-c233-4338-984a-bfe63fb1182d	2025-05-12 21:47:18.514404+00	13478751_1747086393	gpt-4o-mini	538	4926	5464	0.0010617	overall rating
e1fffc26-354b-4b68-bc7d-371fbf50387c	2025-05-14 20:21:42.344345+00	13198439_1747254100	gpt-4o-mini	8	1285	1293	0.00019755	tier
4cd3b248-0f7f-464d-85e0-d1fa422511ec	2025-05-14 20:22:01.817786+00	13198439_1747254100	gpt-4o-mini	472	1557	2029	0.0005167500000000001	title
f2c57c17-7384-4f55-b5f6-5a114c09a880	2025-05-14 20:22:08.976817+00	13198439_1747254100	gpt-4o	432	1855	2287	0.0089575	hero image
8a99f820-f2aa-406c-80e8-ecfcc9f82b8a	2025-05-14 20:22:11.200968+00	13198439_1747254100	gpt-4o-mini	956	2289	3245	0.0009169499999999999	amenities
322977b0-b938-4722-b880-64f098763d47	2025-05-14 20:22:11.501842+00	13198439_1747254100	gpt-4o	409	5566	5975	0.018005	other images
67a967e5-0ee4-48e3-974c-f5c0117835be	2025-05-14 20:22:14.414314+00	13198439_1747254100	gpt-4o-mini	896	3651	4547	0.0010852499999999998	interior design
75ee643c-a6c2-479d-8fa7-6eb445c0a69f	2025-05-14 20:22:27.573498+00	13198439_1747254100	gpt-4o-mini	1798	7195	8993	0.00215805	description
ec89585a-3968-4526-970a-6c757249f7f3	2025-05-14 20:22:38.357577+00	13198439_1747254100	gpt-4o-mini	471	4705	5176	0.00098835	overall rating
fe131e9e-0d3f-4a82-87b1-a2801ddfc1fe	2025-05-15 00:24:56.241596+00	80380720_1747268694	gpt-4o-mini	7	1583	1590	0.00024165	tier
930785f3-1e4d-4838-b9bc-73da0abb4184	2025-05-15 00:25:15.6371+00	80380720_1747268694	gpt-4o-mini	491	1829	2320	0.0005689499999999999	interior design
1dce743c-396b-49b7-bf2e-8e061972a282	2025-05-15 00:25:17.521642+00	80380720_1747268694	gpt-4o-mini	493	900	1393	0.00043079999999999995	amenities
c69f8a13-c327-4263-b9c9-18eed41c6840	2025-05-15 00:25:22.127607+00	80380720_1747268694	gpt-4o-mini	717	2000	2717	0.0007302	description
819480b9-2501-46e3-9071-3c0814be5e19	2025-05-15 00:25:23.464426+00	80380720_1747268694	gpt-4o	481	2307	2788	0.0105775	hero image
ef189e2e-a840-4439-abe3-9e7c4aaae478	2025-05-15 00:25:23.657175+00	80380720_1747268694	gpt-4o	405	7873	8278	0.023732499999999997	other images
e840e0b4-8b52-48fc-8dab-e5ffa06e3858	2025-05-15 00:34:23.305923+00	35450383_1747269262	gpt-4o-mini	7	1583	1590	0.00024165	tier
d1b6508e-03ec-4e21-a58a-378840a6bd5a	2025-05-15 00:34:31.759251+00	35450383_1747269262	gpt-4o-mini	498	1829	2327	0.0005731499999999999	interior design
fd806402-fce4-4388-9b43-30ff7d1314f4	2025-05-15 00:34:32.663189+00	35450383_1747269262	gpt-4o-mini	478	900	1378	0.00042179999999999995	amenities
d00c8dad-4f26-48e2-b398-2f727dbdb71f	2025-05-15 00:34:39.44175+00	35450383_1747269262	gpt-4o	488	2307	2795	0.0106475	hero image
c66f8f97-76ca-4691-b226-2e230be9eb22	2025-05-15 00:34:39.560998+00	35450383_1747269262	gpt-4o	402	7873	8275	0.023702499999999998	other images
3f78b51d-5b9b-4c95-a003-16cba14e69f2	2025-05-15 00:34:41.572372+00	35450383_1747269262	gpt-4o-mini	1102	4397	5499	0.0013207499999999999	title
bf7ffdad-8075-4f62-a34d-0e0773e89a9e	2025-05-15 00:34:42.518474+00	35450383_1747269262	gpt-4o-mini	1211	4593	5804	0.00141555	description
51482507-754b-4614-aeae-b2081809cba9	2025-05-15 00:34:51.34158+00	35450383_1747269262	gpt-4o-mini	497	4873	5370	0.00102915	overall rating
31a12012-1969-425b-8a58-6cbc06cda0bb	2025-05-21 22:59:23.450947+00	97818353_1747868362	gpt-4o-mini	7	1907	1914	0.00029025	tier
47e27ca2-69d7-4120-b435-418e08a4696c	2025-05-21 22:59:36.880286+00	97818353_1747868362	gpt-4o-mini	591	2182	2773	0.0006819	title
f117fd64-a0b5-4dae-ad1a-25d32484487e	2025-05-21 22:59:38.288905+00	97818353_1747868362	gpt-4o-mini	458	930	1388	0.00041430000000000004	amenities
5efa8f79-1218-42af-808d-a8a04904d2a4	2025-05-21 22:59:41.186565+00	97818353_1747868362	gpt-4o-mini	676	2330	3006	0.0007551	description
d304a35d-f4e3-4a90-afdb-124e33a2f088	2025-05-21 22:59:47.353138+00	97818353_1747868362	gpt-4o	416	2157	2573	0.009552499999999998	hero image
9e6327ef-7044-4e05-b6a2-10bcfb84edd2	2025-05-21 22:59:49.508828+00	97818353_1747868362	gpt-4o-mini	1004	4947	5951	0.00134445	interior design
730c400e-7292-42d6-9499-327710663b01	2025-05-21 22:59:50.791677+00	97818353_1747868362	gpt-4o	408	11329	11737	0.0324025	other images
370974a5-59dc-4619-936e-0f5a16e090e4	2025-05-21 22:59:58.999755+00	97818353_1747868362	gpt-4o-mini	462	4778	5240	0.0009939	overall rating
3ff053c7-6ee4-465c-9ccb-263559716481	2025-05-25 21:17:46.93668+00	81229487_1748207865	gpt-4o-mini	6	1688	1694	0.00025679999999999995	tier
574cbddb-f141-4877-9e41-e647f75d271c	2025-05-25 21:18:03.620666+00	81229487_1748207865	gpt-4o-mini	934	2567	3501	0.00094545	amenities
d60019b6-d8ef-41f8-907f-b829749e227d	2025-05-25 21:18:04.343354+00	81229487_1748207865	gpt-4o-mini	644	2110	2754	0.0007029	description
d29c1068-bc2e-4c9b-9fa4-a07861768faa	2025-05-25 21:18:05.251142+00	81229487_1748207865	gpt-4o-mini	514	1939	2453	0.00059925	interior design
e78ee958-11e7-4929-8356-ced3d5b4dd0b	2025-05-25 21:18:08.853526+00	81229487_1748207865	gpt-4o	429	1687	2116	0.008507500000000001	hero image
633f98ba-3a27-4e81-8125-ec689b74eb87	2025-05-25 21:18:12.548926+00	81229487_1748207865	gpt-4o	387	9368	9755	0.027290000000000002	other images
3cd29694-929d-4adb-8261-47c40b82a0dd	2025-05-25 21:18:22.653645+00	81229487_1748207865	gpt-4o-mini	1214	7585	8799	0.00186615	title
a861db48-9f0c-4aa5-854d-d7e59ab3b573	2025-05-25 21:18:29.426488+00	81229487_1748207865	gpt-4o-mini	403	4535	4938	0.00092205	overall rating
0bed6ef4-1a54-4e68-8974-0556a3f384d5	2025-05-26 04:14:36.994311+00	21105337_1748232875	gpt-4o-mini	6	2620	2626	0.0003966	tier
cbfab807-a63d-48c7-ab7a-d5880c460d78	2025-05-26 04:14:52.872871+00	21105337_1748232875	gpt-4o-mini	472	934	1406	0.0004233	amenities
cd3175ac-a3bf-44cb-90da-c827f337aa6f	2025-05-26 04:14:56.316779+00	21105337_1748232875	gpt-4o	439	2631	3070	0.0109675	hero image
cd084e87-7a6e-4db1-952c-b5f96e716650	2025-05-26 04:14:58.821269+00	21105337_1748232875	gpt-4o-mini	745	3044	3789	0.0009036000000000001	description
a4e75659-0676-45be-a042-641773573d1c	2025-05-26 04:14:59.689101+00	21105337_1748232875	gpt-4o	356	9103	9459	0.0263175	other images
4cb09c4c-7bcf-4a88-8558-a734875e4e59	2025-05-26 04:15:03.904763+00	21105337_1748232875	gpt-4o-mini	932	6347	7279	0.00151125	interior design
4d0ac34c-3d2f-4024-96c3-132054e92c2d	2025-06-01 02:35:50.667629+00	97442334_1748745349	gpt-4o-mini	6	1928	1934	0.00029279999999999996	tier
29ceb145-7933-4c5b-83c8-0d8c18e405cd	2025-06-01 02:35:58.877639+00	97442334_1748745349	gpt-4o-mini	505	2202	2707	0.0006333	title
83431d95-adc6-44c0-8dc0-41dbc5f0defe	2025-06-01 02:35:59.750335+00	97442334_1748745349	gpt-4o	382	1706	2088	0.008085	hero image
8527cb98-c592-41bc-96d0-2cae42327a7c	2025-06-01 02:36:00.642009+00	97442334_1748745349	gpt-4o-mini	512	996	1508	0.0004566	amenities
1aeca51c-9748-4573-b45a-8caa077a8955	2025-06-01 02:36:00.936345+00	97442334_1748745349	gpt-4o	379	6104	6483	0.019049999999999997	other images
0371b9e3-1d22-4496-9713-6fff5a4a8740	2025-06-01 02:36:00.975632+00	97442334_1748745349	gpt-4o-mini	690	2350	3040	0.0007665	description
80b49a92-bea8-4df2-8658-2895c9288ae4	2025-06-01 02:36:10.652176+00	97442334_1748745349	gpt-4o-mini	995	5011	6006	0.0013486499999999998	interior design
19e3428f-05dc-418f-be8e-9a29e52a7310	2025-06-01 02:36:18.489416+00	97442334_1748745349	gpt-4o-mini	515	4665	5180	0.0010087499999999999	overall rating
b671ef10-b165-46c0-b824-04c959ff56dc	2025-09-19 23:37:01.521455+00	18267284_1758325019	gpt-4o-mini	6	2184	2190	0.0003312	tier
a9fe27ef-35fa-4413-9dfd-90d08b8c16d1	2025-09-19 23:37:24.345417+00	18267284_1758325019	gpt-4o-mini	433	1116	1549	0.00042720000000000003	amenities
98e574bb-c7ac-4a38-a902-91604b9b7ad0	2025-09-19 23:37:24.349354+00	18267284_1758325019	gpt-4o-mini	490	2440	2930	0.00066	interior design
acaa26ab-ffb6-44d4-82a0-50c1f8b18d15	2025-09-19 23:37:25.628326+00	18267284_1758325019	gpt-4o-mini	521	2463	2984	0.00068205	title
706cdfd3-21f5-4e59-aab0-216a750f5885	2025-09-19 23:37:29.173998+00	18267284_1758325019	gpt-4o	456	2360	2816	0.01046	hero image
06f11545-5877-4b7f-bbfb-2f0caf0c2a9f	2025-09-19 23:37:34.01424+00	18267284_1758325019	gpt-4o	429	4011	4440	0.0143175	other images
37c90139-8f1e-43cc-8114-54eec1316755	2025-09-19 23:37:37.067556+00	18267284_1758325019	gpt-4o-mini	1244	5815	7059	0.0016186500000000001	description
239d7654-e38b-457f-8fef-1de1c55e9632	2025-09-19 23:37:46.868454+00	18267284_1758325019	gpt-4o-mini	466	4758	5224	0.0009933	overall rating
\.


--
-- Data for Name: plans; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.plans (id, created_at, name, description, active, key) FROM stdin;
\.


--
-- Data for Name: plans_features_map; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.plans_features_map (id, created_at, plan_id, feature_id) FROM stdin;
\.


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profiles (id, updated_at, username, full_name, avatar_url, website) FROM stdin;
2d28824e-7da2-4f94-86c8-c169fbb17f14	\N	\N	\N	\N	\N
9622ec62-4edb-4c3d-ba47-d9f7b78b098e	\N	\N	\N	\N	\N
8b883958-ffca-4f06-860f-b73753f4a1c8	2025-04-27 20:35:06.347+00	gsmiiith	Geoffrey Smith	\N	\N
7a15b080-dee4-4cfd-b5e3-b82c5ac51ec6	\N	\N	\N	\N	\N
9d09ce16-014e-4e6b-bf29-9569bea73610	\N	\N	\N	\N	\N
01294339-df5d-448c-b6f9-ad9980ea25c9	\N	\N	\N	\N	\N
2a6c6985-d71f-4805-951e-9c1e76e3975f	\N	\N	\N	\N	\N
3f2332c9-4f3f-45ed-9215-a65684d36bf5	\N	\N	\N	\N	\N
d0418bd1-e5e0-413e-9696-17d1e34556b3	\N	\N	\N	\N	\N
3d6ec7f6-350e-467f-9178-6fa595bab52e	\N	\N	\N	\N	\N
e151c236-9a85-4de3-ba10-56d0ffe2feb2	\N	\N	\N	\N	\N
7def9335-8114-4b71-b5f3-8194b8f1cac8	\N	\N	\N	\N	\N
2c7f34a4-2893-48c3-b552-3e505a9c2135	\N	\N	\N	\N	\N
956aca82-f8e9-462d-aaa8-8c78af551e96	\N	\N	\N	\N	\N
1f04962f-9175-4935-a985-bf47c694a262	\N	\N	\N	\N	\N
8c9a07f9-6d75-4144-a987-c5a9e7e500ea	\N	\N	\N	\N	\N
dca1a8ab-6b8d-4e0a-a4d3-e28df4462192	\N	\N	\N	\N	\N
99d864a8-cf28-40ae-82d5-d28fd8f8a10b	\N	\N	\N	\N	\N
0c89b7a9-692b-458b-b556-780cc4552188	\N	\N	\N	\N	\N
3651e1f8-d0c8-4675-8a2e-75d10cc4342f	\N	\N	\N	\N	\N
cd26ec36-fc54-4623-a7d6-5ca4dcd7853e	\N	\N	\N	\N	\N
\.


--
-- Data for Name: properties; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.properties (id, created_at, name, description, profile_id, primary_email, secondary_email, primary_phone, secondary_phone, primary_contact, secondary_contact, notification_preference) FROM stdin;
\.


--
-- Data for Name: property_ratings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.property_ratings (id, created_at, property_id, ratings, modified_at) FROM stdin;
5b5fb48b-e626-40df-8e6e-a4fd22b4cd1c	2025-04-27 17:28:12.718144+00	7cee2fb2-cfa4-48ce-976a-87b8347ca1e7	{"title": {"feedback": {"items": [{"title": "Highlight Unique Features", "feedback": "Consider adding specific unique features, such as the modern upgrades or ambiance, to attract attention."}, {"title": "Clarify Privacy Aspects", "feedback": "A clearer indication of what it means to be an upper duplex would be beneficial for potential guests."}, {"title": "Consider Adding Family-Friendly Keywords", "feedback": "Incorporating terms like 'Family-Friendly' in the title could appeal to guests traveling with children."}, {"title": "Descriptive Adjectives", "feedback": "Using more descriptive terms can make the title feel more inviting and appealing."}, {"title": "Showcase Nearby Attractions", "feedback": "Mentioning proximity to attractions or activities could enhance the attractiveness of the title."}], "summary": "The title effectively conveys the charm and key feature of the property, especially the ocean views, appealing to beach-loving guests."}, "revisions": ["Dreamy Ocean Escape: Family-Friendly Upper Duplex in Newport Beach", "Ocean Haven: Vibrant 3BR Upper Duplex with Gorgeous Views", "Charming Beachfront Escape: Dreamy Ocean Views at Newport Beach"], "suggestions": ["Add family-friendly descriptors to appeal to larger groups.", "Incorporate unique features like modern upgrades or amenities in the title.", "Clarify the duplex aspect regarding shared spaces.", "Use more enticing adjectives that describe both the property and the experience.", "Highlight the property's established rental history to build trust with potential guests."], "property_name": "Dreamy Ocean Views: Newport Beach (Upper Duplex)", "rating_number": 67, "expert_ratings": [52, 67, 94, 56, 89, 76, 54, 48, 75, 66, 82, 78, 36, 68, 41, 72, 53, 69, 74, 39, 38, 75, 81, 44, 62, 58, 80, 88, 59, 30, 19, 55, 76, 33, 35, 63, 64, 34, 39, 51, 15, 62, 91, 70, 60, 46, 72, 28, 81, 45, 33, 74, 29, 40, 62, 17, 83, 18, 21, 39, 57, 68, 10, 91, 83, 11, 49, 57, 76, 19, 92, 86, 21, 87, 91, 73, 48, 11, 72, 58, 38, 61, 74, 48, 59, 47, 33, 36, 23, 68, 59, 90, 11, 35, 92, 57, 86, 55, 23, 78, 61, 71, 42, 17, 95, 41, 17, 42, 12, 42, 22, 17, 58, 74, 29, 56, 39, 75, 16, 45, 51, 34, 20, 84, 11, 74, 90, 69, 82, 85, 28], "title_rewrites": ["Oceanfront Retreat: Modern Duplex with Stunning Ocean Views in Newport Beach", "Experience Tranquility: Dreamy Views from Newport Beach Upper Unit", "Family-Friendly Duplex: Enjoy Dreamy Ocean Views in Newport Beach"], "rating_category": "Needs Work"}, "amenities": {"feedback": {"items": [{"title": "Scenic and Beach Views", "feedback": "Your property's scenic and beach views are captivating and certainly a highlight for guests."}, {"title": "Kitchen Equipment", "feedback": "While the kitchen is well-furnished, consider adding more cooking essentials to enhance the cooking experience."}, {"title": "Family-Friendly Features", "feedback": "The family-friendly amenities are great, but including more games or activities for kids would be beneficial."}, {"title": "Safety Features", "feedback": "Your home safety features are commendable, but guests appreciate additional details in the manuals for using smoke alarms and extinguishers."}, {"title": "Parking Availability", "feedback": "Free parking is a significant plus, but clarifying the parking arrangements can prevent any confusion."}], "summary": "You have a well-equipped premium property, but some areas can still be enhanced for a better guest experience."}, "revisions": null, "suggestions": ["Add more kitchen utensils and gadgets to cater to different cooking styles.", "Consider providing additional family activities like toys or outdoor games.", "Enhance information on safety features and how they function within a detailed guide.", "Provide more clarity on parking arrangements to ease guest concerns.", "Look into adding air conditioning as it could significantly enhance comfort. "], "property_name": "Premium Beachfront Escape", "rating_number": 78, "expert_ratings": [84, 73, 59, 91, 64, 75, 62, 81, 78, 50, 85, 92, 77, 53, 68, 90, 66, 87, 72, 56, 84, 65, 97, 88, 71, 48, 96, 70, 89, 93, 61, 79, 76, 95, 69, 63, 60, 88, 55, 80, 74, 57, 94, 67, 52, 78, 81, 90, 70, 64, 61, 87, 73, 55, 71, 66, 89, 99, 72, 62, 58, 66, 88, 99, 74, 79, 63, 85, 81, 94, 54, 60, 74, 82, 64, 88, 58, 90, 92, 59, 91, 67, 84, 61, 75, 68, 69, 52, 99, 80, 71, 55, 75, 55, 84, 70, 66, 60, 93, 78, 62, 58, 88, 99, 76], "rating_category": "Satisfactory"}, "hero_image": {"feedback": {"items": [{"title": "Beachfront Appeal", "feedback": "The image beautifully showcases the property's proximity to the beach, which is likely to attract beachgoers."}, {"title": "Inviting Atmosphere", "feedback": "The bright, warmly lit windows give a welcoming feel that enhances the property's allure."}, {"title": "Clear Presentation", "feedback": "The image clearly presents the structure and exterior amenities, giving guests a good sense of what to expect."}], "summary": "This image nicely captures the beachfront location and inviting exterior of the property, making it appealing for potential guests."}, "revisions": null, "suggestions": ["Include a sunset view to highlight the ocean location.", "Showcase the interior to complement the exterior view.", "Add a closer shot of the beachfront area.", "Capture the porch’s view from upstairs to enhance appeal.", "Use more vibrant lighting to enhance colors."], "property_name": "Dreamy Ocean Views: Newport Beach (Upper Duplex)", "rating_number": 85, "expert_ratings": [77, 81, 84, 83, 86, 90, 88, 79, 82, 85, 87, 78, 80, 86, 91, 88, 77, 85, 82, 84, 79, 83, 88, 81, 86, 89, 78, 84, 87, 85, 88, 84, 80, 83, 82, 89, 81, 90, 82, 88, 87, 84, 77, 85, 83, 82, 84, 90, 87, 81, 79, 83, 86, 85, 87, 84, 88, 81, 82, 85, 90, 78, 81, 87, 86, 89, 84, 82, 77, 83, 89, 85, 86, 84, 83, 80, 88, 81, 82, 90, 80, 84, 87, 88, 89, 86, 77, 81, 85, 84, 88, 83, 86, 87, 89, 82, 85, 88, 81, 84], "rating_category": "Good"}, "description": {"feedback": {"items": [{"title": "Highlighting Unique Features", "feedback": "Consider putting more emphasis on the unique selling points, such as the premium tier and modern upgrades alongside the beautiful ocean views."}, {"title": "Image Quality", "feedback": "Ensure your images not only showcase the views but also highlight the living space and bedrooms effectively, as this is crucial for attracting guests."}, {"title": "Clarifying Shared Spaces", "feedback": "Clarify and present shared spaces in a way that feels welcoming to avoid misunderstanding for future guests."}, {"title": "Streamlining Content", "feedback": "The description could benefit from being more concise and organized, which helps in maintaining potential guests' attention."}, {"title": "Local Attractions Emphasis", "feedback": "Integrate specific local attractions or activities that guests can enjoy in the area, which can greatly enhance the appeal."}], "summary": "Your listing reflects a beautiful beachside offering with excellent views, but more emphasis on specific amenities and guest experiences can boost interest."}, "revisions": null, "suggestions": ["Enhance the emphasis on ocean views in the description.", "Condense the text for improved clarity.", "Include more information about nearby attractions and family-friendly activities.", "Highlight modern upgrades and family-oriented amenities more prominently.", "Invite potential guests with a stronger call to action."], "property_name": "Dreamy Ocean Views: Newport Beach (Upper Duplex)", "rating_number": 79, "expert_ratings": [88, 76, 73, 61, 91, 82, 79, 72, 85, 65, 70, 76, 60, 89, 80, 68, 78, 90, 81, 87, 69, 71, 84, 93, 77, 66, 62, 68, 82, 89, 72, 74, 64, 88, 62, 84, 75, 70, 89, 82, 66, 63, 86, 88, 65, 91, 88, 77, 74, 90, 69, 85, 99, 67, 81, 73, 76, 68, 92, 64, 60, 55, 82, 71, 79, 66, 63, 89, 72, 84, 78, 67, 81, 90, 62, 69, 85, 68, 66, 87, 88, 62, 76, 72, 81, 61, 80, 67, 69, 83, 87, 81, 75, 81, 83, 89, 77, 65, 62, 73, 84, 95, 88, 90, 89, 80, 82, 81, 71, 64, 79, 62, 70, 88, 74, 72, 68, 81, 76], "rating_category": "Satisfactory", "description_rewrite": {"guest_access": "Guests have exclusive access to the upper unit and its private entrance. You'll find one parking space included, along with nearby street parking for additional convenience.", "your_property": "This lovely upper unit boasts 3 bedrooms and 2 baths, all with stunning ocean vistas. Enjoy a fully equipped kitchen and a washer/dryer for convenience during your stay with family.", "listing_description": "Discover jaw-dropping ocean views from this premium upper duplex in Newport Beach. Featuring modern upgrades and spacious bedrooms, it's an ideal retreat for families. While the porch is for downstairs guests, you'll still enjoy fantastic access to Balboa Pier and the surrounding attractions.", "other_details_to_note": "Please note a 10% city tourism tax applies. We maintain a quiet environment, with no loud gatherings allowed after 9 PM.", "interaction_with_guests": "While you have complete privacy, I'm happy to assist with any inquiries during your stay to ensure your comfort and satisfaction."}}, "other_images": {"feedback": {"items": [{"title": "Exterior Appeal", "feedback": "The exterior photo is visually striking and invites guests to experience beachfront living."}, {"title": "Interior Ambiance", "feedback": "Interior shots beautifully capture the airy, beachside decor, enhancing the inviting atmosphere."}, {"title": "View Highlight", "feedback": "The use of windows to frame stunning views is an excellent touch, enhancing the appeal."}], "summary": "The photos effectively capture the essence of a premium beachfront retreat, showcasing both style and comfort."}, "revisions": null, "suggestions": ["Ensure all photos have consistent lighting to maintain a warm and welcoming feel.", "Highlight unique features of the property more prominently in the photos.", "Consider adding a night-time exterior shot for a complete view of ambiance.", "Incorporate more detailed images of amenities offered."], "property_name": "Premium Beachfront Retreat", "rating_number": 87, "expert_ratings": [91, 85, 88, 92, 89, 86, 87, 84, 83, 89, 90, 88, 87, 86, 85, 91, 89, 84, 86, 88, 89, 92, 85, 88, 89, 87, 86, 84, 91, 93, 90, 87, 89, 86, 88, 85, 87, 88, 83, 90, 89, 85, 87, 92, 88, 87, 89, 90, 86, 84, 85, 89, 91, 87, 89, 84, 88, 90, 92, 86, 87, 89, 85, 83, 88, 91, 87, 85, 92, 89, 88, 84, 86, 87, 90, 93, 87, 85, 88, 89, 92, 90, 85, 84, 89, 86, 87, 88, 89, 85, 91, 88, 86, 84, 87, 89, 92, 88, 85, 90], "rating_category": "Good"}, "interior_design": {"feedback": {"items": [{"title": "Color Palette", "feedback": "The color scheme reflects coastal vibes but could benefit from more contrast to make spaces feel vibrant."}, {"title": "Furniture Arrangement", "feedback": "The layout is functional but feels a bit tight; consider rearranging furniture to create a more inviting flow."}, {"title": "Decoration and Accessories", "feedback": "Some rooms lack personality; adding art or decorative pieces can enhance the overall aesthetic."}, {"title": "Lighting", "feedback": "Natural lighting is a strong point, but consider adding ambient and task lighting for different moods."}, {"title": "Outdoor Access", "feedback": "The shared patio situation creates some limitations; perhaps personal outdoor space could be explored in future."}], "summary": "The interior design of your property offers a pleasant, beach-themed ambiance that complements the nearby ocean views. While there are some great elements in place, there are areas that could use attention to elevate the experience further."}, "revisions": null, "suggestions": ["Incorporate brighter accent colors to energize the space.", "Rearrange furniture for better flow and accessibility.", "Add local artwork or decor to inject personality.", "Invest in versatile lighting solutions for various occasions.", "Explore options for private outdoor seating."], "property_name": "Dreamy Ocean Views: Newport Beach (Upper Duplex)", "rating_number": 75, "expert_ratings": [74, 65, 81, 90, 72, 66, 58, 85, 66, 77, 68, 48, 53, 78, 91, 59, 73, 82, 88, 76, 50, 65, 57, 80, 62, 67, 64, 75, 89, 58, 60, 86, 69, 52, 71, 49, 56, 61, 70, 87, 92, 55, 83, 95, 41, 74, 63, 43, 56, 74, 66, 64, 72, 75, 90, 51, 78, 88, 97, 54, 68, 80, 79, 82, 66, 73, 84, 58, 62, 57, 71, 55, 77, 85, 75, 91, 66, 69, 82, 80, 62, 70, 84, 53, 88, 72, 64, 76, 75, 61, 54, 69, 89, 41, 81, 43, 77, 60, 73, 92, 79, 61, 84, 67, 55, 74], "rating_category": "Satisfactory"}, "overall_ratings": {"feedback": {"items": [{"title": "Highlighting Unique Features", "feedback": "Consider putting more emphasis on the unique selling points, such as the premium tier and modern upgrades alongside the beautiful ocean views."}, {"title": "Image Quality", "feedback": "Ensure your images not only showcase the views but also highlight the living space and bedrooms effectively, as this is crucial for attracting guests."}, {"title": "Clarifying Shared Spaces", "feedback": "Clarify and present shared spaces in a way that feels welcoming to avoid misunderstanding for future guests."}, {"title": "Streamlining Content", "feedback": "The description could benefit from being more concise and organized, which helps in maintaining potential guests' attention."}, {"title": "Local Attractions Emphasis", "feedback": "Integrate specific local attractions or activities that guests can enjoy in the area, which can greatly enhance the appeal."}], "summary": "Your listing reflects a beautiful beachside offering with excellent views, but more emphasis on specific amenities and guest experiences can boost interest."}, "revisions": null, "suggestions": ["Enhance the emphasis on ocean views in the description.", "Condense the text for improved clarity.", "Include more information about nearby attractions and family-friendly activities.", "Highlight modern upgrades and family-oriented amenities more prominently.", "Invite potential guests with a stronger call to action."], "property_name": "Dreamy Ocean Views: Newport Beach (Upper Duplex)", "rating_number": 79, "expert_ratings": [88, 76, 73, 61, 91, 82, 79, 72, 85, 65, 70, 76, 60, 89, 80, 68, 78, 90, 81, 87, 69, 71, 84, 93, 77, 66, 62, 68, 82, 89, 72, 74, 64, 88, 62, 84, 75, 70, 89, 82, 66, 63, 86, 88, 65, 91, 88, 77, 74, 90, 69, 85, 99, 67, 81, 73, 76, 68, 92, 64, 60, 55, 82, 71, 79, 66, 63, 89, 72, 84, 78, 67, 81, 90, 62, 69, 85, 68, 66, 87, 88, 62, 76, 72, 81, 61, 80, 67, 69, 83, 87, 81, 75, 81, 83, 89, 77, 65, 62, 73, 84, 95, 88, 90, 89, 80, 82, 81, 71, 64, 79, 62, 70, 88, 74, 72, 68, 81, 76], "rating_category": "Satisfactory"}}	2025-04-27 17:28:12.718144
f782f795-9f4e-4f6e-a913-f202b2292e29	2025-04-27 17:38:46.324113+00	70dfa2bd-bfb8-472a-b526-f6393c0a452c	{"title": {"feedback": {"items": [{"title": "Clarity", "feedback": "While terms like 'Luxury' and 'HOT TUB' are appealing, ensuring that the title reads smoothly could attract more guests."}, {"title": "Emphasis on Location", "feedback": "Including a mention of the scenic surroundings or proximity to key attractions could help potential guests visualize their stay."}, {"title": "Uniqueness", "feedback": "Consider highlighting any unique features of your villa or experiences that guests can enjoy during their stay."}], "summary": "Your title effectively conveys the appeal of your property, highlighting luxury and the hot tub. However, it might benefit from some enhancements to make it even more inviting."}, "revisions": ["Lakefront Luxury: *NEW* Villa with Hot Tub & Scenic Views", "Charming Lake Time Villa: Luxury Getaway with Hot Tub", "Relax at Lake Time: New Luxury Cabin with Hot Tub"], "suggestions": ["Consider adding a phrase about the lake views to attract outdoor enthusiasts.", "Use descriptive adjectives to depict the ambiance of the cabin or its surroundings.", "Mention the proximity to local attractions for guests looking for adventure or convenience."], "property_name": "Lake Time Villa *NEW* Luxury w/ HOT TUB", "rating_number": 85, "expert_ratings": [82, 75, 90, 68, 85, 76, 99, 88, 70, 72, 74, 91, 89, 77, 81, 87, 92, 69, 66, 78, 95, 84, 73, 67, 96, 82, 83, 80, 91, 65, 71, 87, 74, 88, 90, 63, 66, 68, 62, 61, 94, 70, 92, 95, 83, 72, 80, 69, 75, 81, 78, 93, 82, 90, 77, 89, 65, 92, 94, 67, 71, 68, 66, 96, 79, 63, 64, 69, 82, 85, 76, 73, 71, 94, 67, 91, 96, 74, 80, 92, 88, 61, 93, 98, 90, 95, 64, 96, 99, 90, 68, 83, 91, 85, 96, 62, 71, 63, 70, 89, 65, 93, 72, 87, 96, 74, 84, 81, 68, 62, 73, 86, 66, 77, 97, 87, 82, 66, 88, 99, 92, 80, 80, 93, 60, 82, 59, 87], "title_rewrites": ["Luxury Lake View Villa with Private Hot Tub", "*NEW* Cozy Lakefront Villa | Hot Tub & Scenic Views", "Lake Time Getaway: Luxury Villa w/ Hot Tub & Lake Views"], "rating_category": "Good"}, "amenities": {"feedback": {"items": [{"title": "Scenic Views", "feedback": "You have an excellent range of scenic views that guests appreciate, making the stay more enjoyable."}, {"title": "Kitchen Facilities", "feedback": "The kitchen is great, but some essential items are listed as unavailable, which can be inconvenient."}, {"title": "Entertainment Options", "feedback": "The entertainment options are well-received, but some guests may desire additional options beyond what's available."}, {"title": "Safety Features", "feedback": "The safety features are comprehensive, earning positive feedback from many guests, especially the presence of smoke detectors."}, {"title": "Parking Accessibility", "feedback": "The free street parking is a great addition, but guests might value more details about accessibility."}], "summary": "The amenities provided in this premium stay are quite impressive, giving a wonderful experience to most guests. However, there are areas where improvements could be made to enhance guest satisfaction further."}, "revisions": null, "suggestions": ["Consider adding the unavailable kitchen items to enhance guest convenience.", "Explore the possibility of including additional entertainment amenities like streaming services or games.", "Ensure that the listed amenities are all accessible and avoid using 'unavailable' to prevent guest confusion."], "property_name": "Premium Stay Property", "rating_number": 83, "expert_ratings": [76, 82, 85, 90, 75, 88, 83, 81, 79, 84, 77, 89, 80, 72, 87, 74, 91, 78, 86, 73, 82, 89, 84, 87, 90, 76, 82, 81, 75, 78, 83, 88, 85, 89, 92, 74, 77, 81, 83, 76, 80, 82, 84, 75, 93, 76, 79, 81, 88, 84, 87, 82, 75, 80, 90, 89, 83, 81, 74, 86, 88, 79, 91, 73, 87, 76, 80, 82, 84, 75, 89, 82, 78, 86, 90, 75, 87, 90, 81, 88, 72, 78, 91, 84, 82, 80, 79, 88, 81, 76, 85, 74, 92, 78, 90, 87, 83, 82, 79, 88, 85, 81, 72, 76, 84, 87, 79, 76, 83, 81], "rating_category": "Good"}, "hero_image": {"feedback": {"items": [{"title": "Captivating Lake View", "feedback": "The large windows showing the lake view make a strong impact, enticing potential guests with a glimpse of the serene environment."}, {"title": "Cozy and Inviting Interior", "feedback": "The warm wood tones and comfortable seating arrangements create a cozy cabin feel that aligns well with your property description."}, {"title": "Functionality and Luxury", "feedback": "Showcasing the pool table in the hero image highlights the fun and entertainment value, adding to the luxury appeal."}, {"title": "Balanced Composition", "feedback": "The placement of furniture and decor in the image ensures a balanced and aesthetically pleasing composition."}], "summary": "Your hero image beautifully encapsulates the luxurious and relaxing atmosphere of the Lake Time Villa. The combination of the pool table, cozy seating, and stunning lake views through the glass doors creates a welcoming and stylish vibe."}, "revisions": ["Capture the lake view at different times of day for variety.", "Showcase the kitchen area to complement the open living space.", "Include images of the nearby village shops and restaurants for context."], "suggestions": ["Add a few evening shots with the fireplace lit to enhance the cozy feel.", "Include images highlighting the outdoor hot tub with lake views.", "Capture different angles to emphasize spaciousness and luxury.", "Feature close-up shots of unique decor items."], "property_name": "Lake Time Villa *NEW* Luxury w/ HOT TUB", "rating_number": 87, "expert_ratings": [86, 84, 89, 91, 88, 87, 93, 85, 88, 86, 90, 89, 82, 84, 87, 86, 91, 88, 85, 89, 86, 92, 88, 84, 87, 89, 90, 86, 85, 87, 91, 84, 88, 85, 93, 89, 87, 83, 86, 84, 88, 91, 86, 94, 87, 88, 86, 85, 92, 84, 87, 90, 89, 85, 88, 91, 87, 85, 88, 90, 91, 89, 85, 87, 86, 88, 90, 86, 87, 91, 84, 83, 88, 85, 90, 92, 89, 86, 87, 84, 88, 87, 85, 89, 86, 88, 87, 90, 89, 84, 86, 85, 91, 88, 87, 88, 86, 89, 92, 84], "rating_category": "Good"}, "description": {"feedback": {"items": [{"title": "Clear and Concise Description", "feedback": "Consider simplifying certain parts of the description to enhance readability. Right now, it feels a bit cluttered."}, {"title": "Highlight Unique Selling Points", "feedback": "Emphasize the luxury element more prominently, such as the hot tub and stunning lake views."}, {"title": "Improve Formatting", "feedback": "Organizing the details into bullet points could help guests quickly find the information they need."}, {"title": "Update Images and Descriptions", "feedback": "Make sure all images are high-quality and relevant to the description you provided."}, {"title": "Add Local Attractions", "feedback": "Mention nearby attractions or activities that guests can enjoy, which aren't mentioned."}], "summary": "Your property listing showcases many attractive features, but it could use some enhancements for clarity and engagement."}, "revisions": null, "suggestions": ["Revise the listing for brevity and ease of reading.", "Put more focus on the luxurious amenities like the hot tub.", "Utilize bullet points for amenities to enhance clarity.", "Add details about local attractions to increase interest.", "Ensure all images represent the property accurately and attractively."], "property_name": "Lake Time Villa *NEW* Luxury w/ HOT TUB", "rating_number": 66, "expert_ratings": [66, 54, 70, 88, 45, 62, 77, 88, 67, 92, 62, 74, 55, 67, 71, 76, 84, 52, 64, 90, 73, 69, 61, 58, 66, 52, 75, 88, 81, 49, 77, 55, 87, 64, 74, 62, 56, 53, 81, 69, 91, 65, 54, 78, 63, 87, 89, 53, 76, 68, 45, 58, 71, 82, 56, 74, 60, 59, 92, 70, 66, 77, 64, 85, 75, 70, 59, 54, 48, 91, 55, 79, 49, 82, 69, 88, 68, 54, 77, 41, 60, 79, 76, 66, 80, 70, 52, 61, 58, 88, 82, 90, 77, 85, 83, 89, 53, 69, 70, 55, 86, 71, 88, 65, 80, 49, 83, 79, 40, 89, 91, 84, 73], "rating_category": "Needs Work", "description_rewrite": {"guest_access": "Guests can access the entire property, including the outdoor hot tub, BBQ area, and bocce ball court. Enjoy the serene landscapes and relax in our pet-friendly home.", "your_property": "This charming single-level home boasts 2000 sq ft of space, including a large deck with stunning lake views, gas grill, and comfortable seating for sunset watching. The open-concept living area features a pool table, perfect for family fun!", "listing_description": "Escape to Lake Time Villa, a luxurious getaway featuring a hot tub and breathtaking lake views. Just a short drive from village shops, Snow Summit, and Bear Mountain, this cozy cabin is perfect for families seeking relaxation and adventure. Enjoy a fully equipped kitchen, spacious living area, and modern amenities in a serene neighborhood setting.", "other_details_to_note": "Pet-friendly with a one-time fee of $75 for up to 2 dogs. Enjoy all the comforts of home, including laundry facilities and modern appliances.", "interaction_with_guests": "Feel free to reach out anytime during your stay. I'm here to help ensure your experience is enjoyable and memorable!"}}, "other_images": {"feedback": {"items": [{"title": "Clarity and Detail", "feedback": "The images are sharp and detailed, allowing potential guests to appreciate the quality and appeal of the space."}, {"title": "Lighting and Ambiance", "feedback": "The use of natural light enhances the warm and welcoming ambiance of your property, making it more attractive to potential guests."}, {"title": "Composition and Framing", "feedback": "The photos are well-composed, successfully highlighting the unique features and vistas your property offers."}], "summary": "Your photos effectively capture the inviting and luxurious atmosphere of your premium property. The images display clear, vibrant, and professional compositions that highlight the property's best features and surroundings."}, "revisions": null, "suggestions": ["Add a few more interior shots to showcase different rooms.", "Include a night-time view to highlight evening ambiance.", "Consider adding close-up photos of special features, like decor or amenities."], "property_name": "Premium Lakeview Retreat", "rating_number": 88, "expert_ratings": [85, 90, 88, 86, 89, 92, 87, 90, 88, 89, 85, 90, 88, 91, 86, 87, 92, 88, 84, 89, 91, 87, 90, 89, 91, 88, 89, 87, 90, 86, 89, 88, 87, 91, 90, 89, 88, 87, 92, 86, 90, 89, 88, 89, 87, 88, 91, 87, 89, 90, 88, 86, 92, 89, 91, 88, 87, 90, 92, 89, 87, 88, 87, 86, 88, 90, 89, 92, 87, 88, 89, 86, 90, 91, 87, 88, 90, 86, 89, 88, 87, 90, 91, 89, 88, 86, 89, 90, 92, 87, 88, 89, 87, 90, 85, 89, 88, 87, 92, 88], "rating_category": "Good"}, "interior_design": {"feedback": {"items": [{"title": "Color Palette", "feedback": "The color scheme of soft neutrals is calming and reflective of the serene lake views outside."}, {"title": "Furniture Layout", "feedback": "The open layout encourages social interaction, allowing guests to enjoy the space together comfortably."}, {"title": "Kitchen Design", "feedback": "A well-designed modern kitchen that offers both functionality and aesthetics, perfect for family meals."}, {"title": "Outdoor Space", "feedback": "The deck area and hot tub provide excellent opportunities for leisure while taking in the scenic views."}, {"title": "Decorative Elements", "feedback": "Carefully chosen decorative details add warmth and charm, aligning with the overall aesthetic of the cabin."}, {"title": "Game Area", "feedback": "Having a dedicated space for games like pool enhances the entertaining aspect of the home."}], "summary": "The interior design of Lake Time Villa combines luxury and comfort effectively, creating a cozy yet elegant atmosphere for guests."}, "revisions": null, "suggestions": ["Enhance outdoor furniture to elevate the aesthetic appeal.", "Introduce additional artwork or decor that reflects the local environment.", "Ensure all kitchen appliances are consistent in style and operational. They contribute significantly to guest experience."], "property_name": "Lake Time Villa *NEW* Luxury w/ HOT TUB", "rating_number": 74, "expert_ratings": [14, 70, 74, 34, 66, 80, 62, 81, 79, 50, 43, 39, 73, 54, 64, 37, 25, 72, 59, 33, 12, 18, 82, 61, 49, 29, 20, 57, 35, 95, 39, 46, 90, 83, 48, 69, 52, 96, 94, 76, 61, 55, 13, 11, 38, 77, 4, 8, 91, 93, 68, 32, 65, 1, 97, 84, 44, 16, 88, 81, 78, 27, 10, 2, 22, 23, 99, 45, 67, 50, 19, 25, 82, 56, 21, 74, 47, 71, 40, 24, 86, 58, 17, 31, 33, 86, 27, 13, 60, 92, 69, 76, 70, 11, 76, 86, 73, 45, 70, 41, 96, 55, 84, 47, 30, 79, 73, 92, 95], "rating_category": "Satisfactory"}, "overall_ratings": {"feedback": {"items": [{"title": "Title Optimization", "feedback": "Though your title captures luxury well, refining it for clarity and adding location details can boost its appeal."}, {"title": "Description Clarity", "feedback": "The property description can be simplified for better readability, focusing on unique features and amenities."}, {"title": "Interior Design Elements", "feedback": "While the design is cozy, consider enhancing outdoor furniture and adding artwork that reflects local charm."}, {"title": "Image Quality", "feedback": "High-quality, engaging images consistently depicting the property will attract more guests."}, {"title": "Local Experiences", "feedback": "Emphasizing nearby attractions or activities will help guests envision their stay better."}], "summary": "Your listing has a solid foundation with appealing features, but a few adjustments can help enhance its attractiveness and clarity to potential guests."}, "revisions": null, "suggestions": ["Revise the title to include lake views and unique features.", "Simplify the property description to enhance readability and engagement.", "Promote local attractions or experiences to increase guest interest."], "property_name": "Lake Time Villa *NEW* Luxury w/ HOT TUB", "rating_number": 81, "expert_ratings": [85, 72, 90, 70, 67, 88, 83, 91, 76, 90, 65, 54, 60, 85, 74, 60, 76, 78, 82, 77, 86, 80, 69, 73, 60, 72, 80, 88, 70, 61, 55, 90, 62, 69, 83, 71, 79, 56, 88, 66, 62, 87, 75, 92, 78, 67, 72, 85, 66, 90, 81, 73, 75, 66, 60, 86, 88, 81, 80, 71, 92, 80, 72, 67, 65, 87, 74, 80, 60, 85, 84, 50, 68, 62, 81, 90, 88, 66, 70, 74, 76, 76, 72, 67, 64, 68, 79, 81], "rating_category": "Good"}}	2025-04-27 17:38:46.324113
c2d7e184-e535-4a4c-a781-e455625f6849	2025-05-01 21:33:01.953962+00	0d3de194-51d6-4595-aa7d-09c0ba4287c1	{"title": {"feedback": {"items": [{"title": "Cultural Reference", "feedback": "Including the cultural significance of the name 'Moinho das Feteiras' might attract guests interested in unique experiences."}, {"title": "Descriptive Language", "feedback": "Adding descriptive adjectives could emphasize the beauty and romantic ambiance of your mill."}, {"title": "Highlighting Key Features", "feedback": "Mentioning the views or the garden in the title could attract more attention."}], "summary": "Your title 'Moinho das Feteiras | The Mill House' effectively communicates both the uniqueness and charm of your property, appealing to guests looking for a memorable experience. However, it could be enhanced to convey even more about the picturesque views and romantic setting you offer."}, "revisions": ["Moinho das Feteiras: The Romantic Mill House with Ocean Views", "Experience 19th Century Charm at Moinho das Feteiras | Scenic Getaway", "The Mill House at Moinho das Feteiras: A Perfect Honeymoon Retreat with Garden Access"], "suggestions": ["Consider adding something like 'Scenic Views' or 'Romantic Getaway' to the title.", "Highlight the unique selling points, such as '19th Century Charm' or 'Honeymoon Retreat' to draw in couples.", "Include the notable features in the title, like 'With 360-Degree Sea Views' to enhance appeal."], "property_name": "Moinho das Feteiras | The Mill House", "rating_number": 85, "expert_ratings": [82, 76, 85, 88, 90, 70, 95, 68, 74, 78, 79, 91, 77, 84, 86, 69, 73, 80, 81, 92, 87, 94, 72, 75, 93, 83, 67, 76, 89, 82, 91, 88, 76, 80, 78, 92, 84, 90, 82, 85, 70, 76, 81, 80, 69, 77, 76, 85, 93, 84, 70, 85, 79, 94, 91, 95, 72, 82, 83, 81, 70, 88, 82, 88, 90, 85, 81, 76, 89, 89, 78, 75, 83, 98, 75, 76, 87, 93, 70, 90, 89, 93, 84, 81, 92, 88, 75, 82, 89, 73, 72, 90, 84, 78, 91, 84, 77, 91, 75, 82, 81, 94, 80, 90, 88, 70, 76, 75, 88, 99, 78, 81, 76, 92], "title_rewrites": ["Scenic Mill House with 360° Views | Ideal Romantic Escape", "Historic Mill House – Perfect Honeymoon Getaway with Ocean Views", "Moinho das Feteiras: A Charming Mill Retreat with Stunning Views"], "rating_category": "Good"}, "amenities": {"feedback": {"items": [{"title": "Diverse Scenic Views", "feedback": "Guests will love the variety of scenic views available, including mountain and ocean views."}, {"title": "Well-Stocked Kitchen", "feedback": "Your kitchen amenities provide enough options for guests who like to cook their meals."}, {"title": "Safety Features", "feedback": "The inclusion of smoke alarms, carbon monoxide alarms, and a first aid kit contributes to guest safety."}, {"title": "Outdoor Space", "feedback": "The shared backyard and outdoor furniture provide a cozy area for relaxation."}, {"title": "Comfy Bedrooms", "feedback": "The bedroom setup, including extra pillows and blankets, enhances guest comfort."}], "summary": "Your property offers a wide range of attractive amenities, making it quite appealing to potential guests. However, there's always room for improvement to enhance overall guest experience."}, "revisions": null, "suggestions": ["Consider adding more outdoor seating for guests to enjoy the views better.", "Enhance your kitchen equipment with more cooking tools such as a blender.", "Improve the WiFi speed to accommodate business travelers who need stable internet.", "Incorporate eco-friendly practices, perhaps by adding recycling bins.", "Offer more entertainment options like streaming services or board games."], "property_name": "Unique Experience Stay", "rating_number": 76, "expert_ratings": [43, 29, 18, 30, 19, 79, 84, 55, 74, 59, 48, 52, 73, 60, 33, 61, 70, 78, 85, 36, 64, 38, 67, 57, 83, 31, 15, 49, 76, 40, 62, 44, 75, 37, 72, 12, 19, 47, 77, 63, 68, 17, 72, 45, 42, 25, 20, 71, 50, 34, 54, 36, 80, 22, 74, 58, 35, 11, 29, 46, 62, 65, 52, 32, 14, 87, 65, 81, 8, 69, 53, 21, 25, 31, 87, 16, 15, 41, 67, 25, 42, 85, 62, 19, 56, 14, 28, 15, 68, 6, 49, 15, 32, 83, 28, 10, 26, 85, 85, 1, 15], "rating_category": "Satisfactory"}, "hero_image": {"feedback": {"items": [{"title": "Architectural Appeal", "feedback": "The image showcases the mill's unique design, which is likely to attract guests seeking a one-of-a-kind stay."}, {"title": "Natural Surroundings", "feedback": "The image beautifully highlights the surrounding natural scenery, adding to the property's charm and appeal."}, {"title": "Lighting and Composition", "feedback": "The lighting enhances the architectural details and vibrant colors, making the image visually appealing and inviting."}], "summary": "The hero image captures the unique and charming aspect of the property, effectively highlighting its distinct architecture and picturesque setting."}, "revisions": null, "suggestions": ["Add more images showing interior spaces for a comprehensive view.", "Include photos capturing views from the top floor to emphasize the 360-degree view.", "Showcase the garden and other exterior areas to highlight the full experience.", "Incorporate seasonal images to show the property's charm throughout the year."], "property_name": "Moinho das Feteiras | The Mill House", "rating_number": 85, "expert_ratings": [92, 88, 83, 87, 85, 84, 89, 90, 91, 86, 88, 87, 82, 84, 85, 86, 89, 90, 85, 84, 82, 83, 92, 88, 84, 85, 87, 86, 88, 89, 83, 84, 86, 87, 85, 89, 90, 91, 86, 88, 83, 82, 90, 91, 84, 85, 86, 89, 88, 89, 85, 87, 86, 84, 82, 89, 90, 91, 88, 84, 87, 82, 83, 84, 92, 87, 86, 89, 90, 91, 85, 88, 87, 86, 89, 82, 84, 83, 85, 86, 88, 89, 90, 85, 84, 87, 88, 84, 82, 83, 86, 89, 92, 91, 88, 90, 87, 86, 85, 84], "rating_category": "Good"}, "description": {"feedback": {"items": [{"title": "Highlighting Unique Features", "feedback": "While you mention the 19th-century construction, emphasizing the historical significance could attract more interest."}, {"title": "Engagement with Nature", "feedback": "The expansive garden is a fantastic asset. Consider detailing specific features or seasonal highlights that guests might enjoy."}, {"title": "Room Details and Comforts", "feedback": "Include more specifics about the bedroom and living area, as well as the type of bed. Highlighting comforts like bedding quality could be beneficial."}, {"title": "Clarifying Guest Capacity", "feedback": "It's essential to clarify the capacity of each accommodation unit more distinctly to avoid confusion among potential guests."}, {"title": "Unique Experiences", "feedback": "You mention it's great for honeymoons but providing more ideas on activities in the area could make the experience even more enticing."}], "summary": "Your listing for Moinho das Feteiras is quite appealing with its unique charm and amenities. However, there are some areas where clarity and detail could improve its marketability."}, "revisions": null, "suggestions": ["Expand on the charm of the 19th-century mill to attract history enthusiasts.", "Add details about nearby attractions and experiences that cater to couples or honeymooners.", "Specify room designs, sizes, and amenities to enhance clarity for potential guests.", "Include information about the garden and types of fruit trees for nature lovers.", "Highlight seasonal activities or events nearby to appeal to various travelers."], "property_name": "Moinho das Feteiras | The Mill House", "rating_number": 84, "expert_ratings": [35, 54, 79, 82, 85, 26, 74, 91, 92, 88, 87, 60, 70, 78, 56, 62, 80, 77, 53, 90, 49, 82, 64, 63, 43, 76, 79, 81, 55, 58, 66, 95, 63, 71, 83, 72, 68, 75, 61, 89, 39, 42, 45, 84, 48, 66, 85, 38, 36, 67, 46, 95, 55, 29, 19, 30, 65, 74, 51, 50, 88, 35, 92, 79, 94, 64, 70, 23, 21, 30, 67, 77, 72, 81, 43, 58, 77, 62, 87, 84, 52, 39, 56, 58, 23, 54, 81, 88, 31, 26, 19, 69, 21, 33, 81, 73, 71, 65, 63, 82, 29, 63, 76, 15, 72, 19, 57, 76, 84, 27, 53, 62, 69, 93, 89, 71, 17, 39, 66, 79, 65, 72, 48, 32, 66, 53, 72, 67, 34, 92, 51, 71, 48, 78, 53, 41], "rating_category": "Good", "description_rewrite": {"guest_access": "You have access to the entire property, including all gardens and shared outdoor spaces. Enjoy the tranquility of our secured grounds and private entrance.", "your_property": "The Mill is surrounded by lush gardens filled with subtropical plants, inviting you to relax and explore the beauty of nature. This unique accommodation is ideal for couples, and features modern amenities including free Wi-Fi and air conditioning for your comfort. It also offers other units for larger groups.", "listing_description": "Discover Moinho das Feteiras, a unique 19th-century mill with breathtaking 360-degree sea views. Experience modern comforts in a beautifully-decorated space, complete with a cozy bedroom, living room, kitchenette, and private parking. Perfect for an unforgettable honeymoon, access to lush gardens and nearby attractions awaits!", "other_details_to_note": "Our area is rich with cultural attractions and experiences, perfect for creating unforgettable memories during your stay.", "interaction_with_guests": "I am available for you throughout your stay and can provide local tips on attractions, dining, and activities tailored to your interests. Your comfort is my priority!"}}, "other_images": {"feedback": {"items": [{"title": "Vibrant Colors", "feedback": "The vibrant colors in your photos really catch the eye and add a warmth that's appealing to potential guests."}, {"title": "Unique Perspectives", "feedback": "The various angles and perspectives used in your photos offer a playful and intriguing view of the property."}, {"title": "Clear and Bright", "feedback": "Overall, the photos are clear, bright, and showcase the inviting atmosphere of the space beautifully."}], "summary": "Your photos do a great job of capturing the unique charm of your property. The vibrant colors and interesting angles highlight the cozy and stylish interior, inviting guests to experience the welcoming atmosphere."}, "revisions": null, "suggestions": ["Try adding a few more evening shots to show the ambiance at night.", "Consider including some close-up shots of interesting decor details.", "Make sure each room has at least one wide-angle shot to show its full layout.", "Add a few lifestyle shots with people enjoying the space."], "property_name": "Unique Experience Stay", "rating_number": 91, "expert_ratings": [91, 92, 91, 91, 91, 91, 90, 92, 90, 91, 91, 92, 91, 91, 91, 90, 91, 91, 91, 92, 90, 91, 91, 91, 90, 92, 91, 91, 91, 91, 91, 91, 90, 91, 91, 91, 92, 91, 91, 90, 91, 92, 91, 91, 90, 91, 91, 91, 92, 90, 91, 91, 91, 92, 91, 91, 91, 91, 91, 90, 91, 91, 91, 92, 91, 91, 90, 91, 91, 91, 91, 91, 91, 91, 91, 91, 91, 91, 92, 91, 91, 90, 91, 91, 91, 91, 91, 91, 91, 90, 92, 91, 91, 91, 91, 91, 90, 91, 91, 91], "rating_category": "Excellent"}, "interior_design": {"feedback": {"items": [{"title": "Decorative Elements", "feedback": "The inclusion of sub-tropical plants and flowers creates a vibrant ambiance, but consider integrating more local art pieces to enhance the uniqueness."}, {"title": "Space Utilization", "feedback": "The layout of the living room and kitchenette is practical and cozy; however, optimizing storage solutions could enhance functionality."}, {"title": "Color Palette", "feedback": "The color scheme is inviting and reflects a serene environment, yet a more cohesive color theme throughout the house could elevate the mood further."}, {"title": "Lighting", "feedback": "The natural light streaming through the windows is fantastic, but adding softer lighting options for the evenings can create a more romantic atmosphere."}, {"title": "Furniture Style", "feedback": "The furniture is comfortable and suitable for the space, but incorporating a few vintage pieces could add to the character."}], "summary": "The interior design of Moinho das Feteiras presents a charming blend of rustic and modern aesthetics that enhances the overall experience."}, "revisions": null, "suggestions": ["Add local artwork to the decor for a unique touch.", "Optimize storage solutions in the kitchenette and living area.", "Establish a more cohesive color scheme throughout the house.", "Introduce softer lighting options for evening relaxation.", "Consider incorporating vintage furniture pieces to enhance character."], "property_name": "Moinho das Feteiras | The Mill House", "rating_number": 81, "expert_ratings": [81, 75, 70, 88, 76, 91, 65, 85, 84, 78, 92, 77, 60, 82, 69, 73, 90, 72, 74, 88, 89, 71, 86, 87, 58, 62, 79, 95, 64, 76, 93, 68, 94, 81, 67, 66, 78, 65, 82, 83, 83, 88, 76, 80, 74, 92, 57, 58, 84, 89, 73, 78, 82, 62, 61, 70, 90, 83, 71, 89, 88, 98, 80, 67, 65, 72, 90, 73, 74, 68, 86, 59, 77, 78, 88, 91, 69, 85, 82, 97, 84, 75, 70, 97, 95, 55, 62, 89, 88, 78, 85, 81, 81, 65, 74, 92, 69, 98, 67, 66, 79, 82, 80, 73, 97, 58, 60, 72, 71, 70, 68, 75, 84, 88, 64, 96, 61, 84], "rating_category": "Good"}, "overall_ratings": {"feedback": {"items": [{"title": "Title and Description", "feedback": "Enhancing the title and description can make a big difference. Consider integrating more descriptive words and highlighting features to create a vivid picture."}, {"title": "Clarity on Amenities", "feedback": "Providing detailed information on the amenities and nearby attractions can elevate guest expectations and reveal the full potential of the space."}, {"title": "Photos and Visual Appeal", "feedback": "Ensuring your images tell a story—showing various angles of the property and its surroundings—can impact booking decisions."}, {"title": "Guest Interaction", "feedback": "Building a good relationship with guests prior to and during their stay can greatly enhance their experience. Consider including additional local tips."}], "summary": "Your property 'Moinho das Feteiras | The Mill House' boasts charm and a unique experience that appeals to many guests. Though it has some strong points, enhancing its visibility and details can significantly improve guest attraction."}, "revisions": null, "suggestions": ["Rework the title to emphasize key features like 'Cozy Romantic Getaway' or '19th Century Charm'.", "Add in-depth descriptions of each room and its amenities to attract more bookings.", "Include references to nearby attractions that can enhance guest experiences.", "Consider seasonal decorations or events in your description to attract guests year-round.", "Collect visual content that shows the property in different lightings or seasons."], "property_name": "Moinho das Feteiras | The Mill House", "rating_number": 84, "expert_ratings": [85, 81, 84, 82, 79, 83, 75, 87, 78, 80, 92, 74, 76, 73, 72, 70, 90, 88, 81, 82, 89, 77, 86, 78, 94, 96, 81, 90, 73, 88, 75, 68, 69, 87, 88, 93, 69, 83, 72, 84, 85, 74, 91, 82, 89, 90, 87, 75, 76, 80, 93, 82, 83, 84, 90, 92, 82, 90, 91, 84, 88, 87, 86, 81, 92, 93, 84, 83, 76, 82, 75, 89, 90, 85, 78, 74, 88, 88, 86, 91, 79], "rating_category": "Good"}}	2025-05-01 21:33:01.953962
25f5c634-2f5f-4183-946b-6f54b0b6e2b6	2025-04-27 21:31:38.568524+00	d56479ec-d48e-44a1-b0ff-03479d78c264	{"title": {"feedback": {"items": [{"title": "Length of Title", "feedback": "Consider shortening the title. While it provides details, a shorter title can be punchier."}, {"title": "Highlight Unique Features", "feedback": "Emphasize the balcony or patio more prominently as these are appealing selling points."}, {"title": "Use of \\"on the Beach\\"", "feedback": "Replace \\"on the Beach\\" with something more descriptive, like 'With Stunning Ocean Views'."}, {"title": "Room for Improvement", "feedback": "Try adding action words like 'Relax' or 'Enjoy' to make it more inviting."}, {"title": "Avoid Abbreviations", "feedback": "The abbreviation 'w/' could be replaced with 'with' for clarity and a more polished look."}], "summary": "Your listing title conveys attractive features, but it could be more engaging."}, "revisions": null, "suggestions": ["Make it more enticing by adding action words.", "Shorten the title for better impact.", "Emphasize the unique selling points such as the beach location.", "Include a phrase that evokes relaxation."], "property_name": "Two Story House w/ Balcony and Patio on the Beach", "rating_number": 86, "expert_ratings": [81, 78, 85, 90, 80, 75, 83, 89, 74, 80, 82, 84, 76, 88, 79, 90, 92, 72, 81, 88, 85, 84, 77, 76, 73, 82, 81, 89, 74, 77, 82, 78, 86, 90, 89, 80, 85, 81, 82, 90, 84, 73, 88, 80, 75, 93, 71, 76, 88, 85, 89, 74, 83, 81, 78, 90, 95, 88, 83, 76, 82, 84, 81, 77, 80, 84, 82, 88, 87, 89, 96, 78, 81, 95, 88, 82, 85, 74, 81, 90, 84, 82, 81, 86, 87, 92, 78, 75, 84, 83, 80, 89, 77, 84, 86, 75, 72, 80, 89, 82, 80, 89, 91, 73, 81, 91, 88, 75, 77, 86, 93, 81, 85], "title_rewrites": ["Oceanfront Oasis: 2-Story Home with Patio & Balcony", "Beachfront Retreat: Spacious 2-Story House with Balcony", "Relaxing 2-Story Home with Ocean Views & Outdoor Space"], "rating_category": "Good"}, "amenities": {"feedback": {"items": [{"title": "Variety of Views", "feedback": "The scenic, beach, ocean, and sea views offer a stunning backdrop for your guests' stay."}, {"title": "Well-Equipped Bathroom", "feedback": "The inclusion of a bathtub, hair dryer, and necessary toiletries adds a touch of comfort and convenience."}, {"title": "Entertainment Options", "feedback": "The 42-inch HDTV provides great entertainment for families during their stay."}, {"title": "Kitchen Amenities", "feedback": "Guests will appreciate the fully equipped kitchen, which allows them to prepare meals easily."}, {"title": "Outdoor Features", "feedback": "The private patio, fire pit, and BBQ grill are wonderful additions that enhance outdoor enjoyment."}], "summary": "Your premium beachfront property has an impressive array of amenities that cater to various needs. With scenic views and essential comforts, this stay promises an enjoyable experience for your guests."}, "revisions": null, "suggestions": ["Consider adding more entertainment options, such as streaming services or games.", "Enhance the kitchen amenities by including a wider variety of cooking tools.", "The addition of air conditioning could improve comfort for guests during hot weather."], "property_name": "Premium Beachfront Stay", "rating_number": 87, "expert_ratings": [78, 63, 84, 66, 92, 55, 98, 80, 76, 87, 72, 70, 91, 88, 64, 74, 86, 84, 81, 53, 79, 61, 94, 49, 72, 73, 68, 95, 67, 54, 60, 82, 97, 90, 82, 96, 93, 62, 99, 36, 48, 44, 71, 55, 34, 69, 57, 58, 66, 73, 31, 86, 56, 84, 41, 66, 58, 46, 80, 65, 51, 76, 61, 83, 68, 47, 27, 75, 89, 57, 59, 88, 61, 50, 45, 41, 74, 48, 76, 78, 39, 36, 79, 93, 76, 79, 51, 62, 73, 95, 33, 70, 79, 86, 62, 39, 42, 53, 91, 21, 38, 26, 80, 55, 35, 58, 40, 52, 22, 69, 53, 74, 32, 58, 22, 27, 33, 89], "rating_category": "Good"}, "hero_image": {"feedback": {"items": [{"title": "Gorgeous Sunset View", "feedback": "The sunset view in the image dramatically highlights the beach setting, providing an appealing visual experience that draws guests in."}, {"title": "Cozy and Inviting Seating Area", "feedback": "The outdoor seating area looks inviting and well-arranged for relaxation, adding to the appeal of the property."}, {"title": "Fire Pit Feature", "feedback": "The presence of the fire pit adds a cozy and luxurious touch, enhancing the overall attractiveness of the outdoor space."}], "summary": "Your beachfront property hero image captures a perfect blend of comfort and stunning views, enticing potential guests with the promise of a relaxing stay right by the ocean."}, "revisions": null, "suggestions": ["Consider adding some greenery or plants to enhance the outdoor ambiance.", "Include a glimpse of the balcony to showcase more of the property's amenities.", "Capture a lifestyle shot with potential uses of the outdoor space, such as a family enjoying a meal.", "Highlight the proximity to the ocean more visibly.", "Ensure the fire pit is visibly operational in the image, possibly with a small flame."], "property_name": "Two Story House w/ Balcony and Patio on the Beach", "rating_number": 90, "expert_ratings": [90, 92, 89, 87, 91, 88, 94, 93, 86, 90, 91, 92, 90, 89, 88, 93, 92, 91, 90, 89, 88, 87, 91, 90, 92, 89, 88, 87, 91, 92, 90, 89, 88, 86, 93, 90, 92, 91, 90, 89, 88, 89, 90, 91, 92, 93, 91, 90, 88, 87, 92, 91, 90, 89, 88, 91, 92, 90, 89, 88, 87, 90, 92, 93, 91, 90, 89, 88, 87, 91, 90, 92, 93, 90, 89, 88, 91, 92, 90, 88, 86, 92, 91, 90, 89, 90, 91, 92, 88, 90, 91, 89, 87, 92, 91, 90, 89, 88, 92, 91], "rating_category": "Good"}, "description": {"feedback": {"items": [{"title": "Clarity of House Rules", "feedback": "While house rules are important, they could be summarized more effectively to make them easier for guests to understand."}, {"title": "Highlight Unique Features", "feedback": "Emphasizing the unique aspects of your location, like the proximity to the beach, can draw in more interest."}, {"title": "Simplify Descriptions", "feedback": "Consider breaking down long sections of text into shorter, bullet-pointed lists, making it easier for guests to read and digest."}, {"title": "Showcase Amenities", "feedback": "Try to highlight the amenities in a separate section or list format to ensure they catch the eye of potential guests."}, {"title": "Remove Redundancies", "feedback": "Avoid repeated information about the proximity to the beach to maintain interest and clarity."}], "summary": "Your property has a great location and appealing amenities, making it a solid option for family vacations. However, you might want to refine the presentation and clarity of some details to enhance guest experience."}, "revisions": null, "suggestions": ["Refine the presentation of house rules to make them more concise.", "Emphasize proximity to the beach in a standout way and incorporate visual elements.", "Consider using bullet points for amenities to enhance readability.", "Remove repetitive statements and condense descriptions for brevity.", "Add more engaging language to describe unique features and experiences."], "property_name": "Two Story House w/ Balcony and Patio on the Beach", "rating_number": 70, "expert_ratings": [58, 62, 75, 80, 67, 72, 89, 54, 47, 61, 70, 40, 44, 96, 50, 89, 59, 65, 68, 49, 72, 55, 52, 95, 88, 90, 74, 64, 63, 77, 36, 78, 41, 83, 32, 58, 39, 76, 48, 73, 84, 66, 50, 45, 85, 52, 38, 61, 97, 71, 55, 53, 33, 46, 57, 81, 37, 39, 52, 54, 92, 48, 60, 74, 43, 18, 75, 37, 69, 73, 65, 42, 64, 56, 86, 93, 27, 22, 94, 57, 66, 49, 97, 32, 59, 61, 38, 67, 92, 45, 40, 38, 83, 73, 48, 63, 68, 80, 76, 44, 66, 73, 58, 51, 92, 75, 39, 27, 66, 80, 64, 31, 88], "rating_category": "Needs Work", "description_rewrite": {"guest_access": "Guests have full access to the home, including the patio, balcony, kitchen, and all amenities. Enjoy convenience with parking in the two-car garage.", "your_property": "This gorgeous home features 3 bedrooms and 3 baths. Enjoy the exceptional proximity to the ocean, making it a prime spot for your beach vacation!", "listing_description": "Welcome to our beautiful oceanfront two-story home with a balcony and patio right on the beach! Perfect for families and groups of up to 8 guests, you can easily step onto the sand from our oversized patio, equipped with outdoor dining and lounge chairs.", "other_details_to_note": "Please ensure to review and comply with our house rules before your stay. Check-in details and fees apply for late arrivals or departures.", "interaction_with_guests": "Our team from Tower 17 Properties is dedicated to making your stay enjoyable! We will greet you upon arrival and provide assistance throughout your visit."}}, "other_images": {"feedback": {"items": [{"title": "Vibrant Color Palette", "feedback": "The colors in your photos are vibrant and lively, effortlessly drawing attention and conveying a sense of warmth and openness."}, {"title": "Spacious Layouts", "feedback": "Your images effectively showcase the spaciousness of the interiors, inviting guests to imagine themselves in a comfortable environment."}, {"title": "Stunning Views", "feedback": "The views from your property are breathtaking, and your photos highlight this aspect wonderfully, creating a strong visual impact."}, {"title": "Professional Quality", "feedback": "The quality of your photos suggests professional work, enhancing the perceived value of your property."}], "summary": "Your property's photos beautifully capture its premium vibe and beachfront allure, making it highly appealing to potential guests."}, "revisions": null, "suggestions": ["Consider adding some evening or night shots to showcase the ambiance after sunset.", "Include a few close-up shots of unique decor or furnishing details to enhance character.", "Capture some lifestyle images with small highlights of local experiences or amenities.", "Ensure all rooms are featured with the same high quality to provide a consistent experience.", "Highlight any unique architectural features in their own prominent photo."], "property_name": "Premium Beachfront Retreat", "rating_number": 92, "expert_ratings": [89, 90, 92, 93, 95, 88, 91, 92, 94, 95, 89, 90, 92, 93, 92, 90, 88, 91, 93, 94, 89, 90, 92, 92, 93, 95, 89, 90, 91, 93, 95, 94, 92, 90, 91, 92, 95, 94, 93, 91, 89, 92, 93, 95, 89, 90, 92, 91, 94, 92, 89, 91, 93, 94, 95, 92, 90, 89, 92, 93, 92, 95, 88, 90, 91, 92, 94, 93, 95, 91, 89, 92, 91, 93, 95, 94, 90, 91, 92, 93, 95, 92, 89, 90, 92, 93, 94, 89, 90, 92, 93, 95, 94, 93, 91, 92, 93, 95, 89, 91, 92, 94], "rating_category": "Excellent"}, "interior_design": {"feedback": {"items": [{"title": "Overall Ambiance", "feedback": "The overall ambiance is warm and inviting, perfect for families seeking a beach getaway."}, {"title": "Color Palette", "feedback": "The color palette complements the beach environment, but a few additional accent colors could enhance vibrancy."}, {"title": "Furniture Arrangement", "feedback": "The furniture is well-arranged, promoting comfort and conversation, but could benefit from minor adjustments for better flow."}, {"title": "Decor Elements", "feedback": "Some decor elements add character, but others feel sparse; consider adding more personal touches to enhance the charm."}, {"title": "Lighting", "feedback": "Natural lighting is fantastic, but supplementary lighting could improve evening ambiance."}], "summary": "The interior design of your beach house is inviting and captures the essence of coastal living, though some areas could use a fresh touch."}, "revisions": null, "suggestions": ["Add more decorative pillows to the couches for a cozier feel.", "Incorporate artwork that reflects local ocean themes.", "Consider a refresh of the paint colors for a more modern look.", "Introduce plants or greenery to liven up the space further."], "property_name": "Two Story House w/ Balcony and Patio on the Beach", "rating_number": 88, "expert_ratings": [77, 56, 34, 12, 17, 44, 63, 84, 76, 96, 25, 54, 72, 84, 49, 84, 33, 52, 47, 56, 88, 57, 93, 31, 88, 73, 49, 32, 48, 76, 53, 52, 45, 57, 70, 89, 21, 96, 21, 44, 26, 36, 78, 92, 19, 50, 62, 44, 47, 99, 38, 29, 68, 91, 28, 88, 14, 24, 10, 71, 22, 33, 54, 93, 75, 54, 43, 68, 65, 93, 30, 78, 86, 83, 58, 24, 40, 66, 61, 54, 55, 10, 68, 61, 85, 30, 62, 51, 66, 62, 89, 95, 49, 75, 76, 62, 84, 91, 36, 86, 81, 14, 30, 99, 59, 94, 48, 57], "rating_category": "Good"}, "overall_ratings": {"feedback": {"items": [{"title": "Title Effectiveness", "feedback": "The title is informative but could benefit from being more engaging and less verbose."}, {"title": "Presentation of Details", "feedback": "Consider refining the presentation of house rules and descriptions for better readability."}, {"title": "Highlight Unique Features", "feedback": "Emphasizing unique aspects like the balcony, patio, and picturesque views can help attract more interest."}, {"title": "Photo Quality", "feedback": "While your images are strong, consider capturing lifestyle moments that showcase the space being used."}], "summary": "Your listing combines a beautiful beachfront location with appealing amenities and decor. However, there's room for improvement in clarity and engagement which could enhance guest interest."}, "revisions": null, "suggestions": ["Enhance the listing title for more impact.", "Refine house rules and descriptions for clearer communication.", "Create a more engaging narrative around the property's features.", "Consider professional photography to showcase unique qualities."], "property_name": "Two Story House w/ Balcony and Patio on the Beach", "rating_number": 86, "expert_ratings": [82, 87, 90, 79, 85, 81, 70, 78, 84, 79, 85, 90, 83, 81, 88, 92, 77, 91, 83, 84, 87, 95, 76, 79, 82, 90, 89, 88, 91, 70, 85, 92, 75, 76, 91, 88, 92, 80, 89, 89, 70, 83, 80, 84, 85, 81, 87, 68, 82, 78, 91, 90, 76, 77, 84, 70, 81, 92, 80, 78, 82, 79, 95, 64, 87, 92, 81, 75, 72, 93, 85, 80, 82, 79, 86, 93, 86, 79, 91, 78, 66, 80, 83, 81, 90, 72, 84, 70, 94, 78, 88, 70, 73, 80, 75, 91, 95, 87, 94, 92, 84, 90], "rating_category": "Good"}}	2025-04-27 21:31:38.568524
6711205b-d880-4c0d-bab4-1e9d435da4e7	2025-05-04 14:56:56.177893+00	d83b24aa-f073-4af6-963f-c4cc91f0f7ed	{"title": {"feedback": {"items": [{"title": "Emphasize Scenic Views", "feedback": "Consider adding specific descriptive words addressing the views, which could entice potential guests."}, {"title": "Target Audience", "feedback": "Tailor the title further by including specific keywords that might appeal to your ideal guests, like 'family' or 'couple'."}, {"title": "Highlight Unique Features", "feedback": "Mention any special features in the title, such as the gourmet kitchen or the fireplace, to draw more interest."}], "summary": "Your property title conveys a sense of peace and modern style, which is appealing. However, a few tweaks could enhance its impact."}, "revisions": ["Serene Forest View A-Frame Cabin with Modern Touches", "Scenic Modern A-Frame Cabin for Family Fun and Relaxation", "Stylish A-Frame Cabin with Breathtaking Views and Comforts"], "suggestions": ["Include a keyword about the scenic view (e.g., 'serene').", "Mention a unique experience or aspect (e.g., 'cozy fireplace').", "Consider using alliteration or catchy phrases for greater appeal."], "property_name": "Peaceful Modern A-Frame Cabin with a view", "rating_number": 75, "expert_ratings": [66, 45, 73, 90, 53, 74, 69, 32, 80, 82, 35, 44, 51, 33, 76, 54, 61, 89, 42, 88, 47, 46, 57, 71, 84, 86, 60, 39, 30, 55, 67, 66, 90, 29, 28, 92, 89, 40, 84, 93, 75, 35, 69, 36, 27, 92, 56, 89, 49, 72, 74, 40, 35, 65, 61, 22, 58, 33, 73, 18, 50, 60, 52, 28, 67, 95, 88, 87, 92, 93, 94, 84, 70, 20, 38, 40, 63, 23, 36, 69, 34, 99, 49, 84, 76, 49, 21, 31, 91, 46, 30, 63, 68, 86, 42, 53, 34, 71, 36, 91, 24, 35, 80, 16, 66, 56, 83, 78, 25, 24, 15, 92], "title_rewrites": ["Tranquil Modern A-Frame Cabin Overlooking Stunning Forest", "Cozy Modern A-Frame with Scenic Views – Your Perfect Getaway!", "Charming A-Frame Cabin with Gourmet Kitchen and Forest Views"], "rating_category": "Satisfactory"}, "amenities": {"feedback": {"items": [{"title": "Scenic Views and Outdoor Features", "feedback": "You provide breathtaking views and outdoor relaxation areas, enhancing the guest experience."}, {"title": "Entertainment Options", "feedback": "The diverse entertainment selections cater to all tastes, making stays enjoyable for guests of all ages."}, {"title": "Comprehensive Family Amenities", "feedback": "Your attention to family-friendly amenities ensures parents and children alike can enjoy a comfortable stay."}, {"title": "Safety and Comfort Considerations", "feedback": "The extensive safety features will give your guests peace of mind and comfort."}, {"title": "Kitchen and Dining Facilities", "feedback": "The fully equipped kitchen and dining options cater perfectly to those who enjoy cooking their own meals."}], "summary": "Based on extensive analysis of the provided amenities, this boutique stay offers an impressive range of features that cater to various needs and preferences. Your commitment to guest comfort and satisfaction is evident in the thoughtful selection of amenities."}, "revisions": null, "suggestions": ["Consider adding more unique local experience offerings to elevate the guest experience.", "Enhance the outdoor area with additional seating or shading options for more comfort.", "Provide an array of complimentary snacks or drinks upon arrival to delight guests."], "property_name": "Boutique Stay", "rating_number": 78, "expert_ratings": [58, 76, 84, 77, 69, 73, 88, 69, 82, 90, 56, 67, 93, 80, 45, 74, 65, 76, 89, 81, 78, 55, 75, 70, 88, 64, 92, 57, 91, 59, 50, 69, 61, 85, 94, 70, 68, 77, 60, 45, 79, 84, 45, 85, 63, 88, 54, 49, 71, 62, 88, 76, 92, 84, 81, 42, 73, 68, 97, 91, 39, 75, 58, 81, 66, 83, 89, 69, 73, 81, 47, 93, 87, 55, 92, 74, 60, 56, 81, 86, 78, 68, 91, 74, 79, 85, 90, 72, 50, 63, 82, 51, 89, 80, 96, 77, 99, 48, 60, 88, 95, 57, 70, 81, 69, 44, 58, 65, 42, 74, 80, 95, 81, 63, 66, 56, 58, 40, 76], "rating_category": "Satisfactory"}, "hero_image": {"feedback": {"items": [{"title": "Inviting Interior", "feedback": "The spacious and modern interior design reflects the description well, encouraging guests to imagine themselves unwinding and relaxing here."}, {"title": "Scenic Views", "feedback": "The large windows and beautiful exterior views captured in the photo align perfectly with the promise of a serene and nature-filled stay."}, {"title": "Light and Airy", "feedback": "The photo beautifully highlights the natural light pouring into the cabin, contributing to an open and airy ambiance."}], "summary": "The hero image perfectly captures the cozy and inviting atmosphere of your A-Frame cabin. The large windows showcasing the beautiful forest view pair wonderfully with the modern and tasteful interior, promising a relaxing and serene retreat for potential guests."}, "revisions": null, "suggestions": ["Ensure the image is high resolution to maintain quality across different devices.", "Consider adding a cozy element like a book or a cup of coffee on the table to enhance the inviting feel.", "Include a hint of the outdoor space to further connect the indoor and outdoor experiences.", "Make sure the fireplace area is more visible to emphasize warmth and comfort."], "property_name": "Peaceful Modern A-Frame Cabin with a view", "rating_number": 87, "expert_ratings": [88, 85, 89, 90, 84, 83, 87, 86, 88, 90, 89, 87, 88, 91, 85, 84, 86, 88, 87, 89, 86, 85, 86, 89, 88, 90, 87, 85, 87, 88, 85, 84, 89, 88, 86, 87, 85, 85, 86, 88, 89, 86, 90, 87, 88, 86, 89, 86, 85, 91, 87, 86, 88, 86, 88, 85, 86, 87, 89, 86, 85, 88, 86, 91, 85, 88, 87, 87, 89, 85, 86, 88, 86, 87, 88, 89, 85, 86, 87, 90, 88, 86, 88, 87, 86, 89, 87, 86, 85, 88, 89, 90, 85, 86, 88, 86, 89, 87, 85, 91], "rating_category": "Good"}, "description": {"feedback": {"items": [{"title": "Clarity and Conciseness", "feedback": "The description is quite detailed but could benefit from more concise phrasing to enhance readability."}, {"title": "Highlight Unique Features", "feedback": "While you mention a lot of amenities, emphasizing unique features like the exceptional views or the gourmet kitchen will help attract more attention."}, {"title": "Winter Preparedness", "feedback": "You do mention winter considerations, but reinforcing this with clearer warnings and tips for guests unfamiliar with snow could enhance guest experience."}, {"title": "Engaging Introduction", "feedback": "Starting with a captivating hook in the introduction will draw guests in more effectively."}, {"title": "Call to Action", "feedback": "A final sentence encouraging bookings or highlighting availability could create a sense of urgency."}], "summary": "You have a lovely cabin with many appealing features, but a few areas need improvement for a stronger listing."}, "revisions": null, "suggestions": ["Consider revising the introduction to make it more captivating.", "Highlight unique selling points like the gourmet kitchen and scenic views early on in the description.", "Improve the clarity of your winter weather instructions to prepare guests better.", "Create a more inviting and personal tone in the description.", "Use bullet points or sections for better readability."], "property_name": "Peaceful Modern A-Frame Cabin", "rating_number": 58, "expert_ratings": [38, 55, 62, 47, 39, 65, 70, 58, 44, 48, 52, 54, 41, 40, 67, 66, 78, 61, 64, 68, 72, 60, 57, 45, 63, 71, 49, 85, 74, 50, 52, 64, 59, 56, 69, 47, 75, 67, 54, 43, 38, 46, 52, 55, 59, 63, 81, 49, 52, 63, 62, 54, 59, 65, 70, 49, 67, 50, 37, 62, 50, 46, 68, 61, 55, 57, 58, 64, 81, 75, 67, 62, 54, 51, 46, 59, 82, 55, 69, 68, 37, 44, 75, 51, 45, 63, 59, 63, 41, 48, 39, 42, 72, 65, 81, 60, 74, 78, 50, 38, 68, 45], "rating_category": "Fail", "description_rewrite": {"guest_access": "You have full access to the entire property, including a spacious deck, modern kitchen, and cozy living areas. One closet will be locked for the owner's personal items.", "your_property": "This stylish A-Frame boasts vaulted ceilings, large king beds with en-suite bathrooms, and a loft workspace with stunning views. The spacious kitchen is equipped with modern appliances and opens to a deck with a Weber grill, perfect for entertaining. Enjoy the comforts of home and the beauty of nature all around you!", "listing_description": "Escape to the Peaceful Modern A-Frame Cabin, where every window frames breathtaking forest views. Immerse yourself in the natural beauty of Lake Arrowhead, waking up to serene sights from the lofted queen bedroom or enjoying gourmet cooking in a stylish kitchen. Cozy up with a book next to the fireplace or unwind on the expansive deck with outdoor dining. With modern amenities like fast WiFi and smart TVs, you'll have everything you need for relaxation. Nestled in a snowy paradise, be prepared for winter adventures!", "other_details_to_note": "In case of power outages, there is an automatic generator to keep the cabin running smoothly. Be aware of winter conditions and use appropriate vehicles with snow chains.", "interaction_with_guests": "I’m here for you! Message me anytime during your stay for recommendations or assistance. I want to ensure your experience is relaxing and enjoyable!"}}, "other_images": {"feedback": {"items": [{"title": "Image Quality", "feedback": "The photos have excellent resolution and clarity, enhancing the property's appeal."}, {"title": "Lighting", "feedback": "Natural and indoor lighting is beautifully balanced, creating a warm and inviting atmosphere."}, {"title": "Composition", "feedback": "The composition of each photo is thoughtfully structured, showcasing the property’s unique features delightfully."}], "summary": "Your photos are exceptional and capture the essence of a boutique stay beautifully."}, "revisions": null, "suggestions": ["Add a few more evening shots to capture the ambiance after sunset.", "Include close-up shots of any unique decorations or features.", "Showcase any available amenities like a spa or game room.,"], "property_name": "Boutique Stay", "rating_number": 94, "expert_ratings": [98, 96, 97, 95, 94, 96, 93, 95, 92, 94, 93, 96, 92, 97, 95, 94, 93, 94, 93, 92, 94, 91, 97, 96, 95, 94, 93, 98, 96, 95, 92, 95, 94, 93, 94, 95, 92, 96, 93, 95, 94, 97, 92, 98, 94, 93, 92, 91, 92, 95, 94, 93, 96, 95, 94, 92, 93, 96, 94, 93, 92, 97, 96, 95, 98, 93, 92, 94, 95, 92, 96, 94, 93, 91, 94, 93, 95, 96, 97, 94, 95, 93, 92, 94, 92, 93, 94, 95, 96, 98, 94, 93, 95, 92, 96, 94, 92, 93, 94, 95], "rating_category": "Excellent"}, "interior_design": {"feedback": {"items": [{"title": "Natural Light", "feedback": "The abundant natural light flooding through the windows adds to the tranquility of the space, making it feel open and inviting."}, {"title": "Modern Aesthetic", "feedback": "Your choice of modern furnishings complements the cabin's structure beautifully, offering both comfort and a contemporary touch."}, {"title": "Cozy Elements", "feedback": "The fireplace and plush seating arrangements enhance the cozy vibe, making it perfect for comfortable retreats."}, {"title": "Functional Layout", "feedback": "The layout of the bedrooms and living space is functional, providing ample room for guests to relax and enjoy their stay."}, {"title": "Engaging Color Palette", "feedback": "The use of earthy tones and soft colors harmonizes with the surrounding environment, promoting relaxation."}], "summary": "Overall, the interior design of your cabin is well-received, creating a welcoming and peaceful atmosphere that blends nicely with nature."}, "revisions": null, "suggestions": ["Add some decorative plants to introduce more greenery indoors.", "Incorporate more ambient lighting options for cozy evenings.", "Consider adding artwork from local artists to reflect the surroundings.", "Enhance the outdoor space with more seating or lounges for relaxation after hikes."], "property_name": "Peaceful Modern A-Frame Cabin with a view", "rating_number": 85, "expert_ratings": [72, 65, 90, 78, 83, 88, 91, 85, 74, 68, 66, 76, 73, 89, 64, 84, 81, 77, 61, 80, 70, 75, 67, 69, 87, 66, 82, 60, 68, 62, 90, 66, 72, 78, 62, 82, 79, 88, 73, 81, 94, 75, 76, 62, 74, 65, 68, 88, 72, 84, 78, 81, 79, 88, 65, 69, 66, 72, 90, 76, 73, 82, 64, 67, 76, 68, 79, 75, 90, 81, 71, 66, 78, 82, 80, 85, 90, 77, 72, 83, 80, 86, 79, 75, 82, 74, 83, 89, 91, 66, 88, 72, 81, 79, 68, 74, 79, 82, 86, 90, 87, 76, 62], "rating_category": "Good"}, "overall_ratings": {"feedback": {"items": [{"title": "Emphasize Scenic Views", "feedback": "Consider adding specific descriptive words addressing the views, which could entice potential guests."}, {"title": "Target Audience", "feedback": "Tailor the title further by including specific keywords that might appeal to your ideal guests, like 'family' or 'couple'."}, {"title": "Highlight Unique Features", "feedback": "Mention any special features in the title, such as the gourmet kitchen or the fireplace, to draw more interest."}], "summary": "Your property title conveys a sense of peace and modern style, which is appealing. However, a few tweaks could enhance its impact."}, "revisions": ["Serene Forest View A-Frame Cabin with Modern Touches", "Scenic Modern A-Frame Cabin for Family Fun and Relaxation", "Stylish A-Frame Cabin with Breathtaking Views and Comforts"], "suggestions": ["Include a keyword about the scenic view (e.g., 'serene').", "Mention a unique experience or aspect (e.g., 'cozy fireplace').", "Consider using alliteration or catchy phrases for greater appeal."], "property_name": "Peaceful Modern A-Frame Cabin with a view", "rating_number": 80, "expert_ratings": [66, 45, 73, 90, 53, 74, 69, 32, 80, 82, 35, 44, 51, 33, 76, 54, 61, 89, 42, 88, 47, 46, 57, 71, 84, 86, 60, 39, 30, 55, 67, 66, 90, 29, 28, 92, 89, 40, 84, 93, 75, 35, 69, 36, 27, 92, 56, 89, 49, 72, 74, 40, 35, 65, 61, 22, 58, 33, 73, 18, 50, 60, 52, 28, 67, 95, 88, 87, 92, 93, 94, 84, 70, 20, 38, 40, 63, 23, 36, 69, 34, 99, 49, 84, 76, 49, 21, 31, 91, 46, 30, 63, 68, 86, 42, 53, 34, 71, 36, 91, 24, 35, 80, 16, 66, 56, 83, 78, 25, 24, 15, 92], "rating_category": "Satisfactory"}}	2025-05-04 14:56:56.177893
27195574-1601-43ab-a876-0b00a7d15867	2025-05-04 14:58:51.914875+00	bb656334-8907-45b9-8e49-d29359a42e7b	{"title": {"feedback": {"items": [{"title": "Descriptive Language", "feedback": "The use of 'cozy' is appealing, but incorporating more engaging language could help attract more guests."}, {"title": "Unique Selling Points", "feedback": "Highlighting specific unique features of your home would make the title stand out more."}, {"title": "Target Audience", "feedback": "Consider who your audience is and tailor the title to appeal to their preferences."}, {"title": "Character Limit", "feedback": "Make sure your title is concise, ideally under 60 characters, for the best visibility."}, {"title": "SEO Keywords", "feedback": "Including location or nearby attractions in the title could improve searchability."}], "summary": "Your listing title captures essential elements, but might benefit from a touch of creativity."}, "revisions": ["Charming 2-Bedroom Home with Parking", "Stylish Family-Friendly Retreat with Free Parking & More!", "Cozy Two-Bedroom Escape with Amenities Galore!"], "suggestions": ["Consider adding a unique feature to the title such as 'modern design' or 'family-friendly'.", "Make it more enticing by using adjectives to describe the ambiance or neighborhood.", "Incorporate the location or nearby attractions to draw in potential guests."], "property_name": "Cozy two bedroom home with free parking", "rating_number": 82, "expert_ratings": [76, 84, 90, 75, 70, 85, 88, 81, 73, 79, 67, 78, 89, 77, 92, 66, 72, 94, 69, 83, 91, 76, 68, 82, 80, 87, 88, 71, 89, 74, 93, 65, 79, 85, 86, 77, 92, 81, 84, 90, 95, 75, 87, 86, 76, 70, 78, 65, 83, 68, 84, 69, 73, 75, 86, 82, 89, 77, 80, 94, 71, 66, 78, 85, 90, 76, 91, 82, 87, 83, 75, 94, 92, 71, 79, 86, 74, 82, 73, 87, 78, 72, 83, 91, 66, 93, 88, 77, 85, 68, 95, 92, 67, 79, 73, 83], "title_rewrites": ["Charming 2-Bedroom Retreat with Free Parking!", "Stylish Two-Bedroom Home - Your Cozy Haven!", "Cozy Two-Bedroom Getaway with Free Parking & Unique Style!"], "rating_category": "Good"}, "amenities": {"feedback": {"items": [{"title": "Laundry Facilities", "feedback": "Providing free in-unit washer and dryer is a great perk for guests, enhancing their convenience."}, {"title": "Entertainment Options", "feedback": "Having an HDTV with Amazon Prime Video, along with books and board games, ensures guests have ample entertainment."}, {"title": "Heating and Cooling Features", "feedback": "With ceiling fans and radiant heating, guests can find comfort throughout the seasons."}, {"title": "Safety Features", "feedback": "The presence of smoke alarms, carbon monoxide alarms, and a first aid kit indicates a commitment to guest safety."}, {"title": "Outdoor Amenities", "feedback": "A fully fenced backyard with outdoor furniture and a dining area is ideal for relaxation and enjoyment."}], "summary": "Your property offers a diverse range of amenities, contributing to a pleasant stay for guests, although there are areas for enhancement."}, "revisions": null, "suggestions": ["Consider enhancing air conditioning options, especially in warmer seasons.", "Adding more kitchen essentials could improve the cooking experience for guests.", "Consider providing complimentary snacks or drinks to create a welcoming atmosphere.", "Update outdoor amenities with additional seating or setups for evening gatherings.", "Ensure all safety equipment is clearly accessible and visible to guests."], "property_name": "Unique Experience Stay", "rating_number": 83, "expert_ratings": [78, 82, 85, 76, 79, 82, 81, 80, 88, 86, 84, 89, 72, 75, 83, 90, 78, 81, 82, 77, 75, 70, 68, 66, 74, 80, 81, 88, 85, 90, 72, 86, 78, 89, 84, 82, 74, 73, 88, 76, 79, 85, 84, 91, 78, 76, 74, 72, 79, 81, 82, 78, 88, 85, 84, 83, 70, 69, 75, 88, 82, 76, 77, 72, 85, 90, 81, 82, 84, 70, 69, 78, 75, 87, 83, 88, 78, 89, 86, 82, 79, 73, 72, 80, 81, 82, 84, 85, 77, 87, 88, 90, 72, 75, 78, 81, 80, 79, 82, 88, 84, 90, 76, 83, 75], "rating_category": "Good"}, "hero_image": {"feedback": {"items": [{"title": "Artistic Touch", "feedback": "The hero image gives off an artistic and cozy atmosphere with the framed picture and unique decor. This aligns well with the 'unique experience' promised."}, {"title": "Limited View", "feedback": "While the decor is intriguing, the image provides a limited view of the space. It would be more effective if it showed a wider view to highlight more features of the home."}, {"title": "Lighting", "feedback": "The lighting in the photo is warm, which complements the cozy theme. However, a bit more brightness could accentuate the details better."}, {"title": "Focal Point", "feedback": "The focus on the couch and wall art is nice, but including more of the room would enhance the appeal."}], "summary": "The hero image offers a cozy and artistic vibe that aligns well with the property's unique experience theme. However, it lacks a broader view of the space, which could provide more context to potential guests."}, "revisions": null, "suggestions": ["Include a wider shot of the living area to show more of the room.", "Add images that highlight key amenities like the kitchen or outdoor space.", "Ensure the lighting captures the room's details, possibly using natural light.", "Showcase the 'unique' aspects mentioned in the description, such as any special decor or architectural features.", "Consider adding images of the bedroom or other focal points of the home."], "property_name": "Cozy two bedroom home with free parking", "rating_number": 68, "expert_ratings": [70, 72, 65, 68, 66, 71, 69, 64, 74, 67, 73, 62, 63, 70, 61, 68, 69, 65, 72, 66, 71, 74, 63, 64, 73, 67, 65, 66, 71, 72, 68, 66, 64, 70, 63, 61, 68, 67, 73, 72, 71, 70, 69, 68, 67, 65, 64, 63, 62, 71, 72, 70, 68, 67, 66, 65, 64, 63, 62, 61, 74, 73, 72, 71, 70, 69, 68, 67, 65, 64, 63, 62, 61, 71, 70, 69, 68, 67, 66, 75, 64, 63, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 75, 74, 73, 72, 71, 70], "rating_category": "Needs Work"}, "description": {"feedback": {"items": [{"title": "Highlight Unique Features", "feedback": "Consider emphasizing what makes your home unique, whether it's the décor, layout, or local surroundings."}, {"title": "Describe the Experience", "feedback": "Instead of just listing amenities, try to create an inviting story around the experience guests will have while staying."}, {"title": "Improve Visual Appeal", "feedback": "Ensure that the hero images properly reflect the quality and warmth of your home."}, {"title": "Detail the Neighborhood", "feedback": "Provide insights into the local area, attractions, or experiences that guests can enjoy during their stay."}, {"title": "Revise Pricing/Offers", "feedback": "Make sure the price reflects the value your unique experience offers or consider special offers."}], "summary": "Your property has great potential with a unique style and several amenities that guests will appreciate. However, the listing could benefit from more specific details and engaging descriptions."}, "revisions": null, "suggestions": ["Add a captivating opening line to grab attention.", "Include local attractions or tips in your description.", "Use more descriptive language to paint a picture for guests.", "Consider adding personal touches or stories related to the home.", "Make sure to highlight any seasonal or unique events occurring locally."], "property_name": "Cozy Two Bedroom Home", "rating_number": 74, "expert_ratings": [51, 73, 68, 45, 88, 77, 82, 50, 65, 54, 69, 61, 64, 68, 44, 56, 63, 72, 59, 62, 71, 80, 66, 47, 58, 70, 53, 52, 76, 78, 67, 49, 55, 41, 84, 46, 60, 43, 89, 67, 75, 54, 74, 48, 81, 39, 85, 40, 90, 92, 71, 42, 57, 79, 35, 86, 34, 37, 38, 33, 32, 31, 80, 48, 76, 28, 78, 68, 50, 88, 51, 52, 65, 84, 81, 86, 60, 53, 74, 41, 59, 75, 85, 64, 63, 80, 41, 45, 60, 65, 39, 42, 38, 79, 55, 44, 31, 34, 33, 29, 28, 80, 42, 30, 32, 50, 70, 46, 49, 75, 69, 63, 52, 69, 33, 92, 92, 95, 92], "rating_category": "Satisfactory", "description_rewrite": {"guest_access": "Guests have full access to the entire home, including a kitchen stocked with essentials, a private backyard, and a cozy living area. Free parking is available on the premises.", "your_property": "This stylish two-bedroom home features an airy layout, adorned with personal touches that bring warmth to your stay. Enjoy the comforts of a modern kitchen and a private patio for your outdoor moments.", "listing_description": "Escape to a cozy two-bedroom haven where comfort meets style! Our unique home offers everything you need for a delightful getaway. Enjoy free parking, a private backyard and a fully equipped kitchen perfect for family meals. Relax in the inviting living space, unwind on the patio, and experience a stay that feels like home.", "other_details_to_note": "Please note that while we have many amenities, air conditioning is not available.", "interaction_with_guests": "Your privacy is respected, but I am available for any questions or recommendations you may need to enhance your stay."}}, "other_images": {"feedback": {"items": [{"title": "Composition", "feedback": "Your photos have a pleasant composition but could be improved with better angles and lighting to capture the space more dynamically."}, {"title": "Lighting", "feedback": "Some photos could benefit from natural lighting. Consider taking pictures at different times of the day to capture the best light."}, {"title": "Personal Touch", "feedback": "The decor and personal touches add a unique charm to your property. Highlight these elements with closer shots."}], "summary": "Your photos provide an inviting glimpse into your cozy space. The overall quality creates a warm and welcoming atmosphere, though a few adjustments could really make them shine."}, "revisions": null, "suggestions": ["Enhance the lighting in your photos by using natural light or additional lighting when needed.", "Consider using a wide-angle lens to better capture the spaciousness of your rooms.", "Add a few close-up shots of unique decor elements to emphasize the property's character.", "Experiment with different angles to provide a more varied perspective of each room.", "Retake any photos that appear too dark or unbalanced to ensure clarity.", "Consider Hiring a Professional Photographer\\n                               \\n            While your photos are a good start, hiring a professional photographer could significantly elevate the visual appeal of your listing. A pro has the experience to capture your space in the best possible light, ensuring that it looks both inviting and accurate. This investment can help differentiate your property in a competitive market, where high-quality visuals can be the deciding factor for potential guests. Professional photographers are skilled in aspects like lighting, composition, and angles, which can make your property look more spacious, appealing, and true to its real-life charm.\\n                               \\n            For Those Who Prefer DIY Photography or Are Working Within a Budget\\n                               \\n            If you prefer to handle your own photography or a professional is outside your budget, here are a few simple tips to help improve your photos:\\n                               \\n            Maximize Natural Light: Aim to shoot during the day when natural light is abundant. Open all windows, use light-colored curtains, and avoid harsh overhead lights. Natural light enhances the warmth and appeal of the space, making it feel more inviting.\\n                               \\n            Use Wide Angles: When photographing rooms, use wide-angle shots to capture the entire space. This helps give viewers a sense of the room's size and layout. Avoid tight or cluttered shots, as they can make the space feel smaller than it actually is.\\n                               \\n            Focus on Clean and Tidy Staging: Before you take the photo, clear away any clutter. Neatly arrange furniture and decor to make the space look polished and functional. The simpler and more streamlined the space appears, the more likely it is to resonate with potential guests."], "property_name": "Unique Experience Stay", "rating_number": 71, "expert_ratings": [75, 68, 72, 70, 74, 71, 69, 66, 70, 73, 72, 68, 74, 70, 71, 69, 73, 72, 67, 71, 73, 68, 72, 70, 74, 71, 65, 74, 72, 70, 71, 68, 69, 74, 69, 71, 72, 67, 70, 73, 72, 70, 68, 74, 72, 68, 75, 71, 69, 70, 72, 73, 68, 70, 74, 71, 69, 72, 71, 67, 73, 72, 66, 74, 69, 70, 71, 68, 73, 72, 67, 70, 74, 70, 71, 69, 68, 72, 75, 70, 71, 73, 69, 68, 72, 74, 70, 71, 67, 73, 68, 72, 74, 71, 70, 69, 73, 72, 71, 70], "rating_category": "Satisfactory"}, "interior_design": {"feedback": {"items": [{"title": "Color Palette", "feedback": "The color palette used is warm and inviting, which adds to the cozy ambiance of the home."}, {"title": "Space Utilization", "feedback": "The layout is practical and effectively utilizes the available space, making it easy for guests to navigate."}, {"title": "Furniture Selection", "feedback": "The selection of furniture is quite comfortable, but it could be enhanced with more modern or stylish pieces to elevate the overall aesthetic."}, {"title": "Decor Elements", "feedback": "The decor shows personal touches which make the space feel unique, yet some areas may benefit from additional decorative items to enhance visual appeal."}, {"title": "Outdoor Space", "feedback": "The private patio and backyard are excellent features, but adding some greenery or decorations could make them more inviting."}], "summary": "This cozy two-bedroom home features inviting decor and a thoughtful array of amenities, creating an enjoyable environment for guests. The design strikes a balance between comfort and style, although there are a few areas that could use some enhancement."}, "revisions": null, "suggestions": ["Consider refreshing the furniture with updated styles that reflect current trends.", "Add decorative elements such as artwork or plants to enhance the visual appeal of the rooms.", "Incorporate more lighting options to create different atmospheres depending on the time of day."], "property_name": "Cozy two bedroom home with free parking", "rating_number": 82, "expert_ratings": [71, 78, 82, 85, 79, 75, 93, 88, 65, 76, 73, 80, 68, 81, 70, 89, 84, 86, 69, 75, 80, 87, 77, 82, 90, 92, 83, 81, 72, 74, 91, 66, 95, 78, 88, 84, 80, 82, 75, 67, 86, 90, 68, 79, 88, 87, 76, 72, 74, 81, 85, 94, 73, 75, 92, 89, 95, 76, 68, 81, 77, 82, 74, 83, 91, 78, 64, 73, 72, 91, 88, 82, 89, 80, 75, 84, 78, 67, 82, 90, 92, 79, 86, 89, 88, 77, 73, 81, 65, 82, 73, 89, 92, 81, 85, 75, 67, 74, 93, 90, 90, 95, 71, 84, 80, 79, 86, 82, 78, 76], "rating_category": "Good"}, "overall_ratings": {"feedback": {"items": [{"title": "Descriptive Language", "feedback": "The use of 'cozy' is appealing, but incorporating more engaging language could help attract more guests."}, {"title": "Unique Selling Points", "feedback": "Highlighting specific unique features of your home would make the title stand out more."}, {"title": "Target Audience", "feedback": "Consider who your audience is and tailor the title to appeal to their preferences."}, {"title": "Character Limit", "feedback": "Make sure your title is concise, ideally under 60 characters, for the best visibility."}, {"title": "SEO Keywords", "feedback": "Including location or nearby attractions in the title could improve searchability."}], "summary": "Your listing title captures essential elements, but might benefit from a touch of creativity."}, "revisions": ["Charming 2-Bedroom Home with Parking", "Stylish Family-Friendly Retreat with Free Parking & More!", "Cozy Two-Bedroom Escape with Amenities Galore!"], "suggestions": ["Consider adding a unique feature to the title such as 'modern design' or 'family-friendly'.", "Make it more enticing by using adjectives to describe the ambiance or neighborhood.", "Incorporate the location or nearby attractions to draw in potential guests."], "property_name": "Cozy two bedroom home with free parking", "rating_number": 76, "expert_ratings": [76, 84, 90, 75, 70, 85, 88, 81, 73, 79, 67, 78, 89, 77, 92, 66, 72, 94, 69, 83, 91, 76, 68, 82, 80, 87, 88, 71, 89, 74, 93, 65, 79, 85, 86, 77, 92, 81, 84, 90, 95, 75, 87, 86, 76, 70, 78, 65, 83, 68, 84, 69, 73, 75, 86, 82, 89, 77, 80, 94, 71, 66, 78, 85, 90, 76, 91, 82, 87, 83, 75, 94, 92, 71, 79, 86, 74, 82, 73, 87, 78, 72, 83, 91, 66, 93, 88, 77, 85, 68, 95, 92, 67, 79, 73, 83], "rating_category": "Satisfactory"}}	2025-05-04 14:58:51.914875
5b405d60-4150-4672-8364-e00202f2b41c	2025-05-04 02:29:45.46349+00	e46c98a9-f2f3-411f-a462-a59ff8171ed0	{"title": {"feedback": {"items": [{"title": "Incorporate Unique Features", "feedback": "Highlight signature features like space for parking, large living areas, or recreational facilities."}, {"title": "Consider Guest Experience", "feedback": "Use more inviting language that emphasizes the peaceful stay and fun activities nearby."}, {"title": "Simplify Language", "feedback": "Adjust the phrasing for clarity; consider using '2000 sq ft' for a smoother read."}], "summary": "Your title does a good job of capturing the property's unique 1970s charm and its proximity to the river. However, it could be more engaging and informative."}, "revisions": ["1970's Oasis: Spacious 2000 SQ FT Home with River Access!", "Serene 1970's Retreat: Enjoy 2000 SQ FT Near the River!", "Spacious 1970's Hidden Gem by the River: A Perfect Getaway!"], "suggestions": ["Try a title that emphasizes the fun activities nearby, like 'Waterfront Retreat: Spacious 2000 SQ FT Hidden Gem!'", "Use more vivid adjectives; for example, 'Serene 1970's Oasis Close to the River! 2000 SQ FT of Fun!'", "Include aspects of the unique charm; e.g., 'Charming 1970's Home with Pool Table & River Access!'"], "property_name": "1970'S HIDDEN GEM CLOSE TO THE RIVER 2000 SQ FT", "rating_number": 72, "expert_ratings": [78, 56, 45, 72, 69, 59, 55, 34, 83, 66, 71, 74, 40, 34, 66, 49, 39, 77, 61, 55, 38, 45, 82, 61, 57, 39, 99, 55, 81, 70, 50, 29, 56, 38, 73, 41, 84, 75, 47, 48, 30, 81, 57, 83, 55, 77, 64, 87, 47, 69, 31, 73, 86, 43, 40, 49, 67, 57, 71, 76, 24, 76, 61, 39, 67, 28, 94, 39, 28, 55, 37, 57, 43, 70, 94, 28, 86, 67, 50, 57, 84, 73, 48, 31, 32, 74, 35, 71, 58, 72, 30, 92, 64, 91, 62, 66, 70, 66, 51, 30, 39, 73, 75, 40, 75, 64, 50, 88, 43, 39, 34, 88, 54, 90, 25, 94, 44, 35, 64, 53, 84, 39, 43, 28, 73, 33, 74, 75, 71, 63, 62, 55, 82, 19], "title_rewrites": ["Charming 1970's River Retreat: 2000 SQ FT of Fun and Relaxation!", "Spacious 2000 SQ FT Home with Pool Table Minutes from the River!", "Unique 1970's Oasis: Close to River with Plenty of Space!"], "rating_category": "Satisfactory"}, "amenities": {"feedback": {"items": [{"title": "Scenic and Mountain Views", "feedback": "You have a beautiful setting with scenic and mountain views that guests will love."}, {"title": "Family-Friendly Features", "feedback": "The addition of baby gates and board games is a great way to attract families and ensure a good time for all ages."}, {"title": "Safety Features", "feedback": "Your safety features, including alarms and security cameras, provide peace of mind."}, {"title": "Comfortable and Convenient Amenities", "feedback": "The in-unit laundry facilities and kitchen essentials make the stay more comfortable and convenient."}, {"title": "Outdoor Spaces", "feedback": "Having a private patio and outdoor dining area enhances the experience for guests wanting to enjoy the outdoors."}], "summary": "Your property offers a range of appealing amenities that make it suitable for a variety of guests, from families to couples seeking a scenic getaway."}, "revisions": null, "suggestions": ["Consider enhancing the outdoor area with additional landscaping or lighting to improve the atmosphere.", "Evaluate the communication around security cameras. Ensuring guests understand their purpose without being intrusive can enhance comfort.", "Add information about nearby attractions or activities to the listing to entice potential guests."], "property_name": "Scenic Mountain Retreat", "rating_number": 85, "expert_ratings": [38, 41, 73, 86, 52, 67, 17, 90, 45, 69, 72, 33, 65, 80, 92, 47, 66, 77, 76, 83, 26, 15, 86, 49, 20, 53, 35, 84, 93, 23, 64, 21, 71, 98, 55, 12, 57, 48, 38, 54, 34, 44, 81, 78, 19, 16, 60, 31, 40, 89, 37, 75, 74, 39, 61, 3, 87, 8, 29, 25, 99, 94, 14, 9, 88, 1, 2, 6, 70, 24, 91, 13, 32, 4, 10, 5, 58, 50, 11, 30, 36, 27, 62, 59, 63, 68, 26, 95, 82, 7, 96, 97, 30], "rating_category": "Good"}, "hero_image": {"feedback": {"items": [{"title": "Retro Appeal", "feedback": "Your property's 1970s charm is well reflected in the hero image with the vintage decor and bar area."}, {"title": "Entertainment Focus", "feedback": "The inclusion of a pool table and bar prominently in the shot invites potential guests to imagine leisure and fun."}, {"title": "Lighting and Contrast", "feedback": "Improving the lighting would greatly enhance the image's warmth and clarity, making it more inviting."}], "summary": "The hero image effectively captures the retro vibe of the property, highlighting the rustic charm and entertainment options available, though some lighting improvements could enhance its appeal."}, "revisions": null, "suggestions": ["Enhance lighting to create a warmer, more inviting atmosphere.", "Highlight specific modern amenities like the HDTV and sound system.", "Include an exterior shot to showcase the proximity to the river.", "Capture different angles of the spacious interior to emphasize size.", "Consider adding decorative elements to enliven the space."], "property_name": "1970'S HIDDEN GEM CLOSE TO THE RIVER 2000 SQ FT", "rating_number": 73, "expert_ratings": [81, 77, 68, 70, 75, 74, 76, 69, 72, 80, 79, 73, 71, 66, 78, 67, 74, 76, 70, 68, 77, 75, 73, 71, 72, 74, 78, 76, 75, 69, 73, 71, 79, 81, 74, 76, 72, 73, 68, 70, 75, 74, 77, 78, 76, 81, 69, 71, 68, 72, 78, 77, 79, 71, 70, 74, 76, 75, 73, 74, 72, 78, 68, 70, 77, 81, 69, 78, 79, 74, 73, 68, 71, 66, 72, 80, 75, 76, 68, 74, 73, 69, 78, 70, 72, 71, 79, 76, 77, 74, 75, 73, 76, 80, 74, 68, 70, 72, 77, 75], "rating_category": "Satisfactory"}, "description": {"feedback": {"items": [{"title": "Clarity of Information", "feedback": "Consider simplifying complex phrases and instructions to make it easier for guests to understand."}, {"title": "Tone and Vibe", "feedback": "The overall tone is quite formal; a more inviting and friendly tone could attract more guests."}, {"title": "Highlight Key Features", "feedback": "Make sure to emphasize unique features like the pool table and BBQ grill more prominently in the description."}, {"title": "Guest Policies", "feedback": "Clear guest policies are important, but make sure they're presented in a less intimidating way."}, {"title": "Photos Consistency", "feedback": "Ensure that all images consistently reflect the home's charming vibe to capture attention effectively."}], "summary": "Your listing has a lot of potential but needs refinement for maximum appeal. Focus on clarity and positivity in your messaging."}, "revisions": null, "suggestions": ["Rewrite the description to make it more inviting and less formal.", "Add a section highlighting nearby attractions for potential guests.", "Back off on stringent guest restrictions—focus on positives instead.", "Include more vibrant imagery in the text to complement the visuals.", "Consider a catchy tagline that summarizes the experience offered."], "property_name": "1970's Hidden Gem Close to the River", "rating_number": 65, "expert_ratings": [67, 65, 72, 58, 61, 74, 64, 68, 59, 66, 70, 75, 62, 54, 72, 77, 61, 58, 69, 60, 71, 76, 65, 54, 63, 67, 66, 59, 62, 64, 75, 61, 72, 55, 58, 68, 73, 65, 54, 70, 76, 67, 59, 74, 63, 62, 61, 68, 75, 64, 71, 66, 78, 55, 72, 62, 64, 77, 69, 68, 61, 57, 74, 65, 66, 75, 74, 58, 73, 66, 72, 67, 64, 53, 71, 76, 67, 65, 69, 71, 61, 60, 68, 74, 78, 66, 61, 58, 69, 66, 72, 62, 75, 63, 77, 65, 55, 70, 64, 71, 65, 66, 71, 66, 67, 68, 73, 63, 61, 67, 70, 67, 69, 74, 65, 56, 70, 76, 60, 64, 57, 57, 69, 75, 71, 68, 72, 62], "rating_category": "Needs Work", "description_rewrite": {"guest_access": "Guests are welcome to utilize the entire interior of the home, as well as the front patio and ample parking available on both the property and the adjacent gravel area.", "your_property": "This inviting 3-bedroom, 2-bath home features a large master suite, multiple relaxation areas, and an outdoor space perfect for unwinding. Enjoy the vintage charm combined with modern conveniences for an inviting atmosphere.", "listing_description": "Experience a spacious 2,000 sq ft 1970s gem, nestled just 2,600 feet from the picturesque river. This charming cul-de-sac home comfortably accommodates six guests in a peaceful neighborhood, close to popular boat launch ramps and rentals. Enjoy a game of pool, cook in the full kitchen, or relax outside with BBQ facilities. Perfect for families and pet lovers, with dog-friendly policies. Book monthly stays with a signed lease agreement!", "other_details_to_note": "For safety, there are exterior security cameras. Please register all guests prior to check-in, and contact me if you have any questions about our pet policy or other requirements.", "interaction_with_guests": "While I respect your privacy during your stay, I am readily available for any questions or needs you may have to ensure your stay is exceptional."}}, "other_images": {"feedback": {"items": [{"title": "Lighting", "feedback": "Some photos appear a bit dim. Consider using brighter lighting to make the space look more inviting."}, {"title": "Clarity", "feedback": "A few images are slightly blurry. Clearer pictures will better showcase the details of your space."}, {"title": "Composition", "feedback": "The room setups are nice, but try different angles to capture more of the space in each photo."}], "summary": "Your photos capture a cozy and spacious feeling, but there's room for improvement in lighting and clarity."}, "revisions": null, "suggestions": ["Enhance the lighting to brighten up the rooms.", "Use a high-resolution camera or ensure sharper focus to avoid blurry images.", "Experiment with different angles to capture fuller views of the spaces.", "Consider including some outdoor or natural light shots to add variety.", "Arrange furniture carefully to highlight space and functionality.", "Consider Hiring a Professional Photographer\\n                               \\n            While your photos are a good start, hiring a professional photographer could significantly elevate the visual appeal of your listing. A pro has the experience to capture your space in the best possible light, ensuring that it looks both inviting and accurate. This investment can help differentiate your property in a competitive market, where high-quality visuals can be the deciding factor for potential guests. Professional photographers are skilled in aspects like lighting, composition, and angles, which can make your property look more spacious, appealing, and true to its real-life charm.\\n                               \\n            For Those Who Prefer DIY Photography or Are Working Within a Budget\\n                               \\n            If you prefer to handle your own photography or a professional is outside your budget, here are a few simple tips to help improve your photos:\\n                               \\n            Maximize Natural Light: Aim to shoot during the day when natural light is abundant. Open all windows, use light-colored curtains, and avoid harsh overhead lights. Natural light enhances the warmth and appeal of the space, making it feel more inviting.\\n                               \\n            Use Wide Angles: When photographing rooms, use wide-angle shots to capture the entire space. This helps give viewers a sense of the room's size and layout. Avoid tight or cluttered shots, as they can make the space feel smaller than it actually is.\\n                               \\n            Focus on Clean and Tidy Staging: Before you take the photo, clear away any clutter. Neatly arrange furniture and decor to make the space look polished and functional. The simpler and more streamlined the space appears, the more likely it is to resonate with potential guests."], "property_name": "Standard Stay Property", "rating_number": 65, "expert_ratings": [65, 64, 66, 67, 60, 62, 68, 63, 61, 64, 65, 68, 62, 63, 67, 66, 65, 69, 64, 66, 60, 61, 65, 62, 63, 67, 66, 61, 64, 68, 66, 62, 63, 65, 67, 64, 68, 66, 69, 62, 65, 63, 64, 66, 67, 60, 62, 69, 68, 65, 61, 64, 66, 62, 63, 67, 65, 66, 64, 63, 61, 68, 62, 66, 69, 63, 66, 65, 64, 67, 68, 65, 63, 64, 60, 62, 65, 67, 63, 66, 64, 61, 62, 68, 66, 65, 60, 61, 63, 69, 64, 62, 66, 65, 63, 68, 67, 66, 64, 65], "rating_category": "Needs Work"}, "interior_design": {"feedback": {"items": [{"title": "Interior Color Palette", "feedback": "Consider updating the color scheme to incorporate more modern and trendy colors, as the current palette may feel too dated."}, {"title": "Furniture Arrangement", "feedback": "Reassess the furniture layout to optimize space utilization and flow for guests, particularly in the living areas."}, {"title": "Lighting Fixtures", "feedback": "Upgrade the lighting fixtures to create a cozy atmosphere and improve visibility in living and dining areas."}, {"title": "Decor Accents", "feedback": "Incorporate more decorative elements that reflect local culture or natural surroundings to create a unique vibe."}, {"title": "Outdoor Space", "feedback": "Enhance the outdoor area to make it feel more inviting with comfortable furniture and decorative elements."}], "summary": "Your property has a unique 1970's charm that appeals to guests looking for a nostalgic experience. However, there are areas that need attention to enhance the overall aesthetic and functionality."}, "revisions": null, "suggestions": ["Consider a fresh coat of paint in a modern color palette.", "Invest in new furniture that complements the style you wish to promote.", "Add some tasteful decor items that fit the 1970's theme but with a modern twist.", "Upgrade lighting fixtures to enhance ambiance throughout the home.", "Focus on creating a more inviting outdoor space with furniture and landscaping."], "property_name": "1970'S HIDDEN GEM CLOSE TO THE RIVER 2000 SQ FT", "rating_number": 66, "expert_ratings": [86, 78, 65, 72, 90, 66, 75, 73, 88, 82, 79, 80, 67, 71, 76, 62, 81, 68, 70, 85, 84, 64, 63, 69, 77, 74, 92, 68, 61, 68, 72, 60, 75, 67, 78, 66, 69, 70, 82, 88, 81, 89, 90, 80, 72, 64, 85, 81, 83, 76, 62, 65, 87, 66, 79, 73, 70, 78, 65, 82, 76, 90, 82, 88, 72, 69, 65, 74, 76, 77, 68, 67, 84, 73, 72, 88, 82, 61, 69, 66, 78, 66, 58, 80, 75, 92, 79, 63, 72, 89, 71, 86, 94, 87, 72, 81, 68, 71, 79, 67, 83, 90, 74, 75, 86, 64, 80, 69, 68, 93, 82], "rating_category": "Needs Work"}, "overall_ratings": {"feedback": {"items": [{"title": "Incorporate Unique Features", "feedback": "Highlight signature features like space for parking, large living areas, or recreational facilities."}, {"title": "Consider Guest Experience", "feedback": "Use more inviting language that emphasizes the peaceful stay and fun activities nearby."}, {"title": "Simplify Language", "feedback": "Adjust the phrasing for clarity; consider using '2000 sq ft' for a smoother read."}], "summary": "Your title does a good job of capturing the property's unique 1970s charm and its proximity to the river. However, it could be more engaging and informative."}, "revisions": ["1970's Oasis: Spacious 2000 SQ FT Home with River Access!", "Serene 1970's Retreat: Enjoy 2000 SQ FT Near the River!", "Spacious 1970's Hidden Gem by the River: A Perfect Getaway!"], "suggestions": ["Try a title that emphasizes the fun activities nearby, like 'Waterfront Retreat: Spacious 2000 SQ FT Hidden Gem!'", "Use more vivid adjectives; for example, 'Serene 1970's Oasis Close to the River! 2000 SQ FT of Fun!'", "Include aspects of the unique charm; e.g., 'Charming 1970's Home with Pool Table & River Access!'"], "property_name": "1970'S HIDDEN GEM CLOSE TO THE RIVER 2000 SQ FT", "rating_number": 71, "expert_ratings": [78, 56, 45, 72, 69, 59, 55, 34, 83, 66, 71, 74, 40, 34, 66, 49, 39, 77, 61, 55, 38, 45, 82, 61, 57, 39, 99, 55, 81, 70, 50, 29, 56, 38, 73, 41, 84, 75, 47, 48, 30, 81, 57, 83, 55, 77, 64, 87, 47, 69, 31, 73, 86, 43, 40, 49, 67, 57, 71, 76, 24, 76, 61, 39, 67, 28, 94, 39, 28, 55, 37, 57, 43, 70, 94, 28, 86, 67, 50, 57, 84, 73, 48, 31, 32, 74, 35, 71, 58, 72, 30, 92, 64, 91, 62, 66, 70, 66, 51, 30, 39, 73, 75, 40, 75, 64, 50, 88, 43, 39, 34, 88, 54, 90, 25, 94, 44, 35, 64, 53, 84, 39, 43, 28, 73, 33, 74, 75, 71, 63, 62, 55, 82, 19], "rating_category": "Satisfactory"}}	2025-05-04 02:29:45.46349
ad69b53c-7c66-4b50-b997-4fcb3e1d4297	2025-05-04 17:04:03.934213+00	b72b23db-1b96-4d91-a178-0a254debed2f	{"title": {"feedback": {"items": [{"title": "Descriptiveness", "feedback": "The title gives a good overview of the property, mentioning key features like the number of bedrooms and boat parking."}, {"title": "Catchiness", "feedback": "Adding a creative touch could make the title more appealing."}, {"title": "Length", "feedback": "The title is concise but could be expanded slightly for flair."}], "summary": "Your title effectively describes the property, but it could benefit from a more inviting tone."}, "revisions": ["Cozy Harbor Happenings: Two Bedrooms & Boat Parking – Perfect for Families!", "Beachside Bliss: Two Bedroom Home with Boat Parking – Steps from the Ocean!", "Sunny Getaway: Two Bedroom Retreat with Convenient Boat Parking!"], "suggestions": ["Incorporate a more descriptive adjective to make it sound appealing (e.g., \\"Charming Harbor Happenings: Two Bedroom Home with Boat Parking!\\").", "Highlight a nearby attraction or activity to entice guests (e.g., \\"Relaxing Two Bedroom Home - Steps from the Beach and Boat Access!\\").", "Use a strong verb to create excitement (e.g., \\"Discover the Harbor Happenings: Spacious Two Bedroom Home with Boat Parking!\\")."], "property_name": "Harbor Happenings-Two bedroom home- boat parking!", "rating_number": 82, "expert_ratings": [61, 77, 94, 88, 83, 72, 91, 65, 84, 78, 82, 76, 87, 96, 62, 80, 68, 79, 73, 85, 75, 66, 88, 69, 68, 61, 97, 85, 83, 82, 70, 67, 87, 95, 74, 94, 76, 92, 78, 63, 80, 64, 66, 81, 86, 92, 89, 81, 82, 93, 85, 72, 75, 74, 88, 66, 76, 84, 72, 69, 85, 78, 84, 91, 73, 77, 68, 74, 85, 63, 62, 66, 69, 60, 98, 83, 75, 86, 79, 84, 66, 69, 89, 70, 80, 63, 62, 91, 85, 74, 68, 61, 72, 89, 92, 68, 97, 81, 90, 94, 88, 98, 76, 71, 77, 99, 89, 94, 68, 83, 64, 74, 76, 68, 86, 72, 80], "title_rewrites": ["Charming Harbor Happenings: Two-Bedroom Home with Boat Parking!", "Relaxing Retreat: Spacious Two Bedroom Home with Boat Parking!", "Seaside Escape: Two Bedroom Haven with Convenient Boat Parking!"], "rating_category": "Good"}, "amenities": {"feedback": {"items": [{"title": "Bathroom Amenities", "feedback": "You have a well-equipped bathroom; however, consider adding more luxury items."}, {"title": "Entertainment Options", "feedback": "The entertainment choices are decent, but diversifying the options might attract more families."}, {"title": "Heating and Cooling", "feedback": "While there are basic heating options, consider offering air conditioning for warmer months."}, {"title": "Location Features", "feedback": "The shared beach access and nearby amenities are great; ensure these are highlighted in your listings."}, {"title": "Parking Facilities", "feedback": "Ample parking is offered, which is a big plus for guests with vehicles."}], "summary": "Your property offers a solid range of amenities that cater to a variety of guest needs, but there are areas that require attention to enhance the overall experience."}, "revisions": null, "suggestions": ["Add air conditioning for guest comfort during warmer months.", "Consider upgrading bathroom amenities to include luxury items like bathrobes and premium toiletries.", "Expand on entertainment options by including streaming services or a game console.", "Highlight location perks more effectively in your listing descriptions to attract more guests.", "Provide better cooking basics in the kitchen to enhance the cooking experience."], "property_name": "Standard Stay Property", "rating_number": 76, "expert_ratings": [50, 65, 82, 71, 90, 42, 62, 80, 77, 66, 88, 49, 56, 59, 83, 35, 87, 67, 57, 73, 76, 89, 61, 82, 54, 64, 46, 78, 92, 75, 74, 86, 40, 53, 81, 74, 63, 70, 58, 39, 68, 62, 97, 48, 55, 60, 88, 35, 78, 94, 84, 62, 80, 64, 75, 69, 45, 48, 51, 57, 69, 47, 63, 39, 65, 88, 66, 72, 71, 93, 59, 55, 89, 96, 68, 49, 92, 83, 77, 41, 84, 35, 36, 79, 42, 38, 90, 58, 45, 69, 33, 70, 81, 72, 40, 50, 86, 45, 84, 71, 65, 96, 69, 39, 50, 99, 99, 78, 88, 86], "rating_category": "Satisfactory"}, "hero_image": {"feedback": {"items": [{"title": "Bright and Spacious", "feedback": "The room looks bright and inviting, with natural lighting creating a positive first impression. The space appears roomy and accommodating for guests."}, {"title": "Cozy Seating Arrangement", "feedback": "The cozy couches and seating area make it look like an ideal spot for relaxation and socializing. It seems perfect for families or groups."}, {"title": "Decor and Ambiance", "feedback": "The decorative elements, like wall hangings and throws, add a touch of charm but could be better coordinated to elevate the aesthetic appeal."}, {"title": "Neutral Color Palette", "feedback": "The modern and neutral color palette enhances the feeling of openness and should appeal to a variety of guests."}, {"title": "Visibility of Features", "feedback": "The photo does not highlight all key features and amenities. Consider showcasing unique or high-demand features more prominently to enhance attractiveness."}], "summary": "The hero image gives a bright and welcoming impression, highlighting the spacious and comfortable living area that's ideal for relaxing after a day at the harbor or beach. A few details could be enhanced to make it more appealing."}, "revisions": null, "suggestions": ["Improve coordination in decor to enhance visual appeal.", "Highlight key features like the fireplace or entertainment setup in the hero image.", "Consider using a wider angle to capture more of the open space and amenities.", "Add subtle, stylish touches to the furniture to improve the cozy ambiance.", "Incorporate elements that reflect the harbor or beach theme to tie in with the location appeal."], "property_name": "Harbor Happenings-Two bedroom home- boat parking!", "rating_number": 78, "expert_ratings": [75, 80, 78, 77, 81, 76, 82, 79, 74, 73, 80, 85, 77, 78, 76, 79, 83, 82, 81, 77, 76, 79, 78, 74, 75, 80, 84, 78, 77, 81, 76, 79, 80, 78, 82, 83, 85, 81, 77, 80, 75, 78, 79, 84, 78, 82, 76, 77, 81, 80, 79, 75, 74, 83, 82, 77, 80, 78, 79, 76, 80, 82, 81, 78, 77, 79, 74, 76, 77, 80, 81, 75, 77, 78, 76, 79, 75, 80, 82, 83, 77, 81, 80, 79, 76, 78, 82, 79, 77, 81, 76, 74, 78, 75, 79, 80, 82, 81, 77, 78], "rating_category": "Satisfactory"}, "description": {"feedback": {"items": [{"title": "Listing Clarity", "feedback": "The description could be clearer and more structured to highlight key features and amenities."}, {"title": "Engagement Level", "feedback": "Make the description more inviting and emotionally appealing to attract potential guests."}, {"title": "Local Attractions", "feedback": "Provide more information about nearby attractions and activities to entice guests."}, {"title": "Visual Elements", "feedback": "While you have good images, incorporating them effectively into the text could enhance appeal."}, {"title": "Unique Selling Points", "feedback": "Highlight what makes your property unique beyond just the basics to stand out."}], "summary": "The listing offers a good range of amenities and a solid location, but could benefit from more engaging language and details to captivate potential guests."}, "revisions": null, "suggestions": ["Revise the description to incorporate a more engaging and inviting tone.", "Include more details about local attractions, restaurants, and activities.", "Highlight unique features of the property that may appeal to specific types of guests.", "Utilize bullet points for easier readability of the amenities and features.", "Incorporate more compelling imagery in the listing to attract attention."], "property_name": "Harbor Happenings", "rating_number": 68, "expert_ratings": [61, 67, 72, 58, 65, 70, 63, 68, 66, 59, 64, 61, 74, 60, 62, 73, 71, 69, 66, 75, 74, 64, 70, 68, 72, 58, 61, 67, 65, 62, 66, 70, 63, 75, 72, 69, 74, 64, 60, 61, 68, 70, 67, 74, 65, 59, 66, 61, 75, 67, 63, 62, 66, 64, 69, 72, 61, 68, 73, 65, 74, 76, 69, 59, 70, 61, 66, 72, 61, 68, 63, 66, 69, 62, 58, 72, 66, 65, 78, 61, 75, 63, 69, 62, 71, 73, 70, 69, 63, 64, 66, 75, 67, 68, 66, 62, 70, 67, 64, 62, 61, 68, 72], "rating_category": "Needs Work", "description_rewrite": {"guest_access": "You will have access to the entire house during your stay, ensuring complete privacy.", "your_property": "This spacious 1200 sq ft home features 2 bedrooms and 2 bathrooms, comfortable dining areas, and a cozy living room equipped with a smart TV and Spectrum. Stay connected and entertained.", "listing_description": "Welcome to Harbor Happenings! Our cozy two-bedroom home, just minutes from the beach and harbor, offers the perfect getaway for up to 4 guests. Enjoy a fully stocked kitchen, relax in the living room with a smart TV, and grill on the porch. With two baths and convenient parking, everything you need for a fantastic stay awaits!", "other_details_to_note": "A leisurely 10-minute stroll will take you to Sporthaven Beach and the Port of Brookings, where you can enjoy sun and surf.", "interaction_with_guests": "I’m available for questions or assistance anytime during your stay to ensure a seamless experience."}}, "other_images": {"feedback": {"items": [{"title": "Lighting", "feedback": "Consistent lighting in your photos will make them appear more professional. Try to capture natural light when possible."}, {"title": "Angles", "feedback": "Some of your photos could benefit from a wider angle to help viewers get a better sense of space and layout."}, {"title": "Focus", "feedback": "Ensure that all your photos are in sharp focus to provide clarity and detail to potential guests."}], "summary": "Your property photos do a good job of capturing the essence of the space. While the quality is solid, consider a few tweaks to make them shine even more."}, "revisions": null, "suggestions": ["Take photos at different times of the day to capture the best lighting.", "Use a wide-angle lens to show more of the room in each photo.", "Pay attention to small details and ensure everything is tidy before shooting.", "Consider editing your photos to enhance colors and lighting.", "Consider Hiring a Professional Photographer\\n                               \\n            While your photos are a good start, hiring a professional photographer could significantly elevate the visual appeal of your listing. A pro has the experience to capture your space in the best possible light, ensuring that it looks both inviting and accurate. This investment can help differentiate your property in a competitive market, where high-quality visuals can be the deciding factor for potential guests. Professional photographers are skilled in aspects like lighting, composition, and angles, which can make your property look more spacious, appealing, and true to its real-life charm.\\n                               \\n            For Those Who Prefer DIY Photography or Are Working Within a Budget\\n                               \\n            If you prefer to handle your own photography or a professional is outside your budget, here are a few simple tips to help improve your photos:\\n                               \\n            Maximize Natural Light: Aim to shoot during the day when natural light is abundant. Open all windows, use light-colored curtains, and avoid harsh overhead lights. Natural light enhances the warmth and appeal of the space, making it feel more inviting.\\n                               \\n            Use Wide Angles: When photographing rooms, use wide-angle shots to capture the entire space. This helps give viewers a sense of the room's size and layout. Avoid tight or cluttered shots, as they can make the space feel smaller than it actually is.\\n                               \\n            Focus on Clean and Tidy Staging: Before you take the photo, clear away any clutter. Neatly arrange furniture and decor to make the space look polished and functional. The simpler and more streamlined the space appears, the more likely it is to resonate with potential guests."], "property_name": "Standard Stay Property Photos", "rating_number": 68, "expert_ratings": [75, 72, 65, 70, 68, 65, 71, 67, 69, 73, 72, 66, 68, 70, 67, 64, 66, 74, 65, 72, 68, 69, 71, 64, 70, 67, 72, 75, 68, 66, 67, 73, 69, 66, 64, 70, 71, 65, 72, 68, 74, 66, 69, 70, 68, 67, 73, 69, 72, 66, 67, 68, 71, 69, 73, 70, 67, 68, 66, 69, 72, 70, 71, 75, 68, 66, 67, 64, 71, 69, 70, 73, 68, 66, 67, 72, 70, 72, 68, 64, 69, 67, 74, 66, 68, 70, 67, 69, 71, 68, 66, 67, 72, 70, 64, 69, 71, 73, 68, 72], "rating_category": "Needs Work"}, "interior_design": {"feedback": {"items": [{"title": "Color Palette", "feedback": "Consider adding some brighter accents to make the space feel more vibrant and beachy."}, {"title": "Furniture Arrangement", "feedback": "Optimize the layout to improve flow and maximize the use of space in communal areas."}, {"title": "Decor Enhancements", "feedback": "Incorporate more local art or beach-themed decor to better reflect the coastal experience."}, {"title": "Lighting", "feedback": "Introduce layered lighting options to create a cozy atmosphere during the evenings."}, {"title": "Outdoor Space Utilization", "feedback": "Enhance the outdoor area with more comfortable seating options for relaxation and socializing."}], "summary": "Your interior design is inviting and comfortable, perfect for a beach getaway! However, there are some areas for improvement to enhance the overall aesthetic and functionality."}, "revisions": null, "suggestions": ["Incorporate brighter accent colors to create a cheerful atmosphere.", "Rearrange furniture for better flow and to utilize space effectively.", "Add beach-themed decorations to enhance the coastal vibe.", "Install layered lighting for a warm and inviting ambiance.", "Enhance outdoor seating for a more comfortable leisure space."], "property_name": "Harbor Happenings-Two bedroom home- boat parking!", "rating_number": 76, "expert_ratings": [66, 80, 75, 68, 90, 72, 78, 69, 85, 74, 76, 71, 83, 88, 65, 67, 82, 79, 77, 89, 73, 81, 66, 94, 70, 76, 75, 87, 80, 71, 73, 68, 78, 82, 86, 79, 62, 84, 63, 64, 65, 78, 69, 88, 89, 90, 77, 79, 74, 80, 85, 67, 72, 81, 76, 70, 68, 65, 66, 88, 83, 92, 87, 84, 78, 75, 79, 80, 81, 72, 86, 74, 88, 92, 63, 66, 62, 80, 87, 75, 83, 79, 81, 73, 72, 85, 88, 70, 78, 82, 80, 67, 62, 73, 65, 63, 69, 66, 82, 76, 75, 82, 84, 87, 90, 84, 89], "rating_category": "Satisfactory"}, "overall_ratings": {"feedback": {"items": [{"title": "Title", "feedback": "The title is clear and informative, yet it could evoke a stronger emotional response with a creative touch."}, {"title": "Description", "feedback": "Your property description includes essential information but lacks an engaging narrative to draw in prospective guests."}, {"title": "Images", "feedback": "While your images showcase the property fairly well, more emphasis on lighting and decor cohesion could enhance their impact."}, {"title": "Amenities", "feedback": "The amenities offered are decent but consider highlighting unique aspects to better cater to your target audience."}, {"title": "Interior Design", "feedback": "The design is comfortable and inviting for a beach stay; however, some areas can be improved with brighter colors and better-organized layouts."}], "summary": "Your listing presents some attractive features and amenities, but with enhanced descriptiveness and engaging language, it could significantly increase its appeal to potential guests."}, "revisions": null, "suggestions": ["Revise the title to make it more catchy and inviting.", "Enhance the property description with a narrative that highlights local attractions and engaging features.", "Improve the quality and diversity of images to represent all rooms and amenities effectively."], "property_name": "Harbor Happenings-Two bedroom home- boat parking!", "rating_number": 75, "expert_ratings": [61, 67, 72, 68, 69, 70, 71, 68, 74, 68, 66, 65, 65, 75, 67, 74, 70, 72, 75, 70, 74, 78, 73, 78, 75, 81, 80, 86, 82, 71, 75, 74, 76, 68, 64, 73, 70, 67, 82, 69, 65, 78, 80, 76, 69, 72, 81, 72, 70, 81, 79, 73, 84, 70, 67, 82, 79, 76, 68, 73, 70, 73, 79, 78, 83, 72, 80, 79, 81, 84, 69, 65, 69, 66, 70, 75, 78, 71, 79, 65, 72, 67, 69, 79, 72, 70, 68, 77, 72, 70, 76, 74, 67, 74, 76, 81, 70, 67, 62, 75, 76], "rating_category": "Satisfactory"}}	2025-05-04 17:04:03.934213
e0044776-c55a-41b0-a3f0-2667c4a0cd05	2025-05-07 14:39:23.841544+00	be8c1246-fae2-488f-b8db-ec78b93195c8	{"title": {"feedback": {"items": [{"title": "Clarity", "feedback": "The title clearly communicates the main features of your property, which is excellent for attracting guests."}, {"title": "Amenity Highlight", "feedback": "Including key amenities like 'dog-friendly' and 'hot tub' improves its appeal."}, {"title": "Length and Focus", "feedback": "It’s informative but could be a bit more concise to increase impact."}], "summary": "Your listing title effectively highlights the property's features, making it appealing to potential guests."}, "revisions": ["Stunning 2BR Cabin: Relax in Hot Tub with Scenic Views - Dog-Friendly!", "Your Perfect Dog-Friendly 2BR Cabin with Hot Tub & Gorgeous Views Awaits!", "Go Wild in a Dog-Friendly 2BR Cabin with Hot Tub & Patio Overlooking Nature!"], "suggestions": ["Try to streamline the title for brevity.", "Consider using more evocative language to enhance emotional appeal.", "Highlight unique characteristics to stand out more clearly."], "property_name": "2BR dog-friendly cabin with hot tub, patio & views", "rating_number": 87, "expert_ratings": [76, 85, 91, 67, 80, 88, 73, 90, 84, 66, 78, 82, 92, 75, 95, 70, 81, 89, 93, 96, 74, 72, 79, 87, 88, 64, 82, 69, 99, 94, 68, 97, 61, 83, 71, 66, 68, 79, 86, 70, 81, 67, 95, 88, 89, 76, 73, 92, 90, 84, 89, 95, 84, 97, 69, 77, 75, 88, 61, 64, 91, 72, 73, 96, 81, 66, 86, 78, 89, 67, 92, 75, 91, 85, 64, 60, 98, 71, 88, 95, 90, 96, 80, 99, 61, 63, 90, 73, 73, 83, 78, 92, 76, 81, 68, 97, 86, 74, 90, 91, 88, 76, 65, 74, 95, 68, 98, 80, 93, 87, 83, 70, 74, 96, 91], "title_rewrites": ["Charming 2BR Cabin: Dog-Friendly Retreat with Hot Tub & Scenic Views", "2BR Cozy Cabin - Dog-Friendly, Hot Tub, Patio with Scenic Views", "Dog-Friendly Escape: Spacious 2BR Cabin with Hot Tub & Beautiful Views"], "rating_category": "Good"}, "amenities": {"feedback": {"items": [{"title": "Kitchen Essentials", "feedback": "The kitchen is well-equipped but could benefit from the addition of more cookware and baking essentials."}, {"title": "Heating and Cooling", "feedback": "While you provide heating, adding air conditioning would greatly improve comfort during hot months."}, {"title": "Entertainment Options", "feedback": "Consider providing streaming services or board games to cater to guest entertainment needs."}, {"title": "Laundry Facilities", "feedback": "Providing a washer on the premises would enhance convenience for longer stays."}, {"title": "Private Outdoor Space", "feedback": "Enhancing the outdoor area with seating or decorations could provide guests with a cozy spot to relax."}], "summary": "Your amenities offer a good balance of comfort and convenience, but there are areas for improvement to enhance the guest experience."}, "revisions": null, "suggestions": ["Add a washer to the property for guest convenience.", "Consider adding air conditioning for summer months.", "Expand entertainment options with streaming services or board games.", "Enhance the outdoor space with seating.", "Stock kitchen with more cookware and baking essentials."], "property_name": "Boutique Stay", "rating_number": 65, "expert_ratings": [34, 48, 56, 22, 65, 82, 37, 77, 44, 36, 91, 66, 75, 80, 40, 52, 26, 68, 94, 71, 29, 46, 56, 38, 99, 87, 30, 57, 63, 61, 73, 53, 93, 20, 73, 34, 52, 35, 79, 21, 12, 66, 31, 18, 96, 22, 23, 84, 42, 59, 58, 62, 83, 36, 14, 93, 51, 58, 74, 10, 66, 88, 86, 43, 18, 30, 49, 69, 86, 70, 56, 46, 81, 87, 47, 91, 70, 61, 39, 69, 63, 61, 65, 80, 38, 96, 81, 27, 23, 82, 73, 93, 57, 40, 39, 58, 92, 50, 46, 81, 76, 58, 88, 27, 24, 68, 28, 72, 71, 47, 76, 93, 77, 64, 26, 32, 96], "rating_category": "Needs Work"}, "hero_image": {"feedback": {"items": [{"title": "Natural Lighting", "feedback": "The image highlights the natural lighting perfectly, creating a warm and welcoming environment that guests will find appealing."}, {"title": "Interior Decor", "feedback": "The colorful and modern decor is well-presented in the photo, enhancing the cabin’s charm and making it visually interesting."}, {"title": "Spaciousness", "feedback": "The layout shown in the image conveys a sense of spaciousness, which is inviting for families or groups traveling together."}, {"title": "View of the Outdoors", "feedback": "The visible scenic views through the windows are a great selling point, offering potential guests a glimpse of the beautiful surroundings."}], "summary": "Your cabin's hero image beautifully captures the cozy and inviting atmosphere, accentuated by natural lighting and scenic views. This image is likely to appeal to potential guests looking for a relaxing retreat."}, "revisions": null, "suggestions": ["Include a view of the hot tub area to emphasize this feature.", "Add a cozy nighttime image with lighting to show evening ambiance.", "Highlight any unique decor pieces or aesthetics that set your cabin apart."], "property_name": "2BR dog-friendly cabin with hot tub, patio & views", "rating_number": 85, "expert_ratings": [85, 82, 86, 89, 83, 84, 87, 88, 86, 85, 84, 87, 86, 82, 89, 84, 87, 83, 88, 85, 85, 88, 87, 86, 82, 84, 86, 85, 87, 88, 86, 85, 84, 83, 89, 86, 87, 88, 84, 82, 85, 87, 86, 84, 85, 88, 89, 86, 84, 83, 85, 86, 85, 84, 87, 88, 86, 82, 87, 85, 89, 84, 85, 86, 87, 85, 88, 82, 84, 86, 85, 87, 88, 86, 83, 85, 86, 84, 88, 85, 87, 86, 89, 84, 85, 86, 88, 87, 86, 84, 83, 85, 88, 86, 85, 83, 87, 84, 86, 85], "rating_category": "Good"}, "description": {"feedback": {"items": [{"title": "Highlight Unique Features", "feedback": "Consider elaborating more on the unique features of the cabin, such as its dog-friendly aspect and specific amenities that would appeal to families or pet owners."}, {"title": "Optimize for Keywords", "feedback": "Integrate keywords that travelers might search for, like 'scenic views,' 'family-friendly,' or 'coastal getaway' to enhance visibility."}, {"title": "Clarify Local Attractions", "feedback": "While you mention parks and trails, offering a little more detail about popular activities or nearby attractions can help attract more interest."}, {"title": "Add Guest Experience", "feedback": "Including potential experiences, such as nearby restaurants or local hotspots, would provide valuable context for guests."}, {"title": "Shorten and Focus", "feedback": "Some areas could be more succinct; consider focusing on the most enticing aspects of the cabin to keep readers engaged."}], "summary": "The description of your cabin is inviting but could use a bit more detail to captivate potential guests."}, "revisions": null, "suggestions": ["Emphasize the dog-friendly nature of the property as a key feature.", "Add more details about local dining options and activities.", "Consider shortening some paragraphs to maintain reader interest.", "Include testimonials or guest experiences to create emotional appeal.", "Incorporate visually appealing language to enhance imagery."], "property_name": "Sea Wolf", "rating_number": 72, "expert_ratings": [83, 53, 67, 62, 56, 90, 78, 45, 67, 75, 80, 61, 58, 89, 59, 55, 73, 64, 49, 88, 82, 66, 92, 50, 60, 70, 66, 71, 52, 58, 84, 48, 63, 87, 47, 88, 55, 69, 72, 81, 39, 56, 75, 71, 82, 49, 62, 88, 63, 89, 90, 50, 55, 62, 66, 74, 72, 64, 51, 77, 57, 62, 46, 87, 90, 80, 66, 76, 68, 54, 68, 46, 59, 54, 64, 63, 46, 74, 56, 46, 61, 90, 78, 67, 61, 92, 77, 81, 72, 84, 81, 87, 85, 88, 69, 70, 73, 82, 74, 89, 61, 46, 83, 88], "rating_category": "Satisfactory", "description_rewrite": {"guest_access": "Guests will have full access to the entire cabin, including the kitchen, living areas, and patios. Enjoy free parking for two vehicles and that experience of a peaceful getaway.", "your_property": "This delightful cabin offers a spacious loft, inviting coastal decor, and a modern kitchen for effortless meal prep. Unwind with movie nights in plush seating or enjoy the dual access to your private deck and hot tub after a day of exploration.", "listing_description": "Escape to the Sea Wolf, a charming 2BR dog-friendly cabin featuring stunning views and a relaxing hot tub. Perfectly located near outdoor adventures on the Oregon coast, this cozy retreat boasts a sunlit interior, a well-stocked kitchen, and ample outdoor space for morning coffee or evening BBQs. Create lasting memories while hiking picturesque trails, soaking in the lush scenery, and enjoying quality time with your furry friends.", "other_details_to_note": "Please remember that quiet hours are between 10 PM and 8 AM. Dogs under 50 lbs are welcome, and we encourage adherence to the good neighbor policy.", "interaction_with_guests": "You can reach out anytime. I’m here to ensure you have a fantastic stay and will gladly share local tips to enhance your time in the area."}}, "other_images": {"feedback": {"items": [{"title": "Visual Appeal", "feedback": "The images are visually stunning and capture the attention with their brightness and clarity."}, {"title": "Composition", "feedback": "The composition is well thought out, showcasing the space in a way that is both appealing and informative."}, {"title": "Lighting", "feedback": "The use of natural and artificial lighting enhances the space beautifully, making it look warm and welcoming."}], "summary": "Your photos are bright, inviting, and clearly depict the charm of your property."}, "revisions": null, "suggestions": ["Consider adding close-up shots of unique decor items to emphasize the boutique aspect.", "Include images at different times of day to show off natural lighting changes.", "Incorporate lifestyle shots to create a more emotional connection with potential guests."], "property_name": "Boutique Stay", "rating_number": 87, "expert_ratings": [92, 85, 88, 90, 87, 89, 91, 84, 82, 86, 94, 83, 85, 90, 87, 88, 86, 93, 84, 89, 87, 85, 86, 93, 91, 90, 88, 86, 92, 89, 85, 87, 94, 90, 86, 92, 88, 84, 89, 87, 91, 83, 90, 88, 85, 92, 84, 85, 85, 88, 92, 86, 90, 89, 84, 87, 88, 91, 86, 85, 87, 94, 90, 93, 92, 91, 88, 87, 85, 89, 92, 86, 90, 93, 86, 84, 92, 91, 88, 90, 87, 85, 82, 89, 88, 92, 94, 86, 90, 88, 87, 85, 89, 92, 86, 88, 91, 90, 84, 89], "rating_category": "Good"}, "interior_design": {"feedback": {"items": [{"title": "Cozy and Inviting Aesthetic", "feedback": "You have beautifully captured a cozy atmosphere with your coastal decor, which is both welcoming and comforting."}, {"title": "Thoughtful Amenities", "feedback": "The amenities, such as the hot tub and outdoor patio, add an extra layer of comfort and relaxation for guests."}, {"title": "Functional Layout", "feedback": "The layout maximizes space and encourages a family-friendly environment, perfect for gatherings."}, {"title": "Modern Kitchen Features", "feedback": "Your kitchen design is modern and practical, encouraging guests to cook and dine in."}, {"title": "Beautiful Natural Light", "feedback": "The abundance of natural light makes the space feel bright and airy."}], "summary": "The cabin offers a charming and inviting atmosphere that is sure to make you feel at home. The coastal decor truly enhances the overall vibe, making it perfect for relaxing after a day of adventures."}, "revisions": null, "suggestions": ["Consider adding more local artwork or decor to enhance the coastal theme.", "Introduce a color palette that complements the natural surroundings for a cohesive look.", "Invest in high-quality bedding or decorative pillows for added comfort and style."], "property_name": "2BR dog-friendly cabin with hot tub, patio & views", "rating_number": 74, "expert_ratings": [45, 62, 60, 57, 67, 68, 52, 75, 81, 82, 78, 65, 83, 81, 76, 73, 77, 66, 58, 70, 74, 78, 80, 62, 59, 85, 65, 45, 68, 69, 54, 53, 50, 46, 62, 64, 58, 67, 69, 71, 55, 58, 79, 75, 64, 71, 70, 77, 65, 44, 62, 84, 68, 67, 66, 65, 64, 63, 67, 63, 71, 78, 55, 48, 69, 66, 70, 80, 68, 78, 76, 74, 81, 82, 83, 54, 60, 78, 73, 88, 89, 90, 74, 72, 70, 69, 67, 45, 83, 68, 78, 79, 81, 77, 76, 55, 81, 84, 73, 72, 88, 85, 90, 89, 58, 76, 63, 65], "rating_category": "Satisfactory"}, "overall_ratings": {"feedback": {"items": [{"title": "Clarity", "feedback": "The title clearly communicates the main features of your property, which is excellent for attracting guests."}, {"title": "Amenity Highlight", "feedback": "Including key amenities like 'dog-friendly' and 'hot tub' improves its appeal."}, {"title": "Length and Focus", "feedback": "It’s informative but could be a bit more concise to increase impact."}], "summary": "Your listing title effectively highlights the property's features, making it appealing to potential guests."}, "revisions": ["Stunning 2BR Cabin: Relax in Hot Tub with Scenic Views - Dog-Friendly!", "Your Perfect Dog-Friendly 2BR Cabin with Hot Tub & Gorgeous Views Awaits!", "Go Wild in a Dog-Friendly 2BR Cabin with Hot Tub & Patio Overlooking Nature!"], "suggestions": ["Try to streamline the title for brevity.", "Consider using more evocative language to enhance emotional appeal.", "Highlight unique characteristics to stand out more clearly."], "property_name": "2BR dog-friendly cabin with hot tub, patio & views", "rating_number": 79, "expert_ratings": [76, 85, 91, 67, 80, 88, 73, 90, 84, 66, 78, 82, 92, 75, 95, 70, 81, 89, 93, 96, 74, 72, 79, 87, 88, 64, 82, 69, 99, 94, 68, 97, 61, 83, 71, 66, 68, 79, 86, 70, 81, 67, 95, 88, 89, 76, 73, 92, 90, 84, 89, 95, 84, 97, 69, 77, 75, 88, 61, 64, 91, 72, 73, 96, 81, 66, 86, 78, 89, 67, 92, 75, 91, 85, 64, 60, 98, 71, 88, 95, 90, 96, 80, 99, 61, 63, 90, 73, 73, 83, 78, 92, 76, 81, 68, 97, 86, 74, 90, 91, 88, 76, 65, 74, 95, 68, 98, 80, 93, 87, 83, 70, 74, 96, 91], "rating_category": "Satisfactory"}}	2025-05-07 14:39:23.841544
c8a3ae41-1967-42f6-8239-c509c28b8f61	2025-05-11 02:23:05.512633+00	730e3382-53cd-4f9a-ba2c-5e6074cf0c25	{"title": {"feedback": {"items": [{"title": "Feature Emphasis", "feedback": "You've done well to highlight the hot tub and pool access, which are attractive amenities."}, {"title": "Engagement Factor", "feedback": "Consider adding a hint of adventure or comfort to make it more appealing."}, {"title": "Clarity", "feedback": "The title is clear, but could be more concise to improve readability."}], "summary": "The title effectively highlights key features of the property, but could benefit from a more engaging description."}, "revisions": ["Cozy Cabin Near Attractions: Enjoy Hot Tub and Pool Access!", "Relaxing Chalet with Hot Tub & Exclusive Pool Access - Action Awaits!", "Charming Retreat: Hot Tub & Pool Access Just Minutes from Fun!"], "suggestions": ["Incorporate an engaging phrase to evoke a sense of adventure.", "Highlight specific attractions nearby to draw interest.", "Make the title more concise while retaining essential info."], "property_name": "Cabin | hot tub | pool access | minutes to fun!", "rating_number": 78, "expert_ratings": [93, 75, 88, 82, 76, 80, 70, 90, 85, 78, 79, 72, 68, 81, 77, 86, 83, 89, 83, 77, 74, 92, 76, 88, 69, 71, 84, 82, 92, 84, 78, 93, 79, 73, 91, 70, 79, 68, 85, 76, 88, 90, 72, 82, 73, 91, 84, 83, 77, 89, 76, 82, 75, 71, 89, 74, 92, 88, 78, 81, 83, 70, 82, 86, 92, 81, 80, 78, 87, 85, 70, 74, 75, 78, 76, 85, 88, 90, 91, 73, 82, 88, 90, 83, 74, 72, 78, 75, 89, 88, 82, 93, 90, 78, 91, 70, 89, 76, 77, 82, 81, 76, 86, 70, 87, 83, 78, 91, 74, 88, 80], "title_rewrites": ["Charming Cabin with Hot Tub & Pool Access - Minutes from Adventure!", "Cozy Cabin Retreat: Enjoy Hot Tub, Pool, & Attractions Nearby!", "Relaxing Cabin Getaway: Hot Tub, Pool Access & Minutes to Fun!"], "rating_category": "Satisfactory"}, "amenities": {"feedback": {"items": [{"title": "Comprehensive Kitchen Facilities", "feedback": "Your kitchen amenities, including a dishwasher and cooking basics, make it easy for guests to prepare their own meals and enhances their overall experience."}, {"title": "Family-friendly Features", "feedback": "Including a crib, high chair, and children's dinnerware is a thoughtful touch that sets your property apart for families traveling with young children."}, {"title": "Safety First", "feedback": "The presence of smoke and carbon monoxide alarms, along with fire extinguishers, showcases your commitment to guest safety, which is a key aspect for many travelers."}, {"title": "Entertainment Options", "feedback": "With arcade games and a TV, guests have plenty of entertainment options to enjoy during their stay, appealing to a wide range of preferences."}, {"title": "Outdoor Amenities", "feedback": "The fire pit and outdoor dining area enhance the outdoor experience for guests, providing a great space for relaxation."}], "summary": "Your Premium Stay offers an impressive array of amenities that ensure a comfortable and enjoyable visit. Guests can appreciate the attention to detail in providing essentials for their needs."}, "revisions": null, "suggestions": ["Consider adding more eco-friendly toiletries for the bathroom amenities.", "Explore options for providing more outdoor activities or amenities to attract guests looking for adventure.", "Look into offering unique local experiences or partnerships with nearby attractions to enhance guest stays."], "property_name": "Premium Stay", "rating_number": 88, "expert_ratings": [84, 76, 93, 89, 85, 74, 71, 95, 88, 92, 82, 69, 78, 87, 75, 68, 90, 77, 94, 83, 72, 96, 91, 81, 98, 97, 73, 86, 80, 79, 66, 64, 93, 57, 53, 19, 48, 90, 65, 76, 82, 84, 53, 89, 73, 79, 88, 80, 92, 87, 48, 56, 66, 50, 49, 50, 53, 76, 71, 94, 95, 81, 84, 73, 67, 60, 58, 59, 86, 77, 63, 75, 50, 74, 90, 67, 79, 70, 92, 67, 99, 79, 87, 75, 98, 66, 88, 85, 90, 57, 74, 64, 89, 89, 89, 69, 56, 74, 53, 90], "rating_category": "Good"}, "hero_image": {"feedback": {"items": [{"title": "Inviting Ambiance", "feedback": "Your hero image captures a warm and inviting ambiance with the wood interior and fireplace, setting the perfect tone for a cozy getaway."}, {"title": "Rustic Aesthetic", "feedback": "The image emphasizes the rustic aesthetic of the space, which will appeal to those looking for an authentic cabin experience."}, {"title": "Modern Comforts", "feedback": "The presence of modern furnishings alongside classic cabin architecture gives a simultaneous sense of comfort and tradition."}], "summary": "The hero image beautifully showcases the cabin's cozy and inviting interior, highlighting the rustic charm with modern amenities. The warm wood tones and fireplace create a welcoming ambiance that aligns perfectly with the description of a mountain retreat."}, "revisions": null, "suggestions": ["Add exterior shots showing the entire cabin to enhance context.", "Include images of outdoor amenities like the hot tub or fire pit.", "Showcase nearby attractions or views from the cabin.", "Highlight the kitchen area or other living spaces.", "Consider evening lighting shots to enhance cozy appeal."], "property_name": "Big Bear Bend", "rating_number": 89, "expert_ratings": [85, 89, 90, 91, 88, 80, 86, 87, 89, 92, 84, 88, 90, 90, 88, 89, 87, 92, 89, 86, 87, 88, 93, 91, 89, 88, 87, 86, 91, 84, 89, 88, 90, 89, 85, 87, 88, 89, 88, 90, 87, 86, 86, 89, 92, 85, 90, 91, 88, 92, 89, 87, 84, 90, 91, 90, 89, 88, 86, 87, 85, 89, 85, 88, 92, 89, 90, 90, 88, 87, 86, 87, 89, 85, 90, 89, 88, 90, 84, 88, 87, 89, 85, 88, 89, 90, 88, 89, 87, 90, 88, 87, 88, 92, 91, 88, 89, 87, 88, 89], "rating_category": "Good"}, "description": {"feedback": {"items": [{"title": "Streamline the Description", "feedback": "Consider trimming down some sections to maintain the reader's interest."}, {"title": "Optimize Formatting", "feedback": "Using bullet points can enhance readability and highlight key features."}, {"title": "Highlight Unique Selling Points", "feedback": "Make sure to emphasize unique amenities such as the hot tub and proximity to attractions."}, {"title": "Craft a Compelling Title", "feedback": "A clear, catchy title can draw more attention to your listing."}], "summary": "Your listing has a lot of appealing features and provides useful information about the cabin and its location. However, it could benefit from improved clarity and conciseness."}, "revisions": null, "suggestions": ["Reduce the overall word count for better engagement.", "Utilize bullet points for amenity listings and highlights.", "Highlight standout features, such as the hot tub and game room, more prominently.", "Simplify the title to effectively convey main features.", "Enhance image quality and variety for higher visual appeal."], "property_name": "Big Bear Bend", "rating_number": 68, "expert_ratings": [73, 45, 68, 62, 37, 56, 74, 88, 66, 54, 66, 90, 68, 65, 56, 37, 87, 55, 72, 59, 27, 67, 86, 64, 57, 70, 77, 82, 57, 39, 53, 69, 43, 89, 29, 46, 84, 49, 55, 82, 67, 74, 69, 40, 33, 89, 27, 56, 58, 33, 66, 81, 45, 30, 38, 85, 55, 92, 62, 75, 81, 52, 97, 52, 67, 77, 92, 67, 84, 66, 75, 55, 49, 60, 72, 70, 81, 64, 49, 88, 87, 64, 37, 54, 64, 53, 43, 65, 53, 66, 68, 43, 51, 54, 84, 73, 59, 62, 72, 66, 70, 65, 38, 61, 48, 76, 56], "rating_category": "Needs Work", "description_rewrite": {"guest_access": "You will have complete access to the entire cabin and all community amenities, including three clubhouses with pools and more.", "your_property": "Escape to this lovely chalet in the heart of Chalet Village! Relax on the wrap-around porch with a 4-person hot tub or gather around the fireplace inside. The open kitchen and cozy living area are ready for family fun.", "listing_description": "Experience the charm of Big Bear Bend! Located just minutes from Gatlinburg and Pigeon Forge, this cozy cabin offers a hot tub, an indoor fireplace, and seasonal pool access. Perfect for a mountain getaway!", "other_details_to_note": "Make use of the community's outdoor pools and tennis courts, with the hot tub available year-round!", "interaction_with_guests": "Enjoy your stay with complete privacy! I'm available via messaging for assistance or local tips whenever you need."}}, "other_images": {"feedback": {"items": [{"title": "Wood Interior", "feedback": "Your use of natural wood tones throughout the property sets a warm, inviting tone. It adds a distinctive character that's both rustic and modern."}, {"title": "Lighting", "feedback": "The lighting is well-executed, highlighting key features of the space and creating a cozy ambiance that's appealing to potential guests."}, {"title": "Room Layout", "feedback": "The layout captures the spaciousness of the property effectively, making it look both comfortable and practical for guests."}], "summary": "You've done a great job capturing the warmth and charm of this premium property. The woodwork and lighting especially stand out, enhancing the cozy yet modern vibe of the space."}, "revisions": null, "suggestions": ["Consider enhancing the exterior images with brighter lighting or warmer tones.", "Showcase any unique property features or views that might entice guests further.", "Add some lifestyle shots to give potential guests a feel for the atmosphere and possible experiences.", "Maximize the use of angles to show more comprehensive views of each space.", "Improve the variety of shots by including more perspectives of key areas.", "Consider Hiring a Professional Photographer\\n                               \\n            While your photos are a good start, hiring a professional photographer could significantly elevate the visual appeal of your listing. A pro has the experience to capture your space in the best possible light, ensuring that it looks both inviting and accurate. This investment can help differentiate your property in a competitive market, where high-quality visuals can be the deciding factor for potential guests. Professional photographers are skilled in aspects like lighting, composition, and angles, which can make your property look more spacious, appealing, and true to its real-life charm.\\n                               \\n            For Those Who Prefer DIY Photography or Are Working Within a Budget\\n                               \\n            If you prefer to handle your own photography or a professional is outside your budget, here are a few simple tips to help improve your photos:\\n                               \\n            Maximize Natural Light: Aim to shoot during the day when natural light is abundant. Open all windows, use light-colored curtains, and avoid harsh overhead lights. Natural light enhances the warmth and appeal of the space, making it feel more inviting.\\n                               \\n            Use Wide Angles: When photographing rooms, use wide-angle shots to capture the entire space. This helps give viewers a sense of the room's size and layout. Avoid tight or cluttered shots, as they can make the space feel smaller than it actually is.\\n                               \\n            Focus on Clean and Tidy Staging: Before you take the photo, clear away any clutter. Neatly arrange furniture and decor to make the space look polished and functional. The simpler and more streamlined the space appears, the more likely it is to resonate with potential guests."], "property_name": "Premium Stay Property", "rating_number": 85, "expert_ratings": [88, 87, 85, 84, 83, 88, 89, 86, 85, 84, 82, 83, 88, 87, 85, 89, 84, 83, 86, 87, 84, 85, 82, 88, 89, 82, 83, 84, 85, 90, 86, 87, 83, 82, 89, 87, 88, 85, 84, 88, 87, 86, 89, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 80, 81, 82, 83, 84, 82, 83, 84, 85, 86, 88, 89, 90, 80, 87, 85, 83, 84, 87, 88, 89, 80, 81, 82, 84, 85, 86, 87, 88, 89, 90, 81, 85, 86, 87, 88, 89, 90, 85, 86, 84, 87, 82, 83, 85, 86, 84], "rating_category": "Good"}, "interior_design": {"feedback": {"items": [{"title": "Warm and Rustic Decor", "feedback": "The warm wood finishes and rustic furniture enhance the cozy feel of the cabin."}, {"title": "Functional Layout", "feedback": "The open-concept kitchen and living area allow for easy socializing among guests."}, {"title": "Comfortable Bedrooms", "feedback": "The bedrooms are well-appointed and provide a restful retreat."}, {"title": "Hot Tub and Fire Pit", "feedback": "The inclusion of the hot tub and fire pit adds to the overall appeal and relaxation options."}, {"title": "Attention to Detail", "feedback": "Thoughtful touches like arcade games and Roku TVs cater to guests' entertainment needs."}], "summary": "The interior design of Big Bear Bend creates a cozy and inviting atmosphere, perfect for a mountain getaway."}, "revisions": null, "suggestions": ["Consider adding more decorative elements to enhance the ambiance.", "Incorporate softer lighting options for a more relaxing atmosphere.", "Upgrade the furniture to make it more stylish and comfortable."], "property_name": "Big Bear Bend", "rating_number": 80, "expert_ratings": [9, 25, 53, 61, 32, 47, 68, 52, 77, 38, 24, 22, 39, 30, 49, 41, 72, 19, 92, 14, 48, 76, 50, 69, 80, 58, 40, 13, 34, 31, 21, 27, 14, 57, 60, 94, 65, 44, 29, 23, 25, 33, 66, 45, 93, 20, 88, 90, 56, 37, 1, 70, 43, 82, 62, 78, 42, 97, 61, 98, 55, 7, 75, 54, 18, 26, 63, 46, 17, 83, 74, 36, 71, 10, 4, 2, 16, 9, 87, 81, 11, 35, 15, 12, 76, 22, 39, 68, 50, 20, 88, 73, 72, 99, 19, 86, 8, 53, 59, 91, 3, 85, 64, 54, 77, 40, 61, 83, 78, 11], "rating_category": "Satisfactory"}, "overall_ratings": {"feedback": {"items": [{"title": "Feature Emphasis", "feedback": "You've done well to highlight the hot tub and pool access, which are attractive amenities."}, {"title": "Engagement Factor", "feedback": "Consider adding a hint of adventure or comfort to make it more appealing."}, {"title": "Clarity", "feedback": "The title is clear, but could be more concise to improve readability."}], "summary": "The title effectively highlights key features of the property, but could benefit from a more engaging description."}, "revisions": ["Cozy Cabin Near Attractions: Enjoy Hot Tub and Pool Access!", "Relaxing Chalet with Hot Tub & Exclusive Pool Access - Action Awaits!", "Charming Retreat: Hot Tub & Pool Access Just Minutes from Fun!"], "suggestions": ["Incorporate an engaging phrase to evoke a sense of adventure.", "Highlight specific attractions nearby to draw interest.", "Make the title more concise while retaining essential info."], "property_name": "Cabin | hot tub | pool access | minutes to fun!", "rating_number": 82, "expert_ratings": [93, 75, 88, 82, 76, 80, 70, 90, 85, 78, 79, 72, 68, 81, 77, 86, 83, 89, 83, 77, 74, 92, 76, 88, 69, 71, 84, 82, 92, 84, 78, 93, 79, 73, 91, 70, 79, 68, 85, 76, 88, 90, 72, 82, 73, 91, 84, 83, 77, 89, 76, 82, 75, 71, 89, 74, 92, 88, 78, 81, 83, 70, 82, 86, 92, 81, 80, 78, 87, 85, 70, 74, 75, 78, 76, 85, 88, 90, 91, 73, 82, 88, 90, 83, 74, 72, 78, 75, 89, 88, 82, 93, 90, 78, 91, 70, 89, 76, 77, 82, 81, 76, 86, 70, 87, 83, 78, 91, 74, 88, 80], "rating_category": "Good"}}	2025-05-11 02:23:05.512633
0bda7f84-4381-4535-bca6-7f062a31164c	2025-05-10 19:24:46.496272+00	4e3d6739-a175-4670-b210-3165bd6419ac	{"title": {"feedback": {"items": [{"title": "Family-Friendly", "feedback": "Your title does a great job of addressing families specifically, which is a big plus."}, {"title": "Key Features", "feedback": "Highlighting 'Sports Court', 'Large Pool', and 'Spa' directly targets desirable features for many guests."}, {"title": "Evocative Language", "feedback": "Using 'Oasis' brings to mind relaxation, but further unique identifiers might enhance appeal."}], "summary": "The title effectively encourages families with its focus on amenities, but it can be slightly improved for clarity and uniqueness."}, "revisions": ["Family-Friendly Oasis: Pools, Sports Courts & Fun Details", "Fun & Relaxation Await: Sports Court & Spa in Clearwater", "Clearwater Family Retreat: Ideal for Leisure & Play"], "suggestions": ["Add the specific location to enhance discoverability.", "Consider condensing the title to maintain impact while being concise.", "Incorporate unique selling points or themes of your property."], "property_name": "Family-Friendly Oasis: Sports Court~Large Pool~Spa", "rating_number": 82, "expert_ratings": [85, 78, 87, 76, 82, 93, 68, 75, 80, 88, 74, 91, 79, 65, 88, 70, 86, 90, 73, 82, 84, 87, 69, 88, 74, 81, 77, 76, 66, 88, 75, 68, 81, 69, 92, 89, 83, 82, 90, 92, 68, 76, 91, 59, 73, 78, 88, 74, 81, 77, 80, 70, 84, 67, 81, 72, 99, 90, 65, 70, 83, 88, 65, 75, 66, 88, 76, 82, 69, 72, 85, 87, 69, 85, 81, 67, 63, 85, 78, 91, 80, 95, 67, 83, 72, 89, 91, 60, 81, 82, 66, 75, 84, 80, 77, 93, 89, 78, 85, 91, 78, 74, 85, 83, 66, 64, 89, 88, 73, 82, 89, 78, 72, 64, 92, 81, 69, 74, 88, 85, 77, 66, 88], "title_rewrites": ["Ultimate Family Retreat with Sports & Relaxation", "Luxury Family Oasis: Pool, Spa, and Sports Court", "Family-Centric Getaway: Pool, Spa & Courts Await You"], "rating_category": "Good"}, "amenities": {"feedback": {"items": [{"title": "Family-Friendly Features", "feedback": "You've provided excellent amenities for families, such as a crib and high chair. Further enhancing the outdoor playground could make your property more appealing to families."}, {"title": "Entertainment Options", "feedback": "Including entertainment options like pool and arcade games is a great touch. However, consider expanding your collection of books and games to cater to a broader audience."}, {"title": "Kitchen Amenities", "feedback": "The kitchen is well-equipped, but adding more cooking utensils or high-end appliances could attract even more guests who enjoy cooking."}, {"title": "Safety Features", "feedback": "Your safety measures are commendable. Consider enhancing signage for your safety equipment and ensuring clearer instructions for emergency procedures."}, {"title": "Outdoor Space", "feedback": "The outdoor area is inviting, yet think about including some additional seating or landscaping to create a more relaxing environment."}], "summary": "You've done a fantastic job with your amenities, which cater to a wide range of guests while ensuring a luxury experience. However, there are some areas where enhancements can be made to elevate your offering further."}, "revisions": null, "suggestions": ["Enhance the outdoor playground with more age-appropriate structures.", "Expand the collection of books and board games available to guests.", "Consider adding more high-end kitchen appliances or gourmet cooking utensils.", "Improve the internet speed for a better remote working experience.", "Add more comfort items like throws or cushions for the outdoor furniture."], "property_name": "Luxury Stay", "rating_number": 85, "expert_ratings": [45, 67, 88, 76, 55, 82, 91, 78, 69, 55, 72, 88, 66, 79, 93, 54, 63, 86, 77, 74, 68, 82, 87, 90, 66, 71, 55, 45, 73, 58, 66, 78, 70, 56, 75, 84, 60, 81, 79, 66, 57, 71, 92, 81, 70, 67, 75, 88, 87, 62, 74, 72, 58, 85, 63, 49, 65, 48, 86, 88, 84, 59, 91, 82, 60, 64, 51, 78, 52, 72, 69, 55, 80, 90, 55, 53, 82, 68, 66, 61, 48, 74, 45, 60, 79, 72, 32, 77, 59, 94, 50, 40, 66, 35, 49, 55, 90, 75, 87, 44, 78, 83, 69, 50, 68, 61, 65, 87, 99, 92, 66, 45, 76, 55, 86, 54, 83, 61, 49], "rating_category": "Good"}, "hero_image": {"feedback": {"items": [{"title": "Vivid Aerial View", "feedback": "The aerial shot beautifully captures the spacious layout, highlighting both the sports court and pool area. This perspective is unique and draws the eye instantly."}, {"title": "Showcases Key Amenities", "feedback": "The image effectively showcases the main attractions like the pool and sports court, making it clear what guests can expect."}, {"title": "Bright and Inviting", "feedback": "The colors are vibrant, creating an inviting and cheerful tone that aligns with a family-friendly vibe."}], "summary": "Your hero image is a vibrant depiction of your property's best features, drawing in potential guests with a promise of fun and relaxation."}, "revisions": null, "suggestions": ["Consider adding a view of the surrounding landscape to highlight the location's tranquility.", "Include a few more close-up shots of the amenities to give a better sense of the space.", "Show the pool area in use during the daytime to emphasize its size and family appeal.", "Add images featuring nighttime lighting to create a different, cozy mood.", "Incorporate a few lifestyle images with families or groups enjoying the amenities."], "property_name": "Family-Friendly Oasis: Sports Court~Large Pool~Spa", "rating_number": 85, "expert_ratings": [79, 86, 90, 88, 84, 82, 83, 87, 91, 89, 85, 78, 93, 81, 84, 88, 92, 80, 85, 83, 87, 86, 90, 81, 84, 86, 89, 88, 82, 87, 83, 91, 85, 90, 84, 83, 88, 86, 85, 87, 82, 93, 88, 84, 89, 80, 87, 86, 85, 89, 90, 82, 84, 83, 85, 86, 90, 92, 89, 88, 83, 86, 85, 80, 91, 89, 77, 83, 90, 84, 88, 93, 86, 85, 84, 91, 82, 87, 83, 92, 85, 86, 88, 87, 83, 81, 89, 88, 84, 93, 79, 82, 84, 87, 90, 91, 89, 83, 88, 85], "rating_category": "Good"}, "description": {"feedback": {"items": [{"title": "Highlight Unique Amenities", "feedback": "Consider emphasizing the unique aspects of your property, like the game room or the 3-hole putt-putt course, in the opening lines."}, {"title": "Shorten the Description", "feedback": "The description is quite lengthy; condensing some sections would make it easier for potential guests to scan quickly."}, {"title": "Add Local Attractions", "feedback": "Some insights into local attractions or restaurants would encourage guests to explore the area."}, {"title": "Pricing Strategy Clarity", "feedback": "You mention discounts but don’t clarify what they entail—be transparent about pricing or offer seasonal deals."}, {"title": "Visuals and Videos", "feedback": "Consider adding a virtual tour or video of the property showcase for better engagement."}], "summary": "You have a fantastic property that appeals to families and groups looking for a fun and luxurious experience. However, a few tweaks could enhance its marketability."}, "revisions": null, "suggestions": ["Shorten the listing description to highlight key features more effectively.", "Include more local attraction recommendations to entice guests.", "Provide clearer information about discounts or pricing strategies.", "Add a virtual tour or video to enhance visual appeal.", "Emphasize your property's unique selling points in the opening lines."], "property_name": "Clearwater Stay and Play Resort", "rating_number": 87, "expert_ratings": [18, 79, 32, 54, 55, 86, 76, 71, 91, 43, 12, 56, 25, 82, 60, 95, 20, 33, 87, 40, 78, 61, 46, 26, 72, 23, 84, 37, 30, 49, 31, 62, 34, 64, 77, 69, 73, 53, 83, 10, 24, 88, 96, 63, 66, 14, 75, 42, 15, 9, 19, 92, 35, 45, 57, 38, 39, 97, 74, 3, 4, 8, 68, 11, 50, 6, 65, 2, 98, 67, 80, 52, 22, 17, 58, 81, 13, 29, 93, 90, 5, 72, 1, 70, 41, 94, 44, 14, 48, 3, 34, 54], "rating_category": "Good", "description_rewrite": {"guest_access": "Guests have access to the entire home except for two locked closets; one in the laundry room and one in the primary suite bathroom.", "your_property": "Indulge in our luxurious 3,000 sq. ft. home, featuring 5 spacious bedrooms and 3.5 bathrooms. Enjoy comfort and entertainment with an impressive game room, private courts, and ample outdoor space for leisure activities or alfresco dining. Experience the ultimate vacation enjoyment.", "listing_description": "Welcome to Clearwater Stay and Play Resort, a stunning family-friendly oasis with luxury amenities! Perfectly situated in a tranquil cul-de-sac, our *BRAND NEW* property accommodates up to 18 guests and features a pickleball/basketball court, game room, large heated pool, hot tub, and more! Minutes from the vibrant beaches and local attractions, it's the ideal getaway for fun, relaxation, and unforgettable memories!", "other_details_to_note": "Check-in is at 4 pm and check-out is by 10 am. We provide a pack and play, high chair, and stroller for the little ones.", "interaction_with_guests": "We strive for your ultimate enjoyment! I’m available for your questions or assistance throughout your stay, ensuring a smooth vacation experience."}}, "other_images": {"feedback": {"items": [{"title": "Vibrant and Inviting", "feedback": "The photos exude vibrancy and welcoming vibes, which are essential for enticing prospective guests."}, {"title": "High-Quality Imagery", "feedback": "The image quality is top-notch, showcasing every detail in a clear and stunning manner."}, {"title": "Comprehensive Representation", "feedback": "You've managed to capture various aspects of the property, giving a well-rounded view that guests will appreciate."}], "summary": "Your property's photos brilliantly capture the luxury feel of the stay, highlighting the impressive outdoor amenities and vibrant styling."}, "revisions": null, "suggestions": ["Consider adding a few more interior shots to balance the outdoor focus.", "Showcase unique luxury features, like any high-end appliances or exclusive decor.", "Include some evening shots to capture the ambiance after sunset.", "Emphasize the spaciousness of the property in a couple of images."], "property_name": "Luxury Stay with Pool and Recreation Area", "rating_number": 90, "expert_ratings": [95, 87, 89, 92, 90, 91, 88, 96, 85, 89, 94, 93, 87, 91, 88, 92, 90, 89, 95, 86, 87, 90, 89, 93, 92, 89, 88, 95, 91, 94, 87, 92, 90, 91, 93, 89, 88, 90, 94, 86, 87, 92, 89, 88, 93, 91, 90, 87, 94, 89, 91, 88, 90, 90, 93, 91, 92, 95, 86, 89, 87, 88, 95, 94, 90, 93, 91, 87, 93, 89, 91, 92, 88, 90, 86, 89, 94, 91, 89, 88, 93, 92, 86, 87, 89, 95, 90, 88, 90, 94, 91, 89, 92, 93, 95, 87, 90, 89, 86, 88], "rating_category": "Good"}, "interior_design": {"feedback": {"items": [{"title": "Spacious Layout", "feedback": "The spacious design accommodates large families effectively, ensuring everyone has room to relax."}, {"title": "Modern Amenities", "feedback": "The incorporation of modern amenities like the game room and smart TVs enhances entertainment options for guests."}, {"title": "Family Focus", "feedback": "Thoughtful inclusions like the playhouse and bunk room show attention to family needs, making it a welcoming space for kids."}, {"title": "Bright and Inviting", "feedback": "The natural light and outdoor connections through large windows add to the appeal and create a pleasant atmosphere."}, {"title": "Well-Designed Kitchen", "feedback": "The kitchen’s layout promotes efficiency, ideal for family cooking and gatherings."}], "summary": "Your property's interior design is impressive, providing a comfortable and inviting environment for families and larger groups."}, "revisions": null, "suggestions": ["Consider adding more personal touches or local artwork to enhance the decor.", "Ensure consistent color themes throughout all rooms for a more cohesive feel.", "Make the outdoor areas more enticing with additional lighting or landscaping features."], "property_name": "Family-Friendly Oasis: Sports Court~Large Pool~Spa", "rating_number": 84, "expert_ratings": [59, 72, 62, 58, 76, 80, 52, 64, 61, 56, 74, 68, 63, 55, 71, 69, 67, 78, 54, 60, 70, 66, 58, 65, 75, 59, 50, 81, 73, 53, 80, 68, 78, 77, 60, 62, 64, 50, 68, 74, 56, 57, 54, 60, 72, 66, 72, 73, 55, 66, 71, 57, 64, 70, 59, 62, 50, 55, 54, 76, 78, 71, 65, 63, 66, 62, 61, 68, 79, 56, 78, 59, 61, 54, 61, 57, 73, 59, 62, 80, 51, 75, 71, 75, 73, 69, 73, 65, 66, 54, 62, 83, 58, 62, 67, 80, 69, 58, 51, 72, 60, 61, 66, 68, 54, 81, 61, 78, 67, 66, 78, 69, 61, 64, 60, 54], "rating_category": "Good"}, "overall_ratings": {"feedback": {"items": [{"title": "Family-Friendly", "feedback": "Your title does a great job of addressing families specifically, which is a big plus."}, {"title": "Key Features", "feedback": "Highlighting 'Sports Court', 'Large Pool', and 'Spa' directly targets desirable features for many guests."}, {"title": "Evocative Language", "feedback": "Using 'Oasis' brings to mind relaxation, but further unique identifiers might enhance appeal."}], "summary": "The title effectively encourages families with its focus on amenities, but it can be slightly improved for clarity and uniqueness."}, "revisions": ["Family-Friendly Oasis: Pools, Sports Courts & Fun Details", "Fun & Relaxation Await: Sports Court & Spa in Clearwater", "Clearwater Family Retreat: Ideal for Leisure & Play"], "suggestions": ["Add the specific location to enhance discoverability.", "Consider condensing the title to maintain impact while being concise.", "Incorporate unique selling points or themes of your property."], "property_name": "Family-Friendly Oasis: Sports Court~Large Pool~Spa", "rating_number": 86, "expert_ratings": [85, 78, 87, 76, 82, 93, 68, 75, 80, 88, 74, 91, 79, 65, 88, 70, 86, 90, 73, 82, 84, 87, 69, 88, 74, 81, 77, 76, 66, 88, 75, 68, 81, 69, 92, 89, 83, 82, 90, 92, 68, 76, 91, 59, 73, 78, 88, 74, 81, 77, 80, 70, 84, 67, 81, 72, 99, 90, 65, 70, 83, 88, 65, 75, 66, 88, 76, 82, 69, 72, 85, 87, 69, 85, 81, 67, 63, 85, 78, 91, 80, 95, 67, 83, 72, 89, 91, 60, 81, 82, 66, 75, 84, 80, 77, 93, 89, 78, 85, 91, 78, 74, 85, 83, 66, 64, 89, 88, 73, 82, 89, 78, 72, 64, 92, 81, 69, 74, 88, 85, 77, 66, 88], "rating_category": "Good"}}	2025-05-10 19:24:46.496272
ed3aeee6-57ea-4972-ae34-0b5d4706a1df	2025-05-12 21:47:18.57196+00	86bdadd1-39bd-4008-839e-6052acf811f7	{"title": {"feedback": {"items": [{"title": "Clear Location Highlight", "feedback": "The phrase 'SHORT WALK TO Playa Penca' is excellent as it immediately identifies a key attraction; consider optimizing it further for brevity and impact."}, {"title": "Emphasizing Unique Features", "feedback": "Mentioning the pool is great, but integrating it into the main title might amplify its appeal and attract more guests."}, {"title": "Capacity Mention", "feedback": "Stating that it 'Sleeps 6' is crucial, but consider placing it more strategically in the title for a better flow."}], "summary": "Your title is informative and conveys key aspects of the property well, such as location, amenities, and capacity. However, it could benefit from slight adjustments to enhance its appeal and clarity."}, "revisions": null, "suggestions": ["Consider starting the title with a strong feature like 'Gated Condo with Pool' to capture attention.", "Think about rephrasing to reduce wordiness, perhaps to 'Gated Condo, Steps from Playa Penca - Sleeps 6' for a cleaner look.", "Make the amenities like the pool or air conditioning more prominent within the title to attract guest interest."], "property_name": "SHORT WALK TO Playa Penca! Pool, Gated, Sleeps 6", "rating_number": 80, "expert_ratings": [85, 78, 82, 90, 75, 80, 88, 70, 76, 81, 84, 87, 77, 74, 80, 83, 86, 81, 79, 69, 88, 91, 86, 68, 73, 80, 76, 84, 78, 87, 90, 75, 82, 88, 89, 91, 76, 73, 80, 81, 85, 82, 79, 74, 77, 76, 78, 84, 85, 82, 79, 88, 81, 87, 89, 82, 90, 75, 74, 82, 80, 77, 84, 88, 91, 78, 76, 73, 81, 79, 86, 80, 89, 85, 87, 82, 80, 90, 90, 75, 74, 85, 83, 82, 84, 91, 83, 88, 87, 82, 76, 79, 85, 80, 76, 77, 84, 85, 89, 88, 83, 82, 76, 90, 78, 79, 86, 84, 81, 90, 89, 88, 87, 76, 73, 77, 89, 85, 81, 76, 89, 83, 88, 91, 74, 76, 81, 82, 80, 75, 84, 82, 90, 91], "title_rewrites": ["Gated Condo Steps from Playa Penca - Pool & Sleeps 6", "Enjoy a Poolside Getaway! Gated Condo Near Playa Penca", "Your Gated Retreat! Pool Access & Steps to Playa Penca - Sleeps 6"], "rating_category": "Satisfactory"}, "amenities": {"feedback": {"items": [{"title": "Scenic Views", "feedback": "The varying scenic views provided are truly captivating and add to the overall charm of the stay."}, {"title": "Family Amenities", "feedback": "You have included thoughtful family amenities such as a pack 'n play and changing table, catering well to families traveling with children."}, {"title": "Kitchen Facilities", "feedback": "The well-equipped kitchen allows guests to prepare their own meals comfortably, which is a significant plus."}, {"title": "Outdoor Spaces", "feedback": "The shared outdoor spaces and private patio are excellent features that enhance relaxation and enjoyment."}, {"title": "Safety Features", "feedback": "Your focus on safety with alarms and security cameras demonstrates a commendable commitment to guest safety."}, {"title": "Variety of Entertainment Options", "feedback": "The presence of an HDTV with streaming options is a great addition for entertainment."}], "summary": "Your property offers a diverse range of amenities that enhance the guest experience, making it a commendable choice for travelers seeking both comfort and leisure."}, "revisions": null, "suggestions": ["Consider enhancing the outdoor seating area for better guest comfort.", "Adding a few more family-friendly games or outdoor activities could increase appeal.", "Reviewing the seasonal availability of shared facilities to ensure consistency for guests.", "Enhancing the kitchen with more cooking utensils could further improve guest convenience.", "Improving WiFi speed and availability can make remote work easier for guests."], "property_name": "Boutique Stay", "rating_number": 88, "expert_ratings": [52, 89, 65, 92, 55, 73, 68, 79, 82, 66, 45, 77, 53, 61, 93, 76, 87, 40, 50, 63, 72, 90, 57, 58, 81, 64, 83, 70, 75, 59, 71, 69, 60, 88, 44, 48, 36, 91, 38, 86, 47, 34, 95, 41, 33, 56, 78, 49, 94, 39, 37, 85, 54, 42, 32, 67, 35, 98, 62, 84, 92, 46, 30, 67, 19, 76, 53, 60, 72, 35, 80, 30, 65, 57, 43, 18, 68, 31, 74, 15, 66, 29, 61, 17, 58, 50, 10, 93, 28, 73, 20, 75, 24, 41, 45, 12, 14, 96, 7, 11, 8, 99, 3, 99, 9, 4, 5, 6, 2, 1, 39, 21, 22, 23, 25, 26, 27], "rating_category": "Good"}, "hero_image": {"feedback": {"items": [{"title": "Stunning Visual Appeal", "feedback": "The image collage provides a vibrant and inviting view of the beach and pool, emphasizing a relaxing getaway."}, {"title": "Diverse Scenery", "feedback": "Including both the pool and beach offers potential guests a glimpse of the variety they can enjoy."}, {"title": "Compelling Composition", "feedback": "The combination of beautiful sunset and poolside views creates an appealing and dreamy setting."}], "summary": "Your listing's hero image beautifully captures the allure of your property, showcasing both the stunning beach sunsets and the inviting pool area. This effectively highlights the amenities and serene environment, likely to attract more bookings."}, "revisions": null, "suggestions": ["Consider including a photo of the condo interior to show living space.", "Add a caption for each image to guide viewers.", "Highlight nearby attractions more visibly in the images."], "property_name": "SHORT WALK TO Playa Penca! Pool, Gated, Sleeps 6", "rating_number": 86, "expert_ratings": [84, 87, 92, 85, 88, 83, 89, 82, 91, 86, 85, 88, 87, 90, 89, 84, 86, 82, 91, 85, 86, 92, 89, 87, 92, 83, 85, 88, 87, 84, 89, 86, 82, 91, 90, 88, 87, 86, 85, 92, 89, 84, 88, 89, 87, 84, 92, 86, 89, 83, 88, 85, 86, 91, 84, 82, 87, 85, 92, 89, 90, 84, 87, 91, 86, 83, 89, 88, 85, 92, 84, 91, 86, 82, 88, 90, 87, 84, 89, 85, 87, 91, 89, 84, 92, 83, 86, 87, 88, 84, 89, 86, 91, 82, 85, 90, 89, 87, 84, 92], "rating_category": "Good"}, "description": {"feedback": {"items": [{"title": "Highlighting Location Benefits", "feedback": "You mention the proximity to beaches and activities, but emphasizing the vibrant local culture and experiences could really draw in guests."}, {"title": "Formatting and Readability", "feedback": "Consider breaking up the text into bullet points for key features to improve readability and attract attention quicker."}, {"title": "More Specifics on Amenities", "feedback": "Providing more detail about the specific amenities, such as types of games or the layout of the space, could entice potential guests."}, {"title": "Clarifying Pet Policy", "feedback": "Clarifying the pet policy would help guests quickly understand if their furry friends are welcome."}, {"title": "Adding Local Recommendations", "feedback": "Highlighting popular local eateries or landmarks could enhance the appeal of your listing."}], "summary": "Your listing description presents a lovely rental, but there's room for improvement. Clarifying the unique aspects and listing amenities more prominently would enhance it."}, "revisions": null, "suggestions": ["Use bullet points to list amenities for better readability.", "Include nearby attractions and restaurants to entice guests.", "Simplify the pet policy and its fee details.", "Add a call to action to encourage bookings.", "Consider the use of more engaging language to describe the experience."], "property_name": "Here Comes the Sun, Little Darling!", "rating_number": 69, "expert_ratings": [64, 76, 78, 58, 92, 67, 84, 73, 62, 70, 57, 69, 66, 54, 58, 85, 88, 77, 80, 73, 84, 62, 75, 65, 59, 66, 81, 68, 63, 72, 59, 76, 74, 64, 83, 57, 49, 71, 87, 55, 90, 69, 60, 69, 53, 70, 49, 75, 68, 66, 78, 72, 94, 58, 62, 51, 66, 86, 70, 66, 82, 72, 80, 69, 88, 69, 88, 81, 52, 62, 56, 75, 67, 61, 82, 93, 72, 58, 87, 66, 85, 79, 91, 50, 92, 89, 49, 65, 62, 66, 73, 82, 45, 80, 92, 64, 52, 91, 78, 63, 58, 82, 69, 76, 77, 66, 62, 72, 81, 50, 66, 63, 62, 47, 60, 61], "rating_category": "Needs Work", "description_rewrite": {"guest_access": "Guests have access to all condo amenities including a saltwater pool, a dedicated parking space, and nearby beach access. Various activities await within a short distance!", "your_property": "Our lovely condo is part of the Casa Del Sol Complex, where comfort meets convenience. Situated amidst lush landscapes, the condo provides a serene retreat with tropical views. Embrace a vibrant atmosphere with easy beach access and local gastronomic delights.", "listing_description": "Experience an unforgettable stay at our cozy, gated condo just a short walk from Playa Penca. Designed for families and friends, our air-conditioned space accommodates up to 6 guests, featuring a Master with a King bed, a Queen bed, bunk beds, and a Pullout Trundle sofa. Enjoy modern amenities, high-speed WIFI, a sparkling saltwater pool, and nearby eateries! Perfect for beach days and relaxation!", "other_details_to_note": "The unit has features that enhance your stay including a fully stocked kitchen, laundry facilities, and a pet-friendly policy for small dogs.", "interaction_with_guests": "I'm available via messaging for any questions, but you can enjoy your privacy and tranquility during your stay. I aim to make your experience seamless!"}}, "other_images": {"feedback": {"items": [{"title": "Photo Quality", "feedback": "The images are bright and clear, effectively capturing the essence of the space. They highlight the property’s warmth and comfort."}, {"title": "Composition", "feedback": "The composition in your photos is well-balanced, ensuring that key features of the property are showcased effectively. This provides potential guests with a thorough view of what they can expect."}, {"title": "Lighting", "feedback": "The lighting in your photos is well-managed, enhancing the natural colors and creating a welcoming feel. This is appealing for guests looking for a cozy stay."}], "summary": "Your listing photos showcase a charming and inviting atmosphere, ideal for attracting guests seeking a boutique experience."}, "revisions": null, "suggestions": ["Consider adding more exterior shots to highlight the surroundings.", "Incorporate photos during different times of day to show versatility.", "Add close-ups of unique decor items to enhance the boutique feel.", "Make sure all rooms are equally represented in the photos.", "Consider Hiring a Professional Photographer\\n                               \\n            While your photos are a good start, hiring a professional photographer could significantly elevate the visual appeal of your listing. A pro has the experience to capture your space in the best possible light, ensuring that it looks both inviting and accurate. This investment can help differentiate your property in a competitive market, where high-quality visuals can be the deciding factor for potential guests. Professional photographers are skilled in aspects like lighting, composition, and angles, which can make your property look more spacious, appealing, and true to its real-life charm.\\n                               \\n            For Those Who Prefer DIY Photography or Are Working Within a Budget\\n                               \\n            If you prefer to handle your own photography or a professional is outside your budget, here are a few simple tips to help improve your photos:\\n                               \\n            Maximize Natural Light: Aim to shoot during the day when natural light is abundant. Open all windows, use light-colored curtains, and avoid harsh overhead lights. Natural light enhances the warmth and appeal of the space, making it feel more inviting.\\n                               \\n            Use Wide Angles: When photographing rooms, use wide-angle shots to capture the entire space. This helps give viewers a sense of the room's size and layout. Avoid tight or cluttered shots, as they can make the space feel smaller than it actually is.\\n                               \\n            Focus on Clean and Tidy Staging: Before you take the photo, clear away any clutter. Neatly arrange furniture and decor to make the space look polished and functional. The simpler and more streamlined the space appears, the more likely it is to resonate with potential guests."], "property_name": "Boutique Stay", "rating_number": 85, "expert_ratings": [85, 86, 88, 85, 84, 87, 88, 83, 84, 85, 87, 85, 86, 84, 85, 87, 85, 84, 86, 85, 85, 84, 88, 87, 86, 85, 84, 83, 87, 85, 88, 84, 85, 86, 87, 85, 86, 85, 87, 84, 85, 85, 84, 88, 87, 84, 85, 85, 86, 84, 87, 88, 84, 85, 87, 85, 84, 86, 87, 85, 84, 85, 87, 85, 84, 86, 85, 85, 84, 87, 88, 84, 87, 85, 86, 85, 84, 85, 87, 86, 85, 84, 84, 86, 85, 86, 85, 84, 85, 84, 84, 85, 87, 86, 85, 85, 84, 85, 86, 85], "rating_category": "Good"}, "interior_design": {"feedback": {"items": [{"title": "Color Palette", "feedback": "The color palette is neutral and calming, but adding some vibrant accents could create a more cheerful atmosphere."}, {"title": "Furniture Arrangement", "feedback": "The furniture is arranged for functionality, but a more open layout might promote a better flow, especially in common areas."}, {"title": "Artwork and Decor", "feedback": "The space could benefit from more artwork or decor elements that reflect the local culture, adding character to the interior."}, {"title": "Lighting", "feedback": "Ensure that lighting matches the activities; warmer tones for relaxation areas could make the space feel cozier."}, {"title": "Outdoor Connection", "feedback": "Enhance the connection to outdoor areas by using more large windows or glass doors to invite natural light."}], "summary": "The interior design of your condo is overall pleasant and functional, but there are some areas that could enhance the comfort and aesthetic appeal for guests."}, "revisions": null, "suggestions": ["Integrate bright accent pillows or throws to liven up the space.", "Consider a stylish area rug to add warmth and comfort.", "Include a few local art pieces to give a unique touch that showcases the area.", "Create a more expansive seating arrangement in the living area.", "Add decorative plants to bring life into the rooms."], "property_name": "SHORT WALK TO Playa Penca! Pool, Gated, Sleeps 6", "rating_number": 66, "expert_ratings": [42, 76, 70, 89, 66, 58, 75, 63, 50, 79, 55, 68, 77, 60, 83, 37, 72, 65, 49, 88, 71, 40, 59, 67, 47, 54, 82, 61, 74, 66, 89, 44, 86, 32, 69, 62, 93, 39, 57, 48, 92, 53, 45, 64, 82, 76, 89, 62, 58, 33, 84, 29, 73, 42, 45, 91, 78, 88, 66, 61, 53, 73, 55, 35, 76, 70, 69, 80, 97, 41, 55, 35, 71, 88, 39, 58, 81, 43, 46, 48, 96, 82, 35, 51, 66, 36, 77, 61, 96, 74, 69, 85, 79, 54, 50, 44, 61, 63, 41, 81, 38, 92, 55, 60, 84, 76, 30, 87, 91, 57, 53, 68, 49, 73, 46], "rating_category": "Needs Work"}, "overall_ratings": {"feedback": {"items": [{"title": "Clear Location Highlight", "feedback": "The phrase 'SHORT WALK TO Playa Penca' is excellent as it immediately identifies a key attraction; consider optimizing it further for brevity and impact."}, {"title": "Emphasizing Unique Features", "feedback": "Mentioning the pool is great, but integrating it into the main title might amplify its appeal and attract more guests."}, {"title": "Capacity Mention", "feedback": "Stating that it 'Sleeps 6' is crucial, but consider placing it more strategically in the title for a better flow."}], "summary": "Your title is informative and conveys key aspects of the property well, such as location, amenities, and capacity. However, it could benefit from slight adjustments to enhance its appeal and clarity."}, "revisions": null, "suggestions": ["Consider starting the title with a strong feature like 'Gated Condo with Pool' to capture attention.", "Think about rephrasing to reduce wordiness, perhaps to 'Gated Condo, Steps from Playa Penca - Sleeps 6' for a cleaner look.", "Make the amenities like the pool or air conditioning more prominent within the title to attract guest interest."], "property_name": "SHORT WALK TO Playa Penca! Pool, Gated, Sleeps 6", "rating_number": 80, "expert_ratings": [85, 78, 82, 90, 75, 80, 88, 70, 76, 81, 84, 87, 77, 74, 80, 83, 86, 81, 79, 69, 88, 91, 86, 68, 73, 80, 76, 84, 78, 87, 90, 75, 82, 88, 89, 91, 76, 73, 80, 81, 85, 82, 79, 74, 77, 76, 78, 84, 85, 82, 79, 88, 81, 87, 89, 82, 90, 75, 74, 82, 80, 77, 84, 88, 91, 78, 76, 73, 81, 79, 86, 80, 89, 85, 87, 82, 80, 90, 90, 75, 74, 85, 83, 82, 84, 91, 83, 88, 87, 82, 76, 79, 85, 80, 76, 77, 84, 85, 89, 88, 83, 82, 76, 90, 78, 79, 86, 84, 81, 90, 89, 88, 87, 76, 73, 77, 89, 85, 81, 76, 89, 83, 88, 91, 74, 76, 81, 82, 80, 75, 84, 82, 90, 91], "rating_category": "Satisfactory"}}	2025-05-12 21:47:18.57196
b3dd5a61-94ea-4e7b-b764-0fb661e35609	2025-05-14 20:22:38.428392+00	9cf3e031-bc6f-42e3-bf8b-ea39d4b16287	{"title": {"feedback": {"items": [{"title": "Include Location", "feedback": "Mentioning Yuma in the title can help attract more local travelers and provide context."}, {"title": "Highlight Unique Selling Points", "feedback": "Consider emphasizing specific features such as 'High-Speed Wi-Fi' or 'Quiet Retreat' to appeal to professionals."}, {"title": "Add Emotional Appeal", "feedback": "Using phrases like 'Perfect Getaway' or 'Serene Escape' can evoke more interest in travelers seeking relaxation."}], "summary": "Your title effectively captures the essence of your property, highlighting the appeal of its charming and cozy feel. However, there are some areas where you can enhance its impact."}, "revisions": null, "suggestions": ["Incorporate the location (Yuma) into the title.", "Emphasize key features like Wi-Fi or outdoor amenities.", "Use emotionally compelling words to create intrigue."], "property_name": "Charming Tiny Home with Cabin Feel", "rating_number": 75, "expert_ratings": [85, 76, 64, 70, 89, 78, 67, 58, 72, 90, 79, 88, 66, 77, 84, 75, 69, 88, 83, 65, 86, 81, 68, 73, 78, 82, 87, 66, 74, 81, 59, 68, 91, 89, 60, 54, 76, 67, 95, 62, 79, 82, 88, 75, 68, 81, 74, 71, 70, 85, 93, 88, 64, 80, 89, 67, 75, 84, 71, 85, 63, 90, 76, 64, 82, 78, 92, 85, 58, 89, 81, 76, 73, 70, 75, 68, 88, 79, 95, 88, 66, 68, 70, 81, 85, 90, 89, 74, 66, 71, 73, 77, 82, 80, 92, 71, 83, 90, 89, 62, 75, 66, 68, 95, 62, 88, 84, 77, 82, 68, 72, 78, 76, 80, 88, 71, 73, 89], "title_rewrites": ["Cozy Tiny Home with High-Speed Wi-Fi in Yuma", "Perfect Tiny Retreat with Cabin Vibes in Yuma, AZ", "Charming Yuma Tiny Home – Ideal for Professionals"], "rating_category": "Satisfactory"}, "amenities": {"feedback": {"items": [{"title": "Comfort and Essentials", "feedback": "You provide the necessary comforts for guests, including towels, linens, and toiletries, which are highly appreciated."}, {"title": "Safety Features", "feedback": "The inclusion of smoke alarms and fire extinguishers adds a crucial layer of safety, but consider adding a carbon monoxide detector."}, {"title": "Kitchen Amenities", "feedback": "Your kitchen setup is well-equipped, allowing for an enjoyable cooking experience. However, enhancing the cooking basics could elevate the cooking experience."}, {"title": "Entertainment Options", "feedback": "The inclusion of a TV is great for entertainment, but there may be room for more options to enhance guest experience."}, {"title": "Outdoor Features", "feedback": "The fire pit is a wonderful addition for outdoor enjoyment, but reviewing the overall outdoor space for comfort would be beneficial."}], "summary": "Your property offers a variety of essential amenities that cater to guests' needs, making it a commendable choice for a unique stay."}, "revisions": null, "suggestions": ["Consider adding a carbon monoxide detector for enhanced safety.", "Expand the selection of cooking basics to offer a more comprehensive kitchen experience.", "Include entertainment options beyond just TV, like board games or streaming services.", "Evaluate the outdoor space for additional comfort features like seating or lighting.", "Ensure that safety features are thorough and clearly communicated to guests."], "property_name": "Unique Experience Stay", "rating_number": 78, "expert_ratings": [35, 52, 87, 45, 77, 66, 54, 92, 78, 60, 69, 50, 88, 43, 91, 48, 73, 80, 82, 49, 61, 96, 62, 31, 79, 64, 53, 24, 37, 68, 70, 21, 25, 81, 59, 39, 83, 56, 40, 93, 44, 75, 20, 55, 27, 32, 67, 98, 23, 71, 65, 97, 34, 8, 13, 12, 58, 72, 29, 84, 42, 86, 18, 35, 15, 10, 19, 47, 5, 41, 17, 76, 57, 99, 2, 33, 36, 88, 38, 92, 30, 90, 14, 94, 1, 11, 63, 9, 3, 95, 74, 26, 22, 20, 66, 30, 89, 85], "rating_category": "Satisfactory"}, "hero_image": {"feedback": {"items": [{"title": "Clear View of Property", "feedback": "The image captures the tiny home clearly, making it easy for potential guests to see the exterior and size of the home."}, {"title": "Good Lighting", "feedback": "The lighting in the image is natural and well-balanced, providing a welcoming and open feel."}, {"title": "Clean and Organized", "feedback": "The surrounding area appears neat and well-maintained, enhancing the overall appeal of the property."}], "summary": "The hero image provides a clear view of the tiny home, capturing its cozy and compact nature. The picture is well-lit and shows the property in a clean and organized manner, which appeals to professionals and solo travelers as described in the listing."}, "revisions": null, "suggestions": ["Include a view from the front to show the entrance more clearly.", "Add some greenery or decorative elements to the exterior to enhance visual appeal.", "Showcase the immediate surroundings to provide context about the location.", "Incorporate interior shots to give a glimpse of the cabin feel described in the listing."], "property_name": "Charming Tiny Home with Cabin Feel", "rating_number": 65, "expert_ratings": [68, 70, 65, 67, 63, 62, 66, 64, 66, 65, 67, 68, 64, 65, 66, 67, 63, 65, 66, 68, 62, 65, 66, 67, 68, 64, 65, 67, 69, 65, 64, 66, 67, 68, 65, 63, 63, 64, 67, 68, 66, 62, 63, 67, 68, 69, 65, 66, 67, 64, 65, 67, 66, 64, 63, 65, 68, 69, 70, 66, 66, 65, 68, 64, 67, 69, 70, 65, 66, 64, 67, 63, 66, 65, 68, 65, 64, 66, 67, 69, 66, 65, 67, 68, 66, 64, 65, 67, 66, 67, 65, 68, 69, 64, 66, 65, 64, 68, 66, 67], "rating_category": "Needs Work"}, "description": {"feedback": {"items": [{"title": "Ambiguity in Guest Access", "feedback": "Clarify the guest access process. While you mention helpers will provide access, detailing how the process works could eliminate confusion for guests."}, {"title": "Mixed-use Property Explanation", "feedback": "Be more specific about the mixed-use nature of the property to manage guest expectations regarding potential noise or activity from RV storage."}, {"title": "Highlight Unique Features", "feedback": "Consider emphasizing unique aspects such as the outdoor fire pit or tiny home experience that can set you apart from similar listings."}, {"title": "Update Amenities Listing", "feedback": "Ensure the amenities listed are fully included in the stay and there are no missing essentials that guests typically expect."}, {"title": "Improve Description Flow", "feedback": "Revise the overall flow of the description for a better structure that draws in potential guests more effectively."}], "summary": "Your listing presents a nice option for solo travelers and professionals seeking tranquility in Yuma. However, there are areas that could use improvement to enhance its appeal."}, "revisions": null, "suggestions": ["Clarify guest access procedures to reduce confusion.", "Emphasize the unique features of tiny living and outdoor amenities in the description.", "Highlight proximity to local attractions more prominently.", "Consider adding more visuals showcasing the tiny home's interior and unique aspects.", "Ensure that all amenities are clearly defined and updated in the listing."], "property_name": "Charming Tiny Home with Cabin Feel", "rating_number": 64, "expert_ratings": [27, 88, 63, 41, 55, 36, 85, 77, 49, 65, 56, 87, 49, 48, 47, 70, 61, 71, 78, 72, 73, 40, 46, 36, 62, 68, 62, 70, 29, 55, 82, 37, 58, 21, 90, 38, 74, 25, 49, 41, 66, 67, 64, 52, 85, 27, 50, 54, 63, 72, 57, 71, 39, 75, 88, 66, 58, 31, 24, 47, 51, 46, 60, 40, 37, 44, 67, 85, 70, 63, 28, 73, 64, 93, 66, 26, 29, 81, 73, 56, 91, 89, 39, 90, 45, 37, 80, 56, 74, 48, 56, 89, 34, 67, 25, 31, 78, 79, 59, 66, 45, 45, 86, 68, 92, 57, 55, 91, 33, 69, 74, 75, 60, 67, 76, 48, 89, 25, 76], "rating_category": "Needs Work", "description_rewrite": {"guest_access": "Enjoy easy entry with a secure gate, and upon arrival, our friendly helpers will provide you with all the access information you need for a seamless experience.", "your_property": "Nestled within a mixed-use property, this tiny home boasts a distinctly cozy and cabin-like feel. You’ll find a private entrance and a well-appointed space perfect for unwinding after a day of exploration.", "listing_description": "Experience the charm of tiny living in this uniquely designed cozy retreat in Yuma, AZ. Perfect for solo travelers and professionals, this tranquil tiny home ensures you enjoy high-speed Wi-Fi for work while being just moments away from major attractions. With a peaceful ambiance and full access to essential amenities, your stay will be both relaxing and connected!", "other_details_to_note": "Please note that the property includes RV storage and other guests, so some external activity may occur, but the tiny home is designed to ensure your comfort.", "interaction_with_guests": "I’ll be available for assistance throughout your stay, ensuring you have everything you need for a comfortable experience."}}, "other_images": {"feedback": {"items": [{"title": "Lighting", "feedback": "The natural lighting captured gives the spaces a warm feel, but consider enhancing it to highlight the unique features."}, {"title": "Composition", "feedback": "The layout in the photos generally works well but could be improved by focusing on the unique selling points of your property."}, {"title": "Angles", "feedback": "Photos use straightforward angles which clearly show the space. Experimenting with creative angles could add a dynamic touch."}], "summary": "Your property's photos bring a good sense of what the place offers. A few tweaks could elevate their impact."}, "revisions": null, "suggestions": ["Enhance lighting in the photos to make spaces feel larger and more inviting.", "Consider using wide-angle shots to better capture the entire room.", "Highlight unique features that set your property apart from others.", "Include a few photos that give potential guests a glimpse of local surroundings or attractions.", "Add more vibrant colors to photos or staging to capture attention.", "Consider Hiring a Professional Photographer\\n                               \\n            While your photos are a good start, hiring a professional photographer could significantly elevate the visual appeal of your listing. A pro has the experience to capture your space in the best possible light, ensuring that it looks both inviting and accurate. This investment can help differentiate your property in a competitive market, where high-quality visuals can be the deciding factor for potential guests. Professional photographers are skilled in aspects like lighting, composition, and angles, which can make your property look more spacious, appealing, and true to its real-life charm.\\n                               \\n            For Those Who Prefer DIY Photography or Are Working Within a Budget\\n                               \\n            If you prefer to handle your own photography or a professional is outside your budget, here are a few simple tips to help improve your photos:\\n                               \\n            Maximize Natural Light: Aim to shoot during the day when natural light is abundant. Open all windows, use light-colored curtains, and avoid harsh overhead lights. Natural light enhances the warmth and appeal of the space, making it feel more inviting.\\n                               \\n            Use Wide Angles: When photographing rooms, use wide-angle shots to capture the entire space. This helps give viewers a sense of the room's size and layout. Avoid tight or cluttered shots, as they can make the space feel smaller than it actually is.\\n                               \\n            Focus on Clean and Tidy Staging: Before you take the photo, clear away any clutter. Neatly arrange furniture and decor to make the space look polished and functional. The simpler and more streamlined the space appears, the more likely it is to resonate with potential guests."], "property_name": "Unique Experience Stay", "rating_number": 78, "expert_ratings": [75, 78, 82, 79, 77, 76, 80, 81, 72, 79, 83, 74, 78, 76, 77, 82, 80, 79, 73, 76, 75, 77, 80, 81, 72, 78, 79, 82, 76, 77, 80, 81, 72, 79, 82, 74, 78, 76, 75, 81, 80, 77, 78, 74, 82, 75, 77, 80, 85, 83, 76, 74, 75, 81, 82, 78, 77, 76, 79, 80, 81, 73, 76, 82, 79, 78, 77, 76, 79, 81, 80, 72, 78, 82, 76, 81, 75, 77, 80, 79, 73, 78, 77, 76, 82, 81, 78, 77, 75, 82, 80, 79, 78, 77, 81, 76, 79, 75, 82, 78], "rating_category": "Satisfactory"}, "interior_design": {"feedback": {"items": [{"title": "Aesthetic Appeal", "feedback": "The interior design is appealing with a cabin-like atmosphere that guests appreciate."}, {"title": "Space Utilization", "feedback": "The layout makes good use of the space, but certain areas feel cramped."}, {"title": "Decor", "feedback": "Consider adding more personal touches or decor that reflect the local culture or nature."}, {"title": "Lighting", "feedback": "Improving natural light through window treatments could brighten the space."}, {"title": "Comfort", "feedback": "Overall comfort is satisfactory, but consider better seating options for relaxation."}], "summary": "You've created a charming tiny home with a cozy cabin feel that is inviting for guests. However, there are areas that could use improvements to enhance the overall guest experience."}, "revisions": null, "suggestions": ["Introduce more indoor plants or natural elements for a fresher feel.", "Add artwork or unique decor to enhance the character of the space.", "Reassess furniture layout to improve spatial flow in the living area."], "property_name": "Charming Tiny Home with Cabin Feel", "rating_number": 76, "expert_ratings": [87, 76, 92, 65, 74, 82, 80, 88, 77, 93, 72, 84, 94, 78, 68, 81, 90, 75, 88, 66, 69, 58, 44, 71, 80, 65, 79, 82, 74, 87, 93, 70, 54, 69, 83, 67, 62, 76, 72, 91, 89, 73, 58, 85, 59, 76, 90, 74, 91, 78, 55, 61, 86, 83, 92, 68, 79, 73, 99, 54, 75, 70, 66, 72, 63, 84, 88, 64, 61, 88, 77, 58, 72, 65, 76, 89, 82, 90, 66, 50, 70, 64, 73, 87, 69, 81, 78, 84, 61, 63, 75, 66, 88, 74, 92, 58, 59, 91, 66, 87, 82, 56, 76, 91, 59, 64, 54, 68, 93, 91, 57, 60, 77], "rating_category": "Satisfactory"}, "overall_ratings": {"feedback": {"items": [{"title": "Title Improvements", "feedback": "Incorporate the location and highlight unique features in the title to attract more views and connections with potential guests."}, {"title": "Clarify Listing Details", "feedback": "Ensure that the description provides concrete details regarding guest access and the mixed-use nature of the property to manage expectations."}, {"title": "Enhance Visual Appeal", "feedback": "Consider improving both hero and other images by capturing different angles and using natural light to enhance the images' warmth and inviting quality."}, {"title": "Interior Comfort and Decor", "feedback": "Adding personal touches and adjusting the furniture layout can create a more inviting atmosphere."}, {"title": "Highlight Unique Amenities", "feedback": "Showcase outdoor features and unique selling points clearly, as they can capture guests’ interests."}], "summary": "Your charming tiny home has potential, but various areas in the listing need attention to elevate its attractiveness to guests. Striking a balance between clarity, emotional appeal, and visual representation will notably enhance guest interest."}, "revisions": null, "suggestions": ["Revise the listing title to include location and unique features.", "Improve clarity in the guest access process and mixed-use property details.", "Use brighter, well-composed images that highlight the best aspects of your property.", "Consider adding decorative elements that resonate with the local culture or surroundings.", "Ensure all amenities are clearly listed and promoted. Including a clearer description of outdoor spaces would be beneficial."], "property_name": "Charming Tiny Home with Cabin Feel", "rating_number": 72, "expert_ratings": [75, 70, 64, 65, 80, 77, 68, 82, 89, 78, 71, 83, 65, 70, 72, 80, 66, 84, 75, 70, 66, 61, 78, 55, 68, 63, 64, 62, 74, 76, 81, 82, 69, 75, 77, 72, 81, 67, 79, 68, 74, 75, 60, 65, 68, 72, 71, 79, 83, 80, 63, 64, 82, 78, 66, 65, 70, 72, 76, 69, 71, 78, 79, 80, 73, 66, 67, 82, 81, 74, 70, 68, 65, 63, 67, 76, 89, 84, 86, 60, 80, 74, 71], "rating_category": "Satisfactory"}}	2025-05-14 20:22:38.428392
77aedb7c-3a61-4e62-9e8c-02691007f2be	2025-04-26 20:05:45.924033+00	71ef7d18-0f73-4245-beb9-86f9c204c089	{"title": {"feedback": {"items": [{"title": "Add Location", "feedback": "Consider including 'Yuma' in the title to immediately inform guests of where they will be staying."}, {"title": "Highlight Amenities", "feedback": "Mentioning 'pool' or 'peaceful retreat' could draw more attraction to leisure travelers."}, {"title": "Engaging Descriptors", "feedback": "Utilize descriptive words in addition to the title to create a stronger connection with potential guests."}, {"title": "Appeal to Target Audience", "feedback": "If targeting business travelers, clarify aspects like 'ideal for professionals'."}, {"title": "Unique Selling Points", "feedback": "Incorporate elements that make the property stand out, such as 'quiet' and 'central location'."}], "summary": "Your title, 'The Golden Nugget,' is appealing but could benefit from further details to enhance interest."}, "revisions": null, "suggestions": ["Add the location (Yuma, AZ) in the title for better visibility.", "Include mention of the pool to attract guests looking for relaxation.", "Consider adding a descriptive term like 'peaceful' to connect with target audience.", "Try to convey that the property is ideal for professionals, if that's your target market.", "Think about emphasizing the clean and fully equipped nature in the title."], "property_name": "The Golden Nugget", "rating_number": 69, "expert_ratings": [83, 67, 72, 58, 51, 60, 48, 55, 64, 66, 70, 49, 63, 76, 68, 53, 77, 60, 62, 47, 86, 85, 52, 50, 81, 69, 74, 54, 73, 59, 56, 87, 66, 78, 57, 62, 68, 90, 75, 88, 49, 58, 82, 71, 64, 65, 61, 80, 55, 69, 84, 93, 46, 70, 92, 79, 72, 46, 61, 53, 66, 88, 94, 96, 79, 78, 62, 90, 58, 87, 80, 77, 59, 69, 52, 46, 63, 94, 86, 95, 82, 50, 63, 72, 74, 68, 77, 89, 91, 60, 47, 78, 65, 74, 57, 88, 93, 82, 68, 51, 59, 95, 85, 71, 73, 58, 69, 48, 75, 77, 90, 56, 94, 62, 72], "title_rewrites": ["The Golden Nugget - Peaceful Stay in Yuma with Pool", "The Golden Nugget | Clean & Cozy Yuma Retreat with Pool", "Experience The Golden Nugget: Your Central Yuma Oasis with Pool"], "rating_category": "Needs Work"}, "amenities": {"feedback": {"items": [{"title": "Kitchen and Dining Essentials", "feedback": "You have a well-equipped kitchen, but consider adding more cooking essentials to help guests prepare meals easily."}, {"title": "Entertainment Options", "feedback": "A TV is present, but additional entertainment options like streaming services could improve guest satisfaction."}, {"title": "Outdoor Amenities", "feedback": "Having a backyard is a nice touch, consider enhancing this space with more furniture or lighting for evening use."}, {"title": "Heating and Cooling", "feedback": "While you have air conditioning and heating, mentioning efficiency ratings might help guests feel more comfortable."}, {"title": "Privacy and Safety Features", "feedback": "You've included multiple safety features, but consider adding a detailed guide on their locations for guest peace of mind."}], "summary": "Your property has a wide range of basic amenities that cater to many guest needs, but there is potential for improvement to enhance the overall guest experience."}, "revisions": null, "suggestions": ["Enhance the kitchen with additional utensils and cooking tools.", "Provide streaming services or board games for entertainment.", "Furnish the outdoor space with seating and decorative lights.", "Offer efficiency information for heating and cooling systems.", "Create a guest manual that details safety features and instructions."], "property_name": "Property with Standard Amenities", "rating_number": 64, "expert_ratings": [59, 68, 71, 74, 62, 65, 57, 80, 63, 66, 57, 70, 64, 72, 67, 55, 58, 73, 69, 75, 60, 66, 64, 62, 68, 59, 75, 74, 61, 78, 76, 57, 81, 68, 72, 64, 78, 63, 61, 60, 56, 74, 70, 62, 68, 80, 73, 66, 64, 75, 81, 58, 62, 59, 64, 71, 67, 66, 73, 77, 65, 60, 62, 69, 75, 78, 80, 74, 72, 65, 68, 56, 69, 73, 66, 59, 61, 70, 77, 70, 66, 67, 65, 81, 74, 75, 64, 62, 60, 58, 57, 64, 68, 74, 63, 71, 75, 68, 72, 76, 61, 60, 73, 75, 81, 68, 65, 67, 64], "rating_category": "Needs Work"}, "hero_image": {"feedback": {"items": [{"title": "Cozy Ambiance", "feedback": "The warm and inviting color scheme creates a cozy atmosphere, which is appealing to guests seeking a comfortable stay."}, {"title": "Minimal Detailing", "feedback": "The image focuses on simplicity, which is both a strength and a limitation. While it showcases a neat and tidy bedroom, the image could benefit from displaying more unique aspects of the property."}, {"title": "Lighting Effect", "feedback": "The lighting is soft, creating a peaceful and inviting feel. However, highlighting more natural light could add to the overall ambiance."}], "summary": "The hero image of The Golden Nugget highlights a cozy bedroom with a vibrant red bedspread, which adds a touch of warmth and personality. It effectively conveys a sense of comfort and relaxation, appealing to guests looking for a peaceful stay. While the image captures the essentials perfectly, incorporating more of the property's unique features, such as the backyard or pool, could enhance its appeal."}, "revisions": null, "suggestions": ["Include a shot of the backyard or pool area to showcase the outdoor amenities.", "Use images that highlight unique features like the walking path nearby.", "Capture the kitchen or dining room to give guests an idea of communal spaces.", "Add photos with more vibrant lighting to enhance the room's appeal.", "Include decorative elements or artwork to add character to the room."], "property_name": "The Golden Nugget", "rating_number": 76, "expert_ratings": [65, 78, 72, 74, 67, 80, 69, 75, 82, 71, 70, 73, 68, 79, 66, 81, 83, 84, 85, 76, 77, 73, 74, 78, 69, 79, 75, 77, 70, 82, 76, 71, 67, 80, 81, 68, 85, 72, 74, 66, 78, 69, 82, 77, 73, 71, 75, 70, 84, 79, 68, 81, 76, 82, 83, 74, 80, 78, 71, 72, 66, 68, 79, 77, 70, 73, 67, 84, 82, 65, 83, 75, 69, 77, 76, 71, 80, 79, 68, 81, 85, 82, 78, 72, 69, 74, 70, 81, 73, 77, 84, 76, 66, 78, 67, 75, 82, 79, 85, 77], "rating_category": "Satisfactory"}, "description": {"feedback": {"items": [{"title": "Location Details", "feedback": "You mention proximity to various places, but clarifying traffic conditions or popular local spots could be beneficial."}, {"title": "Engagement and Personal Touch", "feedback": "Consider incorporating a more personal touch by sharing what makes The Golden Nugget special to you or past guests."}, {"title": "Clarity in Guest Access", "feedback": "While you explain the space well, further clarification on shared spaces versus private areas could improve understanding for potential guests."}, {"title": "Highlight Unique Features", "feedback": "While the pool is mentioned, emphasizing other unique aspects of the property could draw more interest."}, {"title": "Invitation or Call to Action", "feedback": "A stronger inviting phrase or call to action at the end might leave a lasting impression."}], "summary": "Overall, your listing is appealing with a clear focus on location and amenities. However, there are areas where you can enhance clarity and engagement."}, "revisions": null, "suggestions": ["Enhance the personal narrative about The Golden Nugget.", "Clarify the shared space arrangements for guests.", "Highlight unique features or experiences offered at the property.", "Add a call to action inviting guests to book their stay.", "Include specific local attractions that guests may enjoy."], "property_name": "The Golden Nugget", "rating_number": 75, "expert_ratings": [83, 75, 67, 90, 78, 85, 77, 71, 80, 84, 69, 79, 70, 72, 88, 76, 74, 82, 68, 81, 64, 89, 66, 73, 87, 60, 61, 66, 63, 62, 65, 90, 71, 93, 94, 95, 77, 88, 80, 59, 92, 86, 79, 78, 75, 70, 80, 78, 81, 95, 88, 87, 84, 73, 91, 69, 85, 90, 65, 92, 75, 61, 82, 66, 60, 71, 94, 68, 63, 74, 76, 54, 78, 79, 65, 88, 91, 82, 72, 68, 77, 85, 84, 63, 94, 89, 60, 55, 70, 77, 72, 96, 58, 63, 96, 76, 93, 87, 80, 88, 91, 50, 72, 91, 69, 88, 63, 75, 60, 82, 76, 67, 68, 72], "rating_category": "Satisfactory", "description_rewrite": {"guest_access": "Guests have access to the entire home, including the kitchen, living room, dining area, and backyard with a pool. Please note that some amenities may be shared with other guests.", "your_property": "The Golden Nugget is a spacious home designed for comfort and convenience. With a full kitchen, living area, and a refreshing swimming pool, you'll feel right at home.", "listing_description": "Keep it simple at The Golden Nugget, a tranquil retreat nestled in the heart of Yuma, AZ! Just 5 minutes from YRMC, 15 minutes from MCAS, and a short drive to local attractions. Perfect for professionals, our fully equipped home features a refreshing year-round pool. Enjoy morning jogs along nearby paths and a spacious backyard for relaxation. Your comfort and satisfaction are our top priorities!", "other_details_to_note": "While you share spaces with other guests, we maintain a comfortable atmosphere to ensure everyone's privacy.", "interaction_with_guests": "We are here to assist you throughout your stay, ensuring you have the best time possible while exploring Yuma! Feel free to reach out with any questions."}}, "other_images": {"feedback": {"items": [{"title": "Composition", "feedback": "The composition of the photos is strong, showcasing key areas of the property effectively."}, {"title": "Lighting", "feedback": "Some photos suffer a bit from low lighting, which affects the brightness and clarity."}, {"title": "Clarity", "feedback": "The photos are generally clear, but a few images could use higher resolution."}, {"title": "Variety", "feedback": "The variety of images gives a well-rounded view of the property, covering all major areas."}], "summary": "The photos are well-composed and provide a comprehensive view of the property. They have a welcoming appeal, although improvements in lighting can enhance their quality."}, "revisions": null, "suggestions": ["Enhance lighting in interior shots to make them appear more inviting.", "Consider using a higher resolution camera for sharper images.", "Ensure consistent focus for all photos to maintain clarity.", "Use natural light more effectively to highlight spaces.", "Consider Hiring a Professional Photographer\\n                               \\n            While your photos are a good start, hiring a professional photographer could significantly elevate the visual appeal of your listing. A pro has the experience to capture your space in the best possible light, ensuring that it looks both inviting and accurate. This investment can help differentiate your property in a competitive market, where high-quality visuals can be the deciding factor for potential guests. Professional photographers are skilled in aspects like lighting, composition, and angles, which can make your property look more spacious, appealing, and true to its real-life charm.\\n                               \\n            For Those Who Prefer DIY Photography or Are Working Within a Budget\\n                               \\n            If you prefer to handle your own photography or a professional is outside your budget, here are a few simple tips to help improve your photos:\\n                               \\n            Maximize Natural Light: Aim to shoot during the day when natural light is abundant. Open all windows, use light-colored curtains, and avoid harsh overhead lights. Natural light enhances the warmth and appeal of the space, making it feel more inviting.\\n                               \\n            Use Wide Angles: When photographing rooms, use wide-angle shots to capture the entire space. This helps give viewers a sense of the room's size and layout. Avoid tight or cluttered shots, as they can make the space feel smaller than it actually is.\\n                               \\n            Focus on Clean and Tidy Staging: Before you take the photo, clear away any clutter. Neatly arrange furniture and decor to make the space look polished and functional. The simpler and more streamlined the space appears, the more likely it is to resonate with potential guests."], "property_name": "Standard Stay Property", "rating_number": 72, "expert_ratings": [75, 65, 72, 70, 74, 80, 68, 77, 68, 69, 71, 73, 76, 64, 72, 66, 74, 63, 79, 75, 67, 71, 70, 72, 66, 78, 74, 75, 66, 70, 73, 74, 74, 71, 76, 68, 76, 70, 71, 75, 79, 63, 75, 66, 73, 74, 67, 78, 74, 67, 70, 75, 71, 74, 73, 73, 72, 67, 65, 74, 78, 66, 67, 74, 69, 72, 67, 71, 68, 75, 79, 76, 73, 70, 66, 68, 76, 74, 73, 68, 75, 70, 74, 67, 71, 74, 72, 75, 74, 73, 68, 66, 79, 75, 68, 70, 72, 71, 76, 74], "rating_category": "Satisfactory"}, "interior_design": {"feedback": {"items": [{"title": "Color Palette", "feedback": "The color palette feels neutral and calming, but incorporating some accent colors could bring more vibrancy and personality to the space."}, {"title": "Furniture Arrangement", "feedback": "The furniture is functional but can be arranged for better flow and comfort. Consider creating more intimate seating areas."}, {"title": "Decor and Accents", "feedback": "Adding artwork or decorative items could personalize the space and make it feel warmer and more inviting."}, {"title": "Lighting", "feedback": "While there is some natural light, introducing varied lighting options can enhance the ambiance, especially in the evenings."}, {"title": "Outdoor Space Utilization", "feedback": "The backyard is a great feature. Consider offering outdoor seating or decor to make it more inviting for guests."}], "summary": "Your interior design has a solid foundation, but there are areas for enhancement to elevate the overall guest experience."}, "revisions": null, "suggestions": ["Incorporate accent colors into the decor for a more vibrant atmosphere.", "Rearrange furniture to improve flow and create cozy seating areas.", "Add local artwork or decorative accents to enhance the unique identity of the space.", "Enhance lighting options to improve ambiance during the evening hours.", "Create an inviting outdoor seating area in the backyard."], "property_name": "The Golden Nugget", "rating_number": 70, "expert_ratings": [59, 72, 68, 74, 69, 82, 78, 65, 83, 88, 77, 62, 79, 86, 70, 75, 67, 64, 81, 90, 72, 57, 76, 61, 66, 89, 80, 63, 71, 74, 85, 68, 60, 78, 66, 82, 73, 69, 84, 76, 81, 88, 75, 63, 84, 66, 76, 69, 81, 91, 89, 62, 65, 72, 80, 83, 60, 61, 77, 88, 65, 82, 63, 74, 68, 87, 72, 66, 70, 79, 71, 90, 75, 56, 64, 85, 68, 67, 89, 63, 63, 74, 86, 70, 60, 90, 87, 69, 73, 79, 59, 76, 65, 70, 55, 50, 88, 87, 68, 66, 71, 77, 79, 73, 85, 72, 61, 64, 75, 87, 53, 71, 89, 74], "rating_category": "Needs Work"}, "overall_ratings": {"feedback": {"items": [{"title": "Title Clarity", "feedback": "Your title, 'The Golden Nugget,' is catchy but could be improved by adding essential details such as 'Yuma' and unique features. A more informative title can instantly attract the right guests."}, {"title": "Engaging Description", "feedback": "The current listing description is satisfactory but lacks a personal touch. Sharing what makes The Golden Nugget unique and outlining local attractions can better engage potential guests."}, {"title": "Image Quality", "feedback": "While the photos provide a good view, enhancing lighting and including more unique amenities in your visuals can better represent the appeal of your property."}, {"title": "Interior Design Improvements", "feedback": "Although your interior design has a good foundation, consider incorporating vibrant accents and rearranging furniture for a cozier atmosphere."}, {"title": "Better Amenities Listing", "feedback": "Your amenities cater to basic needs; however, enhancing the outdoor space and adding more entertainment options can improve guest satisfaction."}], "summary": "Your listing has great potential, but there are multiple areas that need attention to improve its overall effectiveness. From enhancing the title to showcasing the interior and amenities better, focusing on these elements can make a significant difference in attracting bookings."}, "revisions": null, "suggestions": ["Revise the title to include location and unique features.", "Enhance the listing description by adding personal narratives and highlighting local attractions.", "Improve photo lighting and include shots of the backyard or pool area.", "Add vibrant decor to the interior and create cozy seating arrangements.", "Upgrade amenities with better outdoor fixtures and entertainment options."], "property_name": "The Golden Nugget", "rating_number": 71, "expert_ratings": [69, 74, 70, 64, 76, 67, 71, 83, 65, 72, 88, 60, 68, 64, 62, 71, 72, 76, 64, 63, 74, 71, 70, 79, 82, 78, 75, 69, 66, 84, 56, 73, 63, 67, 76, 66, 63, 62, 57, 71, 80, 68, 75, 64, 70, 74, 66, 66, 65, 78, 69, 79, 70, 85, 64, 82, 78, 73, 71, 67, 88, 65, 67, 64, 64, 82, 59, 68, 72, 70, 77, 73, 74, 67, 74, 85, 75, 71, 70, 81, 72, 69, 72, 81], "rating_category": "Satisfactory"}}	2025-04-26 20:05:45.924033
c79f0e18-5e52-4f9b-81e8-7fd69b00389d	2025-05-21 22:59:59.069842+00	d316fbad-0553-4357-998d-497d19a7dc94	{"title": {"feedback": {"items": [{"title": "Descriptive Elements", "feedback": "While the title mentions a lovely hideaway, adding more context about the studio's features could enhance its appeal."}, {"title": "Location Clarity", "feedback": "Including the location more clearly in the title may help potential guests immediately identify the convenience."}, {"title": "Unique Selling Point", "feedback": "Highlighting the private patio in a more engaging manner could make the listing stand out more in searches."}, {"title": "Target Audience", "feedback": "Consider incorporating terms that attract specific guests, like 'romantic getaway' or 'pet-friendly', to widen its appeal."}, {"title": "Character and Vibe", "feedback": "The term 'unique rustic getaway' might resonate well with a specific group of travelers and can be mentioned in the title."}], "summary": "The title effectively conveys a sense of retreat and charm but could be more appealing with additional descriptive elements."}, "revisions": ["Lovely Rustic Studio Retreat with Private Patio", "Charming Hideaway Studio Close to La Mesa Village", "Unique Studio Experience with Private Patio in La Mesa"], "suggestions": ["Consider adding a word or phrase that highlights the rustic and unique qualities of the studio.", "Include the proximity to La Mesa Village in a catchy way.", "Mention pet-friendly availability as it’s a strong selling point.", "Showcase the private patio more prominently in the title.", "Potentially simplify to 'Lovely Rustic Studio with Private Patio near La Mesa Village'."], "property_name": "Lovely Hideaway Studio by Village-Private Patio", "rating_number": 85, "expert_ratings": [76, 85, 82, 90, 87, 83, 78, 81, 76, 79, 80, 85, 88, 89, 84, 82, 90, 78, 84, 75, 87, 83, 81, 80, 72, 82, 86, 91, 88, 90, 79, 76, 85, 87, 84, 91, 92, 86, 80, 77, 82, 78, 83, 90, 88, 81, 87, 77, 75, 83, 81, 84, 86, 80, 82, 80, 88, 89, 75, 89, 85, 91, 88, 74, 89, 75, 82, 91, 84, 88, 81, 78, 76, 92, 88, 83, 85, 82, 91, 76, 79, 86, 90, 85, 87, 84, 80, 75, 78, 89, 81, 86, 90, 87, 88, 89, 92, 77, 76, 79, 81, 82, 84, 76, 78, 92, 85, 91, 88, 90, 75, 82, 88, 79, 76, 86], "title_rewrites": ["Charming Rustic Studio with Private Patio in La Mesa.", "Cozy Hideaway Studio with Private Patio Just Minutes from La Mesa Village.", "Inviting Rustic Studio Retreat with Private Patio near San Diego Attractions"], "rating_category": "Good"}, "amenities": {"feedback": {"items": [{"title": "Entertainment Options", "feedback": "The inclusion of a 43 inch HDTV with streaming services like Amazon Prime Video and Netflix is a great touch for guests looking to relax."}, {"title": "Kitchen Facilities", "feedback": "Guests will appreciate the fully equipped kitchen, allowing them to prepare their own meals with all the necessary appliances and cookware."}, {"title": "Safety Measures", "feedback": "Having multiple safety features like smoke and carbon monoxide alarms provides guests with peace of mind."}, {"title": "Outdoor Space", "feedback": "The private patio and BBQ grill offer a wonderful space for guests to enjoy the outdoors."}, {"title": "Pet Policies", "feedback": "Allowing pets adds to the appeal for animal-loving travelers, though consider enhancing this aspect."}], "summary": "Your property offers a wide range of amenities that cater to various guest needs, making it a well-rounded choice for travelers seeking a distinctive experience."}, "revisions": null, "suggestions": ["Consider adding more luxurious amenities like a hot tub.", "Enhance the outdoor space with better furniture or lighting.", "Include local guidebooks or recommendations for nearby attractions."], "property_name": "Unique Experience Stay", "rating_number": 85, "expert_ratings": [62, 54, 75, 83, 68, 72, 88, 78, 67, 61, 55, 71, 66, 80, 87, 88, 85, 76, 91, 79, 73, 84, 77, 62, 74, 69, 82, 92, 65, 88, 90, 81, 86, 64, 68, 71, 53, 57, 60, 76, 89, 88, 69, 63, 78, 71, 66, 83, 88, 82, 75, 67, 60, 63, 70, 62, 78, 81, 86, 72, 84, 89, 73, 85, 79, 80, 67, 54, 85, 91, 82, 66, 73, 75, 77, 89, 59, 62, 69, 74, 89, 86, 75, 90, 81, 88, 68, 64, 72, 89, 73, 83, 76, 61, 88, 62, 91, 81, 82, 69, 79, 65, 87, 83, 90, 66, 90, 75, 91, 88, 57], "rating_category": "Good"}, "hero_image": {"feedback": {"items": [{"title": "Inviting Atmosphere", "feedback": "The image effectively conveys a welcoming and warm vibe that aligns with your listing description."}, {"title": "Balance of Indoor and Outdoor", "feedback": "The photo does a great job of showing the transition between indoor and outdoor spaces, appealing to guests who value both comfort and nature."}, {"title": "Decor and Style", "feedback": "The decor is stylish yet cozy, with a harmonious color palette that enhances the feeling of a peaceful retreat."}], "summary": "Your hero image beautifully captures the inviting nature of your studio. The bright and airy atmosphere is well-presented, showcasing both comfort and style."}, "revisions": null, "suggestions": ["Consider adding more vibrant elements or accents to make the image pop even more.", "Ensure the lighting is balanced to avoid any potential shadowy spots that might detract from the image.", "Include a wider angle to capture more of the outdoor patio area, which could add visual interest."], "property_name": "Lovely Hideaway Studio by Village-Private Patio", "rating_number": 82, "expert_ratings": [80, 85, 81, 82, 84, 80, 83, 86, 81, 85, 82, 80, 87, 83, 81, 84, 82, 83, 88, 81, 82, 86, 84, 80, 85, 88, 82, 83, 84, 85, 81, 82, 80, 84, 83, 86, 81, 85, 80, 82, 87, 81, 83, 85, 82, 86, 80, 84, 83, 81, 87, 82, 80, 86, 85, 81, 84, 83, 82, 80, 81, 86, 84, 83, 82, 87, 81, 85, 82, 80, 84, 86, 83, 81, 82, 87, 85, 80, 84, 81, 85, 86, 83, 82, 80, 87, 81, 84, 82, 85, 86, 83, 81, 80, 82, 84, 85, 81, 87, 82], "rating_category": "Good"}, "description": {"feedback": {"items": [{"title": "Improve Structure of Description", "feedback": "Consider breaking down the description into clearer sections with headers for 'The Space', 'Neighborhood', 'Amenities', etc."}, {"title": "Detail Amenities", "feedback": "While you've listed some amenities, providing a bit more detail about what’s included can help guests understand the value."}, {"title": "Clarify Pet Policy", "feedback": "Clearly state your pet policy, specifying allowed breeds or sizes to minimize potential issues."}, {"title": "Highlight Attractions", "feedback": "Mention specific attractions and activities within nearby areas to entice your guests further."}, {"title": "Add More Visuals", "feedback": "Including more visuals in the property description can increase appeal and help guests visualize their stay."}], "summary": "Your listing presents a charming studio in a prime location, but could greatly benefit from enhanced clarity and structure to improve guest understanding."}, "revisions": null, "suggestions": ["Use bullet points for easy readability", "Add specific information about nearby attractions", "Include detailed descriptions of amenities", "Highlight unique aspects of the studio", "Use more engaging language to evoke emotions"], "property_name": "Lovely Hideaway Studio by Village-Private Patio", "rating_number": 72, "expert_ratings": [31, 47, 56, 39, 44, 68, 52, 58, 72, 70, 74, 38, 77, 51, 49, 54, 65, 76, 67, 66, 45, 40, 46, 32, 74, 33, 73, 20, 30, 22, 26, 41, 31, 62, 61, 64, 53, 55, 48, 63, 71, 37, 59, 69, 66, 35, 54, 50, 27, 32, 68, 64, 76, 57, 78, 71, 39, 34, 73, 34, 50, 31, 80, 75, 72, 61, 62, 83, 46, 47, 48, 28, 26, 60, 69, 53, 70, 80, 78, 58, 68, 55, 66, 63, 54, 90, 20, 24, 25, 42, 19, 10, 17, 77, 26, 40, 93, 30, 25, 29, 30, 60, 26, 54, 67, 72, 44, 68, 56], "rating_category": "Satisfactory", "description_rewrite": {"guest_access": "You will have your own off-street parking space and easy access to the Light Rail Trolley, making it simple to reach the bustling events in Downtown San Diego.", "your_property": "Enjoy this spacious 800 sq. ft. studio with no-step access. Equipped with a full kitchen, laundry, and your own entrance, it is a perfect blend of comfort and convenience. A private patio with dining ensures a relaxing atmosphere.", "listing_description": "Escape to our Lovely Hideaway Studio, a tranquil retreat just 5 minutes above La Mesa Village. This unique rustic getaway features a private patio, cozy queen bed, and fully-equipped kitchen. Perfectly situated for exploring downtown San Diego, beaches, and more!", "other_details_to_note": "We are excited about our upcoming spa and deck area, which is currently under construction. Rest assured, there will be no work during your stay.", "interaction_with_guests": "We live above the studio, ready to assist you with local tips and recommendations whenever you need them. Please feel free to reach out during your stay!"}}, "other_images": {"feedback": {"items": [{"title": "Lighting and Ambiance", "feedback": "The lighting in your photos is well balanced, creating a cozy and welcoming ambiance."}, {"title": "Room Composition", "feedback": "The composition of the rooms in the photos is pleasing and makes effective use of space."}, {"title": "Visual Clarity", "feedback": "Images are clear and sharp, which helps potential guests see every detail of what they can expect."}], "summary": "Your property photos convey a warm and inviting atmosphere, capturing the essence of a unique experience. Overall, they do a great job of showcasing the space and its amenities."}, "revisions": null, "suggestions": ["Consider capturing photos at different times of day to show natural lighting.", "Include a few close-up shots of unique elements that make your property stand out.", "Try adding some lifestyle photos showing the property in use to give potential guests a feel for the setting.", "Ensure all areas are tidy and organized to maintain visual appeal.", "Consider Hiring a Professional Photographer\\n                               \\n            While your photos are a good start, hiring a professional photographer could significantly elevate the visual appeal of your listing. A pro has the experience to capture your space in the best possible light, ensuring that it looks both inviting and accurate. This investment can help differentiate your property in a competitive market, where high-quality visuals can be the deciding factor for potential guests. Professional photographers are skilled in aspects like lighting, composition, and angles, which can make your property look more spacious, appealing, and true to its real-life charm.\\n                               \\n            For Those Who Prefer DIY Photography or Are Working Within a Budget\\n                               \\n            If you prefer to handle your own photography or a professional is outside your budget, here are a few simple tips to help improve your photos:\\n                               \\n            Maximize Natural Light: Aim to shoot during the day when natural light is abundant. Open all windows, use light-colored curtains, and avoid harsh overhead lights. Natural light enhances the warmth and appeal of the space, making it feel more inviting.\\n                               \\n            Use Wide Angles: When photographing rooms, use wide-angle shots to capture the entire space. This helps give viewers a sense of the room's size and layout. Avoid tight or cluttered shots, as they can make the space feel smaller than it actually is.\\n                               \\n            Focus on Clean and Tidy Staging: Before you take the photo, clear away any clutter. Neatly arrange furniture and decor to make the space look polished and functional. The simpler and more streamlined the space appears, the more likely it is to resonate with potential guests."], "property_name": "Unique Experience Stay", "rating_number": 78, "expert_ratings": [82, 77, 75, 80, 79, 76, 81, 78, 74, 83, 72, 75, 77, 79, 76, 80, 82, 74, 78, 81, 77, 75, 79, 80, 78, 81, 76, 77, 74, 82, 78, 80, 73, 81, 79, 76, 77, 80, 82, 75, 74, 81, 78, 76, 80, 77, 79, 74, 82, 78, 80, 78, 76, 79, 75, 81, 77, 76, 80, 74, 81, 79, 82, 76, 77, 80, 78, 79, 75, 81, 77, 78, 80, 74, 75, 82, 79, 80, 78, 76, 81, 77, 76, 79, 82, 78, 81, 75, 80, 74, 77, 79, 78, 82, 76, 79, 81, 74, 75, 80], "rating_category": "Satisfactory"}, "interior_design": {"feedback": {"items": [{"title": "Aesthetic Consistency", "feedback": "The interior design could benefit from more cohesive color schemes and decor styles to create a unified feel."}, {"title": "Comfort and Ambiance", "feedback": "While the rustic elements are charming, consider adding warmer lighting to enhance the cozy atmosphere."}, {"title": "Furniture Arrangement", "feedback": "Some areas feel slightly cramped due to furniture placement; optimizing layout could improve flow and function."}, {"title": "Outdoor Appeal", "feedback": "The private patio is an excellent feature, but incorporating some greenery or decor could make it more inviting."}, {"title": "Artwork and Decor", "feedback": "Adding some wall art or decorative items would provide character and enhance the visual appeal."}], "summary": "Your studio has a charming rustic atmosphere that appeals to many guests. However, a few areas need enhancement for better overall appeal."}, "revisions": null, "suggestions": ["Consider using a more cohesive color palette throughout the space to unify the design.", "Add warm lighting options to create a cozy atmosphere, especially at night.", "Rearrange furniture to allow for better movement and functionality in the space.", "Enhance the outdoor patio area with decor or green plants for increased appeal.", "Invest in some wall art or decorative accents to express personality and style."], "property_name": "Lovely Hideaway Studio by Village-Private Patio", "rating_number": 54, "expert_ratings": [78, 63, 56, 49, 61, 44, 72, 35, 71, 21, 50, 34, 60, 65, 54, 63, 32, 47, 40, 39, 68, 69, 70, 74, 69, 55, 61, 38, 74, 47, 62, 44, 66, 72, 31, 57, 51, 29, 76, 76, 41, 44, 39, 58, 36, 50, 37, 75, 77, 70, 46, 81, 23, 71, 56, 45, 38, 9, 80, 70, 55, 50, 64, 52, 60, 12, 42, 48, 61, 42, 49, 17, 29, 78, 51, 61, 57, 36, 56, 61, 26, 42, 30, 9, 22, 54, 78, 68, 74, 59, 66, 36, 57, 25, 41, 67, 38, 17, 78, 76, 30, 12, 71, 41, 35, 23, 44, 20, 57, 15, 7, 45, 22, 36, 99, 58, 88, 42], "rating_category": "Fail"}, "overall_ratings": {"feedback": {"items": [{"title": "Improve Structure of Description", "feedback": "Consider breaking down the description into clearer sections with headers for 'The Space', 'Neighborhood', 'Amenities', etc."}, {"title": "Detail Amenities", "feedback": "While you've listed some amenities, providing a bit more detail about what’s included can help guests understand the value."}, {"title": "Clarify Pet Policy", "feedback": "Clearly state your pet policy, specifying allowed breeds or sizes to minimize potential issues."}, {"title": "Highlight Attractions", "feedback": "Mention specific attractions and activities within nearby areas to entice your guests further."}, {"title": "Add More Visuals", "feedback": "Including more visuals in the property description can increase appeal and help guests visualize their stay."}], "summary": "Your listing presents a charming studio in a prime location, but could greatly benefit from enhanced clarity and structure to improve guest understanding."}, "revisions": null, "suggestions": ["Use bullet points for easy readability", "Add specific information about nearby attractions", "Include detailed descriptions of amenities", "Highlight unique aspects of the studio", "Use more engaging language to evoke emotions"], "property_name": "Lovely Hideaway Studio by Village-Private Patio", "rating_number": 77, "expert_ratings": [31, 47, 56, 39, 44, 68, 52, 58, 72, 70, 74, 38, 77, 51, 49, 54, 65, 76, 67, 66, 45, 40, 46, 32, 74, 33, 73, 20, 30, 22, 26, 41, 31, 62, 61, 64, 53, 55, 48, 63, 71, 37, 59, 69, 66, 35, 54, 50, 27, 32, 68, 64, 76, 57, 78, 71, 39, 34, 73, 34, 50, 31, 80, 75, 72, 61, 62, 83, 46, 47, 48, 28, 26, 60, 69, 53, 70, 80, 78, 58, 68, 55, 66, 63, 54, 90, 20, 24, 25, 42, 19, 10, 17, 77, 26, 40, 93, 30, 25, 29, 30, 60, 26, 54, 67, 72, 44, 68, 56], "rating_category": "Satisfactory"}}	2025-05-21 22:59:59.069842
dcbe8fc3-ffcf-4d8a-9ed6-288c7944223a	2025-05-11 00:47:39.076293+00	daf06d19-6685-4c54-8b3e-815ca5afaa1f	{"title": {"feedback": {"items": [{"title": "Descriptive Tags", "feedback": "Consider incorporating more specific descriptors that highlight unique features of your property."}, {"title": "Local Attractions", "feedback": "Including nearby attractions or activities can enhance the appeal for potential guests."}, {"title": "Room Counts", "feedback": "Highlighting the number of bedrooms and unique amenities can catch the eye of larger groups or families."}, {"title": "Vibes and Comfort", "feedback": "Emphasizing the tranquil vibe or comforts can help highlight what makes your place special."}, {"title": "Character of the Space", "feedback": "Adding a reference to a cozy or welcoming atmosphere can be beneficial."}], "summary": "Your listing title communicates a family-friendly environment near Wichita well, but there's room for improvement to make it stand out more."}, "revisions": null, "suggestions": ["Use phrases like \\"Spacious Family Retreat\\" for clarity.", "Consider mentioning specific attractions or activities in Wichita.", "Highlight kid-friendly features in more detail.", "Add an emotional touch to the title, such as \\"Your Family's Home Away From Home!\\".", "Include any unique selling points like a large backyard or playroom."], "property_name": "The Prairie Peace: Family-Friendly & Near Wichita", "rating_number": 83, "expert_ratings": [72, 65, 85, 90, 78, 88, 84, 76, 80, 74, 81, 69, 92, 87, 90, 66, 73, 82, 77, 59, 95, 68, 92, 75, 64, 72, 83, 86, 62, 70, 93, 61, 94, 79, 67, 71, 80, 61, 96, 82, 88, 87, 85, 76, 93, 64, 89, 68, 69, 61, 90, 65, 71, 72, 84, 89, 78, 91, 96, 81, 80, 69, 66, 83, 81, 74, 88, 76, 70, 59, 55, 70, 62, 97, 93, 78, 82, 83, 95, 72, 76, 88, 59, 80, 67, 61, 64, 72, 72, 63, 76, 69, 85, 66, 59, 85, 77, 90, 67, 88, 70, 75, 61, 90, 83, 84, 86, 92], "title_rewrites": ["The Prairie Peace: Spacious Family Retreat Just Outside Wichita", "Family-Friendly Gem with Huge Fenced Yard Near Wichita", "The Prairie Peace: Your Family’s Tranquil Base Near Wichita"], "rating_category": "Good"}, "amenities": {"feedback": {"items": [{"title": "Bathroom Amenities", "feedback": "The bathroom amenities are comprehensive, covering all basics like shampoo and conditioner, but adding a few luxury items could enhance the experience."}, {"title": "Family-friendly Features", "feedback": "The property is well-equipped for families with children, featuring cribs and games; however, ensuring more children's safety measures would be beneficial."}, {"title": "Entertainment Options", "feedback": "While there are books and games provided, adding streaming service access could significantly strengthen the entertainment offerings."}, {"title": "Outdoor Space", "feedback": "The outdoor area is a great feature but could benefit from more comfortable seating or lounging options."}, {"title": "Kitchen Supplies", "feedback": "The kitchen is well-equipped, yet some guests could appreciate a more extensive selection of cooking utensils and tools."}], "summary": "The amenities provided for the Premium Stay are quite impressive and cater well to a variety of guest needs. However, there is still some room for improvement to elevate the experience further."}, "revisions": null, "suggestions": ["Consider adding luxury grooming products in the bathroom for an elevated experience.", "Enhance the outdoor space with comfortable seating options for relaxation.", "Provide access to streaming services to the TV for entertainment.", "Introduce more cooking tools in the kitchen to accommodate avid cooks.", "Ensure additional safety measures for children are in place, such as more outlet covers."], "property_name": "Premium Stay", "rating_number": 79, "expert_ratings": [23, 45, 67, 79, 54, 33, 58, 73, 62, 48, 67, 74, 66, 51, 69, 76, 39, 58, 66, 81, 37, 63, 45, 29, 72, 58, 90, 39, 19, 88, 55, 34, 68, 24, 47, 94, 35, 36, 43, 20, 21, 68, 54, 69, 88, 71, 39, 67, 79, 42, 88, 18, 57, 91, 34, 72, 69, 29, 94, 65, 31, 77, 64, 99, 57, 76, 49, 87, 41, 27, 78, 59, 62, 58, 25, 64, 56, 34, 49, 79, 91, 84, 85, 48, 53, 91, 36, 81, 21, 30, 35, 41, 10, 68, 43, 89, 33, 85, 51, 46, 49, 61, 81, 40, 70, 13, 91, 24, 26, 57, 82, 75, 77, 40], "rating_category": "Satisfactory"}, "hero_image": {"feedback": {"items": [{"title": "Inviting Atmosphere", "feedback": "The color scheme and decor create a warm and inviting feel, perfect for attracting families."}, {"title": "Functional and Modern", "feedback": "The modern appliances and spacious design make it appealing for guests looking to enjoy extended stays."}, {"title": "Well-lit and Spacious", "feedback": "The ample lighting and open layout ensure that the space feels airy and comfortable."}], "summary": "This vibrant kitchen image beautifully reflects the family-friendly and welcoming nature of the property, with its bright and inviting decor."}, "revisions": null, "suggestions": ["Add a photo of the backyard to showcase the family and pet-friendly space.", "Include images of the kids' playroom to highlight child-friendly amenities.", "Display the bedrooms to emphasize sleeping arrangements for large families."], "property_name": "The Prairie Peace: Family-Friendly & Near Wichita", "rating_number": 87, "expert_ratings": [89, 92, 88, 85, 90, 87, 92, 85, 86, 87, 88, 89, 91, 90, 89, 85, 88, 90, 86, 93, 84, 91, 87, 85, 89, 88, 88, 89, 90, 92, 93, 87, 90, 85, 92, 88, 89, 90, 89, 85, 86, 91, 87, 88, 90, 85, 91, 89, 87, 92, 93, 84, 90, 85, 86, 90, 88, 87, 89, 91, 85, 90, 89, 87, 88, 89, 90, 91, 87, 88, 92, 85, 90, 86, 89, 90, 88, 85, 93, 84, 86, 89, 88, 90, 91, 87, 90, 85, 92, 88, 89, 90, 87, 88, 86, 91, 85, 90, 89, 90], "rating_category": "Good"}, "description": {"feedback": {"items": [{"title": "Title Appeal", "feedback": "The title is catchy, but adding specifics about the unique offerings might enhance it further."}, {"title": "Space Description", "feedback": "The space description effectively conveys tranquility, yet detailing more about the layout or special features would enrich it."}, {"title": "Guest Access Clarity", "feedback": "Guest access is clear, but mentioning any unique entry features or additional areas would be beneficial."}], "summary": "Your property description captures a welcoming family atmosphere and essential amenities well! However, a few improvements could make it even more appealing."}, "revisions": null, "suggestions": ["Expand on the unique features of the backyard, like any games or kids' activities available outside.", "Include testimonials about children's activities, if any were held successfully.", "Mention any nearby attractions or parks that are great for families."], "property_name": "The Prairie Peace: Family-Friendly & Near Wichita", "rating_number": 80, "expert_ratings": [72, 88, 70, 85, 83, 77, 89, 68, 91, 76, 80, 66, 78, 73, 81, 82, 69, 90, 84, 75, 79, 67, 72, 88, 70, 85, 83, 77, 89, 68, 91, 76, 80, 66, 78, 73, 81, 82, 69, 90, 84, 75, 79, 67, 74, 87, 65, 93, 66, 75, 67, 76, 71, 88, 84, 73, 64, 79, 92, 81, 70, 83, 86, 76, 74, 89, 67, 88, 71, 76, 95, 82, 69, 77, 78, 82, 80, 71, 87, 66, 90, 70, 76, 71, 85, 88, 72, 69, 94, 66, 78, 85, 79, 94, 73, 77, 81, 68, 92, 80, 75, 69, 68, 72, 85, 91, 89, 90, 92, 65, 66, 75, 73, 66, 76, 88, 81, 82, 83, 70, 79, 75, 67, 81, 85, 75, 82], "rating_category": "Satisfactory", "description_rewrite": {"guest_access": "Guests enjoy full access to the entire house including the expansive backyard, full kitchen, and laundry facilities. Our main living areas are designed with comfort in mind, while the kids' playroom is filled with engaging toys, books, and games for endless fun.", "your_property": "This spacious home encompasses over 2200 sq ft, making it perfect for families and pets. The well-designed layout includes a large playroom and versatile office space, ensuring everyone can enjoy their own relaxation or fun time. Ideal for family bonding in a stress-free environment!", "listing_description": "Welcome to The Prairie Peace, your ideal family retreat just minutes from Wichita, KS! With 5 spacious bedrooms, a flexible office space, and a large fenced backyard, this tranquil hideaway is designed for family fun and relaxation. Kid-friendly rooms filled with toys and games make this home perfect for all ages. Book your family getaway today!", "other_details_to_note": "Please note that while the backyard is fully fenced, it’s still advisable to keep an eye on younger kids during outdoor play.", "interaction_with_guests": "We love hosting families! You can reach out any time if you have questions or need recommendations during your stay."}}, "other_images": {"feedback": {"items": [{"title": "Vibrant Colors", "feedback": "The use of vibrant colors in your decor and paint enhance the photos tremendously."}, {"title": "Lighting", "feedback": "The lighting is well-done, providing a bright and welcoming feel in each image."}, {"title": "Composition", "feedback": "Your composition is effective, making the spaces look inviting and well-organized."}], "summary": "Your property's photos are captivating and showcase the home beautifully. The colors and lighting really make each room stand out."}, "revisions": null, "suggestions": ["Consider adding some evening or night-time photos to showcase the ambiance.", "Include some detail shots of unique decor elements to intrigue potential guests.", "Try using a wide-angle lens for some shots to give a broader view of the spaces.", "Consider Hiring a Professional Photographer\\n                               \\n            While your photos are a good start, hiring a professional photographer could significantly elevate the visual appeal of your listing. A pro has the experience to capture your space in the best possible light, ensuring that it looks both inviting and accurate. This investment can help differentiate your property in a competitive market, where high-quality visuals can be the deciding factor for potential guests. Professional photographers are skilled in aspects like lighting, composition, and angles, which can make your property look more spacious, appealing, and true to its real-life charm.\\n                               \\n            For Those Who Prefer DIY Photography or Are Working Within a Budget\\n                               \\n            If you prefer to handle your own photography or a professional is outside your budget, here are a few simple tips to help improve your photos:\\n                               \\n            Maximize Natural Light: Aim to shoot during the day when natural light is abundant. Open all windows, use light-colored curtains, and avoid harsh overhead lights. Natural light enhances the warmth and appeal of the space, making it feel more inviting.\\n                               \\n            Use Wide Angles: When photographing rooms, use wide-angle shots to capture the entire space. This helps give viewers a sense of the room's size and layout. Avoid tight or cluttered shots, as they can make the space feel smaller than it actually is.\\n                               \\n            Focus on Clean and Tidy Staging: Before you take the photo, clear away any clutter. Neatly arrange furniture and decor to make the space look polished and functional. The simpler and more streamlined the space appears, the more likely it is to resonate with potential guests."], "property_name": "Premium Stay", "rating_number": 85, "expert_ratings": [93, 89, 87, 85, 84, 90, 88, 86, 92, 89, 84, 83, 81, 82, 88, 86, 87, 85, 90, 89, 87, 85, 87, 88, 82, 81, 80, 82, 88, 86, 87, 90, 89, 85, 87, 84, 83, 82, 85, 87, 85, 86, 88, 87, 80, 85, 82, 83, 92, 91, 89, 82, 81, 80, 85, 87, 88, 90, 92, 91, 86, 89, 82, 83, 80, 81, 87, 85, 86, 84, 83, 82, 87, 86, 85, 82, 83, 82, 89, 90, 88, 86, 87, 89, 85, 86, 83, 82, 85, 87, 88, 86, 85, 84, 88, 89, 85, 83, 82, 80, 81, 87, 86, 85], "rating_category": "Good"}, "interior_design": {"feedback": {"items": [{"title": "Color Scheme", "feedback": "The use of soothing and uplifting colors throughout the space fosters a comforting environment for families."}, {"title": "Kid-Centric Design", "feedback": "Rooms filled with toys, games, and engaging decor create an enjoyable atmosphere for younger guests."}, {"title": "Functional Layout", "feedback": "The spacious layout promotes family interaction while allowing for personal retreat in the bedrooms."}, {"title": "Outdoor Area", "feedback": "A fully fenced backyard provides a secure and playful environment for kids and pets alike."}, {"title": "Sentimental Touches", "feedback": "Personal decorations and family-oriented themes enhance the homely feel and resonate with a family audience."}], "summary": "The interior design of The Prairie Peace successfully caters to families, offering a welcoming and functional space. The family-oriented features and playful elements make it a delightful retreat."}, "revisions": null, "suggestions": ["Incorporate more vibrant decorative accents to enhance warmth and personality.", "Consider additional multifunctional seating to accommodate families during gatherings.", "Add personalized artwork in the children's play area for a unique touch.", "Ensure toys are neatly organized for easy access and limiting clutter.", "Provide a selection of family-themed games or resources to enrich the guests' experience."], "property_name": "The Prairie Peace: Family-Friendly & Near Wichita", "rating_number": 67, "expert_ratings": [41, 58, 88, 76, 57, 29, 62, 68, 47, 44, 50, 59, 69, 74, 66, 55, 28, 67, 83, 52, 91, 45, 36, 31, 86, 49, 77, 93, 61, 87, 75, 64, 70, 35, 58, 84, 80, 33, 82, 66, 51, 73, 39, 53, 54, 76, 90, 30, 60, 28, 92, 62, 43, 11, 15, 78, 17, 14, 71, 92, 56, 65, 22, 63, 85, 13, 12, 23, 32, 25, 34, 38, 21, 42, 24, 2, 4, 10, 81, 48, 19, 15, 37, 1, 23, 24, 42, 40, 22, 23, 8, 9, 10, 18, 54, 20, 22, 17, 25, 23, 35, 15, 39, 43, 31], "rating_category": "Needs Work"}, "overall_ratings": {"feedback": {"items": [{"title": "Title Appeal", "feedback": "While your title is clear, enhancing it with specific descriptors relating to your unique selling points could make a stronger impact."}, {"title": "Property Description", "feedback": "Your description effectively conveys the welcoming nature of the property; however, including more details about the layout and unique attributes would enrich it further."}, {"title": "Amenities Offered", "feedback": "The amenities are commendable, yet there's room to add luxury items and enhance family-friendly elements to upgrade guest experiences."}, {"title": "Interior Design", "feedback": "The decor and design work well for families, but extra vibrancy and personal touches are needed for a more inviting atmosphere."}, {"title": "Photography Quality", "feedback": "The images are captivating, but showcasing additional angles and unique features of the property will enhance visual appeal."}], "summary": "Overall, your listing does a good job in presenting a family-friendly atmosphere near Wichita, but there’s potential for improvement across various aspects to elevate its appeal."}, "revisions": null, "suggestions": ["Add more descriptive language in the title such as 'Spacious Family Retreat' to clarify the unique offerings.", "Enhance the property description by detailing the room layout and special features.", "Incorporate touches that highlight family-friendly aspects and safety measures.", "Consider professional photography for more polished images that can catch guest attention better.", "Include references to nearby attractions or activities to attract bookings from families."], "property_name": "The Prairie Peace: Family-Friendly & Near Wichita", "rating_number": 81, "expert_ratings": [79, 83, 75, 88, 75, 82, 81, 84, 78, 86, 80, 89, 85, 80, 77, 91, 90, 76, 83, 74, 88, 82, 90, 78, 86, 88, 85, 92, 81, 87, 83, 89, 78, 90, 92, 75, 86, 82, 76, 80, 84, 79, 83, 78, 81, 75, 74, 81, 86, 84, 86, 82, 90, 77, 84, 91, 79, 76, 77, 85, 77, 86, 79, 86, 80, 86, 72, 81, 88, 82, 97, 81, 90, 84, 84, 79, 92, 80, 82, 85, 82, 85, 87, 88, 89, 90, 92, 81, 80, 88, 76, 95, 89, 90, 82, 72, 68, 83, 85, 84, 76, 82, 87, 88, 84], "rating_category": "Good"}}	2025-05-11 00:47:39.076293
2d7e593d-64b3-4cfb-8e6e-3fd2c43cb924	2025-09-19 23:37:47.20603+00	b8860c9b-0b4f-4ea2-bcab-36dadf86f39e	{"title": {"feedback": {"items": [{"title": "Unique Selling Points", "feedback": "The mention of \\"Private Forest Retreat\\" is intriguing and sets it apart. Consider making \\"1 Mile to Beach\\" more prominent."}, {"title": "Clarity", "feedback": "The use of symbols like '~' can confuse potential guests. Spell out words for clarity."}, {"title": "Descriptive Language", "feedback": "Think about incorporating language that evokes emotions or experiences, such as 'Serene' or 'Adventure-Ready'."}], "summary": "Your title effectively highlights the property's unique features, but could benefit from clearer language and more enticing descriptors."}, "revisions": ["Discover the Ultimate 5BR Forest Retreat – 1 Mile from Beach!", "Experience Luxury & Fun in 5BR Forest Retreat, 1 Mile from Ocean!", "Your 5BR Adventure Awaits – Unique Forest Retreat, Steps to Beach!"], "suggestions": ["Remove symbols for better clarity.", "Use more descriptive language to evoke emotion.", "Highlight proximity to attractions more effectively.", "Incorporate language that speaks to relaxation or adventure.", "Consider emphasizing luxury or unique amenities."], "property_name": "5BR~Unique~Private Forest Retreat~1 Mile to Beach!", "rating_number": 81, "expert_ratings": [77, 65, 79, 80, 84, 88, 63, 90, 74, 67, 72, 91, 76, 83, 68, 75, 82, 71, 87, 66, 62, 78, 81, 60, 69, 84, 85, 66, 82, 80, 73, 81, 79, 75, 88, 90, 86, 70, 89, 62, 81, 77, 65, 67, 88, 90, 84, 72, 78, 66, 81, 83, 70, 76, 89, 94, 74, 81, 85, 80, 68, 75, 63, 88, 73, 88, 74, 67, 87, 60, 68, 86, 70, 63, 91, 84, 65, 78, 63, 76, 80, 71, 68, 74, 82, 85, 76, 74, 91, 69, 70, 81, 88, 62, 91, 78, 84, 69, 72, 90, 92, 66, 67, 74, 83, 81, 67], "title_rewrites": ["5BR Serene Forest Retreat – Just 1 Mile to Beach!", "Unique 5BR Getaway in Enchanting Forest, 1 Mile to the Beach!", "Luxury 5BR Private Escape – Adventure & Relaxation Await!"], "rating_category": "Good"}, "amenities": {"feedback": {"items": [{"title": "Diverse Family Options", "feedback": "You have an impressive selection of family-friendly amenities, including cribs and children's toys."}, {"title": "Entertainment Variety", "feedback": "The variety of entertainment options like the movie theater and pool table makes your property very appealing."}, {"title": "Kitchen Facilities", "feedback": "The well-equipped kitchen allows guests to prepare their own meals, enhancing their stay."}, {"title": "Safety Measures", "feedback": "The inclusion of safety devices such as smoke alarms and first aid kits assures a safe environment."}, {"title": "Outdoor Space", "feedback": "The private patio and garden area with a fire pit are fantastic additions for outdoor enjoyment."}], "summary": "Your property offers a wide range of luxurious amenities, catering well to families and leisure seekers. However, there are minor areas for improvement."}, "revisions": null, "suggestions": ["Consider adding more outdoor seating options to enhance guest comfort.", "A small fitness area could be a good addition to attract fitness-conscious travelers.", "Improving the decor in common areas could elevate the luxury feel of the property."], "property_name": "Luxury Stay", "rating_number": 83, "expert_ratings": [88, 75, 82, 90, 78, 81, 80, 85, 84, 89, 76, 74, 87, 83, 79, 82, 81, 78, 84, 77, 85, 76, 90, 92, 81, 83, 77, 75, 88, 86, 82, 91, 82, 80, 89, 87, 76, 83, 79, 85, 74, 92, 81, 88, 90, 84, 80, 78, 94, 70, 79, 84, 85, 89, 78, 80, 82, 87, 90, 80, 75, 88, 76, 83, 87, 82, 90, 86, 79, 85, 88, 84, 87, 81, 90, 74, 73, 77, 86, 75, 89, 94, 84, 81, 76, 80, 78, 81, 79, 75, 88, 77, 83, 76, 85, 87, 89, 82, 90, 93, 85], "rating_category": "Good"}, "hero_image": {"feedback": {"items": [{"title": "Inviting Outdoor Space", "feedback": "Your hero image does a great job showcasing the lush outdoor area, highlighting the mature trees, deck space, and entertainment spots."}, {"title": "Vibrant and Playful Setup", "feedback": "The inclusion of games like ping pong and cornhole adds a sense of playfulness, inviting guests to imagine themselves enjoying this space."}, {"title": "Natural and Serene Environment", "feedback": "The presence of mature trees and greenery adds a serene, natural feel to the retreat, aligning perfectly with the property's theme."}], "summary": "Your property shines with outdoor appeal and versatile amenities that invite relaxation and play. Featuring an inviting deck, lush greenery, and vibrant entertainment areas, your hero image captures the essence of a vacation retreat."}, "revisions": null, "suggestions": ["Capture a closer angle of the pool area to emphasize relaxation offerings.", "Show a nighttime view with ambient lighting for a cozy vibe.", "Include a view showcasing the property's proximity to the beach.", "Feature a close-up of the recreational amenities like the pickleball court.", "Highlight interior features like the game room or gourmet kitchen."], "property_name": "5BR~Unique~Private Forest Retreat~1 Mile to Beach!", "rating_number": 85, "expert_ratings": [85, 82, 87, 88, 86, 82, 89, 84, 80, 83, 90, 85, 88, 87, 82, 86, 89, 83, 84, 88, 87, 85, 89, 82, 83, 84, 87, 88, 86, 85, 80, 89, 90, 82, 85, 88, 87, 83, 84, 85, 86, 88, 87, 82, 83, 84, 84, 85, 82, 87, 88, 89, 90, 85, 88, 87, 82, 86, 83, 84, 89, 80, 88, 85, 82, 87, 88, 86, 85, 89, 82, 83, 88, 87, 84, 85, 82, 89, 86, 87, 88, 85, 83, 84, 88, 87, 83, 82, 89, 80, 85, 87, 88, 86, 89, 82, 84, 83, 88, 85], "rating_category": "Good"}, "description": {"feedback": {"items": [{"title": "Clarity of Amenities", "feedback": "You clearly describe a wide range of amenities, which is fantastic for attracting guests."}, {"title": "Appeal of Location", "feedback": "Mentioning the proximity to beaches adds value and appeal for travelers."}, {"title": "Family-Friendly Features", "feedback": "The focus on family-friendly features, such as pack-and-play and high chair, is a major plus."}, {"title": "Unique Selling Points", "feedback": "Your unique offerings, like stand-up paddleboards and kayaks, make your property stand out!"}, {"title": "Potential Negative Experience Notes", "feedback": "Addressing the leaves in the pool is transparent, but try to emphasize that it won't detract from the overall experience."}], "summary": "Your listing effectively highlights the unique amenities and spaciousness of the property, making it appealing to potential guests."}, "revisions": null, "suggestions": ["Enhance the description of outdoor spaces and seating areas for improved visibility.", "Consider using bullet points for amenities to enrich readability.", "Emphasize nearby attractions and activities to entice broader traveler interests.", "Revise the note about leaves to focus on the positives of nature versus potential negatives.", "Include local dining options or events to provide guests with more planning information."], "property_name": "Seminole Oak & Ocean Retreat", "rating_number": 86, "expert_ratings": [32, 48, 70, 65, 75, 56, 82, 48, 21, 69, 35, 83, 47, 36, 85, 77, 92, 66, 64, 37, 43, 81, 68, 64, 41, 39, 60, 34, 35, 71, 44, 56, 31, 28, 74, 41, 16, 59, 73, 86, 57, 41, 40, 55, 41, 30, 62, 59, 69, 78, 37, 58, 54, 85, 70, 48, 27, 99, 73, 45, 35, 58, 60, 28, 41, 66, 77, 64, 49, 78, 50, 30, 92, 98, 88, 67, 35, 34, 42, 99, 94, 73, 47, 54, 64, 82, 46, 73, 29, 67, 50, 76, 42, 52, 85, 78, 74, 76, 31, 66, 91, 65, 88, 42, 95, 63, 21, 35, 52, 92, 35], "rating_category": "Good", "description_rewrite": {"guest_access": "Guests will enjoy full access to the property, excluding a locked owners closet.", "your_property": "Spanning 3,000 sq. ft., this retreat accommodates up to 16 guests with 5 spacious bedrooms and 3 baths, nestled in a tranquil neighborhood filled with mature oak and pine trees, creating the perfect environment for leisure and play.", "listing_description": "Discover the BRAND NEW Oak & Ocean Retreat in sunny Seminole, FL! This luxurious 5-bedroom oasis is just 1 mile from stunning beaches, featuring ample amenities for your beachside getaway. Enjoy 4 beach cruisers, 2 inflatable paddleboards, and 2 kayaks to immerse yourself in the crystal-clear waters while surrounded by serene forest views. Whether relaxing by the pool or enjoying our speakeasy-inspired game room, this retreat offers the ultimate blend of relaxation and adventure!", "other_details_to_note": "The property is surrounded by nature, which may lead to occasional leaves in the pool despite our efforts to keep it tidy with automated skimmers. We encourage you to embrace the natural charm and utilize the tools we provide for maintenance.", "interaction_with_guests": "We pride ourselves on providing a memorable experience, so we're available for any queries through messaging, ensuring you have everything you need for a fantastic stay."}}, "other_images": {"feedback": {"items": [{"title": "Vibrant Colors", "feedback": "The color palette in your photos is eye-catching and adds a vibrant feel to the property. This is ideal for conveying a lively and upscale environment."}, {"title": "Composition", "feedback": "The composition of the images is well thought out, capturing the essence and uniqueness of your property. It allows potential guests to virtually navigate the space smoothly."}, {"title": "Lighting", "feedback": "The lighting in the photos is just right—natural and enhances the space without overwhelming it. This balance helps in depicting realistic and appealing views."}], "summary": "Your property photos are vibrant, well-composed, and truly highlight the luxury aspect of your stay. They showcase the amenities effectively and create an inviting atmosphere."}, "revisions": null, "suggestions": ["Incorporate some interior shots to give a complete view of the property.", "Add some close-up shots to highlight luxury features like materials or textures.", "Consider using twilight shots more prominently to enhance elegance.", "Include a variety of angles for key features to offer a fuller perspective.", "Consider Hiring a Professional Photographer\\n                               \\n            While your photos are a good start, hiring a professional photographer could significantly elevate the visual appeal of your listing. A pro has the experience to capture your space in the best possible light, ensuring that it looks both inviting and accurate. This investment can help differentiate your property in a competitive market, where high-quality visuals can be the deciding factor for potential guests. Professional photographers are skilled in aspects like lighting, composition, and angles, which can make your property look more spacious, appealing, and true to its real-life charm.\\n                               \\n            For Those Who Prefer DIY Photography or Are Working Within a Budget\\n                               \\n            If you prefer to handle your own photography or a professional is outside your budget, here are a few simple tips to help improve your photos:\\n                               \\n            Maximize Natural Light: Aim to shoot during the day when natural light is abundant. Open all windows, use light-colored curtains, and avoid harsh overhead lights. Natural light enhances the warmth and appeal of the space, making it feel more inviting.\\n                               \\n            Use Wide Angles: When photographing rooms, use wide-angle shots to capture the entire space. This helps give viewers a sense of the room's size and layout. Avoid tight or cluttered shots, as they can make the space feel smaller than it actually is.\\n                               \\n            Focus on Clean and Tidy Staging: Before you take the photo, clear away any clutter. Neatly arrange furniture and decor to make the space look polished and functional. The simpler and more streamlined the space appears, the more likely it is to resonate with potential guests."], "property_name": "Luxury Stay", "rating_number": 85, "expert_ratings": [89, 85, 87, 90, 86, 88, 84, 86, 88, 85, 87, 86, 85, 88, 89, 90, 87, 85, 86, 84, 88, 89, 86, 85, 87, 90, 89, 85, 88, 87, 86, 85, 89, 84, 87, 86, 88, 85, 87, 86, 90, 89, 87, 88, 85, 86, 87, 84, 90, 89, 88, 87, 86, 85, 88, 89, 87, 85, 86, 88, 84, 90, 89, 85, 87, 86, 88, 89, 87, 84, 86, 85, 90, 88, 89, 86, 87, 85, 88, 84, 90, 89, 87, 86, 88, 85, 84, 87, 90, 89, 86, 85, 87, 88, 89, 86, 90, 85, 86, 88], "rating_category": "Good"}, "interior_design": {"feedback": {"items": [{"title": "Interior decor", "feedback": "The decor reflects a cozy retreat vibe, but consider incorporating brighter colors or local artwork for a more vibrant atmosphere."}, {"title": "Space utilization", "feedback": "While the layout is spacious, the furniture arrangement in certain rooms may benefit from adjustments for better flow and accessibility."}, {"title": "Outdoor space", "feedback": "The outdoor features are fantastic, but adding some additional lounge furniture or decorative elements could really enhance the guest experience."}, {"title": "Lighting options", "feedback": "Some areas could use improved lighting, particularly in the living areas and outdoor spaces for evening use."}, {"title": "Kitchen design", "feedback": "The kitchen is well-equipped, but consider upgrading countertops to a more modern style to match the luxury theme."}], "summary": "Your property features an interesting blend of luxury and nature, providing a unique retreat feel. However, some areas could use further enhancement."}, "revisions": null, "suggestions": ["Incorporate more local artwork to enhance the visual appeal of the interiors.", "Adjust furniture arrangements for better flow in communal areas.", "Add more outdoor lounge furniture for relaxation and comfort.", "Improve the lighting in key areas to create a cozier atmosphere.", "Upgrade kitchen countertops to elevate the luxury feel of the space."], "property_name": "5BR~Unique~Private Forest Retreat~1 Mile to Beach!", "rating_number": 72, "expert_ratings": [22, 45, 63, 35, 76, 80, 54, 67, 49, 88, 31, 40, 44, 57, 73, 62, 69, 72, 38, 53, 53, 55, 58, 81, 66, 34, 50, 55, 50, 58, 55, 59, 46, 37, 88, 66, 59, 48, 77, 43, 89, 33, 64, 71, 59, 47, 69, 74, 78, 79, 41, 73, 57, 57, 64, 35, 18, 53, 57, 67, 22, 84, 87, 23, 36, 31, 55, 46, 28, 24, 76, 63, 48, 98, 25, 37, 29, 72, 63, 69, 41, 66, 54, 30, 41, 61, 64, 51, 36, 43, 36, 26, 29, 95, 48, 49, 62, 55, 39, 35, 86, 69, 20, 93, 30, 94], "rating_category": "Satisfactory"}, "overall_ratings": {"feedback": {"items": [{"title": "Unique Selling Points", "feedback": "The mention of \\"Private Forest Retreat\\" is intriguing and sets it apart. Consider making \\"1 Mile to Beach\\" more prominent."}, {"title": "Clarity", "feedback": "The use of symbols like '~' can confuse potential guests. Spell out words for clarity."}, {"title": "Descriptive Language", "feedback": "Think about incorporating language that evokes emotions or experiences, such as 'Serene' or 'Adventure-Ready'."}], "summary": "Your title effectively highlights the property's unique features, but could benefit from clearer language and more enticing descriptors."}, "revisions": ["Discover the Ultimate 5BR Forest Retreat – 1 Mile from Beach!", "Experience Luxury & Fun in 5BR Forest Retreat, 1 Mile from Ocean!", "Your 5BR Adventure Awaits – Unique Forest Retreat, Steps to Beach!"], "suggestions": ["Remove symbols for better clarity.", "Use more descriptive language to evoke emotion.", "Highlight proximity to attractions more effectively.", "Incorporate language that speaks to relaxation or adventure.", "Consider emphasizing luxury or unique amenities."], "property_name": "5BR~Unique~Private Forest Retreat~1 Mile to Beach!", "rating_number": 82, "expert_ratings": [77, 65, 79, 80, 84, 88, 63, 90, 74, 67, 72, 91, 76, 83, 68, 75, 82, 71, 87, 66, 62, 78, 81, 60, 69, 84, 85, 66, 82, 80, 73, 81, 79, 75, 88, 90, 86, 70, 89, 62, 81, 77, 65, 67, 88, 90, 84, 72, 78, 66, 81, 83, 70, 76, 89, 94, 74, 81, 85, 80, 68, 75, 63, 88, 73, 88, 74, 67, 87, 60, 68, 86, 70, 63, 91, 84, 65, 78, 63, 76, 80, 71, 68, 74, 82, 85, 76, 74, 91, 69, 70, 81, 88, 62, 91, 78, 84, 69, 72, 90, 92, 66, 67, 74, 83, 81, 67], "rating_category": "Good"}}	2025-09-19 23:37:47.20603
\.


--
-- Data for Name: scan_mismatches; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.scan_mismatches (id, created_at, profile_id, property_id, mismatch_date, message, scan_id) FROM stdin;
\.


--
-- Data for Name: scans; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.scans (id, created_at, profile_id, property_id, has_mismatch) FROM stdin;
\.


--
-- Data for Name: str_properties; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.str_properties (id, created_at, address, title, city, state, zip, url, external_id, description, user_id, parent_id, is_parent, amenities, hero_image_link, other_image_links) FROM stdin;
aacf9d9d-6e54-47fe-b752-643e27df6d41	2025-04-27 04:28:16.580493+00		Updated Mountain Home w/ AC, Hot Tub\nShare\nSave				www.airbnb.com/rooms/804497309451316843	804497309451316843	Forget your worries in this natural light-filled and serene space. Enjoy being nestled in the forest with two decks, a spa for six, two living rooms with flat screen TV's, one being 70 inches, and a fully stocked kitchen. Rest well in bedrooms with memory foam mattresses, comfy linens, and white noise machines. Only a short drive to Blue Jay or LakeArrowhead Village and a few minutes walk to a ridge hike with breathtaking distant views.\n\nThe space\nUpstairs has a living area with a large cushy sectional,  a dining table for 6,  a spacious fully stocked kitchen, and a half bath with laundry. Downstairs has a living area with 3 bedrooms, a full bath and master bath and a hot tub on the deck. Both floors have decks.\n\nGuest access\nAccess to all of the house and decks\n\nRegistration number\nCESTRP-2023-00177\nShow more	9622ec62-4edb-4c3d-ba47-d9f7b78b098e	\N	t	["Bathroom","Bathtub","Hair dryer","Cleaning products","Chemical Free shampoo","Chemical Free conditioner","Chemical Free body soap","Hot water","Shower gel","Bedroom and laundry","Free washer – In unit","Free dryer – In unit","Essentials","Towels, bed sheets, soap, and toilet paper","Hangers","Bed linens","Cotton linens","Extra pillows and blankets","Room-darkening shades","Iron","Clothing storage: closet and dresser","Entertainment","70 inch HDTV with Disney+, Netflix, Amazon Prime Video","Family","Pack ’n play/Travel crib - always at the listing","Sheets provided","Children’s books and toys for ages 2-5 years old and 5-10 years old","Clamp on table seat high chair - always at the listing","With food tray","Children’s dinnerware","Fireplace guards","Board games","Heating and cooling","Air conditioning","Indoor fireplace","Ceiling fan","Central heating","Home safety","Exterior security cameras on property","There is a security camera on the exterior of the front door.","Smoke alarm","Carbon monoxide alarm","Fire extinguisher","First aid kit","Internet and office","Wifi","Dedicated workspace","In a room with a door","Kitchen and dining","Kitchen","Space where guests can cook their own meals","Refrigerator","Microwave","Cooking basics","Pots and pans, oil, salt and pepper","Dishes and silverware","Bowls, chopsticks, plates, cups, etc.","Freezer","Dishwasher","Stainless steel gas stove","Stainless steel oven","Hot water kettle","Coffee maker: drip coffee maker","Wine glasses","Toaster","Baking sheet","Blender","Rice maker","Dining table","Outdoor","Private patio or balcony","Backyard","An open space on the property usually covered in grass","Outdoor furniture","Parking and facilities","Free parking on premises","Free street parking","Private hot tub","Services","Long term stays allowed","Allow stay for 28 days or more"]	https://a0.muscache.com/im/pictures/miso/Hosting-804497309451316843/original/7bc1ee10-4f7a-4314-b0dd-c0a3ad04acd6.jpeg?im_w=720	["https://a0.muscache.com/im/pictures/miso/Hosting-804497309451316843/original/7bc1ee10-4f7a-4314-b0dd-c0a3ad04acd6.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-804497309451316843/original/f643867c-cbb7-4358-bc40-cab98d46f35d.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-804497309451316843/original/347f81ac-583c-476e-a0ee-bcd35f46fe05.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-804497309451316843/original/281447b8-7a03-48ca-a728-8617dc435fe6.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-804497309451316843/original/0af086ee-a778-40ff-8692-2cd3efdfb8d5.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-804497309451316843/original/1d0be6e5-456c-448f-ba2b-ed584812828c.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-804497309451316843/original/d5af15b1-4da5-4516-98cc-0adb6c18f68f.jpeg?im_w=720"]
bb656334-8907-45b9-8e49-d29359a42e7b	2025-05-04 14:58:15.348974+00		Cozy two bedroom home with free parking\nShare\nSave				www.airbnb.com/rooms/52567245	52567245	This unique place has a style all its own, equipped  with everything you will need to make your vacation complete.	9622ec62-4edb-4c3d-ba47-d9f7b78b098e	\N	t	["Bathroom","Bathtub","Cleaning products","Shampoo","Bath and body works body soap","Hot water","Bedroom and laundry","Free washer – In unit","Free dryer – In unit","Essentials","Towels, bed sheets, soap, and toilet paper","Hangers","Bed linens","Cotton linens","Extra pillows and blankets","Iron","Entertainment","HDTV with Amazon Prime Video","Books and reading material","Family","Board games","Heating and cooling","Ceiling fan","Radiant heating","Home safety","Exterior security cameras on property","I have one security camera outside on garage","Smoke alarm","Carbon monoxide alarm","Fire extinguisher","First aid kit","Internet and office","Wifi","Dedicated workspace","In a common space with an office chair and table","Kitchen and dining","Kitchen","Space where guests can cook their own meals","Refrigerator","Microwave","Cooking basics","Pots and pans, oil, salt and pepper","Dishes and silverware","Bowls, chopsticks, plates, cups, etc.","Freezer","Stainless steel gas stove","Stainless steel oven","Hot water kettle","Coffee maker: drip coffee maker","Wine glasses","Toaster","Baking sheet","Blender","Rice maker","Barbecue utensils","Grill, charcoal, bamboo skewers/iron skewers, etc.","Dining table","Coffee","Outdoor","Private patio or balcony","Private backyard – Fully fenced","An open space on the property usually covered in grass","Outdoor furniture","Outdoor dining area","BBQ grill","Parking and facilities","Free parking on premises","Single level home","No stairs in home","Not included","Unavailable: Air conditioning","Air conditioning"]	https://a0.muscache.com/im/pictures/34520429-8aea-4005-bb90-d0c6e6b0e45e.jpg?im_w=720	["https://a0.muscache.com/im/pictures/34520429-8aea-4005-bb90-d0c6e6b0e45e.jpg?im_w=720", "https://a0.muscache.com/im/pictures/2b347ff7-e875-4cd2-b10f-89169e85b11b.jpg?im_w=720", "https://a0.muscache.com/im/pictures/f6fd7048-7c5d-49fb-85fd-e29cffa047c0.jpg?im_w=720", "https://a0.muscache.com/im/pictures/810773ef-7f87-45a5-b95f-f0270e9e02fc.jpg?im_w=720", "https://a0.muscache.com/im/pictures/9424e59e-2f59-49f3-8e25-347056481e2f.jpg?im_w=720", "https://a0.muscache.com/im/pictures/948b2f35-f651-45f4-b1b3-96ab965ec3a3.jpg?im_w=720", "https://a0.muscache.com/im/pictures/2bf612c2-07d4-4a56-ae92-8fb1e114d429.jpg?im_w=720", "https://a0.muscache.com/im/pictures/c52f19be-bcee-4c30-bb1c-12b78a0aa9bb.jpg?im_w=720", "https://a0.muscache.com/im/pictures/0d8bf217-5ff3-4521-9456-986325e9eb33.jpg?im_w=720"]
e46c98a9-f2f3-411f-a462-a59ff8171ed0	2025-05-04 02:28:56.750757+00		1970'S HIDDEN GEM CLOSE TO THE RIVER 2000 SQ FT\nShare\nSave				www.airbnb.com/rooms/609362259996268031	609362259996268031	NO BOOKING OR CLEANING FEES!!! \n2,600 feet from the river,  just off the strip!!! 3 bed 2 bath in a cul-de-sac sleeps 6 easily, 2,000 sq ft (lots of room) and peaceful. In a typical Parker, Az neighborhood this is NOT The Keys. Close to free boat launch ramps, boat and jet ski rentals close by. Plenty of room for onsite and offsite parking next door for your toys and guests. Pool table, bar, full kitchen, large master bedroom and bath. BBQ Grill and griddle. Only dogs allowed with added fee.\n\nThe space\n2,600 feet from the river! Quite and peaceful cul-de-sac home 1970's vibe throughout. \nMONTHLY BOOKINGS WITH SIGNED LEASE AGREEMENT!\n\nGuest access\nAny area within the interior of the home. The front patio, driveway and dirt side yard off the driveway on the exterior of the home. Including additional parking on the gravel area of the property to the left next door and the car port area.\n\nOther things to note\nThere is a 6 guest maximum children included except 2 years old and younger. ALL guests MUST be on the Airbnb registry prior to checking in no exceptions.  If there are more than 6 guests or unregistered guests you will be charged $25 per person per night. Your reservation may be canceled and you may be asked to leave. Only dogs allowed 2 maximum with an additional $100 fee.\n\nTHERE ARE CAMERAS ON THE FRONT PORCH, NORTH AND EAST OUTSIDES. YES YOU ARE BEING RECORDED BUT THEY ARE NOT MONITORED 24/7 AND ARE FOR SECURITY PURPOSES BUT NOT LIMITED TO THIS. WE ADHERE TO THE AIRBNB RULES AND TAKE YOUR PRIVACY SERIOUSLY.\n\nANY STAY OVER 28 DAYS MUST SIGN A LEASE AGREEMENT FOR THOSE TERMS. IN OTHER WORDS DAY 29 THORUGH ANY ADDITIONAL DAYS MUST SIGN A LEASE AGREEMENT FOR THE ENTIRE STAY 1 - 29 OR WHATEVER TOTAL DAYS IT MAY BE, PRIVATELY WITH THE HOST. AS WELL AS PROVIDING A PARTIES LEGAL IDENTIFICATIONS. ALL AS ALLOWED AND LINED OUT IN THE AIRBNB RULES. ALL MONIES SHALL STILL AND ALWAYS GO THROUGH AIRBNB. THANK YOU FOR YOUR UNDERSTANDING.\nShow more	9622ec62-4edb-4c3d-ba47-d9f7b78b098e	\N	t	["Scenic views","Mountain view","Bathroom","Bathtub","Cleaning products","Shampoo","Conditioner","Body soap","Hot water","Bedroom and laundry","Free washer – In unit","Free dryer – In unit","Essentials","Towels, bed sheets, soap, and toilet paper","Hangers","Bed linens","Extra pillows and blankets","Drying rack for clothing","Clothing storage: walk-in closet, closet, and dresser","Entertainment","HDTV","Sound system","Pool table","Family","Window guards","Board games","Baby safety gates","Heating and cooling","Central air conditioning","Portable fans","Central heating","Home safety","Exterior security cameras on property","Security Cameras are located on the front porch, North and East sides all outside. Yes you are being recorded on ALL cameras. They are not monitored 24/7. There is also an alarm system which you will be given a temporary code for during your stay that will be invalidated after your stay is finished.","Smoke alarm","Carbon monoxide alarm","Fire extinguisher","First aid kit","Internet and office","Wifi","Dedicated workspace","In a common space","Kitchen and dining","Kitchen","Space where guests can cook their own meals","Refrigerator","Microwave","Cooking basics","Pots and pans, oil, salt and pepper","Dishes and silverware","Bowls, chopsticks, plates, cups, etc.","Mini fridge","Freezer","Dishwasher","GE electric stove","Oven","Hot water kettle","Coffee maker","Wine glasses","Toaster","Baking sheet","Blender","Barbecue utensils","Grill, charcoal, bamboo skewers/iron skewers, etc.","Dining table","Coffee","Location features","Shared beach access","Guests can enjoy a nearby beach","Outdoor","Private patio or balcony","Outdoor furniture","Outdoor dining area","BBQ grill","Parking and facilities","Free driveway parking on premises – 4 spaces","Services","Pets allowed","Assistance animals are always allowed","Self check-in","Lockbox"]	https://a0.muscache.com/im/pictures/313223cf-8670-45ec-a239-e50176757c44.jpg?im_w=720	["https://a0.muscache.com/im/pictures/313223cf-8670-45ec-a239-e50176757c44.jpg?im_w=720", "https://a0.muscache.com/im/pictures/551e189d-2b74-4843-8270-4a33605425a1.jpg?im_w=720", "https://a0.muscache.com/im/pictures/ec7fde3e-4eea-42de-8b03-0f6b932f69f4.jpg?im_w=720", "https://a0.muscache.com/im/pictures/162aa1bf-8a5a-4ea8-9580-60ddf6c7cd19.jpg?im_w=720", "https://a0.muscache.com/im/pictures/3b664f3d-09b9-4852-8281-646c5c171f6a.jpg?im_w=720", "https://a0.muscache.com/im/pictures/37ef4d5c-3bf5-4669-8faf-b1859d01f32f.jpg?im_w=720", "https://a0.muscache.com/im/pictures/6e051dd1-e1d6-4183-95f2-6829057bd8bf.jpg?im_w=720", "https://a0.muscache.com/im/pictures/21e6d8d3-88bc-474d-a465-23197b569a1d.jpg?im_w=720", "https://a0.muscache.com/im/pictures/d49ee064-74e2-4f8b-936f-2967ff30a675.jpg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-609362259996268031/original/1fd7bb85-8041-4146-9969-18ae13e701f4.png?im_w=720", "https://a0.muscache.com/im/pictures/987baea6-f8c3-4181-a532-3ea126ff1edd.jpg?im_w=720", "https://a0.muscache.com/im/pictures/e684e1c8-e45b-4ad9-a2c1-b787f1ccaff7.jpg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-609362259996268031/original/11d17571-8fe8-4efe-885b-09a96f033d71.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/313223cf-8670-45ec-a239-e50176757c44.jpg?im_w=720"]
7cee2fb2-cfa4-48ce-976a-87b8347ca1e7	2025-04-27 17:27:36.01317+00		Dreamy Ocean Views: Newport Beach (Upper Duplex)\nShare\nSave				www.airbnb.com/rooms/36315289	36315289	Dreamy ocean views from this upstairs  unit of duplex beachfront w/ 3bedroom/2bath.  Upstairs 3 bedroom unit has sweet, modern upgrades, a wonderful master bedroom and spectacular ocean views.  Enjoy views of the ocean, Balboa pier, sea & sand. (The porch use is for downstairs guests only).  Our family has rented to families on vacation for 20 years. One on-site parking space & amazing beach, ferry, fun zone access. No smoking and no partiers;  9 pm quiet hour (SLP13142 City Tax 10% added)\n\nThe space\nThe best feature is the amazing views out the front window at sunset.  The exterior door is shared with upstairs renters - then each party has a separate interior locked and coded door for private entrance.  Patio is for downstair guest use only (apologies).  To learn more about that rental: Balboa Pier at Newport Beach is the listing. Washer/dryer on premises. Kitchen has pots and pans, blender, coffee pot etc.\n\nGuest access\nIf you would like to learn more about the upper unit of the duplex - visit Balboa Pier at Newport Beach.  The city has parking lots 3 blocks south near the ferry and pier.  Street parking in neighborhoods is available too. Walks to near by ethnic food and family fun.\n\nOther things to note\nThe City charges a 10% tourism tax. Our rate has been adjusted automatically to accommodate that fee (apologies)\nSound travels between upper and lower unit - we ask for guest courtesy and consideration in shared building and with neighbors too! Thank you\n\nRegistration number\nSLP13141\nShow more	8b883958-ffca-4f06-860f-b73753f4a1c8	\N	t	["Scenic views","Beach view","Bathroom","Hair dryer","Shampoo","Hot water","Bedroom and laundry","Washer","Dryer","Essentials","Towels, bed sheets, soap, and toilet paper","Hangers","Iron","Entertainment","TV","Family","Board games","Baby safety gates","Heating and cooling","Central heating","Home safety","Smoke alarm","Carbon monoxide alarm","Fire extinguisher","Internet and office","Wifi","Kitchen and dining","Kitchen","Space where guests can cook their own meals","Refrigerator","Microwave","Cooking basics","Pots and pans, oil, salt and pepper","Dishes and silverware","Bowls, chopsticks, plates, cups, etc.","Freezer","Dishwasher","Gas stove","Oven","Hot water kettle","Coffee maker","Wine glasses","Toaster","Baking sheet","Blender","Dining table","Location features","Beach access – Beachfront","Guests can enjoy a nearby beach","Parking and facilities","Free parking on premises","Free street parking","Services","Self check-in","Keypad","Check yourself into the home with a door code","Not included","Unavailable: Air conditioning","Air conditioning"]	https://a0.muscache.com/im/pictures/74cd2c1e-c6ca-4604-9ee2-bd4bcb973cff.jpg?im_w=720	["https://a0.muscache.com/im/pictures/74cd2c1e-c6ca-4604-9ee2-bd4bcb973cff.jpg?im_w=720", "https://a0.muscache.com/im/pictures/444fcc39-a74e-4464-a593-86cf889f341a.jpg?im_w=720", "https://a0.muscache.com/im/pictures/d09c6a52-1cf0-4404-b73a-ceaf18786aa9.jpg?im_w=720", "https://a0.muscache.com/im/pictures/235c7233-0f96-43e9-a3ea-c8e5445e534c.jpg?im_w=720", "https://a0.muscache.com/im/pictures/f6baf1d8-2dce-443d-8e2b-c41d96da8dd5.jpg?im_w=720", "https://a0.muscache.com/im/pictures/332141f9-1ec0-41d8-97ee-00f6e7d5aca3.jpg?im_w=720", "https://a0.muscache.com/im/pictures/e4183705-768d-40c3-aa48-0391bb38d761.jpg?im_w=720"]
70dfa2bd-bfb8-472a-b526-f6393c0a452c	2025-04-27 17:38:06.701022+00		Lake Time Villa *NEW* Luxury w/ HOT TUB\nShare\nSave				www.airbnb.com/rooms/53463373	53463373	Come escape to our charming home Lake time villa!\nA 2 minutes drive from the village shops and restaurants, Snow Summit and Bear Mountain, Big Bear Lake, and Marinas.\nYou’ll love our family-friendly cabin a warm cozy feel along with lake views and a quiet family neighborhood vibe.\n\nThe space\nThis is a single level home with approximately 2000 Sq Ft \nThere’s a large deck with lake views where you can step out and take in the fresh mountain air while looking out at the lake. On the deck there is a gas grill along with chairs to relax and watch the sunset when the weather permits. \nModern kitchen with granite counters and stainless steel appliances. Open concept living with a pool table lets everyone enjoy each other and the stunning lake views. Enjoy the lake views from the large decks, hot tub and bocce ball court. Large main bedroom suite has attached bath, its own gas fireplace, plenty of closets and French sliding doors to the deck and hot tub overlooking the lake. Lots of extras including wood clad dual pane windows and doors. \n\nOther features for you to enjoy:\n*Wood burning fireplace\n*BBQ propane grill\n*Fully equipped kitchen with stainless steel appliances and granite counter tops all the essentials to cook.\n*Smart TV in the living room. You can connect your own streaming apps to watch movies and shows\n*Washer/Dryer\n*Game area/ bocce ball court \n2 single bedrooms with a king beds \nMaster room has a king bed with its own bathroom and closet\n\nOutdoor spa\n\nOther things to note\nPETS: This is a pet-friendly property. There is a one-time $75.00 fee for a maximum of 2 dogs.\n\nRegistration number\n2022-1341\nShow more	9622ec62-4edb-4c3d-ba47-d9f7b78b098e	\N	t	["Scenic views","Lake view","Mountain view","Bathroom","Hair dryer","Bedroom and laundry","Washer","Dryer","Essentials","Towels, bed sheets, soap, and toilet paper","Bed linens","Iron","Entertainment","Ping pong table","Pool table","Heating and cooling","Ceiling fan","Central heating","Home safety","Smoke alarm","Carbon monoxide alarm","Fire extinguisher","First aid kit","Internet and office","Wifi","Kitchen and dining","Refrigerator","Microwave","Cooking basics","Pots and pans, oil, salt and pepper","Dishwasher","Oven","Toaster","Blender","Location features","Lake access","Guests can get to a lake using a path or dock","Parking and facilities","Free street parking","Private hot tub","Services","Pets allowed","Assistance animals are always allowed","Not included","Unavailable: Kitchen","Kitchen","Unavailable: HDTV with Netflix","HDTV with Netflix","Unavailable: Air conditioning","Air conditioning","Unavailable: Shampoo","Shampoo","Unavailable: Private entrance","Private entrance"]	https://a0.muscache.com/im/pictures/prohost-api/Hosting-53463373/original/954a5738-578e-484d-b503-bd96aaecc79e.jpeg?im_w=720	["https://a0.muscache.com/im/pictures/prohost-api/Hosting-53463373/original/954a5738-578e-484d-b503-bd96aaecc79e.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/prohost-api/Hosting-53463373/original/38d2c0a3-8464-4606-9e6e-422f6200cbde.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/prohost-api/Hosting-53463373/original/c0df2f36-1e70-4a6a-972d-cf5cd1b5a954.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/prohost-api/Hosting-53463373/original/7045a212-6c76-4b16-a56a-75ff5fcaebe2.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/prohost-api/Hosting-53463373/original/710367ef-3a14-4619-950f-37b807ec8437.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/prohost-api/Hosting-53463373/original/91d357c2-3b08-4146-b71a-207ac0236351.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/prohost-api/Hosting-53463373/original/65ed7ab2-8392-4c35-8799-e67ca9d530be.jpeg?im_w=720"]
0d3de194-51d6-4595-aa7d-09c0ba4287c1	2025-05-01 21:32:07.11507+00		Moinho das Feteiras | The Mill House\nShare\nSave				www.airbnb.com/rooms/5264493	5264493	Built in the 19th century, with a 360 degrees view over the sea and surroundings on the top floor. \nIt features a Bedroom, a very well-decorated living room with kitchenette, and a WC. \nFree WiFi, air conditioning, Led TV and DVD player.\nPrivate parking inside the premises, providing extra security.\nPerfect for an unforgettable honeymoon experience.\n\nThe space\nIt has a 4000 m garden with sub-tropical fruit trees, garden trees, and flowers.\nIn addition to the Mill ideal for 2 people, it has two more accommodation units: the Mó de Cima's House ideal up to 3 people and the Moleiro's House that hold up tp 4 people.\n\nGuest access\nGuests have access to all property spaces.\n\nRegistration number\nExempt\nShow more	8b883958-ffca-4f06-860f-b73753f4a1c8	\N	t	["Scenic views","Garden view","Mountain view","Ocean view","Bathroom","Hair dryer","Cleaning products","Aroma de Portugal shampoo","Aroma de Portugal conditioner","Aroma de Portugal body soap","Hot water","Shower gel","Bedroom and laundry","Essentials","Towels, bed sheets, soap, and toilet paper","Hangers","Bed linens","Extra pillows and blankets","Room-darkening shades","Iron","Safe","Entertainment","Ethernet connection","HDTV with standard cable, premium cable","Books and reading material","Family","Window guards","Babysitter recommendations","Heating and cooling","AC - split type ductless system","Heating","Home safety","Smoke alarm","Carbon monoxide alarm","Fire extinguisher","First aid kit","Internet and office","Wifi","Dedicated workspace","In a private space with a table","Kitchen and dining","Kitchen","Space where guests can cook their own meals","Microwave","Cooking basics","Pots and pans, oil, salt and pepper","Dishes and silverware","Bowls, chopsticks, plates, cups, etc.","Mini fridge","Freezer","Dishwasher","Induction stove","Stainless steel oven","Hot water kettle","Coffee maker: Nespresso, pour-over coffee","Wine glasses","Toaster","Dining table","Coffee","Location features","Private entrance","Separate street or building entrance","Free resort access","Guests can use nearby resort facilities","Outdoor","Shared backyard – Fully fenced","An open space on the property usually covered in grass","Outdoor furniture","Outdoor dining area","Beach essentials","Beach towels, umbrella, beach blanket, snorkeling gear","Parking and facilities","Free parking on premises","Free street parking","Shared outdoor pool - available all year, open 24 hours","Services","Breakfast","Breakfast is provided","Long term stays allowed","Allow stay for 28 days or more","Self check-in","Keypad","Check yourself into the home with a door code","Cleaning available during stay","Not included","Unavailable: Exterior security cameras on property","Exterior security cameras on property","Unavailable: Free washer – In building","Free washer – In building"]	https://a0.muscache.com/im/pictures/miso/Hosting-5264493/original/755e46fc-b3c7-41d1-99e9-af13245e388f.jpeg?im_w=720	["https://a0.muscache.com/im/pictures/miso/Hosting-5264493/original/d1e6500a-3b0f-451d-8f6e-a6f067930a0d.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-5264493/original/858b29eb-53f3-4707-87a6-444f4375f888.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-5264493/original/bc9fdbba-a126-4357-946b-4d5f5581ca0f.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-5264493/original/bc151d50-d391-4be1-a1cb-f91b8ff5520a.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-5264493/original/db17fce1-4ad0-45d8-8d7b-ba5ccdfe770c.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-5264493/original/8167c651-88dd-446c-93ca-4e08b7ba0b5d.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-5264493/original/10d2c21f-84c2-46c5-b20b-b51d1c2c971a.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NTI2NDQ5Mw%3D%3D/original/39b262f4-baef-4b17-923c-b1da2b98c836.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-5264493/original/d1e6500a-3b0f-451d-8f6e-a6f067930a0d.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-5264493/original/66c30627-4220-4471-ac76-c739996386b5.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-5264493/original/bbef7507-f11d-4cfd-9cbf-3f7af1e81eef.jpeg?im_w=720"]
d56479ec-d48e-44a1-b0ff-03479d78c264	2025-04-27 21:31:02.785463+00		Two Story House w/ Balcony and Patio on the Beach\nShare\nSave				www.airbnb.com/rooms/710092666168276467	710092666168276467	Our 3 Bedroom 3 Bath 2-story home is perfect for your family with up to 8 guests. With no boardwalk to obstruct your view you can walk directly onto the sand or spend time enjoying our Oversized Patio & Balcony equipped with outdoor dining, lounge chairs, BBQ and outdoor fire-pit! \n\nLocated in West Newport on 52nd St just a few blocks away from the West Newport Park. This stretch of homes along 52nd is believed to be the closest distance between the homes and the water in all of Newport Beach!\n\nThe space\nHome professionally managed by Tower 17 Properties located in Newport Beach CA\n\n\nThis absolutely Beautiful Oceanfront Single family Home is located on 52nd St. This home has one of the closest proximity to the ocean in all of Newport Beach. \n\nBedroom 1 - (1) King-sized bed with En-Suite Bathroom (tub/shower)\nBedroom 2 - (2) Bunk beds (4 Single Beds) with Adjacent Hallway Bathroom (Tub/Shower)\nBedroom 3 - (1) Queen-sized bed with Adjacent Hallway Bath (shower) - Bedroom (3) is on the ground level should anyone in your group have mobility issues. \n\nOther amenities include -Washer/Dryer, WiFi, Local Cable, Linens, Beach & Bath towels, Dining Area, (2) Outdoor dining tables. Our Kitchen is Fully Equipped with pots, pans, dishes, coffeepot, Gas BBQ, Beach Toys & Beach Chairs\n\n\nHOME LOCATION\nFor those of you looking to enjoy a QUIET Vacation you have found the right place. \n\nWest Newport is (in our opinion) the best locations to live/rent in Newport Beach. With the bike path located in the street (Unlike on the oceanfront in other areas) there is nothing to obstruct your view directly from the living room to the ocean! West Newport (52nd to 74th) is home to many long term residents spending time enjoying the beach without all of the hustle and bustle of the Pier/Tourist Areas. Inclusive of the West Newport Park you will find everything from children's Jungle Gyms, Racketball, Pickle Ball, Tennis, Volleyball, and basketball courts.   \n\nAlthough you may be looking for a quiet getaway, the action is never more than a Walk/Bike Ride away. (2-15 Minutes by Bike) 20+ Restaurants, Bars, Coffee Shops, Surfboard/Bike rental shops, Grocery Store, Duffy Boat Rentals, Newport Pier etc. (15-30 Minutes by Bike) Balboa Pier, Balboa Fun Zone, Balboa Island, Boat Docks (The Catalina Express, Whale Watching Tours, and Sailing Adventures) Huntington Beach Pier/Pacific City,  and much more! \n\n\nIMPORTANT HOME NOTES:\n\n- Upon completion of reservation tenants will be required to comply with the HOUSE RULES (including additional rules) outlined in our online Advertisement. Please review prior to submitting your booking. \n\n-Tenants will be held responsible for any/all penalties and fines incurred during their stay as well as loss of rental revenue resulting from the suspension or revocation of the Property City Lodging Permit.\n\n- Upon arrival, the guest agrees to be greeted by a staff member to verify identification matching the primary reservation holder. The primary reservation holder must be present throughout the duration of the reservation. Any exceptions must be approved in writing by Tower 17 Properties & Management. \n\n- Guests submitting a reservation the same day as their arrival date are advised to message Tower 17 Properties prior to submitting their request.  Same-day reservations may be required to accept a later than advertised arrival time of 5 pm to ensure the completion of our cleaning and inspection process. \n\n-Guests arriving or departing before or after designated arrival and departure times without written consent from Tower 17 Properties and Management will be charged a $299 fee and applicable taxes. Guests departing after 1pm will be charged for the additional nightly rate as advertised. If an unapproved late departure impacts the arrival of an incoming guest, the departing reservation is subject to penalties and fines including but not limited to the refund of the incoming reservation. \n\n- Must be 30+ Years Old to Rent \n- Parking in the garage only (2 car garage)\n- Tenant Occupancy (10) Daytime (8am-9pm) and (8) Overnight (9pm-8am) unless a written exception is given. \n-This 2 story single family home has (1) full set of stairs to access the second level as well as a set of 4 stairs to access the patio from the ground floor. \n- Noise from other units, neighboring homes, and beach goers should be expected. \n-Kitchen located on ground level (Wet-bar upstairs 2nd level living room) \n-Please review house rules regarding noise, day/nighttime occupancy, etc.\n- Portable freestanding 12,000 BTU AC units are available to rent at a fixed rate of $399 each for up to 7 nights. Max 3 units per house.\n-Crib/Pack n' Play & High Chair must be requested prior to your stay.\n\n\nHome professionally managed by Tower 17 Properties & Management LLC located in Newport Beach CA. Please visit our Website for more information regarding our Rental Services.\n\nRegistration number\nSLP10768\nShow more	8b883958-ffca-4f06-860f-b73753f4a1c8	\N	t	["Scenic views","Beach view","Ocean view","Sea view","Bathroom","Bathtub","Hair dryer","Cleaning products","Shampoo","Body soap","Hot water","Bedroom and laundry","Free washer – In unit","Free dryer – In unit","Essentials","Towels, bed sheets, soap, and toilet paper","Hangers","Bed linens","Extra pillows and blankets","Room-darkening shades","Iron","Clothing storage","Entertainment","42 inch HDTV","Family","Pack ’n play/Travel crib","Heating and cooling","Indoor fireplace","Ceiling fan","Portable fans","Heating","Home safety","Smoke alarm","Carbon monoxide alarm","Fire extinguisher","First aid kit","Internet and office","Wifi","Dedicated workspace","In a common space","Kitchen and dining","Kitchen","Space where guests can cook their own meals","Refrigerator","Microwave","Cooking basics","Pots and pans, oil, salt and pepper","Dishes and silverware","Bowls, chopsticks, plates, cups, etc.","Freezer","Dishwasher","Frigidaire gas stove","Oven","Coffee maker","Wine glasses","Toaster","Baking sheet","Blender","Barbecue utensils","Grill, charcoal, bamboo skewers/iron skewers, etc.","Dining table","Location features","Waterfront","Right next to a body of water","Shared beach access – Beachfront","Guests can enjoy a nearby beach","Private entrance","Separate street or building entrance","Laundromat nearby","Outdoor","Private patio or balcony","Backyard","An open space on the property usually covered in grass","Fire pit","Outdoor furniture","Outdoor dining area","BBQ grill","Beach essentials","Beach towels, umbrella, beach blanket, snorkeling gear","Sun loungers","Parking and facilities","Free parking on premises","Free street parking","Services","Long term stays allowed","Allow stay for 28 days or more","Self check-in","Keypad","Check yourself into the home with a door code","Not included","Unavailable: Exterior security cameras on property","Exterior security cameras on property","Unavailable: Air conditioning","Air conditioning"]	https://a0.muscache.com/im/ml/photo_enhancement/pictures/miso/Hosting-710092666168276467/original/1835c668-975c-498a-8773-e2ea4b13102f.jpeg?im_w=720	["https://a0.muscache.com/im/ml/photo_enhancement/pictures/miso/Hosting-710092666168276467/original/1835c668-975c-498a-8773-e2ea4b13102f.jpeg?im_w=720", "https://a0.muscache.com/im/ml/photo_enhancement/pictures/miso/Hosting-710092666168276467/original/6ad57d33-d0dd-492c-96e4-a1ad2f3184bc.jpeg?im_w=720", "https://a0.muscache.com/im/ml/photo_enhancement/pictures/miso/Hosting-710092666168276467/original/a356750d-26b8-4c5a-ac27-2bce4a145694.jpeg?im_w=720", "https://a0.muscache.com/im/ml/photo_enhancement/pictures/miso/Hosting-710092666168276467/original/680b68ad-8ec1-4724-8c74-f588dc8286bc.jpeg?im_w=720", "https://a0.muscache.com/im/ml/photo_enhancement/pictures/miso/Hosting-710092666168276467/original/21c19cec-84e6-4ffc-b64d-5373fdd32700.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-710092666168276467/original/4cd06be9-8d51-4f68-bf6e-d721c56194b3.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-710092666168276467/original/bda016d2-fc4a-442f-a83f-e5d9625b9618.jpeg?im_w=720"]
d83b24aa-f073-4af6-963f-c4cc91f0f7ed	2025-05-04 14:56:02.895618+00		Peaceful Modern A-Frame Cabin with a view\nShare\nSave				www.airbnb.com/rooms/762632213174916471	762632213174916471	Enjoy your morning coffee gazing towards an unobstructed forest view.   Nature pours through every window. The Peaceful Modern has been renovated to be open, spacious, and full of light. Step inside and feel relaxation wash over you.  Spend the day enjoying the charm of Lake Arrowhead, hiking the trails,  or curling up with a book next to the fireplace.  At night, prepare a meal in the well-appointed fully stocked gourmet kitchen.  Only a 10-minute drive to Lake Arrowhead village.\n\nThe space\nThe lofted queen bedroom with vaulted ceilings has the best views in the cabin - wake up to a serene view of trees.  There is also a well equipped desk and work station on this scenic level.  \n\nThe main level and downstairs bedrooms have luxuriously-sized king beds and en suite bathrooms attached. Folding memory foam twin mattresses are available upon request - perfect for kids. \n\nThe spacious, renovated kitchen has new designer appliances and everything you need to cook a delicious meal or prepare the perfect cup of coffee. Sliding doors open onto a deck outfitted with a Weber gas grill with easy access off the kitchen.  The main deck includes an outdoor dining table that seats 6 comfortably.\n\nThe cabin has all the necessary elements for a peaceful retreat yet all the modern convenience, including fast WiFi, a flatscreen smart TV, a Sonos sound system, and central heat and A/C.\n\n** Please note: It snows in Lake Arrowhead and chains are REQUIRED on steep mountain roads.  If you're booking in winter, please be prepared for snow.\n\nGuest access\nAll parts of the house in the space is yours to enjoy.  One closet is locked for owner's personal items.\n\nOther things to note\nPOWER - In the event of power outage there is a Generator next to shed that will power the entire property. If there is a power outage, the generator will begin running within 10 seconds. Instructions will be provided.\n\nWINTER SNOW SEASON - During the winter snow season Lake Arrowhead can see a very large snow accumulation. 4 wheel drive vehicles are recommended and carrying snow chains with you is a must. We have a plow service that comes every snowfall (of 6 inches or more) to clear the roads and a shoveling service to clear pathways prior to your arrival.\n\nRegistration number\nCESTRP-2022-01784\nShow more	9622ec62-4edb-4c3d-ba47-d9f7b78b098e	\N	t	["Scenic views","Mountain view","Bathroom","Hair dryer","Cleaning products","Native shampoo","Native conditioner","Native body soap","Bidet","Hot water","Shower gel","Bedroom and laundry","Free washer – In unit","Free dryer – In unit","Essentials","Towels, bed sheets, soap, and toilet paper","Hangers","Bed linens","Cotton linens","Extra pillows and blankets","Room-darkening shades","Iron","Drying rack for clothing","Clothing storage: walk-in closet, closet, and dresser","Entertainment","60 inch HDTV with Amazon Prime Video, Apple TV, Disney+, HBO Max, Hulu, Netflix, premium cable","Record player","Sonos Bluetooth sound system","Exercise equipment: yoga mat","Books and reading material","Family","Pack ’n play/Travel crib - always at the listing","Room-darkening shades","Children’s books and toys for ages 2-5 years old","Children’s dinnerware","Fireplace guards","Board games","Heating and cooling","Central air conditioning","AC - split type ductless system","Indoor fireplace: gas, wood-burning","Portable fans","Central heating","Portable heater","Heating - split type ductless system","Home safety","Exterior security cameras on property","Ring camera/flood light on the front pointed at entry. Ring doorbell on the front door. Ring in eaves by the front door looking back at the entryway. Ring on the upper deck. Ring camera on the side deck pointed at the stairs. Front Ring camera pointed at the parking area. All exterior cameras.","Smoke alarm","Carbon monoxide alarm","Fire extinguisher","First aid kit","Internet and office","Wifi","Dedicated workspace","In a common space with an ergonomic chair, laptop stand, surge protector, and printer","Kitchen and dining","Kitchen","Space where guests can cook their own meals","Samsung refrigerator","Microwave","Cooking basics","Pots and pans, oil, salt and pepper","Dishes and silverware","Bowls, chopsticks, plates, cups, etc.","Freezer","Dishwasher","Kucht stainless steel gas stove","Kucht stainless steel oven","Hot water kettle","Coffee maker: espresso machine, french press","Wine glasses","Toaster","Baking sheet","Blender","Rice maker","Barbecue utensils","Grill, charcoal, bamboo skewers/iron skewers, etc.","Dining table","Coffee","Location features","Lake access","Guests can get to a lake using a path or dock","Private entrance","Separate street or building entrance","Outdoor","Private patio or balcony","Shared backyard – Not fully fenced","An open space on the property usually covered in grass","Outdoor furniture","Hammock","Outdoor dining area","Shared BBQ grill: gas","Beach essentials","Beach towels, umbrella, beach blanket, snorkeling gear","Parking and facilities","Free parking on premises","Free street parking","EV charger - level 2","220 volts, 12-35 miles per hour","Paid parking lot on premises – 3 spaces","Services","Long term stays allowed","Allow stay for 28 days or more","Self check-in","Keypad","Check yourself into the home with a door code","Cleaning available during stay"]	https://a0.muscache.com/im/pictures/miso/Hosting-762632213174916471/original/e4369d66-1cbd-440f-a3b2-823a6b03c908.jpeg?im_w=720	["https://a0.muscache.com/im/pictures/miso/Hosting-762632213174916471/original/e4369d66-1cbd-440f-a3b2-823a6b03c908.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-762632213174916471/original/55badf80-1dab-45b8-9659-75b905878a49.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-762632213174916471/original/b685fe12-00ae-4a8c-af0f-d708a8b77bbb.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-762632213174916471/original/94b68145-20f8-460c-895c-be2738eb7ae3.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-762632213174916471/original/fa6aade4-0b75-481d-aa50-ac958dec97d0.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-762632213174916471/original/15e65039-003b-4c07-b03f-b305d020223a.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-762632213174916471/original/f4908d3e-f244-4104-9a08-f782fb542df7.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-762632213174916471/original/9f2af095-10dd-4558-852f-4153343a00df.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-762632213174916471/original/cc9f5606-d7ac-46cd-96d4-1159d4c5c48b.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-762632213174916471/original/5f987b76-7e3c-4001-9310-06503f8449b3.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-762632213174916471/original/5d19ef9f-c2d9-479d-9a22-3b6a12a9850d.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-762632213174916471/original/a0fb6799-eca4-4b91-93c9-87570822f53b.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-762632213174916471/original/e4369d66-1cbd-440f-a3b2-823a6b03c908.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-762632213174916471/original/82c862f7-e864-4eee-ad46-4891083711da.jpeg?im_w=720"]
b72b23db-1b96-4d91-a178-0a254debed2f	2025-05-04 17:03:12.355973+00		Harbor Happenings-Two bedroom home- boat parking!\nShare\nSave				www.airbnb.com/rooms/691868664320575326	691868664320575326	The whole group will enjoy easy access to everything from this centrally located place. Beach and Harbor 2 minutes or 13 minute walk. This house can sleep 4 people. Full kitchen, two baths with grill and porch for grilling. Parking with level quick access.\n\nThe space\n1200 sq ft 2 bedroom 2 bathroom, two dinning, living room with smart TV and Spectrum. Full kitchen fully stocked.\n\nGuest access\nEntire House\n\nOther things to note\n10 min walk to Sporthaven beach and Port of Brookings.\nShow more	9622ec62-4edb-4c3d-ba47-d9f7b78b098e	\N	t	["Bathroom","Bathtub","Cleaning products","Shampoo","Conditioner","Body soap","Hot water","Shower gel","Bedroom and laundry","Free washer – In unit","Free dryer","Essentials","Towels, bed sheets, soap, and toilet paper","Hangers","Bed linens","Extra pillows and blankets","Room-darkening shades","Iron","Safe","Clothing storage: closet","Entertainment","55 inch HDTV with premium cable","Record player","Books and reading material","Movie theater","Family","Board games","Heating and cooling","Indoor fireplace: electric","Ceiling fan","Portable fans","Central heating","Home safety","Exterior security cameras on property","The cameras are in the front and rear areas of the home and have continuous views of all outside areas. There are no cameras indoors or in private areas. we have no spas or private spaces outdoors.","Smoke alarm","Carbon monoxide alarm","Fire extinguisher","First aid kit","Internet and office","Wifi","Dedicated workspace","In a room with a door","Pocket wifi","Kitchen and dining","Kitchen","Space where guests can cook their own meals","Refrigerator","Microwave","Cooking basics","Pots and pans, oil, salt and pepper","Dishes and silverware","Bowls, chopsticks, plates, cups, etc.","Freezer","Dishwasher","Stove","Oven","Hot water kettle","Coffee maker","Wine glasses","Toaster","Baking sheet","Barbecue utensils","Grill, charcoal, bamboo skewers/iron skewers, etc.","Dining table","Coffee","Location features","Shared beach access","Guests can enjoy a nearby beach","Private entrance","Separate street or building entrance","Resort access","Guests can use nearby resort facilities","Outdoor","Private patio or balcony","Private backyard – Fully fenced","An open space on the property usually covered in grass","Fire pit","Outdoor furniture","Hammock","BBQ grill","Kayak","Parking and facilities","Free driveway parking on premises – 2 spaces","Single level home","No stairs in home","Services","Long term stays allowed","Allow stay for 28 days or more","Not included","Unavailable: Air conditioning","Air conditioning"]	https://a0.muscache.com/im/pictures/c7e572af-e82a-4699-aa35-196aa5339fed.jpg?im_w=720	["https://a0.muscache.com/im/pictures/8bad0db0-181b-4ce7-932e-d4679ea40777.jpg?im_w=720", "https://a0.muscache.com/im/pictures/c7e572af-e82a-4699-aa35-196aa5339fed.jpg?im_w=720", "https://a0.muscache.com/im/pictures/18109a0a-ecc3-42e7-b8f5-95ddbb6b6fd4.jpg?im_w=720", "https://a0.muscache.com/im/pictures/ea0b9c65-186d-4123-b95e-02091a7b7849.jpg?im_w=720", "https://a0.muscache.com/im/pictures/c198eadd-fb54-4c08-80f1-fcd06bd58247.jpg?im_w=720", "https://a0.muscache.com/im/pictures/94f361ca-a310-4bf5-8b45-afe401aa0db7.jpg?im_w=720", "https://a0.muscache.com/im/pictures/a2cb4fc5-e228-4e5d-b60a-19003f52f190.jpg?im_w=720", "https://a0.muscache.com/im/pictures/36da9575-a53b-49b0-acd0-a67c48d5f6b6.jpg?im_w=720", "https://a0.muscache.com/im/pictures/c68493d0-c597-4cf3-a9ba-1405efdf4c42.jpg?im_w=720", "https://a0.muscache.com/im/pictures/db7d729a-765c-4011-939d-54c90802815f.jpg?im_w=720", "https://a0.muscache.com/im/pictures/ba0a642f-7ac4-44be-a9f4-6e00bbf4ba49.jpg?im_w=720"]
be8c1246-fae2-488f-b8db-ec78b93195c8	2025-05-07 14:38:30.260307+00		2BR dog-friendly cabin with hot tub, patio & views\nShare\nSave				www.airbnb.com/rooms/1015379183872045594	1015379183872045594	The space\nSea Wolf\n\nThis delightful cabin with a loft features charming interiors and a wealth of amenities, making it the perfect choice for your upcoming adventure to the Oregon coast!\n\n\n\nConveniently located for outdoor enthusiasts, you’ll discover Arch Rock State Park, Azalea Park, and Alfred A. Loeb State Park all within a 16-mile radius. Spend a day exploring beautiful trails, picnicking among beautiful gardens, or camping along the Chetco River. Don’t forget Redwood Nature Trailhead (17 miles away) for stunning photography locations and top-tier hiking through incredible redwood forests.\n\n\n\nFeel right at home in this retreat’s sun-soaked living areas and cozy, coastal decor. The plush seating and elegant finishes invite you to snuggle up for movie night or break out the board games. With direct access to ample outdoor areas and a spacious deck, sip your morning coffee with the sunrise or grill up your catch of the day while sharing plenty of laughs. A well-appointed kitchen boasts modern appliances and gleaming countertops, making additional food preparation and home-cooked meals a breeze. Following a day of beach excursions, unwind with a rejuvenating soak in your private hot tub, letting the cool Pacific Northwest air soothe you to sleep in paradise.\n\n\n\nThings to Know\n\nCheck-in time: 4:00 PM.\n\nCheck-out time: 10:00 AM.\n\nAll guests shall abide by Vacasa’s good neighbor policy and shall not engage in illegal activity. Quiet hours are from 10:00 PM to 8:00 AM.\n\nNo smoking is permitted anywhere on the premises.\n\n\n2 dog(s), weighing 50lbs or less, are welcome in this home. No other animals are allowed without specific Vacasa approval.\n\nParking notes: There is free parking available for 2 vehicles.\n\n\n\n\n\n\nDamage waiver: The total cost of your reservation for this Property includes a damage waiver fee which covers you for up to $3,000 of accidental damage to the Property or its contents (such as furniture, fixtures, and appliances) as long as you report the incident to the host prior to checking out. More information can be found from the "Additional rules" on the checkout page.\n\nDue to local laws or HOA requirements, guests must be at least 21 years of age to book. Guests under 21 must be accompanied by a parent or legal guardian for the duration of the reservation.\nShow more	9d09ce16-014e-4e6b-bf29-9569bea73610	\N	t	["Bathroom","Hair dryer","Shampoo","Hot water","Bedroom and laundry","Essentials","Towels, bed sheets, soap, and toilet paper","Hangers","Bed linens","Iron","Entertainment","TV","Heating and cooling","Heating","Home safety","Smoke alarm","Carbon monoxide alarm","Fire extinguisher","Internet and office","Wifi","Dedicated workspace","Kitchen and dining","Kitchen","Space where guests can cook their own meals","Refrigerator","Microwave","Dishes and silverware","Bowls, chopsticks, plates, cups, etc.","Dishwasher","Stove","Oven","Coffee maker","Location features","Private entrance","Separate street or building entrance","Outdoor","BBQ grill","Parking and facilities","Free parking on premises","Private hot tub","Services","Pets allowed","Assistance animals are always allowed","Self check-in","Lockbox","Not included","Unavailable: Washer","Washer","Unavailable: Air conditioning","Air conditioning"]	https://a0.muscache.com/im/pictures/prohost-api/Hosting-1015379183872045594/original/cc16fdff-024a-46ff-9fbd-318346d423a0.jpeg?im_w=720	["https://a0.muscache.com/im/pictures/prohost-api/Hosting-1015379183872045594/original/cc16fdff-024a-46ff-9fbd-318346d423a0.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/prohost-api/Hosting-1015379183872045594/original/9d975600-f975-404a-9f6f-3cd72fe5f039.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/prohost-api/Hosting-1015379183872045594/original/40f09e36-3107-4564-8caa-37042c12f993.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/prohost-api/Hosting-1015379183872045594/original/7d06eaf0-a528-40f4-9824-6747137d985a.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/prohost-api/Hosting-1015379183872045594/original/c8688a2a-2eb2-4cc3-a5dd-da910be9093d.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/prohost-api/Hosting-1015379183872045594/original/ada6d880-49ee-4dbc-8194-cc9af4a0c142.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/prohost-api/Hosting-1015379183872045594/original/9e64de24-7039-47c9-bdbd-436901998fbb.jpeg?im_w=720"]
4e3d6739-a175-4670-b210-3165bd6419ac	2025-05-10 19:24:12.678319+00		Family-Friendly Oasis: Sports Court~Large Pool~Spa\nShare\nSave				www.airbnb.com/rooms/1416005972972876632	1416005972972876632	Welcome to the *BRAND NEW* Clearwater Stay and Play Resort in sunny Clearwater, FL! Sleeping up to 18 guests, and loaded with every amenity you can imagine! Book now while discounts lasts!\n\n*Full-size Pickleball / Basketball court\n*Game Room with Pool table, Foosball table, 2-person Arcade table and 85” Smart TV\n*3-Hole Putt Putt Course\n*Large outdoor seating and dining areas\n*A playhouse for the little members of your group\n* Massive Heated Pool\n* Hot Tub\n* Fire Pit\n\nThe space\nExperience the vacation of a lifetime in our stunning 3,000 sq. ft. luxurious home! Comfortably accommodating up to 18 guests, our property features 5 spacious bedrooms and 3.5 bathrooms. Ideally situated in a central location, you'll enjoy easy access to beautiful beaches and a variety of local attractions. \n\n* Quiet and peaceful Cul-De-Sac neighborhood; very family friendly\n* Surrounded by unlimited dining and shopping options\n* 3 miles to Award-Winning Gulf Beaches\n*Less than 25 minutes to the vibrant Downtown Saint Petersburg\n* Less than 10 minutes from the St. Pete / Clearwater airport\n* Less than 25 minutes from the Tampa International Airport\n* 30 minutes to Raymond James Stadium, Amela Arena and Steinbrenner Field\n* 40 minutes to Busch Gardens Theme Park\n* Starbucks and Dunkin less than 2 miles away\n\nNestled in a tranquil and safe cul-de-sac, you’ll enjoy the serenity of the neighborhood while being just a short drive away from Clearwater’s award-winning beaches.\n\nThis beautifully decorated home is a paradise for both leisure and play, offering a wealth of amenities to keep everyone entertained. Challenge your friends to a game of pool or foosball, or indulge in a friendly round of putt-putt golf on our custom-designed 3-hole course. With 8 smart TVs and high-speed internet throughout the property, you can easily stream your favorite shows or cheer for your team without missing a beat.\n\nStay active with our private pickleball and basketball court, perfect for hours of fun and exercise. For the little ones, a dedicated play area with a charming playhouse and games is conveniently located within view of the main living spaces, ensuring peace of mind for parents.\n\nOn cooler evenings, unwind in our luxurious hot tub, take a dip in the expansive heated pool, or gather around the custom fire pit for cozy conversations. If work calls during your stay, the primary bedroom features a dedicated workspace and our high-speed mesh WiFi allows you to stay connected while enjoying your vacation.\n\nThe gourmet kitchen is fully stocked with everything you need to whip up delicious meals, including a multi-tool mixer, toaster, crockpot, and Ninja blender. Enjoy meals together with ample seating options: a breakfast area for four, bar top seating for four, and a formal dining room that comfortably seats 10, all bathed in natural sunlight. Prefer al fresco dining? Step onto the large deck with outdoor seating for eight, conveniently located next to the pool.\n\nStep outside the living room to discover a private seating area perfect for playing board games with family and friends. For the grill masters in your group, our brand-new 3-burner Weber Grill awaits your culinary creations. Turn on your favorite playlist, crack open a cold drink, and savor delicious meals in the beautiful backyard.\n\nThe thoughtfully designed layout of this home enhances your experience. The living room is ideally situated near the kitchen, perfect for entertaining. The bunk room provides a fun space for younger guests, while the first-floor primary suite features a king bed and cozy seating area. Enjoy direct access to the covered deck from the living room, complete with sectional seating, a Smart TV, and a ceiling fan for added comfort. The garage game room is conveniently located nearby, along with a laundry room featuring a half bath that is easily accessible from the pool area. Rinse off the beach sand in our custom outdoor shower, located right outside the laundry room.\n\nOn the upper level, you’ll find three inviting bedrooms and two bathrooms. The upstairs primary suite boasts a spacious ensuite bath, a king bed, and a sleeper sofa, perfect for little ones who want to stay close to their parents. We also provide a pack and play, high chair, and stroller for your convenience, so you can leave those bulky items at home. The second bedroom features a king bed with ample storage, while the third bedroom offers a double queen option with a full hallway bathroom easily accessible.\n\nBook your unforgettable getaway at Clearwater Stay and Play Resort, where luxury meets fun in the sun!\n\nGuest access\nGuests have access to the entire house minus the two locked owner's closets; one in the laundry room and one in the primary suite bathroom on the second level.\n\nOther things to note\nCheck-in is at 4 pm\nCheck-out is at 10 am\nShow more	2a6c6985-d71f-4805-951e-9c1e76e3975f	\N	t	["Bathroom","Bathtub","Hair dryer","Cleaning products","Shampoo","Conditioner","Body soap","Outdoor shower","Hot water","Shower gel","Bedroom and laundry","Washer","Dryer","Essentials","Towels, bed sheets, soap, and toilet paper","Hangers","Bed linens","Cotton linens","Extra pillows and blankets","Room-darkening shades","Iron","Drying rack for clothing","Clothing storage","Entertainment","Ethernet connection","TV","Pool table","Arcade games","Books and reading material","Life size games","Mini golf","Family","Crib","Pack ’n play/Travel crib - always at the listing","Room-darkening shades","Children’s books and toys for ages 0-2 years old, 2-5 years old, 5-10 years old, and 10+ years old","Folding or convertible high chair - always at the listing","Board games","Outdoor playground","An outdoor area equipped with play structures for children","Heating and cooling","Air conditioning","Portable fans","Heating","Home safety","Noise decibel monitors on property","Exterior security cameras on property","2 exterior cameras in the front to monitor for package deliveries and cleaners.","Smoke alarm","Carbon monoxide alarm","Fire extinguisher","First aid kit","Internet and office","Wifi","Dedicated workspace","Kitchen and dining","Kitchen","Space where guests can cook their own meals","Samsung refrigerator","Microwave","Cooking basics","Pots and pans, oil, salt and pepper","Dishes and silverware","Bowls, chopsticks, plates, cups, etc.","Freezer","Dishwasher","Electric stove","Oven","Hot water kettle","Coffee maker","Wine glasses","Toaster","Baking sheet","Blender","Barbecue utensils","Grill, charcoal, bamboo skewers/iron skewers, etc.","Dining table","Coffee","Outdoor","Private patio or balcony","Private backyard – Fully fenced","An open space on the property usually covered in grass","Fire pit","Outdoor furniture","Outdoor dining area","BBQ grill","Beach essentials","Beach towels, umbrella, beach blanket, snorkeling gear","Sun loungers","Parking and facilities","Free parking on premises","Pool","Hot tub","Services","Self check-in","Smart lock","Not included","Unavailable: Private entrance","Private entrance"]	https://a0.muscache.com/im/pictures/miso/Hosting-1416005972972876632/original/ea3cfe92-db01-4160-89cc-4c40cb518713.jpeg?im_w=720	["https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTQxNjAwNTk3Mjk3Mjg3NjYzMg==/original/a7098dcf-d85f-47cd-9d5a-c3258cef22ff.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-1416005972972876632/original/ea3cfe92-db01-4160-89cc-4c40cb518713.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTQxNjAwNTk3Mjk3Mjg3NjYzMg==/original/42fb0952-0348-4ff7-85ba-91dddd5a81d9.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTQxNjAwNTk3Mjk3Mjg3NjYzMg==/original/ea9eef2d-4f0f-4645-a37f-34feb52942ad.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTQxNjAwNTk3Mjk3Mjg3NjYzMg==/original/0b163838-6e63-4cf5-9130-7faa3d81e906.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTQxNjAwNTk3Mjk3Mjg3NjYzMg==/original/c964f859-7e93-4c29-839d-d23fe316a190.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTQxNjAwNTk3Mjk3Mjg3NjYzMg==/original/54fdc936-8424-405f-8973-be28fafe1262.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTQxNjAwNTk3Mjk3Mjg3NjYzMg==/original/75e8c961-57b2-4e13-9089-f0fc455bcb4d.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTQxNjAwNTk3Mjk3Mjg3NjYzMg==/original/d4dccd69-8df2-4ed6-a164-b17fcbaf56e6.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTQxNjAwNTk3Mjk3Mjg3NjYzMg==/original/0c9f406b-18a2-4963-a88b-f8adb815cbd5.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTQxNjAwNTk3Mjk3Mjg3NjYzMg==/original/a93a5038-c911-49c0-b4a1-8e3fc62d9820.jpeg?im_w=720"]
86bdadd1-39bd-4008-839e-6052acf811f7	2025-05-12 21:46:32.586987+00		SHORT WALK TO Playa Penca! Pool, Gated, Sleeps 6\nShare\nSave				www.airbnb.com/rooms/50395943	50395943	Here Comes the Sun, Little Darling! - a gated haven with 24/7 security. This cozy, air-conditioned condo sleeps 6, making it ideal for families or couples.  Only 200 meters from 2 stunning beaches, and surrounded by an array of local eateries.   King Bed in the Master, Bunk bed and Queen bed in second bedroom, trundle bed sofa in living room, Pack & Play, new Stainless steel appliances, TV with Netflix, beach shade tent, chairs, wagon, High Speed WIFI,  patio steps away a salt water pool.\n\nThe space\nPerfect unit for couples, families or that special friend trip.  Stay longer and work from our dedicated work space. The patio is steps away from a salt water pool overlooking a well-cared for, lush tropical landscaped grounds.  Free marked parking space next to security guard.\n\nThis Condo is #3 in popular Casa Del Sol Complex.\n\nGuest access\nWe are 30-45 minutes from the popular Tamarindo, 2 miles from Playa Flamingo, 2 miles from Las Catalinas, 23 miles from the Liberia airport.  Active volcano of Rincon de la Vieja is about 2 hours away. Beaches, horseback riding, sailing, ATV riding, Kayaking, Surfing, hiking, things to do are endless and all close by.   FREE parking,  the unit has it own marked parking space.  There is even an EV charger in our parking lot for your use.\n\nOther things to note\n**FEATURES**\n-LOCATION, LOCATION, LOCATION - close to lots of beaches, restaurants, walking trails, things to do\n-Sleeps 6 - KING bed in the Master, Queen, bunk bed, Sofa with pull out Trundle bed, Pack and Play, New Stainless Steep Appliances\n-Salt water pool in our complex\n-Central Air Conditioner\n-Washer/Dryer\n-Dedicated Work space\n-5G Fiber Optic WIFI\n-Fully stocked kitchen with everything you'd need to make a home-cooked meal\n-WEEKLY CLEANING INCLUDED\n-First Floor unit, Patio, steps away from the pool\n-Beautifully landscaped Complex\n\n-Small dogs are allowed for an extra $100 cleaning fee\n\nHave any questions about our condo or location? Feel free to contact us\nShow more	e151c236-9a85-4de3-ba10-56d0ffe2feb2	\N	t	["Scenic views","Courtyard view","Garden view","Pool view","Resort view","Bathroom","Bathtub","Hair dryer","Cleaning products","Local, environmentally friendly soap shampoo","Local, environmentally friendly soap conditioner","Local, environmentally friendly soap body soap","Outdoor shower","Hot water","Shower gel","Bedroom and laundry","Free washer – In unit","Free dryer – In unit","Essentials","Towels, bed sheets, soap, and toilet paper","Hangers","Bed linens","Cotton linens","Extra pillows and blankets","Room-darkening shades","Iron","Safe","Clothing storage: closet and dresser","Entertainment","43 inch HDTV with Netflix, Roku","Exercise equipment","Family","Pack ’n play/Travel crib","Clamp on table seat high chair - always at the listing","With straps/harness and food tray","Changing table","Board games","Heating and cooling","Central air conditioning","Ceiling fan","Portable fans","Home safety","Exterior security cameras on property","Only one by the key lock box to make sure only our renters are accessing our key lock box. We tried to limit it to only show the walkway and the key lock box.","Smoke alarm","Carbon monoxide alarm","Internet and office","Wifi","Dedicated workspace","In a common space","Kitchen and dining","Kitchen","Space where guests can cook their own meals","Samsung refrigerator","Microwave","Cooking basics","Pots and pans, oil, salt and pepper","Dishes and silverware","Bowls, chopsticks, plates, cups, etc.","Freezer","Dishwasher","Samsung stainless steel electric stove","Stainless steel oven","Hot water kettle","Coffee maker: drip coffee maker","Wine glasses","Toaster","Baking sheet","Blender","Rice maker","Dining table","Location features","Shared beach access","Guests can enjoy a nearby beach","Private entrance","Separate street or building entrance","Free resort access","Guests can use nearby resort facilities","Outdoor","Private patio or balcony","Shared backyard – Fully fenced","An open space on the property usually covered in grass","Outdoor furniture","Hammock","Outdoor dining area","Shared BBQ grill: charcoal","Beach essentials","Beach towels, umbrella, beach blanket, snorkeling gear","Parking and facilities","Free parking on premises – 1 space","Free street parking","Shared outdoor pool - available all year, open specific hours","open from 6:00 AM to 11:00 PM","Shared hot tub - available all year, open specific hours","open from 6:00 AM to 11:00 PM","Single level home","No stairs in home","Services","Pets allowed","Assistance animals are always allowed","Luggage dropoff allowed","For guests' convenience when they have early arrival or late departure","Long term stays allowed","Allow stay for 28 days or more","Self check-in","Lockbox","Not included","Unavailable: Heating","Heating"]	https://a0.muscache.com/im/pictures/miso/Hosting-50395943/original/87da4620-4d85-4319-8acd-76ffea34f6c6.png?im_w=720	["https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NTAzOTU5NDM=/original/d4453bd6-5732-4ea7-8d49-befe9c1dc7ca.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NTAzOTU5NDM=/original/c06b1cc4-9d53-4338-a96e-b0508c57c9a7.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NTAzOTU5NDM=/original/50076039-012f-4c0f-856f-6d4135a0c6d3.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NTAzOTU5NDM=/original/4cb18a62-7e59-4c9e-9d71-b4be4011fc35.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NTAzOTU5NDM=/original/f793a67e-12ef-4bec-a201-6bbcde7576c1.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NTAzOTU5NDM=/original/60f1163e-aa10-4300-bcc3-ae8a8d737878.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NTAzOTU5NDM=/original/16d19fdc-420f-4b34-bc55-fead023de2b2.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-50395943/original/51ccf509-da26-46cf-a792-b850fdb45876.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NTAzOTU5NDM=/original/78ec2c86-500a-4239-ab89-6d2df304730c.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-50395943/original/87da4620-4d85-4319-8acd-76ffea34f6c6.png?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NTAzOTU5NDM=/original/d4453bd6-5732-4ea7-8d49-befe9c1dc7ca.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NTAzOTU5NDM=/original/5dabee14-cb3d-4552-aad1-efce46cd5525.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NTAzOTU5NDM=/original/3c4f3869-c6ef-44bc-97a5-13d18f70610a.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NTAzOTU5NDM=/original/eb3bcfe5-978e-4080-a4c9-4814b9901ce5.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NTAzOTU5NDM=/original/215270b2-c584-4b0c-b73d-85c81f5df2f5.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NTAzOTU5NDM=/original/d49c9bdf-24d9-4d49-866c-9f53e6895657.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-50395943/original/10b99c5a-a919-42f8-a82e-355be74f29c9.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-50395943/original/8b16becc-5b95-4e05-b977-4e83d64aed07.jpeg?im_w=720"]
9cf3e031-bc6f-42e3-bf8b-ea39d4b16287	2025-05-14 20:21:40.524958+00		Charming Tiny Home with Cabin Feel\nShare\nSave				www.airbnb.com/rooms/51655641	51655641	Welcome to Your Memorable Tiny Home in Yuma, AZ Experience the charm of tiny living in this thoughtfully designed tiny home, perfect for professionals or solo travelers visiting Yuma. Nestled on a quiet, mixed-use property, this space offers tranquility and convenience in equal measure. High-speed Wi-Fi included, ideal for work. Located just minutes from Yuma’s key attractions and business hubs, this cozy retreat is perfect for professionals seeking a peaceful yet connected stay.\n\nThe space\nThe Tiny Home is located at the back of the property. It is a mixed use property that includes RV Storage, a home, and other RV Guests. 35 ft of parking for your large vehicle, travel trailer, etc\n\nGuest access\nProperty is gated and upon arrival on site helpers will grant access and provide you information for your access during your stay\nShow more	9d09ce16-014e-4e6b-bf29-9569bea73610	\N	t	["Bathroom","Cleaning products","Shampoo","Conditioner","Hot water","Bedroom and laundry","Washer","Free dryer – In unit","Essentials","Towels, bed sheets, soap, and toilet paper","Bed linens","Clothing storage","Entertainment","TV","Heating and cooling","Air conditioning","Ceiling fan","Heating - split type ductless system","Home safety","Exterior security cameras on property","Exterior Cameras on the property not specific to the Tiny Home Lot","Smoke alarm","Fire extinguisher","Internet and office","Wifi","Dedicated workspace","Kitchen and dining","Kitchen","Space where guests can cook their own meals","Refrigerator","Microwave","Cooking basics","Pots and pans, oil, salt and pepper","Dishes and silverware","Bowls, chopsticks, plates, cups, etc.","Freezer","Induction stove","Coffee maker: Keurig coffee machine","Toaster","Dining table","Coffee","Location features","Private entrance","Separate street or building entrance","Outdoor","Fire pit","Parking and facilities","Free parking on premises","Free street parking","Services","Long term stays allowed","Allow stay for 28 days or more","Host greets you","Not included","Unavailable: Carbon monoxide alarm","Carbon monoxide alarm","This place may not have a carbon monoxide detector. Reach out to the host with any questions."]	https://a0.muscache.com/im/pictures/miso/Hosting-51655641/original/d61131c1-1a86-4218-9606-bb3cc2cad6e2.jpeg?im_w=720	["https://a0.muscache.com/im/pictures/miso/Hosting-51655641/original/d61131c1-1a86-4218-9606-bb3cc2cad6e2.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NTE2NTU2NDE%3D/original/3d7d8b03-0a53-47fd-972f-896c99976673.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NTE2NTU2NDE%3D/original/36d5cd77-8a3b-4d38-acee-8d23b8e87f12.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NTE2NTU2NDE%3D/original/eddd720d-6c84-4e3c-865f-a87371dd4865.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NTE2NTU2NDE%3D/original/d1b40a1e-9bba-4784-b73b-9d05a6338265.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NTE2NTU2NDE%3D/original/7b8f1108-7566-4170-833f-e3e0683e6d2e.jpeg?im_w=720"]
71ef7d18-0f73-4245-beb9-86f9c204c089	2025-04-26 20:05:07.953504+00		The Golden Nugget\nShare\nSave				www.airbnb.com/rooms/1141348558920676154	1141348558920676154	About this place\nKeep it simple at this peaceful and centrally-located place.\n\nThe space\nThe Golden Nugget is a quiet and peaceful home located in the heart of Yuma, Az. \n\n**5 MINUTES from YRMC**\n15 minutes from MCAS\n20minutes from Algodones\n24 minutes to AZ State Prison Complex\n35 minutes to San Luis Mexico\n\nThe Golden Nugget offers a central location to a variety of destinations in Yuma. Ideal for traveling professionals looking for a clean and fully equipped home for their stay. \n\nThe pool at The Golden Nugget is a refreshing added bonus for lounging during your stay, with the Yuma weather the pool is available year-round. \n\nThe Golden Nugget is near a great walking path. Great for a morning run or an afternoon stroll. \n\nLet us make your stay a memorable one at \nThe Golden Nugget!!\n\nGuest access\nAs a guest you will have access to a full kitchen, living room, dining room and a large backyard with a refreshing pool. You will share these spaces with other guests staying in the additional rooms.\nShow more	1f04962f-9175-4935-a985-bf47c694a262	\N	t	["Bathroom","Cleaning products","Shampoo","Conditioner","Outdoor shower","Hot water","Shower gel","Bedroom and laundry","Washer","Dryer","Essentials","Towels, bed sheets, soap, and toilet paper","Hangers","Bed linens","Extra pillows and blankets","Room-darkening shades","Clothing storage","Entertainment","TV","Heating and cooling","Air conditioning","Ceiling fan","Heating","Privacy and safety","Lock on bedroom door","Smoke alarm","Carbon monoxide alarm","First aid kit","Internet and office","Wifi","Dedicated workspace","Kitchen and dining","Kitchen","Space where guests can cook their own meals","Refrigerator","Cooking basics","Pots and pans, oil, salt and pepper","Dishes and silverware","Bowls, chopsticks, plates, cups, etc.","Dishwasher","Stove","Oven","Coffee maker: Keurig coffee machine","Wine glasses","Toaster","Dining table","Coffee","Outdoor","Backyard","An open space on the property usually covered in grass","BBQ grill","Parking and facilities","Free parking on premises","Free street parking","Pool","Single level home","No stairs in home","Services","Pets allowed","Assistance animals are always allowed","Luggage dropoff allowed","For guests' convenience when they have early arrival or late departure","Long term stays allowed","Allow stay for 28 days or more","Self check-in","Keypad","Check yourself into the home with a door code","Not included","Unavailable: Exterior security cameras on property","Exterior security cameras on property"]	https://a0.muscache.com/im/pictures/miso/Hosting-1141348558920676154/original/914c5237-7843-4eb7-a6f0-7e408f6c9693.jpeg?im_w=720	["https://a0.muscache.com/im/pictures/miso/Hosting-1141348558920676154/original/92adcf7b-12cf-4413-9468-0d4ecf534686.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-1141348558920676154/original/01be07bb-4adf-416b-b981-41a6c2dd8d98.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-1141348558920676154/original/cf190416-bf7a-4888-90d0-5c236de59aba.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-1141348558920676154/original/914c5237-7843-4eb7-a6f0-7e408f6c9693.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-1141348558920676154/original/ce2fb099-a9fd-477b-b11e-7cf7b75814ca.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-1141348558920676154/original/befc7357-3af9-4715-9a6f-133f1f205a5d.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-1141348558920676154/original/2bae5792-7cb2-4267-b403-ef88c6dd8ed3.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-1141348558920676154/original/82bc11e3-f7b7-4f37-9f36-0726bb60d033.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-1141348558920676154/original/3808129f-2d05-408a-8cb2-b747cd8fa756.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-1141348558920676154/original/92adcf7b-12cf-4413-9468-0d4ecf534686.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-1141348558920676154/original/fc5e8e71-814a-46b0-8264-ec7ce002c708.jpeg?im_w=720"]
d316fbad-0553-4357-998d-497d19a7dc94	2025-05-21 22:59:21.9403+00		Lovely Hideaway Studio by Village-Private Patio\nShare\nSave				www.airbnb.com/rooms/51211294	51211294	Enjoy the cool vibe at this unique rustic getaway tucked back on a tree-lined hill 5 minutes above City of La Mesa Village, 20 minutes from downtown San Diego.  The studio is on the ground floor of our two-story house.  We live on the 2nd floor, and the studio is it's own completely private space.  \n\n5 miles to San Diego State University; 16-20 miles to San Diego beaches; 10 miles to Downtown San Diego; 15 miles to Sea World San Diego; and 13 miles to the World Famous San Diego Zoo!\n\nThe space\nStudio/Granny Flat ... 800 sf, ground floor, no-step access, with TV, Wi-Fi, queen bed, full kitchen, bathroom and laundry in unit.  Separate entrance with key-code self check-in.  Private patio with dining area and grill.\n\nOne or two pets may be allowed.  Please check with host before booking.  There is a fenced patio; however, the neighborhood has roaming coyotes, so please stay with your pet at all times.  Pets may not be left alone in the Airbnb.\n\nGuest access\nOne space guest parking off-street.  Easy access to Downtown and all events in San Diego using Light Rail Trolley, which is a 5 minute drive.  \n\n10 minute walk to quaint La Mesa Village, with restaurants and shops.  Farmer's Market each Friday and Antique Car Shows each Thursday during the summer.   And Oktoberfest 2021 coming October 1 - 3!\n\nGrossmont shopping Center is a short 8 minute drive away, with movie theaters, restaurants and shops.  \n\nLake Murray Park and boat dock is a 14 minute drive away, with fishing, walking trails and picnic areas.\n\nOther things to note\nWe are building a spa and deck area, not yet completed.  There will be no construction work while guests are visiting.\nShow more	8b883958-ffca-4f06-860f-b73753f4a1c8	\N	t	["Bathroom","Hair dryer","Cleaning products","Shampoo","Conditioner","Body soap","Hot water","Shower gel","Bedroom and laundry","Free washer – In unit","Free dryer – In unit","Essentials","Towels, bed sheets, soap, and toilet paper","Hangers","Bed linens","Extra pillows and blankets","Iron","Clothing storage: walk-in closet, closet, wardrobe, and dresser","Entertainment","43 inch HDTV with Amazon Prime Video, HBO Max, Netflix, premium cable","Books and reading material","Heating and cooling","Central air conditioning","Ceiling fan","Central heating","Home safety","Smoke alarm","Carbon monoxide alarm","Fire extinguisher","Internet and office","Wifi","Kitchen and dining","Kitchen","Space where guests can cook their own meals","Refrigerator","Microwave","Cooking basics","Pots and pans, oil, salt and pepper","Dishes and silverware","Bowls, chopsticks, plates, cups, etc.","Dishwasher","Gas stove","Oven","Coffee maker: Keurig coffee machine","Wine glasses","Toaster","Baking sheet","Barbecue utensils","Grill, charcoal, bamboo skewers/iron skewers, etc.","Dining table","Coffee","Location features","Private entrance","Separate street or building entrance","Outdoor","Private patio or balcony","Outdoor furniture","Outdoor dining area","BBQ grill","Parking and facilities","Free parking on premises","Single level home","No stairs in home","Services","Pets allowed","Assistance animals are always allowed","Self check-in","Keypad","Check yourself into the home with a door code","Not included","Unavailable: Exterior security cameras on property","Exterior security cameras on property"]	https://a0.muscache.com/im/pictures/miso/Hosting-51211294/original/a4b083b5-4cb7-4c60-aef4-b5595eb81080.jpeg?im_w=720	["https://a0.muscache.com/im/pictures/miso/Hosting-51211294/original/fb24e79e-74f2-4133-a9a0-5872eecdf2a6.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-51211294/original/9cb07265-3d64-409e-9e9f-154e7bdc1ef4.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-51211294/original/ea71ea6f-f061-44f8-bccf-de458aed7f77.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-51211294/original/a4b083b5-4cb7-4c60-aef4-b5595eb81080.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-51211294/original/f18b4676-5353-42fc-8ea5-6b9f5fcfa5d5.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-51211294/original/c34ccc31-4807-48f0-a724-1c61a4b2092b.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-51211294/original/6195bb43-bcdc-4779-b7c9-b03e9897ea76.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NTEyMTEyOTQ%3D/original/18b5072c-9882-4378-ba9b-ab33f61de581.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-51211294/original/fb24e79e-74f2-4133-a9a0-5872eecdf2a6.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-51211294/original/6688a4a9-9284-482e-bf92-f2fcb020d3ea.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-51211294/original/f7afa207-8730-4e4d-a7f8-087bce1ee09d.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-51211294/original/c0ae0377-2f6d-455a-a5a6-e64aafac300e.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-51211294/original/4e4c0d45-e18f-4a75-b4b7-0ec4afb9c5af.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-51211294/original/e3b162cd-1012-4b82-af01-e83dcdfa450c.jpeg?im_w=720"]
730e3382-53cd-4f9a-ba2c-5e6074cf0c25	2025-05-11 02:22:08.888834+00		Cozy Cabin w/ Hot Tub, Pool & Near Attractions\nShare\nSave				www.airbnb.com/rooms/1310248822395204116	1310248822395204116	Welcome to Big Bear Bend! This cozy cabin is ideally located for easy access to all the Smoky Mountains have to offer. Just off the Gatlinburg bypass, with a trolley stop nearby, you're minutes from top attractions like downtown Gatlinburg (3 miles), Pigeon Forge (6 miles), and Dollywood (8 miles). Relax with hot tub, indoor wood-burning fireplace, outdoor grill & fire pit. Enjoy seasonal access to 3 outdoor pools, tennis courts, and ample parking for 3 cars. Perfect for your mountain getaway!\n\nThe space\n**Cozy Chalet Retreat with Hot Tub, Fire Pit, Seasonal Pool Access (3 pools!) - just minutes to main attractions**\n\nEscape to this charming chalet in the heart of Chalet Village, offering a perfect blend of relaxation and fun for families and groups alike. Located just out of the busyness, this property features a wrap-around porch with a year-round 4-person hot tub, ideal for unwinding after a day of adventure. Cook up a meal on the charcoal grill, then gather around the outdoor fire pit to enjoy a night under the stars.\n\nInside, the main level boasts an open-concept kitchen and living room with a cozy wood-burning fireplace, perfect for those chilly nights. The fully equipped kitchen features a large refrigerator/freezer, stove, oven, microwave, and dishwasher, along with all the dishes, cookware, and utensils you need to prepare your favorite meals. For some entertainment, enjoy the arcade game or relax in front of the Roku TV to stream your favorite shows. A convenient 1/2 bathroom is located on the main floor, and the queen sleeper sofa provides extra sleeping space.\n\nUpstairs, you'll find two comfortable bedrooms with queen beds, perfect for a restful night's sleep. The full bathroom includes a spacious shower, and a queen futon provides additional sleeping space for larger groups. Both bedrooms have Roku TVs for your viewing pleasure.\n\nGuests also have access to Chalet Village’s exclusive amenities, including 3 clubhouses, each with a seasonal outdoor pool (open from Memorial Day to Labor Day), 2 tennis courts, additional games, and free WiFi. \n\nWhether you're here to relax or explore the beautiful surroundings, this chalet is the perfect getaway.\n\nBook your stay today and create unforgettable memories!.\n\nGuest access\nGuests will have access to the entire property and all amenities offered by the Chalet Village Community.\n\n**Clubhouse Amenities:**\n\n **North Clubhouse (705 Village Loop Rd)**\n  - Outdoor pools (1 for children), lighted tennis courts  \n  - Outdoor ping pong, foosball, yard games, paved walking trail  \n  - Private banquet room for rent (seats 65) with full kitchen, wood-burning fireplace, microwave, coffee pots, and ice machine  \n  - Bring your own food and drinks (no glass containers); snacks and drinks available for purchase  \n  - Pool hours: 9am-9pm (Thursday - Tuesday, closed Wednesdays for maintenance) from Memorial Day to Labor Day\n  - Tennis equipment available; lights on for evening games until midnight  \n\n **South Baden Clubhouse (1319 South Baden Dr)** \n  - 2 outdoor pools, 2 tennis courts, horseshoes, shuffleboard, and kids' playland  \n  - Game room with pool table, foosball, ping pong, checkers, chess, and small workout room  \n  - Free wireless internet for guests  \n  - Indoor facility for rent (seats 150) with kitchen, storage freezer, bar area, and fireplace  \n  - Changing rooms and showers (towels not provided)  \n  - Drink machines and concessions available during operating hours  \n\n **Upper Alpine Clubhouse (1151 Upper Alpine Rd)**\n  - Outdoor pool (3-8ft) and children's wading pool with cascading umbrella  \n  - Game room with foosball, pool table, and more  \n  - Drink machines and concessions available during operating hours  \n  - Changing rooms and showers (towels not provided)  \n  - Closed on Thursdays for maintenance  \n  - Breathtaking mountain and ski slope views\nShow more	d0418bd1-e5e0-413e-9696-17d1e34556b3	\N	t	["Bathroom","Hair dryer","Conditioner","Body soap","Hot water","Bedroom and laundry","Washer","Free dryer – In unit","Essentials","Towels, bed sheets, soap, and toilet paper","Hangers","Bed linens","Iron","Clothing storage","Entertainment","TV","Arcade games","Family","Crib","Pack ’n play/Travel crib - always at the listing","Sheets provided","Folding or convertible high chair - always at the listing","Children’s dinnerware","Heating and cooling","Air conditioning","Indoor fireplace","Central heating","Home safety","Exterior security cameras on property","Exterior camera present","Smoke alarm","Carbon monoxide alarm","Fire extinguisher","Internet and office","Wifi","Kitchen and dining","Kitchen","Space where guests can cook their own meals","Refrigerator","Microwave","Cooking basics","Pots and pans, oil, salt and pepper","Dishes and silverware","Bowls, chopsticks, plates, cups, etc.","Freezer","Dishwasher","Stove","Single oven","Coffee maker: drip coffee maker, Keurig coffee machine","Wine glasses","Toaster","Baking sheet","Blender","Barbecue utensils","Grill, charcoal, bamboo skewers/iron skewers, etc.","Coffee","Location features","Private entrance","Separate street or building entrance","Outdoor","Fire pit","Outdoor furniture","Outdoor dining area","BBQ grill","Parking and facilities","Free parking on premises","Shared outdoor pool - available seasonally, open specific hours","Available from May to Sep","Private hot tub - available all year, open 24 hours","Services","Self check-in","Smart lock","Not included","Unavailable: Shampoo","Shampoo"]	https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTMxMDI0ODgyMjM5NTIwNDExNg==/original/96787954-2a17-4766-b568-70b632177fe2.jpeg?im_w=720	["https://a0.muscache.com/im/pictures/miso/Hosting-1310248822395204116/original/14305ce1-0e22-4afe-9f37-67c90c30aca3.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-1310248822395204116/original/1d3da70d-0eac-449a-b9ff-c76115045305.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-1310248822395204116/original/04d91fcb-84ec-4239-8cfd-865dba6bb498.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-1310248822395204116/original/f966d839-7644-411b-8ca8-8229e603dc82.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-1310248822395204116/original/6dc2c9d0-a3dd-4fa2-be3f-e731a89f908c.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-1310248822395204116/original/0cbc9992-6957-4729-bc3a-3089a80cb8c5.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-1310248822395204116/original/beee25ae-f7eb-4c9c-b08f-7b745f170bbd.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-1310248822395204116/original/120f57d0-b03d-4303-aa47-a98f0c061869.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-1310248822395204116/original/c089b4e8-84d7-434c-9956-a07239f18ed0.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-1310248822395204116/original/316e8f3f-b031-42dd-9563-32f87c5d37ec.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTMxMDI0ODgyMjM5NTIwNDExNg==/original/96787954-2a17-4766-b568-70b632177fe2.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTMxMDI0ODgyMjM5NTIwNDExNg%3D%3D/original/0618dd2b-f79f-4235-802a-b9ebdd191218.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-1310248822395204116/original/14305ce1-0e22-4afe-9f37-67c90c30aca3.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-1310248822395204116/original/a31525c5-e7c6-4f72-9719-036e710fa544.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-1310248822395204116/original/a942e275-4ce2-48d0-9192-ef97789621cb.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-1310248822395204116/original/6a7b4efb-c926-4eb6-9628-362ba2fd0cf7.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-1310248822395204116/original/0e8dbe5b-83b6-43a5-8401-f3b359125316.jpeg?im_w=720"]
daf06d19-6685-4c54-8b3e-815ca5afaa1f	2025-05-11 00:46:36.04469+00		The Prairie Peace: Family-Friendly & Near Wichita\nShare\nSave				www.airbnb.com/rooms/1398632249676892607	1398632249676892607	Welcome to The Prairie Peace, your tranquil hideaway just outside Wichita, KS. Perfect for families, this 5-bedroom gem is just over 2200 sq ft. and includes a flexible office space and boasts a fully fenced backyard. Enjoy kid-friendly rooms filled with toys, books, and tons of board games. Book your family retreat today!\n\nThe space\nThis spacious and serene home is designed with families and pets in mind. Featuring 5 bedrooms (plus a versatile office space) and a huge fenced yard, it ensures everyone can relax and play freely. With kid-friendly games and amenities, it's the perfect place for quality family time.\n\nGuest access\nGuests have complete access to the entire house including the spacious backyard, full kitchen, and laundry facilities. The main living areas are designed for relaxation, while the kids' playroom is stocked with entertaining toys, books, and games.\nShow more	3f2332c9-4f3f-45ed-9215-a65684d36bf5	\N	t	["Bathroom","Bathtub","Hair dryer","Cleaning products","Shampoo","Conditioner","Body soap","Hot water","Bedroom and laundry","Washer","Dryer","Essentials","Towels, bed sheets, soap, and toilet paper","Hangers","Bed linens","Extra pillows and blankets","Room-darkening shades","Iron","Clothing storage","Entertainment","TV","Books and reading material","Family","Crib","Pack ’n play/Travel crib","Children’s books and toys","High chair","Baby bath","Children’s dinnerware","Baby monitor","Outlet covers","Board games","Baby safety gates","Children's playroom","An indoor room with toys, books, and games for children","Heating and cooling","Air conditioning","Ceiling fan","Heating","Home safety","Exterior security cameras on property","There is a ring doorbell on the front of the house and an exterior camera near the back door overlooking the backyard.","Smoke alarm","Carbon monoxide alarm","Fire extinguisher","First aid kit","Internet and office","Wifi","Dedicated workspace","Kitchen and dining","Kitchen","Space where guests can cook their own meals","Refrigerator","Microwave","Cooking basics","Pots and pans, oil, salt and pepper","Dishes and silverware","Bowls, chopsticks, plates, cups, etc.","Freezer","Dishwasher","Stove","Oven","Hot water kettle","Coffee maker","Wine glasses","Toaster","Baking sheet","Rice maker","Barbecue utensils","Grill, charcoal, bamboo skewers/iron skewers, etc.","Dining table","Coffee","Location features","Private entrance","Separate street or building entrance","Outdoor","Patio or balcony","Backyard","An open space on the property usually covered in grass","BBQ grill","Parking and facilities","Free parking on premises","Services","Pets allowed","Assistance animals are always allowed","Long term stays allowed","Allow stay for 28 days or more"]	https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTM5ODYzMjI0OTY3Njg5MjYwNw==/original/e454c4d1-b888-48df-b632-a2d48fb87226.jpeg?im_w=720	["https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTM5ODYzMjI0OTY3Njg5MjYwNw==/original/aced1dc6-a427-4aa1-94e5-57c5078942fd.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTM5ODYzMjI0OTY3Njg5MjYwNw==/original/a4d433b8-f1cf-4b1c-ab8c-c7e3eed960b1.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTM5ODYzMjI0OTY3Njg5MjYwNw==/original/92e992bc-98d7-4b08-a50b-a42604a24666.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTM5ODYzMjI0OTY3Njg5MjYwNw==/original/e7c580dc-92bc-47de-a601-9747d267a29f.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTM5ODYzMjI0OTY3Njg5MjYwNw==/original/4e164bd9-e204-40f4-a21b-d80965c5fbd4.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTM5ODYzMjI0OTY3Njg5MjYwNw==/original/1d5567e9-21a2-45b8-995c-c1e42f4a99ee.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTM5ODYzMjI0OTY3Njg5MjYwNw==/original/f925647d-b856-4e87-aaa6-a1a33778a53e.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTM5ODYzMjI0OTY3Njg5MjYwNw==/original/cef33c90-e369-4106-bc66-2fe02d932a87.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTM5ODYzMjI0OTY3Njg5MjYwNw==/original/d120c02a-5c9b-45f4-8015-e04333e97ab1.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-1398632249676892607/original/e00db72c-9e47-4f3a-997f-f19f318cf229.png?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTM5ODYzMjI0OTY3Njg5MjYwNw==/original/11a81826-f139-4585-9ad9-fc36d67635cc.jpeg?im_w=720"]
b8860c9b-0b4f-4ea2-bcab-36dadf86f39e	2025-09-19 23:36:59.174146+00		5BR~Unique~Private Forest Retreat~1 Mile to Beach!\nShare\nSave				www.airbnb.com/rooms/1513132930493900463	1513132930493900463	Welcome to the BRAND NEW Oak & Ocean Retreat in sunny Seminole, FL! This 5-bedroom haven is loaded with amenities and is just 1 mile from award-winning beaches. We provide everything you need for a beachside adventure: 4 beach cruiser bicycles for a 7-minute ride to the shore, 2 inflatable stand-up paddleboards, and 2 see-through kayaks for spotting amazing sea life in our crystal-clear waters. Enjoy the perfect mix of relaxation and fun at our retreat!\n\nThe space\nWelcome to the Seminole Oak & Ocean Retreat – Your Ultimate Vacation Oasis!\n\nDiscover an unforgettable escape in our 3,000 sq. ft. retreat, designed with both relaxation and adventure in mind. Featuring 5 spacious bedrooms and 3 bathrooms, this luxurious home accommodates up to 16 guests. Nestled among mature oaks and pines in a private neighborhood, enjoy the serene forest ambiance just a bike ride away from award-winning beaches.\n\nIndulge in leisure and play with our wealth of amenities. Dive into friendly competition in our speakeasy-inspired game room, equipped with pool and foosball tables, plus dual smart TVs for simultaneous viewing. Stay active on our private pickleball and basketball court, or enjoy ping-pong and cornhole.\n\nFor outdoor enthusiasts, our property offers 4 beach-cruiser bicycles, 2 see-through kayaks, and 2 inflatable stand-up paddleboards. Explore local waters within minutes, with several launch points just a mile away. On cooler evenings, cozy up around the custom fire pit for memorable conversations.\nStay connected with high-speed mesh WiFi and a dedicated workspace. The gourmet kitchen is ready for culinary adventures, featuring all the essentials plus a multi-tool mixer, toaster, crockpot, and blender. Dine together with seating for 20 across various spaces, from sunlit indoor areas to a large outdoor deck overlooking the private backyard.\nGrill masters will love our 3-burner grill on the rear entertainment deck, perfect for al fresco dining. Enjoy the thoughtfully designed layout enhancing your stay, with a first-floor primary suite offering direct access to the pool courtyard, a fun bunk room for younger guests, and a cozy living room for family gatherings.\n\nUpstairs, three inviting bedrooms share a newly updated bathroom. Convenience is key; we provide a pack and play, high chair, and stroller so you can travel light.\n\nBook your stay at The Seminole Oak & Ocean Retreat, where luxury blends seamlessly with sun-drenched fun!\n\nGuest access\nGuests will have access to the entire property minus one locked owners closet.\n\nOther things to note\nLeaves in and around the pool area\n\nAmidst the beauty of our mature oak trees, you'll enjoy a serene, forest-like setting with plenty of natural shade—a welcome reprieve from the Florida heat. These majestic trees occasionally share their leaves with us, finding their way into the pool and around the property. Despite our efforts to service the pool twice weekly, you might encounter some leaves upon arrival or during your stay.\n\nTo ensure a worry-free experience, we've equipped the property with state-of-the-art, solar-powered robotic pool skimmers for effortless pool maintenance. For those seeking a pristine pool, you may need to scoop out leaves during your stay. Additionally, leaf blowers are available for your use to keep seating and dining areas tidy. Embrace the natural charm of our retreat, enjoying the tools provided for your convenience.\n\nPlease don’t give us a bad review because of the incidental and unavoidable leaves in the pool.  We’d rather you not book the property if you think this will be an issue.\nShow more	2a6c6985-d71f-4805-951e-9c1e76e3975f	\N	t	["Bathroom","Bathtub","Hair dryer","Shampoo","Conditioner","Body soap","Bidet","Hot water","Shower gel","Bedroom and laundry","Washer","Free dryer – In unit","Essentials","Towels, bed sheets, soap, and toilet paper","Hangers","Bed linens","Cotton linens","Room-darkening shades","Iron","Clothing storage: walk-in closet, closet, and dresser","Entertainment","TV","Ping pong table","Pool table","Arcade games","Books and reading material","Movie theater","Family","Crib - always at the listing","Mini (38 inches long x 24 inches wide)","Pack ’n play/Travel crib","Children’s books and toys for ages 0-2 years old, 2-5 years old, 5-10 years old, and 10+ years old","Folding or convertible high chair - always at the listing","Board games","Outdoor playground","An outdoor area equipped with play structures for children","Heating and cooling","Air conditioning","Ceiling fan","Portable fans","Central heating","Home safety","Noise decibel monitors on property","Exterior security cameras on property","We have 2 security cameras on the property. 1 doorbell camera and one camera showing the driveway in the front. There are no cameras on the interior or located in any of the other areas of the property.","Smoke alarm","Carbon monoxide alarm","Fire extinguisher","First aid kit","Internet and office","Wifi","Dedicated workspace","Kitchen and dining","Kitchen","Space where guests can cook their own meals","Refrigerator","Microwave","Cooking basics","Pots and pans, oil, salt and pepper","Dishes and silverware","Bowls, chopsticks, plates, cups, etc.","Freezer","Dishwasher","Stove","Oven","Hot water kettle","Coffee maker: drip coffee maker, french press, Keurig coffee machine","Wine glasses","Toaster","Blender","Barbecue utensils","Grill, charcoal, bamboo skewers/iron skewers, etc.","Dining table","Location features","Private entrance","Separate street or building entrance","Outdoor","Private patio or balcony","Private backyard – Fully fenced","An open space on the property usually covered in grass","Fire pit","Outdoor furniture","Hammock","Outdoor dining area","BBQ grill","Beach essentials","Beach towels, umbrella, beach blanket, snorkeling gear","Bikes","Kayak","Sun loungers","Parking and facilities","Free parking on premises","Pool"]	https://a0.muscache.com/im/pictures/hosting/Hosting-1513132930493900463/original/7ad83b1b-49ba-47ba-a5a5-2946778fbb7b.jpeg?im_w=720	["https://a0.muscache.com/im/pictures/hosting/Hosting-1513132930493900463/original/7ad83b1b-49ba-47ba-a5a5-2946778fbb7b.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-1513132930493900463/original/cec3951d-9c29-46e0-a445-84f15837e8e9.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-1513132930493900463/original/b11fd3d9-379e-4e3c-aceb-220e81bff1da.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTUxMzEzMjkzMDQ5MzkwMDQ2Mw==/original/553005ba-ea1b-42bb-8d21-11295cc87bc8.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTUxMzEzMjkzMDQ5MzkwMDQ2Mw==/original/48ccbae6-5e7a-4b69-ba33-23c0203f9905.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTUxMzEzMjkzMDQ5MzkwMDQ2Mw==/original/1cd97d1e-c346-4dc8-9b0e-5907382d6a35.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTUxMzEzMjkzMDQ5MzkwMDQ2Mw==/original/78171284-839c-419f-8517-0a3e2a910c16.jpeg?im_w=720"]
\.


--
-- Data for Name: str_property_ratings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.str_property_ratings (id, created_at, property_id, description_rating_number, hero_image_rating_number, overall_photo_rating, interior_rating_category, "30_day_occupancy", "60_day_occupancy", "90_day_occupancy", feedback, suggestions, description_rating_category, amenities_rating_category, amenities_rating_number, hero_image_rating_category, title_rating_number, title_rating_category, interior_rating_number, other_images_rating_category, other_images_rating_number) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.schema_migrations (version, inserted_at) FROM stdin;
20211116024918	2025-04-23 05:41:07
20211116045059	2025-04-23 05:41:09
20211116050929	2025-04-23 05:41:11
20211116051442	2025-04-23 05:41:13
20211116212300	2025-04-23 05:41:15
20211116213355	2025-04-23 05:41:16
20211116213934	2025-04-23 05:41:18
20211116214523	2025-04-23 05:41:20
20211122062447	2025-04-23 05:41:22
20211124070109	2025-04-23 05:41:24
20211202204204	2025-04-23 05:41:25
20211202204605	2025-04-23 05:41:27
20211210212804	2025-04-23 05:41:32
20211228014915	2025-04-23 05:41:34
20220107221237	2025-04-23 05:41:36
20220228202821	2025-04-23 05:41:37
20220312004840	2025-04-23 05:41:39
20220603231003	2025-04-23 05:41:42
20220603232444	2025-04-23 05:41:44
20220615214548	2025-04-23 05:41:46
20220712093339	2025-04-23 05:41:47
20220908172859	2025-04-23 05:41:49
20220916233421	2025-04-23 05:41:51
20230119133233	2025-04-23 05:41:52
20230128025114	2025-04-23 05:41:55
20230128025212	2025-04-23 05:41:56
20230227211149	2025-04-23 05:41:58
20230228184745	2025-04-23 05:42:00
20230308225145	2025-04-23 05:42:01
20230328144023	2025-04-23 05:42:03
20231018144023	2025-04-23 05:42:05
20231204144023	2025-04-23 05:42:08
20231204144024	2025-04-23 05:42:10
20231204144025	2025-04-23 05:42:11
20240108234812	2025-04-23 05:42:13
20240109165339	2025-04-23 05:42:15
20240227174441	2025-04-23 05:42:18
20240311171622	2025-04-23 05:42:20
20240321100241	2025-04-23 05:42:24
20240401105812	2025-04-23 05:42:28
20240418121054	2025-04-23 05:42:31
20240523004032	2025-04-23 05:42:37
20240618124746	2025-04-23 05:42:39
20240801235015	2025-04-23 05:42:40
20240805133720	2025-04-23 05:42:42
20240827160934	2025-04-23 05:42:44
20240919163303	2025-04-23 05:42:46
20240919163305	2025-04-23 05:42:48
20241019105805	2025-04-23 05:42:49
20241030150047	2025-04-23 05:42:56
20241108114728	2025-04-23 05:42:58
20241121104152	2025-04-23 05:43:00
20241130184212	2025-04-23 05:43:02
20241220035512	2025-04-23 05:43:04
20241220123912	2025-04-23 05:43:05
20241224161212	2025-04-23 05:43:07
20250107150512	2025-04-23 05:43:09
20250110162412	2025-04-23 05:43:10
20250123174212	2025-04-23 05:43:12
20250128220012	2025-04-23 05:43:14
20250506224012	2025-07-01 14:35:06
20250523164012	2025-07-01 14:35:06
20250714121412	2025-08-20 02:36:55
20250905041441	2025-09-25 04:42:48
\.


--
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.subscription (id, subscription_id, entity, filters, claims, created_at) FROM stdin;
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets (id, name, owner, created_at, updated_at, public, avif_autodetection, file_size_limit, allowed_mime_types, owner_id, type) FROM stdin;
avatars	avatars	\N	2025-04-26 19:33:27.948324+00	2025-04-26 19:33:27.948324+00	f	f	\N	\N	\N	STANDARD
logo	logo	\N	2025-05-07 03:28:03.95733+00	2025-05-07 03:28:03.95733+00	t	f	\N	\N	\N	STANDARD
database-backups	database-backups	\N	2025-09-06 21:37:45.981224+00	2025-09-06 21:37:45.981224+00	f	f	\N	\N	\N	STANDARD
\.


--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets_analytics (id, type, format, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.migrations (id, name, hash, executed_at) FROM stdin;
0	create-migrations-table	e18db593bcde2aca2a408c4d1100f6abba2195df	2025-04-23 05:41:02.478133
1	initialmigration	6ab16121fbaa08bbd11b712d05f358f9b555d777	2025-04-23 05:41:02.484473
2	storage-schema	5c7968fd083fcea04050c1b7f6253c9771b99011	2025-04-23 05:41:02.488662
3	pathtoken-column	2cb1b0004b817b29d5b0a971af16bafeede4b70d	2025-04-23 05:41:02.502323
4	add-migrations-rls	427c5b63fe1c5937495d9c635c263ee7a5905058	2025-04-23 05:41:02.528913
5	add-size-functions	79e081a1455b63666c1294a440f8ad4b1e6a7f84	2025-04-23 05:41:02.532154
6	change-column-name-in-get-size	f93f62afdf6613ee5e7e815b30d02dc990201044	2025-04-23 05:41:02.536003
7	add-rls-to-buckets	e7e7f86adbc51049f341dfe8d30256c1abca17aa	2025-04-23 05:41:02.539052
8	add-public-to-buckets	fd670db39ed65f9d08b01db09d6202503ca2bab3	2025-04-23 05:41:02.541975
9	fix-search-function	3a0af29f42e35a4d101c259ed955b67e1bee6825	2025-04-23 05:41:02.54566
10	search-files-search-function	68dc14822daad0ffac3746a502234f486182ef6e	2025-04-23 05:41:02.549021
11	add-trigger-to-auto-update-updated_at-column	7425bdb14366d1739fa8a18c83100636d74dcaa2	2025-04-23 05:41:02.553871
12	add-automatic-avif-detection-flag	8e92e1266eb29518b6a4c5313ab8f29dd0d08df9	2025-04-23 05:41:02.558401
13	add-bucket-custom-limits	cce962054138135cd9a8c4bcd531598684b25e7d	2025-04-23 05:41:02.561233
14	use-bytes-for-max-size	941c41b346f9802b411f06f30e972ad4744dad27	2025-04-23 05:41:02.564438
15	add-can-insert-object-function	934146bc38ead475f4ef4b555c524ee5d66799e5	2025-04-23 05:41:02.591371
16	add-version	76debf38d3fd07dcfc747ca49096457d95b1221b	2025-04-23 05:41:02.594781
17	drop-owner-foreign-key	f1cbb288f1b7a4c1eb8c38504b80ae2a0153d101	2025-04-23 05:41:02.598066
18	add_owner_id_column_deprecate_owner	e7a511b379110b08e2f214be852c35414749fe66	2025-04-23 05:41:02.60152
19	alter-default-value-objects-id	02e5e22a78626187e00d173dc45f58fa66a4f043	2025-04-23 05:41:02.605633
20	list-objects-with-delimiter	cd694ae708e51ba82bf012bba00caf4f3b6393b7	2025-04-23 05:41:02.61025
21	s3-multipart-uploads	8c804d4a566c40cd1e4cc5b3725a664a9303657f	2025-04-23 05:41:02.619463
22	s3-multipart-uploads-big-ints	9737dc258d2397953c9953d9b86920b8be0cdb73	2025-04-23 05:41:02.648516
23	optimize-search-function	9d7e604cddc4b56a5422dc68c9313f4a1b6f132c	2025-04-23 05:41:02.67446
24	operation-function	8312e37c2bf9e76bbe841aa5fda889206d2bf8aa	2025-04-23 05:41:02.681476
25	custom-metadata	d974c6057c3db1c1f847afa0e291e6165693b990	2025-04-23 05:41:02.68505
26	objects-prefixes	ef3f7871121cdc47a65308e6702519e853422ae2	2025-09-07 03:59:55.667433
27	search-v2	33b8f2a7ae53105f028e13e9fcda9dc4f356b4a2	2025-09-07 03:59:56.065771
28	object-bucket-name-sorting	ba85ec41b62c6a30a3f136788227ee47f311c436	2025-09-07 03:59:56.153438
29	create-prefixes	a7b1a22c0dc3ab630e3055bfec7ce7d2045c5b7b	2025-09-07 03:59:56.233398
30	update-object-levels	6c6f6cc9430d570f26284a24cf7b210599032db7	2025-09-07 03:59:56.259835
31	objects-level-index	33f1fef7ec7fea08bb892222f4f0f5d79bab5eb8	2025-09-07 03:59:56.298709
32	backward-compatible-index-on-objects	2d51eeb437a96868b36fcdfb1ddefdf13bef1647	2025-09-07 03:59:56.35067
33	backward-compatible-index-on-prefixes	fe473390e1b8c407434c0e470655945b110507bf	2025-09-07 03:59:56.387145
34	optimize-search-function-v1	82b0e469a00e8ebce495e29bfa70a0797f7ebd2c	2025-09-07 03:59:56.429093
35	add-insert-trigger-prefixes	63bb9fd05deb3dc5e9fa66c83e82b152f0caf589	2025-09-07 03:59:56.471282
36	optimise-existing-functions	81cf92eb0c36612865a18016a38496c530443899	2025-09-07 03:59:56.488518
37	add-bucket-name-length-trigger	3944135b4e3e8b22d6d4cbb568fe3b0b51df15c1	2025-09-07 03:59:56.582556
38	iceberg-catalog-flag-on-buckets	19a8bd89d5dfa69af7f222a46c726b7c41e462c5	2025-09-07 03:59:56.644376
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.objects (id, bucket_id, name, owner, created_at, updated_at, last_accessed_at, metadata, version, owner_id, user_metadata, level) FROM stdin;
9624df5e-7992-4ae2-a2b7-44a7211ee606	logo	str-feedback-genius-logo.png	\N	2025-05-07 03:29:16.547729+00	2025-09-07 03:59:56.241029+00	2025-05-07 03:29:16.547729+00	{"eTag": "\\"d8e43362f50ccf11f773bdb15d8c749b-1\\"", "size": 16931, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-05-07T03:29:17.000Z", "contentLength": 16931, "httpStatusCode": 200}	9fb91bbf-275f-4612-ad40-c203e1fcee97	\N	\N	1
dd92f73d-fc6b-4243-aebe-b6800cb45ee1	database-backups	production/backup-2025-09-07-022705.sql	\N	2025-09-07 02:27:57.030133+00	2025-09-07 03:59:56.241029+00	2025-09-07 02:27:57.030133+00	{"eTag": "\\"2384a8e264ce0a740bd06937982fdf2f-4\\"", "size": 18854893, "mimetype": "application/sql", "cacheControl": "no-cache", "lastModified": "2025-09-07T02:27:57.000Z", "contentLength": 18854893, "httpStatusCode": 200}	09d426ba-7a26-4390-b22d-b1a9281057f6	\N	{}	2
8aefaea2-c4df-4afa-af09-bfc474cab892	database-backups	production/backup-2025-09-07-023330.sql	\N	2025-09-07 02:34:19.104131+00	2025-09-07 03:59:56.241029+00	2025-09-07 02:34:19.104131+00	{"eTag": "\\"7b9a25420cdb5eff807d80dd8a62f348-4\\"", "size": 18856792, "mimetype": "application/sql", "cacheControl": "no-cache", "lastModified": "2025-09-07T02:34:19.000Z", "contentLength": 18856792, "httpStatusCode": 200}	ddf1f71c-08c4-4126-ab96-3fc2e818a84f	\N	{}	2
0462c7a1-a701-4311-aa91-0761ab82fcaf	database-backups	production/backup-2025-09-07-032203.sql	\N	2025-09-07 03:22:50.353845+00	2025-09-07 03:59:56.241029+00	2025-09-07 03:22:50.353845+00	{"eTag": "\\"5ef8ee00ebd6c6185eec7182f9d302d6-4\\"", "size": 18850495, "mimetype": "application/sql", "cacheControl": "no-cache", "lastModified": "2025-09-07T03:22:50.000Z", "contentLength": 18850495, "httpStatusCode": 200}	5c121c38-20b7-446d-bac5-10ff64615dca	\N	{}	2
\.


--
-- Data for Name: prefixes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.prefixes (bucket_id, name, created_at, updated_at) FROM stdin;
database-backups	production	2025-09-07 03:59:56.157396+00	2025-09-07 03:59:56.157396+00
\.


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads (id, in_progress_size, upload_signature, bucket_id, key, version, owner_id, created_at, user_metadata) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads_parts (id, upload_id, size, part_number, bucket_id, key, etag, owner_id, version, created_at) FROM stdin;
\.


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--

COPY vault.secrets (id, name, description, secret, key_id, nonce, created_at, updated_at) FROM stdin;
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('auth.refresh_tokens_id_seq', 130, true);


--
-- Name: scan_mismatches_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.scan_mismatches_id_seq', 1, false);


--
-- Name: scans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.scans_id_seq', 1, false);


--
-- Name: subscription_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: supabase_admin
--

SELECT pg_catalog.setval('realtime.subscription_id_seq', 1, false);


--
-- Name: mfa_amr_claims amr_id_pk; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT amr_id_pk PRIMARY KEY (id);


--
-- Name: audit_log_entries audit_log_entries_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.audit_log_entries
    ADD CONSTRAINT audit_log_entries_pkey PRIMARY KEY (id);


--
-- Name: flow_state flow_state_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.flow_state
    ADD CONSTRAINT flow_state_pkey PRIMARY KEY (id);


--
-- Name: identities identities_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_pkey PRIMARY KEY (id);


--
-- Name: identities identities_provider_id_provider_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_provider_id_provider_unique UNIQUE (provider_id, provider);


--
-- Name: instances instances_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.instances
    ADD CONSTRAINT instances_pkey PRIMARY KEY (id);


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_authentication_method_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_authentication_method_pkey UNIQUE (session_id, authentication_method);


--
-- Name: mfa_challenges mfa_challenges_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_pkey PRIMARY KEY (id);


--
-- Name: mfa_factors mfa_factors_last_challenged_at_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_last_challenged_at_key UNIQUE (last_challenged_at);


--
-- Name: mfa_factors mfa_factors_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_pkey PRIMARY KEY (id);


--
-- Name: oauth_clients oauth_clients_client_id_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_clients
    ADD CONSTRAINT oauth_clients_client_id_key UNIQUE (client_id);


--
-- Name: oauth_clients oauth_clients_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_clients
    ADD CONSTRAINT oauth_clients_pkey PRIMARY KEY (id);


--
-- Name: one_time_tokens one_time_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_token_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_unique UNIQUE (token);


--
-- Name: saml_providers saml_providers_entity_id_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_entity_id_key UNIQUE (entity_id);


--
-- Name: saml_providers saml_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_pkey PRIMARY KEY (id);


--
-- Name: saml_relay_states saml_relay_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sso_domains sso_domains_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_pkey PRIMARY KEY (id);


--
-- Name: sso_providers sso_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_providers
    ADD CONSTRAINT sso_providers_pkey PRIMARY KEY (id);


--
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: features features_key_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.features
    ADD CONSTRAINT features_key_key UNIQUE (key);


--
-- Name: features features_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.features
    ADD CONSTRAINT features_pkey PRIMARY KEY (id);


--
-- Name: listing_feedback_usage listing_feedback_usage_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listing_feedback_usage
    ADD CONSTRAINT listing_feedback_usage_pkey PRIMARY KEY (id);


--
-- Name: listings listings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listings
    ADD CONSTRAINT listings_pkey PRIMARY KEY (id);


--
-- Name: llm_usage llm_usage_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.llm_usage
    ADD CONSTRAINT llm_usage_pkey PRIMARY KEY (id);


--
-- Name: plans_features_map plans_features_map_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plans_features_map
    ADD CONSTRAINT plans_features_map_pkey PRIMARY KEY (id);


--
-- Name: plans plans_key_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plans
    ADD CONSTRAINT plans_key_key UNIQUE (key);


--
-- Name: plans plans_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plans
    ADD CONSTRAINT plans_pkey PRIMARY KEY (id);


--
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- Name: profiles profiles_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_username_key UNIQUE (username);


--
-- Name: properties properties_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT properties_pkey PRIMARY KEY (id);


--
-- Name: property_ratings property_ratings_property_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_ratings
    ADD CONSTRAINT property_ratings_property_id_key UNIQUE (property_id);


--
-- Name: scan_mismatches scan_mismatches_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scan_mismatches
    ADD CONSTRAINT scan_mismatches_pkey PRIMARY KEY (id);


--
-- Name: scans scans_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scans
    ADD CONSTRAINT scans_pkey PRIMARY KEY (id);


--
-- Name: str_properties str_properties_external_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.str_properties
    ADD CONSTRAINT str_properties_external_id_key UNIQUE (external_id);


--
-- Name: str_properties str_properties_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.str_properties
    ADD CONSTRAINT str_properties_pkey PRIMARY KEY (id);


--
-- Name: str_property_ratings str_property_ratings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.str_property_ratings
    ADD CONSTRAINT str_property_ratings_pkey PRIMARY KEY (id);


--
-- Name: str_property_ratings str_property_ratings_property_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.str_property_ratings
    ADD CONSTRAINT str_property_ratings_property_id_key UNIQUE (property_id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE ONLY realtime.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: subscription pk_subscription; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.subscription
    ADD CONSTRAINT pk_subscription PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: buckets_analytics buckets_analytics_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets_analytics
    ADD CONSTRAINT buckets_analytics_pkey PRIMARY KEY (id);


--
-- Name: buckets buckets_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets
    ADD CONSTRAINT buckets_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_name_key; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_name_key UNIQUE (name);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: objects objects_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT objects_pkey PRIMARY KEY (id);


--
-- Name: prefixes prefixes_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.prefixes
    ADD CONSTRAINT prefixes_pkey PRIMARY KEY (bucket_id, level, name);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_pkey PRIMARY KEY (id);


--
-- Name: audit_logs_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX audit_logs_instance_id_idx ON auth.audit_log_entries USING btree (instance_id);


--
-- Name: confirmation_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX confirmation_token_idx ON auth.users USING btree (confirmation_token) WHERE ((confirmation_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_current_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_current_idx ON auth.users USING btree (email_change_token_current) WHERE ((email_change_token_current)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_new_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_new_idx ON auth.users USING btree (email_change_token_new) WHERE ((email_change_token_new)::text !~ '^[0-9 ]*$'::text);


--
-- Name: factor_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX factor_id_created_at_idx ON auth.mfa_factors USING btree (user_id, created_at);


--
-- Name: flow_state_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX flow_state_created_at_idx ON auth.flow_state USING btree (created_at DESC);


--
-- Name: identities_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_email_idx ON auth.identities USING btree (email text_pattern_ops);


--
-- Name: INDEX identities_email_idx; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.identities_email_idx IS 'Auth: Ensures indexed queries on the email column';


--
-- Name: identities_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_user_id_idx ON auth.identities USING btree (user_id);


--
-- Name: idx_auth_code; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_auth_code ON auth.flow_state USING btree (auth_code);


--
-- Name: idx_user_id_auth_method; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_user_id_auth_method ON auth.flow_state USING btree (user_id, authentication_method);


--
-- Name: mfa_challenge_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_challenge_created_at_idx ON auth.mfa_challenges USING btree (created_at DESC);


--
-- Name: mfa_factors_user_friendly_name_unique; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX mfa_factors_user_friendly_name_unique ON auth.mfa_factors USING btree (friendly_name, user_id) WHERE (TRIM(BOTH FROM friendly_name) <> ''::text);


--
-- Name: mfa_factors_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_factors_user_id_idx ON auth.mfa_factors USING btree (user_id);


--
-- Name: oauth_clients_client_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_clients_client_id_idx ON auth.oauth_clients USING btree (client_id);


--
-- Name: oauth_clients_deleted_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_clients_deleted_at_idx ON auth.oauth_clients USING btree (deleted_at);


--
-- Name: one_time_tokens_relates_to_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_relates_to_hash_idx ON auth.one_time_tokens USING hash (relates_to);


--
-- Name: one_time_tokens_token_hash_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_token_hash_hash_idx ON auth.one_time_tokens USING hash (token_hash);


--
-- Name: one_time_tokens_user_id_token_type_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX one_time_tokens_user_id_token_type_key ON auth.one_time_tokens USING btree (user_id, token_type);


--
-- Name: reauthentication_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX reauthentication_token_idx ON auth.users USING btree (reauthentication_token) WHERE ((reauthentication_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: recovery_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX recovery_token_idx ON auth.users USING btree (recovery_token) WHERE ((recovery_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: refresh_tokens_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_idx ON auth.refresh_tokens USING btree (instance_id);


--
-- Name: refresh_tokens_instance_id_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_user_id_idx ON auth.refresh_tokens USING btree (instance_id, user_id);


--
-- Name: refresh_tokens_parent_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_parent_idx ON auth.refresh_tokens USING btree (parent);


--
-- Name: refresh_tokens_session_id_revoked_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_session_id_revoked_idx ON auth.refresh_tokens USING btree (session_id, revoked);


--
-- Name: refresh_tokens_updated_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_updated_at_idx ON auth.refresh_tokens USING btree (updated_at DESC);


--
-- Name: saml_providers_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_providers_sso_provider_id_idx ON auth.saml_providers USING btree (sso_provider_id);


--
-- Name: saml_relay_states_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_created_at_idx ON auth.saml_relay_states USING btree (created_at DESC);


--
-- Name: saml_relay_states_for_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_for_email_idx ON auth.saml_relay_states USING btree (for_email);


--
-- Name: saml_relay_states_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_sso_provider_id_idx ON auth.saml_relay_states USING btree (sso_provider_id);


--
-- Name: sessions_not_after_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_not_after_idx ON auth.sessions USING btree (not_after DESC);


--
-- Name: sessions_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_user_id_idx ON auth.sessions USING btree (user_id);


--
-- Name: sso_domains_domain_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_domains_domain_idx ON auth.sso_domains USING btree (lower(domain));


--
-- Name: sso_domains_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sso_domains_sso_provider_id_idx ON auth.sso_domains USING btree (sso_provider_id);


--
-- Name: sso_providers_resource_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_providers_resource_id_idx ON auth.sso_providers USING btree (lower(resource_id));


--
-- Name: sso_providers_resource_id_pattern_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sso_providers_resource_id_pattern_idx ON auth.sso_providers USING btree (resource_id text_pattern_ops);


--
-- Name: unique_phone_factor_per_user; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX unique_phone_factor_per_user ON auth.mfa_factors USING btree (user_id, phone);


--
-- Name: user_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX user_id_created_at_idx ON auth.sessions USING btree (user_id, created_at);


--
-- Name: users_email_partial_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX users_email_partial_key ON auth.users USING btree (email) WHERE (is_sso_user = false);


--
-- Name: INDEX users_email_partial_key; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.users_email_partial_key IS 'Auth: A partial unique index that applies only when is_sso_user is false';


--
-- Name: users_instance_id_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_email_idx ON auth.users USING btree (instance_id, lower((email)::text));


--
-- Name: users_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_idx ON auth.users USING btree (instance_id);


--
-- Name: users_is_anonymous_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_is_anonymous_idx ON auth.users USING btree (is_anonymous);


--
-- Name: ix_realtime_subscription_entity; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX ix_realtime_subscription_entity ON realtime.subscription USING btree (entity);


--
-- Name: messages_inserted_at_topic_index; Type: INDEX; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE INDEX messages_inserted_at_topic_index ON ONLY realtime.messages USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- Name: subscription_subscription_id_entity_filters_key; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE UNIQUE INDEX subscription_subscription_id_entity_filters_key ON realtime.subscription USING btree (subscription_id, entity, filters);


--
-- Name: bname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bname ON storage.buckets USING btree (name);


--
-- Name: bucketid_objname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bucketid_objname ON storage.objects USING btree (bucket_id, name);


--
-- Name: idx_multipart_uploads_list; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_multipart_uploads_list ON storage.s3_multipart_uploads USING btree (bucket_id, key, created_at);


--
-- Name: idx_name_bucket_level_unique; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX idx_name_bucket_level_unique ON storage.objects USING btree (name COLLATE "C", bucket_id, level);


--
-- Name: idx_objects_bucket_id_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_objects_bucket_id_name ON storage.objects USING btree (bucket_id, name COLLATE "C");


--
-- Name: idx_objects_lower_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_objects_lower_name ON storage.objects USING btree ((path_tokens[level]), lower(name) text_pattern_ops, bucket_id, level);


--
-- Name: idx_prefixes_lower_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_prefixes_lower_name ON storage.prefixes USING btree (bucket_id, level, ((string_to_array(name, '/'::text))[level]), lower(name) text_pattern_ops);


--
-- Name: name_prefix_search; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX name_prefix_search ON storage.objects USING btree (name text_pattern_ops);


--
-- Name: objects_bucket_id_level_idx; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX objects_bucket_id_level_idx ON storage.objects USING btree (bucket_id, level, name COLLATE "C");


--
-- Name: users on_auth_user_created; Type: TRIGGER; Schema: auth; Owner: supabase_auth_admin
--

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


--
-- Name: subscription tr_check_filters; Type: TRIGGER; Schema: realtime; Owner: supabase_admin
--

CREATE TRIGGER tr_check_filters BEFORE INSERT OR UPDATE ON realtime.subscription FOR EACH ROW EXECUTE FUNCTION realtime.subscription_check_filters();


--
-- Name: buckets enforce_bucket_name_length_trigger; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER enforce_bucket_name_length_trigger BEFORE INSERT OR UPDATE OF name ON storage.buckets FOR EACH ROW EXECUTE FUNCTION storage.enforce_bucket_name_length();


--
-- Name: objects objects_delete_delete_prefix; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER objects_delete_delete_prefix AFTER DELETE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.delete_prefix_hierarchy_trigger();


--
-- Name: objects objects_insert_create_prefix; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER objects_insert_create_prefix BEFORE INSERT ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.objects_insert_prefix_trigger();


--
-- Name: objects objects_update_create_prefix; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER objects_update_create_prefix BEFORE UPDATE ON storage.objects FOR EACH ROW WHEN (((new.name <> old.name) OR (new.bucket_id <> old.bucket_id))) EXECUTE FUNCTION storage.objects_update_prefix_trigger();


--
-- Name: prefixes prefixes_create_hierarchy; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER prefixes_create_hierarchy BEFORE INSERT ON storage.prefixes FOR EACH ROW WHEN ((pg_trigger_depth() < 1)) EXECUTE FUNCTION storage.prefixes_insert_trigger();


--
-- Name: prefixes prefixes_delete_hierarchy; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER prefixes_delete_hierarchy AFTER DELETE ON storage.prefixes FOR EACH ROW EXECUTE FUNCTION storage.delete_prefix_hierarchy_trigger();


--
-- Name: objects update_objects_updated_at; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER update_objects_updated_at BEFORE UPDATE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.update_updated_at_column();


--
-- Name: identities identities_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: mfa_challenges mfa_challenges_auth_factor_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_auth_factor_id_fkey FOREIGN KEY (factor_id) REFERENCES auth.mfa_factors(id) ON DELETE CASCADE;


--
-- Name: mfa_factors mfa_factors_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: one_time_tokens one_time_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: refresh_tokens refresh_tokens_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: saml_providers saml_providers_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_flow_state_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_flow_state_id_fkey FOREIGN KEY (flow_state_id) REFERENCES auth.flow_state(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: sso_domains sso_domains_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: listing_feedback_usage listing_feedback_usage_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listing_feedback_usage
    ADD CONSTRAINT listing_feedback_usage_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id);


--
-- Name: listing_feedback_usage listing_feedback_usage_property_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listing_feedback_usage
    ADD CONSTRAINT listing_feedback_usage_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.str_properties(id);


--
-- Name: listings listings_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listings
    ADD CONSTRAINT listings_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id);


--
-- Name: listings listings_property_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listings
    ADD CONSTRAINT listings_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.properties(id);


--
-- Name: plans_features_map plans_features_map_feature_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plans_features_map
    ADD CONSTRAINT plans_features_map_feature_id_fkey FOREIGN KEY (feature_id) REFERENCES public.features(id);


--
-- Name: plans_features_map plans_features_map_plan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plans_features_map
    ADD CONSTRAINT plans_features_map_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.plans(id);


--
-- Name: profiles profiles_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id);


--
-- Name: properties properties_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT properties_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id);


--
-- Name: property_ratings property_ratings_property_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_ratings
    ADD CONSTRAINT property_ratings_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.str_properties(id);


--
-- Name: scan_mismatches scan_mismatches_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scan_mismatches
    ADD CONSTRAINT scan_mismatches_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id);


--
-- Name: scan_mismatches scan_mismatches_property_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scan_mismatches
    ADD CONSTRAINT scan_mismatches_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.properties(id);


--
-- Name: scan_mismatches scan_mismatches_scan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scan_mismatches
    ADD CONSTRAINT scan_mismatches_scan_id_fkey FOREIGN KEY (scan_id) REFERENCES public.scans(id);


--
-- Name: scans scans_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scans
    ADD CONSTRAINT scans_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id);


--
-- Name: scans scans_property_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scans
    ADD CONSTRAINT scans_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.properties(id);


--
-- Name: str_properties str_properties_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.str_properties
    ADD CONSTRAINT str_properties_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id);


--
-- Name: str_property_ratings str_property_ratings_property_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.str_property_ratings
    ADD CONSTRAINT str_property_ratings_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.str_properties(id);


--
-- Name: objects objects_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT "objects_bucketId_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: prefixes prefixes_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.prefixes
    ADD CONSTRAINT "prefixes_bucketId_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_upload_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_upload_id_fkey FOREIGN KEY (upload_id) REFERENCES storage.s3_multipart_uploads(id) ON DELETE CASCADE;


--
-- Name: audit_log_entries; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.audit_log_entries ENABLE ROW LEVEL SECURITY;

--
-- Name: flow_state; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.flow_state ENABLE ROW LEVEL SECURITY;

--
-- Name: identities; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.identities ENABLE ROW LEVEL SECURITY;

--
-- Name: instances; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.instances ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_amr_claims; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_amr_claims ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_challenges; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_challenges ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_factors; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_factors ENABLE ROW LEVEL SECURITY;

--
-- Name: one_time_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.one_time_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: refresh_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.refresh_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_relay_states; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_relay_states ENABLE ROW LEVEL SECURITY;

--
-- Name: schema_migrations; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.schema_migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: sessions; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sessions ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_domains; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_domains ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: users; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

--
-- Name: profiles Public profiles are viewable by everyone.; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);


--
-- Name: profiles Users can insert their own profile.; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK ((( SELECT auth.uid() AS uid) = id));


--
-- Name: profiles Users can update own profile.; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING ((( SELECT auth.uid() AS uid) = id));


--
-- Name: profiles; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

--
-- Name: messages; Type: ROW SECURITY; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

--
-- Name: objects Anyone can update their own avatar.; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Anyone can update their own avatar." ON storage.objects FOR UPDATE USING ((auth.uid() = owner)) WITH CHECK ((bucket_id = 'avatars'::text));


--
-- Name: objects Anyone can upload an avatar.; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Anyone can upload an avatar." ON storage.objects FOR INSERT WITH CHECK ((bucket_id = 'avatars'::text));


--
-- Name: objects Avatar images are publicly accessible.; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Avatar images are publicly accessible." ON storage.objects FOR SELECT USING ((bucket_id = 'avatars'::text));


--
-- Name: buckets; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets_analytics; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets_analytics ENABLE ROW LEVEL SECURITY;

--
-- Name: migrations; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: objects; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

--
-- Name: prefixes; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.prefixes ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads_parts; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads_parts ENABLE ROW LEVEL SECURITY;

--
-- Name: supabase_realtime; Type: PUBLICATION; Schema: -; Owner: postgres
--

CREATE PUBLICATION supabase_realtime WITH (publish = 'insert, update, delete, truncate');


ALTER PUBLICATION supabase_realtime OWNER TO postgres;

--
-- Name: SCHEMA auth; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA auth TO anon;
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT USAGE ON SCHEMA auth TO service_role;
GRANT ALL ON SCHEMA auth TO supabase_auth_admin;
GRANT ALL ON SCHEMA auth TO dashboard_user;
GRANT USAGE ON SCHEMA auth TO postgres;


--
-- Name: SCHEMA extensions; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA extensions TO anon;
GRANT USAGE ON SCHEMA extensions TO authenticated;
GRANT USAGE ON SCHEMA extensions TO service_role;
GRANT ALL ON SCHEMA extensions TO dashboard_user;


--
-- Name: SCHEMA net; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA net TO supabase_functions_admin;
GRANT USAGE ON SCHEMA net TO postgres;
GRANT USAGE ON SCHEMA net TO anon;
GRANT USAGE ON SCHEMA net TO authenticated;
GRANT USAGE ON SCHEMA net TO service_role;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT USAGE ON SCHEMA public TO postgres;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;


--
-- Name: SCHEMA realtime; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA realtime TO postgres;
GRANT USAGE ON SCHEMA realtime TO anon;
GRANT USAGE ON SCHEMA realtime TO authenticated;
GRANT USAGE ON SCHEMA realtime TO service_role;
GRANT ALL ON SCHEMA realtime TO supabase_realtime_admin;


--
-- Name: SCHEMA storage; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA storage TO postgres WITH GRANT OPTION;
GRANT USAGE ON SCHEMA storage TO anon;
GRANT USAGE ON SCHEMA storage TO authenticated;
GRANT USAGE ON SCHEMA storage TO service_role;
GRANT ALL ON SCHEMA storage TO supabase_storage_admin;
GRANT ALL ON SCHEMA storage TO dashboard_user;


--
-- Name: SCHEMA vault; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA vault TO postgres WITH GRANT OPTION;
GRANT USAGE ON SCHEMA vault TO service_role;


--
-- Name: FUNCTION email(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.email() TO dashboard_user;
GRANT ALL ON FUNCTION auth.email() TO postgres;


--
-- Name: FUNCTION jwt(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.jwt() TO postgres;
GRANT ALL ON FUNCTION auth.jwt() TO dashboard_user;


--
-- Name: FUNCTION role(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.role() TO dashboard_user;
GRANT ALL ON FUNCTION auth.role() TO postgres;


--
-- Name: FUNCTION uid(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.uid() TO dashboard_user;
GRANT ALL ON FUNCTION auth.uid() TO postgres;


--
-- Name: FUNCTION algorithm_sign(signables text, secret text, algorithm text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.algorithm_sign(signables text, secret text, algorithm text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.algorithm_sign(signables text, secret text, algorithm text) TO dashboard_user;


--
-- Name: FUNCTION armor(bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.armor(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO dashboard_user;


--
-- Name: FUNCTION armor(bytea, text[], text[]); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO dashboard_user;


--
-- Name: FUNCTION crypt(text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.crypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO dashboard_user;


--
-- Name: FUNCTION dearmor(text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.dearmor(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO dashboard_user;


--
-- Name: FUNCTION decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION decrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION digest(bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION digest(text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.digest(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO dashboard_user;


--
-- Name: FUNCTION encrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION encrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION gen_random_bytes(integer); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO dashboard_user;


--
-- Name: FUNCTION gen_random_uuid(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO dashboard_user;


--
-- Name: FUNCTION gen_salt(text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.gen_salt(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO dashboard_user;


--
-- Name: FUNCTION gen_salt(text, integer); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO dashboard_user;


--
-- Name: FUNCTION grant_pg_cron_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION extensions.grant_pg_cron_access() FROM supabase_admin;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO supabase_admin WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO dashboard_user;


--
-- Name: FUNCTION grant_pg_graphql_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.grant_pg_graphql_access() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION grant_pg_net_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION extensions.grant_pg_net_access() FROM supabase_admin;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO supabase_admin WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO dashboard_user;


--
-- Name: FUNCTION hmac(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION hmac(text, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT blk_read_time double precision, OUT blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT blk_read_time double precision, OUT blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT blk_read_time double precision, OUT blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements_reset(userid oid, dbid oid, queryid bigint); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint) TO dashboard_user;


--
-- Name: FUNCTION pgp_armor_headers(text, OUT key text, OUT value text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO dashboard_user;


--
-- Name: FUNCTION pgp_key_id(bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgrst_ddl_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_ddl_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgrst_drop_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_drop_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION set_graphql_placeholder(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.set_graphql_placeholder() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION sign(payload json, secret text, algorithm text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.sign(payload json, secret text, algorithm text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.sign(payload json, secret text, algorithm text) TO dashboard_user;


--
-- Name: FUNCTION try_cast_double(inp text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.try_cast_double(inp text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.try_cast_double(inp text) TO dashboard_user;


--
-- Name: FUNCTION url_decode(data text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.url_decode(data text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.url_decode(data text) TO dashboard_user;


--
-- Name: FUNCTION url_encode(data bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.url_encode(data bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.url_encode(data bytea) TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v1(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v1mc(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v3(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v4(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v5(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO dashboard_user;


--
-- Name: FUNCTION uuid_nil(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_nil() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_dns(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_oid(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_url(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_x500(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO dashboard_user;


--
-- Name: FUNCTION verify(token text, secret text, algorithm text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.verify(token text, secret text, algorithm text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.verify(token text, secret text, algorithm text) TO dashboard_user;


--
-- Name: FUNCTION graphql("operationName" text, query text, variables jsonb, extensions jsonb); Type: ACL; Schema: graphql_public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO postgres;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO anon;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO authenticated;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO service_role;


--
-- Name: FUNCTION get_auth(p_usename text); Type: ACL; Schema: pgbouncer; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION pgbouncer.get_auth(p_usename text) FROM PUBLIC;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO pgbouncer;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO postgres;


--
-- Name: FUNCTION handle_new_user(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.handle_new_user() TO anon;
GRANT ALL ON FUNCTION public.handle_new_user() TO authenticated;
GRANT ALL ON FUNCTION public.handle_new_user() TO service_role;


--
-- Name: FUNCTION apply_rls(wal jsonb, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO supabase_realtime_admin;


--
-- Name: FUNCTION broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO postgres;
GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO dashboard_user;


--
-- Name: FUNCTION build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO postgres;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO anon;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO service_role;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO supabase_realtime_admin;


--
-- Name: FUNCTION "cast"(val text, type_ regtype); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO postgres;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO dashboard_user;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO anon;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO authenticated;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO service_role;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO supabase_realtime_admin;


--
-- Name: FUNCTION check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO postgres;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO anon;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO authenticated;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO service_role;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO supabase_realtime_admin;


--
-- Name: FUNCTION is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO postgres;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO anon;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO service_role;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO supabase_realtime_admin;


--
-- Name: FUNCTION list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO supabase_realtime_admin;


--
-- Name: FUNCTION quote_wal2json(entity regclass); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO postgres;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO anon;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO authenticated;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO service_role;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO supabase_realtime_admin;


--
-- Name: FUNCTION send(payload jsonb, event text, topic text, private boolean); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO postgres;
GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO dashboard_user;


--
-- Name: FUNCTION subscription_check_filters(); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO postgres;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO dashboard_user;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO anon;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO authenticated;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO service_role;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO supabase_realtime_admin;


--
-- Name: FUNCTION to_regrole(role_name text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO postgres;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO anon;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO authenticated;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO service_role;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO supabase_realtime_admin;


--
-- Name: FUNCTION topic(); Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON FUNCTION realtime.topic() TO postgres;
GRANT ALL ON FUNCTION realtime.topic() TO dashboard_user;


--
-- Name: FUNCTION can_insert_object(bucketid text, name text, owner uuid, metadata jsonb); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) TO postgres;


--
-- Name: FUNCTION extension(name text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.extension(name text) TO postgres;


--
-- Name: FUNCTION filename(name text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.filename(name text) TO postgres;


--
-- Name: FUNCTION foldername(name text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.foldername(name text) TO postgres;


--
-- Name: FUNCTION list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text) TO postgres;


--
-- Name: FUNCTION list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text) TO postgres;


--
-- Name: FUNCTION operation(); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.operation() TO postgres;


--
-- Name: FUNCTION search(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) TO postgres;


--
-- Name: FUNCTION update_updated_at_column(); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.update_updated_at_column() TO postgres;


--
-- Name: FUNCTION _crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea) TO service_role;


--
-- Name: FUNCTION create_secret(new_secret text, new_name text, new_description text, new_key_id uuid); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault.create_secret(new_secret text, new_name text, new_description text, new_key_id uuid) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault.create_secret(new_secret text, new_name text, new_description text, new_key_id uuid) TO service_role;


--
-- Name: FUNCTION update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault.update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault.update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid) TO service_role;


--
-- Name: TABLE audit_log_entries; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.audit_log_entries TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.audit_log_entries TO postgres;
GRANT SELECT ON TABLE auth.audit_log_entries TO postgres WITH GRANT OPTION;


--
-- Name: TABLE flow_state; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.flow_state TO postgres;
GRANT SELECT ON TABLE auth.flow_state TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.flow_state TO dashboard_user;


--
-- Name: TABLE identities; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.identities TO postgres;
GRANT SELECT ON TABLE auth.identities TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.identities TO dashboard_user;


--
-- Name: TABLE instances; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.instances TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.instances TO postgres;
GRANT SELECT ON TABLE auth.instances TO postgres WITH GRANT OPTION;


--
-- Name: TABLE mfa_amr_claims; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.mfa_amr_claims TO postgres;
GRANT SELECT ON TABLE auth.mfa_amr_claims TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.mfa_amr_claims TO dashboard_user;


--
-- Name: TABLE mfa_challenges; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.mfa_challenges TO postgres;
GRANT SELECT ON TABLE auth.mfa_challenges TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.mfa_challenges TO dashboard_user;


--
-- Name: TABLE mfa_factors; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.mfa_factors TO postgres;
GRANT SELECT ON TABLE auth.mfa_factors TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.mfa_factors TO dashboard_user;


--
-- Name: TABLE oauth_clients; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.oauth_clients TO postgres;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.oauth_clients TO dashboard_user;


--
-- Name: TABLE one_time_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.one_time_tokens TO postgres;
GRANT SELECT ON TABLE auth.one_time_tokens TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.one_time_tokens TO dashboard_user;


--
-- Name: TABLE refresh_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.refresh_tokens TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.refresh_tokens TO postgres;
GRANT SELECT ON TABLE auth.refresh_tokens TO postgres WITH GRANT OPTION;


--
-- Name: SEQUENCE refresh_tokens_id_seq; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO dashboard_user;
GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO postgres;


--
-- Name: TABLE saml_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.saml_providers TO postgres;
GRANT SELECT ON TABLE auth.saml_providers TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.saml_providers TO dashboard_user;


--
-- Name: TABLE saml_relay_states; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.saml_relay_states TO postgres;
GRANT SELECT ON TABLE auth.saml_relay_states TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.saml_relay_states TO dashboard_user;


--
-- Name: TABLE sessions; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.sessions TO postgres;
GRANT SELECT ON TABLE auth.sessions TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.sessions TO dashboard_user;


--
-- Name: TABLE sso_domains; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.sso_domains TO postgres;
GRANT SELECT ON TABLE auth.sso_domains TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.sso_domains TO dashboard_user;


--
-- Name: TABLE sso_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.sso_providers TO postgres;
GRANT SELECT ON TABLE auth.sso_providers TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.sso_providers TO dashboard_user;


--
-- Name: TABLE users; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.users TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.users TO postgres;
GRANT SELECT ON TABLE auth.users TO postgres WITH GRANT OPTION;


--
-- Name: TABLE pg_stat_statements; Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE extensions.pg_stat_statements TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE extensions.pg_stat_statements TO dashboard_user;


--
-- Name: TABLE pg_stat_statements_info; Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE extensions.pg_stat_statements_info TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE extensions.pg_stat_statements_info TO dashboard_user;


--
-- Name: TABLE features; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.features TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.features TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.features TO service_role;


--
-- Name: TABLE listing_feedback_usage; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.listing_feedback_usage TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.listing_feedback_usage TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.listing_feedback_usage TO service_role;


--
-- Name: TABLE listings; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.listings TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.listings TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.listings TO service_role;


--
-- Name: TABLE llm_usage; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.llm_usage TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.llm_usage TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.llm_usage TO service_role;


--
-- Name: TABLE plans; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.plans TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.plans TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.plans TO service_role;


--
-- Name: TABLE plans_features_map; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.plans_features_map TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.plans_features_map TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.plans_features_map TO service_role;


--
-- Name: TABLE profiles; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.profiles TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.profiles TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.profiles TO service_role;


--
-- Name: TABLE properties; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.properties TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.properties TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.properties TO service_role;


--
-- Name: TABLE property_ratings; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.property_ratings TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.property_ratings TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.property_ratings TO service_role;


--
-- Name: TABLE scan_mismatches; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.scan_mismatches TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.scan_mismatches TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.scan_mismatches TO service_role;


--
-- Name: SEQUENCE scan_mismatches_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.scan_mismatches_id_seq TO anon;
GRANT ALL ON SEQUENCE public.scan_mismatches_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.scan_mismatches_id_seq TO service_role;


--
-- Name: TABLE scans; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.scans TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.scans TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.scans TO service_role;


--
-- Name: SEQUENCE scans_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.scans_id_seq TO anon;
GRANT ALL ON SEQUENCE public.scans_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.scans_id_seq TO service_role;


--
-- Name: TABLE str_properties; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.str_properties TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.str_properties TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.str_properties TO service_role;


--
-- Name: TABLE str_property_ratings; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.str_property_ratings TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.str_property_ratings TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.str_property_ratings TO service_role;


--
-- Name: TABLE messages; Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE realtime.messages TO postgres;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE realtime.messages TO dashboard_user;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO anon;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO authenticated;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO service_role;


--
-- Name: TABLE schema_migrations; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE realtime.schema_migrations TO postgres;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE realtime.schema_migrations TO dashboard_user;
GRANT SELECT ON TABLE realtime.schema_migrations TO anon;
GRANT SELECT ON TABLE realtime.schema_migrations TO authenticated;
GRANT SELECT ON TABLE realtime.schema_migrations TO service_role;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE realtime.schema_migrations TO supabase_realtime_admin;


--
-- Name: TABLE subscription; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE realtime.subscription TO postgres;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE realtime.subscription TO dashboard_user;
GRANT SELECT ON TABLE realtime.subscription TO anon;
GRANT SELECT ON TABLE realtime.subscription TO authenticated;
GRANT SELECT ON TABLE realtime.subscription TO service_role;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE realtime.subscription TO supabase_realtime_admin;


--
-- Name: SEQUENCE subscription_id_seq; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO postgres;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO dashboard_user;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO anon;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO service_role;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO supabase_realtime_admin;


--
-- Name: TABLE buckets; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.buckets TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.buckets TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.buckets TO service_role;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.buckets TO postgres WITH GRANT OPTION;


--
-- Name: TABLE buckets_analytics; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.buckets_analytics TO service_role;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.buckets_analytics TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.buckets_analytics TO anon;


--
-- Name: TABLE objects; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.objects TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.objects TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.objects TO service_role;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.objects TO postgres WITH GRANT OPTION;


--
-- Name: TABLE prefixes; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.prefixes TO service_role;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.prefixes TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.prefixes TO anon;


--
-- Name: TABLE s3_multipart_uploads; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.s3_multipart_uploads TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.s3_multipart_uploads TO postgres;


--
-- Name: TABLE s3_multipart_uploads_parts; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.s3_multipart_uploads_parts TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.s3_multipart_uploads_parts TO postgres;


--
-- Name: TABLE secrets; Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT SELECT,REFERENCES,DELETE,TRUNCATE ON TABLE vault.secrets TO postgres WITH GRANT OPTION;
GRANT SELECT,DELETE ON TABLE vault.secrets TO service_role;


--
-- Name: TABLE decrypted_secrets; Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT SELECT,REFERENCES,DELETE,TRUNCATE ON TABLE vault.decrypted_secrets TO postgres WITH GRANT OPTION;
GRANT SELECT,DELETE ON TABLE vault.decrypted_secrets TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON SEQUENCES TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON FUNCTIONS TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO service_role;


--
-- Name: issue_graphql_placeholder; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_graphql_placeholder ON sql_drop
         WHEN TAG IN ('DROP EXTENSION')
   EXECUTE FUNCTION extensions.set_graphql_placeholder();


ALTER EVENT TRIGGER issue_graphql_placeholder OWNER TO supabase_admin;

--
-- Name: issue_pg_cron_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_cron_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_cron_access();


ALTER EVENT TRIGGER issue_pg_cron_access OWNER TO supabase_admin;

--
-- Name: issue_pg_graphql_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_graphql_access ON ddl_command_end
         WHEN TAG IN ('CREATE FUNCTION')
   EXECUTE FUNCTION extensions.grant_pg_graphql_access();


ALTER EVENT TRIGGER issue_pg_graphql_access OWNER TO supabase_admin;

--
-- Name: issue_pg_net_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_net_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_net_access();


ALTER EVENT TRIGGER issue_pg_net_access OWNER TO supabase_admin;

--
-- Name: pgrst_ddl_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_ddl_watch ON ddl_command_end
   EXECUTE FUNCTION extensions.pgrst_ddl_watch();


ALTER EVENT TRIGGER pgrst_ddl_watch OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_drop_watch ON sql_drop
   EXECUTE FUNCTION extensions.pgrst_drop_watch();


ALTER EVENT TRIGGER pgrst_drop_watch OWNER TO supabase_admin;

--
-- PostgreSQL database dump complete
--

