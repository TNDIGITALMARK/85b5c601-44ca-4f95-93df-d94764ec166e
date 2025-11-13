import { Client, Service, Appointment, AppointmentWithDetails } from '@/types/database';

const TENANT_ID = 'mB8D8eg3OfOqurDUgX0OAzhqzs92';
const PROJECT_ID = '85b5c601-44ca-4f95-93df-d94764ec166e';

// Mock Services
export const mockServices: Service[] = [
  {
    id: 'service-1',
    tenantid: TENANT_ID,
    projectid: PROJECT_ID,
    name: 'Deep Tissue Massage',
    description: 'Therapeutic massage for muscle relief',
    duration_minutes: 60,
    color: 'teal',
    created_at: new Date().toISOString()
  },
  {
    id: 'service-2',
    tenantid: TENANT_ID,
    projectid: PROJECT_ID,
    name: 'Sports Massage',
    description: 'Massage focused on athletic recovery',
    duration_minutes: 90,
    color: 'teal',
    created_at: new Date().toISOString()
  },
  {
    id: 'service-3',
    tenantid: TENANT_ID,
    projectid: PROJECT_ID,
    name: 'Personal Training',
    description: 'One-on-one fitness coaching',
    duration_minutes: 60,
    color: 'green',
    created_at: new Date().toISOString()
  },
  {
    id: 'service-4',
    tenantid: TENANT_ID,
    projectid: PROJECT_ID,
    name: 'Strength Training',
    description: 'Focus on building muscle and strength',
    duration_minutes: 60,
    color: 'green',
    created_at: new Date().toISOString()
  }
];

// Mock Clients
export const mockClients: Client[] = [
  {
    id: 'client-1',
    tenantid: TENANT_ID,
    projectid: PROJECT_ID,
    name: 'Maria Rodriguez',
    email: 'maria.r@email.com',
    phone: '555-0123',
    notes: 'Prefers morning appointments',
    service_preferences: ['Deep Tissue Massage'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'client-2',
    tenantid: TENANT_ID,
    projectid: PROJECT_ID,
    name: 'Sarah Chen',
    email: 'sarah.c@email.com',
    phone: '555-0156',
    notes: 'Recovering from shoulder injury - avoid overhead movements',
    service_preferences: ['Sports Massage', 'Personal Training'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'client-3',
    tenantid: TENANT_ID,
    projectid: PROJECT_ID,
    name: 'David Lee',
    email: 'david.l@email.com',
    phone: '555-0189',
    notes: 'Training for marathon',
    service_preferences: ['Personal Training', 'Sports Massage'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'client-4',
    tenantid: TENANT_ID,
    projectid: PROJECT_ID,
    name: 'Rachel Williams',
    email: 'rachel.w@email.com',
    phone: '555-0167',
    notes: 'Lower back issues - prefers gentle stretching',
    service_preferences: ['Deep Tissue Massage'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Helper to get dates
const getToday = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

// Mock Appointments
export const mockAppointments: Appointment[] = [
  {
    id: 'apt-1',
    tenantid: TENANT_ID,
    projectid: PROJECT_ID,
    client_id: 'client-1',
    service_id: 'service-1',
    start_time: new Date(getToday().getTime() + 9 * 60 * 60 * 1000).toISOString(),
    end_time: new Date(getToday().getTime() + 10 * 60 * 60 * 1000).toISOString(),
    status: 'confirmed',
    notes: '',
    reminder_sent: true,
    confirmation_sent: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'apt-2',
    tenantid: TENANT_ID,
    projectid: PROJECT_ID,
    client_id: 'client-2',
    service_id: 'service-3',
    start_time: new Date(getToday().getTime() + 14 * 60 * 60 * 1000).toISOString(),
    end_time: new Date(getToday().getTime() + 15 * 60 * 60 * 1000).toISOString(),
    status: 'confirmed',
    notes: '',
    reminder_sent: true,
    confirmation_sent: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'apt-3',
    tenantid: TENANT_ID,
    projectid: PROJECT_ID,
    client_id: 'client-3',
    service_id: 'service-2',
    start_time: new Date(getToday().getTime() + 24 * 60 * 60 * 1000 + 10 * 60 * 60 * 1000).toISOString(),
    end_time: new Date(getToday().getTime() + 24 * 60 * 60 * 1000 + 11.5 * 60 * 60 * 1000).toISOString(),
    status: 'confirmed',
    notes: '',
    reminder_sent: false,
    confirmation_sent: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'apt-4',
    tenantid: TENANT_ID,
    projectid: PROJECT_ID,
    client_id: 'client-4',
    service_id: 'service-1',
    start_time: new Date(getToday().getTime() + 48 * 60 * 60 * 1000 + 11 * 60 * 60 * 1000).toISOString(),
    end_time: new Date(getToday().getTime() + 48 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000).toISOString(),
    status: 'confirmed',
    notes: '',
    reminder_sent: false,
    confirmation_sent: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Get appointments with client and service details
export function getAppointmentsWithDetails(): AppointmentWithDetails[] {
  return mockAppointments.map(apt => {
    const client = mockClients.find(c => c.id === apt.client_id)!;
    const service = mockServices.find(s => s.id === apt.service_id)!;

    return {
      ...apt,
      client,
      service
    };
  });
}

// Get today's appointments
export function getTodaysAppointments(): AppointmentWithDetails[] {
  const today = getToday();
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

  return getAppointmentsWithDetails().filter(apt => {
    const aptDate = new Date(apt.start_time);
    return aptDate >= today && aptDate < tomorrow;
  });
}

// Get this week's appointments
export function getThisWeeksAppointments(): AppointmentWithDetails[] {
  const today = getToday();
  const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

  return getAppointmentsWithDetails().filter(apt => {
    const aptDate = new Date(apt.start_time);
    return aptDate >= today && aptDate < weekFromNow;
  });
}
