import { Navigate, Route, Routes } from 'react-router-dom'
import AuthPage from './features/auth/pages/AuthPage'
import Dashboard from './features/dashboard/pages/DashboardPage'

export default function App() {
  return (
    <>
      <Routes>
        <Route index path="/auth" element={<AuthPage />} />

        {/* <Route element={<ProtectedRoute />}> */}
          <Route path="/" element={<Dashboard />} />
        {/* </Route> */}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}