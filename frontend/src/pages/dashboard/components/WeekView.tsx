import { useState } from "react";
import type { HabitUI } from "@/store/slices/habitsSlice";

export const WeekView: React.FC<{ habits: HabitUI[] }> = ({ habits }) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startWeekDay = firstDayOfMonth.getDay();

  const [selectedDate, setSelectedDate] = useState<Date | null>(today);

  const days: Date[] = Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));

  return (
    <div className="grid grid-cols-7 gap-2 text-center">
      {/* Weekday headers */}
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <div key={day} className="font-semibold text-gray-600">
          {day}
        </div>
      ))}

      {/* Empty slots for alignment */}
      {Array.from({ length: startWeekDay }).map((_, idx) => (
        <div key={`empty-${idx}`} />
      ))}

      {/* Days */}
      {days.map((date) => {
        const isToday = date.toDateString() === today.toDateString();
        const isSelected = selectedDate?.toDateString() === date.toDateString();

        return (
          <div
            key={date.toISOString()}
            onClick={() => setSelectedDate(date)}
            className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer transition-colors
              ${isSelected ? "bg-primary text-primary-foreground font-bold" : ""}
              ${!isSelected && isToday ? "bg-blue-200 text-blue-800 font-semibold" : ""}
              ${!isSelected && !isToday ? "bg-gray-100 text-gray-700 hover:bg-gray-200" : ""}`}
          >
            {date.getDate()}
          </div>
        );
      })}
    </div>
  );
};
