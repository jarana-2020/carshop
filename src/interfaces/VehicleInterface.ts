import { z } from 'zod';

export const vehicleSchema = z.object({
  model: z.string({
    required_error: 'Model is required',
    invalid_type_error: 'Model must be a string',
  })
    .min(3, { message: 'Model must be 3 or more characters long' }),
  year: z.number({
    required_error: 'Year is required',
    invalid_type_error: 'Year must be a number',
  }).gte(1900, { message: 'Year must be bigger or equal 1900' })
    .lte(2022, { message: 'Year must be less or equal 2022' }),
  color: z.string({
    required_error: 'Color is required',
    invalid_type_error: 'Color must be a string',
  })
    .min(3, { message: 'Color must be 3 or more characters long' }),
  status: z.boolean({
    required_error: 'Status is required',
    invalid_type_error: 'Status must be  a boolean',
  }).optional(),
  buyValue: z.number({
    required_error: 'Buy Value is required',
    invalid_type_error: 'Buy Value must be a number',
  }).int(),
});

export type Vehicle = z.infer<typeof vehicleSchema>;