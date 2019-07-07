import chai from 'chai';
import chaiHttp from 'chai-http';
import { users, generateAuthToken } from '../../models/user';
import { properties } from '../../models/property';
import server from '../../index';

chai.use(chaiHttp);
const { expect, request } = chai;

describe('api/property', () => {

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
});
