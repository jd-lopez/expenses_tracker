import { Outlet } from "react-router-dom";
import Sidebar from "../../shared/components/Sidebar";
import { useState } from "react";
import MobileTop from "../../shared/components/MobileTop";
import BottomNav from "../../shared/components/BottomNav";
import { useModal } from "../../context/ModalContext";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const { activeModal } = useModal();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex h-screen w-full flex-col bg-background text-black dark:bg-[#13182b] dark:text-white">
      <MobileTop />
      <div className="flex flex-col md:flex-row md:justify-between flex-1 overflow-hidden">
        <Sidebar
          isOpen={isOpen}
          toggleSidebar={toggleSidebar}
        />
        <main
          className={`flex-1  px-3 py-4  relative ${activeModal ? "overflow-y-hidden" : "overflow-y-auto"}`}
        >
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
