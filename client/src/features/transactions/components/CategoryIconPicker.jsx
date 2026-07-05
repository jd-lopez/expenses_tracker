import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as allIcons from "@fortawesome/free-solid-svg-icons";

const ICONS = [
  { label: "Food", key: "faUtensils" },
  { label: "Transport", key: "faCar" },
  { label: "Shopping", key: "faCartShopping" },
  { label: "Housing", key: "faHouse" },
  { label: "Health", key: "faHeart" },
  { label: "Clothing", key: "faShirt" },
  { label: "Entertainment", key: "faGamepad" },
  { label: "Education", key: "faBook" },
  { label: "Pets", key: "faPaw" },
  { label: "Travel", key: "faPlane" },
  { label: "Gifts", key: "faGift" },
  { label: "Repairs", key: "faWrench" },
  { label: "Fitness", key: "faDumbbell" },
  { label: "Music", key: "faMusic" },
  { label: "Coffee", key: "faCoffee" },
  { label: "Movies", key: "faFilm" },
  { label: "Tuition", key: "faGraduationCap" },
  { label: "Groceries", key: "faSeedling" },
  { label: "Savings", key: "faPiggyBank" },
  { label: "Business", key: "faBriefcase" },
  { label: "Salary", key: "faMoneyBillWave" },
  { label: "Investment", key: "faChartLine" },
  { label: "Banking", key: "faBuildingColumns" },
  { label: "Other", key: "faHandHoldingDollar" },
];

export default function CategoryIconPicker({ selected, onSelect }) {
  return (
    <div className="grid grid-cols-6 gap-2 p-2 max-h-48 overflow-y-auto border border-gray-200 rounded-md">
      {ICONS.map(({ label, key }) => (
        <button
          type="button"
          key={key}
          onClick={() => onSelect(key)}
          data-selected={key === selected || undefined}
          className="flex items-center justify-center size-10 rounded-md border border-gray-300 hover:border-blue-500 hover:bg-blue-50 cursor-pointer data-[selected]:border-blue-600 data-[selected]:bg-blue-100 data-[selected]:text-blue-700"
          title={label}
        >
          <FontAwesomeIcon icon={allIcons[key]} />
        </button>
      ))}
    </div>
  );
}
