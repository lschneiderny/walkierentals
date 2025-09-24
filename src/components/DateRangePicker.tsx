"use client";

import { useId } from "react";

export default function DateRangePicker({
  startDate,
  endDate,
  onChange,
}: {
  startDate: string;
  endDate: string;
  onChange: (next: { startDate: string; endDate: string }) => void;
}) {
  const id = useId();
  
  // Calculate min and max dates
  const today = new Date().toISOString().slice(0, 10);
  const oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
  const maxDate = oneYearFromNow.toISOString().slice(0, 10);

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label htmlFor={`${id}-start`} className="block text-xs font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            id={`${id}-start`}
            type="date"
            className="border rounded px-2 py-2 bg-transparent w-full"
            value={startDate}
            min={today}
            max={maxDate}
            onChange={(e) => {
              const newStartDate = e.target.value;
              // If new start date is after end date, adjust end date
              const newEndDate = newStartDate > endDate ? newStartDate : endDate;
              onChange({ startDate: newStartDate, endDate: newEndDate });
            }}
          />
        </div>
        <div>
          <label htmlFor={`${id}-end`} className="block text-xs font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            id={`${id}-end`}
            type="date"
            className="border rounded px-2 py-2 bg-transparent w-full"
            value={endDate}
            min={startDate}
            max={maxDate}
            onChange={(e) => onChange({ startDate, endDate: e.target.value })}
          />
        </div>
      </div>
      <div className="text-xs text-gray-500">
        Rental period: Up to 1 year from today
      </div>
    </div>
  );
}


