'use client';

import { useState, useEffect } from 'react';
import { getClients, getAppointmentsWithDetails } from '@/lib/supabase/queries';
import { Client, AppointmentWithDetails } from '@/types/database';
import { Calendar, Users, Bell, Settings, Search, Plus, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [clients, setClients] = useState<Client[]>([]);
  const [appointments, setAppointments] = useState<AppointmentWithDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [clientList, appointmentList] = await Promise.all([
        getClients(),
        getAppointmentsWithDetails()
      ]);
      setClients(clientList);
      setAppointments(appointmentList);
      setLoading(false);
    }
    fetchData();
  }, []);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phone?.includes(searchQuery)
  );

  // Get appointments for a specific client
  const getClientAppointments = (clientId: string) => {
    return appointments.filter(apt => apt.client_id === clientId);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-60 bg-[hsl(var(--sidebar-background))] text-[hsl(var(--sidebar-foreground))] flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[hsl(var(--teal-accent))] flex items-center justify-center text-white font-bold">
              TM
            </div>
            <span className="text-lg font-semibold">TheraMORE</span>
          </div>
        </div>

        <nav className="flex-1 px-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[hsl(var(--sidebar-accent))] transition-colors mb-1"
          >
            <Calendar className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </Link>

          <Link
            href="/calendar"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[hsl(var(--sidebar-accent))] transition-colors mb-1"
          >
            <Calendar className="w-5 h-5" />
            <span className="font-medium">Calendar</span>
          </Link>

          <Link
            href="/clients"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-foreground))] mb-1"
          >
            <Users className="w-5 h-5" />
            <span className="font-medium">Clients</span>
          </Link>

          <Link
            href="/notifications"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[hsl(var(--sidebar-accent))] transition-colors mb-1"
          >
            <Bell className="w-5 h-5" />
            <span className="font-medium">Notifications</span>
          </Link>

          <Link
            href="/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[hsl(var(--sidebar-accent))] transition-colors mb-1"
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-[hsl(var(--sidebar-border))]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-sm font-semibold text-gray-700">AD</span>
            </div>
            <div>
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-[hsl(var(--sidebar-foreground))]/70">Logged in</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-[hsl(var(--border))] px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Clients</h1>
              <p className="text-sm text-muted-foreground">Manage your client profiles and history</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Client
              </button>
            </div>
          </div>
        </header>

        {/* Clients Content */}
        <div className="p-8">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-muted-foreground">Loading...</div>
            </div>
          ) : clients.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No clients yet</h3>
              <p className="text-muted-foreground mb-6">Get started by adding your first client</p>
              <button className="px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2 mx-auto">
                <Plus className="w-4 h-4" />
                Add Your First Client
              </button>
            </div>
          ) : (
            <>
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search clients by name, email, or phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-[hsl(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Client Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClients.map(client => {
              const clientAppointments = getClientAppointments(client.id);
              const upcomingAppointments = clientAppointments.filter(
                apt => new Date(apt.start_time) > new Date()
              );
              const pastAppointments = clientAppointments.filter(
                apt => new Date(apt.start_time) <= new Date()
              );

              return (
                <div
                  key={client.id}
                  className="bg-white rounded-xl border border-[hsl(var(--border))] p-6 shadow-card hover:shadow-card-hover transition-shadow"
                >
                  {/* Client Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-semibold text-gray-700">
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-1">{client.name}</h3>
                      <div className="space-y-1">
                        {client.email && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="w-4 h-4" />
                            <span className="truncate">{client.email}</span>
                          </div>
                        )}
                        {client.phone && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="w-4 h-4" />
                            <span>{client.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Client Notes */}
                  {client.notes && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-muted-foreground">{client.notes}</p>
                    </div>
                  )}

                  {/* Service Preferences */}
                  {client.service_preferences && client.service_preferences.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2">Preferred Services:</p>
                      <div className="flex flex-wrap gap-2">
                        {client.service_preferences.map(service => (
                          <span
                            key={service}
                            className="px-2 py-1 text-xs rounded bg-blue-50 text-blue-700"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Appointment Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-[hsl(var(--border))]">
                    <div className="text-center">
                      <p className="text-lg font-semibold text-foreground">{upcomingAppointments.length}</p>
                      <p className="text-xs text-muted-foreground">Upcoming</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-foreground">{pastAppointments.length}</p>
                      <p className="text-xs text-muted-foreground">Past Sessions</p>
                    </div>
                    <button className="text-sm text-[hsl(var(--primary))] hover:underline">
                      View Profile
                    </button>
                  </div>

                  {/* Next Appointment */}
                  {upcomingAppointments.length > 0 && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Next Appointment:</p>
                      <p className="text-sm font-medium text-foreground">
                        {format(new Date(upcomingAppointments[0].start_time), 'MMM d, yyyy • h:mm a')}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {upcomingAppointments[0].service.name}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

              {filteredClients.length === 0 && (
                <div className="text-center py-12 col-span-full">
                  <Search className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">No clients found matching your search.</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
