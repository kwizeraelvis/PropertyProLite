import chai from 'chai';
import chaiHttp from 'chai-http';
import { users, generateAuthToken } from '../../helper/user';
import { properties } from '../../helper/property';
import { validProperty, validUserProperty } from '../models/data';
import { assign } from '../../helper/user';
import server from '../../index';
import _ from 'lodash';



chai.use(chaiHttp);
const { expect, request } = chai;

describe('api/property', () => {
  describe('GET /', () => {
    let user = {};
    let property = {};
    let stringQuery;
    let token;

    const exec = () => request(server)
      .get(`/api/v1/property${stringQuery}`)
      .set('x-auth-token', token);

    beforeEach(() => {
      users.length = 0;
      properties.length = 0;

      user = assign(user, validUserProperty);
      property = assign(property, validProperty);

      token = generateAuthToken(user);
      stringQuery = '';

      users.push(user);
      properties.push(property);
    });

    it('should return all properties ', async () => {
      const res = await exec();

      expect(res.status).to.equal(200);
      expect(res.body.data[0].id).to.equal(properties[0].id);
    });

    it('should return 404 if no properties founded ', async () => {
      properties.length = 0;

      const res = await exec();

      expect(res.status).to.equal(404);
    });

    it('should return all available properties ', async () => {
      property.status = 'available';
      
      const res = await exec();

      expect(res.status).to.equal(200);
      expect(res.body.data[0].id).to.equal(properties[0].id);
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

    it('should return all available properties if no token is provided', async () => {
      property.status = 'available';
      token = '';
      
      const res = await exec();

      expect(res.status).to.equal(200);
      expect(res.body.data[0].id).to.equal(properties[0].id);
    });
  });

  describe('GET/:ID /', () => {
    let user = {};
    let property = {};

    const exec = () => request(server)
      .get('/api/v1/property/1');

    beforeEach(() => {
      users.length = 0;
      properties.length = 0;

      user = assign(user, validUserProperty);
      property = assign(property, validProperty);

      users.push(user);
      properties.push(property);
    });

    it('should return property with given id', async () => {
      const res = await exec();

      expect(res.status).to.equal(200);
      expect(res.body.data.id).to.equal(property.id);
    });

    it('should return 404 if property with given id is not found', async () => {
      properties.length = 0;

      const res = await exec();

      expect(res.status).to.equal(404);
    });
  });

  describe('GET/ME /', () => {
    let token;

    const exec = () => request(server)
      .get('/api/v1/property/me')
      .set('x-auth-token', token);

    beforeEach(() => {
      token = generateAuthToken(validUserProperty);

      properties.length = 0;
    });


    it('should return 200 if own property are fetched', async () => {
      properties.push(validProperty);

      const res = await exec();

      expect(res.status).to.equal(200);
      expect(res.body.data[0].id).to.equal(validProperty.id);
    });
  });

  describe('POST /', () => {
    let token;
    let property = {};
    let user = {};

    const exec = () => request(server)
      .post('/api/v1/property')
      .set('x-auth-token', token)
      .send(property);

    beforeEach(() => {
      property = assign(property, validProperty);

      user = assign(user, validUserProperty);
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

      expect(res.status).to.equal(400);
    });

    it('should return 400 if input is invalid', async () => {
      property = {};

      const res = await exec();

      expect(res.status).to.equal(400);
    });

    it('should return 400 if property already exits', async() => {
      const property = { type: '6 bedrooms' };
      properties.push(property);

      const res = await exec();

      expect(res.status).to.equal(400);
    });

    it('should return 400 if input contain special characters', async () => {
      property.city = '*';
      
      const res = await exec();

      expect(res.status).to.equal(400);
    });

    it('should return 400 if a string variable is given a number', async () => {
      property.city = '1';
      
      const res = await exec();

      expect(res.status).to.equal(400);
    });

    it('should return 400 if city contains numbers', async () => {
      property.city = 'a1';
      
      const res = await exec();

      expect(res.status).to.equal(400);
    });

    it('should return 400 if state contains numbers', async () => {
      property.state = 'a1';
      
      const res = await exec();

      expect(res.status).to.equal(400);
    });

    it('should return 400 if an image url is invalid', async () => {
      property.image_url = 'a';
      
      const res = await exec();

      expect(res.status).to.equal(400);
    });

    it('should return a property if it is saved successfully', async () => {
      property = _.pick(property, ['state', 'type', 'city', 'price', 'address', 'image_url']);

      const res = await exec();

      expect(res.status).to.equal(201);
      expect(res.body.data).to.have.property('id');
    });

    it('should return 200 if image is uploaded', (done) => {
      const image = './UI/assets/image1.jpg'

       request(server)
      .post('/api/v1/property')
      .set('x-auth-token', token)
      .field('price', 1000)
      .field('state', 'state')
      .field('city', 'city')
      .field('address', 'address')
      .field('type', 'type')
      .field('image_url', 'https://postcron.com/en/blog/10-amazing-marketing-lessons-steve-jobs-taught-us/')
      .attach('photo', image)
      .end((err, res) => {
        
        expect(res.status).to.equal(201);
        done();
      })
    });
  });

  describe('PATCH/:ID /', () => {
    let token;
    let property = {};
    let user = {};

    const exec = () => request(server)
      .patch('/api/v1/property/1')
      .set('x-auth-token', token)
      .send(property);

    beforeEach(() => {
      property = assign(property, validProperty);

      user = assign(user, validUserProperty);
      token = generateAuthToken(user);

      properties.length = 0;
    });

    it('should return 401 if user is not logged in', async () => {
      token = '';

      const res = await exec();

      expect(res.status).to.equal(401);
    });

    it('should return 400 if property data is not valid', async () => {
      property.state = 1;

      const res = await exec();

      expect(res.status).to.equal(400);
    });

    it('should return 404 if property with given id is not found', async () => {
      property = _.pick(property, ['state', 'type', 'city', 'price', 'address', 'image_url']);

      const res = await exec();

      expect(res.status).to.equal(404);
    });

    it('should return 400 if an image url is invalid', async () => {
      property.image_url = 'a';
      
      const res = await exec();

      expect(res.status).to.equal(400);
    });

    // it('should return 403 if property is not yours', async () => {
    //   property = _.pick(property, ['state', 'type', 'city', 'price', 'address', 'image_url']);
    //   properties.length = 0;
    //   properties.push(property);

    //   const res = await exec();

    //   console.log('res is : ', res.body);

    //   expect(res.status).to.equal(403);
    // });

    // it('should updated property if it is yours', async () => {
    //   const property = { id: 1, state: 'state', owner: 1 };
    //   properties.push(property);

    //   const res = await exec();

    //   console.log('the res is : ', res.body);

    //   expect(res.status).to.equal(200);
    //   expect(property.state).to.equal('new state');
    // });
  });

  describe('PATCH/:id/sold /', () => {
    let token;
    let property = {};
    let user = {};

    const exec = () => request(server)
      .patch('/api/v1/property/1/sold')
      .set('x-auth-token', token)
      .send(property);

    beforeEach(() => {
      property = assign(property, validProperty);

      user = assign(user, validUserProperty);
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

    it('should return property with sold status if it is yours', async () => {
      const property = { id: 1, status: 'available', owner: 1 };
      properties.push(property);

      const res = await exec();

      expect(res.status).to.equal(200);
      expect(property.status).to.equal('sold');
    });
  });

  describe('DELETE /', () => {
    let token;
    let property = {};
    let user = {};

    const exec = () => request(server)
      .delete('/api/v1/property/1')
      .set('x-auth-token', token)
      .send(property);

    beforeEach(() => {
      property = assign(property, validProperty);

      user = assign(user, validUserProperty);
      token = generateAuthToken(user);

      properties.length = 0;
    });

    it('should return 401 if user is not logged in', async () => {
      token = '';

      const res = await exec();

      expect(res.status).to.equal(401);
    });

    it('should return 403 if user is not an admin', async () => {
      user.isAdmin = false;
      token = generateAuthToken(user);

      const res = await exec();

      expect(res.status).to.equal(403);
    });

    it('should return 404 if property with given id is not found', async () => {
      property = {};

      const res = await exec();

      expect(res.status).to.equal(404);
    });

    it('should return deleted property', async () => {
      const property = { id: 1, owner: 1 };
      properties.push(property);

      const res = await exec();

      expect(res.status).to.equal(200);
      expect(properties).to.have.length.lessThan(1);
    });
  });
});
