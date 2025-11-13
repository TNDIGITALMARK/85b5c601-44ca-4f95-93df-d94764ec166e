export interface Client {
  id: string;
  tenantid: string;
  projectid: string;
  name: string;
  email: string;
  phone: string;
  avatar_url?: string;
  notes?: string;
  service_preferences?: string[];
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  tenantid: string;
  projectid: string;
  name: string;
  description?: string;
  duration_minutes: number;
  color: string; // teal, green, etc.
  created_at: string;
}

export interface Appointment {
  id: string;
  tenantid: string;
  projectid: string;
  client_id: string;
  service_id: string;
  start_time: string;
  end_time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  notes?: string;
  reminder_sent: boolean;
  confirmation_sent: boolean;
  created_at: string;
  updated_at: string;
}

export interface AppointmentWithDetails extends Appointment {
  client: Client;
  service: Service;
}
