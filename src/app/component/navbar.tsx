"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // <-- Add this line

import { ChevronDown, User, Bell, LogOut, Link } from "lucide-react";

export default function Navbar() {
  const [selectedCompany, setSelectedCompany] = useState("Select Company");
  const [selectedRole, setSelectedRole] = useState("Select Role");
  const [profileOpen, setProfileOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);


  const router = useRouter(); // <-- Add this line

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
  
      setTimeout(() => {
        window.location.href = "/sign-in"; // Hard redirect to ensure logout
      }, 100);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-slate-600 mt-1 text-white p-3 flex items-center shadow-md text-sm rounded-lg">
      {/* Push buttons to the right */}
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
            <div className="absolute mt-1 w-40 bg-white text-black shadow-md rounded-md">
              {["Company A", "Company B", "Company C"].map((company) => (
                <div
                  key={company}
                  className="px-3 py-1 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setSelectedCompany(company);
                    setCompanyOpen(false);
                  }}
                >
                  {company}
                </div>
              ))}
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
            <div className="absolute mt-1 w-40 bg-white text-black shadow-md rounded-md">
              {["FPR", "Approver", "HoD"].map((role) => (
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
              ))}
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
            <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-md rounded-md">
              <ul>
                <li className="px-3 py-1 hover:bg-gray-200 cursor-pointer flex items-center gap-2">
                  <User size={14} /> Profile
                </li>
                <li className="px-3 py-1 hover:bg-gray-200 cursor-pointer flex items-center gap-2">
                  <Bell size={14} /> Notifications
                </li>
                <li className="px-3 py-1 hover:bg-red-200 cursor-pointer flex items-center gap-2 text-red-600"
                onClick={handleLogout}>
                 <LogOut size={14} />Logout
                </li>
                
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
