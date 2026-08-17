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
        <div role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : success ? (
        <div role="status" className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      ) : null}
      <button
        type="submit"
        className="mt-2 rounded-xl bg-blue-600 px-2 py-2.5 font-bold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
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
