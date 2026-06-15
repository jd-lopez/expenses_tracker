import React from "react";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <main className="flex flex-col items-center h-full bg-background">
      <Outlet />
    </main>
  );
}
