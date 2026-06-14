import React from "react";

export default function MobileTop() {
  return (
    <header className="flex  justify-between px-6 py-4 shadow bg-white md:hidden">
      <button className="text-4xl font-bold text-blue-700 ">FinTrack</button>

      <div>
        <button>Notification</button>
        <button>Profile</button>
      </div>
    </header>
  );
}
