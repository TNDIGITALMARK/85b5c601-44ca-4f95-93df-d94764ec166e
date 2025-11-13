const createSchemaSql = `
-- ============================================
-- TheraMORE Booking System - Database Schema
-- Purpose: Create tables for clients, services, and appointments
-- ============================================

-- ============================================
-- CLIENTS TABLE
-- ============================================
create table if not exists public.clients (
  id uuid primary key default uuid_generate_v4(),
  tenantid text not null,
  projectid uuid not null,
  
  -- Client information
  name text not null,
  email text,
  phone text,
  notes text,
  preferences text[],
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Add foreign key constraints
do $$ 
begin
  if not exists (select 1 from pg_constraint where conname = 'clients_fk_tenant') then
    alter table public.clients add constraint clients_fk_tenant
      foreign key (tenantid) references public.tenants(id) on delete cascade;
  end if;
  if not exists (select 1 from pg_constraint where conname = 'clients_fk_project') then
    alter table public.clients add constraint clients_fk_project
      foreign key (projectid) references public.projects(id) on delete cascade;
  end if;
end $$;

-- Enable RLS
alter table public.clients enable row level security;

-- Drop existing policies if they exist
drop policy if exists "anon_select_clients" on public.clients;
drop policy if exists "auth_select_clients" on public.clients;
drop policy if exists "auth_insert_clients" on public.clients;
drop policy if exists "auth_update_clients" on public.clients;
drop policy if exists "auth_delete_clients" on public.clients;

-- RLS Policies for clients
create policy "anon_select_clients"
  on public.clients for select to anon
  using (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

create policy "auth_select_clients"
  on public.clients for select to authenticated
  using (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

create policy "auth_insert_clients"
  on public.clients for insert to authenticated
  with check (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

create policy "auth_update_clients"
  on public.clients for update to authenticated
  using (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  )
  with check (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

create policy "auth_delete_clients"
  on public.clients for delete to authenticated
  using (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

-- Indexes
create index if not exists idx_clients_tenant_project on public.clients(tenantid, projectid);
create index if not exists idx_clients_name on public.clients(name);
create index if not exists idx_clients_email on public.clients(email);

-- ============================================
-- SERVICES TABLE
-- ============================================
create table if not exists public.services (
  id uuid primary key default uuid_generate_v4(),
  tenantid text not null,
  projectid uuid not null,
  
  -- Service information
  name text not null,
  description text,
  duration integer not null, -- duration in minutes
  price numeric(10,2),
  color text default 'teal' check (color in ('teal', 'green')),
  
  created_at timestamptz default now()
);

-- Add foreign key constraints
do $$ 
begin
  if not exists (select 1 from pg_constraint where conname = 'services_fk_tenant') then
    alter table public.services add constraint services_fk_tenant
      foreign key (tenantid) references public.tenants(id) on delete cascade;
  end if;
  if not exists (select 1 from pg_constraint where conname = 'services_fk_project') then
    alter table public.services add constraint services_fk_project
      foreign key (projectid) references public.projects(id) on delete cascade;
  end if;
end $$;

-- Enable RLS
alter table public.services enable row level security;

-- Drop existing policies if they exist
drop policy if exists "anon_select_services" on public.services;
drop policy if exists "auth_select_services" on public.services;
drop policy if exists "auth_insert_services" on public.services;
drop policy if exists "auth_update_services" on public.services;
drop policy if exists "auth_delete_services" on public.services;

-- RLS Policies for services
create policy "anon_select_services"
  on public.services for select to anon
  using (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

create policy "auth_select_services"
  on public.services for select to authenticated
  using (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

create policy "auth_insert_services"
  on public.services for insert to authenticated
  with check (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

create policy "auth_update_services"
  on public.services for update to authenticated
  using (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  )
  with check (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

create policy "auth_delete_services"
  on public.services for delete to authenticated
  using (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

-- Indexes
create index if not exists idx_services_tenant_project on public.services(tenantid, projectid);

-- ============================================
-- APPOINTMENTS TABLE
-- ============================================
create table if not exists public.appointments (
  id uuid primary key default uuid_generate_v4(),
  tenantid text not null,
  projectid uuid not null,
  
  -- Appointment information
  client_id uuid not null,
  service_id uuid not null,
  start_time timestamptz not null,
  end_time timestamptz not null,
  status text default 'confirmed' check (status in ('confirmed', 'pending', 'cancelled', 'completed')),
  notes text,
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Add foreign key constraints
do $$ 
begin
  if not exists (select 1 from pg_constraint where conname = 'appointments_fk_tenant') then
    alter table public.appointments add constraint appointments_fk_tenant
      foreign key (tenantid) references public.tenants(id) on delete cascade;
  end if;
  if not exists (select 1 from pg_constraint where conname = 'appointments_fk_project') then
    alter table public.appointments add constraint appointments_fk_project
      foreign key (projectid) references public.projects(id) on delete cascade;
  end if;
  if not exists (select 1 from pg_constraint where conname = 'appointments_fk_client') then
    alter table public.appointments add constraint appointments_fk_client
      foreign key (client_id) references public.clients(id) on delete cascade;
  end if;
  if not exists (select 1 from pg_constraint where conname = 'appointments_fk_service') then
    alter table public.appointments add constraint appointments_fk_service
      foreign key (service_id) references public.services(id) on delete cascade;
  end if;
end $$;

-- Enable RLS
alter table public.appointments enable row level security;

-- Drop existing policies if they exist
drop policy if exists "anon_select_appointments" on public.appointments;
drop policy if exists "auth_select_appointments" on public.appointments;
drop policy if exists "auth_insert_appointments" on public.appointments;
drop policy if exists "auth_update_appointments" on public.appointments;
drop policy if exists "auth_delete_appointments" on public.appointments;

-- RLS Policies for appointments
create policy "anon_select_appointments"
  on public.appointments for select to anon
  using (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

create policy "auth_select_appointments"
  on public.appointments for select to authenticated
  using (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

create policy "auth_insert_appointments"
  on public.appointments for insert to authenticated
  with check (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

create policy "auth_update_appointments"
  on public.appointments for update to authenticated
  using (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  )
  with check (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

create policy "auth_delete_appointments"
  on public.appointments for delete to authenticated
  using (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

-- Indexes
create index if not exists idx_appointments_tenant_project on public.appointments(tenantid, projectid);
create index if not exists idx_appointments_client on public.appointments(client_id);
create index if not exists idx_appointments_service on public.appointments(service_id);
create index if not exists idx_appointments_start_time on public.appointments(start_time);
create index if not exists idx_appointments_status on public.appointments(status);
`;

async function createMigration() {
  const response = await fetch('http://localhost:3006/api/supabase/migrations/execute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'create_theramore_schema',
      sql: createSchemaSql,
      autoApply: true,
      skipValidation: true  // Skip validation due to migration history issues
    })
  });

  const result = await response.json();

  if (result.success) {
    console.log('✅ Migration successful!');
    console.log('   File:', result.fileName);
    console.log('   Applied:', result.applied);
  } else {
    console.error('❌ Migration failed:', result.error);
    console.error('\nFailed steps:', result.steps);
  }
}

createMigration();
