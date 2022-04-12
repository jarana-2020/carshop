import { NextFunction, Request, Response } from 'express';

class Validations {
  validateId = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { id } = req.params;
    const regEx = /^[0-9a-f]{24}$/;
    if (!regEx.test(id)) {
      return res.status(400)
        .json({ error: 'Id must have 24 hexadecimal characters' });
    }
    next();
  };
}

export default Validations;