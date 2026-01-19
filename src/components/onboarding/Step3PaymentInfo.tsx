import { useCallback } from 'react'
import { useFormik } from 'formik'
import { z } from 'zod'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { updateStep3, setCurrentStep } from '../../store/slices/onboardingSlice'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { toFormikErrors } from '../../lib/zodFormikAdapter'
import { VALIDATION_LIMITS, ONBOARDING_STEPS } from '../../constants'

const validationSchema = z.object({
  cardNumber: z
    .string()
    .min(1, 'Card number is required')
    .refine(
      (value: string) => {
        const digitsOnly = value.replace(/\s/g, '')
        return new RegExp(`^\\d{${VALIDATION_LIMITS.CARD_NUMBER_LENGTH}}$`).test(digitsOnly)
      },
      {
        message: `Card number must be ${VALIDATION_LIMITS.CARD_NUMBER_LENGTH} digits`,
      }
    ),
  expiryDate: z
    .string()
    .min(1, 'Expiry date is required')
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry date must be in MM/YY format')
    .refine(
      (value: string) => {
        if (!value) return false
        
        const [month, year] = value.split('/')
        const expiryMonth = parseInt(month, 10)
        const expiryYear = parseInt(year, 10)
        
        // Convert YY to full year (assuming 20YY)
        const currentDate = new Date()
        const currentMonth = currentDate.getMonth() + 1 // getMonth() returns 0-11
        
        // Convert YY to full year (20YY)
        const fullExpiryYear = 2000 + expiryYear
        const fullCurrentYear = currentDate.getFullYear()
        
        // Check if year is in the past
        if (fullExpiryYear < fullCurrentYear) {
          return false
        }
        
        // If same year, check if month is in the past
        if (fullExpiryYear === fullCurrentYear && expiryMonth < currentMonth) {
          return false
        }
        
        return true
      },
      {
        message: 'Card has expired',
      }
    ),
  cvv: z
    .string()
    .min(1, 'CVV is required')
    .regex(
      new RegExp(`^\\d{${VALIDATION_LIMITS.CVV_MIN_LENGTH},${VALIDATION_LIMITS.CVV_MAX_LENGTH}}$`),
      `CVV must be ${VALIDATION_LIMITS.CVV_MIN_LENGTH} or ${VALIDATION_LIMITS.CVV_MAX_LENGTH} digits`
    ),
})

const Step3PaymentInfo = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { step3 } = useAppSelector((state) => state.onboarding)

  const formik = useFormik({
    initialValues: {
      cardNumber: step3?.cardNumber || '',
      expiryDate: step3?.expiryDate || '',
      cvv: step3?.cvv || '',
    },
    validate: (values) => toFormikErrors(validationSchema, values),
    onSubmit: (values) => {
      // Format card number with spaces
      const formattedCardNumber = values.cardNumber.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim()
      dispatch(
        updateStep3({
          cardNumber: formattedCardNumber,
          expiryDate: values.expiryDate,
          cvv: values.cvv,
        })
      )
      dispatch(setCurrentStep(ONBOARDING_STEPS.SUCCESS))
      navigate(`/onboarding/step${ONBOARDING_STEPS.SUCCESS}`)
    },
  })

  const formatCardNumber = useCallback((value: string): string => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(new RegExp(`\\d{4,${VALIDATION_LIMITS.CARD_NUMBER_LENGTH}}`, 'g'))
    const match = (matches && matches[0]) || ''
    const parts: string[] = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    return parts.length > 0 ? parts.join(' ') : v
  }, [])

  const formatExpiryDate = useCallback((value: string): string => {
    const v = value.replace(/\s+/g, '').replace(/\D/g, '')
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }
    return v
  }, [])

  const handleCardNumberChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatCardNumber(e.target.value)
      formik.setFieldValue('cardNumber', formatted)
    },
    [formatCardNumber, formik]
  )

  const handleExpiryDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatExpiryDate(e.target.value)
      formik.setFieldValue('expiryDate', formatted)
    },
    [formatExpiryDate, formik]
  )

  const handleCvvChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value.replace(/\D/g, '').substring(0, VALIDATION_LIMITS.CVV_MAX_LENGTH)
      formik.setFieldValue('cvv', v)
    },
    [formik]
  )

  const handleBack = useCallback(() => {
    dispatch(setCurrentStep(ONBOARDING_STEPS.FAVORITE_SONGS))
    navigate(`/onboarding/step${ONBOARDING_STEPS.FAVORITE_SONGS}`)
  }, [dispatch, navigate])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Information</CardTitle>
        <CardDescription>
          Please provide your payment details to complete the onboarding.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">
              Card Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="cardNumber"
              name="cardNumber"
              type="text"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              value={formik.values.cardNumber}
              onChange={handleCardNumberChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.cardNumber && formik.errors.cardNumber && (
              <div className="text-sm text-red-500">{formik.errors.cardNumber}</div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">
                Expiry Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="expiryDate"
                name="expiryDate"
                type="text"
                placeholder="MM/YY"
                maxLength={5}
                value={formik.values.expiryDate}
                onChange={handleExpiryDateChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.expiryDate && formik.errors.expiryDate && (
                <div className="text-sm text-red-500">{formik.errors.expiryDate}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cvv">
                CVV <span className="text-red-500">*</span>
              </Label>
              <Input
                id="cvv"
                name="cvv"
                type="text"
                placeholder="123"
                maxLength={4}
                value={formik.values.cvv}
                onChange={handleCvvChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.cvv && formik.errors.cvv && (
                <div className="text-sm text-red-500">{formik.errors.cvv}</div>
              )}
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button type="submit" size="lg">
              Next
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default Step3PaymentInfo
