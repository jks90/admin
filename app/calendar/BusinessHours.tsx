import React from 'react';

const BusinessHours = () => {
  const schedule = [
    { day: 'Monday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Tuesday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Wednesday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Thursday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Friday', hours: '9:00 AM - 5:00 PM' },
    { day: 'Saturday', hours: '10:00 AM - 2:00 PM' },
    { day: 'Sunday', hours: 'Closed' },
  ];

  const holidays = [
    { date: 'January 1', name: 'New Year\'s Day' },
    { date: 'December 25', name: 'Christmas Day' },
    { date: 'July 4', name: 'Independence Day' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Regular Hours</h3>
        <div className="space-y-2">
          {schedule.map((item) => (
            <div key={item.day} className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="font-medium text-gray-700">{item.day}</span>
              <span className={`text-sm ${item.hours === 'Closed' ? 'text-red-500' : 'text-gray-600'}`}>
                {item.hours}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Holidays</h3>
        <div className="bg-red-50 rounded-lg p-4">
          {holidays.map((holiday) => (
            <div key={holiday.date} className="flex justify-between items-center py-2">
              <span className="text-red-600 font-medium">{holiday.name}</span>
              <span className="text-sm text-red-500">{holiday.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessHours;