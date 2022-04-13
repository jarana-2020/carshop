import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import { Request, Response } from 'express';
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
const mockModelCar = [mockResolvesCar];

describe('Testa o Controller Car', () => {

  describe('Testa o metodo create', () => {

    const response = {} as Response;
    const request = {} as RequestWithBody<typeof objCar>

    before(async () => {
      sinon
        .stub(carController.service, 'create')
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
      
      expect((response.status as Sinon.SinonStub).calledWith(201));
      expect(car).to.be.an('object');
      expect(car).to.contain.keys('_id', 'model', 'year', 'color', 'buyValue', 'doorsQty', 'seatsQty');
    })
  })

  describe('Testa o metodo read', () => {

    const response = {} as Response;
    const request = {} as RequestWithBody<typeof objCar>

    before(async () => {
      sinon
        .stub(carController.service, 'read')
        .resolves(mockModelCar);

      response.status = sinon.stub()
        .returns(response)

      response.json = sinon.stub()
        .returns(mockModelCar);
    });
  
    after(()=>{
      Sinon.restore();
    })

    it('Retorna o status 201', async() => {
      const car = await carController.read(request, response);
      
      
      expect((response.status as Sinon.SinonStub).calledWith(201));
      expect(car).to.be.an('array');
      expect(car).to.have.length(1);
      // expect(car[0]).to.contain.keys('_id', 'model', 'year', 'color', 'buyValue', 'doorsQty', 'seatsQty');
    })
  })

  describe('Testa o metodo readOne', () => {

    const response = {} as Response;
    const request = {} as Request<{ id: string }>

    before(async () => {
      sinon
        .stub(carController.service, 'readOne')
        .resolves(mockResolvesCar);

      response.status = sinon.stub()
        .returns(response)

      response.json = sinon.stub()
        .returns(mockResolvesCar);
    });
  
    after(()=>{
      Sinon.restore();
    })

    it('Retorna o status 200', async() => {
      request.params = { id: mockResolvesCar._id }
      const car = await carController.readOne(request, response);
      
      
      expect((response.status as Sinon.SinonStub).calledWith(200));
      expect(car).to.be.an('object');
      expect(car).to.contain.keys('_id', 'model', 'year', 'color', 'buyValue', 'doorsQty', 'seatsQty');
    })
  })

  describe('Testa o método update', () => {

    const response = {} as Response;
    const request = {} as Request<{ id: string; }, unknown >

    before(async () => {
      sinon
        .stub(carController.service, 'update')
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
      request.params = { id: mockResolvesCar._id }
      const car = await carController.update(request, response);
      
      
      expect((response.status as Sinon.SinonStub).calledWith(201));
      expect(car).to.be.an('object');
      expect(car).to.contain.keys('_id', 'model', 'year', 'color', 'buyValue', 'doorsQty', 'seatsQty');
    })
  })

  describe('Testa o método delete', () => {

    const response = {} as Response;
    const request = {} as Request<{ id: string; }>

    before(async () => {
      sinon
        .stub(carController.service, 'delete')
        .resolves(mockResolvesCar);

      response.status = sinon.stub()
        .returns(response)

      response.json = sinon.stub()
        .returns(mockResolvesCar);
    });
  
    after(()=>{
      Sinon.restore();
    })

    it('Retorna o status 204', async() => {
      request.params = { id: mockResolvesCar._id }
       await carController.delete(request, response);
      
      
      expect((response.status as Sinon.SinonStub).calledWith(204));
    })
  })

});