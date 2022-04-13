import { expect } from 'chai';
import Sinon from 'sinon';
import { validMotorcycle } from '../../../../__tests__/utils/MotorcyclesMock';
import { VehicleCar } from '../../../interfaces/CarInterface';
import MotorcycleModel from '../../../models/Motorcycle';
import MotorcycleService from '../../../services/MotorcycleService';
import { errorsZod, mockResolvesCar, objCar } from '../../mocks/mocks';

// describe('#Testa o método create', () => {

//   const motorcycleService = new MotorcycleService();

//   before(() => {
//     Sinon.stub(motorcycleService.model, 'create').resolves({ 
//     model: 'Honda CG Titan 125',
//     year: 1963,
//     color: 'red',
//     buyValue: 3500,
//     category: 'Street',
//     engineCapacity: 125});
//   });

//   after(() => {
//     Sinon.restore();
//   });

//   it('Deve retornar um objeto com suas devidas chaves', async () => {
//     const car = await motorcycleService.create({ 
//     model: 'Honda CG Titan 125',
//     year: 1963,
//     color: 'red',
//     buyValue: 3500,
//     category: 'Street',
//     engineCapacity: 125});
//     expect(car).to.be.an('object');
//     expect(car).to.contain.keys('_id', 'model', 'year', 'color', 'buyValue', 'doorsQty', 'seatsQty');
//   });
// })