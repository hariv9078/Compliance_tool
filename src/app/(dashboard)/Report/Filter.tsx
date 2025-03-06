"use client";
import { useState } from "react";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Filter() {
  const [filters, setFilters] = useState({
    location: "",
    department: "",
    dateRange: [null, null] as [Date | null, Date | null],
    fpr: "",
    approver: "",
    hod: "",
    actType: "",
    status: "",
    amount: "",
    interest: "",
    penalty: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full mx-auto">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        {/* Location - Longer width */}
        <select name="location" value={filters.location} onChange={handleChange} className="p-2 border rounded w-60">
          <option value="">Select Location</option>
          <option value="NY">New York</option>
          <option value="LA">Los Angeles</option>
        </select>

        {/* Department */}
        <select name="department" value={filters.department} onChange={handleChange} className="p-2 border rounded w-40">
          <option value="">Department</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
        </select>

        {/* Date Range Picker */}
        <div className="flex items-center border p-2 rounded w-60">
          <Datepicker
            selectsRange
            startDate={filters.dateRange[0]}
            endDate={filters.dateRange[1]}
            onChange={(update) => setFilters((prev) => ({ ...prev, dateRange: update as [Date | null, Date | null] }))}
            isClearable
            placeholderText="Select Date Range"
            className="outline-none w-full"
          />
        </div>

        {/* FPR Dropdown */}
        <select name="fpr" value={filters.fpr} onChange={handleChange} className="p-2 border rounded w-40">
          <option value="">FPR?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        {/* Approver Dropdown */}
        <select name="approver" value={filters.approver} onChange={handleChange} className="p-2 border rounded w-40">
          <option value="">Approver?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        {/* HoD Dropdown */}
        <select name="hod" value={filters.hod} onChange={handleChange} className="p-2 border rounded w-40">
          <option value="">HoD?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        {/* Act Type */}
        <select name="actType" value={filters.actType} onChange={handleChange} className="p-2 border rounded w-40">
          <option value="">Act Type</option>
          <option value="Type1">Type 1</option>
          <option value="Type2">Type 2</option>
        </select>

        {/* Status */}
        <select name="status" value={filters.status} onChange={handleChange} className="p-2 border rounded w-40">
          <option value="">Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
        </select>

        {/* Amount Dropdown */}
        <select name="amount" value={filters.amount} onChange={handleChange} className="p-2 border rounded w-40">
          <option value="">Amount</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        {/* Interest Dropdown */}
        <select name="interest" value={filters.interest} onChange={handleChange} className="p-2 border rounded w-40">
          <option value="">Interest</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        {/* Penalty Dropdown */}
        <select name="penalty" value={filters.penalty} onChange={handleChange} className="p-2 border rounded w-40">
          <option value="">Penalty</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      {/* Apply Button - Placed Separately */}
      <div className="mt-6 flex justify-center">
        <button className="bg-blue-500 text-white px-6 py-2 rounded">Apply Filters</button>
      </div>
    </div>
  );
}
