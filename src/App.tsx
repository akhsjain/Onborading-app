import { Routes, Route, Navigate } from 'react-router-dom'
import { useAppSelector } from './store/hooks'
import Login from './pages/Login'
import OnboardingFlow from './pages/OnboardingFlow'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import { ROUTES } from './constants'

function App() {
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const { isCompleted } = useAppSelector((state) => state.onboarding)

  return (
    <Routes>
      <Route
        path={ROUTES.LOGIN}
        element={isAuthenticated ? <Navigate to={ROUTES.ONBOARDING} replace /> : <Login />}
      />
      <Route
        path={`${ROUTES.ONBOARDING}/*`}
        element={
          <ProtectedRoute>
            {isCompleted ? <Navigate to={ROUTES.HOME} replace /> : <OnboardingFlow />}
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.HOME}
        element={
          <ProtectedRoute>
            {!isCompleted ? <Navigate to={ROUTES.ONBOARDING} replace /> : <Home />}
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? ROUTES.ONBOARDING : ROUTES.LOGIN} replace />}
      />
    </Routes>
  )
}

export default App
