import { createClient } from '@supabase/supabase-js';

// Use service role key to bypass RLS for schema creation
const supabaseAdmin = createClient(
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

const tenantId = 'mB8D8eg3OfOqurDUgX0OAzhqzs92';
const projectId = '85b5c601-44ca-4f95-93df-d94764ec166e';

async function seedData() {
  console.log('🌱 Seeding database with sample data...\n');

  // Create services first
  console.log('Creating services...');
  const services = [
    {
      tenantid: tenantId,
      projectid: projectId,
      name: 'Swedish Massage',
      description: 'Relaxing full-body massage',
      duration: 60,
      price: 80.00,
      color: 'teal'
    },
    {
      tenantid: tenantId,
      projectid: projectId,
      name: 'Deep Tissue Massage',
      description: 'Therapeutic deep pressure massage',
      duration: 90,
      price: 110.00,
      color: 'teal'
    },
    {
      tenantid: tenantId,
      projectid: projectId,
      name: 'Personal Training Session',
      description: 'One-on-one fitness training',
      duration: 60,
      price: 75.00,
      color: 'green'
    },
    {
      tenantid: tenantId,
      projectid: projectId,
      name: 'Group Training Class',
      description: 'Small group fitness class',
      duration: 45,
      price: 30.00,
      color: 'green'
    }
  ];

  const { data: serviceData, error: serviceError } = await supabaseAdmin
    .from('services')
    .upsert(services, { onConflict: 'name,tenantid,projectid' })
    .select();

  if (serviceError) {
    console.error('❌ Error creating services:', serviceError.message);
    return;
  }
  console.log('✅ Created', serviceData?.length, 'services');

  // Create clients
  console.log('\nCreating clients...');
  const clients = [
    {
      tenantid: tenantId,
      projectid: projectId,
      name: 'Maria Rodriguez',
      email: 'maria.r@email.com',
      phone: '(555) 123-4567',
      notes: 'Prefers afternoon appointments',
      preferences: ['Massage', 'Swedish']
    },
    {
      tenantid: tenantId,
      projectid: projectId,
      name: 'Sarah Chen',
      email: 'sarah.chen@email.com',
      phone: '(555) 234-5678',
      notes: 'Regular weekly appointments',
      preferences: ['Training', 'Personal']
    },
    {
      tenantid: tenantId,
      projectid: projectId,
      name: 'David Lee',
      email: 'david.lee@email.com',
      phone: '(555) 345-6789',
      notes: 'Recovering from sports injury',
      preferences: ['Deep Tissue', 'Massage']
    },
    {
      tenantid: tenantId,
      projectid: projectId,
      name: 'Rachel Williams',
      email: 'rachel.w@email.com',
      phone: '(555) 456-7890',
      notes: 'Prefers morning sessions',
      preferences: ['Group Training']
    }
  ];

  const { data: clientData, error: clientError } = await supabaseAdmin
    .from('clients')
    .upsert(clients, { onConflict: 'email,tenantid,projectid' })
    .select();

  if (clientError) {
    console.error('❌ Error creating clients:', clientError.message);
    return;
  }
  console.log('✅ Created', clientData?.length, 'clients');

  // Create appointments
  console.log('\nCreating appointments...');
  if (serviceData && clientData && serviceData.length >= 4 && clientData.length >= 4) {
    const today = new Date();
    today.setHours(10, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 5);

    const appointments = [
      {
        tenantid: tenantId,
        projectid: projectId,
        client_id: clientData[0].id,
        service_id: serviceData[0].id, // Swedish Massage
        start_time: today.toISOString(),
        end_time: new Date(today.getTime() + 60 * 60 * 1000).toISOString(),
        status: 'confirmed'
      },
      {
        tenantid: tenantId,
        projectid: projectId,
        client_id: clientData[1].id,
        service_id: serviceData[2].id, // Personal Training
        start_time: new Date(today.getTime() + 2 * 60 * 60 * 1000).toISOString(),
        end_time: new Date(today.getTime() + 3 * 60 * 60 * 1000).toISOString(),
        status: 'confirmed'
      },
      {
        tenantid: tenantId,
        projectid: projectId,
        client_id: clientData[2].id,
        service_id: serviceData[1].id, // Deep Tissue
        start_time: tomorrow.toISOString(),
        end_time: new Date(tomorrow.getTime() + 90 * 60 * 1000).toISOString(),
        status: 'pending'
      },
      {
        tenantid: tenantId,
        projectid: projectId,
        client_id: clientData[3].id,
        service_id: serviceData[3].id, // Group Training
        start_time: nextWeek.toISOString(),
        end_time: new Date(nextWeek.getTime() + 45 * 60 * 1000).toISOString(),
        status: 'confirmed'
      }
    ];

    const { data: appointmentData, error: appointmentError } = await supabaseAdmin
      .from('appointments')
      .insert(appointments)
      .select();

    if (appointmentError) {
      console.error('❌ Error creating appointments:', appointmentError.message);
      return;
    }
    console.log('✅ Created', appointmentData?.length, 'appointments');
  }

  console.log('\n✅ Database seeding complete!');
}

seedData();
