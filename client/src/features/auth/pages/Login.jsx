import { useState } from "react";
import SSO from "../components/SSO";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../../../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    setError("");
    setSuccess("");
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await login(formData);

      const message = res.message;
      setError("");
      setSuccess(message);
      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 4000);
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || "Ocurrió un error";
      setSuccess("");
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="my-auto flex w-full max-w-lg flex-col gap-6 rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
      <div>
        <h1 className="text-3xl font-bold">Bienvenido de nuevo</h1>
        <p className="mt-2 text-slate-600">
          Ingresa tus credenciales para acceder a tu dashboard.
        </p>
      </div>

      <SSO />

      <div className="flex items-center gap-3 text-sm text-slate-500">
        <div className="h-px flex-1 bg-gray-300" />
        <span>O continúa con</span>
        <div className="h-px flex-1 bg-gray-300" />
      </div>
      <LoginForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        success={success}
        error={error}
      />

      <div className="flex flex-wrap justify-between gap-3 text-sm">
        <div className="flex gap-2 items-center">
          <input type="checkbox" name="remember" id="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>
        <button className="text-blue-700 font-bold">Forgot Password?</button>
      </div>

      <p className="mx-auto text-center">
        ¿No tienes cuenta?
        <NavLink to="/register" className="text-blue-700 font-bold ml-2">
          Crea una cuenta
        </NavLink>
      </p>
    </section>
  );
}
