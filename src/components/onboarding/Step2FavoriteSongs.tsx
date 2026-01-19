import { useFormik } from 'formik'
import { z } from 'zod'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { updateStep2, setCurrentStep } from '../../store/slices/onboardingSlice'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { Plus, X } from 'lucide-react'
import { toFormikErrors } from '../../lib/zodFormikAdapter'

const validationSchema = z.object({
  songs: z
    .array(z.string().min(1, 'Song name is required'))
    .min(1, 'Please add at least one favorite song'),
})

interface FormValues {
  songs: string[]
}

const Step2FavoriteSongs = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { step2 } = useAppSelector((state) => state.onboarding)

  const formik = useFormik<FormValues>({
    initialValues: {
      songs: step2.length > 0 ? step2 : [''],
    },
    validate: (values) => {
      const zodErrors = toFormikErrors(validationSchema, values)
      const errors: { songs?: string } = {}
      const validSongs = values.songs.filter((song) => song.trim() !== '')
      if (validSongs.length === 0) {
        errors.songs = 'Please add at least one favorite song'
      }
      return { ...zodErrors, ...errors }
    },
    onSubmit: (values) => {
      const validSongs = values.songs.filter((song) => song.trim() !== '')
      dispatch(updateStep2(validSongs))
      dispatch(setCurrentStep(3))
      navigate('/onboarding/step3')
    },
  })

  const addSong = () => {
    formik.setFieldValue('songs', [...formik.values.songs, ''])
  }

  const removeSong = (index: number) => {
    const newSongs = formik.values.songs.filter((_, i) => i !== index)
    formik.setFieldValue('songs', newSongs.length > 0 ? newSongs : [''])
  }

  const handleBack = () => {
    dispatch(setCurrentStep(1))
    navigate('/onboarding/step1')
  }

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
                  <Label htmlFor={`song-${index}`}>Song {index + 1}</Label>
                  <Input
                    id={`song-${index}`}
                    type="text"
                    placeholder="Enter song name"
                    value={song}
                    onChange={(e) => {
                      const newSongs = [...formik.values.songs]
                      newSongs[index] = e.target.value
                      formik.setFieldValue('songs', newSongs)
                    }}
                    onBlur={formik.handleBlur}
                  />
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
            {formik.touched.songs && formik.errors.songs && (
              <div className="text-sm text-red-500">{formik.errors.songs as string}</div>
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
