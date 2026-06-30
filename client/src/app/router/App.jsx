import "../../index.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "../../features/auth/pages/Register";
import ProtectedRoute from "./ProtectedRoutes";
import Dashboard from "../../features/transactions/pages/Dashboard";
import Layout from "../layouts/Layout";
import PublicLayout from "../layouts/PublicLayout";
import Transactions from "../../features/transactions/pages/Transactions";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import Login from "../../features/auth/pages/Login";
import Accounts from "../../features/accounts/Accounts";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route
            path="/register"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Register />
              )
            }
          />
          <Route path="login" element={<Login />} />
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/accounts" element={<Accounts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
