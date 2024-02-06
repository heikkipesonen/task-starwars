import { z } from 'zod'

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

export const LocationDetails = Location.extend({
  entity: EntityDetails
})
export type LocationDetails = z.TypeOf<typeof LocationDetails>