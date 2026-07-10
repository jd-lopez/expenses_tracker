import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { TransProvider } from "../../context/TransactionsContext";
import { AccountProvider } from "../../context/AccountContext";
import ProtectedRoute from "./ProtectedRoutes";
import Layout from "../layouts/Layout";
import PublicLayout from "../layouts/PublicLayout";
import Login from "../../features/auth/pages/Login";
import Register from "../../features/auth/pages/Register";
import Dashboard from "../../features/transactions/pages/Dashboard";
import Transactions from "../../features/transactions/pages/Transactions";
import Accounts from "../../features/accounts/Accounts";
import AccountSummary from "../../features/accounts/AccountSummary";
import { CategoryProvider } from "../../context/CategoryContext";

function GuestRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route
          path="/"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route
        element={
          <AccountProvider>
            <TransProvider>
              <CategoryProvider>
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              </CategoryProvider>
            </TransProvider>
          </AccountProvider>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/accounts/:id" element={<AccountSummary />} />
      </Route>
    </Routes>
  );
}
