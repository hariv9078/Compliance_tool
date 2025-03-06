"use client"
import UserCard from "@/app/component/UserCards";
import { StatusChart } from "@/app/component/PieChart";
import { PendingChart } from "@/app/component/PendingChart";
import { PendingTask } from "@/app/component/PendingTask";
import { DeptChart } from "@/app/component/DeptChart";
import FilterSidebar from "@/app/component/filter";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

const User = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/api/check-auth"); // Verify token
      if (response.status !== 200) {
        router.push("/sign-in");
      } else {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>; // Prevents showing content for a split second
  }
  return (
    <div className="flex flex-col md:flex-row p-4 gap-6">
      {/* LEFT SECTION */}
      <div className="w-full lg:w-[80%] flex flex-col gap-6">
        
        {/* User Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <UserCard type="Pending Compliance" />
          <UserCard type="Notifications" />
          <UserCard type="Updates" />
          <UserCard type="Over Due Compliance" />
        </div>

        {/* Middle Charts */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Status Chart */}
          <div className="w-full lg:w-[35%] min-h-[320px]">
            <StatusChart />
          </div>
          {/* Pending Compliance Chart */}
          <div className="w-full lg:w-[65%] min-h-[320px]">
            <PendingChart />
          </div>
        </div>

        {/* Bottom Charts */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Pending Tasks */}
          <div className="w-full lg:w-[35%] min-h-[320px]">
            <PendingTask />
          </div>
          {/* Department Chart */}
          <div className="w-full lg:w-[65%] min-h-[320px]">
            <DeptChart />
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-full lg:w-[20%]">
        <FilterSidebar />
      </div>
    </div>
  );
};

export default User;
