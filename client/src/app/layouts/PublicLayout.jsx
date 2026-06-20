import React from "react";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <main className="flex justify-between items-center h-full w-full bg-background">
      <Outlet />
    </main>
  );
}
