import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <main className="flex justify-center items-center h-screen w-full lg:h-screen bg-background">
      <Outlet />
    </main>
  );
}
