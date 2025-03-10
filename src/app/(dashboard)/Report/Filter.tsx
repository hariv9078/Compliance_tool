// "use client";
// import { useState } from "react";
// import Datepicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// export default function Filter() {
//   const [filters, setFilters] = useState({
//     location: "",
//     department: "",
//     dateRange: [null, null] as [Date | null, Date | null],
//     fpr: "",
//     approver: "",
//     hod: "",
//     actType: "",
//     status: "",
//     amount: "",
//     interest: "",
//     penalty: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full mx-auto">
//       <h2 className="text-lg font-semibold mb-4">Filters</h2>

//       <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
//         {/* Location - Longer width */}
//         <select name="location" value={filters.location} onChange={handleChange} className="p-2 border rounded w-60">
//           <option value="">Select Location</option>
//           <option value="NY">New York</option>
//           <option value="LA">Los Angeles</option>
//         </select>

//         {/* Department */}
//         <select name="department" value={filters.department} onChange={handleChange} className="p-2 border rounded w-40">
//           <option value="">Department</option>
//           <option value="HR">HR</option>
//           <option value="Finance">Finance</option>
//         </select>

//         {/* Date Range Picker */}
//         <div className="flex items-center border p-2 rounded w-60">
//           <Datepicker
//             selectsRange
//             startDate={filters.dateRange[0]}
//             endDate={filters.dateRange[1]}
//             onChange={(update) => setFilters((prev) => ({ ...prev, dateRange: update as [Date | null, Date | null] }))}
//             isClearable
//             placeholderText="Select Date Range"
//             className="outline-none w-full"
//           />
//         </div>

//         {/* FPR Dropdown */}
//         <select name="fpr" value={filters.fpr} onChange={handleChange} className="p-2 border rounded w-40">
//           <option value="">FPR?</option>
//           <option value="Yes">Yes</option>
//           <option value="No">No</option>
//         </select>

//         {/* Approver Dropdown */}
//         <select name="approver" value={filters.approver} onChange={handleChange} className="p-2 border rounded w-40">
//           <option value="">Approver?</option>
//           <option value="Yes">Yes</option>
//           <option value="No">No</option>
//         </select>

//         {/* HoD Dropdown */}
//         <select name="hod" value={filters.hod} onChange={handleChange} className="p-2 border rounded w-40">
//           <option value="">HoD?</option>
//           <option value="Yes">Yes</option>
//           <option value="No">No</option>
//         </select>

//         {/* Act Type */}
//         <select name="actType" value={filters.actType} onChange={handleChange} className="p-2 border rounded w-40">
//           <option value="">Act Type</option>
//           <option value="Type1">Type 1</option>
//           <option value="Type2">Type 2</option>
//         </select>

//         {/* Status */}
//         <select name="status" value={filters.status} onChange={handleChange} className="p-2 border rounded w-40">
//           <option value="">Status</option>
//           <option value="Pending">Pending</option>
//           <option value="Approved">Approved</option>
//         </select>

//         {/* Amount Dropdown */}
//         <select name="amount" value={filters.amount} onChange={handleChange} className="p-2 border rounded w-40">
//           <option value="">Amount</option>
//           <option value="Yes">Yes</option>
//           <option value="No">No</option>
//         </select>

//         {/* Interest Dropdown */}
//         <select name="interest" value={filters.interest} onChange={handleChange} className="p-2 border rounded w-40">
//           <option value="">Interest</option>
//           <option value="Yes">Yes</option>
//           <option value="No">No</option>
//         </select>

//         {/* Penalty Dropdown */}
//         <select name="penalty" value={filters.penalty} onChange={handleChange} className="p-2 border rounded w-40">
//           <option value="">Penalty</option>
//           <option value="Yes">Yes</option>
//           <option value="No">No</option>
//         </select>
//       </div>

