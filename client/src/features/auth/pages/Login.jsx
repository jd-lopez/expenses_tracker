import React from "react";
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
        navigate("/dashboard");
      }, 2000);
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
    <div className="py-6 px-6 flex flex-col gap-4 shadow-2xl rounded-2xl my-auto bg-white mx-auto md:scale-150 lg:scale-100">
      <h1 className="text-3xl font-bold">Bienvenido de nuevo</h1>
      <p>Ingresa tus credenciales para acceder a tus Dashboard</p>

      <SSO />

      <div className="flex justify-between items-center">
        <div className="w-20 md:w-30 h-0.5 bg-gray-300"></div>
        <span>O continua con</span>
        <div className="w-20 md:w-30 h-0.5 bg-gray-300"></div>
      </div>
      <LoginForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        success={success}
      />

      <div className=" flex justify-between">
        <div className="flex gap-2 items-center">
          <input type="checkbox" name="remember" id="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>
        <button className="text-blue-700 font-bold">Forgot Password?</button>
      </div>

      <p className="mx-auto">
        No tienes cuenta?
        <NavLink to="/register" className="text-blue-700 font-bold ml-2">
          Crea una cuenta
        </NavLink>
      </p>
    </div>
  );
}
