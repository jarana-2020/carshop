import { expect } from 'chai';
import mongoose from 'mongoose';
import Sinon from 'sinon';
import CarModel from '../../../models/Car';
import CarService from '../../../services/CarService';
import { mockResolvesCar, objCar } from '../../mocks/mocks';

describe('Car Service', () => {
  let carModel = new CarModel();
  let serviceCar = new CarService();
  const mockModelCar = [mockResolvesCar];

  describe('#Retorna um objeto Car com sucesso', () => {

    before(() => {
      Sinon.stub(serviceCar.model, 'create').resolves(mockResolvesCar);
    });

    after(() => {
      Sinon.restore();
    });

    it('Deve retornar um objeto com suas devidas chaves', async () => {
      const car = await serviceCar.create(objCar);
      expect(car).to.be.an('object');
      expect(car).to.contain.keys('_id', 'model', 'year', 'color', 'buyValue', 'doorsQty', 'seatsQty');
    });
  })
})