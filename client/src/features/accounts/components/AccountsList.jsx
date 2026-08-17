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
import { AnimatePresence } from "motion/react";
import AddAccountModal from "./AddAccountModal";
import { useAccounts } from "../../../context/AccountContext";
import { useTransactions } from "../../../context/TransactionsContext";
import {
  calculateAccountBalance,
  calculateAvailableCredit,
  isCreditAccount,
} from "../../../shared/finance";

export default function AccountsList({ accounts = [], transactions }) {
  const { createAccount, deleteAccount } = useAccounts();
  const { removeTransByAccount } = useTransactions();
  const { openModal, isModalActive, closeModal } = useModal();
  const accountsWithTotal = accounts.map((account) => {
    const total = calculateAccountBalance(account, transactions);
    const availableCredit = calculateAvailableCredit(account, transactions);
    return { ...account, total, availableCredit };
  });

  const navigate = useNavigate();

  const accountIcons = {
    CREDIT: faBuildingColumns,
    CHECKING: faDollarSign,
    SAVINGS: faPiggyBank,
  };

  const accountType = {
    CREDIT: "Balance owed",
    CHECKING: "Balance actual",
    SAVINGS: "Balance de ahorros",
    CASH: "Balance en Efectivo",
  };

  function handleDeletion(id) {
    deleteAccount(id);
    removeTransByAccount(id);

    console.log("errror");
  }

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
          onClick={() => openModal("AddAccountModal")}
        >
          <div className="grid place-items-center bg-white border border-slate-500 rounded-full size-8">
            <FontAwesomeIcon icon={faPlus} className="" />
          </div>
          <p> Agrega una cuenta</p>
        </div>

        {accountsWithTotal.map((act) => {
          const icon = accountIcons[act.type] ?? faWallet;
          const balHeading = accountType[act.type] ?? "Balance actual";

          return (
            <div
              onClick={() => navigate(`/accounts/${act.id}`)}
              key={act.id}
              className="flex flex-col gap-6 rounded-xl border border-gray-200 bg-white p-4 shadow hover:cursor-pointer dark:border-gray-500 dark:bg-inverse-surface"
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
                <FontAwesomeIcon
                  icon={faEllipsisVertical}
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeletion(act.id);
                  }}
                />
              </div>
              <div>
                <p>{balHeading}</p>
                <p className="text-2xl font-bold tracking-wider">
                  ${act.total.toFixed(2)}
                </p>
                {isCreditAccount(act) && act.availableCredit != null && (
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    ${act.availableCredit.toFixed(2)} available of $
                    {Number(act.creditLimit).toFixed(2)}
                  </p>
                )}
              </div>
            </div>
          );
        })}

        <AnimatePresence>
          {isModalActive("AddAccountModal") && (
            <div className="absolute inset-0 z-40 flex items-start justify-center overflow-y-auto p-4 md:items-center">
              <div
                className="absolute inset-0 bg-slate-700/35 backdrop-blur-sm"
                onClick={closeModal}
              ></div>
              <AddAccountModal createAccount={createAccount} />
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
