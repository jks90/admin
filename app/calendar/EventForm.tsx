import React, { useState, useEffect } from 'react';
import { Event } from '@/interfaces/calendar-interfaces';
import { Plus, Save } from 'lucide-react';

interface EventFormProps {
  onSubmit: (event: Omit<Event, 'id'>) => void;
  initialEvent?: Event | null;
  onCancel?: () => void;
}

const EventForm = ({ onSubmit, initialEvent, onCancel }: EventFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
    location: ''
  });

  useEffect(() => {
    if (initialEvent) {
      setFormData({
        title: initialEvent.title,
        date: initialEvent.date,
        time: initialEvent.time,
        description: initialEvent.description,
        location: initialEvent.location
      });
      setIsOpen(true);
    }
  }, [initialEvent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: '',
      date: '',
      time: '',
      description: '',
      location: ''
    });
    setIsOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      date: '',
      time: '',
      description: '',
      location: ''
    });
    setIsOpen(false);
    onCancel?.();
  };

  if (!isOpen && !initialEvent) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="h-5 w-5" />
        Add New Event
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Event Title"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Event Description"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          rows={3}
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
        >
          <Save className="h-5 w-5" />
          {initialEvent ? 'Update Event' : 'Save Event'}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EventForm;