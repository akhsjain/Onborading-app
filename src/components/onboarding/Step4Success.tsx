import { useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../store/hooks'
import { completeOnboarding } from '../../store/slices/onboardingSlice'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { CheckCircle2 } from 'lucide-react'
import { ROUTES } from '../../constants'

const REDIRECT_DELAY_MS = 2000

const Step4Success = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    // Mark onboarding as completed
    dispatch(completeOnboarding())

    // Redirect to home after delay
    const timer = setTimeout(() => {
      navigate(ROUTES.HOME)
    }, REDIRECT_DELAY_MS)

    return () => clearTimeout(timer)
  }, [dispatch, navigate])

  const handleGoToHome = useCallback(() => {
    navigate(ROUTES.HOME)
  }, [navigate])

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="h-20 w-20 text-green-500" />
        </div>
        <CardTitle className="text-3xl font-bold">Congratulations!</CardTitle>
        <CardDescription className="text-lg">
          You have successfully completed the onboarding process.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-muted-foreground mb-6">
          Thank you for providing all the necessary information. You will be redirected to the home page shortly.
        </p>
        <Button onClick={handleGoToHome} size="lg">
          Go to Home
        </Button>
      </CardContent>
    </Card>
  )
}

export default Step4Success
