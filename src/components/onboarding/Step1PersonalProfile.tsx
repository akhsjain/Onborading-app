import { useState, useRef, useCallback } from 'react'
import { useFormik } from 'formik'
import { z } from 'zod'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { updateStep1, setCurrentStep } from '../../store/slices/onboardingSlice'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { toFormikErrors } from '../../lib/zodFormikAdapter'
import { VALIDATION_LIMITS, ONBOARDING_STEPS } from '../../constants'

const validationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  age: z
    .string()
    .min(1, 'Age is required')
    .regex(/^\d+$/, 'Age must be a number')
    .refine(
      (val: string) => {
        const ageNum = parseInt(val, 10)
        return ageNum >= VALIDATION_LIMITS.MIN_AGE && ageNum <= VALIDATION_LIMITS.MAX_AGE
      },
      {
        message: `Age must be between ${VALIDATION_LIMITS.MIN_AGE} and ${VALIDATION_LIMITS.MAX_AGE}`,
      }
    ),
  email: z
    .string()
    .min(1, 'Email is required')
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Please enter a valid email address'
    ),
})

const Step1PersonalProfile = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { step1 } = useAppSelector((state) => state.onboarding)
  const [profilePicture, setProfilePicture] = useState<string | null>(step1?.profilePicture || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const formik = useFormik({
    initialValues: {
      name: step1?.name ?? '',
      age: step1?.age ?? '',
      email: step1?.email ?? '',
    },
    validate: (values) => toFormikErrors(validationSchema, values),
    onSubmit: (values) => {
      dispatch(
        updateStep1({
          ...values,
          profilePicture,
        })
      )
      dispatch(setCurrentStep(ONBOARDING_STEPS.FAVORITE_SONGS))
      navigate(`/onboarding/step${ONBOARDING_STEPS.FAVORITE_SONGS}`)
    },
  })

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePicture(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const handleRemovePicture = useCallback(() => {
    setProfilePicture(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Profile</CardTitle>
        <CardDescription>
          Please provide your personal information to get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-sm text-red-500">{formik.errors.name}</div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">
              Age <span className="text-red-500">*</span>
            </Label>
            <Input
              id="age"
              name="age"
              type="text"
              placeholder="Enter your age"
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.age && formik.errors.age && (
              <div className="text-sm text-red-500">{formik.errors.age}</div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-sm text-red-500">{formik.errors.email}</div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="profilePicture">Profile Picture</Label>
            <input
              ref={fileInputRef}
              id="profilePicture"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                Choose Image
              </Button>
              {profilePicture && (
                <div className="flex items-center gap-2">
                  <img
                    src={profilePicture}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleRemovePicture}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" size="lg">
              Next
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default Step1PersonalProfile
