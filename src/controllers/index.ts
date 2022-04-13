import { Request, Response } from 'express';
import Service from '../services';

export type ResponseError = {
  error: unknown;
};

enum ControllerErrors {
  internal = 'Internal Server Error',
  notFound = 'Object not found',
  badRequest = 'Bad request',
  invalidId = 'Id must have 24 hexadecimal characters',
}

export interface RequestWithBody<T> extends Request {
  body: T;
}

abstract class Controller<T> {
  abstract route: string;

  protected errors = ControllerErrors;

  constructor(public service: Service<T>) {}

  abstract create(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  read = async (
    _req: Request,
    res: Response<T[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const objs = await this.service.read();
      return res.json(objs);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  abstract readOne(
    req: Request<{ id: string; }>,
    res: Response<T | ResponseError>
  ): Promise<typeof res>;

  abstract update(
    req: Request<{ id: string; }, unknown >,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  // abstract delete(
  //   req: Request<{ id: string; }>,
  //   res: Response<T | ResponseError>
  // ): Promise<typeof res>;
}

export default Controller;