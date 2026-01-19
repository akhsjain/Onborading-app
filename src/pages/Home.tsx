import { useAppSelector, useAppDispatch } from '../store/hooks'
import { logout } from '../store/slices/authSlice'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'

const Home = () => {
  const { username } = useAppSelector((state) => state.auth)
  const { step1 } = useAppSelector((state) => state.onboarding)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-3xl font-bold">
            Welcome{step1?.name ? `, ${step1.name}` : ''}!
          </CardTitle>
          <CardDescription className="text-lg">
            You have successfully completed the onboarding process.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">
              Logged in as: <strong>{username}</strong>
            </p>
            {step1 && (
              <div className="mt-6 p-4 bg-muted rounded-lg text-left">
                <h3 className="font-semibold mb-2">Your Profile:</h3>
                <ul className="space-y-1 text-sm">
                  <li><strong>Name:</strong> {step1.name}</li>
                  <li><strong>Age:</strong> {step1.age}</li>
                  <li><strong>Email:</strong> {step1.email}</li>
                  {step1.profilePicture && (
                    <li className="mt-2">
                      <strong>Profile Picture:</strong>
                      <img
                        src={step1.profilePicture}
                        alt="Profile"
                        className="mt-2 w-24 h-24 rounded-full object-cover border-2 border-primary"
                      />
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
          <div className="flex justify-center pt-4">
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Home
