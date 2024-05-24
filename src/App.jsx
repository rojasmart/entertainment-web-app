import { AuthProvider } from "./contexts/authGoogle";
import AppRoutes from "./routes/routes";

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
