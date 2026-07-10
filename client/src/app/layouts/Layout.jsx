import { Outlet } from "react-router-dom";
import Sidebar from "../../shared/components/Sidebar";
import { useState } from "react";
import MobileTop from "../../shared/components/MobileTop";
import BottomNav from "../../shared/components/BottomNav";
import { useTheme } from "../../context/ThemeContext";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark } = useTheme();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`flex flex-col h-screen w-full relative ${isDark ? "bg-[#101a3e] text-white" : "bg-background text-black"}`}
    >
      <MobileTop />
      <div className="flex flex-col md:flex-row md:justify-between flex-1 overflow-hidden">
        <Sidebar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          toggleSidebar={toggleSidebar}
        />
        <main className="flex-1 overflow-y-auto px-3 py-4 relative">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
