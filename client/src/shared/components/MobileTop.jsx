import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

export default function MobileTop() {
  return (
    <header className="flex  justify-between px-6 py-4 shadow bg-white md:">
      <button className="text-4xl font-bold text-blue-700 ">FinTrack</button>

      <div className="flex gap-6">
        <button>
          <FontAwesomeIcon icon={faBell} className="text-blue-700" />
        </button>
        <button>Profile</button>
      </div>
    </header>
  );
}
