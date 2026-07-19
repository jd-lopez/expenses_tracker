import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuildingColumns,
  faDollarSign,
  faEllipsisVertical,
  faPiggyBank,
  faPlus,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { useModal } from "../../../context/ModalContext";
import { useTheme } from "../../../context/ThemeContext";

export default function AccountsList({ accounts = [], transactions }) {
  const { isDark } = useTheme();
  const { openModal } = useModal();
  const accountsWithTotal = accounts.map((account) => {
    const initialBalance = Number(account.initialBalance) || 0;

    const total = transactions
      .filter((t) => t.accountId === account.id)
      .reduce((sum, t) => {
        const amount = Number(t.amount) || 0;
        return t.type === "INCOME" ? sum + amount : sum - amount;
      }, initialBalance);

    return { ...account, total };
  });

  const navigate = useNavigate();

  const accountIcons = {
    CREDIT: faBuildingColumns,
    CHECKING: faDollarSign,
    SAVINGS: faPiggyBank,
  };

  const accountType = {
    CREDIT: "Credito Disponible",
    CHECKING: "Balance actual",
    SAVINGS: "Balance de ahorros",
    CASH: "Balance en Efectivo",
  };

  return (
    <div className={`flex flex-col gap-3 `}>
      <h2 className="text-xl font-bold">Fuente financiera</h2>
      <p className="text-sm ">
        Gestiona tus cuentas y efectivo. Abre cualquier cuenta para ver sus
        transacciones.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 ">
        <div
          className=" flex flex-col items-center justify-center gap-6 border border-gray-200 shadow rounded-xl p-4 bg-radial from-white to-blue-100/75"
          onClick={() => openModal("addAccount")}
        >
          <div className="grid place-items-center bg-white border border-slate-500 rounded-full size-8">
            <FontAwesomeIcon icon={faPlus} className="" />
          </div>
          <p> Agrega una cuenta</p>
        </div>

        {accountsWithTotal.map((act) => {
          console.log(typeof act.initialBalance);

          const icon = accountIcons[act.type] ?? faWallet;
          const balHeading = accountType[act.type] ?? "Balance actual";

          return (
            <div
              onClick={() => navigate(`/accounts/${act.id}`)}
              key={act.id}
              className={`flex flex-col gap-6 border  shadow rounded-xl p-4 ${isDark ? "bg-inverse-surface border-gray-500" : "bg-white border-gray-200"}`}
            >
              <div className="flex justify-between items-center">
                <div
                  className={`grid place-content-center rounded-full size-7 text-white ${act.type === "CREDIT" ? "bg-red-300 " : "bg-green-300 "}`}
                >
                  <FontAwesomeIcon icon={icon} />
                </div>
                <div className="text-sm flex flex-col items-center">
                  <h2 className="text-base font-bold">{act.name}</h2>
                  <p
                    className={`text-xs rounded-md px-1 py-0.5  ${act.type === "CREDIT" ? "bg-red-200 text-red-800" : ""}`}
                  >
                    {act.type}
                  </p>
                </div>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </div>
              <div>
                <p>{balHeading}</p>
                <p className="text-2xl font-bold tracking-wider">
                  ${act.total}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
