import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuildingColumns,
  faEnvelope,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";

export default function SignupForm({
  formData,
  handleSubmit,
  handleChange,
  isLoading,
  success,
}) {
  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 font-serif">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col relative md:flex-1">
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

          <div className="flex flex-col gap-1 relative flex-1">
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
        </div>

        <EmailInput formData={formData} handleChange={handleChange} />

        <PasswordInput formData={formData} handleChange={handleChange} />

        <button
          className="mt-4 rounded-md px-2 font-bold hover:bg-blue-800 py-2 bg-blue-600 text-white"
          disabled={isLoading}
        >
          {isLoading
            ? "Creando cuenta..."
            : success
              ? "Redirigiendo"
              : "Crear cuenta"}
        </button>
      </form>
    </>
  );
}
