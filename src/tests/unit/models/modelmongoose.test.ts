import { expect } from 'chai';
import mongoose from 'mongoose';
import Sinon from 'sinon';
import CarModel from '../../../models/Car';
import MongoModel from '../../../models/MongoModel';

describe('Testa o Model Generico', () => {
  const genericShema =  new mongoose.Schema({ title: String })
  const genricModel = new MongoModel(mongoose.model('Generic',genericShema))

  const mockObj = {
    _id: '1',
    title: 'Carro',
  }

  describe('Testa o método readOne', () => {
    before(() => {
      Sinon.stub(genricModel.model, 'findOne').resolves(mockObj);
    })
    after(() => {
      Sinon.restore();
    })

    it('Retorna um objeto', async () => {
      const car = await genricModel.readOne(mockObj._id);
      expect(car).to.be.an('object');
    })
  })

  describe('Testa o método update', () => {
    const carUpdated = {
      _id: '1',
      title: 'Carro 2',
    }
    before(() => {
      Sinon.stub(genricModel.model, 'findOneAndUpdate').resolves(carUpdated);
    })
    after(() => {
      Sinon.restore();
    })

    it('Retorna um objeto', async () => {
      const car = await genricModel.update(mockObj._id, mockObj);
      expect(car).to.be.an('object');
      expect(car).to.be.deep.equals(carUpdated)
    })
  })

  describe('Testa o método delete', () => {

    before(() => {
      Sinon.stub(genricModel.model, 'findOneAndDelete').resolves(mockObj);
    })
    after(() => {
      Sinon.restore();
    })

    it('Retorna um objeto', async () => {
      const car = await genricModel.delete(mockObj._id);
      expect(car).to.be.an('object');
      expect(car).to.be.deep.equals(mockObj)
    })
  })
})