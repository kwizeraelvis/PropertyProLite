import chaiHttp from 'chai-http';
import chai from 'chai';
import jwt from 'jsonwebtoken';
import { assign } from '../../helper//user';
import server from '../../index';
import { validUserSignup } from '../models/data';
import { pool } from '../../startup/pg_db';
import { CREATE_USER_TABLE, DROP_USER_TABLE, SAVE_USER } from '../../db/query';

chai.use(chaiHttp);
const { expect, request } = chai;


describe('auth/signup', () => {
  beforeEach(async () => await pool.query(CREATE_USER_TABLE));
  afterEach(async () => await pool.query(DROP_USER_TABLE));

  describe('POST /', () => {
    let user = {};

    const exec = () => request(server)
      .post('/api/v1/auth/signup')
      .send(user);

    beforeEach(() => {
      user = assign(user, validUserSignup);

    });

    it('should return 400 if password is invalid', async () => {
      user.password = '1';

      const res = await exec();

      expect(res.status).to.equal(400);
    });

    it('should return 400 if input has special characters', async () => {
      user.first_name = '*';

      const res = await exec();

      expect(res.status).to.equal(400);
    });

    it('should return 400 if phone number is less than 10 digits', async () => {
      user.phone_number = '1';

      const res = await exec();

      expect(res.status).to.equal(400);
    });

    it('should return 400 if user is already registered', async () => {
      await pool.query(SAVE_USER,
        [user.first_name, user.last_name, user.email, user.password, user.phone_number,
        user.address, user.is_admin]);

      const res = await exec();

      expect(res.status).to.equal(400);
    });

    it('should return 200 if user is registered successfully', async () => {
      const res = await exec();

      const decoded = jwt.verify(res.body.data.token, process.env.JWT_PRIVATE_KEY);

      expect(res.status).to.equal(200);
      expect(decoded).to.have.property('is_admin');
    });

    it('should return 400 if signup method is incorrect', async () => {
      const res = await request(server).get('/api/v1/auth/signup').send(user);

      expect(res.status).to.equal(400);
    });
  });
});
