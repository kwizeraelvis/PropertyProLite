// import chaiHttp from 'chai-http';
// import chai from 'chai';
// import jwt from 'jsonwebtoken';
// import { users } from '../../helper/user';
// import server from '../../index';

// chai.use(chaiHttp);
// const { expect, request } = chai;


// describe('auth/signup', () => {
//   describe('POST /', () => {
//     let user;

//     const exec = () => request(server)
//       .post('/api/v1/auth/signup')
//       .send(user);

//     beforeEach(() => {
//       user = {
//         email: 'email@gmail.com',
//         first_name: 'a',
//         last_name: 'a',
//         password: '123456',
//         phoneNumber: '1',
//         address: 'a',
//         isAdmin: true,
//       };

//       users.length = 0;
//     });

//     it('should return 400 if input is invalid', async () => {
//       user.password = '1';

//       const res = await exec();

//       expect(res.status).to.equal(400);
//     });

//     it('should return 400 if user is already registered', async () => {
//       users.push(user);

//       const res = await exec();

//       expect(res.status).to.equal(400);
//     });

//     it('should return 200 if user is registered successfully', async () => {
//       const res = await exec();

//       const decoded = jwt.verify(res.body.data.token, process.env.JWT_PRIVATE_KEY);

//       expect(res.status).to.equal(200);
//       expect(decoded).to.have.property('isAdmin');
//     });
//   });
// });
