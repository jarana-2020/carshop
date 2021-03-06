import { expect } from 'chai';
import Sinon from 'sinon';
import CarModel from '../../../models/Car';
import { mockResolvesCar, objCar } from '../../mocks/mocks';

describe('Car Model', () => {
  let carModel = new CarModel();
  const mockModelCar = [mockResolvesCar];

  describe('#Testa o método create', () => {

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

  describe('Testa o método read', () => {
    before(() => {
      Sinon.stub(carModel, 'read').resolves(mockModelCar);
    });

    after(() => {
      Sinon.restore();
    });

    it('Deve retornar um array de objetos', async () => {
      const car = await carModel.read();
      expect(car).to.be.an('array');
      expect(car).to.have.length(1);
      expect(car[0]).to.contain.keys('_id', 'model', 'year', 'color', 'buyValue', 'doorsQty', 'seatsQty');
    });
  })

  describe('Testa o método readOne', () => {
    before(() => {
      Sinon.stub(carModel, 'readOne').resolves(mockResolvesCar);
    });

    after(() => {
      Sinon.restore();
    });

    it('Deve retornar um objeto', async () => {
      const car = await carModel.readOne(mockResolvesCar._id);
      expect(car).to.be.an('object');
      expect(car).to.contain.keys('_id', 'model', 'year', 'color', 'buyValue', 'doorsQty', 'seatsQty');
    });
  })

  describe('Testa o método update', () => {
    before(() => {
      Sinon.stub(carModel, 'update').resolves(mockResolvesCar);
    });

    after(() => {
      Sinon.restore();
    });

    it('Deve retornar um objeto', async () => {
      const car = await carModel.update(mockResolvesCar._id, objCar);
      expect(car).to.be.an('object');
      expect(car).to.contain.keys('_id', 'model', 'year', 'color', 'buyValue', 'doorsQty', 'seatsQty');
    });
  })

  describe('Testa o método delete', () => {
    before(() => {
      Sinon.stub(carModel, 'delete').resolves(mockResolvesCar);
    });

    after(() => {
      Sinon.restore();
    });

    it('Deve retornar um objeto', async () => {
      const car = await carModel.delete(mockResolvesCar._id);
      expect(car).to.be.an('object');
      expect(car).to.contain.keys('_id', 'model', 'year', 'color', 'buyValue', 'doorsQty', 'seatsQty');
    });
  })
})