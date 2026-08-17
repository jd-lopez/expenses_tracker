import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function PasswordInput({
  formData,
  handleChange,
  autoComplete = "current-password",
}) {
  const [showPW, setShowPW] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-1 relative">
        <FontAwesomeIcon icon={faLock} className="icon" />

        <input
          name="password"
          value={formData.password}
          onChange={handleChange}
          type={showPW ? "text" : "password"}
          id="password"
          required
          autoComplete={autoComplete}
          className="input peer"
          placeholder="Ingresa un contrasena segura"
        />

        <label htmlFor="password" className="labelPlaceholder">
          Ingresa una contrasena segura
        </label>

        <button
          className="absolute right-5 top-1/2 -translate-y-1/2"
          onClick={() => setShowPW(!showPW)}
          type="button"
          aria-label={showPW ? "Hide password" : "Show password"}
        >
          <FontAwesomeIcon icon={showPW ? faEyeSlash : faEye} />
        </button>
      </div>
    </>
  );
}
