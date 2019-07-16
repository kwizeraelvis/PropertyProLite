import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { assign } from '../../helper/user';
import { hashPassword } from '../../helper/user';
import { users } from '../../helper/user';
import server from '../../index';
import { pool } from '../../startup/pg_db';
import { CREATE_TABLE, DROP_TABLE, SAVE_USER } from '../../db/query';
import { validUserSignInShort, validUserSignInLong, invalidEmail, emptyUser, validUserSignup } from '../models/data';

chai.use(chaiHttp);
const { expect, request } = chai;

describe('auth/signin', () => {
  beforeEach(async () => await pool.query(CREATE_TABLE));
  afterEach(async () => await pool.query(DROP_TABLE));

  describe('POST /', () => {
    let user = {};

    const exec = () => request(server)
      .post('/api/v1/auth/signin')
      .send(user);

    beforeEach(() => {
      user = assign(user, validUserSignInShort);

    });

    it('should return 400 if input is invalid', async () => {
      user = emptyUser;

      const res = await exec();

      expect(res.status).to.equal(400);
    });

    it('should return 400 if email is invalid', async () => {
      const user = validUserSignup;
      user.email = 'a@gmail.com';

      await pool.query(SAVE_USER,[user.first_name, user.last_name, user.email, user.password, user.phone_number, user.address, user.is_admin]);

      const res = await exec();

      expect(res.status).to.equal(400);
    });

    it('should return 400 if password is invalid', async () => {
      const user = validUserSignup;
      user.password = '1';

      user.password = await hashPassword(user);

      await pool.query(SAVE_USER,[user.first_name, user.last_name, user.email, user.password, user.phone_number, user.address, user.is_admin]);

      const res = await exec();

      expect(res.status).to.equal(400);
    });

    it('should return 200 if user is logged in successfully', async () => {
      const user = validUserSignup;
      user.email = 'email@gmail.com'
      user.password = '123456';
      
      user.password = await hashPassword(user);
      
      await pool.query(SAVE_USER,[user.first_name, user.last_name, user.email, user.password, user.phone_number, user.address, user.is_admin]);

      const res = await exec();
      
      const decoded = jwt.verify(res.body.data.token, process.env.JWT_PRIVATE_KEY);
      
      expect(res.status).to.equal(200);
      expect(decoded).to.have.property('is_admin');
    });
  });
});
