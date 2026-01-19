import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import { ROUTES } from '../constants'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
