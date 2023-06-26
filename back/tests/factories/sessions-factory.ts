import { sessions } from '@prisma/client';
import { createUser } from './users-factory';
import prisma from '../../src/database/database';

export async function createSession(token: string): Promise<sessions> {
  const user = await createUser();

  return prisma.sessions.create({
    data: {
      token: token,
      userId: user.id,
    },
  });
}
