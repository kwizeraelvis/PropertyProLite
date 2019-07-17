import chai from 'chai';
import chaiHttp from 'chai-http';
import { users, generateAuthToken, assign } from '../../helper/user';
import { properties } from '../../helper/property';
import { pool } from '../../startup/pg_db';
import { CREATE_PROPERTY_TABLE, DROP_PROPERTY_TABLE, CREATE_USER_TABLE, SAVE_PROPERTY, SAVE_USER, DROP_USER_TABLE } from '../../db/query'
import server from '../../index';
import { validProperty, validUserSignup } from '../models/data';

chai.use(chaiHttp);
const { expect, request } = chai;

describe('api/property', () => {
  beforeEach(async () => {
    await pool.query(CREATE_PROPERTY_TABLE);
    await pool.query(CREATE_USER_TABLE);
  });
  afterEach(async () =>  {
    await pool.query(DROP_USER_TABLE);
    await pool.query(DROP_PROPERTY_TABLE)
  });

  describe('GET /', () => {
    let user;
    let property;
    let stringQuery;
    let token;

    const exec = () => request(server)
      .get(`/api/v1/property${stringQuery}`)
      .set('x-auth-token', token);

    beforeEach(() => {
      users.length = 0;
      properties.length = 0;

      user = { id: 1, email: 'a', phone_number: '1', is_admin: true };
      property = { id: 1, owner: 1, type: 'type', state: 'state', status: 'sold' };

      token = generateAuthToken(user);

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

    it('should return all available properties ', async () => {
      stringQuery = '';
      property.status = 'available';

      const res = await exec();

      expect(res.status).to.equal(200);
      expect(res.body.data[0].id).to.equal(properties[0].id);
    });

    it('should return all available properties if no token is provided', async () => {
      stringQuery = '';
      property.status = 'available';
      token = '';

      const res = await exec();

      expect(res.status).to.equal(200);
      expect(res.body.data[0].id).to.equal(properties[0].id);
    });

    it('should return all available properties ', async () => {
      stringQuery = '';
      property.status = 'available';

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
    let id;

    const exec = () => request(server)
      .get(`/api/v1/property/${id}`);

    beforeEach(() => {
      id = '1';
    });

    it('should return 404 if property with given id is not found', async () => {
      id = '2'
      await pool.query(SAVE_PROPERTY, [validProperty.price, validProperty.state, validProperty.city, validProperty.address, validProperty.type, validProperty.image_url, '1', 'available', new Date().toLocaleString()]);
  
      const res = await exec();

      expect(res.status).to.equal(404);
    });

    it('should return property with given id', async () => {
      await pool.query(SAVE_PROPERTY, [validProperty.price, validProperty.state, validProperty.city, validProperty.address, validProperty.type, validProperty.image_url, '1', 'available', new Date().toLocaleString()]);

      await pool.query(SAVE_USER, [validUserSignup.first_name, validUserSignup.last_name, validUserSignup.email, validUserSignup.password, validUserSignup.phone_number, validUserSignup.address, validUserSignup.is_admin])

      const res = await exec();

      expect(res.status).to.equal(200);
      expect(res.body.data).to.have.property('id');
    });
  });

  describe('GET/ME /', () => {
    let token;

    const exec = () => request(server)
      .get('/api/v1/property/me')
      .set('x-auth-token', token);

    beforeEach(() => {
      const user = { id: 1, is_admin: true };
      token = generateAuthToken(user);

      properties.length = 0;
    });


    it('should return 200 if own property are fetched', async () => {
      const property = { id: 1, owner: 1 };
      properties.push(property);

      const res = await exec();

      expect(res.status).to.equal(200);
      expect(res.body.data[0].id).to.equal(property.id);
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
        price: 1000,
        state: 'New york',
        city: 'Queens',
        address: 'Street 397 PK',
        type: 'type',
        image_url: 'https://postcron.com/en/blog/10-amazing-marketing-lessons-steve-jobs-taught-us/',
      };

      user = { id: 1, is_admin: true };
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
      const res = await exec();

      expect(res.status).to.equal(201);
      expect(res.body.data).to.have.property('id');
    });

    it('should return 400 if property already exits', async () => {
      await pool.query(SAVE_PROPERTY, [property.price, property.state, property.city, property.address, property.type, property.image_url, user.id, 'status', 'date']);

      const res = await exec();

      expect(res.status).to.equal(400);
    });

    // it('should return 200 if image is uploaded', (done) => {
    //   const user = { id: 1, is_admin: true, name: 'amily' };
    //   const token = generateAuthToken(user);

    //   const image = './UI/assets/image1.jpg'

    //    request(server)
    //   .post('/api/v1/property')
    //   .set('x-auth-token', token)
    //   .field('price', 1000)
    //   .field('state', 'state')
    //   .field('city', 'city')
    //   .field('address', 'address')
    //   .field('type', 'type')
    //   .field('image_url', 'https://postcron.com/en/blog/10-amazing-marketing-lessons-steve-jobs-taught-us/')
    //   .attach('photo', image)
    //   .end((err, res) => {

    //     expect(res.status).to.equal(201);
    //     done();
    //   })
    // });
  });

  describe('PATCH/:ID /', () => {
    let token;
    let property;
    let user;
    let id;

    const exec = () => request(server)
      .patch(`/api/v1/property/${id}`)
      .set('x-auth-token', token)
      .send(property);

    beforeEach(() => {
      property = {
        price: 1000,
        state: 'new state',
        city: 'city',
        address: 'address',
        type: 'type',
        image_url: 'https://postcron.com/en/blog/10-amazing-marketing-lessons-steve-jobs-taught-us/',
      };

      user = { id: 1, is_admin: true };

      id = '1';
      token = generateAuthToken(user);
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

    it('should return 400 if an image url is invalid', async () => {
      property.image_url = 'a';

      const res = await exec();

      expect(res.status).to.equal(400);
    });

    it('should return 404 if property with given id is not found', async () => {
      id = '2';

      await pool.query(SAVE_PROPERTY, [validProperty.price, validProperty.state, validProperty.city, validProperty.address, validProperty.type, validProperty.image_url, '1', 'available', new Date().toLocaleString()]);

      const res = await exec();

      expect(res.status).to.equal(404);
    });

    it('should return 403 if property is not yours', async () => {
      await pool.query(SAVE_PROPERTY, [validProperty.price, validProperty.state, validProperty.city, validProperty.address, validProperty.type, validProperty.image_url, '2', 'available', new Date().toLocaleString()]);

      const res = await exec();

      expect(res.status).to.equal(403);
    });

    it('should updated property if it is yours', async () => {
      await pool.query(SAVE_PROPERTY, [validProperty.price, validProperty.state, validProperty.city, validProperty.address, validProperty.type, validProperty.image_url, '1', 'available', new Date().toLocaleString()]);

      const res = await exec();
      
      expect(res.status).to.equal(200);
      expect(property.state).to.equal('new state');
    });
  });

  describe('PATCH/:id/sold /', () => {
    let token;
    let property;
    let user;
    let id;

    const exec = () => request(server)
      .patch(`/api/v1/property/${id}/sold`)
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

      id = '1';
      user = { id: 1, is_admin: true };
      token = generateAuthToken(user);
    });

    it('should return 401 if user is not logged in', async () => {
      token = '';

      const res = await exec();

      expect(res.status).to.equal(401);
    });

    it('should return 404 if property with given id is not found', async () => {
      id = '2';

      await pool.query(SAVE_PROPERTY, [validProperty.price, validProperty.state, validProperty.city, validProperty.address, validProperty.type, validProperty.image_url, '1', 'available', new Date().toLocaleString()]);

      const res = await exec();

      expect(res.status).to.equal(404);
    });

    it('should return property with sold status if it is yours', async () => {
      await pool.query(SAVE_PROPERTY, [validProperty.price, validProperty.state, validProperty.city, validProperty.address, validProperty.type, validProperty.image_url, '1', 'available', new Date().toLocaleString()]);
      
      const res = await exec();

      expect(res.status).to.equal(200);
      expect(res.body.data.status).to.equal('sold');
    });
  });

  describe('DELETE /', () => {
    let token;
    let property;
    let user;
    let id;

    const exec = () => request(server)
      .delete(`/api/v1/property/${id}`)
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

      id = '1';
      // user = { id: 1, is_admin: true };
      // token = generateAuthToken(user);

    });

    it('should return 401 if user is not logged in', async () => {
      token = '';

      const res = await exec();

      expect(res.status).to.equal(401);
    });

    it('should return 403 if user is not an admin', async () => {
      await pool.query(SAVE_USER, [validUserSignup.first_name, validUserSignup.last_name, validUserSignup.email, validUserSignup.password, validUserSignup.phone_number, validUserSignup.address, false])

      const user = await pool.query(`SELECT * FROM users WHERE id = 1`);
      token = generateAuthToken(user.rows[0]);

      const res = await exec();

      expect(res.status).to.equal(403);
    });

    it('should return 404 if property with given id is not found', async () => {
      await pool.query(SAVE_USER, [validUserSignup.first_name, validUserSignup.last_name, validUserSignup.email, validUserSignup.password, validUserSignup.phone_number, validUserSignup.address, validUserSignup.is_admin])

      const user = await pool.query(`SELECT * FROM users WHERE id = 1`);
      token = generateAuthToken(user.rows[0]);

      const res = await exec();

      expect(res.status).to.equal(404);
    });

    it('should return deleted property', async () => {
      await pool.query(SAVE_USER, [validUserSignup.first_name, validUserSignup.last_name, validUserSignup.email, validUserSignup.password, validUserSignup.phone_number, validUserSignup.address, validUserSignup.is_admin])
      await pool.query(SAVE_PROPERTY, [validProperty.price, validProperty.state, validProperty.city, validProperty.address, validProperty.type, validProperty.image_url, '1', 'available', new Date().toLocaleString()]);

      const user = await pool.query(`SELECT * FROM users WHERE id = 1`);
      token = generateAuthToken(user.rows[0]);

      const res = await exec();

      expect(res.status).to.equal(200);
    });
  });
});
