import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faArrowTrendDown,
  faPiggyBank,
} from "@fortawesome/free-solid-svg-icons";
import TotalCard from "./TotalCard";

export default function SummaryCards({ totalIncome, totalExpenses, totalNet }) {
  return (
    <div className="flex gap-6 py-4 justify-between overflow-x-auto snap-x snap-mandatory no-scrollbar">
      <TotalCard
        card={{
          title: "Total Income",
          color: "text-green-700",
          icon: faArrowTrendUp,
          paragraph: "% from last month",
          total: totalIncome,
        }}
      />
      <TotalCard
        card={{
          title: "Total Expenses",
          color: "text-red-800",
          icon: faArrowTrendDown,
          paragraph: "% from last month",
          total: totalExpenses,
        }}
      />
      <TotalCard
        card={{
          title: "Net Total",
          color: "text-blue-600",
          icon: faPiggyBank,
          paragraph: "% from last month",
          total: totalNet,
        }}
      />
    </div>
  );
}
