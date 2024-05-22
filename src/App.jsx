import { AuthGoogleProvider } from "./contexts/authGoogle";
import AppRoutes from "./routes/routes";

export default function App() {
  return (
    <AuthGoogleProvider>
      <AppRoutes />
    </AuthGoogleProvider>
  );
}
