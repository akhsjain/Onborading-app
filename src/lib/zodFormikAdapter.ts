import { z } from 'zod'

export function toFormikErrors<T extends z.ZodTypeAny>(
  schema: T,
  values: unknown
): Record<string, string> {
  const result = schema.safeParse(values)
  if (result.success) {
    return {}
  }

  const errors: Record<string, string> = {}
  result.error.errors.forEach((err) => {
    const path = err.path.join('.')
    errors[path] = err.message
  })

  return errors
}
