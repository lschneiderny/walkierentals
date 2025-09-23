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
  return (
    <div className="grid grid-cols-2 gap-2">
      <input
        id={`${id}-start`}
        type="date"
        className="border rounded px-2 py-2 bg-transparent"
        value={startDate}
        onChange={(e) => onChange({ startDate: e.target.value, endDate })}
      />
      <input
        id={`${id}-end`}
        type="date"
        className="border rounded px-2 py-2 bg-transparent"
        value={endDate}
        onChange={(e) => onChange({ startDate, endDate: e.target.value })}
      />
    </div>
  );
}


