'use client';

import { Calendar, Users, Bell, Settings } from 'lucide-react';
import Link from 'next/link';

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: 'reminder',
      title: '1 Reminder: Sarah Chen appointment tomorrow',
      description: 'Send 24-hour reminder for Personal Training session',
      time: '2 hours ago',
      unread: true
    },
    {
      id: 2,
      type: 'inquiry',
      title: 'New client inquiry received',
      description: 'John Anderson interested in massage therapy',
      time: '5 hours ago',
      unread: true
    },
    {
      id: 3,
      type: 'confirmation',
      title: 'Booking confirmed: David Lee',
      description: 'Sports Massage scheduled for March 22, 10:00 AM',
      time: '1 day ago',
      unread: false
    },
    {
      id: 4,
      type: 'cancellation',
      title: 'Cancellation within policy window',
      description: 'Rachel Williams cancelled - no fee applied (>24h notice)',
      time: '2 days ago',
      unread: false
    }
  ];

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
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[hsl(var(--sidebar-accent))] transition-colors mb-1"
          >
            <Users className="w-5 h-5" />
            <span className="font-medium">Clients</span>
          </Link>

          <Link
            href="/notifications"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-foreground))] mb-1"
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
              <h1 className="text-2xl font-semibold text-foreground">Notifications</h1>
              <p className="text-sm text-muted-foreground">Stay updated on appointments and reminders</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-sm text-[hsl(var(--primary))] hover:underline">
                Mark all as read
              </button>
            </div>
          </div>
        </header>

        {/* Notifications Content */}
        <div className="p-8">
          <div className="max-w-3xl">
            <div className="space-y-3">
              {notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`bg-white rounded-xl border border-[hsl(var(--border))] p-6 shadow-card hover:shadow-card-hover transition-shadow ${
                    notification.unread ? 'border-l-4 border-l-[hsl(var(--orange-accent))]' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
                      notification.unread ? 'bg-[hsl(var(--orange-accent))]' : 'bg-gray-300'
                    }`}></div>
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-foreground mb-1">
                        {notification.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {notification.description}
                      </p>
                      <div className="flex items-center gap-4">
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                        {notification.type === 'reminder' && (
                          <button className="text-xs text-[hsl(var(--primary))] hover:underline">
                            Send Reminder
                          </button>
                        )}
                        {notification.type === 'inquiry' && (
                          <button className="text-xs text-[hsl(var(--primary))] hover:underline">
                            View Details
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
