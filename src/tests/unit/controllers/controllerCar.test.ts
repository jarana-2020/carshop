import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import { Request, Response } from 'express';
import CarService from '../../../services/CarService';
import { mockResolvesCar, objCar, errorsZod } from '../../mocks/mocks';
import Sinon = require('sinon');
import { RequestWithBody } from '../../../controllers';
import CarController from '../../../controllers/CarController';
import { ZodError } from 'zod';


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

describe('Testa o Controller Car em caso de falha', () => {

  describe('O carro não é criado com sucesso', () => {

    const response = {} as Response ;
    const request = {} as RequestWithBody<typeof objCar>

    before(async () => {
      sinon
        .stub(carController.service, 'create')
        .resolves(null);

      response.status = sinon.stub()
        .returns(response)

      response.json = sinon.stub()
        .returns({ error: 'Internal Server Error' });
    });
  
    after(()=>{
      Sinon.restore();
    })

    it('Retorna o status 500', async() => {
      const car = await carController.create(request, response)
      
      expect((response.status as Sinon.SinonStub).calledWith(500));
      expect(car).to.be.an('object');
      expect(car).to.contain.keys('error');
    })
  })

  describe('Os campos obrigatórios não são validos ou não são informados', () => {

    const response = {} as Response;
    const request = {} as RequestWithBody<typeof objCar>

    before(async () => {
      sinon
        .stub(carController.service, 'create')
        .resolves(errorsZod as never);

      response.status = sinon.stub()
        .returns(response)

      response.json = sinon.stub()
        .returns(errorsZod);
    });
  
    after(()=>{
      Sinon.restore();
    })

    it('Retorna o status 400', async() => {
      const car = await carController.create(request, response)
      
      expect((response.status as Sinon.SinonStub).calledWith(400));
      expect(car).to.be.an('object');
      expect(car).to.contain.keys('error');
    })
  })

  describe('Ocorre um erro na requisição do metodo create', () => {

    const response = {} as Response;
    const request = {} as RequestWithBody<typeof objCar>

    before(async () => {
      sinon
        .stub(carController.service, 'create')
        .rejects();

      response.status = sinon.stub()
        .returns(response)

      response.json = sinon.stub()
        .returns({ error: 'Internal Server Error' });
    });
  
    after(()=>{
      Sinon.restore();
    })

    it('Retorna o status 500', async() => {
      const car = await carController.create(request, response)
      
      expect((response.status as Sinon.SinonStub).calledWith(500));
      expect(car).to.be.an('object');
      expect(car).to.contain.keys('error');
    })
  })

  describe('Ocorre um erro na requisição do metodo read', () => {

    const response = {} as Response;
    const request = {} as RequestWithBody<typeof objCar>

    before(async () => {
      sinon
        .stub(carController.service, 'read')
        .rejects();

      response.status = sinon.stub()
        .returns(response)

      response.json = sinon.stub()
        .returns({ error: 'Internal Server Error' });
    });
  
    after(()=>{
      Sinon.restore();
    })

    it('Retorna o status 500', async() => {
      request.params = { id: mockResolvesCar._id }
      const car = await carController.read(request, response)
      
      expect((response.status as Sinon.SinonStub).calledWith(500));
      expect(car).to.be.an('object');
      expect(car).to.contain.keys('error');
    })
  })

  describe('Ocorre um erro na requisição do metodo readOne', () => {

    const response = {} as Response;
    const request = {} as Request<{ id: string }>

    before(async () => {
      sinon
        .stub(carController.service, 'readOne')
        .rejects();

      response.status = sinon.stub()
        .returns(response)

      response.json = sinon.stub()
        .returns({ error: 'Internal Server Error' });
    });
  
    after(()=>{
      Sinon.restore();
    })

    it('Retorna o status 500', async() => {
      request.params = { id: mockResolvesCar._id }
      const car = await carController.readOne(request, response)
      
      expect((response.status as Sinon.SinonStub).calledWith(500));
      expect(car).to.be.an('object');
      expect(car).to.contain.keys('error');
    })
  })

  describe('Ocorre um erro no metodo readOne', () => {

    const response = {} as Response;
    const request = {} as Request<{ id: string }>

    before(async () => {
      sinon
        .stub(carController.service, 'readOne')
        .resolves(null);

      response.status = sinon.stub()
        .returns(response)

      response.json = sinon.stub()
        .returns({ error: 'Object not found' });
    });
  
    after(()=>{
      Sinon.restore();
    })

    it('Retorna o status 404', async() => {
      request.params = { id: '05a6978aa329123afg489jhk'}
      const car = await carController.readOne(request, response)
      
      expect((response.status as Sinon.SinonStub).calledWith(404));
      expect(car).to.be.an('object');
      expect(car).to.contain.keys('error');
    })
  })

  describe('Ocorre um erro na requisição do metodo update', () => {

    const response = {} as Response;
    const request = {} as Request<{ id: string; }, unknown >

    before(async () => {
      sinon
        .stub(carController.service, 'update')
        .rejects();

      response.status = sinon.stub()
        .returns(response)

      response.json = sinon.stub()
        .returns({ error: 'Internal Server Error' });
    });
  
    after(()=>{
      Sinon.restore();
    })

    it('Retorna o status 500', async() => {
      request.params = { id: mockResolvesCar._id }
      const car = await carController.update(request, response)
      
      expect((response.status as Sinon.SinonStub).calledWith(500));
      expect(car).to.be.an('object');
      expect(car).to.contain.keys('error');
    })
  })

  describe('Ocorre um erro no metodo update', () => {

    const response = {} as Response;
    const request = {} as Request<{ id: string }>

    before(async () => {
      sinon
        .stub(carController.service, 'update')
        .resolves(null);

      response.status = sinon.stub()
        .returns(response)

      response.json = sinon.stub()
        .returns({ error: 'Object not found' });
    });
  
    after(()=>{
      Sinon.restore();
    })

    it('Retorna o status 404', async() => {
      request.params = { id: '05a6978aa329123afg489jhk'}
      const car = await carController.update(request, response)
      
      expect((response.status as Sinon.SinonStub).calledWith(404));
      expect(car).to.be.an('object');
      expect(car).to.contain.keys('error');
    })
  })

  describe('Ocorre um erro na requisição do metodo delete', () => {

    const response = {} as Response;
    const request = {} as Request<{ id: string; } >

    before(async () => {
      sinon
        .stub(carController.service, 'delete')
        .rejects();

      response.status = sinon.stub()
        .returns(response)

      response.json = sinon.stub()
        .returns({ error: 'Internal Server Error' });
    });
  
    after(()=>{
      Sinon.restore();
    })

    it('Retorna o status 500', async() => {
      request.params = { id: mockResolvesCar._id }
      const car = await carController.delete(request, response)
      
      expect((response.status as Sinon.SinonStub).calledWith(500));
      expect(car).to.be.an('object');
      expect(car).to.contain.keys('error');
    })
  })

  describe('Testa o Controller Route', () => {

    before(() => {
      sinon.stub(carController, "route").resolves("/cars")
    })

    after(() => {
      sinon.restore()
    })

    it('Retorna a rota correta', () => {
      const route = carController.route;
      expect(route).to.be.equal('/cars');
    })
    
  })

  describe('Ocorre um erro no metodo delete', () => {

    const response = {} as Response;
    const request = {} as Request<{ id: string }>

    before(async () => {
      sinon
        .stub(carController.service, 'delete')
        .resolves(null);

      response.status = sinon.stub()
        .returns(response)

      response.json = sinon.stub()
        .returns({ error: 'Object not found' });
    });
  
    after(()=>{
      Sinon.restore();
    })

    it('Retorna o status 404', async() => {
      request.params = { id: '05a6978aa329123afg489jhk'}
      const car = await carController.delete(request, response)
      
      expect((response.status as Sinon.SinonStub).calledWith(404));
      expect(car).to.be.an('object');
      expect(car).to.contain.keys('error');
    })
  })

})