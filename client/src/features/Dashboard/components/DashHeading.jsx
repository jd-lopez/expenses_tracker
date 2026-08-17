import { useAuth } from "../../../context/AuthContext";

export default function DashHeading() {
  const { user } = useAuth();

  return (
    <header className="flex flex-col gap-2">
      <h1 className="text-3xl font-black tracking-tight md:text-4xl">
        Financial Overview
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        Welcome back, {user?.firstName} {user?.lastName}. Here&apos;s your
        financial overview.
      </p>
    </header>
  );
}
