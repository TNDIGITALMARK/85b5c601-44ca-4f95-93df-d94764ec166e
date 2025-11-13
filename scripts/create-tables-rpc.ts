import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://hfndfmtxhqvubnfiwzlz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmbmRmbXR4aHF2dWJuZml3emx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2Mjk4MDgsImV4cCI6MjA3NjIwNTgwOH0.n0NK_Ov03-UbDQYr5mio3ggYa5XTN-XI1kB6X81N4nA',
  {
    global: {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJyb2xlIjoiYW5vbiIsInRlbmFudF9pZCI6Im1COEQ4ZWczT2ZPcXVyRFVnWDBPQXpocXpzOTIiLCJwcm9qZWN0X2lkIjoiODViNWM2MDEtNDRjYS00Zjk1LTkzZGYtZDk0NzY0ZWMxNjZlIiwianRpIjoiMTdkNTFkMmUtODhhNy00YzkwLWJlNjQtMTM4N2I3NGFmMzUyIiwiaWF0IjoxNzYzMDU2NjM1LCJleHAiOjE3NjMwNTkzMzV9.ZGzAH9thnaftX8akFXOm2ds3CMnmCa33JOG8KxiC--A'
      }
    }
  }
);

async function createTables() {
  console.log('🔧 Creating tables directly via Supabase REST API...\n');
  
  // Use the REST API to execute raw SQL
  const response = await fetch(
    'https://hfndfmtxhqvubnfiwzlz.supabase.co/rest/v1/rpc/exec_sql',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmbmRmbXR4aHF2dWJuZml3emx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2Mjk4MDgsImV4cCI6MjA3NjIwNTgwOH0.n0NK_Ov03-UbDQYr5mio3ggYa5XTN-XI1kB6X81N4nA',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJyb2xlIjoiYW5vbiIsInRlbmFudF9pZCI6Im1COEQ4ZWczT2ZPcXVyRFVnWDBPQXpocXpzOTIiLCJwcm9qZWN0X2lkIjoiODViNWM2MDEtNDRjYS00Zjk1LTkzZGYtZDk0NzY0ZWMxNjZlIiwianRpIjoiMTdkNTFkMmUtODhhNy00YzkwLWJlNjQtMTM4N2I3NGFmMzUyIiwiaWF0IjoxNzYzMDU2NjM1LCJleHAiOjE3NjMwNTkzMzV9.ZGzAH9thnaftX8akFXOm2ds3CMnmCa33JOG8KxiC--A'
      },
      body: JSON.stringify({
        query: `
          CREATE TABLE IF NOT EXISTS public.clients (
            id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
            tenantid text NOT NULL,
            projectid uuid NOT NULL,
            name text NOT NULL,
            email text,
            phone text,
            notes text,
            preferences text[],
            created_at timestamptz DEFAULT now(),
            updated_at timestamptz DEFAULT now()
          );
        `
      })
    }
  );

  const result = await response.json();
  console.log('Result:', result);
}

createTables();
