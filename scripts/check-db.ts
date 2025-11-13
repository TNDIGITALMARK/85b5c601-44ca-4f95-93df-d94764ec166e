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

async function checkTables() {
  console.log('Checking database tables...\n');
  
  const tables = ['clients', 'services', 'appointments'];
  
  for (const table of tables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1);
      
      if (error) {
        console.log('Table', table, '- Error:', error.message);
      } else {
        console.log('Table', table, '- OK');
      }
    } catch (err: any) {
      console.log('Table', table, '- Exception:', err.message);
    }
  }
}

checkTables();
