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

async function checkSchema() {
  console.log('=== CHECKING TABLE STRUCTURES ===\n');

  // Check clients table
  console.log('--- CLIENTS TABLE ---');
  const { data: clientSample } = await supabase
    .from('clients')
    .select('*')
    .limit(1);
  if (clientSample && clientSample.length > 0) {
    console.log('Columns:', Object.keys(clientSample[0]));
  } else {
    console.log('No data - checking if we can insert');
  }

  // Check appointments table
  console.log('\n--- APPOINTMENTS TABLE ---');
  const { data: appointmentSample } = await supabase
    .from('appointments')
    .select('*')
    .limit(1);
  if (appointmentSample && appointmentSample.length > 0) {
    console.log('Columns:', Object.keys(appointmentSample[0]));
  } else {
    console.log('No data found');
  }

  // Check services table
  console.log('\n--- SERVICES TABLE ---');
  const { data: serviceSample } = await supabase
    .from('services')
    .select('*')
    .limit(1);
  if (serviceSample && serviceSample.length > 0) {
    console.log('Columns:', Object.keys(serviceSample[0]));
  } else {
    console.log('No data found');
  }
}

checkSchema();
