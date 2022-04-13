import Service, { ServiceError } from '.';
import { Motorcycle, VehicleMotorcycle } 
  from '../interfaces/MotorcycleInterface';
import MotorcycleModel from '../models/Motorcycle';

class MotorcycleService extends Service<Motorcycle> {
  constructor(model = new MotorcycleModel()) {
    super(model);
  }

  create = async (obj: Motorcycle): 
  Promise<Motorcycle | ServiceError | null> => {
    const parsed = VehicleMotorcycle.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(obj);
  };
}

export default MotorcycleService;