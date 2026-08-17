import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TotalCard({ card }) {
  return (
    <div
      id="card"
      style={{
        "--clr-1": card.gradientColors[0],
        "--clr-2": card.gradientColors[1],
      }}
      className={`${card.color} relative min-w-46 w-46 h-26 aspect-square rounded-lg shadow-md 
     md:flex-1 md:text-sm z-2
            snap-start`}
    >
      <div className="relative z-10 flex h-full snap-start flex-col rounded-lg bg-white p-4 dark:bg-inverse-surface dark:text-white">
        <div className="flex justify-between gap-4 items-center">
          <h1>{card.title}</h1>
          <div className="grid place-content-center rounded-full size-6 bg-green-300 text-white">
            <FontAwesomeIcon icon={card.icon} />
          </div>
        </div>
        <div>
          <p className="text-2xl font-bold">${card.total.toFixed(2)}</p>
          <p className="text-xs font-normal">{card.paragraph}</p>
        </div>
      </div>
    </div>
  );
}
