-- ============================================
-- Migration: Set up TheraMORE Booking System Tables
-- Purpose: Create clients, services, and appointments tables
-- ============================================

-- Clients table
create table if not exists public.clients (
  id uuid primary key default uuid_generate_v4(),
  tenantid text not null,
  projectid uuid not null,
  name text not null,
  email text,
  phone text,
  notes text,
  service_preferences text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.clients drop constraint if exists fk_tenant;
alter table public.clients
  add constraint fk_tenant
    foreign key (tenantid)
    references public.tenants(id)
    on delete cascade;

alter table public.clients drop constraint if exists fk_project;
alter table public.clients
  add constraint fk_project
    foreign key (projectid)
    references public.projects(id)
    on delete cascade;

alter table public.clients enable row level security;

drop policy if exists "anon_select_clients" on public.clients;
create policy "anon_select_clients"
  on public.clients for select to anon
  using (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

drop policy if exists "auth_select_clients" on public.clients;
create policy "auth_select_clients"
  on public.clients for select to authenticated
  using (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

drop policy if exists "auth_insert_clients" on public.clients;
create policy "auth_insert_clients"
  on public.clients for insert to authenticated
  with check (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

drop policy if exists "auth_update_clients" on public.clients;
create policy "auth_update_clients"
  on public.clients for update to authenticated
  using (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

drop policy if exists "auth_delete_clients" on public.clients;
create policy "auth_delete_clients"
  on public.clients for delete to authenticated
  using (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

create index if not exists idx_clients_tenant_project
  on public.clients(tenantid, projectid);

comment on table public.clients is 'Client profiles for booking system';
comment on column public.clients.tenantid is 'FK to tenants.id';
comment on column public.clients.projectid is 'FK to projects.id';

-- Services table
create table if not exists public.services (
  id uuid primary key default uuid_generate_v4(),
  tenantid text not null,
  projectid uuid not null,
  name text not null,
  description text,
  duration_minutes integer not null,
  color text default 'teal',
  created_at timestamptz default now()
);

alter table public.services drop constraint if exists fk_tenant;
alter table public.services
  add constraint fk_tenant
    foreign key (tenantid)
    references public.tenants(id)
    on delete cascade;

alter table public.services drop constraint if exists fk_project;
alter table public.services
  add constraint fk_project
    foreign key (projectid)
    references public.projects(id)
    on delete cascade;

alter table public.services enable row level security;

drop policy if exists "anon_select_services" on public.services;
create policy "anon_select_services"
  on public.services for select to anon
  using (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

drop policy if exists "auth_select_services" on public.services;
create policy "auth_select_services"
  on public.services for select to authenticated
  using (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

drop policy if exists "auth_insert_services" on public.services;
create policy "auth_insert_services"
  on public.services for insert to authenticated
  with check (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

drop policy if exists "auth_update_services" on public.services;
create policy "auth_update_services"
  on public.services for update to authenticated
  using (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

drop policy if exists "auth_delete_services" on public.services;
create policy "auth_delete_services"
  on public.services for delete to authenticated
  using (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

create index if not exists idx_services_tenant_project
  on public.services(tenantid, projectid);

comment on table public.services is 'Service types offered';

-- Appointments table
create table if not exists public.appointments (
  id uuid primary key default uuid_generate_v4(),
  tenantid text not null,
  projectid uuid not null,
  client_id uuid not null,
  service_id uuid not null,
  start_time timestamptz not null,
  end_time timestamptz not null,
  status text default 'confirmed',
  notes text,
  reminder_sent boolean default false,
  confirmation_sent boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.appointments drop constraint if exists fk_client;
alter table public.appointments
  add constraint fk_client
    foreign key (client_id)
    references public.clients(id)
    on delete cascade;

alter table public.appointments drop constraint if exists fk_service;
alter table public.appointments
  add constraint fk_service
    foreign key (service_id)
    references public.services(id)
    on delete cascade;

alter table public.appointments drop constraint if exists fk_tenant;
alter table public.appointments
  add constraint fk_tenant
    foreign key (tenantid)
    references public.tenants(id)
    on delete cascade;

alter table public.appointments drop constraint if exists fk_project;
alter table public.appointments
  add constraint fk_project
    foreign key (projectid)
    references public.projects(id)
    on delete cascade;

alter table public.appointments enable row level security;

drop policy if exists "anon_select_appointments" on public.appointments;
create policy "anon_select_appointments"
  on public.appointments for select to anon
  using (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

drop policy if exists "auth_select_appointments" on public.appointments;
create policy "auth_select_appointments"
  on public.appointments for select to authenticated
  using (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

drop policy if exists "auth_insert_appointments" on public.appointments;
create policy "auth_insert_appointments"
  on public.appointments for insert to authenticated
  with check (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

drop policy if exists "auth_update_appointments" on public.appointments;
create policy "auth_update_appointments"
  on public.appointments for update to authenticated
  using (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

drop policy if exists "auth_delete_appointments" on public.appointments;
create policy "auth_delete_appointments"
  on public.appointments for delete to authenticated
  using (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

create index if not exists idx_appointments_tenant_project
  on public.appointments(tenantid, projectid);
create index if not exists idx_appointments_client
  on public.appointments(client_id);
create index if not exists idx_appointments_service
  on public.appointments(service_id);
create index if not exists idx_appointments_time
  on public.appointments(start_time, end_time);

comment on table public.appointments is 'Scheduled appointments';
