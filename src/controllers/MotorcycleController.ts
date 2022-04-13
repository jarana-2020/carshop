import { Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import MotorcycleService from '../services/MotorcycleService';

class MotorcycleController extends Controller<Motorcycle> {
  private _route: string;

  constructor(
    service = new MotorcycleService(),
    route = '/motorcycles',
  ) {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  create = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      const motorcycle = await this.service.create(body);
      if (!motorcycle) {
        return res.status(500).json({ error: this.errors.internal });
      }
      if ('error' in motorcycle) {
        return res.status(400).json(motorcycle);
      }
      return res.status(201).json(motorcycle);
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}

export default MotorcycleController;