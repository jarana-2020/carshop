import { expect } from 'chai';
import Sinon from 'sinon';
import MotorcycleModel from '../../../models/Motorcycle';
import { mockResolvesMotorcycle, objMotorcycle } from '../../mocks/mocks';

describe('Motorcycle Model', () => {
  let motorcycleModel = new MotorcycleModel();
  const mockModelCar = [mockResolvesMotorcycle];

  describe('Testa o método create', () => {
    before(() => {
      Sinon.stub(motorcycleModel, 'create').resolves(mockResolvesMotorcycle);
    });

    after(() => {
      Sinon.restore();
    });

    it('Deve retornar um objeto com suas devidas chaves', async () => {
      const car = await motorcycleModel.create(objMotorcycle);
      expect(car).to.be.an('object');
      expect(car).to.contain.keys('_id', 'model', 'year', 'color', 'buyValue', 'category', 'engineCapacity');
    });
  })

})