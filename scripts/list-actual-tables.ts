import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://hfndfmtxhqvubnfiwzlz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmbmRmbXR4aHF2dWJuZml3emx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2Mjk4MDgsImV4cCI6MjA3NjIwNTgwOH0.n0NK_Ov03-UbDQYr5mio3ggYa5XTN-XI1kB6X81N4nA',
  {
    global: {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJyb2xlIjoiYW5vbiIsInRlbmFudF9pZCI6Im1COEQ4ZWczT2ZPcXVyRFVnWDBPQXpocXpzOTIiLCJwcm9qZWN0X2lkIjoiODViNWM2MDEtNDRjYS00Zjk1LTkzZGYtZDk0NzY0ZWMxNjZlIiwianRpIjoiOGUzYThlODQtMGYwMi00YzEwLThlZTQtMzM2N2JkNTkxNjE3IiwiaWF0IjoxNzYzMDUxMzY4LCJleHAiOjE3NjMwNTQwNjh9.MWuug61q0mCSOR0WOmlZWJSEtGrzCk63N60sxvYiYBM`
      }
    }
  }
);

async function listTables() {
  console.log('=== LISTING ALL TABLES IN PUBLIC SCHEMA ===\n');

  // Try to query  information_schema directly via RPC or try listing known tables
  const knownTables = [
    'tenants', 'projects', 'users', 'clients', 'appointments', 'services',
    'bookings', 'sessions', 'articles', 'posts', 'comments', 'products'
  ];

  console.log('Checking known table names:\n');

  for (const tableName of knownTables) {
    const { data, error, count } = await supabase
      .from(tableName)
      .select('*', { count: 'exact', head: true });

    if (!error) {
      console.log(`✅ ${tableName} (${count || 0} rows)`);
    }
  }
}

listTables();
