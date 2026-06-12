import { useState } from "react";
import { registerUser } from "./services/authService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuildingColumns,
  faEnvelope,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
export default function Register() {
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
      const res = await registerUser(formData);
      const message = res.message;
      setError("");
      setSuccess(message);
    } catch (error) {
      const message = error?.response?.data.message;
      setSuccess("");
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-[#f8f9ff]  flex justify-between rounded-2xl shadow-2xl w-full h-full ">
      <div className="hidden md:flex bg-primary text-white flex-col justify-center gap-6 px-20 flex-1">
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
      <div className="flex flex-col flex-1 justify-center p-4 md:px-20 gap-10">
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
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 font-serif"
        >
          <div className="flex flex-col relative">
            <FontAwesomeIcon icon={faUser} className="icon" />

            <input
              name="first"
              value={formData.first}
              type="text"
              id="firstName"
              required
              onChange={handleChange}
              className="input peer"
              placeholder="Ingresa tu nombre"
            />
            <label className="labelPlaceholder" htmlFor="firstName">
              Ingresa tu nombre
            </label>
          </div>

          {/*Last name input */}

          <div className="flex flex-col gap-1 relative">
            <FontAwesomeIcon icon={faUser} className="icon" />

            <input
              name="last"
              value={formData.last}
              onChange={handleChange}
              type="text"
              id="lastName"
              required
              className="input peer"
              placeholder="Ingresa tu apellido"
            />

            <label htmlFor="lastName" className="labelPlaceholder">
              Ingresa tu apellido
            </label>
          </div>
          <div className="flex flex-col gap-1 relative">
            <FontAwesomeIcon icon={faEnvelope} className="icon" />

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="text"
              id="email"
              required
              className="input peer"
              placeholder="Ingresa tu correo"
            />

            <label htmlFor="email" className="labelPlaceholder">
              Ingresa tu correo
            </label>
          </div>

          <div className="flex flex-col gap-1 relative">
            <FontAwesomeIcon icon={faEnvelope} className="icon" />

            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="text"
              id="password"
              required
              className="input peer"
              placeholder="Ingresa un contrasena segura"
            />

            <label htmlFor="password" className="labelPlaceholder">
              Ingresa un contrasena segura
            </label>
          </div>

          <button
            className="mt-4 rounded-md px-2 font-bold hover:bg-blue-800 py-1 bg-blue-600 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>
      </div>
    </div>
  );
}
