import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import { Response } from 'express';
import CarService from '../../../services/CarService';
import { mockResolvesCar, objCar } from '../../mocks/mocks';
import Sinon = require('sinon');
import App from '../../../app';
import CarModel from '../../../models/Car';
import { RequestWithBody } from '../../../controllers';
import CarController from '../../../controllers/CarController';


chai.use(chaiHttp);

const { expect } = chai;
const carService = new CarService();
const carController = new CarController();

describe('Controller Car', () => {

  const response = {} as Response;
  const request = {} as RequestWithBody<typeof objCar>

  describe('Retorna os dados do Carro em caso de sucesso', () => {
    before(async () => {
      sinon
        .stub(carService, 'create')
        .resolves(mockResolvesCar);

      response.status = sinon.stub()
        .returns(response)

      response.json = sinon.stub()
        .returns(mockResolvesCar);
    });
  
    after(()=>{
      Sinon.restore();
    })

    it('Retorna o status 201', async() => {
      const car = await carController.create(request, response)
      console.log(car);
      
      expect((response.status as Sinon.SinonStub).calledWith(201));
      expect(car).to.be.an('object');
      expect(car).to.contain.keys('_id', 'model', 'year', 'color', 'buyValue', 'doorsQty', 'seatsQty');
    })
  })

});