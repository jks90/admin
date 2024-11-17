import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import { Event } from '@/interfaces/calendar-interfaces';

interface EventCalendarProps {
  events: Event[];
}

const EventCalendar = ({ events }: EventCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      if (direction === 'prev') {
        newDate.setMonth(prevDate.getMonth() - 1);
      } else {
        newDate.setMonth(prevDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const isCurrentDay = (day: number) => {
    const today = new Date();
    return currentDate.getMonth() === today.getMonth() &&
           currentDate.getFullYear() === today.getFullYear() &&
           day === today.getDate();
  };

  const getEventsForDay = (day: number) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === day &&
             eventDate.getMonth() === currentDate.getMonth() &&
             eventDate.getFullYear() === currentDate.getFullYear();
    });
  };

  return (
    <div className="bg-white rounded-lg h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <h2 className="text-xl font-semibold text-gray-800">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        
        <button
          onClick={goToToday}
          className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 border border-indigo-200 hover:border-indigo-300 rounded-lg transition-colors bg-indigo-50 hover:bg-indigo-100"
        >
          <CalendarDays className="h-4 w-4" />
          Today
        </button>
      </div>

      <div>
        <div className="grid grid-cols-7 gap-1 text-center font-medium text-gray-600 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="p-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {blanks.map((blank) => (
            <div key={`blank-${blank}`} className="p-2 h-[80px]" />
          ))}
          
          {days.map((day) => {
            const dayEvents = getEventsForDay(day);
            return (
              <div
                key={day}
                className={`p-2 border rounded-lg h-[80px] ${
                  isCurrentDay(day)
                    ? 'bg-indigo-50 border-indigo-200'
                    : 'border-gray-100 hover:bg-gray-50'
                } transition-all duration-200 overflow-hidden`}
              >
                <div className="font-medium text-gray-700 mb-1">{day}</div>
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    className="text-xs p-1 mb-1 rounded bg-indigo-100 text-indigo-700"
                    title={`${event.description}\nLocation: ${event.location}`}
                  >
                    {event.time} - {event.title}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;