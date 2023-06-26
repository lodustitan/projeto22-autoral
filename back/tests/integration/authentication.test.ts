import { faker } from '@faker-js/faker';
import { EXPECTATION_FAILED, StatusCodes } from "http-status-codes";
import supertest from 'supertest';
import { createUser } from '../factories';
import { cleanDb } from '../helpers';
import app from '../../src/app';
import prisma from '../../src/database/database';

beforeAll(async () => {
  await prisma.$connect()
  await cleanDb();
});

afterAll(async () => {
  await prisma.$disconnect();
});

const server = supertest(app);

describe('POST /auth/sign-in', () => {
  it('should respond with status 400 when body is not given', async () => {
    const response = await server.post('/auth/sign-in');

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
  });

  it('should respond with status 400 when body is not valid', async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post('/auth/sign-in').send(invalidBody);

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
  });

  describe('when body is valid', () => {
    
    const generateValidBody = () => ({
      account_name: faker.internet.displayName(),
      password: faker.internet.password(6),
    });

    it('should respond with status 401 if there is a user for given email but password is not correct', async () => {
      const body = generateValidBody();
      await createUser(body);

      const response = await server.post('/auth/sign-in').send({
        ...body,
        password: "obvioQueNãoÉaSenhaHAHAHA"
      });

      expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    });

    describe('when credentials are valid', () => {
      it('should respond with status 200', async () => {
        const body = generateValidBody();
        await createUser(body);

        const response = await server.post('/auth/sign-in').send(body);

        expect(response.status).toBe(StatusCodes.OK);
      });

      it('should respond with user data', async () => {
        const body = generateValidBody();
        const user = await createUser(body);

        const response = await server.post('/auth/sign-in').send(body);

        expect(response.body.userInfos).toEqual({
          account_name: user.account_name,
          password: expect.not.stringContaining(user.password),
          diamonds: expect.any(Number),
          peanuts: expect.any(Number),
          nickname: expect.any(String)
        });
      });

      it('should respond with session token', async () => {
        const body = generateValidBody();
        await createUser(body);

        const response = await server.post('/auth/sign-in').send(body);

        expect(response.body.token).toBeDefined();
      });
    });
  });
});

describe('POST /auth/sign-up', () => {
  it('should respond with status 400 when body is not given', async () => {
    const response = await server.post('/auth/sign-up');

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
  });

  it('should respond with status 400 when body is not valid', async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post('/auth/sign-up').send(invalidBody);

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
  });
});
