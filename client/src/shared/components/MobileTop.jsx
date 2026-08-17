import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../context/ThemeContext";

export default function MobileTop() {
  const { toggleTheme } = useTheme();
  return (
    <header className="flex justify-between px-6 py-4 shadow dark:bg-inverse-surface">
      <button className="text-4xl font-bold text-blue-700 ">FinTrack</button>

      <button onClick={toggleTheme}>Theme</button>
      <div className="flex gap-6">
        <button>
          <FontAwesomeIcon icon={faBell} className="text-blue-700" />
        </button>
        <button>Profile</button>
      </div>
    </header>
  );
}
