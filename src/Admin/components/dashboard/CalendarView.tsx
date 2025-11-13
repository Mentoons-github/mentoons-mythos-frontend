import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const CalendarView = () => {
  return (
    <div className="bg-secondary rounded-2xl border shadow-md p-4">
      <h2 className="text-lg font-semibold mb-3">Calendar</h2>

      <DayPicker
        mode="single"
        defaultMonth={new Date()}
        showOutsideDays
      />
    </div>
  );
};

export default CalendarView;
