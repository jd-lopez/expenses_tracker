import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TotalCard({ card }) {
  return (
    <div
      className={`${card.color} p-4 min-w-46 h-26 rounded-lg shadow-md bg-white
     md:flex-1 md:text-sm
      
            snap-start
            md:min-w-0`}
    >
      <div className="flex justify-between gap-4 items-center">
        <h1>{card.title}</h1>
        <div className="grid place-content-center rounded-full size-6  bg-green-300  text-white">
          <FontAwesomeIcon icon={card.icon} />
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold">${card.total.toFixed(2)}</p>
        <p className="text-xs font-normal">{card.paragraph}</p>
      </div>
    </div>
  );
}
