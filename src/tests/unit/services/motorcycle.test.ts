import { expect } from 'chai';
import Sinon from 'sinon';
import { VehicleCar } from '../../../interfaces/CarInterface';
import MotorcycleModel from '../../../models/Motorcycle';
import MotorcycleService from '../../../services/MotorcycleService';
import { errorsZod, mockResolvesCar, mockResolvesMotorcycle, objCar, objMotorcycle } from '../../mocks/mocks';

describe('Car Service', () => {
  let serviceMotorcycle = new MotorcycleService();
  const mockModelMotorcycle = [mockResolvesMotorcycle];

  describe('#Testa o método create', () => {

    before(() => {
      Sinon.stub(serviceMotorcycle.model, 'create').resolves(mockResolvesMotorcycle);
    });

    after(() => {
      Sinon.restore();
    });

    it('Deve retornar um objeto com suas devidas chaves', async () => {
      const motorcycle = await serviceMotorcycle.create(objMotorcycle);
      expect(motorcycle).to.be.an('object');
      expect(motorcycle).to.contain.keys('_id', 'model', 'year', 'color', 'buyValue', 'category', 'engineCapacity');
    });
  })

  describe('#Testa o metodo read', () => {

    before(() => {
      Sinon.stub(serviceMotorcycle.model, 'read').resolves(mockModelMotorcycle);
    });

    after(() => {
      Sinon.restore();
    });

    it('Deve retornar um array de objetos', async () => {
      const motorcycle = await serviceMotorcycle.read();
      expect(motorcycle).to.be.an('array');
      expect(motorcycle).to.have.length(1);
      expect(motorcycle[0]).to.contain.keys('_id', 'model', 'year', 'color', 'buyValue', 'category', 'engineCapacity');
    });
  })

  describe('#Testa o metodo readOne', () => {

    before(() => {
      Sinon.stub(serviceMotorcycle.model, 'readOne').resolves(mockResolvesMotorcycle);
    });

    after(() => {
      Sinon.restore();
    });

    it('Deve retornar um objeto', async () => {
      const motorcycle = await serviceMotorcycle.readOne(mockResolvesMotorcycle._id);
      expect(motorcycle).to.be.an('object');
      expect(motorcycle).to.contain.keys('_id', 'model', 'year', 'color', 'buyValue', 'category', 'engineCapacity');
    });
  })

  describe('#Testa o metodo update', () => {

    before(() => {
      Sinon.stub(serviceMotorcycle.model, 'update').resolves(mockResolvesMotorcycle);
    });

    after(() => {
      Sinon.restore();
    });

    it('Deve retornar um objeto', async () => {
      const motorcycle = await serviceMotorcycle.update(mockResolvesMotorcycle._id, objMotorcycle);
      expect(motorcycle).to.be.an('object');
      expect(motorcycle).to.contain.keys('_id', 'model', 'year', 'color', 'buyValue', 'category', 'engineCapacity');
    });
  })

  describe('#Testa o metodo delete', () => {

    before(() => {
      Sinon.stub(serviceMotorcycle.model, 'delete').resolves(mockResolvesMotorcycle);
    });

    after(() => {
      Sinon.restore();
    });

    it('Deve retornar um objeto', async () => {
      const motorcycle = await serviceMotorcycle.delete(mockResolvesMotorcycle._id);
      expect(motorcycle).to.be.an('object');
      expect(motorcycle).to.contain.keys('_id', 'model', 'year', 'color', 'buyValue', 'category', 'engineCapacity');
    });
  })
})

// describe('Service Car em caso de falha', () => {

//   let serviceMotorcycle = new MotorcycleService();

//   before(() => {
//     Sinon.stub(VehicleCar, 'safeParse').returns(errorsZod as never);
//   });

//   after(() => {
//     Sinon.restore();
//   });

//   it('retorna um objeto com uma chave erro', async () => {
//     const car = await serviceMotorcycle.create(objCar);
//     expect(car).to.be.an('object');
//     expect(car).contain.keys('error');
//   });

// })

// describe('Testa o create do Service Genérico', () => {
  
//   const carModel = new CarModel();
//   let serviceMotorcycle = new Service(carModel);

//   before(() => {
//     Sinon.stub(serviceMotorcycle.model,'create').resolves(objCar);
//   });

//   after(() => {
//     Sinon.restore();
//   });

//   it('retorna um objeto com uma chave erro', async () => {
//     const car = await serviceMotorcycle.create(objCar);
//     expect(car).to.be.an('object');
//   })
// })