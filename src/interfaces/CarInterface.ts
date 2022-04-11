import { z } from 'zod';
import { vehicleSchema } from './VehicleInterface';

const carSchema = z.object({
  doorsQty: z.number()
    .gte(2, { message: 'Year must be bigger or equal 2' })
    .lte(4, { message: 'Year must be less or equal 4' }),
  seatsQty: z.number()
    .gte(2, { message: 'Year must be bigger or equal 2' })
    .lte(7, { message: 'Year must be less or equal 4' }),
});

const VehicleCar = carSchema.and(vehicleSchema);

export type Car = z.infer<typeof VehicleCar>;
