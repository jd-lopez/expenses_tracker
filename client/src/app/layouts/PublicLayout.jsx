import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <main className="flex min-h-dvh w-full items-start justify-center overflow-y-auto bg-background px-4 py-6 sm:py-10">
      <Outlet />
    </main>
  );
}
