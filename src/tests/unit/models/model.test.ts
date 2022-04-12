import { expect } from 'chai';
import mongoose from 'mongoose';
import Sinon from 'sinon';
import CarModel from '../../../models/Car';
import MongoModel from '../../../models/MongoModel';
import { errorsZod, mockResolvesCar, objCar } from '../../mocks/mocks';

describe('Car Model', () => {
  let carModel = new CarModel();
  const mockModelCar = [mockResolvesCar];

  describe('#Cria um objeto Car com sucesso', () => {

    before(() => {
      Sinon.stub(carModel, 'create').resolves(mockResolvesCar);
    });

    after(() => {
      Sinon.restore();
    });

    it('Deve retornar um objeto com suas devidas chaves', async () => {
      const car = await carModel.create(objCar);
      expect(car).to.be.an('object');
      expect(car).to.contain.keys('_id', 'model', 'year', 'color', 'buyValue', 'doorsQty', 'seatsQty');
    });
  })
})