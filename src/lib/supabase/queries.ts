import { supabase, TENANT_ID, PROJECT_ID } from './client';
import { Client, Service, Appointment, AppointmentWithDetails } from '@/types/database';

// ============================================
// CLIENT QUERIES
// ============================================

export async function getClients(): Promise<Client[]> {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching clients:', error);
    return [];
  }

  return data || [];
}

export async function getClient(id: string): Promise<Client | null> {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching client:', error);
    return null;
  }

  return data;
}

export async function createClient(client: Omit<Client, 'id' | 'tenantid' | 'projectid' | 'created_at' | 'updated_at'>): Promise<Client | null> {
  const { data, error } = await supabase
    .from('clients')
    .insert({
      ...client,
      tenantid: TENANT_ID,
      projectid: PROJECT_ID
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating client:', error);
    return null;
  }

  return data;
}

export async function updateClient(id: string, updates: Partial<Client>): Promise<Client | null> {
  const { data, error } = await supabase
    .from('clients')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating client:', error);
    return null;
  }

  return data;
}

export async function deleteClient(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting client:', error);
    return false;
  }

  return true;
}

// ============================================
// SERVICE QUERIES
// ============================================

export async function getServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching services:', error);
    return [];
  }

  return data || [];
}

export async function getService(id: string): Promise<Service | null> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching service:', error);
    return null;
  }

  return data;
}

export async function createService(service: Omit<Service, 'id' | 'tenantid' | 'projectid' | 'created_at'>): Promise<Service | null> {
  const { data, error } = await supabase
    .from('services')
    .insert({
      ...service,
      tenantid: TENANT_ID,
      projectid: PROJECT_ID
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating service:', error);
    return null;
  }

  return data;
}

export async function updateService(id: string, updates: Partial<Service>): Promise<Service | null> {
  const { data, error } = await supabase
    .from('services')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating service:', error);
    return null;
  }

  return data;
}

export async function deleteService(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting service:', error);
    return false;
  }

  return true;
}

// ============================================
// APPOINTMENT QUERIES
// ============================================

export async function getAppointments(): Promise<Appointment[]> {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .order('start_time');

  if (error) {
    console.error('Error fetching appointments:', error);
    return [];
  }

  return data || [];
}

export async function getAppointmentsWithDetails(): Promise<AppointmentWithDetails[]> {
  const { data, error } = await supabase
    .from('appointments')
    .select(`
      *,
      client:clients(*),
      service:services(*)
    `)
    .order('start_time');

  if (error) {
    console.error('Error fetching appointments with details:', error);
    return [];
  }

  return data || [];
}

export async function getTodaysAppointments(): Promise<AppointmentWithDetails[]> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const { data, error } = await supabase
    .from('appointments')
    .select(`
      *,
      client:clients(*),
      service:services(*)
    `)
    .gte('start_time', today.toISOString())
    .lt('start_time', tomorrow.toISOString())
    .order('start_time');

  if (error) {
    console.error('Error fetching today\'s appointments:', error);
    return [];
  }

  return data || [];
}

export async function getThisWeeksAppointments(): Promise<AppointmentWithDetails[]> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);

  const { data, error } = await supabase
    .from('appointments')
    .select(`
      *,
      client:clients(*),
      service:services(*)
    `)
    .gte('start_time', today.toISOString())
    .lt('start_time', nextWeek.toISOString())
    .order('start_time');

  if (error) {
    console.error('Error fetching this week\'s appointments:', error);
    return [];
  }

  return data || [];
}

export async function getAppointmentsByDate(date: Date): Promise<AppointmentWithDetails[]> {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const { data, error } = await supabase
    .from('appointments')
    .select(`
      *,
      client:clients(*),
      service:services(*)
    `)
    .gte('start_time', startOfDay.toISOString())
    .lte('start_time', endOfDay.toISOString())
    .order('start_time');

  if (error) {
    console.error('Error fetching appointments by date:', error);
    return [];
  }

  return data || [];
}

export async function createAppointment(appointment: Omit<Appointment, 'id' | 'tenantid' | 'projectid' | 'created_at' | 'updated_at'>): Promise<Appointment | null> {
  const { data, error } = await supabase
    .from('appointments')
    .insert({
      ...appointment,
      tenantid: TENANT_ID,
      projectid: PROJECT_ID
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating appointment:', error);
    return null;
  }

  return data;
}

export async function updateAppointment(id: string, updates: Partial<Appointment>): Promise<Appointment | null> {
  const { data, error } = await supabase
    .from('appointments')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating appointment:', error);
    return null;
  }

  return data;
}

export async function deleteAppointment(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('appointments')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting appointment:', error);
    return false;
  }

  return true;
}
