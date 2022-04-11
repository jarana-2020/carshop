import { Router } from 'express';
import CarController from '../controllers/CarController';

const carController = new CarController();
const routes = Router();

routes.post('/cars', carController.create);

export default routes;