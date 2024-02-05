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


export const EntityDetails = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
})
export type EntityDetails = z.TypeOf<typeof EntityDetails>