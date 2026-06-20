import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

export default function DashHeading() {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center justify-between">
      <div>
        <h1 className="text-4xl font-black">Financial Overview</h1>
        <p className="text-gray-800">
          Good morning, Alex. Here is what's happening today
        </p>
      </div>
      <div className="flex justify-between items-center gap-2   ">
        <button className="addButton bg-green-700">
          <FontAwesomeIcon icon={faArrowUp} />
          <span>Add Income</span>
        </button>
        <button className="addButton bg-blue-700">
          <FontAwesomeIcon icon={faArrowDown} />
          <span>Add Expense</span>
        </button>
      </div>
    </div>
  );
}
