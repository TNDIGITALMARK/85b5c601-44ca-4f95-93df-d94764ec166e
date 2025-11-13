'use client';

import { useState } from 'react';
import { getAppointmentsWithDetails } from '@/lib/mock-data';
import { Calendar, Users, Bell, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { format, startOfWeek, addDays, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const appointments = getAppointmentsWithDetails();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Get appointments for a specific day
  const getAppointmentsForDay = (day: Date) => {
    return appointments.filter(apt => isSameDay(new Date(apt.start_time), day));
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
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
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-foreground))] mb-1"
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
              <h1 className="text-2xl font-semibold text-foreground">Calendar</h1>
              <p className="text-sm text-muted-foreground">Manage your appointments and schedule</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-lg font-medium hover:opacity-90 transition-opacity">
                New Booking
              </button>
            </div>
          </div>
        </header>

        {/* Calendar Content */}
        <div className="p-8">
          <div className="bg-white rounded-xl border border-[hsl(var(--border))] p-6 shadow-card">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                {format(currentDate, 'MMMM yyyy')}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={previousMonth}
                  className="p-2 rounded-lg border border-[hsl(var(--border))] hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="px-4 py-2 rounded-lg border border-[hsl(var(--border))] hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  Today
                </button>
                <button
                  onClick={nextMonth}
                  className="p-2 rounded-lg border border-[hsl(var(--border))] hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Week Day Headers */}
              {weekDays.map(day => (
                <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                  {day}
                </div>
              ))}

              {/* Calendar Days */}
              {/* Add empty cells for days before month starts */}
              {Array.from({ length: monthStart.getDay() }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square"></div>
              ))}

              {/* Actual days of the month */}
              {daysInMonth.map(day => {
                const dayAppointments = getAppointmentsForDay(day);
                const isToday = isSameDay(day, new Date());

                return (
                  <div
                    key={day.toISOString()}
                    className={`aspect-square border border-[hsl(var(--border))] rounded-lg p-2 ${
                      isToday ? 'bg-blue-50 border-blue-200' : 'bg-white'
                    } hover:shadow-card transition-shadow cursor-pointer`}
                  >
                    <div className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-foreground'}`}>
                      {format(day, 'd')}
                    </div>
                    <div className="mt-1 space-y-1">
                      {dayAppointments.slice(0, 2).map(apt => (
                        <div
                          key={apt.id}
                          className={`text-xs px-2 py-1 rounded ${
                            apt.service.color === 'teal'
                              ? 'bg-[hsl(var(--teal-accent))]/20 text-[hsl(var(--teal-accent))]'
                              : 'bg-[hsl(var(--green-accent))]/20 text-[hsl(var(--green-accent))]'
                          }`}
                        >
                          {format(new Date(apt.start_time), 'h:mm a')}
                        </div>
                      ))}
                      {dayAppointments.length > 2 && (
                        <div className="text-xs text-muted-foreground">
                          +{dayAppointments.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
