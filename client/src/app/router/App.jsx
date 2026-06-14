import "../../index.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "../../features/auth/pages/Register";
import ProtectedRoute from "./ProtectedRoutes";
import Dashboard from "../../features/transactions/pages/Dashboard";
import Layout from "../layouts/Layout";
import PublicLayout from "../layouts/PublicLayout";
import Transactions from "../../features/transactions/pages/Transactions";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route path="/register" element={<Register />} />
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
