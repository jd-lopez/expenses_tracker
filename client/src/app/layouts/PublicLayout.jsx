import React from "react";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <main className="flex justify-center items-center h-full w-full lg:h-fit bg-background">
      <Outlet />
    </main>
  );
}
