import chaiHttp from 'chai-http';
import chai from 'chai';
import jwt from 'jsonwebtoken';
import { users } from '../../helper/user';
import { assign } from '../../helper//user';
import server from '../../index';
import { validUserSignup } from '../models/data';

chai.use(chaiHttp);
const { expect, request } = chai;


describe('auth/signup', () => {
  describe('POST /', () => {
    let user = {};

    const exec = () => request(server)
      .post('/api/v1/auth/signup')
      .send(user);

    beforeEach(() => {
      user = assign(user, validUserSignup);

      users.length = 0;
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
      user.phoneNumber = '1';

      const res = await exec();

      expect(res.status).to.equal(400);
    });

    it('should return 400 if user is already registered', async () => {
      users.push(user);

      const res = await exec();

      expect(res.status).to.equal(400);
    });

    it('should return 200 if user is registered successfully', async () => {
      const res = await exec();

      const decoded = jwt.verify(res.body.data.token, process.env.JWT_PRIVATE_KEY);

      expect(res.status).to.equal(200);
      expect(decoded).to.have.property('isAdmin');
    });
  });
});
