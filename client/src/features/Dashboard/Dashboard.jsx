import React from "react";

import { useAuth } from "../../context/AuthContext";
import DashHeading from "./components/DashHeading";

export default function Dashboard() {
  const { token } = useAuth();

  return (
    <div className="">
      <DashHeading />
    </div>
  );
}
