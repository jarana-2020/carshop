import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import { Request, Response } from 'express';
import MotorcycleService from '../../../services/MotorcycleService';
import Sinon = require('sinon');
import { RequestWithBody } from '../../../controllers';
import MotorcycleController from '../../../controllers/MotorcycleController';
import { errorsZod, mockResolvesMotorcycle, objMotorcycle } from '../../mocks/mocks';

chai.use(chaiHttp);

const { expect } = chai;
const motocycleService = new MotorcycleService();
const motorcycleController = new MotorcycleController();
const mockModelMotorcycle = [mockResolvesMotorcycle];

describe('Testa o Controller Car', () => {

  describe('Testa o metodo create', () => {

    const response = {} as Response;
    const request = {} as RequestWithBody<typeof objMotorcycle>

    before(async () => {
      sinon
        .stub(motorcycleController.service, 'create')
        .resolves(mockResolvesMotorcycle);

      response.status = sinon.stub()
        .returns(response)

      response.json = sinon.stub()
        .returns(mockResolvesMotorcycle);
    });
  
    after(()=>{
      Sinon.restore();
    })

    it('Retorna o status 201', async() => {
      const motorcycle = await motorcycleController.create(request, response)
      
      expect((response.status as Sinon.SinonStub).calledWith(201));
      expect(motorcycle).to.be.an('object');
      expect(motorcycle).to.contain.keys('_id', 'model', 'year', 'color', 'buyValue', 'category', 'engineCapacity');
    })
  })

  describe('Testa o metodo read', () => {

    const response = {} as Response;
    const request = {} as RequestWithBody<typeof objMotorcycle>

    before(async () => {
      sinon
        .stub(motorcycleController.service, 'read')
        .resolves(mockModelMotorcycle);

      response.status = sinon.stub()
        .returns(response)

      response.json = sinon.stub()
        .returns(mockModelMotorcycle);
    });
  
    after(()=>{
      Sinon.restore();
    })

    it('Retorna o status 201', async() => {
      const motorcycle = await motorcycleController.read(request, response);
      
      
      expect((response.status as Sinon.SinonStub).calledWith(201));
      expect(motorcycle).to.be.an('array');
      expect(motorcycle).to.have.length(1);
      // expect(car[0]).to.contain.keys('_id', 'model', 'year', 'color', 'buyValue', 'doorsQty', 'seatsQty');
    })
  })

  describe('Testa o metodo readOne', () => {

    const response = {} as Response;
    const request = {} as Request<{ id: string }>

    before(async () => {
      sinon
        .stub(motorcycleController.service, 'readOne')
        .resolves(mockResolvesMotorcycle);

      response.status = sinon.stub()
        .returns(response)

      response.json = sinon.stub()
        .returns(mockResolvesMotorcycle);
    });
  
    after(()=>{
      Sinon.restore();
    })

    it('Retorna o status 200', async() => {
      request.params = { id: mockResolvesMotorcycle._id }
      const motorcycle = await motorcycleController.readOne(request, response);
      
      
      expect((response.status as Sinon.SinonStub).calledWith(200));
      expect(motorcycle).to.be.an('object');
      expect(motorcycle).to.contain.keys('_id', 'model', 'year', 'color', 'buyValue', 'category', 'engineCapacity');
    })
  })

  describe('Testa o método update', () => {

    const response = {} as Response;
    const request = {} as Request<{ id: string; }, unknown >

    before(async () => {
      sinon
        .stub(motorcycleController.service, 'update')
        .resolves(mockResolvesMotorcycle);

      response.status = sinon.stub()
        .returns(response)

      response.json = sinon.stub()
        .returns(mockResolvesMotorcycle);
    });
  
    after(()=>{
      Sinon.restore();
    })

    it('Retorna o status 201', async() => {
      request.params = { id: mockResolvesMotorcycle._id }
      const motorcycle = await motorcycleController.update(request, response);
      
      
      expect((response.status as Sinon.SinonStub).calledWith(201));
      expect(motorcycle).to.be.an('object');
      expect(motorcycle).to.contain.keys('_id', 'model', 'year', 'color', 'buyValue', 'category', 'engineCapacity');
    })
  })

  describe('Testa o método delete', () => {

    const response = {} as Response;
    const request = {} as Request<{ id: string; }>

    before(async () => {
      sinon
        .stub(motorcycleController.service, 'delete')
        .resolves(mockResolvesMotorcycle);

      response.status = sinon.stub()
        .returns(response)

      response.json = sinon.stub()
        .returns(mockResolvesMotorcycle);
    });
  
    after(()=>{
      Sinon.restore();
    })

    it('Retorna o status 204', async() => {
      request.params = { id: mockResolvesMotorcycle._id }
       await motorcycleController.delete(request, response);
      
      
      expect((response.status as Sinon.SinonStub).calledWith(204));
    })
  })

});

