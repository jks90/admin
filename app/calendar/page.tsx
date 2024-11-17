'use client'
import React, { useState } from 'react';
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../lib/auth'
import { Progress } from "@/components/ui/progress"
import { useMenu } from "@/app/lib/menuContext";
import EventCalendar from './EventCalendar';
import BusinessHours from './BusinessHours';
import EventForm from './EventForm';
import EventsTable from './EventsTable';
import { Event } from '@/interfaces/calendar-interfaces';
import { Clock } from 'lucide-react';

export default function Calendary() {

  const { user } = useAuth();
  const router = useRouter();
  const { isMenuOpen, openMenu } = useMenu();
  const [progress, setProgress] = React.useState(13);

  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Team Meeting',
      date: '2024-03-20',
      time: '10:00',
      description: 'Monthly team sync',
      location: 'Conference Room A'
    }
  ]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const addEvent = (newEvent: Omit<Event, 'id'>) => {
    setEvents([...events, { ...newEvent, id: events.length + 1 }]);
  };

  const deleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const editEvent = (event: Event) => {
    setEditingEvent(event);
  };

  const updateEvent = (updatedEvent: Omit<Event, 'id'>) => {
    if (editingEvent) {
      setEvents(events.map(event =>
        event.id === editingEvent.id
          ? { ...updatedEvent, id: event.id }
          : event
      ));
      setEditingEvent(null);
    }
  };


  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => setProgress(100), 500);
      return () => clearTimeout(timer);
    } else {
      openMenu();
    }
  }, [user, router]);

  React.useEffect(() => {
    // Lógica cuando la barra de progreso llega a 100
    if (progress === 100) {
      // Añadir un delay de 1 segundo antes de ejecutar la función
      const delayTimer = setTimeout(() => {
        handleProgressComplete();
      }, 1000);
      return () => clearTimeout(delayTimer);
    }
  }, [progress]);

  const handleProgressComplete = () => {
    router.push('/');
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center w-full max-w-2xl px-4">
          <p className="mb-6 text-lg font-semibold">Loading...</p>
          <Progress value={progress} className="w-full h-4 bg-gray-300 rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen  bg-gray-100">
      <div className="flex flex-1 overflow-hidden pt-16">
        <main
          className={`flex-1 p-4 overflow-y-auto transition-all duration-300 ease-in-out ${isMenuOpen ? "ml-64" : "ml-0"
            }`}
        >
          <div className="min-h-screen ">

            <div className="">
              <div className="mx-auto">
                {/* <header className="text-center mb-12">
                  <h1 className="text-4xl font-bold text-indigo-900 mb-2 flex items-center justify-center gap-2">
                    <Calendar className="h-8 w-8 text-indigo-600" />
                    Calendar System
                  </h1>
                  <p className="text-gray-600">Manage your schedule and events in one place</p>
                </header> */}

                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <EventCalendar events={events} />
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <EventForm
                        onSubmit={editingEvent ? updateEvent : addEvent}
                        initialEvent={editingEvent}
                        onCancel={() => setEditingEvent(null)}
                      />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                      <Clock className="h-6 w-6 text-indigo-600" />
                      Business Hours & Holidays
                    </h2>
                    <BusinessHours />
                  </div>
                </div>

                <EventsTable
                  events={events}
                  onDelete={deleteEvent}
                  onEdit={editEvent}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>


  );


}