import { z } from 'zod';
import { vehicleSchema } from './VehicleInterface';

const motorcycleSchema = z.object({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number()
    .int()
    .lte(2500, { message: 'Engine Capacity must be less or equal 2500' }),
});

export const VehicleMotorcycle = motorcycleSchema.and(vehicleSchema);

export type Motorcycle = z.infer<typeof VehicleMotorcycle>;