describe('Testa o Controller Car em caso de falha', () => {

  describe('O carro não é criado com sucesso', () => {

    const response = {} as Response ;
    const request = {} as RequestWithBody<typeof objMotorcycle>

    before(async () => {
      sinon
        .stub(motorcycleController.service, 'create')
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
      const motorcycle = await motorcycleController.create(request, response)
      
      expect((response.status as Sinon.SinonStub).calledWith(500));
      expect(motorcycle).to.be.an('object');
      expect(motorcycle).to.contain.keys('error');
    })
  })

  describe('Os campos obrigatórios não são validos ou não são informados', () => {

    const response = {} as Response;
    const request = {} as RequestWithBody<typeof objMotorcycle>

    before(async () => {
      sinon
        .stub(motorcycleController.service, 'create')
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
      const motorcycle = await motorcycleController.create(request, response)
      
      expect((response.status as Sinon.SinonStub).calledWith(400));
      expect(motorcycle).to.be.an('object');
      expect(motorcycle).to.contain.keys('error');
    })
  })

  describe('Ocorre um erro na requisição do metodo create', () => {

    const response = {} as Response;
    const request = {} as RequestWithBody<typeof objMotorcycle>

    before(async () => {
      sinon
        .stub(motorcycleController.service, 'create')
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
      const motorcycle = await motorcycleController.create(request, response)
      
      expect((response.status as Sinon.SinonStub).calledWith(500));
      expect(motorcycle).to.be.an('object');
      expect(motorcycle).to.contain.keys('error');
    })
  })

  describe('Ocorre um erro na requisição do metodo read', () => {

    const response = {} as Response;
    const request = {} as RequestWithBody<typeof objMotorcycle>

    before(async () => {
      sinon
        .stub(motorcycleController.service, 'read')
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
      request.params = { id: mockResolvesMotorcycle._id }
      const motorcycle = await motorcycleController.read(request, response)
      
      expect((response.status as Sinon.SinonStub).calledWith(500));
      expect(motorcycle).to.be.an('object');
      expect(motorcycle).to.contain.keys('error');
    })
  })

  describe('Ocorre um erro na requisição do metodo readOne', () => {

    const response = {} as Response;
    const request = {} as Request<{ id: string }>

    before(async () => {
      sinon
        .stub(motorcycleController.service, 'readOne')
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
      request.params = { id: mockResolvesMotorcycle._id }
      const motorcycle = await motorcycleController.readOne(request, response)
      
      expect((response.status as Sinon.SinonStub).calledWith(500));
      expect(motorcycle).to.be.an('object');
      expect(motorcycle).to.contain.keys('error');
    })
  })

  describe('Ocorre um erro no metodo readOne', () => {

    const response = {} as Response;
    const request = {} as Request<{ id: string }>

    before(async () => {
      sinon
        .stub(motorcycleController.service, 'readOne')
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
      const motorcycle = await motorcycleController.readOne(request, response)
      
      expect((response.status as Sinon.SinonStub).calledWith(404));
      expect(motorcycle).to.be.an('object');
      expect(motorcycle).to.contain.keys('error');
    })
  })

  describe('Ocorre um erro na requisição do metodo update', () => {

    const response = {} as Response;
    const request = {} as Request<{ id: string; }, unknown >

    before(async () => {
      sinon
        .stub(motorcycleController.service, 'update')
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
      request.params = { id: mockResolvesMotorcycle._id }
      const motorcycle = await motorcycleController.update(request, response)
      
      expect((response.status as Sinon.SinonStub).calledWith(500));
      expect(motorcycle).to.be.an('object');
      expect(motorcycle).to.contain.keys('error');
    })
  })

  describe('Ocorre um erro no metodo update', () => {

    const response = {} as Response;
    const request = {} as Request<{ id: string }>

    before(async () => {
      sinon
        .stub(motorcycleController.service, 'update')
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
      const motorcycle = await motorcycleController.update(request, response)
      
      expect((response.status as Sinon.SinonStub).calledWith(404));
      expect(motorcycle).to.be.an('object');
      expect(motorcycle).to.contain.keys('error');
    })
  })

  describe('Ocorre um erro na requisição do metodo delete', () => {

    const response = {} as Response;
    const request = {} as Request<{ id: string; } >

    before(async () => {
      sinon
        .stub(motorcycleController.service, 'delete')
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
      request.params = { id: mockResolvesMotorcycle._id }
      const motorcycle = await motorcycleController.delete(request, response)
      
      expect((response.status as Sinon.SinonStub).calledWith(500));
      expect(motorcycle).to.be.an('object');
      expect(motorcycle).to.contain.keys('error');
    })
  })

  describe('Testa o Controller Route', () => {

    before(() => {
      sinon.stub(motorcycleController, "route").resolves("/motorcycles")
    })

    after(() => {
      sinon.restore()
    })

    it('Retorna a rota correta', () => {
      const route = motorcycleController.route;
      expect(route).to.be.equal('/motorcycles');
    })
    
  })

  describe('Ocorre um erro no metodo delete', () => {

    const response = {} as Response;
    const request = {} as Request<{ id: string }>

    before(async () => {
      sinon
        .stub(motorcycleController.service, 'delete')
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
      const motorcycle = await motorcycleController.delete(request, response)
      
      expect((response.status as Sinon.SinonStub).calledWith(404));
      expect(motorcycle).to.be.an('object');
      expect(motorcycle).to.contain.keys('error');
    })
  })

})
