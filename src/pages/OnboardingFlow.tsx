import { useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { setCurrentStep } from '../store/slices/onboardingSlice'
import Step1PersonalProfile from '../components/onboarding/Step1PersonalProfile'
import Step2FavoriteSongs from '../components/onboarding/Step2FavoriteSongs'
import Step3PaymentInfo from '../components/onboarding/Step3PaymentInfo'
import Step4Success from '../components/onboarding/Step4Success'

const OnboardingFlow = () => {
  const { currentStep } = useAppSelector((state) => state.onboarding)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    // Navigate to the current step on mount
    navigate(`/onboarding/step${currentStep}`, { replace: true })
  }, [currentStep, navigate])

  useEffect(() => {
    // Sync current step with URL
    const path = window.location.pathname
    const stepMatch = path.match(/step(\d+)/)
    if (stepMatch) {
      const step = parseInt(stepMatch[1], 10)
      if (step !== currentStep) {
        dispatch(setCurrentStep(step))
      }
    }
  }, [dispatch, currentStep])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Onboarding</h1>
            <div className="text-sm text-muted-foreground">
              Step {currentStep} of 4
            </div>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`flex-1 h-2 rounded-full ${
                  step <= currentStep
                    ? 'bg-primary'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        <Routes>
          <Route path="step1" element={<Step1PersonalProfile />} />
          <Route path="step2" element={<Step2FavoriteSongs />} />
          <Route path="step3" element={<Step3PaymentInfo />} />
          <Route path="step4" element={<Step4Success />} />
          <Route path="*" element={<Navigate to={`step${currentStep}`} replace />} />
        </Routes>
      </div>
    </div>
  )
}

export default OnboardingFlow
