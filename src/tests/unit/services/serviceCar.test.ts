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

  describe('#Testa o Service Car', () => {

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

  describe('#Testa o metodo read', () => {

    before(() => {
      Sinon.stub(serviceCar.model, 'read').resolves(mockModelCar);
    });

    after(() => {
      Sinon.restore();
    });

    it('Deve retornar um array de objetos', async () => {
      const car = await serviceCar.read();
      expect(car).to.be.an('array');
      expect(car).to.have.length(1);
      expect(car[0]).to.contain.keys('_id', 'model', 'year', 'color', 'buyValue', 'doorsQty', 'seatsQty');
    });
  })

  describe('#Testa o metodo readOne', () => {

    before(() => {
      Sinon.stub(serviceCar.model, 'readOne').resolves(mockResolvesCar);
    });

    after(() => {
      Sinon.restore();
    });

    it('Deve retornar um objeto', async () => {
      const car = await serviceCar.readOne(mockResolvesCar._id);
      expect(car).to.be.an('object');
      expect(car).to.contain.keys('_id', 'model', 'year', 'color', 'buyValue', 'doorsQty', 'seatsQty');
    });
  })

  describe('#Testa o metodo update', () => {

    before(() => {
      Sinon.stub(serviceCar.model, 'update').resolves(mockResolvesCar);
    });

    after(() => {
      Sinon.restore();
    });

    it('Deve retornar um objeto', async () => {
      const car = await serviceCar.update(mockResolvesCar._id, objCar);
      expect(car).to.be.an('object');
      expect(car).to.contain.keys('_id', 'model', 'year', 'color', 'buyValue', 'doorsQty', 'seatsQty');
    });
  })

  describe('#Testa o metodo delete', () => {

    before(() => {
      Sinon.stub(serviceCar.model, 'delete').resolves(mockResolvesCar);
    });

    after(() => {
      Sinon.restore();
    });

    it('Deve retornar um objeto', async () => {
      const car = await serviceCar.delete(mockResolvesCar._id);
      expect(car).to.be.an('object');
      expect(car).to.contain.keys('_id', 'model', 'year', 'color', 'buyValue', 'doorsQty', 'seatsQty');
    });
  })
})