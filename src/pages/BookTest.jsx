import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookingTest = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <h1>Booking Form</h1>
      <form>
        {/* Other form fields */}

        <div className="mb-4">
          <label
            htmlFor="appointmentDate"
            className="block text-sm font-medium text-gray-600"
          >
            Appointment Date and Time
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="Pp"
            timeFormat="HH:mm"
            timeIntervals={30}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default BookingTest;
