import { z } from 'zod'

export const LocationsResponse = z.object({
  message: z.string()
})

export const Location = z.object({
  id: z.number(),
  lat: z.number(),
  long: z.number(),
})

export type Location = z.TypeOf<typeof Location>