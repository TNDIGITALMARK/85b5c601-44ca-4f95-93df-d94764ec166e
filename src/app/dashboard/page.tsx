'use client';

import { useEffect, useState } from 'react';
import { getTodaysAppointments, getThisWeeksAppointments, getClients } from '@/lib/supabase/queries';
import { AppointmentWithDetails, Client } from '@/types/database';
import { Calendar, Users, Bell, Settings } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default function DashboardPage() {
  const [todaysAppointments, setTodaysAppointments] = useState<AppointmentWithDetails[]>([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState<AppointmentWithDetails[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [today, upcoming, clientList] = await Promise.all([
        getTodaysAppointments(),
        getThisWeeksAppointments(),
        getClients()
      ]);
      setTodaysAppointments(today);
      setUpcomingAppointments(upcoming);
      setClients(clientList);
      setLoading(false);
    }
    fetchData();
  }, []);

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
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-foreground))] mb-1"
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
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[hsl(var(--sidebar-accent))] transition-colors mb-1"
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
              <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back! Here's what's happening today.</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-lg font-medium hover:opacity-90 transition-opacity">
                New Booking
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-muted-foreground">Loading...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Today's Appointments */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl border border-[hsl(var(--border))] p-6 shadow-card">
                  <h2 className="text-xl font-semibold mb-4">Today's Appointments</h2>
                  <div className="space-y-3">
                    {todaysAppointments.length === 0 ? (
                      <div className="text-center py-12">
                        <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                        <p className="text-muted-foreground font-medium">No appointments today</p>
                        <p className="text-sm text-muted-foreground mt-1">Create your first booking to get started</p>
                      </div>
                    ) : (
                      todaysAppointments.map((apt) => (
                      <div
                        key={apt.id}
                        className="flex items-center gap-4 p-4 rounded-lg border border-[hsl(var(--border))] hover:shadow-card-hover transition-shadow"
                      >
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-semibold text-gray-700">
                            {apt.client.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{apt.client.name}</p>
                          <p className="text-sm text-muted-foreground">{apt.service.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">
                            {format(new Date(apt.start_time), 'h:mm a')}
                          </p>
                          <span
                            className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                              apt.service.color === 'teal'
                                ? 'bg-[hsl(var(--teal-accent))]/20 text-[hsl(var(--teal-accent))]'
                                : 'bg-[hsl(var(--green-accent))]/20 text-[hsl(var(--green-accent))]'
                            }`}
                          >
                            {apt.status}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Upcoming This Week */}
              <div className="bg-white rounded-xl border border-[hsl(var(--border))] p-6 shadow-card mt-6">
                <h2 className="text-xl font-semibold mb-4">Upcoming This Week</h2>
                <div className="space-y-3">
                  {upcomingAppointments.slice(0, 5).map((apt) => (
                    <div
                      key={apt.id}
                      className="flex items-center gap-4 p-3 rounded-lg border border-[hsl(var(--border))] hover:shadow-card-hover transition-shadow"
                    >
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-semibold text-gray-700">
                          {apt.client.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm text-foreground">{apt.client.name}</p>
                        <p className="text-xs text-muted-foreground">{apt.service.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-medium text-foreground">
                          {format(new Date(apt.start_time), 'MMM d, h:mm a')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Client Profiles & Notifications */}
            <div className="space-y-6">
              {/* Client Profiles */}
              <div className="bg-white rounded-xl border border-[hsl(var(--border))] p-6 shadow-card">
                <h3 className="text-lg font-semibold mb-4">Client Profiles</h3>
                <div className="space-y-3">
                  {clients.length === 0 ? (
                    <div className="text-center py-8">
                      <Users className="w-10 h-10 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">No clients yet</p>
                    </div>
                  ) : (
                    clients.slice(0, 3).map((client) => (
                      <div key={client.id} className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-semibold text-gray-700">
                            {client.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm text-foreground">{client.name}</p>
                          <p className="text-xs text-muted-foreground">{client.phone}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                {clients.length > 0 && (
                  <Link
                    href="/clients"
                    className="block text-center mt-4 text-sm text-[hsl(var(--primary))] hover:underline"
                  >
                    View All Clients
                  </Link>
                )}
              </div>

              {/* Notifications */}
              <div className="bg-white rounded-xl border border-[hsl(var(--border))] p-6 shadow-card">
                <h3 className="text-lg font-semibold mb-4">Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[hsl(var(--orange-accent))] mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm text-foreground">1 Reminder: Sarah Chen appointment tomorrow</p>
                      <p className="text-xs text-muted-foreground">Send 24-hour reminder</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm text-foreground">New client inquiry received</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}
        </div>
      </main>
    </div>
  );
}
