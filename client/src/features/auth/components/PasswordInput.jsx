import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
export default function PasswordInput({ formData, handleChange }) {
  return (
    <>
      <div className="flex flex-col gap-1 relative">
        <FontAwesomeIcon icon={faLock} className="icon" />

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
    </>
  );
}
