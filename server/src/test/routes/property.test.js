import chai from 'chai';
import chaiHttp from 'chai-http';
import { users, generateAuthToken } from '../../models/user';
import { properties } from '../../models/property';
import server from '../../index';

chai.use(chaiHttp);
const { expect, request } = chai;

describe('api/property', () => {
  describe('GET /', () => {
    let user;
    let property;
    let stringQuery;

    const exec = () => request(server)
      .get(`/api/v1/property${stringQuery}`);

    beforeEach(() => {
      users.length = 0;
      properties.length = 0;

      user = { id: 1, email: 'a', phoneNumber: '1' };
      property = { id: 1, owner: 1, type: 'type', state: 'state'};

      users.push(user);
      properties.push(property);
    });

    it('should return 200 with a property of a given type it it exists', async () => {
      stringQuery = '?type=type&&state=state';

      const res = await exec();

      expect(res.status).to.equal(200);
      expect(res.body.data[0]).to.deep.equal(property);
    });

    it('should return 404 if property of a given type does not exists', async () => {
      stringQuery = '?type=new';

      const res = await exec();

      expect(res.status).to.equal(404);
    });

    it('should return all properties ', async () => {
      stringQuery = '';

      const res = await exec();

      expect(res.status).to.equal(200);
      expect(res.body.data[0].id).to.equal(properties[0].id);
    });

    it('should return 404 if no properties founded ', async () => {
      stringQuery = '';
      properties.length = 0;

      const res = await exec();

      expect(res.status).to.equal(404);
    });
  });

  describe('GET/:ID /', () => {
    let user;
    let property;

    const exec = () => request(server)
      .get('/api/v1/property/1');

    beforeEach(() => {
      users.length = 0;
      properties.length = 0;

      user = { id: 1, email: 'a', phoneNumber: '1' };
      property = { id: 1, owner: 1 };

      users.push(user);
      properties.push(property);
    });

    it('should return 404 if property with given id is not found', async () => {
      properties.length = 0;

      const res = await exec();

      expect(res.status).to.equal(404);
    });

    it('should return property with given id', async () => {
      const res = await exec();

      expect(res.status).to.equal(200);
      expect(res.body.data.id).to.equal(property.id);
    });
  });

  describe('POST /', () => {
    let token;
    let property;
    let user;

    const exec = () => request(server)
      .post('/api/v1/property')
      .set('x-auth-token', token)
      .send(property);

    beforeEach(() => {
      property = {
        price: 100,
        state: 'New york',
        city: 'Queens',
        address: 'Street 397 PK',
        type: '6 bedrooms',
        image_url: 'some url',
      };

      user = { id: 1, isAdmin: true };
      token = generateAuthToken(user);

      properties.length = 0;
    });

    it('should return 401 if no token is provided', async () => {
      token = '';

      const res = await exec();

      expect(res.status).to.equal(401);
    });

    it('should return 400 if token is invalid', async () => {
      token = 'a';

      const res = await exec();

      expect(res.status).to.equal(500);
    });

    it('should return 400 if input is invalid', async () => {
      property = {};

      const res = await exec();

      expect(res.status).to.equal(400);
    });

    it('should return a property if it is saved successfully', async () => {
      const res = await exec();

      expect(res.status).to.equal(200);
      expect(res.body.data).to.have.property('id');
    });
  });

  describe('PATCH/:ID /', () => {
    let token;
    let property;
    let user;

    const exec = () => request(server)
      .patch('/api/v1/property/1')
      .set('x-auth-token', token)
      .send(property);

    beforeEach(() => {
      property = {
        price: 1,
        state: 'new state',
        city: 'city',
        address: 'address',
        type: 'type',
        image_url: 'image_url',
      };

      user = { id: 1, isAdmin: true };
      token = generateAuthToken(user);

      properties.length = 0;
    });

    it('should return 401 if user is not logged in', async () => {
      token = '';

      const res = await exec();

      expect(res.status).to.equal(401);
    });

    it('should return 404 if property with given id is not found', async () => {
      property = {};

      const res = await exec();

      expect(res.status).to.equal(404);
    });

    it('should return updated property if input is valid', async () => {
      const property = { id: 1, state: 'state' };
      properties.push(property);

      const res = await exec();

      expect(res.status).to.equal(200);
      expect(property.state).to.equal('new state');
    });
  });

 
});
