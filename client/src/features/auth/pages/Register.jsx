import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "../../../context/AuthContext";
import SignupForm from "../components/SignupForm";
import SSO from "../components/SSO";

export default function Register() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    first: "",
    last: "",
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
      const res = await signup(formData);

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
    <div className=" bg-[#f8f9ff]  flex justify-between rounded-2xl shadow-2xl w-full h-full">
      <div className="hidden md:flex bg-primary text-white flex-col justify-center gap-6 px-20 flex-1 h-screen">
        <div className="flex items-center gap-4">
          <div className="rounded-md bg-white p-2 ">
            <FontAwesomeIcon
              icon={faBuildingColumns}
              className="text-black text-5xl"
            />
          </div>
          <h1 className="text-4xl font-bold">FinTrack</h1>
        </div>

        <p className="font-bold text-6xl">
          Gestiona tus finanzas con precision.
        </p>
        <p>
          Unete a mas de 50,000 profesionales gestionando sus ingresos,
          subscripciones and inversiones en un unico y seguro espacio.
        </p>
      </div>
      <div className="flex flex-col flex-1 justify-center p-4 md:px-20 gap-10 bg-background">
        <div className=" flex self-center md:hidden items-baseline gap-4">
          <div className="rounded-md bg-white p-2 ">
            <FontAwesomeIcon
              icon={faBuildingColumns}
              className="text-black text-5xl"
            />
          </div>
          <h1 className="text-4xl font-bold">FinTrack</h1>
        </div>

        <div className="self-center">
          <h1 className="text-4xl font-bold">Crea tu cuenta</h1>
          <p>Empieza a gestionar tus finanzas gratis</p>
        </div>

        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}
        <SignupForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          success={success}
        />

        <div className="flex justify-between items-center">
          <div className="w-20 md:w-30 h-0.5 bg-gray-300"></div>
          <span>O continua con</span>
          <div className="w-20 md:w-30 h-0.5 bg-gray-300"></div>
        </div>

        <SSO />

        <p className="mx-auto">
          Ya tienes una cuenta?
          <NavLink to="/login" className="text-blue-700 font-bold ml-2">
            Inicia session
          </NavLink>
        </p>
      </div>
    </div>
  );
}
