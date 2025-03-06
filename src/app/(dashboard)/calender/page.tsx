"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

// Compliance due dates data
const complianceDueDates: { date: string; details: string }[] = [
  { date: "2025-03-10", details: "Submit Q1 Financial Report" },
  { date: "2025-03-15", details: "Annual Compliance Review" },
  { date: "2025-03-20", details: "Tax Filing Deadline" },
];

const ComplianceCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedDetails, setSelectedDetails] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleDateClick = (value: Date) => {
    const formattedDate = value.toISOString().split("T")[0]; // Format YYYY-MM-DD
    const compliance = complianceDueDates.find((item) => item.date === formattedDate);
    if (compliance) {
      setSelectedDate(formattedDate);
      setSelectedDetails(compliance.details);
      setIsOpen(true);
    }
  };

  // Function to highlight due dates
  const tileClassName = ({ date }: { date: Date }) => {
    const formattedDate = date.toISOString().split("T")[0];
    return complianceDueDates.some((item) => item.date === formattedDate) ? "bg-red-500 text-white rounded-full" : "";
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h2 className="text-xl font-semibold">Compliance Calendar</h2>
      <Calendar
        onClickDay={handleDateClick}
        tileClassName={tileClassName}
        className="border rounded-lg p-2 shadow-md"
      />

      {/* Modal for Compliance Details */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div></div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Compliance Due</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <p><strong>Date:</strong> {selectedDate}</p>
            <p><strong>Details:</strong> {selectedDetails}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ComplianceCalendar;
