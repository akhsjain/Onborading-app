import { Routes, Route, Navigate } from 'react-router-dom'
import { useAppSelector } from './store/hooks'
import Login from './pages/Login'
import OnboardingFlow from './pages/OnboardingFlow'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const { isCompleted } = useAppSelector((state) => state.onboarding)

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/onboarding" replace /> : <Login />}
      />
      <Route
        path="/onboarding/*"
        element={
          <ProtectedRoute>
            {isCompleted ? <Navigate to="/home" replace /> : <OnboardingFlow />}
          </ProtectedRoute>
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            {!isCompleted ? <Navigate to="/onboarding" replace /> : <Home />}
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to={isAuthenticated ? "/onboarding" : "/login"} replace />} />
    </Routes>
  )
}

export default App
