import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faFile,
  faChartLine,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";

export default function BottomNav() {
  return (
    <div className=" bottom-0 border-t border-gray-700 bg-inverse-on-surface text-base relative md:hidden">
      <ul className="flex justify-between py-4 px-6 text-lg">
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `bottomNavButtons ${isActive ? "border-b border-blue-600" : ""}`
            }
          >
            {({ isActive }) => (
              <>
                <FontAwesomeIcon
                  icon={faHome}
                  className={isActive ? "text-blue-700" : "text-black"}
                />
                <p
                  className={
                    isActive ? "text-blue-700 font-semibold" : "text-black"
                  }
                >
                  Home
                </p>
              </>
            )}
          </NavLink>
        </li>
        <li className=" mr-20">
          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              `bottomNavButtons ${isActive ? "border-b border-blue-600" : ""}`
            }
          >
            {({ isActive }) => (
              <>
                <FontAwesomeIcon
                  icon={faFile}
                  className={isActive ? "text-blue-700" : "text-black"}
                />
                <p
                  className={
                    isActive ? "text-blue-700 font-semibold" : "text-black"
                  }
                >
                  History
                </p>
              </>
            )}
          </NavLink>
        </li>

        <button className="absolute -top-4 left-1/2 -translate-x-1/2 shadow rounded-full  size-14 grid place-content-center active:scale-110 active:animate-spin active:-translate-y-4 transition-all">
          <FontAwesomeIcon
            icon={faCirclePlus}
            className="text-blue-600 text-6xl"
          />
        </button>

        <li>
          <NavLink className="bottomNavButtons">
            <FontAwesomeIcon icon={faChartLine} />
            <p>Analytic</p>
          </NavLink>
        </li>
        <li>
          <NavLink className="bottomNavButtons">
            <FontAwesomeIcon icon={faCirclePlus} />
            <p>More</p>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
