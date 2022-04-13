import { expect } from 'chai';
import Sinon from 'sinon';
import MotorcycleModel from '../../../models/Motorcycle';
import { mockResolvesMotorcycle, objMotorcycle } from '../../mocks/mocks';

describe('Motorcycle Model', () => {
  let motorcycleModel = new MotorcycleModel();
  const mockModelMotorcycle= [mockResolvesMotorcycle];

  describe('Testa o método create', () => {
    before(() => {
      Sinon.stub(motorcycleModel, 'create').resolves(mockResolvesMotorcycle);
    });

    after(() => {
      Sinon.restore();
    });

    it('Deve retornar um objeto com suas devidas chaves', async () => {
      const motorcycle = await motorcycleModel.create(objMotorcycle);
      expect(motorcycle).to.be.an('object');
      expect(motorcycle).to.contain.keys('_id', 'model', 'year', 'color', 'buyValue', 'category', 'engineCapacity');
    });
  })

  describe('Testa o método read', () => {
    before(() => {
      Sinon.stub(motorcycleModel, 'read').resolves(mockModelMotorcycle)
    })

    after(() => {
      Sinon.restore();
    })

    it('Retorna um array de Motorcycle', async () => {
      const motorcycle = await motorcycleModel.read();
      expect(motorcycle).to.be.an('array');
      expect(motorcycle[0]).to.deep.equals(mockResolvesMotorcycle);
      expect(motorcycle).to.have.length(1);
    })
  })

  describe('Testa o método readOne', async () => {
    before(() => {
      Sinon.stub(motorcycleModel, 'readOne').resolves(mockResolvesMotorcycle);
    })

    after(() => {
      Sinon.restore();
    })

    it('Retorna um objeto', async () => {
      const motorcycle = await motorcycleModel.readOne(mockResolvesMotorcycle._id);
      expect(motorcycle).to.be.an('object');
      expect(motorcycle).to.contain.keys('_id', 'model', 'year', 'color', 'buyValue', 'category', 'engineCapacity');
    })
  })

  describe('Testa o método update', () => {
    before(() => {
      Sinon.stub(motorcycleModel, 'update').resolves(mockResolvesMotorcycle);
    });

    after(() => {
      Sinon.restore();
    });

    it('Deve retornar um objeto', async () => {
      const car = await motorcycleModel.update(mockResolvesMotorcycle._id, objMotorcycle);
      expect(car).to.be.an('object');
      expect(car).to.contain.keys('_id', 'model', 'year', 'color', 'buyValue', 'doorsQty', 'seatsQty');
    });
  })

  describe('Testa o método delete', () => {
    before(() => {
      Sinon.stub(motorcycleModel, 'delete').resolves(mockResolvesMotorcycle);
    });

    after(() => {
      Sinon.restore();
    });

    it('Deve retornar um objeto', async () => {
      const car = await motorcycleModel.delete(mockResolvesMotorcycle._id);
      expect(car).to.be.an('object');
      expect(car).to.contain.keys('_id', 'model', 'year', 'color', 'buyValue', 'doorsQty', 'seatsQty');
    });
  })

})