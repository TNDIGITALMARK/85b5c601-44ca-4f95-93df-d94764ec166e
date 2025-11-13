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

async function exploreTables() {
  console.log('=== DATABASE EXPLORATION ===\n');

  const tablesToCheck = ['clients', 'services', 'appointments', 'users', 'bookings'];

  for (const tableName of tablesToCheck) {
    const { error, count } = await supabase
      .from(tableName)
      .select('*', { count: 'exact', head: true });

    if (!error) {
      console.log(`✅ ${tableName}: ${count} rows`);
    } else {
      console.log(`❌ ${tableName}: ${error.message}`);
    }
  }
}

exploreTables();
