import React from "react";
import DashHeading from "../components/DashHeading";
import { useAuth } from "../../../context/AuthContext";
export default function Dashboard() {
  const { token } = useAuth();
  console.log(token);
  return (
    <div className="">
      <DashHeading />
    </div>
  );
}
