import { Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import CarService from '../services/CarService';
import { Car } from '../interfaces/CarInterface';

class CarController extends Controller<Car> {
  constructor(service = new CarService()) {
    super(service);
  }

  create = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      const car = await this.service.create(body);
      if (!car) {
        return res.status(500).json({ error: this.errors.internal });
      }
      if ('error' in car) {
        return res.status(400).json(car);
      }
      return res.status(201).json(car);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}

export default CarController;