import { useCallback, useState, useRef } from 'react'
import { useFormik } from 'formik'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { updateStep2, setCurrentStep } from '../../store/slices/onboardingSlice'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { Plus, X } from 'lucide-react'
import { VALIDATION_LIMITS, ONBOARDING_STEPS } from '../../constants'

interface FormValues {
  songs: string[]
}

const Step2FavoriteSongs = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { step2 } = useAppSelector((state) => state.onboarding)
  const [touchedFields, setTouchedFields] = useState<Set<number>>(new Set())
  const isSubmittingRef = useRef(false)

  const formik = useFormik<FormValues>({
    initialValues: {
      songs: step2.length > 0 ? step2 : [''],
    },
    validate: (values) => {
      const errors: { songs?: string | string[] } = {}
      const songErrors: string[] = []
      
      // Check if form is being submitted (all fields should be considered touched on submit)
      const isSubmitting = isSubmittingRef.current
      
      // Check each song individually
      values.songs.forEach((song, index) => {
        const isTouched = touchedFields.has(index) || isSubmitting
        const isLastField = index === values.songs.length - 1
        const hasOtherFilledSongs = values.songs.some((s, i) => i !== index && s.trim() !== '')
        
        if (!song || song.trim() === '') {
          // Only show error if:
          // 1. It's the only song (first song must be filled)
          // 2. OR the field has been touched/blurred and there are other filled songs
          // 3. OR it's not the last field (middle empty fields should show error)
          // 4. OR form is being submitted (validate all fields on submit)
          if (values.songs.length === 1) {
            // First song must be filled
            songErrors[index] = 'Song name is required'
          } else if (isTouched && hasOtherFilledSongs) {
            // Field was touched and left empty while others are filled
            songErrors[index] = 'Song name is required'
          } else if (!isLastField && hasOtherFilledSongs) {
            // Middle empty field when others are filled
            songErrors[index] = 'Song name is required'
          } else if (isSubmitting) {
            // On submit, validate all empty fields (except if it's the only last empty field with no other songs)
            if (hasOtherFilledSongs || values.songs.length === 1) {
              songErrors[index] = 'Song name is required'
            } else {
              songErrors[index] = ''
            }
          } else {
            // No error for untouched last empty field (newly added)
            songErrors[index] = ''
          }
        } else if (song.length > VALIDATION_LIMITS.MAX_SONG_LENGTH) {
          songErrors[index] = `Song name must be ${VALIDATION_LIMITS.MAX_SONG_LENGTH} characters or less`
        } else {
          // No error for this field
          songErrors[index] = ''
        }
      })
      
      // Filter out empty strings and set errors only if there are actual errors
      const hasErrors = songErrors.some(error => error !== '')
      if (hasErrors) {
        errors.songs = songErrors
      }
      
      // Check if at least one valid song exists
      const validSongs = values.songs.filter((song) => song.trim() !== '')
      if (validSongs.length === 0) {
        // Override with general error if no valid songs
        errors.songs = 'Please add at least one favorite song'
      }
      
      return errors
    },
    onSubmit: (values) => {
      // Set submitting flag to true for validation
      isSubmittingRef.current = true
      
      // Mark all fields as touched on submit to show all errors
      const allIndices = values.songs.map((_, i) => i)
      setTouchedFields(new Set(allIndices))
      formik.setFieldTouched('songs', true)
      
      // Validate all fields with submit flag set
      formik.validateForm().then((errors) => {
        const validSongs = values.songs.filter((song) => song.trim() !== '')
        
        // Check if there are validation errors
        const hasErrors = errors.songs && (
          (Array.isArray(errors.songs) && errors.songs.some(err => err !== '' && err !== undefined)) ||
          (typeof errors.songs === 'string' && errors.songs !== '')
        )
        
        // Reset submitting flag
        isSubmittingRef.current = false
        
        // Only proceed if there are valid songs and no errors
        if (validSongs.length > 0 && !hasErrors) {
          dispatch(updateStep2(validSongs))
          dispatch(setCurrentStep(ONBOARDING_STEPS.PAYMENT_INFO))
          navigate(`/onboarding/step${ONBOARDING_STEPS.PAYMENT_INFO}`)
        }
        // If there are errors, they will be displayed automatically by Formik
      })
    },
  })

  const addSong = useCallback(() => {
    const newSongs = [...formik.values.songs, '']
    formik.setFieldValue('songs', newSongs, false) // false = don't validate immediately
    // Clear any existing errors to prevent showing error on new field
    if (formik.errors.songs) {
      formik.setErrors({})
    }
  }, [formik])

  const removeSong = useCallback(
    (index: number) => {
      const newSongs = formik.values.songs.filter((_, i) => i !== index)
      formik.setFieldValue('songs', newSongs.length > 0 ? newSongs : [''])
    },
    [formik]
  )

  const handleBack = useCallback(() => {
    dispatch(setCurrentStep(ONBOARDING_STEPS.PERSONAL_PROFILE))
    navigate(`/onboarding/step${ONBOARDING_STEPS.PERSONAL_PROFILE}`)
  }, [dispatch, navigate])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Favorite Songs</CardTitle>
        <CardDescription>
          Add your favorite songs. You can add multiple songs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {formik.values.songs.map((song, index) => (
              <div key={index} className="flex gap-2 items-start">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`song-${index}`}>Song {index + 1}</Label>
                    <span
                      className={`text-xs ${
                        song.length > VALIDATION_LIMITS.MAX_SONG_LENGTH
                          ? 'text-red-500'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {song.length}/{VALIDATION_LIMITS.MAX_SONG_LENGTH}
                    </span>
                  </div>
                  <Input
                    id={`song-${index}`}
                    type="text"
                    placeholder="Enter song name"
                    maxLength={VALIDATION_LIMITS.MAX_SONG_LENGTH}
                    value={song}
                    onChange={(e) => {
                      const newSongs = [...formik.values.songs]
                      newSongs[index] = e.target.value
                      formik.setFieldValue('songs', newSongs)
                      // Clear error for this field when user starts typing
                      if (formik.errors.songs && Array.isArray(formik.errors.songs) && e.target.value.trim() !== '') {
                        const newErrors = [...formik.errors.songs]
                        newErrors[index] = ''
                        // Only update if there are still other errors, otherwise clear all
                        if (newErrors.some(err => err !== '')) {
                          formik.setErrors({ songs: newErrors })
                        } else {
                          formik.setErrors({})
                        }
                      }
                    }}
                    onBlur={() => {
                      // Mark this field as touched
                      setTouchedFields((prev) => new Set(prev).add(index))
                      formik.setFieldTouched('songs', true)
                      // Trigger validation on blur
                      formik.validateField('songs')
                    }}
                  />
                  {formik.touched.songs && 
                   formik.errors.songs && 
                   Array.isArray(formik.errors.songs) && 
                   formik.errors.songs[index] && 
                   formik.errors.songs[index] !== '' && (
                    <div className="text-sm text-red-500">{formik.errors.songs[index]}</div>
                  )}
                </div>
                {formik.values.songs.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSong(index)}
                    className="mt-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            {formik.touched.songs && 
             formik.errors.songs && 
             typeof formik.errors.songs === 'string' && (
              <div className="text-sm text-red-500">{formik.errors.songs}</div>
            )}
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={addSong}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Song
          </Button>

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

export default Step2FavoriteSongs