//       {/* Apply Button - Placed Separately */}
//       <div className="mt-6 flex justify-center">
//         <button className="bg-blue-500 text-white px-6 py-2 rounded">Apply Filters</button>
//       </div>
//     </div>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Filter({ username, onDataFetched }) {
  const [filters, setFilters] = useState({
    locations: "",
    department: "",
    dateRange: [null, null] as [Date | null, Date | null],
    fpr: "",
    approver: "",
    hod: "",
    act: "",
    status: "",
    amount: "",
    interest: "",
    penalty: "",
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  // State to store filter options
  const [filterOptions, setFilterOptions] = useState({
    locations: [],
    department: [],
    fpr: [],
    approver: [],
    hod: [],
    act: [],
    status: [],
  });

  useEffect(() => {
    // Fetch options for all filter dropdowns when component mounts
    const fetchFilterOptions = async () => {
      try {
        // Create an array of columns to fetch options for
        const columns = [
          'locations', 'department', 'fpr', 'approver', 
          'hod', 'act', 'status'
        ];
        
        // Fetch options for each column
        const optionsPromises = columns.map(column => 
          fetch(`/api/sourcefile?action=getOptions&column=${column}`)
            .then(res => res.json())
            .then(data => ({ column, options: data.options || [] }))
            .catch(err => {
              console.error(`Error fetching options for ${column}:`, err);
              return { column, options: [] };
            })
        );
        
        // Wait for all fetches to complete
        const results = await Promise.all(optionsPromises);
        
        // Build options object
        const newFilterOptions = {};
        results.forEach(result => {
          // Map 'act_type' to 'actType' for frontend consistency
          const fieldName = result.column === 'act' ? 'act' : result.column;
          newFilterOptions[fieldName] = result.options;
        });
        
        setFilterOptions(newFilterOptions);
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    };
    
    fetchFilterOptions();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchFilteredData = async () => {
    setIsLoading(true);
    try {
      // Build the query parameters
      const params = new URLSearchParams();
      params.append('action', 'getData');
      
      if (filters.locations) params.append('locations', filters.locations);
      if (filters.department) params.append('department', filters.department);
      
      // Handle date range
      if (filters.dateRange[0]) {
        params.append('startDate', filters.dateRange[0].toISOString().split('T')[0]);
      }
      if (filters.dateRange[1]) {
        params.append('endDate', filters.dateRange[1].toISOString().split('T')[0]);
      }
      
      if (filters.fpr) params.append('fpr', filters.fpr);
      if (filters.approver) params.append('approver', filters.approver);
      if (filters.hod) params.append('hod', filters.hod);
      if (filters.act) params.append('act', filters.act);
      if (filters.status) params.append('status', filters.status);
      if (filters.amount) params.append('amount', filters.amount);
      if (filters.interest) params.append('interest', filters.interest);
      if (filters.penalty) params.append('penalty', filters.penalty);

      // Make the API call
      const response = await fetch(`/api/sourcefile?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const data = await response.json();
      // Call the callback function with the fetched data
      onDataFetched(data.data);
    } catch (error) {
      console.error('Error fetching filtered data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full mx-auto">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        {/* Location - Dynamic options */}
        <select name="locations" value={filters.locations} onChange={handleChange} className="p-2 border rounded w-60">
          <option value="">Select Location</option>
          {filterOptions.locations.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        {/* Department - Dynamic options */}
        <select name="department" value={filters.department} onChange={handleChange} className="p-2 border rounded w-40">
          <option value="">Department</option>
          {filterOptions.department.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
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

        {/* FPR Dropdown - Dynamic options */}
        <select name="fpr" value={filters.fpr} onChange={handleChange} className="p-2 border rounded w-40">
          <option value="">FPR?</option>
          {filterOptions.fpr.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        {/* Approver Dropdown - Dynamic options */}
        <select name="approver" value={filters.approver} onChange={handleChange} className="p-2 border rounded w-40">
          <option value="">Approver?</option>
          {filterOptions.approver.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        {/* HoD Dropdown - Dynamic options */}
        <select name="hod" value={filters.hod} onChange={handleChange} className="p-2 border rounded w-40">
          <option value="">HoD?</option>
          {filterOptions.hod.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        {/* Act Type - Dynamic options */}
        <select name="act" value={filters.act} onChange={handleChange} className="p-2 border rounded w-40">
          <option value="">Act Type</option>
          {filterOptions.act.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        {/* Status - Dynamic options */}
        <select name="status" value={filters.status} onChange={handleChange} className="p-2 border rounded w-40">
          <option value="">Status</option>
          {filterOptions.status.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
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
        <button 
          className={`px-6 py-2 rounded ${isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
          onClick={fetchFilteredData}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Apply Filters'}
        </button>
      </div>
    </div>
  );
}