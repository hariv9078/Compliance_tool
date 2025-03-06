import Link from "next/link";
import Image from "next/image";
import Menu from "../component/Menu";
import FilterMenu from "../component/filter";
import Navbar from "../component/navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="h-screen flex gap-1 rounded-md">
        {/* Left Sidebar */}
        <div className="w-[15%] bg-white p-1 md:w-[8%] lg:w-[10%] xl:w-[15%] rounded-md">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-slate-600 p-2 rounded-md"
          >
            <Image src="/logo.png" alt="logo" width={32} height={32} />
            <span className="hidden lg:block text-sm font-bold text-white">
              Compliance Dashboard
            </span>
          </Link>
          <Menu />
        </div>

        {/* Right Side */}
        <div className="w-[85%] gap-1 bg-[#F7F8FA] overflow-hidden">
          {/* Sticky Navbar */}
          <div className="sticky top-0 z-50 bg-white shadow-md">
            <Navbar />
          </div>

          {/* Main Content with Scroll */}
          <div className="h-[calc(100vh-60px)] overflow-y-auto p-4">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
