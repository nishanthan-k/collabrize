import { Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "./features/auth/pages/AuthPage";
import ProtectedRoute from "./global/routes/ProtectedRoute";
import Dashboard from "./features/dashboard/pages/DashboardPage";

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/auth" element={<AuthPage />} />

      {/* Protected Routes - Everything else */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* Redirect unknown routes to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
