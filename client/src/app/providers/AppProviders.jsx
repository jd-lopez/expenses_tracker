import { AuthProvider } from "../../context/AuthContext";
import { ModalProvider } from "../../context/ModalContext";

export default function AppProviders({ children }) {
  return (
    <AuthProvider>
      <ModalProvider>{children}</ModalProvider>
    </AuthProvider>
  );
}
