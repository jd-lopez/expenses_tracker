import React from "react";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
export default function LoginForm({
  formData,
  handleSubmit,
  handleChange,
  isLoading,
  success,
  error,
}) {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <EmailInput formData={formData} handleChange={handleChange} />
      <PasswordInput formData={formData} handleChange={handleChange} />
      {error ? (
        <div className="text-red-600">{error}</div>
      ) : success ? (
        <div className="text-green-700">{success}</div>
      ) : null}
      <button
        className="mt-4 rounded-md px-2 font-bold hover:bg-blue-800 py-2 bg-blue-600 text-white"
        disabled={isLoading}
      >
        {isLoading
          ? "Iniciando Sesion..."
          : success
            ? "Redirigiendo"
            : "Iniciar Sesion"}
      </button>
    </form>
  );
}
