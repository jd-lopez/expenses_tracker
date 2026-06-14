import React from "react";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <main className="h-screen w-full">
      <Outlet />
    </main>
  );
}
