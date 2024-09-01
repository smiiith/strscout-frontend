// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
// import "https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts"

// console.log("Hello from Functions!")

// Deno.serve(async (req) => {
//   const { name } = await req.json()
//   const data = {
//     message: `Hello ${name}!`,
//   }

//   return new Response(
//     JSON.stringify(data),
//     { headers: { "Content-Type": "application/json" } },
//   )
// })

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/scan-cron' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
select
cron.schedule(
  'invoke-function-every-minute',
  '* * * * *', --every minute
    $$
    select
      net.http_post(
    url:='https://ynxbtvsbjzkcnkilnuts.supabase.co/functions/v1/some-function',
    headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlueGJ0dnNianprY25raWxudXRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEzMTU1OTgsImV4cCI6MjAzNjg5MTU5OH0.um5dqnzyJzgrk3oVH7SyacMKaK-YoLNjod4D9A5gkYY"}':: jsonb,
    body:=concat('{"time": "', now(), '"}'):: jsonb
  ) as request_id;
$$
  );


select
cron.schedule(
  'invoke-function-every-half-minute',
  '30 seconds',
  $$
    select
      net.http_post(
    url:='https://ynxbtvsbjzkcnkilnuts.supabase.co/functions/v1/function-name',
    headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlueGJ0dnNianprY25raWxudXRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEzMTU1OTgsImV4cCI6MjAzNjg5MTU5OH0.um5dqnzyJzgrk3oVH7SyacMKaK-YoLNjod4D9A5gkYY"}':: jsonb,
    body:=concat('{"time": "', now(), '"}'):: jsonb
  ) as request_id;
$$
  );



select * from cron.job;


select
  *
  from cron.job_run_details
order by start_time desc
limit 10;

select cron.unschedule('scan-property');



select
cron.schedule(
  'scan-property',
  '*/5 * * * *',
  $$
      select
        net.http_post(
    url:='https://syncnanny-backend.onrender.com/api/scan',
    headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlueGJ0dnNianprY25raWxudXRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEzMTU1OTgsImV4cCI6MjAzNjg5MTU5OH0.um5dqnzyJzgrk3oVH7SyacMKaK-YoLNjod4D9A5gkYY"}':: jsonb,
    body:=concat('{"propertyId": "2dcf7eac-6035-4231-b496-c4d7744e818e", "time": "', now(), '"}'):: jsonb
  ) as request_id; $$
    );