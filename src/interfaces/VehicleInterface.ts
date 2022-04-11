import { z } from 'zod';

export const vehicleSchema = z.object({
  model: z.string()
    .min(3, { message: 'Model must be 3 or more characters long' }),
  year: z.number().gte(1900, { message: 'Year must be bigger or equal 1900' })
    .lte(2022, { message: 'Year must be less or equal 2022' }),
  color: z.string()
    .min(3, { message: 'Color must be 3 or more characters long' }),
  status: z.boolean().optional(),
  buyValue: z.number().int(),
});

export type Vehicle = z.infer<typeof vehicleSchema>;