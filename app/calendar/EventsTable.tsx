import React from 'react';
import { Trash2, Edit, Calendar } from 'lucide-react';
import { Event } from '@/interfaces/calendar-interfaces';

interface EventsTableProps {
  events: Event[];
  onDelete: (id: number) => void;
  onEdit: (event: Event) => void;
}

const EventsTable = ({ events, onDelete, onEdit }: EventsTableProps) => {
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`);
    const dateB = new Date(`${b.date} ${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="h-6 w-6 text-indigo-600" />
        <h2 className="text-xl font-semibold text-gray-800">Upcoming Events</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedEvents.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  No events scheduled yet
                </td>
              </tr>
            ) : (
              sortedEvents.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })}
                    <br />
                    <span className="text-indigo-600">{event.time}</span>
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">
                    {event.title}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {event.location}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {event.description}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => onEdit(event)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                      title="Edit event"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(event.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete event"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventsTable;