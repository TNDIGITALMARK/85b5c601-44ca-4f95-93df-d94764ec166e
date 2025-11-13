const createSchemaSQL = `
-- ============================================
-- Migration: Create TheraMORE booking system schema
-- Purpose: Complete booking management for personal trainer and massage therapist
-- Tables: services, clients, appointments
-- ============================================

-- Create services table (massage and training services)
create table if not exists public.services (
  id uuid primary key default uuid_generate_v4(),
  tenantid text not null,
  projectid uuid not null,

  name text not null,
  description text,
  duration_minutes integer not null default 60,
  color text not null default 'teal', -- teal for massage, green for training

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Add foreign key constraints
alter table public.services
  add constraint fk_services_tenant
    foreign key (tenantid)
    references public.tenants(id)
    on delete cascade,
  add constraint fk_services_project
    foreign key (projectid)
    references public.projects(id)
    on delete cascade;

-- Enable RLS
alter table public.services enable row level security;

-- RLS Policies for services
create policy "anon_select_services"
  on public.services for select to anon
  using (tenantid = (auth.jwt() ->> 'tenant_id')::text
         and projectid = (auth.jwt() ->> 'project_id')::uuid);

create policy "auth_select_services"
  on public.services for select to authenticated
  using (tenantid = (auth.jwt() ->> 'tenant_id')::text
         and projectid = (auth.jwt() ->> 'project_id')::uuid);

create policy "auth_insert_services"
  on public.services for insert to authenticated
  with check (tenantid = (auth.jwt() ->> 'tenant_id')::text
              and projectid = (auth.jwt() ->> 'project_id')::uuid);

create policy "auth_update_services"
  on public.services for update to authenticated
  using (tenantid = (auth.jwt() ->> 'tenant_id')::text
         and projectid = (auth.jwt() ->> 'project_id')::uuid)
  with check (tenantid = (auth.jwt() ->> 'tenant_id')::text
              and projectid = (auth.jwt() ->> 'project_id')::uuid);

create policy "auth_delete_services"
  on public.services for delete to authenticated
  using (tenantid = (auth.jwt() ->> 'tenant_id')::text
         and projectid = (auth.jwt() ->> 'project_id')::uuid);

-- Create clients table
create table if not exists public.clients (
  id uuid primary key default uuid_generate_v4(),
  tenantid text not null,
  projectid uuid not null,

  name text not null,
  email text,
  phone text,
  avatar_url text,
  notes text,
  service_preferences text[] default '{}',

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Add foreign key constraints
alter table public.clients
  add constraint fk_clients_tenant
    foreign key (tenantid)
    references public.tenants(id)
    on delete cascade,
  add constraint fk_clients_project
    foreign key (projectid)
    references public.projects(id)
    on delete cascade;

-- Enable RLS
alter table public.clients enable row level security;

-- RLS Policies for clients
create policy "anon_select_clients"
  on public.clients for select to anon
  using (tenantid = (auth.jwt() ->> 'tenant_id')::text
         and projectid = (auth.jwt() ->> 'project_id')::uuid);

create policy "auth_select_clients"
  on public.clients for select to authenticated
  using (tenantid = (auth.jwt() ->> 'tenant_id')::text
         and projectid = (auth.jwt() ->> 'project_id')::uuid);

create policy "auth_insert_clients"
  on public.clients for insert to authenticated
  with check (tenantid = (auth.jwt() ->> 'tenant_id')::text
              and projectid = (auth.jwt() ->> 'project_id')::uuid);

create policy "auth_update_clients"
  on public.clients for update to authenticated
  using (tenantid = (auth.jwt() ->> 'tenant_id')::text
         and projectid = (auth.jwt() ->> 'project_id')::uuid)
  with check (tenantid = (auth.jwt() ->> 'tenant_id')::text
              and projectid = (auth.jwt() ->> 'project_id')::uuid);

create policy "auth_delete_clients"
  on public.clients for delete to authenticated
  using (tenantid = (auth.jwt() ->> 'tenant_id')::text
         and projectid = (auth.jwt() ->> 'project_id')::uuid);

-- Create appointments table
create table if not exists public.appointments (
  id uuid primary key default uuid_generate_v4(),
  tenantid text not null,
  projectid uuid not null,

  client_id uuid not null,
  service_id uuid not null,
  start_time timestamptz not null,
  end_time timestamptz not null,
  status text not null default 'confirmed' check (status in ('confirmed', 'pending', 'cancelled')),
  notes text,
  reminder_sent boolean default false,
  confirmation_sent boolean default false,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Add foreign key constraints
alter table public.appointments
  add constraint fk_appointments_tenant
    foreign key (tenantid)
    references public.tenants(id)
    on delete cascade,
  add constraint fk_appointments_project
    foreign key (projectid)
    references public.projects(id)
    on delete cascade,
  add constraint fk_appointments_client
    foreign key (client_id)
    references public.clients(id)
    on delete cascade,
  add constraint fk_appointments_service
    foreign key (service_id)
    references public.services(id)
    on delete cascade;

-- Enable RLS
alter table public.appointments enable row level security;

-- RLS Policies for appointments
create policy "anon_select_appointments"
  on public.appointments for select to anon
  using (tenantid = (auth.jwt() ->> 'tenant_id')::text
         and projectid = (auth.jwt() ->> 'project_id')::uuid);

create policy "auth_select_appointments"
  on public.appointments for select to authenticated
  using (tenantid = (auth.jwt() ->> 'tenant_id')::text
         and projectid = (auth.jwt() ->> 'project_id')::uuid);

create policy "auth_insert_appointments"
  on public.appointments for insert to authenticated
  with check (tenantid = (auth.jwt() ->> 'tenant_id')::text
              and projectid = (auth.jwt() ->> 'project_id')::uuid);

create policy "auth_update_appointments"
  on public.appointments for update to authenticated
  using (tenantid = (auth.jwt() ->> 'tenant_id')::text
         and projectid = (auth.jwt() ->> 'project_id')::uuid)
  with check (tenantid = (auth.jwt() ->> 'tenant_id')::text
              and projectid = (auth.jwt() ->> 'project_id')::uuid);

create policy "auth_delete_appointments"
  on public.appointments for delete to authenticated
  using (tenantid = (auth.jwt() ->> 'tenant_id')::text
         and projectid = (auth.jwt() ->> 'project_id')::uuid);

-- Create indexes for performance
create index if not exists idx_services_tenant_project on public.services(tenantid, projectid);
create index if not exists idx_clients_tenant_project on public.clients(tenantid, projectid);
create index if not exists idx_clients_email on public.clients(email);
create index if not exists idx_appointments_tenant_project on public.appointments(tenantid, projectid);
create index if not exists idx_appointments_client on public.appointments(client_id);
create index if not exists idx_appointments_service on public.appointments(service_id);
create index if not exists idx_appointments_start_time on public.appointments(start_time);
create index if not exists idx_appointments_status on public.appointments(status);

-- Add comments
comment on table public.services is 'Services offered (massage and training sessions)';
comment on table public.clients is 'Client profiles with contact info and preferences';
comment on table public.appointments is 'Scheduled appointments with status and reminders';
`;

async function createSchema() {
  console.log('📡 Creating database schema via migration API...\n');

  try {
    const response = await fetch('http://localhost:3006/api/supabase/migrations/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'create_theramore_schema',
        sql: createSchemaSQL,
        autoApply: true
      })
    });

    const result = await response.json();

    if (result.success) {
      console.log('✅ Migration successful!');
      console.log('   File:', result.fileName);
      console.log('   Validation:', result.validation.passed ? '✅ Passed' : '❌ Failed');
      console.log('   Applied:', result.applied ? '✅ Yes' : '❌ No');

      if (result.validation.warnings && result.validation.warnings.length > 0) {
        console.log('\n⚠️  Warnings:');
        result.validation.warnings.forEach((w: string) => console.log('   -', w));
      }
    } else {
      console.error('❌ Migration failed:', result.error);
      if (result.validation && !result.validation.passed) {
        console.error('\nValidation errors:');
        result.validation.errors.forEach((e: string) => console.error('  -', e));
      }
    }
  } catch (error) {
    console.error('❌ Error calling migration API:', error);
  }
}

createSchema();
