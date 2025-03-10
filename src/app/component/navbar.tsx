"use client";
import { useState, useEffect } from "react";
import { ChevronDown, User, Bell, LogOut } from "lucide-react";

export default function Navbar() {
  const [selectedCompany, setSelectedCompany] = useState("Select Company");
  const [selectedRole, setSelectedRole] = useState("Select Role");
  const [profileOpen, setProfileOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);
  const [companies, setCompanies] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [username, setUsername] = useState(""); 
  const [sourcefileData, setSourcefileData] = useState([]);

  // Initial load of user data
  useEffect(() => {
    async function fetchUserData() {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();
        console.log("User API Response:", data);

        if (data && data.username) {
          setUsername(data.username); 

          // Initially load roles from /api/user
          const roleOptions: string[] = [];
          if (data.fpr === true) roleOptions.push("FPR");
          if (data.approver === true) roleOptions.push("Approver");
          if (data.hod === true) roleOptions.push("HoD");
          setRoles(roleOptions);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUserData();
  }, []);

  // Fetch sourcefile data
  useEffect(() => {
    async function fetchSourcefileData() {
      try {
        const res = await fetch("/api/sourcefile");
        const responseData = await res.json();
        console.log("Full Sourcefile Data:", responseData);

        if (Array.isArray(responseData.data)) {
          setSourcefileData(responseData.data);

          // Extract unique companies from sourcefile data
          const uniqueCompanies = Array.from(
            new Set(responseData.data
              .map((entry: any) => entry.company_name)
              .filter(Boolean) // Remove any undefined/null values
            )
          );
          
          console.log("Extracted Companies:", uniqueCompanies);
          setCompanies(uniqueCompanies);
        } else {
          console.error("Unexpected API response format");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
    fetchSourcefileData();
  }, []);

  // Function to handle company selection
  const handleCompanySelect = (company: string) => {
    console.log("Company selected:", company);
    setSelectedCompany(company);
    setSelectedRole("Select Role"); // Reset role selection
    
    // Fetch roles for the selected company based on sourcefile data
    if (company && company !== "Select Company") {
      const rolesForCompany = getRolesForCompany(company);
      setRoles(rolesForCompany);
    } else {
      setRoles([]);
    }
    
    setCompanyOpen(false);
  };

  // Get roles for a specific company from sourcefile data
  const getRolesForCompany = (company: string): string[] => {
    console.log("Getting roles for company:", company);
    console.log("Current username:", username);
    console.log("Available data:", sourcefileData);
    
    if (!company || !username || !sourcefileData.length) {
      console.error("Missing data for role filtering");
      return [];
    }

    try {
      // Filter entries for the selected company
      const filteredData = sourcefileData.filter(
        (entry: any) => entry.company_name?.toLowerCase() === company.toLowerCase()
      );
  
      console.log("Filtered Data for company:", filteredData);
  
      const roleOptions: string[] = [];
  
      // Check each entry for roles that match the current username
      filteredData.forEach((entry: any) => {
        if (entry.fpr === username && !roleOptions.includes("FPR")) {
          roleOptions.push("FPR");
        }
        if (entry.approver === username && !roleOptions.includes("Approver")) {
          roleOptions.push("Approver");
        }
        if (entry.hod === username && !roleOptions.includes("HoD")) {
          roleOptions.push("HoD");
        }
      });
  
      console.log("Final roles list for company:", roleOptions);
      return roleOptions;
    } catch (error) {
      console.error("Error filtering roles:", error);
      return [];
    }
  };

  return (
    <nav className="bg-slate-600 mt-1 text-white p-3 flex items-center shadow-md text-sm rounded-lg">
      <div className="ml-auto flex items-center gap-2">
        {/* Company Selector */}
        <div className="relative">
          <button
            className="flex items-center gap-1 bg-gray-700 px-3 py-1 rounded-md"
            onClick={() => setCompanyOpen(!companyOpen)}
          >
            {selectedCompany} <ChevronDown size={14} />
          </button>
          {companyOpen && (
            <div className="absolute mt-1 w-40 bg-white text-black shadow-md rounded-md z-10">
              {companies.length > 0 ? (
                companies.map((company, index) => (
                  <div
                    key={index}
                    className="px-3 py-1 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleCompanySelect(company)}
                  >
                    {company}
                  </div>
                ))
              ) : (
                <div className="px-3 py-1 text-gray-500">Loading...</div>
              )}
            </div>
          )}
        </div>

        {/* Role Selector */}
        <div className="relative">
          <button
            className="flex items-center gap-1 bg-gray-700 px-3 py-1 rounded-md"
            onClick={() => setRoleOpen(!roleOpen)}
          >
            {selectedRole} <ChevronDown size={14} />
          </button>
          {roleOpen && (
            <div className="absolute mt-1 w-40 bg-white text-black shadow-md rounded-md z-10">
              {roles.length > 0 ? (
                roles.map((role) => (
                  <div
                    key={role}
                    className="px-3 py-1 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      setSelectedRole(role);
                      setRoleOpen(false);
                    }}
                  >
                    {role}
                  </div>
                ))
              ) : (
                <div className="px-3 py-1 text-gray-500">No Roles Available</div>
              )}
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            className="flex items-center gap-1 bg-gray-700 px-3 py-1 rounded-full"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <User size={16} />
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-md rounded-md z-10">
              <ul>
                <li className="px-3 py-1 hover:bg-gray-200 cursor-pointer flex items-center gap-2">
                  <User size={14} /> Profile
                </li>
                <li className="px-3 py-1 hover:bg-gray-200 cursor-pointer flex items-center gap-2">
                  <Bell size={14} /> Notifications
                </li>
                <li
                  className="px-3 py-1 hover:bg-red-200 cursor-pointer flex items-center gap-2 text-red-600"
                  onClick={() => {
                    fetch("/api/logout", { method: "POST" });
                    setTimeout(() => {
                      window.location.href = "/sign-in";
                    }, 100);
                  }}
                >
                  <LogOut size={14} /> Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}