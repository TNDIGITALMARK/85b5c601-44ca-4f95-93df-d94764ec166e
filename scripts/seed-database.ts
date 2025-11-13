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

const TENANT_ID = 'mB8D8eg3OfOqurDUgX0OAzhqzs92';
const PROJECT_ID = '85b5c601-44ca-4f95-93df-d94764ec166e';

async function seedDatabase() {
  console.log('🌱 Seeding database with mock data...\n');

  // 1. Seed Services
  console.log('Creating services...');
  const { data: services, error: servicesError } = await supabase
    .from('services')
    .insert([
      {
        tenantid: TENANT_ID,
        projectid: PROJECT_ID,
        name: 'Deep Tissue Massage',
        description: 'Therapeutic massage for muscle relief',
        duration_minutes: 60,
        color: 'teal'
      },
      {
        tenantid: TENANT_ID,
        projectid: PROJECT_ID,
        name: 'Sports Massage',
        description: 'Massage focused on athletic recovery',
        duration_minutes: 90,
        color: 'teal'
      },
      {
        tenantid: TENANT_ID,
        projectid: PROJECT_ID,
        name: 'Personal Training',
        description: 'One-on-one fitness coaching',
        duration_minutes: 60,
        color: 'green'
      },
      {
        tenantid: TENANT_ID,
        projectid: PROJECT_ID,
        name: 'Strength Training',
        description: 'Focus on building muscle and strength',
        duration_minutes: 60,
        color: 'green'
      }
    ])
    .select();

  if (servicesError) {
    console.error('Error creating services:', servicesError);
    return;
  }
  console.log(`✅ Created ${services?.length} services\n`);

  // 2. Seed Clients
  console.log('Creating clients...');
  const { data: clients, error: clientsError } = await supabase
    .from('clients')
    .insert([
      {
        tenantid: TENANT_ID,
        projectid: PROJECT_ID,
        name: 'Maria Rodriguez',
        email: 'maria.r@email.com',
        phone: '555-0123',
        notes: 'Prefers morning appointments',
        service_preferences: ['Deep Tissue Massage']
      },
      {
        tenantid: TENANT_ID,
        projectid: PROJECT_ID,
        name: 'Sarah Chen',
        email: 'sarah.c@email.com',
        phone: '555-0156',
        notes: 'Recovering from shoulder injury - avoid overhead movements',
        service_preferences: ['Sports Massage', 'Personal Training']
      },
      {
        tenantid: TENANT_ID,
        projectid: PROJECT_ID,
        name: 'David Lee',
        email: 'david.l@email.com',
        phone: '555-0189',
        notes: 'Training for marathon',
        service_preferences: ['Personal Training', 'Sports Massage']
      },
      {
        tenantid: TENANT_ID,
        projectid: PROJECT_ID,
        name: 'Rachel Williams',
        email: 'rachel.w@email.com',
        phone: '555-0167',
        notes: 'Lower back issues - prefers gentle stretching',
        service_preferences: ['Deep Tissue Massage']
      }
    ])
    .select();

  if (clientsError) {
    console.error('Error creating clients:', clientsError);
    return;
  }
  console.log(`✅ Created ${clients?.length} clients\n`);

  // 3. Seed Appointments
  console.log('Creating appointments...');

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const appointments = [];

  // Today's appointments
  appointments.push({
    tenantid: TENANT_ID,
    projectid: PROJECT_ID,
    client_id: clients![0].id,
    service_id: services![0].id, // Deep Tissue Massage
    start_time: new Date(today.getTime() + 9 * 60 * 60 * 1000).toISOString(), // 9 AM today
    end_time: new Date(today.getTime() + 10 * 60 * 60 * 1000).toISOString(),
    status: 'confirmed' as const,
    reminder_sent: true,
    confirmation_sent: true
  });

  appointments.push({
    tenantid: TENANT_ID,
    projectid: PROJECT_ID,
    client_id: clients![1].id,
    service_id: services![2].id, // Personal Training
    start_time: new Date(today.getTime() + 14 * 60 * 60 * 1000).toISOString(), // 2 PM today
    end_time: new Date(today.getTime() + 15 * 60 * 60 * 1000).toISOString(),
    status: 'confirmed' as const,
    reminder_sent: true,
    confirmation_sent: true
  });

  // Tomorrow's appointments
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

  appointments.push({
    tenantid: TENANT_ID,
    projectid: PROJECT_ID,
    client_id: clients![2].id,
    service_id: services![1].id, // Sports Massage
    start_time: new Date(tomorrow.getTime() + 10 * 60 * 60 * 1000).toISOString(), // 10 AM tomorrow
    end_time: new Date(tomorrow.getTime() + 11.5 * 60 * 60 * 1000).toISOString(),
    status: 'confirmed' as const,
    reminder_sent: false,
    confirmation_sent: true
  });

  // This week
  const dayAfterTomorrow = new Date(today.getTime() + 48 * 60 * 60 * 1000);

  appointments.push({
    tenantid: TENANT_ID,
    projectid: PROJECT_ID,
    client_id: clients![3].id,
    service_id: services![0].id, // Deep Tissue Massage
    start_time: new Date(dayAfterTomorrow.getTime() + 11 * 60 * 60 * 1000).toISOString(), // 11 AM
    end_time: new Date(dayAfterTomorrow.getTime() + 12 * 60 * 60 * 1000).toISOString(),
    status: 'confirmed' as const,
    reminder_sent: false,
    confirmation_sent: true
  });

  const { data: createdAppointments, error: appointmentsError } = await supabase
    .from('appointments')
    .insert(appointments)
    .select();

  if (appointmentsError) {
    console.error('Error creating appointments:', appointmentsError);
    return;
  }
  console.log(`✅ Created ${createdAppointments?.length} appointments\n`);

  console.log('✨ Database seeded successfully!');
}

seedDatabase();
