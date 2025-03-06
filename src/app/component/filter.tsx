"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { format } from "date-fns";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";


const countries = ["India", "USA", "UK", "Germany", "Africa"];
const periodicities = ["Daily", "Weekly", "Monthly", "Yearly"];
const departments = ["HR", "Finance", "IT", "Operations"];
const criticalities = ["Low", "Medium", "High", "Critical"];
const types = ["Internal", "External"];

type FilterState = {
  country: string[];
  periodicity: string[];
  department: string[];
  criticality: string[];
  type: string[];
  dateRange: { from: Date | null; to: Date | null };
};

export default function FilterSidebar() {
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({
    country: [],
    periodicity: [],
    department: [],
    criticality: [],
    type: [],
    dateRange: { from: null, to: null },
  });

  // Handle dropdown selection
  const handleSelect = (category: keyof Omit<FilterState, "dateRange">, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value) // Remove if already selected
        : [...prev[category], value], // Add if not selected
    }));
  };

  // Remove selected filter
  const removeFilter = (category: keyof Omit<FilterState, "dateRange">, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category].filter((item) => item !== value),
    }));
  };

  // Handle date range selection
  const handleDateChange = (from: Date | null, to: Date | null) => {
    setSelectedFilters((prev) => ({ ...prev, dateRange: { from, to } }));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md min-h-[400px] flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Filters</h2>

      {/* Dropdowns */}
      {[
        { label: "Country", options: countries, key: "country" },
        { label: "Periodicity", options: periodicities, key: "periodicity" },
        { label: "Department", options: departments, key: "department" },
        { label: "Criticality", options: criticalities, key: "criticality" },
        { label: "Type", options: types, key: "type" },
      ].map(({ label, options, key }) => (
        <div key={key} className="space-y-1">
          <p className="text-sm font-medium">{label}</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full">{`Select ${label}`}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              {options.map((option) => (
                <DropdownMenuItem key={option} onClick={() => handleSelect(key as keyof Omit<FilterState, "dateRange">, option)}>
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Selected Filters */}
          <div className="flex flex-wrap gap-2 mt-1">
            {selectedFilters[key as keyof Omit<FilterState, "dateRange">].map((item) => (
              <span key={item} className="bg-gray-200 px-2 py-1 text-sm rounded flex items-center">
                {item}
                <X className="ml-2 h-4 w-4 cursor-pointer text-gray-600" onClick={() => removeFilter(key as keyof Omit<FilterState, "dateRange">, item)} />
              </span>
            ))}
          </div>
        </div>
      ))}

      {/* Date Range Picker */}
      <div className="space-y-1">
        <p className="text-sm font-medium">Date Range</p>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full">
              {selectedFilters.dateRange.from && selectedFilters.dateRange.to
                ? `${format(selectedFilters.dateRange.from, "yyyy-MM-dd")} - ${format(selectedFilters.dateRange.to, "yyyy-MM-dd")}`
                : "Select Date Range"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto">
            <Calendar
              mode="range"
              selected={selectedFilters.dateRange}
              onSelect={({ from, to }) => handleDateChange(from, to)}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Submit Button */}
      <Button className="w-full mt-4 bg-slate-600">Apply Filters</Button>
    </div>
  );
}
