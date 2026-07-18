import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../../context/AuthContext";

export default function DashHeading() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center justify-between">
      <div>
        <h1 className="text-4xl font-black">Financial Overview</h1>
        <p className="text-gray-800">
          Good morning, {user.firstName + " " + user.lastName}. Here is what's
          happening today
        </p>
      </div>
    </div>
  );
}
