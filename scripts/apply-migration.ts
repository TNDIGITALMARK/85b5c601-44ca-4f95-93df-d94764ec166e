import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

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

async function applyMigration() {
  console.log('Reading SQL migration file...');
  const sqlPath = path.join(process.cwd(), 'scripts', 'setup-schema.sql');
  const sql = fs.readFileSync(sqlPath, 'utf-8');

  console.log('Applying migration to database...');
  const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });

  if (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }

  console.log('✅ Migration applied successfully!');
  console.log('\nVerifying tables...');

  const tables = ['clients', 'services', 'appointments'];
  for (const table of tables) {
    const { error: checkError, count } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true });

    if (!checkError) {
      console.log(`✅ ${table} table ready (${count || 0} rows)`);
    } else {
      console.log(`❌ ${table} table check failed:`, checkError.message);
    }
  }
}

applyMigration();
