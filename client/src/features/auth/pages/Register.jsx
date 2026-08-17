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
        navigate("/dashboard", { replace: true });
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
    <section className="my-auto  flex w-full max-w-6xl overflow-hidden rounded-2xl bg-[#f8f9ff] shadow-2xl">
      <div className="hidden min-h-[42rem] flex-1 flex-col justify-center gap-6 bg-primary px-14 text-white lg:flex">
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
      <div className="flex w-full flex-2 flex-col justify-center gap-7 bg-white p-6 sm:p-10 lg:px-16">
        <div className=" flex self-center md:hidden items-baseline gap-4">
          <div className="rounded-md bg-white p-2">
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

        {error && (
          <p
            role="alert"
            className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}
        {success && (
          <p
            role="status"
            className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700"
          >
            {success}
          </p>
        )}
        <SignupForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          success={success}
        />

        <div className="flex items-center gap-3 text-sm text-slate-500">
          <div className="h-px flex-1 bg-gray-300" />
          <span>O continúa con</span>
          <div className="h-px flex-1 bg-gray-300" />
        </div>

        <SSO />

        <p className="mx-auto text-center">
          ¿Ya tienes una cuenta?
          <NavLink to="/login" className="text-blue-700 font-bold ml-2">
            Inicia sesión
          </NavLink>
        </p>
      </div>
    </section>
  );
}
