import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { assign } from '../../helper/user';
import { hashPassword } from '../../helper/user';
import { users } from '../../helper/user';
import server from '../../index';
import { validUserSignInShort, validUserSignInLong, invalidEmail, emptyUser } from '../models/data';

chai.use(chaiHttp);
const { expect, request } = chai;

describe('auth/signin', () => {
  describe('POST /', () => {
    let user = {};

    const exec = () => request(server)
      .post('/api/v1/auth/signin')
      .send(user);

    beforeEach(() => {
      user = assign(user, validUserSignInShort);

      users.length = 0;
    });

    it('should return 400 if input is invalid', async () => {
      user = emptyUser;

      const res = await exec();

      expect(res.status).to.equal(400);
    });

    it('should return 400 if email is invalid', async () => {
      const user = invalidEmail;
      users.push(user);

      const res = await exec();

      expect(res.status).to.equal(400);
    });

    it('should return 400 if password is invalid', async () => {
      users.push(user);

      const res = await exec();

      expect(res.status).to.equal(400);
    });

    it('should return 200 if user is logged in successfully', async () => {
      const user = validUserSignInLong;
      user.password = await hashPassword(user);
      users.push(user);

      const res = await exec();

      const decoded = jwt.verify(res.body.data.token, process.env.JWT_PRIVATE_KEY);

      expect(res.status).to.equal(200);
      expect(decoded).to.have.property('isAdmin');
    });
  });
});
