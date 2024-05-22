import { AuthGoogleProvider } from "./contexts/AuthGoogleContext";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <AuthGoogleProvider>
      <AppRoutes />
    </AuthGoogleProvider>
  );
}
