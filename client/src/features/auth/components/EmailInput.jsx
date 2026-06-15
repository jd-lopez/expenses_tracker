import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
export default function EmailInput({ formData, handleChange }) {
  return (
    <>
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
    </>
  );
}
