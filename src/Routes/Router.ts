import { Router } from 'express';
import Controller from '../controllers';
import Validations from '../middlewares/validations';

const { validateId } = new Validations();

class CustomRouter<T> {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoute(
    controller: Controller<T>,
    route: string = controller.route,
  ) {
    this.router.get(route, controller.read);
    this.router.get(`${route}/:id`, validateId, controller.readOne);
    this.router.post(route, controller.create);
  }
}

export default CustomRouter;