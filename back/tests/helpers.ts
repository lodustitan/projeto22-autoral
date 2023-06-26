import * as jwt from 'jsonwebtoken';
import { users } from '@prisma/client';
import { createUser } from './factories';
import { createSession } from './factories/sessions-factory';
import prisma from '../src/database/database';

import { config } from 'dotenv';
config();

export async function cleanDb() {
  await prisma.idols.deleteMany({});
  await prisma.market.deleteMany({});
  await prisma.sessions.deleteMany({});
  await prisma.users.deleteMany({});
}

export async function generateValidToken(user?: users) {
  const incomingUser = user || (await createUser());
  if (!process.env.JWT_PASS) return;
  const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_PASS);

  await createSession(token);

  return token;
}
