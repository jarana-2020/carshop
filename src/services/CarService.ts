import Service, { ServiceError } from '.';
import { Car, VehicleCar } from '../interfaces/CarInterface';
import CarModel from '../models/Car';

class CarService extends Service<Car> {
  constructor(model = new CarModel()) {
    super(model);
  }

  create = async (obj: Car): Promise<Car | ServiceError | null> => {
    const parsed = VehicleCar.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(obj);
  };
}

export default CarService;