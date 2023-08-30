import React, { useState } from 'react';

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState();
  const [isDateSelected, setIsDateSelected] = useState(false)

  const handleDateChange = (event) => {
      setSelectedDate(event.target.value);
      setIsDateSelected(true);
  };

  return (
    <div className="mt-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
        Select a Date
      </label>
      <input
        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
      />
      {isDateSelected && (
        <p>Selected Date: {selectedDate}</p>
      )}
    </div>
  );
};

export default DatePicker;
